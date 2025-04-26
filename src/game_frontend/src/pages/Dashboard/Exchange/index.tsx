import ProgressBar from "../../../components/ui/Progressbar"
import Sidebar from "../../../components/ui/Sidebar"
import '../index.css'
import usePoints from "../../../hooks/usePoints"
import Loader from "../../../components/ui/Loader"

const Exchange=()=>{
    const {points, incrementPoints, isLoading} = usePoints(0)
    // Future 
    /**
     * Batch Update after a set of interval
     */

    return(

        <main className="exchange-container relative w-screen h-full">

       {isLoading ? <Loader/>: (
        <>
        <section className="flex items-center justify-center w-screen font-coin z-10">
            <img src='/assets/images/ufo.svg' alt="ufo" width={50} height={50} loading="lazy"/>
            <h3 className="exchange-points font-bold text-4xl">{points.toFixed(3)}</h3>
        </section>

        {/* sm screen */}
        <div className="flex md:hidden rotate-90 z-20  t-10 w-[40%] absolute bottom-20 left-1/2 -translate-x-1/2">
        <ProgressBar />
      </div>
      
      {/* Medium and Large Screen */}
      <div className="hidden md:block absolute top-1/2 -bottom-1 -translate-y-1/2 right-10">
        <ProgressBar />
      </div>
        
        <Sidebar/>

        <section
            onClick={incrementPoints}
            className="click-to-earn"
            style={{
                backgroundImage: 'url("/assets/images/firefly.webp")',
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '100%',  
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center bottom',
                zIndex:1
                
            }}
        >
        </section>
    </>    
    ) 
    } 
        </main>
    )
}
export default Exchange