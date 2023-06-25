import express from "express";
import cors from "cors";
import Checkpoint from "@snapshot-labs/checkpoint";
import * as writers from "./src/writers";
import { config } from "dotenv";

config();

import { getCheckpointOptions, getCheckpointSchema, getCheckpointConfig } from "./src/utils";
const checkpointConfig = getCheckpointConfig();
const schema = getCheckpointSchema();
const checkpointOptions = getCheckpointOptions;
const checkpointWriters = {
  handleDeploy: writers.handleDeploy,
  handleRightsCreated: writers.handleRightsCreated,
  handleRightsBurned: writers.handleRightsBurned,
  handleDelegateAll: writers.handleDelegateAll,
  handleDelegateContract: writers.handleDelegateContract,
  handleDelegateERC721: writers.handleDelegateERC721,
  handleDelegateERC1155: writers.handleDelegateERC1155,
  handleDelegateERC20: writers.handleDelegateERC20,
};

const checkpoint = new Checkpoint(checkpointConfig, checkpointWriters, schema, checkpointOptions);

const app = express();
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ limit: "4mb", extended: false }));
app.use(cors({ maxAge: 86400 }));

app.use("/", checkpoint.graphql);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
