import React from "react";

interface TooltipProps {
  title: string; // Tooltip content as a  string 
  children: React.ReactNode; // The element triggering the tooltip
}

const Tooltip: React.FC<TooltipProps> = ({ title, children }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute left-1/2 -translate-x-1/2 w-[10vw] bottom-full  flex flex-col items-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Tooltip box */}
        <div className="bg-slate-800 text-white text-xs md:text-sm rounded py-1 px-2 shadow-lg relative">
          {title}
          {/* Caret shape */}
          <div className="absolute  left-1/2 transform -translate-x-1/2 translate-y-1  border-x-8 border-x-transparent border-t-8 border-t-slate-800"></div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
