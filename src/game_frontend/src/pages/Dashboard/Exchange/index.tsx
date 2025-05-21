import ProgressBar from "../../../components/ui/Progressbar"
import Sidebar from "../../../components/ui/Sidebar"
import '../index.css'
import usePoints from "../../../hooks/usePoints"
import Loader from "../../../components/ui/Loader"
import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import Joyride from "react-joyride"
import { useJoyRide } from "../../../context/JoyrideContext"
import { exchangeSteps } from "../../../steps/appsteps"

const Exchange = () => {
  const particles = useMemo(() =>
  Array.from({ length: 70 }).map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: 5 + Math.random() * 5,
  })), []
);

  const { points, incrementPoints, isLoading } = usePoints(0)
  const [isPressed, setIsPressed] = useState(false);
   const {setSteps , setRun,setStepIndex} = useJoyRide();
   //const [show , setShow] = useState<string | null>("");
   /*if(typeof window !== 'undefined'){
      (console.log(localStorage.getItem('firstTime')))
   }*/
   useEffect(() => {
  //  if(localStorage.getItem('firstTime') === "true"){

      
  
  setSteps(exchangeSteps);
  setStepIndex(0);
  // Slight delay ensures steps are registered before starting
  setTimeout(() => {setRun(true); /*localStorage.setItem("firstTime" , "false")*/}, 150); 
//}
}, []);




  return (
    <main className="exchange-container   relative w-screen h-full">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section className="flex items-center justify-center w-screen font-coin z-10 ">
            <img
              className="z-100 "
              src="/assets/images/ufo.svg"
              alt="ufo"
              width={50}
              height={50}
              loading="lazy"
            />
            <h3 className="exchange-points font-bold text-4xl">
              {points.toFixed(3)}
            </h3>
          </section>

          {/* sm screen */}
          <div className="flex md:hidden rotate-90 z-20 t-10 w-[40%] absolute bottom-20 left-1/2 -translate-x-1/2 ">
            <ProgressBar />
          </div>

          {/* Medium and Large Screen */}
          <div className="hidden md:block absolute top-1/2 -bottom-1 -translate-y-1/2 right-10 step-2">
            <ProgressBar />
          </div>


          <Sidebar />
<div className="">
         <motion.section
  onClick={incrementPoints}
  className={`step-1 click-to-earn ${isPressed ? "glow" : ""}`}
  onMouseDown={() => setIsPressed(true)}
  onMouseUp={() => setIsPressed(false)}
  onMouseLeave={() => setIsPressed(false)}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 500 }}
  style={{
    backgroundImage: 'url("/assets/images/firefly-removebg-preview.png")',
    position: 'fixed',
    top: '30%',
    left: '45%',
    
    width: '300px',     // adjust as needed
    height: '500px',    // adjust as needed
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    zIndex: 10,
  }}
/>
  </div>
{particles.map((p, i) => (
  <motion.div
    key={i}
    style={{
      position: "absolute",
      width: 6,
      height: 6,
      background: "rgb(121, 4, 195)",
      borderRadius: "50%",
      top: p.top,
      left: p.left,
    }}
    animate={{
      y: [-10, 10, -10],
      x: [0, 5, 0],
      opacity: [0.2, 1, 0.2],
    }}
    transition={{
      repeat: Infinity,
      duration: p.duration,
      ease: "easeInOut",
    }}
  />
))}


        </>
      )}
    </main>
  )
}

export default Exchange
