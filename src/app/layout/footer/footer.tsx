import React from "react";
import cn from "classnames";
import styles from "./Footer.module.sass";
import TwitterIcon from "../icon/twitter-icon";
import DiscordIcon from "../icon/discord-icon";

const Footers = () => {

  return (
    <footer className={styles.footer}>
      <div className={cn("container", styles.container)}>
        <div className={styles.foot}>
          <div className={styles.copyright}>
            Copyright © 2021 UI8 LLC. All rights reserved
          </div>
          <div>
            <a className="mr-20" href="https://twitter.com/harmonypenguins?s=21">
              <TwitterIcon/>
            </a>
            <a href="https://discord.gg/ruKn8fuBRD">
              <DiscordIcon/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
