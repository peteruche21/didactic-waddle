"use client";
import Image from "next/image";
import { connect, disconnect } from "@argent/get-starknet";
import { useState, useEffect } from "react";
import { getName, shortString } from "@client/utils/addresses";
import { AddrBlockies } from "@client/utils/Blockies";
import { useDappStore } from "@client/utils/store";

const NavBar = () => {
  const { connection, setConnection } = useDappStore((state) => state);
  const [name, setName] = useState<string | undefined>(undefined);

  const connectToStarknet = async () => {
    console.log("connectToStarknet");
    const _connection = await connect({
      modalWalletAppearance: "all",
    });
    if (_connection && _connection.isConnected) {
      setConnection(_connection);
      setName(await getName(_connection.selectedAddress));
    }
  };

  const connectToStarknetAsync = async () => {
    const _connection = await connect({ modalMode: "neverAsk" });
    if (_connection && _connection.isConnected) {
      setConnection(_connection);
      setName(await getName(_connection.selectedAddress));
    }
  };

  const disconnectWallet = async () => {
    await disconnect();
    setConnection(undefined);
  };

  const copyAddress = () => {
    if (!connection?.selectedAddress) return;
    navigator.clipboard.writeText(connection.selectedAddress);
  };

  useEffect(() => {
    connectToStarknetAsync();
  }, []);

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          P
          <Image
            className="h-7 w-7"
            alt="Logo"
            width={32}
            height={32}
            src="/pegd.svg"
          />
          GD
        </a>
      </div>
      <div className="navbar-end items-center">
        <div className="mr-4">
          {/* Icon to show the supported network */}
          <Image
            width={24}
            height={24}
            className="h-6 w-6"
            src="/SN.svg"
            alt="Network"
          />
        </div>
        <div className="mr-4">
          {connection?.isConnected ? (
            <div className="flex items-center">
              <div className="mr-2 w-6 mask mask-circle">
                <AddrBlockies address={connection.selectedAddress} />
              </div>
              <div className="flex flex-col">
                <div className="text-sm">{name}</div>
              </div>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={connectToStarknet}>
              Connect Wallet
            </button>
          )}
        </div>
        <div className="dropdown dropdown-end">
          {/* Dropdown menu  */}
          <label tabIndex={0} className="btn m-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          {connection?.isConnected && (
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={copyAddress} onTouchStart={copyAddress}>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-4 inline-block mr-1 align-text-bottom"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M13.887 3.182c.396.037.79.08 1.183.128C16.194 3.45 17 4.414 17 5.517V16.75A2.25 2.25 0 0114.75 19h-9.5A2.25 2.25 0 013 16.75V5.517c0-1.103.806-2.068 1.93-2.207.393-.048.787-.09 1.183-.128A3.001 3.001 0 019 1h2c1.373 0 2.531.923 2.887 2.182zM7.5 4A1.5 1.5 0 019 2.5h2A1.5 1.5 0 0112.5 4v.5h-5V4z"
                    ></path>
                  </svg>
                  <span>
                    <div
                      className="tooltip tooltip-left"
                      data-tip="click to copy"
                    >
                      {shortString(connection.selectedAddress)}
                    </div>
                  </span>
                </a>
              </li>
              <li>
                <a onClick={disconnectWallet}>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-4 inline-block mr-1 align-text-bottom"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                    ></path>
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
                    ></path>
                  </svg>
                  <span>logout</span>
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
