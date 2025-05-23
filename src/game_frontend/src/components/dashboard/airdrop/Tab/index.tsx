// import Button from "../../../ui/Button";
import usePoints from "../../../../hooks/usePoints";
import { useTokens } from "../../../../hooks/useTokens";
import { Tabs, Tab, TabPanel } from "../../../ui/Tab";
import "./index.css";
const TokenPanel = () => {
  const {points} = usePoints()
  const { tokens, isLoading, isError, refetch } = useTokens();
  return (
    <TabPanel index={0}>
      <table className="tokenpanel">
        <tbody className="tokenpanel-body">
          <tr>
            <td>Tokens</td>
            <td>{tokens.toString()}</td>
          </tr>
          <tr>
            <td>Game Points</td>
            <td>{points.toFixed(3)}</td>
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
