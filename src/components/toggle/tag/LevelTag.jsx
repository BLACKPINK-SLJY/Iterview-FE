import React from 'react'
import { styled } from 'styled-components';
import colors from '../../../style/color';

function LevelTag(props) {
  const { question } = props;
  const iscolor = question.level === 0 ? '#28BC5A' : question.level === 1 ? '#FABB1B' : '#FF6464';

  const Container = styled.div`
    width: fit-content;
    height: 34px;
    padding-top: 10px;
    text-align: center;
    border-radius: 55.8058px;
    border: 0.707781px solid ${iscolor};
    color: ${iscolor};
    font-weight: 500;
    font-size: 18.1612px;
    line-height: 16px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 10px;
`

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