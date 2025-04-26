import React from "react";
import TabSwitch from "../../../components/Profile/ProfileTabs/TabSwitch";

interface Achievement {
  id: number;
  title: string;
}

interface Setting {
  id: number;
  title: string;
  language: string;
}

const AchievementsData: Achievement[] = [
  {
    id: 1,
    title: "No achievement yet",
  },
];

const SettingsData: Setting[] = [
  {
    id: 1,
    title: "Select language",
    language: "English",
  },
  {
    id: 2,
    title: "Setting",
    language: "",
  },
];

const ProfileTabs: React.FC = () => {
  return (
    <div className="w-full min-h-full flex  px-4">
      <div className="w-full max-w-7xl mx-auto sm:px-6 lg:px-6">
        <div className="sm:w-11/12 md:w-4/5 lg:w-[85%] xl:w-[95%] xl:mx-14 2xl:mx-0 2xl:w-full 2xl:mx-0 mx-auto">
          <TabSwitch
            achievementsData={AchievementsData}
            settingsData={SettingsData}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;