import React, {useEffect, useState} from "react";
import { BigNumber } from 'bignumber.js';
import cn from "classnames";
import Web3 from 'web3';

import styles from "./Connect.module.sass";
import {lengthOfAddress} from "../../core/utils/wallet";
import {useUser} from "../../core/context-provider/user/user-context";
import {harmonyPenguinAbi} from "../../core/data/web3-abi-address/abi";
import {harmonyPenguinAddress} from "../../core/data/web3-abi-address/address";
import {toast} from "../../core/utils/notification.util";
import {ethUnit} from "../../core/data/ether-unit";
import {Canvas} from "../canvas";

interface SellModalProps {
    penguinData: any
    onClose: () => void
}

const BuyModalContent = (props: SellModalProps) => {

    const { penguinData, onClose } = props;
    const { walletAddress, connectWallet } = useUser();
    const [price, setPrice] = useState<number>(0);

    const ethereum = window.ethereum;
    const metaWeb3 = new Web3(ethereum);
    const harmonyPenguinContract = new metaWeb3.eth.Contract(harmonyPenguinAbi, harmonyPenguinAddress);

    useEffect(() => {
        setPrice(penguinData?.price);
    }, [penguinData])

  return (
    <div className={cn(styles.connect)}>
        <div className={cn(styles.card)}>
            <div className="d-flex flex-column">
                <div className="d-flex flex-center">
                    <h3 className="mt-10"># {penguinData?.tokenId}</h3>
                </div>
                <Canvas penguin={penguinData} className="mt-20 w-100 border-radius-10"/>
                <div className="d-flex flex-row mt-10">
                    <h4>Sales fees: 3% |</h4>
                    <h4>| 5% to Creator</h4>
                </div>
                {
                    walletAddress.length === lengthOfAddress ? (
                        <div className="d-flex flex-row mt-10 justify-content-end">
                            <button
                                className={cn(styles.link, 'text-danger', "p-5 border-1 border-radius-5")}
                                onClick={() => {onClose()}}
                            >
                                CANCEL
                            </button>
                            <button
                                className={cn(styles.link, "ml-20", "text-success", "p-5 border-1 border-radius-5")}
                                onClick={() => {
                                    harmonyPenguinContract.methods.buyToken(penguinData?.tokenId).send({ from: walletAddress, value: new BigNumber(price * ethUnit) }).then((result: any) => {
                                        if(penguinData) {
                                            toast('success', 'success');
                                        }
                                    });
                                }}
                            >
                                BUY
                            </button>
                        </div>
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
    </div>
  );
};

export default BuyModalContent;
