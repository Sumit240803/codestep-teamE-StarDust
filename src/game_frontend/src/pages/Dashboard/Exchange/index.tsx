import ProgressBar from "../../../components/ui/Progressbar"
import Sidebar from "../../../components/ui/Sidebar"
import '../index.css'
import usePoints from "../../../hooks/usePoints"
import Loader from "../../../components/ui/Loader"
import { motion } from "framer-motion"
import { useState } from "react"

const Exchange = () => {
  const { points, incrementPoints, isLoading } = usePoints(0)
  const [isPressed, setIsPressed] = useState(false)

  return (
    <main className="exchange-container  relative w-screen h-full">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section className="flex items-center justify-center w-screen font-coin z-10">
            <img
              className="z-100"
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
          <div className="flex md:hidden rotate-90 z-20 t-10 w-[40%] absolute bottom-20 left-1/2 -translate-x-1/2">
            <ProgressBar />
          </div>

          {/* Medium and Large Screen */}
          <div className="hidden md:block absolute top-1/2 -bottom-1 -translate-y-1/2 right-10">
            <ProgressBar />
          </div>

          <Sidebar />

          <motion.section
            onClick={incrementPoints}
            className={`click-to-earn ${isPressed ? "glow" : ""}`}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500 }}
            style={{
              backgroundImage: 'url("/assets/images/firefly-removebg-preview.png")',
              position : 'fixed',
              left : 650,
              bottom: -190,
              
              width: '20%',
              height: "100%",
              
             
              backgroundRepeat: 'no-repeat',
       
              zIndex: 1,
            }}
          />
        </>
      )}
    </main>
  )
}

export default Exchange
