import React, { useEffect, useRef } from 'react';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/src/ScrollTrigger';
export default function ScrollActiveText({ children, color,endpoint='500',startpoint='700',duration='0.5'}) {
  const ref = useRef();
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: `top ${startpoint}`,
        endTrigger:'#AboutMe-section',
        end: `+=${endpoint}`,
        scrub: 1,
        
      },duration:`${duration}`,
      '--scroll-text-percent': '0%',
    })


  }, [])
  return (
    <>
      <div  style={{ color: color, position: "relative" }}>

        <div ref={ref} style={{ color: color, position: "relative"}} id='Scrolling-text'>{children.props.children}</div>
        {
          
          React.cloneElement(children, {
            style: { ...children.props.style, opacity: 0.2, position: "absolute", left: '0', top: '0' },
          })
        }

      </div>
    </>
  );
}
