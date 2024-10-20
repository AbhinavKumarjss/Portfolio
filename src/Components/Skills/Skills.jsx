import React from 'react'
import './Skills.css'
import ScrollActiveText from '../../Utility/ScrollActiveText'
export default function Skills() {
 
  return (
    <div id='Skills-section' className='cursorzoom' cursorscale={0}>
     

      <div id='Skills-section-flex'>

        <div id='Skills-section-heading'>SKILLS</div>
        <div id='Dsa-section'>
          <div id='Skills-section-flex-item'>
          <h1 id='Skills-section-flex-item-heading'><ScrollActiveText endpoint='500' startpoint='700' duration='4' ><div >DSA</div></ScrollActiveText></h1>
            <div id='orange-world'>
              <h1 id='orange-world-heading'>DSA</h1>
              <div id='o-flex'>
                I have Good Experience in DSA <br />
                and i Like it , Made my brain sharp !!
              </div>

            </div>
          </div>
        </div>


        <div id='Skills-section-flex-item'>
          <h1 id='Skills-section-flex-item-heading'><ScrollActiveText endpoint='500' startpoint='700' duration='2'><div>Security</div></ScrollActiveText></h1>
          <div id='orange-world'>
            <h1 id='orange-world-heading'>SECURITY</h1>
            <div id='o-flex'>
              I do little hacking in my free time <br />
              So i will hack you
            </div>

          </div>
        </div>

        <div id='Skills-section-flex-item'>
        <h1 id='Skills-section-flex-item-heading'><ScrollActiveText endpoint='500' startpoint='700' duration='2'><div>Fullstack</div></ScrollActiveText></h1>
          <div id='orange-world'>
            <h1 id='orange-world-heading'>FULLSTACK</h1>
            <div id='o-flex'>
              <div id='o-flex'>
                I am a good web developer <br />
                And i like perfection
              </div>
            </div>

          </div>
        </div>

        <div id='Skills-section-flex-item'>
        <h1 id='Skills-section-flex-item-heading'><ScrollActiveText endpoint='500' startpoint='650' duration='2'><div >Blockchain</div></ScrollActiveText></h1>
          <div id='orange-world'>
            <h1 id='orange-world-heading'>BLOCKCHAIN</h1>
            <div id='o-flex'>
              
                Its my favorite , I like it <br />
                Done with development , <br/>
                Now moving towards Security Reserching.
             
            </div>

          </div>
        </div>


      </div>
    </div>
  )
}
