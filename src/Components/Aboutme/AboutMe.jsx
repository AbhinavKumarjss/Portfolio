import React from 'react'
import './AboutMe.css'
import ScrollActiveText from '../../Utility/ScrollActiveText'
export default function AboutMe() {
  return (
    <div id='AboutMe-section' className='cursorzoom' cursorscale={9}>
      <div id='AboutMe-section-flex'>
      <div id='AboutMe-section-flex-item'>
      <div id='AboutMe-section-heading'>

      ABOUT ME
      </div>
    
      <h2 id='AboutMe-heading'>
      <ScrollActiveText endpoint='500' startpoint='650' duration='2'>
        <div>
      I’m a  Developer
        </div>
        </ScrollActiveText>
      </h2>
      <h2 className='AboutMe-hidden' >
      <ScrollActiveText endpoint='500' startpoint='600' duration='3'>
        <div>
      Me = Web2 + Web3
        </div>
        </ScrollActiveText>
      </h2>
      <br />
      <br />
      <h2 id='AboutMe-heading'>
      <ScrollActiveText endpoint='500' startpoint='650' duration='2'>
        <div>
      A Self learner
        </div>
        </ScrollActiveText>
      </h2>
      <h2 className='AboutMe-hidden'>
      <ScrollActiveText endpoint='500' startpoint='650' duration='2'>
        <div>
      Born for coding
        </div>
        </ScrollActiveText>
      </h2>
      </div>
      </div>
    </div>
  )
}
