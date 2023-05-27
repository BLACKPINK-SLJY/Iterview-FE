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
    width: fit-content;
    height: 34px;
    padding-top: 10px;
    text-align: center;
    border-radius: 55.8058px;
    border: 0.707781px solid black;
    color: ${colors.black_80};
    font-weight: 500;
    font-size: 18.1612px;
    line-height: 16px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 10px;
`