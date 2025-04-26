import React from "react";
import Tooltip from "../../../ui/Tooltip";

interface InfoToolTipProps {
  title: string;
  width?: number;     
  height?: number;   
}

const InfoToolTip: React.FC<InfoToolTipProps> = ({ title, width = 20, height = 20 }) => {
  return (
    <Tooltip title={title}>
      <img
        src="/assets/images/Info.svg"
        alt="info"
        loading="lazy"
        width={width}
        height={height}
      />
    </Tooltip>
  );
};

export default InfoToolTip;
