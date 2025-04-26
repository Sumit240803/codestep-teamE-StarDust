import { memo } from "react";
import { Link, useMatch, useLocation } from "react-router-dom";
import "./index.css";

const SidebarTab = memo(({ title, icon }: SideBarChildren)  => {
    const basePath = "/dashboard";
    const targetPath = `${basePath}/${title.toLowerCase().split(' ').join('-')}`;
    const location = useLocation();
    
    // Check if current path is /dashboard and this is the Exchange tab
    const isDashboardRoot = location.pathname === '/dashboard' && 
                          title.toLowerCase() === 'exchange';
    
    // Check if the targetPath matches the current URL
    const match = useMatch(targetPath);
    const isActive = !!match || isDashboardRoot;

    return (
        <Link to={targetPath}>
            <div
                role="tab"
                aria-selected={isActive ? "true" : "false"}
                tabIndex={0}
                className={`sidebar-tab-container ${isActive ? "active" : ""}`}
            >
                <img src={icon} alt={title} title={title} />
                <p className="sidebar-title">{title}</p>
            </div>
        </Link>
    );
});

export default SidebarTab;

