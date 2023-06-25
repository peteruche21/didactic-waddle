import { LogLevel } from "@snapshot-labs/checkpoint";
import fs from "fs";
import path from "path";
import { getAddress } from "@ethersproject/address";
import { BigNumber } from "@ethersproject/bignumber";
import { shortStringArrToStr } from "@snapshot-labs/sx";
import checkpointConfig from "../config.json";
import { config } from "dotenv";

config();

export const toAddress = (bn: unknown) => {
  try {
    return getAddress(BigNumber.from(bn).toHexString());
  } catch (e) {
    return bn;
  }
};

export const hexStrArrToStr = (data: any, start: number, length: number | bigint): string => {
  const dataSlice = data.slice(start, start + Number(length));
  return shortStringArrToStr(dataSlice.map((m: any) => BigInt(m)));
};

export const getCheckpointOptions = {
  logLevel: LogLevel.Info,
  dbConnection: process.env.DATABASE_URL,
};

export const getCheckpointSchema = () => {
  const schemaFile = path.join(__dirname, `./schema.gql`);
  const schema = fs.readFileSync(schemaFile, "utf8");
  return schema;
};

export const getCheckpointConfig = () => {
  return checkpointConfig;
};
