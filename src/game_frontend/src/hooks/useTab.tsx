import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { TabsContextProps } from "../types/Tab";

// Context for Tabs
const TabsContext = createContext<TabsContextProps | undefined>(undefined);

/**
 * Provider component for Tabs context.
 * Encapsulates state and provides context value.
 * 
 * @param {React.PropsWithChildren} props - Children to render inside the provider.
 * @returns {JSX.Element} The TabsProvider component
 */
export const TabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const tabsRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

    const contextValue = useMemo(
        () => ({ activeTab, setActiveTab, tabsRefs }),
        [activeTab] // Memoize to avoid unnecessary re-creation
    );

    return <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>;
};

/**
 * Custom hook to access Tabs context.
 * 
 * @throws {Error} If used outside a `TabProvider`.
 * @returns {TabsContextProps} Tabs context value.
 */
export const useTab = () => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error("useTab must be used within a TabProvider");
    }
    return context;
};

export default TabProvider;
