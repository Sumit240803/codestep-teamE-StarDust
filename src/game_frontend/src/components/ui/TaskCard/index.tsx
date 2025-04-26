import React, { ReactNode } from 'react';
import './index.css';


// Reusable Components
export const TokenIcon = ({ children }: BaseProps) => (
  <div className="token-icon">
    {children}
  </div>
);

export const SectionTitle = ({ children }: BaseProps) => (
  <h2 className="section-title">
    {children}
  </h2>
);

export const Section = ({ title, children }: SectionProps) => (
  <>
    <SectionTitle>{title}</SectionTitle>
    <div className="section-content">
      {children}
    </div>
  </>
);

const ChevronRight = () => (
  <svg
    className="chevron-icon"
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
);

export const TokenCounter = ({ count }: { count: number }) => (
  <div className="token-counter">
    <img
      src="/assets/ufo.svg"
      loading="lazy"
      alt="ufo"
    />
    <span className="token-count">+{count}</span>
  </div>
);

export const TaskItem = ({ icon, children, tokenCount }: TaskItemProps) => (
  <div className="task-item">
    <div className="task-item-left">
      <TokenIcon>{icon}</TokenIcon>
      <div className="task-item-content">
        <span className="task-item-text">{children}</span>
        <TokenCounter count={tokenCount} />
      </div>
    </div>
    <div className="task-item-right">
      <ChevronRight />
    </div>
  </div>
); 
