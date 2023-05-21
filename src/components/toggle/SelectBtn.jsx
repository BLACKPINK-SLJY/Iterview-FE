import React from 'react'
import { styled } from 'styled-components';

function SelectBtn() {
  return (
    <Btn>선택하기</Btn>
  )
}

export default SelectBtn

const Btn = styled.button`
    width: 85px;
    height: 36px;
    background: linear-gradient(135.86deg, #9E3DFF 0%, #3840FF 100%);
    border-radius: 6px;
    cursor: pointer;

    font-weight: 500;
    font-size: 15px;
    line-height: 16px;
    color: white;
`