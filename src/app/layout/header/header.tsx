import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Header.module.sass";
import User from "./user/user";
import {useUser} from "../../core/context-provider/user/user-context";
import {getLocalStorageWalletAddress, lengthOfAddress} from "../../core/utils/wallet";
import {bscNetworkChainId, isEthNetwork} from "../../core/utils/network/user";
import CollapseCloseIcon from "../icon/collapse-close-icon";
import CollapseOpenIcon from "../icon/collapse-open-icon";
import {environment} from "../../../environment";

const config = [
  {
    url: "/home",
    title: "Home",
  },
  {
    url: "/market-place",
    title: "Market Place",
  },
  {
    url: "/my-penguins",
    title: "My Penguins",
  },
];

const hashLinks = [
  {
    url: "/home/#MINT",
    title: "Mint",
  },
  {
    url: "/home/#ROADMAP",
    title: "Road Map",
  },
  {
    url: "/home/#TEAM",
    title: "Team",
  },
]

const Headers = () => {

  const [visibleNav, setVisibleNav] = useState(false);
  const { walletAddress, setWalletAddress, connectWallet, pageIndex, setPageIndex } = useUser();

  const ethereum = window.ethereum;
  ethereum.on('accountsChanged', (accounts: any[]) => {
    if(accounts.length === 0) {
      setWalletAddress('')
    }
  });

  useEffect(() => {
    loadWallet().then();
    switchNetwork().then();
  },[])


  const switchNetwork = async () => {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: bscNetworkChainId }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            chainName: 'Harmony Test net',
            method: 'wallet_addEthereumChain',
            params: [{ chainId: bscNetworkChainId, rpcUrl: environment.ropstenNetworkUrl }],
          });
        } catch (addError) {
        }
      }
    }
  }


  const loadWallet = async () => {
    if (!await isEthNetwork()) {
      setWalletAddress('');
      return;
    }
    if(getLocalStorageWalletAddress() !== '') {
      setWalletAddress(getLocalStorageWalletAddress());
    }
  }

  return (
    <header className={cn(styles.header, "d-flex", "align-items-center")}>
      <button
          className="d-lg-none z-index-100"
          onClick={() => setVisibleNav(!visibleNav)}
      >
        {
          visibleNav ? (
              <CollapseCloseIcon/>
          ) : (
              <CollapseOpenIcon/>
          )
        }
      </button>
      <div className={cn("container", styles.container)}>
        <Link className={styles.logo} to="/">
          <img
            className={styles.pic}
            src="/images/logo-light.png"
            alt="Fitness Pro"
          />
        </Link>
        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })} style={{ height: 'auto' }}>
          <nav className={cn(styles.nav)}>
            {
              config.map((item, index) => (
                <Link
                  className={cn(styles.link, {
                    [styles.active]: index === pageIndex,
                  })}
                  onClick={() => setPageIndex(index)}
                  to={item.url}
                  key={index}
                >
                  {item.title}
                </Link>
              ))
            }
            {
              hashLinks.map((item, index) => (
                  <a
                      className={cn(styles.link, {
                        [styles.active]: index + 3 === pageIndex,
                      })}
                      onClick={() => setPageIndex(index + 3)}
                      title={item.title}
                      href={item.url}
                      key={index}
                  >
                    {item.title}
                  </a>
              ))
            }
          </nav>
        </div>
        {
          walletAddress.length === lengthOfAddress ? (
              <User className="" />
          ) : (
              <button
                  className={cn("button-stroke button-small", styles.button)}
                  onClick={() => connectWallet()}
              >
                Connect Wallet
              </button>
          )
        }
      </div>
    </header>
  );
};

export default Headers;
