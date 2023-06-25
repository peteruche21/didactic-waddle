import { utils } from "starknetid.js";
import axios from "axios";

const getName = async (address: string) => {
  try {
    const name = await axios
      .get<{ domain: string }>(
        `https://api.starknet.id/addr_to_domain?addr=${address}`
      )
      .then((res) => res.data.domain);
    return name;
  } catch (error: any) {
    console.log(error.response.data);
    return shortString(address);
  }
};

const getAddress = async (name: string) => {
  if (!utils.isStarkDomain(name)) return;
  const addr = await axios
    .get<{ addr: string }>(
      `https://api.starknet.id/domain_to_addr?domain=${name}`
    )
    .then((res) => res.data.addr);
  return addr;
};

const shortString = (str: string) => {
  return str.slice(0, 6) + "..." + str.slice(-4);
};

export { getName, getAddress, shortString };
