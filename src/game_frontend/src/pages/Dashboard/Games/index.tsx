import React from 'react'
import "./index.css"
import { Tab, TabPanel, Tabs } from '../../../components/ui/Tab'
import { ListAllGames } from '../../../components/dashboard/games/GamesCard'
import { useAllGameCards } from '../../../hooks/useGames'

const Games : React.FC = () => {

    /*const ALL_GAMES = [
        {
          title: "Rocket Rush",
          image: "/assets/images/game1/bg-1.png",
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
      ];*/
      const {allGames , isLoading} = useAllGameCards();
      
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
                    <Tab index={1}>
                      <p>MarketPlace</p>
                    </Tab>
                    
                  </div>
        
                  <TabPanel index={0}>
                    {isLoading ? <p>Loading...</p> : <ListAllGames GameDetails={allGames}/>}
                  </TabPanel>

                  <TabPanel index={1}>
                    <p className='coin-ding-dong'>This is Marketplace</p>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
    </div>
  )
}

export default Games