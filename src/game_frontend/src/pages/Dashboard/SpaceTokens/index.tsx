import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AdventureStartView from "./AdventureStartView";
import RewardTokensView from "./RewardTokensView";

// Define the shared interface
export interface TokenData {
  tokens: number;
  image: string;
  title: string;
  subtitle: string;
}

export interface adventureData {
  tokens: number;
  title: string;
  subtitle: string;
}

const SpaceTokens: React.FC = () => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);

  // Define the data for both views
  const adventureStartData:  adventureData[] = [
    {
      tokens: 0,
      title: "Days of playing Star Dust adventure",
      subtitle: "Click anywhere..."
    }
  ];

  const rewardTokensData: TokenData[] = [
    {
      tokens: 0,
      image: "/assets/ufo.svg",
      title: "Tokens earned",
      subtitle: "Click anywhere..."
    }
  ];

  const handleClick = () => {     
    setClickCount(prev => prev + 1);          
    
    if (clickCount + 1 === 2) {       
      navigate('/dashboard');     
    }   
  };

  return (
    <div
      onClick={handleClick}
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url("/Firefly-bg.webp")',
        backgroundSize: 'cover'
      }}
    >
      {clickCount === 0 ? (
        <AdventureStartView data={adventureStartData} />
      ) : (
        <RewardTokensView data={rewardTokensData} />
      )}
    </div>
  );
};

export default SpaceTokens;