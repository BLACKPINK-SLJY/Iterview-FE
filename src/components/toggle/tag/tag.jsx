import React from 'react'
import { styled } from 'styled-components';
import colors from '../../../style/color';
import data from '../../../data/data';

function Tag() {
  return (
    <Container>
        #{data[0].questions[0].level}
    </Container>
  )
}

export default Tag

const Container = styled.div`
    box-sizing: border-box;
    width: fit-content;
    height: 34px;
    text-align: center;
    border-radius: 55.8058px;
    border: 0.707781px solid black;
    color: black;
    padding: 6.8px 12px;
`