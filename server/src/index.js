import express from 'express';
import cors from "cors";

import usersRoute from './routes/users.js';
import itemsRoute from "./routes/items.js";
import bidsRoute from "./routes/bids.js";

const app = express();
const port = 3000;

app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:4173"],
      credentials: true,
    })
);

app.use(express.json());

app.use("/", usersRoute);
app.use("/computers", itemsRoute);
app.use("/bids", bidsRoute);

app.get('/', (req, res) => {
  res.json({ msg: "hello world"});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});