import React, { useState } from "react";
import cn from "classnames";
import styles from "./Hero.module.sass";

const Welcome = () => {

  return (
      <div id="welcome" className="d-flex flex-column align-items-center justify-content-center min-vh-100 container">
          <div className={cn(styles.card, "p-40", "border-10", "border-dark", "border-radius-5", "flex-center")} style={{ backgroundColor: '#2e302e !important' }}>
              <h1 className="after1 mt-10 text-center">Welcome</h1>
              <div className="my-20">
                  <p className="font-20">
                      Harmony Penguins is a collection of 8888 Penguin NFTs—unique digital collectables living on the Harmony blockchain.
                      Each Penguin is unique and programmatically generated with over 120 possible traits, including expression, headwear, clothing, and more.
                      All Penguins have been extensively created, but some are rarer than others.
                  </p>
                  <p className="font-20">
                      The Penguins are made available on the Harmony blockchain. Purchasing a Penguin costs 200 ONE.
                  </p>
                  <p className="font-20">
                      To gain access into our exclusive membership area (The IGloo) Penguin holders will need to be signed into their Metamask Wallet
                  </p>
              </div>
          </div>
      </div>
  );
};

export default Welcome;
