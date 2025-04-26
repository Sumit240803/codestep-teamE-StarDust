import React from 'react';
import MineCardTabSwitch from '../../../components/dashboard/Earn/MineCardTabSwitch';
import './index.css';

// const MyCardsData = [
//   {
//     id: 1,
//     title: "Market Manipulation",
//     subtitle: "You control the price",
//     profitPerHour: 0.3,
//     clickPerHour: 45,
//     level: 0,
//     cost: 2,
//     image: "/assets/images/mine01.svg"
//   },
//   {
//     id: 2,
//     title: "Day Trading",
//     subtitle: "Quick profits, high risk",
//     profitPerHour: 0.5,
//     clickPerHour: 60,
//     level: 0,
//     cost: 3,
//     image: "/assets/images/mine02.svg"
//   },
//   {
//     id: 3,
//     title: "Crypto Mining",
//     subtitle: "Digital gold rush",
//     profitPerHour: 0.7,
//     clickPerHour: 75,
//     level: 0,
//     cost: 4,
//     image: "/assets/images/mine03.svg"
//   },
//   {
//     id: 4,
//     title: "Stock Analysis Pro",
//     subtitle: "Advanced market insights",
//     profitPerHour: 1.2,
//     clickPerHour: 100,
//     level: 0,
//     cost: 5,
//     image: "/assets/images/mine01.svg"
//   },
//   {
//     id: 5,
//     title: "AI Trading Bot",
//     subtitle: "Automated trading system",
//     profitPerHour: 1.5,
//     clickPerHour: 120,
//     level: 0,
//     cost: 6,
//     image: "/assets/images/mine02.svg"
//   },
//   {
//     id: 6,
//     title: "Quantum Analytics",
//     subtitle: "Future of trading",
//     profitPerHour: 2.0,
//     clickPerHour: 150,
//     level: 0,
//     cost: 8,
//     image: "/assets/images/mine03.svg"
//   }
// ];

// const MissedCardsData = [
//   {
//     id: 4,
//     title: "Stock Analysis Pro",
//     subtitle: "Advanced market insights",
//     profitPerHour: 1.2,
//     clickPerHour: 100,
//     level: 0,
//     cost: 5,
//     image: "/assets/images/mine01.svg"
//   },
//   {
//     id: 5,
//     title: "AI Trading Bot",
//     subtitle: "Automated trading system",
//     profitPerHour: 1.5,
//     clickPerHour: 120,
//     level: 0,
//     cost: 6,
//     image: "/assets/images/mine02.svg"
//   },
//   {
//     id: 6,
//     title: "Quantum Analytics",
//     subtitle: "Future of trading",
//     profitPerHour: 2.0,
//     clickPerHour: 150,
//     level: 0,
//     cost: 8,
//     image: "/assets/images/mine03.svg"
//   }
// ];

const CardContainer: React.FC = () => {
  return (
    <div>
      <div className="card-container-header">
        <h2 className="card-title">Mine cards</h2>
      </div>
      <MineCardTabSwitch/>
    </div>
  );
};

export default CardContainer;