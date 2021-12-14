import React, {useEffect, useState} from "react";
import { BigNumber } from 'bignumber.js';
import cn from "classnames";
import Web3 from 'web3';

import styles from "./Connect.module.sass";
import {lengthOfAddress} from "../../core/utils/wallet";
import {useUser} from "../../core/context-provider/user/user-context";
import {harmonyPenguinAbi} from "../../core/data/web3-abi-address/abi";
import {harmonyPenguinAddress} from "../../core/data/web3-abi-address/address";
import {useOverlay} from "../../core/context-provider/loading-overlay/loading-overlay-context";
import {toast} from "../../core/utils/notification.util";
import {getMintedCount, getMultiPenguinNotMinted} from "../../core/utils/network/penguin";
import {Penguin} from "../../core/models/penguin";

const MintModalContent = () => {

    const { walletAddress, connectWallet } = useUser();

    const { setIsActivity, setOverlayText } = useOverlay();

    const [mintedAmount, setMintedAmount] = useState<number>(0);
    const [mintAmount, setMintAmount] = useState<number>(0);
    const [primaryPrice, setPrimaryPrice] = useState<BigNumber>(new BigNumber(0));

    const ethereum = window.ethereum;
    const metaWeb3 = new Web3(ethereum);
    const harmonyPenguinContract = new metaWeb3.eth.Contract(harmonyPenguinAbi, harmonyPenguinAddress);

    useEffect(() => {
        getPrimaryData().then();
    },[])

    const getPrimaryData = async () => {
        setOverlayText('Loading...');
        setIsActivity(true);
        const contract = new metaWeb3.eth.Contract(harmonyPenguinAbi, harmonyPenguinAddress);
        const price = await contract.methods.getTokenPrimaryPrice().call();
        setPrimaryPrice(new BigNumber(price));
        const amount = await getMintedCount();
        setMintedAmount(amount);
        setIsActivity(false);
    }

    const mintPenguins = async () => {
        if(mintAmount <= 0) {
            toast('danger', 'Please input mint amount.');
            return;
        }
        const balanceOfEth = await metaWeb3.eth.getBalance(walletAddress);
        const myBalance = new BigNumber(balanceOfEth);
        const mintCost = primaryPrice.multipliedBy(mintAmount);
        if(myBalance.comparedTo(mintCost) < 0) {
            toast('danger', `You haven't enough cost for ${mintAmount} NFTS in your wallet.` );
            return;
        }
        getMultiPenguinNotMinted(mintAmount).then((penguins) => {
            const penguinsData: any[] = [];
            penguins.forEach((penguin: Penguin) => {
                if(penguin) {
                    const background: string = penguin.background;
                    const skin: string = penguin.skin;
                    const eye: string = penguin.eye;
                    const mouth: string = penguin.mouth;
                    const cloth: string = penguin.cloth;
                    const glass: string = penguin.glass;
                    const hair: string = penguin.hair;
                    const hat: string = penguin.hat;
                    const neck: string = penguin.neck;
                    const random_object: string = penguin.random_object;

                    const penguinString: string[] = [];
                    penguinString.push(background);
                    penguinString.push(skin);
                    penguinString.push(eye);
                    penguinString.push(mouth);
                    penguinString.push(cloth);
                    penguinString.push(glass);
                    penguinString.push(hair);
                    penguinString.push(hat);
                    penguinString.push(neck);
                    penguinString.push(random_object);
                    const data = { dbID: penguin.id, _tokenURI: penguin.tokenURI, _penguin: penguinString };
                    penguinsData.push(data);
                }
            });
            setIsActivity(true);
            setOverlayText('...Uploading');
            harmonyPenguinContract.methods.mintPenguins(penguinsData).send({ from: walletAddress, value: primaryPrice.multipliedBy(mintAmount) })
                .on('error', function (error: any) {
                    setIsActivity(false);
                })
                .then((result: any) => {
                    getMintedCount().then((amount: number) => {
                        setMintedAmount(amount);
                    });
                    toast('success', `${mintAmount} NFTS were minted as successful.`)
                    setIsActivity(false);
                })

        });
    }

  return (
    <div className={cn(styles.connect)}>
        <div className={cn(styles.card)}>
            <div className="d-flex flex-column">
                <div className="d-flex flex-center flex-column">
                    <div className="text-warning h4 font-weight-normal mt-10">Mint Random Penguins</div>
                    <div className="text-white h5 font-weight-normal mt-10">Balance: 200 ONE</div>
                    <div className="text-white h5 font-weight-normal mt-10">Minted: {mintedAmount} / 8888</div>
                    <div className="text-white h5 font-weight-normal mt-10">Remaining: { (8888-mintedAmount) }</div>
                </div>
                <img
                    className="w-100 border-radius-20 border-5"
                    src="/images/penguins.gif"
                    alt="Video preview"
                />
                <input
                    className={styles.input}
                    type="number"
                    value={ mintAmount }
                    onChange={(e) => setMintAmount(Number(e.target.value))}
                    name="search"
                    placeholder="Search"
                    required
                />
                {
                    walletAddress.length === lengthOfAddress ? (
                        <button
                            className={cn("button", "mt-10", styles.button)}
                            onClick={() => {
                                mintPenguins().then();
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
    </div>
  );
};

export default MintModalContent;
