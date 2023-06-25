import { ConnectedStarknetWindowObject } from "@argent/get-starknet";
import { create } from "zustand";

interface IDappState {
  connection: ConnectedStarknetWindowObject | undefined;
  setConnection: (valid: ConnectedStarknetWindowObject | undefined) => void;
}

export const useDappStore = create<IDappState>()((set) => ({
  connection: undefined,
  setConnection: (connection) => set({ connection }),
}));
