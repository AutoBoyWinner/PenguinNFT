import React, {useEffect, useState} from "react";
import cn from "classnames";
import { backgrounds, clothes, eyes, glasses, hairs, hats, mouths, necks, random_objects, skins } from "../../../app/core/data/basic-images";
import Pagination from '@material-ui/lab/Pagination';

import Icon from "../../layout/Icon";
import MarketCard from "../../component/market-card/market-card";
import {useOverlay} from "../../core/context-provider/loading-overlay/loading-overlay-context";
import {Penguin} from "../../core/models/penguin";
import {getMarketPlaceItems} from "../../core/utils/network/catalog";
import {useUser} from "../../core/context-provider/user/user-context";
import {Filter} from "../../core/models/filter";
import Dropdown from "../../component/dropdown/dropdown";

import styles from "./Search01.module.sass";
import "./catalog-page.scss";

export const countOnDisplay: number = 12;

const Marketplace = () => {

    const { setIsActivity, setOverlayText } = useOverlay();
    const { setPageIndex, walletAddress } = useUser();

    const [penguin, setPenguin] = useState<Penguin>({
        background: '',
        skin: '',
        eye: '',
        mouth: '',
        cloth: '',
        glass: '',
        hair: '',
        hat: '',
        neck: '',
        random_object: '',
    });

    const dropDownDatas =
        [
            { key: 'background', data: backgrounds },
            { key: 'hat', data: hats },
            { key: 'skin', data: skins },
            { key: 'eye', data: eyes },
            { key: 'mouth', data: mouths },
            { key: 'cloth', data: clothes },
            { key: 'glass', data: glasses },
            { key: 'hair', data: hairs },
            { key: 'neck', data: necks },
            { key: 'random_object', data: random_objects }
        ];
    const [filterData, setFilterData] = useState<Filter>({
        walletAddress: '',
        penguin: penguin,
        offset: 0,
        limit: countOnDisplay,
    });

    const [pageCount, setPageCount] = useState<number>(0);
    const [penguins, setPenguins] = useState<Penguin[]>([]);

    useEffect(() => {
        loadMarketPenguins();
    }, [walletAddress])

    useEffect(() => {
        setFilterData({ ...filterData, penguin: penguin });
    }, [penguin])

    const loadMarketPenguins = () => {
        setPageIndex(1);
        setIsActivity(true);
        setOverlayText('...Loading');
        getMarketPlaceItems(filterData).then((result: [Penguin[], number]) => {
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
    }

    const getObject = (key: string): string => {
        const keys = Object.keys(penguin);
        if (keys.indexOf(key) >= 0) {
            // @ts-ignore
            return penguin[key];
        }
        return '';
    }

  return (
    <div className={cn("section-pt100", "min-vh-100")}>
      <div className={cn("container")}>
        <div className={styles.row}>
          <div className={styles.filters}>
              <button
                  className={cn("button-small", "w-100", "mb-10", styles.button)}
                  onClick={() => {
                      loadMarketPenguins();
                  }}
              >
                  Filter
              </button>
            <div className={styles.group}>
                <div className={styles.label}>ADDRESS</div>
                <input
                    className={cn(styles.input, "mb-10")}
                    type="text"
                    value={ filterData.walletAddress }
                    onChange={(e) => setFilterData({ ...filterData, walletAddress: e.target.value })}
                    name="ADDRESS"
                    placeholder="Search"
                    required
                />
                {
                    dropDownDatas.map((item, index: number) => (
                        <div className={styles.item} key={ index }>
                            <div className={styles.label}>{item.key}</div>
                            <Dropdown
                                className={styles.dropdown}
                                keyValue={item.key}
                                penguin={penguin}
                                value={getObject(item.key)}
                                setPenguin={setPenguin}
                                options={item.data}
                            />
                        </div>
                    ))
                }
            </div>
            <div className={styles.reset} onClick={() => {
                setPenguin(
                {
                        background: '',
                        skin: '',
                        eye: '',
                        mouth: '',
                        cloth: '',
                        glass: '',
                        hair: '',
                        hat: '',
                        neck: '',
                        random_object: '',
                    }
                );
                setFilterData({ ...filterData, penguin: {
                        background: '',
                        skin: '',
                        eye: '',
                        mouth: '',
                        cloth: '',
                        glass: '',
                        hair: '',
                        hat: '',
                        neck: '',
                        random_object: '',
                    } });
            }}>
              <Icon name="close-circle-fill" size="24" />
              <span>Reset filter</span>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={cn(styles.list)}>
              {
                  penguins.map((x: any, index: number) => (
                    <MarketCard className={styles.card} penguin={x} key={index} />
                  ))
              }
            </div>
              <div className="d-flex justify-content-center my-20">
                  {
                      pageCount > 1 && (
                          <Pagination count={ pageCount } variant="outlined" shape="rounded"
                              onChange={(event, value) => {
                                  const offset = (value - 1) * countOnDisplay;
                                  setFilterData({...filterData, offset: offset});
                                  setOverlayText('...Loading');
                                  setIsActivity(true);
                                  getMarketPlaceItems({...filterData, offset: offset}).then(async (result: [Penguin[], number]) => {
                                      setOverlayText('...Loading');
                                      setIsActivity(false);
                                      if(!result) {
                                          return;
                                      }
                                      setPenguins([...result[0]]);
                                  });
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

export default Marketplace;