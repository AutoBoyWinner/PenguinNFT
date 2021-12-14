import React, { useEffect, useState } from "react";
import Web3 from "web3";
import cn from "classnames";

import TimerStyled from "./timer/TimerStyled";
import Modal from "../../../component/modal/modal";
import { lengthOfAddress } from "../../../core/utils/wallet";
import { toast } from "../../../core/utils/notification.util";
import { useUser } from "../../../core/context-provider/user/user-context";
import MintModalContent from "../../../component/mint-modal-content/mint-modal-content";

import styles from "./Hero.module.sass";
import "./mint.css";
import {clearMinted, createCollections} from "../../../core/utils/network/penguin";

const Mint = () => {

  const [visibleModalBid, setVisibleModalBid] = useState(false);
  const { walletAddress, connectWallet } = useUser();
  const [remainTime, setRemainTime] = useState<number>(0);
  const [time, setTime] = useState({ day: 0, hour: 0, minute: 0, second: 0 });
  const ethereum = window.ethereum;
  const metaWeb3 = new Web3(ethereum);
  const startTime = 1635580800;

  useEffect(() => {
      metaWeb3.eth.getBlockNumber().then((blockNumber) => {
          metaWeb3.eth.getBlock(blockNumber).then((result) => {
              setRemainTime((startTime - Number(result.timestamp)));
          });
      });
  },[])

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainTime(remainTime - 1);
            getTimeFormat(remainTime);
        }, 1000);
        return () => clearInterval(interval);
    })

    const getTimeFormat = (time: number) => {
        if(time > 0) {
            let temp = time;
            const day = parseInt((temp / (3600 * 24)).toString());
            temp = temp - day * 3600 * 24;
            const hour = parseInt((temp / 3600).toString());
            temp = temp - hour * 3600;
            const minute = parseInt((temp / 60).toString());
            const second = temp - minute * 60;
            setTime({ day: day, hour: hour, minute: minute, second: second });
        }
        return { day: 0, hour: 0, minute: 0, second: 0 };
    }

  return (
    <div id="MINT" className="d-flex align-items-center mt-80 min-vh-100">

        <div className="container">
            <div className={cn(styles.card)}>
                <div className="d-flex flex-column">
                    <img
                        className="w-100 border-radius-20 border-5"
                        src="/images/penguins.gif"
                        alt="Video preview"
                    />
                    <TimerStyled seconds={time.second} minutes={time.minute} hours={time.hour} days={time.day} />
                    {
                        walletAddress.length === lengthOfAddress ? (
                            <button
                                className={cn("button", "mt-10", styles.button, remainTime > 0 && "bg-secondary")}
                                onClick={() => {
                                    // clearMinted().then((result) => {
                                    //     console.log(result);
                                    // });
                                    // createCollections().then((result) => {
                                    //     console.log(result);
                                    // });
                                    if(remainTime < 0) {
                                        setVisibleModalBid(true);
                                    } else {
                                        toast('danger', "Launch Time: (10/29/2021 20:00 UTC).");
                                    }
                                }}
                            >
                                MINT
                            </button>
                        ) : (
                            <button
                                className={cn("button", "mt-10", styles.button)}
                                onClick={() => connectWallet()}
                            >
                                Unlock Wallet
                            </button>
                        )
                    }
                </div>
            </div>
            <Modal
                visible={visibleModalBid}
                onClose={() => setVisibleModalBid(false)}
            >
                <MintModalContent/>
            </Modal>
        </div>
    </div>
  );
};

export default Mint;
