import React from "react";
import { Tabs, Tab, TabPanel } from "../../ui/Tab";
import { AchievementsDataTab, SettingDataTab } from "./TabSwitchData";

interface Achievement {
  id: number;
  title: string;
}

interface Setting {
  id: number;
  title: string;
  language: string;
}

interface TabSwitchProps {
  achievementsData: Achievement[];
  settingsData: Setting[];
}

const TabSwitch: React.FC<TabSwitchProps> = ({
  achievementsData,
  settingsData,
}) => {
  return (
    <div className="h-full ">
      <div className="flex  mt-2">
        <div className="h-full ">
          <Tabs>
            <div className="flex">
              <Tab index={0}>
                <p>Achievement</p>
              </Tab>
              <Tab index={1}>
                <p>Setting</p>
              </Tab>
            </div>

            <TabPanel index={0}>
              <AchievementsDataTab achievementsData={achievementsData} />
            </TabPanel>

            <TabPanel index={1}>
              <SettingDataTab settingsData={settingsData} />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TabSwitch;
