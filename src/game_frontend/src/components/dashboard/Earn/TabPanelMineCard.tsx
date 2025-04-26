// MyCardsPanel.tsx
import React, { useState } from 'react';
import Card from '../../ui/Minecard';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import { MINE_CARD } from '../../../utils/api/update';
import { ModalBody, ModalHeader } from '../../ui/Modal/utils';
import { useAuth } from '../../../hooks/useAuth';
import { bigIntToNumber } from '../../../utils';

interface MyCardsPanelProps {
  MyCardsData: Cards[];
}

export const MyCardsPanel: React.FC<MyCardsPanelProps> = ({ MyCardsData }) => {
  return (
    <div className="card-grid">
      {MyCardsData?.map((card) => (
        <Card
          key={card.id}
          name={card.name}
          subtitle={card.subtitle}
          points={card.points}
          level={card.level}
          cost={card.cost}
          image={card.image}
          time={card.time}
        />
      ))}
    </div>
  );
};

// MissedCardsPanel.tsx
interface MissedCardsPanelProps {
  MissedCardsData: Cards[];
}

export const MissedCardsPanel: React.FC<MissedCardsPanelProps> = ({ MissedCardsData }) => {
  const [selectedCard, setSelectedCard] = useState<bigint>(BigInt(0));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = useAuth();
  const mineCardMutation = MINE_CARD(auth?.actors, selectedCard);

  const handleCardClick = (card_id :  bigint) => {
    setSelectedCard(card_id);
    setIsModalOpen(true);
  };

  const handleMineCard = async() => {
    if (selectedCard) {
      try {
        await mineCardMutation.mutateAsync();
        console.log(mineCardMutation)
      } catch (error) {
        console.error(error);
      } finally{
      setIsModalOpen(false);
      }
    }
  };

  return (
    <div className="card-grid">
      {MissedCardsData.map((card) => (
        <Card
          key={card.id}
          name={card.name}
          subtitle={card.subtitle}
          points={card.points}
          level={card.level}
          cost={card.cost}
          image={card.image}
          time={card.time}
          onClick={() => handleCardClick(card.id)} // Ensure onClick is passed down
        />
      ))}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ModalHeader>
            <p className='text-white text-center text-2xl md:text-3xl font-coin'>Are you sure you want to mine this card?</p>
          </ModalHeader>
          <ModalBody>
            <div className='flex flex-row justify-around items-center'>
              <Button 
              className='!w-fit px-2 py-2'
              variant="primary" size='xs' onClick={handleMineCard}>Yes</Button>
              <Button 
              className='!w-fit px-2 py-2'
              variant="secondary" size='xs' onClick={() => setIsModalOpen(false)}>No</Button>
            </div>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};