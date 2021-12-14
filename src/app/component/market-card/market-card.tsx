import React, {useEffect, useState} from "react";
import cn from "classnames";
import styles from "./Card.module.sass";
import {Canvas} from "../canvas";
import {lengthOfAddress, reduceTheWalletAddress} from "../../core/utils/wallet";
import Web3 from "web3";
import {harmonyPenguinAbi} from "../../core/data/web3-abi-address/abi";
import {harmonyPenguinAddress} from "../../core/data/web3-abi-address/address";
import {useUser} from "../../core/context-provider/user/user-context";
import {toast} from "../../core/utils/notification.util";
import BigNumber from "bignumber.js";
import {ethUnit} from "../../core/data/ether-unit";
import Modal from "../modal/modal";
import CloseSellModalContent from "../close-sell-modal-content/close-sell-modal-content";
import SellModalContent from "../sell-modal-content/sell-modal-content";
import BuyModalContent from "../buy-modal-content/buy-modal-content";

interface MarketCardProps {
    className: any;
    penguin: any
}

const MarketCard = (props: MarketCardProps) => {

    const { className, penguin } = props;
    const [penguinData, setPenguinData] = useState<any>();
    const { walletAddress, connectWallet } = useUser();
    const [price, setPrice] = useState<number>(0);
    const [isSaleForMode, setIsSaleForMode] = useState<boolean>(false);
    const [isModalShow, setIsModalShow] = useState(false);

    const ethereum = window.ethereum;
    const metaWeb3 = new Web3(ethereum);
    const harmonyPenguinContract = new metaWeb3.eth.Contract(harmonyPenguinAbi, harmonyPenguinAddress);

    useEffect(() => {
        if(penguin) {
            setPenguinData(penguin);
        }
    }, [penguin])

    useEffect(() => {
        if(penguinData) {
            setIsSaleForMode(penguinData?.isForSale);
            setPrice(penguinData?.price);
        }
    }, [penguinData])

      return (
        <div className={cn(className)}>
            <Canvas penguin={penguinData} className="w-100 border-radius-10"/>
            <div className={styles.body}>
                <div className={styles.line}>
                    <div className={styles.title}># {penguinData?.tokenId}</div>
                    <div className="d-flex flex-row">
                        <div className={cn(styles.title, "pr-10")}>Price: </div>
                        <div className={styles.price}>{penguinData?.price} ONE</div>
                    </div>
                </div>
                <div className={styles.status}>
                    <div className="h6">Transfers: {penguinData?.numberOfTransfers}</div>
                </div>
                {/*<div className={styles.status}>*/}
                {/*    <div className={cn(styles.title)}>*/}
                {/*        Owner: {reduceTheWalletAddress(penguinData?.currentOwner)}*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className={styles.status}>*/}
                {/*    <div className={cn(styles.title)}>*/}
                {/*        Minter: {reduceTheWalletAddress(penguinData?.mintedBy)}*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={styles.foot}>
                    {
                        walletAddress.length === lengthOfAddress ? (
                            <>
                                {
                                    walletAddress.toUpperCase() === penguinData?.currentOwner.toUpperCase() ? (
                                        <button className={cn("button-small", "w-100", styles.button)} onClick={() => {
                                            if(penguinData?.isMinted) {
                                                if(penguinData?.isForSale) {
                                                    setIsModalShow(true);
                                                } else {
                                                    setIsModalShow(true);
                                                }
                                            }
                                        }}>
                                            <span>
                                                {
                                                    penguinData?.isMinted && penguinData?.isForSale ? 'View' : 'Sell'
                                                }
                                            </span>
                                        </button>
                                    ) : (
                                        <button className={cn("button-small", "w-100", styles.button)} disabled={!isSaleForMode} onClick={() => {
                                            setIsModalShow(true);
                                        }}>
                                            <span>Buy</span>
                                        </button>
                                    )
                                }
                            </>
                        ) : (
                            <button className={cn("button-small", "w-100", styles.button)} disabled={!isSaleForMode} onClick={() => {
                                connectWallet();
                            }}>
                                <span>Connect Wallet</span>
                            </button>
                        )
                    }

                </div>
            </div>
            <Modal
                visible={isModalShow}
                onClose={() => setIsModalShow(false)}
            >
                {
                    walletAddress.toUpperCase() === penguinData?.currentOwner.toUpperCase() ? (
                        penguinData?.isMinted && penguinData?.isForSale ? (
                            <CloseSellModalContent penguinData={penguin} onClose={() => setIsModalShow(false)} setPenguinData={setPenguinData}/>
                        ) : (
                            <SellModalContent penguinData={penguin} onClose={() => setIsModalShow(false)} setPenguinData={setPenguinData}/>
                        )
                    ) : (
                        <BuyModalContent penguinData={penguin} onClose={() => setIsModalShow(false)}/>
                    )
                }
            </Modal>
        </div>
      );
};

export default MarketCard;
