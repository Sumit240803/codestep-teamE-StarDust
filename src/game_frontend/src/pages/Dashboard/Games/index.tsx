import React from 'react'
import "./index.css"
import { Tab, TabPanel, Tabs } from '../../../components/ui/Tab'
import { ListAllGames } from '../../../components/dashboard/games/GamesCard'
import { useAllGameCards } from '../../../hooks/useGames'
import { useMarket } from '../../../hooks/useMarket'
import MarketPlace from '../../../components/dashboard/games/MarketPlace'

const Games : React.FC = () => {


      const {allGames , isLoading} = useAllGameCards();
      const {nfts} = useMarket();
      
  return (
    <div>
     

    <div className="card-container-header">
       
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
                    <p className='coin-ding-dong'><MarketPlace MarketData={nfts}/></p>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
    </div>
  )
}

export default Games