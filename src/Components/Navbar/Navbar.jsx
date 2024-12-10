import React, { useEffect } from 'react'
import GsapMagnetic from '../../Utility/GsapMagnetic'
import "./Navbar.css"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
export default function Navbar() {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.2,  // Increase duration for smoother scroll
    easing: (t) =>t*(2-t), // A custom easing function (ease-in-out)
    smooth: true,
    smoothWheel: true,
    lerp:0.1,
    
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


  
  return (
    <div id='navbar' >
      
      <ul id='navbar-links' className='cursorzoom CursorMask' cursorscale={0}>
        {/* <li id="navbar-link-hidden"className='cursorzoom CursorMask' cursorscale={0}>About Me</li> */}
        <div id='navbar-link-container'>
          <li id='navbar-link-conatiner-links'><a href="#AboutMe-section" onClick={()=>{ lenis.scrollTo(document.querySelector('#AboutMe-section'))}}>ABOUT</a></li>
          <li id='navbar-link-conatiner-links' ><a href="#AboutMe-section" onClick={()=>{ lenis.scrollTo(document.querySelector('#AboutMe-section'))}}>ABOUT</a></li>
        </div>
        <div id='navbar-link-container'>
          <li id='navbar-link-conatiner-links' ><a href="#Skills-section" onClick={()=>{ lenis.scrollTo(document.querySelector('#Skills-section'))}}>SKILLS</a></li>
          <li id='navbar-link-conatiner-links' ><a href="#Skills-section" onClick={()=>{ lenis.scrollTo(document.querySelector('#Skills-section'))}}>SKILLS</a></li>
        </div>
        <div id='navbar-link-container'>
          <li id='navbar-link-conatiner-links' ><a href="#Projects-section" onClick={()=>{ lenis.scrollTo(document.querySelector('#Projects-section'))}}>PROJECTS</a></li>
          <li id='navbar-link-conatiner-links' ><a href="#Projects-section" onClick={()=>{ lenis.scrollTo(document.querySelector('#Projects-section'))}}>PROJECTS</a></li>
        </div>
        <div id='navbar-link-container'>
          <li id='navbar-link-conatiner-links' ><a href="https://drive.google.com/file/d/1HnMsmQobru5CVpPqG7sYD9yBiShWlzHF/view" onClick={()=>{ lenis.scrollTo(document.querySelector('#Projects-section'))}}>RESUME</a></li>
          <li id='navbar-link-conatiner-links' ><a href="https://drive.google.com/file/d/1HnMsmQobru5CVpPqG7sYD9yBiShWlzHF/view" onClick={()=>{ lenis.scrollTo(document.querySelector('#Projects-section'))}}>RESUME</a></li>
        </div>
   
      </ul>
      
      <div id='navbar-MagneticFlex'>
      <a target="_blank" href="https://leetcode.com/u/AviAryaPanwar/">
          <GsapMagnetic>
            <div id='outer-GsapMagnetic'>
              <svg width="30px" height="30px" viewBox="0 -3.5 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet">
                <g fill="#b7ab98">
                  <path transform="scale(7.5)" xmlns="http://www.w3.org/2000/svg" d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" /></g>
                <script xmlns="" />
              </svg>
            </div>
          </GsapMagnetic>
          </a>
          <a target="_blank" href="https://github.com/AbhinavKumarjss">
          <GsapMagnetic>
            <div id='outer-GsapMagnetic'>
              <svg width="30px" height="30px" viewBox="0 -3.5 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet">
                <g fill="#b7ab98">
                  <path transform="scale(0.65)" d="M127.505 0C57.095 0 0 57.085 0 127.505c0 56.336 36.534 104.13 87.196 120.99 6.372 1.18 8.712-2.766 8.712-6.134 0-3.04-.119-13.085-.173-23.739-35.473 7.713-42.958-15.044-42.958-15.044-5.8-14.738-14.157-18.656-14.157-18.656-11.568-7.914.872-7.752.872-7.752 12.804.9 19.546 13.14 19.546 13.14 11.372 19.493 29.828 13.857 37.104 10.6 1.144-8.242 4.449-13.866 8.095-17.05-28.32-3.225-58.092-14.158-58.092-63.014 0-13.92 4.981-25.295 13.138-34.224-1.324-3.212-5.688-16.18 1.235-33.743 0 0 10.707-3.427 35.073 13.07 10.17-2.826 21.078-4.242 31.914-4.29 10.836.048 21.752 1.464 31.942 4.29 24.337-16.497 35.029-13.07 35.029-13.07 6.94 17.563 2.574 30.531 1.25 33.743 8.175 8.929 13.122 20.303 13.122 34.224 0 48.972-29.828 59.756-58.22 62.912 4.573 3.957 8.648 11.717 8.648 23.612 0 17.06-.148 30.791-.148 34.991 0 3.393 2.295 7.369 8.759 6.117 50.634-16.879 87.122-64.656 87.122-120.973C255.009 57.085 197.922 0 127.505 0" />
                  <path transform="scale(0.65)" d="M47.755 181.634c-.28.633-1.278.823-2.185.389-.925-.416-1.445-1.28-1.145-1.916.275-.652 1.273-.834 2.196-.396.927.415 1.455 1.287 1.134 1.923M54.027 187.23c-.608.564-1.797.302-2.604-.589-.834-.889-.99-2.077-.373-2.65.627-.563 1.78-.3 2.616.59.834.899.996 2.08.36 2.65M58.33 194.39c-.782.543-2.06.034-2.849-1.1-.781-1.133-.781-2.493.017-3.038.792-.545 2.05-.055 2.85 1.07.78 1.153.78 2.513-.019 3.069M65.606 202.683c-.699.77-2.187.564-3.277-.488-1.114-1.028-1.425-2.487-.724-3.258.707-.772 2.204-.555 3.302.488 1.107 1.026 1.445 2.496.7 3.258M75.01 205.483c-.307.998-1.741 1.452-3.185 1.028-1.442-.437-2.386-1.607-2.095-2.616.3-1.005 1.74-1.478 3.195-1.024 1.44.435 2.386 1.596 2.086 2.612M85.714 206.67c.036 1.052-1.189 1.924-2.705 1.943-1.525.033-2.758-.818-2.774-1.852 0-1.062 1.197-1.926 2.721-1.951 1.516-.03 2.758.815 2.758 1.86M96.228 206.267c.182 1.026-.872 2.08-2.377 2.36-1.48.27-2.85-.363-3.039-1.38-.184-1.052.89-2.105 2.367-2.378 1.508-.262 2.857.355 3.049 1.398" />
                </g>
                <script xmlns="" /></svg>
            </div>
          </GsapMagnetic>
          </a>
            <a target="_blank" href="https://www.linkedin.com/in/abhinav-kumar-071284256/">
          <GsapMagnetic>
            <div id='outer-GsapMagnetic'>
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={30} height={30}>
                <g fill="#b7ab98" xmlns="http://www.w3.org/2000/svg" id="XMLID_801_">
                  <path transform="scale(0.05)" id="XMLID_802_" d="M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73   C77.16,101.969,74.922,99.73,72.16,99.73z" />
                  <path transform="scale(0.05)" id="XMLID_803_" d="M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4   c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z" />
                  <path transform="scale(0.05)" id="XMLID_804_" d="M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599   c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319   c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995   C310,145.43,300.549,94.761,230.454,94.761z" />
                </g>
              </svg>

            </div>
          </GsapMagnetic>
            </a>

        </div>
        
    </div>
  )
}
