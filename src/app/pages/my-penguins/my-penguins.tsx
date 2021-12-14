import React, {useEffect, useState} from "react";
import cn from "classnames";
import Pagination from '@material-ui/lab/Pagination';

import MarketCard from "../../component/market-card/market-card";
import { useOverlay } from "../../core/context-provider/loading-overlay/loading-overlay-context";
import {
    getMintedPenguins,
    getMyPenguinsNoListed,
    getMyPenguinsOnSale
} from "../../core/utils/network/catalog";

import { useUser } from "../../core/context-provider/user/user-context";
import { Filter } from "../../core/models/filter";
import { Penguin } from "../../core/models/penguin";
import { lengthOfAddress } from "../../core/utils/wallet";

import "./catalog-page.scss";
import styles from "./Search01.module.sass";

export const countOnDisplay: number = 8;

const MyPenguins = () => {

    const navLinks = [ "No List", "On Sale", "Minted" ];
    const { setIsActivity, setOverlayText } = useOverlay();
    const { setPageIndex, walletAddress } = useUser();
    const [activeIndex, setActiveIndex] = useState(0);

    const [filterData, setFilterData] = useState<Filter>({
        offset: 0,
        limit: countOnDisplay,
        walletAddress: walletAddress,
    });

    const [pageCount, setPageCount] = useState<number>(0);
    const [penguins, setPenguins] = useState<Penguin[]>([]);

    useEffect(() => {
        setIsActivity(true);
        setOverlayText('...Loading');
        setFilterData({...filterData, walletAddress: walletAddress});
        if(walletAddress.length !== lengthOfAddress) {
            getMyPenguins({...filterData, walletAddress: walletAddress}, activeIndex);
            return;
        }
        getMyPenguinsNoListed({...filterData, walletAddress: walletAddress}).then((result: [Penguin[], number]) => {
            setIsActivity(false);
            if(!result || !result[0]) {
                return;
            }
            setPenguins([...result[0]]);
            if(parseInt(String(result[1] / countOnDisplay)) === 0){
                setPageCount(parseInt(String(result[1] / countOnDisplay)));
            } else if(parseInt(String(result[1] / countOnDisplay)) > 0) {
                setPageCount(parseInt(String(result[1] / countOnDisplay)) + 1);
            }
        });
    }, [walletAddress]);

    useEffect(() => {
        setPageIndex(2);
    },[]);

    const setDisplayPenguins = (penguinsData: [Penguin[], number]) => {
        setIsActivity(false);
        if(!penguinsData || !penguinsData[0]) {
            return;
        }
        setPenguins([...penguinsData[0]]);
        if(parseInt(String(penguinsData[1] / countOnDisplay)) === 0){
            setPageCount(parseInt(String(penguinsData[1] / countOnDisplay)));
        } else if(parseInt(String(penguinsData[1] / countOnDisplay)) > 0) {
            setPageCount(parseInt(String(penguinsData[1] / countOnDisplay)) + 1);
        }
    }

    const getMyPenguins = (filter: Filter, index: number) => {
        setIsActivity(true);
        switch (index) {
            case 0:
                getMyPenguinsNoListed(filter).then(async (result: [Penguin[], number]) => {
                    setDisplayPenguins(result);
                });
                break;
            case 1:
                getMyPenguinsOnSale(filter).then(async (result: [Penguin[], number]) => {
                    setDisplayPenguins(result);
                });
                break;
            case 2:
                getMintedPenguins(filter).then(async (result: [Penguin[], number]) => {
                    setDisplayPenguins(result);
                });
                break;
            default:
                getMyPenguinsNoListed(filter).then(async (result: [Penguin[], number]) => {
                    setDisplayPenguins(result);
                });
                break;
        }
    }

  return (
    <div className={cn("section-pt100", "min-vh-100")}>
      <div className="container">
          <div className={cn("d-flex flex-row justify-content-around")}>
              <div>
                  {navLinks.map((item, index) => (
                      <button
                          className={cn(styles.link, {
                              [styles.active]: index === activeIndex,
                          })}
                          key={index}
                          onClick={() => {
                              setActiveIndex(index);
                              setFilterData({ ...filterData, offset: 0 });
                              getMyPenguins({ ...filterData, offset: 0 }, index);
                          }}
                      >
                          {item}
                      </button>
                  ))}
              </div>
              <button
                  className={cn("button-small", styles.button)}
                  onClick={() => {
                      getMyPenguins(filterData, activeIndex);
                  }}
              >
                  Refresh
              </button>
          </div>
        <div className={cn(styles.row, "mt-20")}>
          <div className={styles.wrapper}>
            <div className={cn(styles.list)}>
              {
                  penguins.map((item: any, index: number) => (
                    <MarketCard className={styles.card} penguin={item} key={index} />
                  ))
              }
            </div>
              <div className="d-flex justify-content-center my-20">
                  {
                      pageCount > 1 && (
                          <Pagination count={ pageCount } page={filterData.offset / countOnDisplay + 1} variant="outlined" shape="rounded"
                                      onChange={(event, value) => {
                                          const offset = (value - 1) * countOnDisplay;
                                          setFilterData({...filterData, offset: offset});
                                          setOverlayText('...Loading');
                                          setIsActivity(true);
                                          switch (activeIndex) {
                                              case 0:
                                                  getMyPenguinsNoListed({...filterData, offset: offset}).then(async (result: [Penguin[], number]) => {
                                                        setDisplayPenguins(result);
                                                  });
                                                break;
                                              case 1:
                                                  getMyPenguinsOnSale({...filterData, offset: offset}).then(async (result: [Penguin[], number]) => {
                                                        setDisplayPenguins(result);
                                                  });
                                                  break;
                                              case 2:
                                                  getMintedPenguins({...filterData, offset: offset}).then(async (result: [Penguin[], number]) => {
                                                        setDisplayPenguins(result);
                                                  });
                                                  break;
                                              default:
                                                  getMyPenguinsNoListed({...filterData, offset: offset}).then(async (result: [Penguin[], number]) => {
                                                        setDisplayPenguins(result);
                                                  });
                                                  break;
                                          }
                                      }}
                          />
                      )
                  }
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPenguins;