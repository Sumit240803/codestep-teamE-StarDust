// MineCardTabSwitch.tsx
import React, { useEffect } from "react";
import { Tabs, Tab, TabPanel } from "../../ui/Tab";
import { MyCardsPanel, MissedCardsPanel } from "./TabPanelMineCard";
import "./index.css";
import { useAllCards } from "../../../hooks/useCards";
import { useJoyRide } from "../../../context/JoyrideContext";
import { cardStep } from "../../../steps/appsteps";


const MineCardTabSwitch=()=>{
  const {allCards, userCards, isLoading} = useAllCards()
   const {setSteps , setRun,setStepIndex} = useJoyRide();
  useEffect(()=>{
    setSteps(cardStep)
    setStepIndex(0);
    setTimeout(() => {setRun(true); /*localStorage.setItem("firstTime" , "false")*/}, 150); 
  },[])
  return (
    <div className="mine-card-container">
      <div className="mine-card-inner"> 
        <Tabs>
          <div className="min-card-tab">
            <Tab index={0}>
              <p className="card-1">My Card</p>
            </Tab>
            <Tab index={1}>
              <p className="card-2">Missed Card</p>
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
