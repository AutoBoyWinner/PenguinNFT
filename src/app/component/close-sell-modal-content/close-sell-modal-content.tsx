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

interface CloseModalProps {
    penguinData: any
    onClose: () => void
    setPenguinData: (penguin: any) => void
}

const CloseSellModalContent = (props: CloseModalProps) => {

    const { penguinData, onClose, setPenguinData } = props;
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
                <div className="font-weight-normal mt-10">New price:</div>
                <input
                    className={styles.input}
                    type="number"
                    value={ price }
                    onChange={(e) => setPrice(Number(e.target.value))}
                    name="search"
                    placeholder="Search"
                    required
                />
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
                                className={cn(styles.link, "ml-10", "text-success", "p-5 border-1 border-radius-5")}
                                onClick={() => {
                                    const priceValue = new BigNumber(price).multipliedBy(ethUnit);
                                    harmonyPenguinContract.methods.changeTokenPrice(penguinData?.tokenId, priceValue.toString()).send({ from: walletAddress }).then((result: any) => {
                                        if(penguinData) {
                                            toast('success', 'success');
                                            setPenguinData({...penguinData, price: price});
                                        }
                                    });
                                }}
                            >
                                UPDATE PRICE
                            </button>
                            <button
                                className={cn(styles.link, "ml-10", "text-success", "p-5 border-1 border-radius-5")}
                                onClick={() => {
                                    harmonyPenguinContract.methods.toggleForSale(penguinData?.tokenId, false).send({ from: walletAddress }).then((result: any) => {
                                        if(penguinData) {
                                            toast('success', 'success');
                                            setPenguinData({...penguinData, isForSale: false});
                                        }
                                    });
                                }}
                            >
                                CANCEL SALE
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

export default CloseSellModalContent;
