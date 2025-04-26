import React from "react";
import TaskContent from "../../ui/TaskContent";

interface Achievement {
  id: number;
  title: string;
}

interface Setting {
  id: number;
  title: string;
  language: string;
}

interface AchievementsDataTabProps {
  achievementsData: Achievement[];
}

interface SettingDataTabProps {
  settingsData: Setting[];
}

export const AchievementsDataTab: React.FC<AchievementsDataTabProps> = ({
  achievementsData,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {achievementsData.map((achievement) => (
        <h2 className="font-coin lg:flex lg:justify-center  pt-8">
          {achievement.title}
        </h2>
      ))}
    </div>
  );
};

export const SettingDataTab: React.FC<SettingDataTabProps> = ({
  settingsData,
}) => {
  return (
    <div className="flex flex-col justify-start  ">
      {settingsData.map((setting) => (
        <TaskContent key={setting.id}>
          <div>
            <h1 className="font-coin text-xl ">{setting.title}</h1>
            <p>{setting.language}</p>
            <div className="mt-4 border-t border-gray-500/80 "></div>
          </div>
        </TaskContent>
      ))}
    </div>
  );
};
