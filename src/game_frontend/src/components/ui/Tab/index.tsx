import React, { memo } from "react";
import { TabsProps, TabProps, TabPanelProps } from "../../../types/Tab";
import { useTab, TabProvider } from "../../../hooks/useTab";
import TagContainer from "../TagContainer";
import "./index.css";
/**
 * Main `Tabs` component to wrap Tab and TabPanel components.
 * @param {TabsProps} props - Props for the Tabs component
 * @returns {JSX.Element}
 */
export const Tabs: React.FC<TabsProps> = ({ children }) => {
  return (
    <TabProvider>
      <div role="tablist" aria-label="Tab List" className="tablist">
        {children}
      </div>
    </TabProvider>
  );
};

/**
 * Individual `Tab` component to represent a tab button.
 * Memoized to prevent unnecessary re-renders.
 * @param {TabProps} props - Props for the Tab component
 * @returns {JSX.Element}
 */
export const Tab: React.FC<TabProps> = memo(({ children, index }) => {
  const { activeTab, setActiveTab, tabsRefs } = useTab();

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      const totalTabs = tabsRefs.current.length;

      switch (e.key) {
        case "ArrowRight":
          setActiveTab((prev) => (prev + 1) % totalTabs);
          tabsRefs.current[(index + 1) % totalTabs]?.focus();
          break;
        case "ArrowLeft":
          setActiveTab((prev) => (prev - 1 + totalTabs) % totalTabs);
          tabsRefs.current[(index - 1 + totalTabs) % totalTabs]?.focus();
          break;
        default:
          break;
      }
    },
    [index, setActiveTab, tabsRefs]
  );

  return (
    <button
      role="tab"
      ref={(el) => (tabsRefs.current[index] = el)}
      aria-selected={activeTab === index}
      aria-controls={`tab-panel-${index}`}
      id={`tab-${index}`}
      tabIndex={activeTab === index ? 0 : -1}
      onClick={() => setActiveTab(index)}
      onKeyDown={handleKeyDown}
      className={activeTab === index ? "active-tab" : "tab"}
    >
      {activeTab === index ? <TagContainer>{children}</TagContainer> : children}
    </button>
  );
});

/**
 * Individual `TabPanel` component to display content for the active tab.
 * Memoized to prevent unnecessary re-renders.
 * @param {TabPanelProps} props - Props for the TabPanel component
 * @returns {JSX.Element}
 */
export const TabPanel: React.FC<TabPanelProps> = memo(({ children, index }) => {
  const { activeTab } = useTab();

  return activeTab === index ? (
    <div
      role="tabpanel"
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-${index}`}
      className="tab-panel"
    >
      {children}
    </div>
  ) : null;
});
