import { createContext, ReactNode, useContext, useState } from "react";
import Joyride, { Step, Styles } from "react-joyride";

interface JoyRideContextProps {
    steps : Step[];
    setSteps : React.Dispatch<React.SetStateAction<Step[]>>;
    run : boolean;
    setRun : React.Dispatch<React.SetStateAction<boolean>>;
    styles : Styles['options'] | null;
    setStyles : React.Dispatch<React.SetStateAction<Styles['options'] | null>>;
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
    return (
        <JoyRideContext.Provider value={{steps, setSteps, run , setRun,styles , setStyles}}>
            {children}
            <Joyride
            steps={steps}
            run = {run}
            disableScrolling
            continuous
            styles={{
              options : {
                zIndex : 10000,
                ...styles
              }
            }}
            />
        </JoyRideContext.Provider>
    )
}