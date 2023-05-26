import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Timer from './Timer';
import { styled } from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';

function Timerapp(props) {
  const [timeover, setTimeOver] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setTimeOver(true)
    }, 5000);
  })
  return (
    <>
    {timeover ?
    <div>
    </div>
    :
    <Container>
    <CountdownCircleTimer
      isPlaying
      duration={5}
      colors="#9E3DFF"
      isLinearGradient={true}
      onComplete={() => ({ delay: 1 })}
      strokeWidth={5}
      size={230}
    >
      {Timer}
      </CountdownCircleTimer>
    </Container>
  }
    </>
  )
}

export default Timerapp

const Container = styled.div`
  text-align: center;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  @media screen and (max-width: 1000px) {
       top: 55%;
  }
`