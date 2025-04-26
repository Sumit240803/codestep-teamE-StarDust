import { ReactNode } from "react";

interface TabsProps {
    /** Children elements, usually `Tab` and `TabPanel` components */
    children: ReactNode;
}

interface TabProps {
    /** Content to display within the Tab button */
    children: ReactNode;
    /** Index of the Tab in the tab list */
    index: number;
}

interface TabPanelProps {
    /** Content to display within the TabPanel */
    children: ReactNode;
    /** Index of the TabPanel in the list */
    index: number;
}

interface TabsContextProps {
    /** The currently active tab index */
    activeTab: number;
    /** Function to set the active tab */
    setActiveTab:  React.Dispatch<React.SetStateAction<number>>;
    /** References to tab elements for keyboard navigation */
    tabsRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
}
