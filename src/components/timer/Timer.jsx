import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { styled } from 'styled-components';

function Timer({ remainingTime }) {

  return (
    <Container>
      <CountStyle>
      {remainingTime === 0 ?
      <></>
      :
      <div>
        {remainingTime}
      </div>
      }
      </CountStyle>
    </Container>
  )
}

export default Timer

const CountStyle = styled.div`
  /* font-family: 'Gotham'; */
  font-weight: 700;
  height: 100px;
  font-size: 95px;
  background: linear-gradient(135.86deg, #9E3DFF 0%, #3840FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`
const Container = styled.div`
  text-align: center;
`