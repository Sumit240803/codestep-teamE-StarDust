// import Button from "../../../ui/Button";
import usePoints from "../../../../hooks/usePoints";
import { Tabs, Tab, TabPanel } from "../../../ui/Tab";
import "./index.css";
const TokenPanel = () => {
  const {points} = usePoints()
  return (
    <TabPanel index={0}>
      <table className="tokenpanel">
        <tbody className="tokenpanel-body">
          <tr>
            <td>Total Tokens</td>
            <td>0</td>
          </tr>
          <tr>
            <td>Claimed</td>
            <td>0</td>
          </tr>
          <tr>
            <td>Vesting</td>
            <td>{points.toFixed(3)}</td>
          </tr>
          <tr>
            <td>Available at October 6th</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
      {/* <Button title="Choose a withdrawal option" className="withdrawal-button">
        Choose a withdrawal option
      </Button> */}
    </TabPanel>
  );
};

const AirdropTab = () => {
  return (
    <Tabs>
      <div className="flex">
        <Tab index={0}>
          <p>Token</p>
        </Tab>
        <Tab index={1}>
          <p>Withdrawal</p>
        </Tab>
      </div>
      <TokenPanel />
      <TabPanel index={1}>
        <div className="font-coin">
          <h3>Claim your Locals</h3>
          <p>Claim your tokens by connecting your wallet</p>
          <button>Connect Wallet</button>
        </div>
      </TabPanel>
    </Tabs>
  );
};
export default AirdropTab;
