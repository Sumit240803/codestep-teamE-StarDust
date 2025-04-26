import React from "react";
import "./index.css";
import useWallet from "../../../hooks/useWallet";
import { Link } from "react-router-dom";


const Navbar: React.FC<NavbarProps> = ({ profitPerHour = 0.3 }) => {
  const WalletImage = useWallet();
  return (
    <header className="header">
      <div className="top-nav-bar">
        <nav className="nav-content">
          <div className="nav-icon">
            <img
              src={WalletImage}
              alt="icp-png"
              loading="lazy"
              width={32}
              height={32}
            />
          </div>

          {/* Separator */}
          <div className="nav-separator"></div>

          <div className="nav-stats-container">
            <div className="profit-stats">
              <span className="profit-label">Profit per hour</span>
              <span className="profit-value">
                <img
                  src="/assets/ufo.svg"
                  alt="ufo-icon"
                  className="ufo-icon"
                  height={16}
                  width={16}
                />
                <span className="profit-amount">+{profitPerHour}</span>
              </span>
            </div>
            <Link to="/dashboard/profile">
              <div className="character-icon">

                <img
                  src="/assets/character.svg"
                  alt="pixel character"
                  className="character-image"
                  height={24}
                  width={24}
                />
              </div>
            </Link>

          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
