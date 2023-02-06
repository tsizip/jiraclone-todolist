import React from 'react'
import {useSpring, animated} from 'react-spring'


export default function SlideShow(Component) {

     let propsSpring = useSpring({
          to:{
               marginTop: '0'
          },
          from:{
               marginTop: '-100px'
          },
          config:{duration:1000}
     })

     return (
          <animated.div style={propsSpring}>
               <Component/>
          </animated.div>
     )
}
