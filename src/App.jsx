
import './App.css'
import MouseFollower from './Utility/MouseFollower';
import Hero from './Components/Hero/Hero';
import Navbar from './Components/Navbar/Navbar';
import Skills from './Components/Skills/Skills';
import GsapTimeline from './Utility/GsapTimeline';
import AboutMe from './Components/Aboutme/AboutMe';
import Projects from './Components/Projects/Projects';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useRef } from 'react';
import OverlayAboutMe from './Components/Aboutme/OverlayAboutMe';

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const HeightGreater = useMediaQuery({ query: '(max-height: 400px)' });
  useEffect(() => {
   
  })
  return (
    
    <>
        {HeightGreater && 
        <h3>Aspect Ratio not Appropiate</h3>
        }
        {
          !HeightGreater && 
        
      <div style={{padding:'0px'}}id='app'>
        {!isMobile &&HeightGreater && <MouseFollower>
          <div style={{ mixBlendMode: 'difference',pointerEvents:'none' }} id='circle-MouseFollower'></div>
        </MouseFollower>}
       
        <GsapTimeline></GsapTimeline>
      

        <div  id='app-content'>
        <Navbar />
          <Hero />
          <OverlayAboutMe/>
          <AboutMe />
          <Skills />
          <Projects/>
        </div>
     
      </div>
     }
    </>
    
  )
}

export default App
