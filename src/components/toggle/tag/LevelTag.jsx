import React from 'react'
import { styled } from 'styled-components';
import colors from '../../../style/color';

function LevelTag(props) {
  const { question } = props;
  const iscolor = question.level === 0 ? '#28BC5A' : question.level === 1 ? '#FABB1B' : '#FF6464';

  return (
      <Container iscolor={iscolor}>
        {question.level === 0 ?
        `#Easy`
        : question.level === 1 ?
        `#Normal`
        :
        `#Hard`
        }
      </Container>
  )
}

export default LevelTag

const Container = styled.div`
width: fit-content;
height: 34px;
text-align: center;
border-radius: 55.8058px;
border: 0.707781px solid ${(props) => props.iscolor};
color: ${(props) => props.iscolor};
font-weight: 500;
font-size: 18.1612px;
line-height: 15px;
padding-left: 12px;
padding-right: 12px;
padding-top: 10px;
`