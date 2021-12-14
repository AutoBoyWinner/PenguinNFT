import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import {useUser} from "../../../core/context-provider/user/user-context";
import {
  cutWalletAddress,
  lengthOfAddress,
  setLocalStorageWalletStatus
} from "../../../core/utils/wallet";
import {BigNumber} from "bignumber.js";
import Web3 from "web3";
import {ethUnit} from "../../../core/data/ether-unit";

export interface UserProps {
  className: string
}

const User = ( props: UserProps ) => {

  const { className } = props;
  const [visible, setVisible] = useState(false);
  const { walletAddress, setWalletAddress } = useUser();
  const [balanceEth, setBalanceEth] = useState<number>()
  const ethereum = window.ethereum;
  const metaWeb3 = new Web3(ethereum);

  useEffect(() => {
    if(walletAddress.length === lengthOfAddress) {
      metaWeb3.eth.getBalance(walletAddress).then((balance) => {
        const value = new BigNumber(balance).dividedBy(ethUnit).toFixed(4);
        setBalanceEth(Number(value));
      });
    }
  },[walletAddress])

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className)}>
        <div className={cn(styles.head, 'px-10 py-5')} onClick={() => setVisible(!visible)}>
          <div className={styles.avatar}>
            <img
                src="/images/content/harmony.png"
                alt="Etherium"
            />
          </div>
          <div className={styles.wallet}>
            {balanceEth} <span className={styles.currency}>ONE</span>
          </div>
        </div>
        {visible && (
          <div className={styles.body}>
            <div className={styles.code}>
              <div className={styles.number}>{ cutWalletAddress(walletAddress) }</div>
              <button className={styles.copy}>
                <Icon name="copy" size="16" />
              </button>
            </div>
            <div className={styles.wrap}>
              <div className={styles.line}>
                <div className={styles.preview}>
                  <img
                    src="/images/content/harmony.png"
                    alt="Etherium"
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.info}>Balance</div>
                  <div className={styles.price}>{balanceEth} ONE</div>
                </div>
              </div>
            </div>
            <div className={styles.menu}>
              <Link
                  to="/my-penguins"
                  className={styles.item}
                  onClick={() => setVisible(!visible)}
              >
                <div className={styles.icon}>
                  <Icon name="image" size="20" />
                </div>
                <div className={styles.text}>My Penguins</div>
              </Link>
              <button
                  className={styles.item}
                  onClick={() => {
                    setVisible(!visible);
                    setWalletAddress('');
                    setLocalStorageWalletStatus('').then();
                  }}
              >
                <div className={styles.icon}>
                  <Icon name="exit" size="20" />
                </div>
                <div className={styles.text}>Disconnect</div>
              </button>
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default User;
