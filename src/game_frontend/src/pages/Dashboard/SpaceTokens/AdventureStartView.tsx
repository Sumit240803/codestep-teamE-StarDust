import React from 'react';
import AdventureStartViewUi from './AdventureStartViewUi';

interface  adventureData {
  tokens: number;
  title: string;
  subtitle: string;
}

interface AdventureStartViewProps {
  data:  adventureData[];
}

const AdventureStartView: React.FC<AdventureStartViewProps> = ({ data }) => {
  return <AdventureStartViewUi data={data} />;
};

export default AdventureStartView;