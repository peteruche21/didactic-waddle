"use client";
import { useState } from "react";
import Form from "../Form";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div>
      <div className="tabs tabs-boxed flex justify-center">
        <a
          className={`tab ${activeTab === 1 && "tab-active"}`}
          onClick={() => handleTabClick(1)}
        >
          Wallet
        </a>
        <a
          className={`tab ${activeTab === 2 && "tab-active"}`}
          onClick={() => handleTabClick(2)}
        >
          Contract
        </a>
        <a
          className={`tab ${activeTab === 3 && "tab-active"}`}
          onClick={() => handleTabClick(3)}
        >
          NFT
        </a>
      </div>
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body">
          <Form tabNumber={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default Tabs;
