import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Timer from './Timer';
import { styled } from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import TimerModal from '../modal/timerModal';

function Timerapp(props) {
  const [timeover, setTimeOver] = useState(false);
  const {isNum} = props;

  useEffect(() => {
    setTimeOver(false)
    const timer = setTimeout(() => {
      setTimeOver(true)
    }, 5000);
    return () => clearTimeout(timer);
  }, [isNum])

  return (
    <>
    {timeover ?
    <div>
    </div>
    :
    <TimerModal>
    <Container>
    <CountdownCircleTimer
      isPlaying
      duration={5}
      colors="#9E3DFF"
      isLinearGradient={true}
      onComplete={() => ({ delay: 1 })}
      strokeWidth={5}
      size={260}
    >
      {Timer}
      </CountdownCircleTimer>
    </Container>
    <Text>(웹캠이 있는 환경에서 이용해주세요)</Text>
    <Text2>5초 뒤에 인터뷰가 바로 시작됩니다.</Text2>
    </TimerModal>
  }
    </>
  )
}

export default Timerapp

const Container = styled.div`
  text-align: center;
  position: absolute;
  top: 600px;
  left: 50%;
  transform: translate(-50%, -70%);
  z-index: 10;
  @media screen and (max-width: 1000px) {
       top: 550px;
  }
`

const Text = styled.div`
  text-align: center;
  position: relative;
  top: 770px;
  left: 50%;
  transform: translate(-50%, -50%);
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 25px;
`

const Text2 = styled.div`
  text-align: center;
  position: relative;
  top: 700px;
  left: 50%;
  transform: translate(-50%, -50%);
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 25px;
`