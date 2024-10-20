import React from 'react'
import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive';
export default function GsapMagnetic({children}) {
    const Magnetic = React.useRef(null);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    React.useEffect(()=>{
        const MouseMove = (e)=>{
        const {clientX,clientY} = e;
        const bounding = Magnetic.current.getBoundingClientRect();
        const {offsetWidth,offsetHeight} = Magnetic.current;
        const x = clientX - bounding.left - offsetWidth/2;
        const y = clientY - bounding.top - offsetHeight/2;
        const tl = gsap.timeline();
        tl.to(Magnetic.current,{
            x:x,
            y:y,
            duration:0.5,
            ease:'power1.Out',
        },0)
        if(Magnetic.current.children[0] && Magnetic.current.children[0].children[0]){
        tl.to(Magnetic.current.children[0].children[0],{
      
          fill:'#eb5939',
          duration:0.2,
        },0)
      }

       }
       const MouseLeave = ()=>{
        const tl = gsap.timeline();
              tl.to(Magnetic.current,{
                x:0,
                y:0,
                duration:2,
                ease: "elastic.out",
              })
              if(Magnetic.current.children[0] && Magnetic.current.children[0].children[0]){
              tl.to(Magnetic.current.children[0].children[0],{
      
                fill:'#b7ab98',
                duration:0.2,
              },0)
            }
         }
         if(isMobile){
           return;
         }
       Magnetic.current.addEventListener('mousemove',MouseMove)
       Magnetic.current.addEventListener('mouseover',MouseMove)
       Magnetic.current.addEventListener('mouseleave',MouseLeave)
         return ()=>{
              Magnetic.current.removeEventListener('mousemove',MouseMove)
              Magnetic.current.removeEventListener('mouseleave',MouseLeave)
         }
    },[])
  return (
 React.cloneElement(children,{ref:Magnetic,style:{transform:'all 0.1s'}})
  )
}
