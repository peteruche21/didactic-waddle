import { hexStrArrToStr, toAddress } from "./utils";
import type { CheckpointWriters } from "@snapshot-labs/checkpoint";

export const handleDeploy = async () => {
  // do nothing
};

export const handleRightsCreated = async ({ mysql, event, block, tx }: any) => {
  if (!event) return;

  const rightsId = event.data[0];
  const depositor = toAddress(event.data[1]);
  const contract = toAddress(event.data[2]);
  const tokenId = event.data[3];
  const expiration = event.data[4];

  const timestamp = block.timestamp;
  const blockNumber = block.block_number;

  const rights = {
    id: rightsId,
    rightsId,
    depositor,
    contract,
    tokenId,
    expiration,
    tx_hash: tx.transaction_hash,
    created_at: timestamp,
    created_at_block: blockNumber,
  };

  // table names are `lowercase(TypeName)s` and can be interacted with sql
  await mysql.queryAsync("INSERT IGNORE INTO rights SET ?", [rights]);
};

export const handleRightsBurned = async ({ mysql, event, block, tx }: any) => {
  if (!event) return;

  const rightsId = event.data[0];

  // table names are `lowercase(TypeName)s` and can be interacted with sql
  await mysql.queryAsync("DELETE FROM rights WHERE rightsId ?", [rightsId]);
};

export const handleDelegateAll = async ({ mysql, event, block, tx }: any) => {
  if (!event) return;

  const from = toAddress(event.data[0]);
  const to = toAddress(event.data[1]);
  let rights = "";
  const rightsLength = BigInt(event.data[2]);
  const enable = event.data[3];
  const timestamp = block.timestamp;
  const blockNumber = block.block_number;

  try {
    rights = hexStrArrToStr(event.data, 3, rightsLength);
  } catch (e) {
    console.error(`failed to decode content on block [${blockNumber}]: ${e}`);
    return;
  }

  // post object matches fields of Post type in schema.gql
  const all = {
    id: `${from}/${rights}`,
    from,
    to,
    rights,
    enable,
    tx_hash: tx.transaction_hash,
    created_at: timestamp,
    created_at_block: blockNumber,
  };

  // table names are `lowercase(TypeName)s` and can be interacted with sql
  await mysql.queryAsync("INSERT IGNORE INTO all SET ?", [all]);
};

export const handleDelegateContract = async ({ mysql, event, block, tx }: any) => {
  if (!event) return;

  const from = toAddress(event.data[0]);
  const to = toAddress(event.data[1]);
  const contract = toAddress(event.data[2]);
  let rights = "";
  const rightsLength = BigInt(event.data[3]);
  const enable = event.data[4];
  const timestamp = block.timestamp;
  const blockNumber = block.block_number;

  try {
    rights = hexStrArrToStr(event.data, 3, rightsLength);
  } catch (e) {
    console.error(`failed to decode content on block [${blockNumber}]: ${e}`);
    return;
  }

  // post object matches fields of Post type in schema.gql
  const contractDelegations = {
    id: `${from}/${rights}`,
    from,
    to,
    contract,
    rights,
    enable,
    tx_hash: tx.transaction_hash,
    created_at: timestamp,
    created_at_block: blockNumber,
  };

  // table names are `lowercase(TypeName)s` and can be interacted with sql
  await mysql.queryAsync("INSERT IGNORE INTO contractDelegations SET ?", [contractDelegations]);
};

export const handleDelegateERC721 = async ({ mysql, event, block, tx }: any) => {
  if (!event) return;

  const from = toAddress(event.data[0]);
  const to = toAddress(event.data[1]);
  const contract = toAddress(event.data[2]);
  const id = event.data[3];
  let rights = "";
  const rightsLength = BigInt(event.data[4]);
  const enable = event.data[5];
  const timestamp = block.timestamp;
  const blockNumber = block.block_number;

  try {
    rights = hexStrArrToStr(event.data, 4, rightsLength);
  } catch (e) {
    console.error(`failed to decode content on block [${blockNumber}]: ${e}`);
    return;
  }

  // post object matches fields of Post type in schema.gql
  const erc721Delegations = {
    id: `${from}/${rights}`,
    from,
    to,
    contract,
    tokenId: id,
    rights,
    enable,
    tx_hash: tx.transaction_hash,
    created_at: timestamp,
    created_at_block: blockNumber,
  };

  // table names are `lowercase(TypeName)s` and can be interacted with sql
  await mysql.queryAsync("INSERT IGNORE INTO erc721Delegations SET ?", [erc721Delegations]);
};

export const handleDelegateERC1155 = async ({ mysql, event, block, tx }: any) => {
  if (!event) return;

  const from = toAddress(event.data[0]);
  const to = toAddress(event.data[1]);
  const contract = toAddress(event.data[2]);
  const id = event.data[3];
  let rights = "";
  const rightsLength = BigInt(event.data[4]);
  const enable = event.data[5];
  const timestamp = block.timestamp;
  const blockNumber = block.block_number;

  try {
    rights = hexStrArrToStr(event.data, 4, rightsLength);
  } catch (e) {
    console.error(`failed to decode content on block [${blockNumber}]: ${e}`);
    return;
  }

  // post object matches fields of Post type in schema.gql
  const erc1155Delegations = {
    id: `${from}/${rights}`,
    from,
    to,
    contract,
    tokenId: id,
    rights,
    enable,
    tx_hash: tx.transaction_hash,
    created_at: timestamp,
    created_at_block: blockNumber,
  };

  // table names are `lowercase(TypeName)s` and can be interacted with sql
  await mysql.queryAsync("INSERT IGNORE INTO erc1155Delegations SET ?", [erc1155Delegations]);
};

export const handleDelegateERC20 = async ({ mysql, event, block, tx }: any) => {
  if (!event) return;

  const from = toAddress(event.data[0]);
  const to = toAddress(event.data[1]);
  const contract = toAddress(event.data[2]);
  const amount = event.data[3];
  let rights = "";
  const rightsLength = BigInt(event.data[4]);
  const enable = event.data[5];
  const timestamp = block.timestamp;
  const blockNumber = block.block_number;

  try {
    rights = hexStrArrToStr(event.data, 4, rightsLength);
  } catch (e) {
    console.error(`failed to decode content on block [${blockNumber}]: ${e}`);
    return;
  }

  // post object matches fields of Post type in schema.gql
  const erc20Delegations = {
    id: `${from}/${rights}`,
    from,
    to,
    contract,
    amount,
    rights,
    enable,
    tx_hash: tx.transaction_hash,
    created_at: timestamp,
    created_at_block: blockNumber,
  };

  // table names are `lowercase(TypeName)s` and can be interacted with sql
  await mysql.queryAsync("INSERT IGNORE INTO erc20Delegations SET ?", [erc20Delegations]);
};
