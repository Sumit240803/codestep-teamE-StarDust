import { useEffect } from "react";
import Incentives from "../../../components/dashboard/airdrop/Incentives";
import AirdropTab from "../../../components/dashboard/airdrop/Tab";
import Button from "../../../components/ui/Button";
import helper from "../../../utils/frontendUtil";
import "./index.css";
import { useJoyRide } from "../../../context/JoyrideContext";
import { airdropSteps } from "../../../steps/appsteps";

const Airdrop = () => {
  const {setSteps , setRun,setStepIndex} = useJoyRide();
  useEffect(()=>{
    /*const newUser = helper();
    if(newUser === "true"){

    }*/
   setSteps(airdropSteps)
   setStepIndex(0);
   setTimeout(() => {setRun(true); /*localStorage.setItem("firstTime" , "false")*/}, 150); 
  },[])
  return (
    <>
      <main className="main-container air-1">
        <section className="main-header">
          <h2 className="page-title">We did it!</h2>
          <div className="ufo-container">
            <img
              src="/assets/images/ufo-bg.svg"
              alt="ufo"
              loading="lazy"
              width={100}
              height={100}
            />
          </div>
          <p>token is on the market</p>
          <img src="/assets/images/astronaut.webp" alt="astrouant" className="astrouant-img" loading="lazy" />
        </section>
        <section className="airdrop-body air-2">
          <AirdropTab />
          {/* <div className='spacer'></div> */}
          <Incentives />
        </section>
        <div className="flex justify-center lg:justify-start mt-10 lg:mt-0 ">
          <Button
            title="Choose a withdrawal option"
            className="withdrawal-btn "
          >
            Choose a withdrawal option
          </Button>
        </div>
      </main>
    </>
  );
};
export default Airdrop;
