import React from 'react';
import SpaceTokensUi from "./RewardTokensUi";

interface TokenData {
  tokens: number;
  image: string;
  title: string;
  subtitle: string;
}

interface RewardTokensViewProps {
  data: TokenData[];
}

const RewardTokensView: React.FC<RewardTokensViewProps> = ({ data }) => {
  return <SpaceTokensUi data={data} />;
};

export default RewardTokensView;