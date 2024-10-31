import {items} from "../models/items.js";
import {validateItem} from "../schemas.js";

const laptops = [
    "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_101913872?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402",
    "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_101913876?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402",
    "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_101913894?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402",
    "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_101913910?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402"
];

const desktops = [
    "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_108323310?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402",
    "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_108323328?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402",
    "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_108323331?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402",
    "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_108323333?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402"
];

const workstations = [
     "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_142448885?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402",
     "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_142448889?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402",
     "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_142448891?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402",
     "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_142448892?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402"
];

export const getAllItems = (req, res) => {
    const searchQuery = req.query.search?.toLowerCase() || "";
    const typeFilter = req.query.type?.split(",").filter(Boolean).map((v) => v.toLowerCase()) || [];
    const processorFilter = req.query.processor?.split(",").filter(Boolean).map((v) => v.toLowerCase()) || [];
    const graphicsCardFilter = req.query.graphicsCard?.split(",").filter(Boolean).map((v) => v.toLowerCase()) || [];

    const filteredItems = items.filter(item => {
        const nameMatches = item.name.toLowerCase().includes(searchQuery);

        const typeMatches = typeFilter.length === 0 || typeFilter.includes(item.type.toLowerCase());

        const processorMatches = processorFilter.length === 0 || processorFilter.includes(item.processor.toLowerCase());

        const graphicsCardMatches = graphicsCardFilter.length === 0 || graphicsCardFilter.includes(item.graphicsCard.toLowerCase());

        return nameMatches && typeMatches && processorMatches && graphicsCardMatches;
    });

    return res.status(200).json(filteredItems);
};

export const createItem = (req, res) => {
    const {name, type, price, processor, graphicsCard, description, endTime} = req.body;
    const computerPrice = parseFloat(price);

    const valid = validateItem({
        name,
        type,
        price: computerPrice,
        processor,
        graphicsCard,
        description,
        endTime
    });

    if (!valid) {
        return res.status(400).json({message: "Missing required fields.", errors: validateItem.errors});
    }

    let images;
    switch (type.toLowerCase()) {
        case "laptop":
            images = laptops;
            break;
        case "desktop":
            images = desktops;
            break;
        case "workstation":
            images = workstations;
            break;
        default:
            return res.status(400).json({message: "Invalid type!"});
    }
    ;

    const newItem = {
        id: items.length + 1,
        name,
        type,
        price,
        processor,
        graphicsCard,
        description,
        images,
        bids: [],
        endTime
    };

    items.push(newItem);
    res.status(201).json({message: "Item created successfully!"});
};

export const getItemById = (req, res) => {
    const {id} = req.params;

    const foundItem = items.find((item) => item.id === parseInt(id, 10));
    if (!foundItem) {
        return res.status(404).json({message: "Item not found"});
    }

    res.status(200).json(foundItem);
};

export const updateItem = (req, res) => {
    const {id} = req.params;
    const {name, type, price, processor, graphicsCard, description, endTime} = req.body;

    const computerPrice = parseFloat(price);

    const valid = validateItem({
        name,
        type,
        price: computerPrice,
        processor,
        graphicsCard,
        description,
        endTime
    });

    if (!valid) {
        return res.status(400).json({message: "Missing required fields.", errors: validateItem.errors});
    }

    const itemIndex = items.findIndex((item) => item.id === parseInt(id, 10));
    if (itemIndex === -1) {
        return res.status(404).json({message: "Item not found"});
    }

    const updatedItem = {
        ...items[itemIndex],
        name,
        type,
        price,
        processor,
        graphicsCard,
        description,
        endTime
    };

    items[itemIndex] = updatedItem;

    res.status(201).json({message: "Item updated successfully!"});
};

export const deleteItem = (req, res) => {
    const {id} = req.params;

    const itemIndex = items.findIndex((item) => item.id === parseInt(id, 10));
    if (itemIndex === -1) {
        return res.status(404).json({message: "Item not found"});
    };

    items.splice(itemIndex, 1);

    res.status(204).end();
};