import { createContext, ReactNode, useContext, useState } from "react";
import Joyride, { Step, Styles } from "react-joyride";

interface JoyRideContextProps {
    steps : Step[];
    setSteps : React.Dispatch<React.SetStateAction<Step[]>>;
    run : boolean;
    setRun : React.Dispatch<React.SetStateAction<boolean>>;
    styles : Styles['options'] | null;
    setStyles : React.Dispatch<React.SetStateAction<Styles['options'] | null>>;
    stepIndex : number;
    setStepIndex : React.Dispatch<React.SetStateAction<number>>;
}

const JoyRideContext = createContext<JoyRideContextProps | null>(null);
export const useJoyRide = ()=>{
    const context = useContext(JoyRideContext);
    if(!context) throw new Error("useJoyRide must be used within a JoyRideProvider");
    return context;
}
export const JoyRideProvider = ({children} : {children : ReactNode})=>{
    const [steps, setSteps] = useState<Step[]>([]);
    const [run , setRun]  = useState<boolean>(false);
    const [ styles , setStyles] = useState<Styles['options'] | null>(null);
    const [stepIndex , setStepIndex] = useState<number>(0);
    return (
        <JoyRideContext.Provider value={{steps, setSteps, run , setRun,styles , setStyles, setStepIndex , stepIndex}}>
            {children}
            <Joyride
            steps={steps}
            run = {run}
            disableScrolling
            stepIndex={stepIndex}
            callback={(data)=>{
                const {action ,index,status , type} = data;
                if(['finished' , 'skipped'].includes(status)){
                    setRun(false);
                    setStepIndex(0);
                }else if(type === 'step:after' || type === 'error:target_not_found'){
                    setStepIndex((prev)=> prev+1);
                }
            }}
            continuous
            showProgress
            showSkipButton
            disableOverlay
            styles={{
    options: {
      zIndex: 10000,
      primaryColor: '#ffffff',
      textColor: '#25043b',      
      backgroundColor: '#ecd7fa',
      arrowColor: '#fff',     
      overlayColor: 'rgba(0, 0, 0, 0.6)',
      width: 400,
    },
    buttonNext: {
      backgroundColor: '#871a84',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '14px',
    },
    buttonBack: {
      marginRight: 10,
      color: '#6B7280',
      fontSize: '14px',
    },
    buttonClose: {
      color: '#EF4444',
      fontSize: '16px',
    },
    tooltip: {
      fontSize: '16px',
      lineHeight: '1.6',
      fontFamily : 'Coin Ding Dong'
    },
    tooltipContainer: {
      textAlign: 'left',
      padding: '15px',
    },
    tooltipTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      fontFamily : 'Coin Ding Dong'
    }
  }}
            />
        </JoyRideContext.Provider>
    )
}