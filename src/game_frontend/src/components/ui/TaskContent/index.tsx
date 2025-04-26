import React, { ReactNode } from "react";
import "./index.css";

const TaskContent = ({ children, className = "" }: ContentBoxProps) => {
  return (
    <div className={`task-content-wrapper ${className}`}>
      <div className="task-content-inner">
        <div className="task-content-body">{children}</div>
        <svg
          className="task-content-arrow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default TaskContent;
