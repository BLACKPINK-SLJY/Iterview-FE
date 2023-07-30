import React from 'react'
import { styled } from 'styled-components';
import colors from '../../../style/color';

function Tag(props) {
  const { question } = props;

  return (
    <>
    {
    question.tags.map((tag) => (
      <Container key={tag}>
        #{tag}
      </Container>
    ))}
    </>
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
    line-height: 15px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 10px;
`