import React, {useCallback, useRef, useState, useEffect} from 'react'
import { styled } from 'styled-components';
import colors from '../../style/color';
import QImg from '../../assets/svg/Q.svg';
import Bookmarkoff from '../../assets/svg/bookmark/bookmarkoff.svg';
import Bookmarkon from '../../assets/svg/bookmark/bookmarkon.svg';
import Tag from '../toggle/tag/tag';
import LevelTag from '../toggle/tag/LevelTag';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { UserState } from '../../recoil/userState';
import { ScrabedState } from '../../recoil/QuestionState';
import { BaseUrl } from '../../privateKey';

function QuestionBtn(props) {
  const [isClicked, setIsClicked] = useState([]);
  const { ischoose, contents, handleQuestionClick, selectedQuestionIds, inmypage, handleGoAnswer, mysol } = props;
  const [isScrab, setIsScrab] = useRecoilState(ScrabedState);
  const [user, setUser] = useRecoilState(UserState);

  const shouldSendHeader = !!user;

  const axiosConfig = {
      headers: shouldSendHeader ? { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } : {},
    };

  const handleScrab = (questionId) => {
      axios.put(`${BaseUrl}/question/bookmark/${questionId}`, null, axiosConfig)
      .then((res) => {
          setIsScrab((prevScrab) => ({ ...prevScrab, [questionId]: true }));
      })
  }

  const handleUnScrab = (questionId) => {
    axios.put(`${BaseUrl}/question/unbookmark/${questionId}`, null, axiosConfig)
    .then((res) => {
        setIsScrab((prevScrab) => ({ ...prevScrab, [questionId]: false }));
    })
}

  return (
    <>
    {ischoose ?
        contents && contents.map((question) => (
            <Container key={question.questionId} isClicked={selectedQuestionIds.includes(question.questionId)}>
            <Header onClick={() => handleQuestionClick(question.questionId)}>
                  <div style={{display:"flex", width:"1050px", height:"fit-content", marginRight:"5px"}}>
                  <QImgStyle src={QImg} />
                      <div>
                          {question.content}
                      </div>
                  </div>    
            </Header>
                <Contents>
                    <TagList>
                        <LevelTag question={question}/>
                        <Tag question={question}/>
                    </TagList>
                    <div style={{display:'flex', gap:'15px'}}>
                    {question.answered === 'Y' && inmypage ?
                    <AnswerText>내 답변 보기</AnswerText>
                    : question.answered === 'Y' &&
                    <AnswerText>답변완료</AnswerText>
                    }
                    {isScrab[question.questionId] ?
                       <ScrapImg questionId={question.questionId} onClick={() => {handleUnScrab(question.questionId)}} src={Bookmarkon} alt="bookmark" />
                    :
                       <ScrapImg questionId={question.questionId} onClick={() => {handleScrab(question.questionId)}} src={Bookmarkoff} alt="bookmark" />
                    }
                    </div>
                </Contents>
            </Container>
        ))
      :
      contents && contents.map((question) => (
      <Container key={question.questionId}>
        {mysol ? 
            <Header onClick={() => handleGoAnswer(question.questionId)}>
            <div style={{display:"flex", width:"1050px", height:"fit-content", marginRight:"5px"}}>
            <QImgStyle src={QImg} />
                <div>
                    {question.content}
                </div>
            </div>    
            </Header>
            :
            <Header>
            <div style={{display:"flex", width:"1050px", height:"fit-content", marginRight:"5px"}}>
            <QImgStyle src={QImg} />
                <div>
                    {question.content}
                </div>
            </div>    
          </Header>
        }
          <Contents>
              <TagList>
              <LevelTag question={question}/>
              <Tag question={question}/>
              </TagList>
              <div style={{display:'flex', gap:'15px'}}>
              {question.answered === 'Y' && inmypage ?
                    <AnswerText>내 답변 보기</AnswerText>
                    : question.answered === 'Y' &&
                    <AnswerText>답변완료</AnswerText>
                    }
              {isScrab[question.questionId] ?
                       <ScrapImg questionId={question.questionId} onClick={() => {handleUnScrab(question.questionId)}} src={Bookmarkon} alt="bookmark" />
                    :
                       <ScrapImg questionId={question.questionId} onClick={() => {handleScrab(question.questionId)}} src={Bookmarkoff} alt="bookmark" />
                    }
              </div>
          </Contents>
      </Container>
      ))}
    </>
  )
}

export default QuestionBtn

const Container = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    background-color: ${props => (props.isClicked ? colors.lightBlue : colors.white_100)};
    box-shadow: 0px 0px 9.14454px rgba(0, 0, 0, 0.1);
    border-radius: 14.1556px;
    margin-top: 20px;
`
const Header = styled.div`
    display: flex;
    height: fit-content;
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
    color: ${colors.black_100};
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 14px;
    cursor: pointer;
    @media screen and (max-width: 1000px) {
        width: 750px;  
    }
`
const ScrapImg = styled.img`
    width: 46px;
    height: 46px;
    margin-right: 10px;
    margin-bottom: 16px;
    cursor: pointer;
`
const QImgStyle = styled.img`
  width: 30px;
  height: 31px;
  margin-left: 30px;
  margin-right: 15.4px;
  padding-bottom: 10px;
`
const Contents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const TagList = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-left: 76px;
    margin-top: 12px;
    margin-bottom: 24px;
`
const AnswerText = styled.div`
    font-weight: 600;
    font-size: 17px;
    background: linear-gradient(135.86deg, #9E3DFF 0%, #3840FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    padding-top: 14px;
`