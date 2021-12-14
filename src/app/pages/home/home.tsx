import React, {useEffect} from "react";
import Mint from "./mint/mint";
import RoadMap from "./roadmap/roadmap";
import Team from "./team/team";
import {useUser} from "../../core/context-provider/user/user-context";
import Welcome from "./welcome/welcome";

const Home = (props: any) => {
    const { pageIndex, setPageIndex } = useUser();
    const { location } = props;
    useEffect(() => {
        if(pageIndex === 1 || pageIndex === 2) {
            return;
        }
        if(location.hash === '#MINT') {
            setPageIndex(3);
        } else if(location.hash === '#ROADMAP') {
            setPageIndex(4);
        } else if(location.hash === '#TEAM') {
            setPageIndex(5);
        }
    },[]);

  return (
    <div>
        <Mint />
        <Welcome/>
        <RoadMap />
        <Team />
    </div>
  );
};

export default Home;
