import React from 'react'
import './Projects.css'
import ScrollActiveText from '../../Utility/ScrollActiveText'
export default function Projects() {
    return (
        <div id='Projects-section' >

            <div id='Experience-section' className='cursorzoom' cursorscale={5}>
                <div id='Experience-section-heading'>EXPERIENCE</div>


                <h2 >

                    <div>

                        <ScrollActiveText endpoint='50' startpoint='600' duration='3'>
                            <div>I have been into coding</div>
                        </ScrollActiveText>
                        <ScrollActiveText endpoint='50' startpoint='600' duration='3'>
                            <div>from a very young age</div>
                        </ScrollActiveText>
                        <ScrollActiveText endpoint='50' startpoint='600' duration='3'>
                            <div>I am a self learned developer</div>
                        </ScrollActiveText>
                        <ScrollActiveText endpoint='50' startpoint='600' duration='3'>
                            <div>I have learnt from mistakes</div>
                        </ScrollActiveText>
                        <ScrollActiveText endpoint='100' startpoint='600' duration='3'>
                            <div>I believe Easy roads are no roads</div>
                        </ScrollActiveText>

                    </div>
                </h2>

            </div>
            <div id='Projects' className='cursorzoom' cursorscale={0}>
                <div id="Projects-heading">PROJECTS</div>
                <div id='Projects-item-container'>

                    <div id="Skills-section-flex-item">
                        <a target="_blank" href='https://watchtogether-yrqt.onrender.com/' id='Skills-section-flex-item-heading'><h1><div>WATCH TOGETHER</div></h1></a>

                        <div id='orange-world'>
                            <h1 id='orange-world-heading'>Watch</h1>
                            <div id='o-flex' >
                                A Video Watching Web App <br />
                                You can watch movie from online <br />
                                source with your friends in realtime <br />
                                Made with Socket.io 
                            </div>

                        </div>
                    </div>
                    
                </div>
            </div>


        </div>
    )
}
