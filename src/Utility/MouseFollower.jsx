import React, { useEffect } from 'react'
import gsap from 'gsap';
export default function MouseFollower({children}) {
const MouseFollower = React.useRef(null);
useEffect(()=>{
   
    const cursorzoomELements = document.querySelectorAll('.cursorzoom');
cursorzoomELements.forEach((cursorzoomELement)=>{
    cursorzoomELement.addEventListener('mouseover',()=>{
        gsap.to(MouseFollower.current,{scale:cursorzoomELement.getAttribute('cursorscale'),duration:0.5,ease:'ease.out'})
      
    });
    cursorzoomELement.addEventListener('mouseleave',()=>{
        gsap.to(MouseFollower.current,{scale:1,duration:0.5,ease:'elastic.out'})
    })

  
})
const MouseFollow = (e)=>{  

  if(MouseFollower.current){
    gsap.set(MouseFollower.current,{xPercent:-70,yPercent:-70})
  gsap.to(MouseFollower.current,{
      x: e.pageX - scrollX,
      y: e.pageY - scrollY,
  duration:2,
  ease: "back.out(1.7)",
  })
  }
  
};

window.addEventListener('mousemove',MouseFollow)




},[]);




  return (
    React.cloneElement(children,{ref:MouseFollower,position:'absolute'})
  )
}
