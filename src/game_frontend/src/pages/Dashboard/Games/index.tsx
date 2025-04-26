import React from 'react'
import "./index.css"
import { Tab, TabPanel, Tabs } from '../../../components/ui/Tab'
import { ListAllGames } from '../../../components/dashboard/games/GamesCard'
const Games : React.FC = () => {
    const ALL_GAMES = [
        {
          title: "Rocket Rush",
          image: "/assets/images/mine01.svg",
          description: "Blast off and race through the galaxy to reach new heights!",
          winBonus: 150,
          energy: 20
        },
        {
          title: "Treasure Hunt",
          image: "/assets/images/mine02.svg",
          description: "Dive into mysterious caves and find hidden treasures.",
          winBonus: 200,
          energy: 25
        },
        {
          title: "Mystic Maze",
          image: "/assets/images/mine03.svg",
          description: "Navigate through endless mazes full of magic and traps.",
          winBonus: 180,
          energy: 15
        }
      ];
      
  return (
    <div>

    <div className="card-container-header">
        <h2 className="card-title">Game Arena</h2>
      </div>
        <div className="mine-card-container">
              <div className="mine-card-inner">
                <Tabs>
                  <div className="min-card-tab">
                    <Tab index={0}>
                      <p>All Games</p>
                    </Tab>
                    
                  </div>
        
                  <TabPanel index={0}>
                    {<ListAllGames GameDetails={ALL_GAMES}/>}
                  </TabPanel>
                </Tabs>
              </div>
            </div>
    </div>
  )
}

export default Games