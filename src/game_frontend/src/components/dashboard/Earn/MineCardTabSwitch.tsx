// MineCardTabSwitch.tsx
import React from "react";
import { Tabs, Tab, TabPanel } from "../../ui/Tab";
import { MyCardsPanel, MissedCardsPanel } from "./TabPanelMineCard";
import "./index.css";
import { useAllCards } from "../../../hooks/useCards";


const MineCardTabSwitch=()=>{
  const {allCards, userCards, isLoading} = useAllCards()
  return (
    <div className="mine-card-container">
      <div className="mine-card-inner">
        <Tabs>
          <div className="min-card-tab">
            <Tab index={0}>
              <p>My Card</p>
            </Tab>
            <Tab index={1}>
              <p>Missed Card</p>
            </Tab>
          </div>

          <TabPanel index={0}>
            {isLoading ? <p>Loading...</p>:<MyCardsPanel MyCardsData={userCards} />}
          </TabPanel>

          <TabPanel index={1}>
            {isLoading?<p>Loading...</p>:<MissedCardsPanel MissedCardsData={allCards} />}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default MineCardTabSwitch;
