import {validateBid} from "../schemas.js";
import {items} from "../models/items.js";

let clients = [];

export const createNewBid = (req, res) => {
    const {creator, price} = req.body;
    const {id} = req.params;

    const bid = parseFloat(price);

    const valid = validateBid({creator, price: bid});

    if(!valid) return res.status(400).json({message: "Something went wrong!", errors: validateBid.errors});

    const item = items.find((item) => item.id === parseInt(id, 10));

    if(!item) {
        return res.status(404).json({ message: "Item not found" });
    };

    const lastBid = item.bids[item.bids.length - 1];
    const lastBidPrice = lastBid ? lastBid.price : undefined;

    if(lastBidPrice !== undefined) {
        if(bid <= lastBidPrice) {
            return res.status(400).json({message: "New bid must be higher than a previous one!"});
        }
    };

    const newBid = {
        id: item.bids.length + 1,
        creator,
        price: bid
    };

    item.bids.push(newBid);

    clients.forEach(client => client.res.write(`data: ${JSON.stringify(newBid)}\n\n`));

    return res.status(201).json({message: "Bid created successfully!"});
};

export const getAllBids = (req, res) => {
    const {id} = req.params;

    const item = items.find((item) => item.id === parseInt(id, 10));

    if(!item) {
        return res.status(404).json({ message: "Item not found" });
    };

    return res.status(200).json(item.bids);
};

export const sse = (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    clients.push({ req, res });

    req.on("close", () => {
        clients = clients.filter(client => client.res !== res);
    });
}