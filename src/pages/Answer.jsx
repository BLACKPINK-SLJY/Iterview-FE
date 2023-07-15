import React, { useState, useEffect } from 'react'
import Nav from '../components/nav/Nav';
import { styled } from 'styled-components';
import Footer from '../components/footer/Footer';
import QImg from '../assets/svg/Q.svg';
import { useRecoilState } from 'recoil';
import { AnsweredState, QuestionState, ScrabedState } from '../recoil/QuestionState';
import colors from '../style/color';
import axios from 'axios';
import { UserState } from '../recoil/userState';
import LevelTag from '../components/toggle/tag/LevelTag';
import Tag from '../components/toggle/tag/tag';
import Bookmarkoff from '../assets/svg/bookmark/bookmarkoff.svg';
import Bookmarkon from '../assets/svg/bookmark/bookmarkon.svg';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';

function Answer() {
    const [questions, setQuestions] = useRecoilState(QuestionState);
    const [isAnswer, setIsAnswer] = useRecoilState(AnsweredState);
    const [isScrab, setIsScrab] = useRecoilState(ScrabedState);
    const [user, setUser] = useRecoilState(UserState);
    const [dummy, setIsdummy] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if(loading) {
    //         setInterval(() => {
    //             axios
    //             .get(`http://15.165.104.225/answer?questionId=${isAnswer}`, {
    //                 headers: { 
    //                     Authorization: `Bearer ${localStorage.getItem('accessToken')}` 
    //                   },
    //             })
    //             .then((res) => {
    //                 console.log(res.data);
    //                 setIsdummy(res.data.data);
    //                 if(res.data.data.created === 'Y') {
    //                     setLoading(false);
    //                 }
    //             })
    //         }, 2000);
    //     }
    // })

    useEffect(() => {
        axios
        .get('http://15.165.104.225/answer/dummy', {})
        .then((res) => {
            setIsdummy(res.data.data);
        })
    },[])

      const highlightLanguages = (text) => {
        const regex = /@@(.*?)@@/g;
        return text.replace(regex, '<span style="color: #787879; text-decoration-line: underline;">$1</span>');
      };

    const shouldSendHeader = !!user;
  
    const axiosConfig = {
        headers: shouldSendHeader ? { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } : {},
      };

    const answeredQuestion = questions.filter((item) => item.questionId === isAnswer);

     
    const handleScrab = (questionId) => {
        axios.put(`http://15.165.104.225/question/bookmark/${questionId}`, null, axiosConfig)
        .then((res) => {
            console.log(res.data);
            setIsScrab((prevScrab) => ({ ...prevScrab, [questionId]: true }));
        })
    }
  
    const handleUnScrab = (questionId) => {
      axios.put(`http://15.165.104.225/question/unbookmark/${questionId}`, null, axiosConfig)
      .then((res) => {
          console.log(res.data);
          setIsScrab((prevScrab) => ({ ...prevScrab, [questionId]: false }));
      })
  }

  const handleGoVideo = () => {
    navigate(`/mypage/${user.account}/${isAnswer}/video`);
  }

  return (
    <>
    <Nav />
    {loading ?
    <>
    <div style={{textAlign: "center", marginTop: "350px"}}>
        <ColorRing
        visible={true}
        height="100"
        width="100"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#9E3DFF', '#3840FF', '#ACADAD', '#9E3DFF', '#3840FF']}
        />
        <div style={{paddingTop:"30px", fontSize:"30px"}}>답변 불러오는 중...</div>
    </div>
    </>
    :
    <>
        <Container>
        <QuestionBox>
            <Header>
                <QuestionText>
                    <QImgStyle src={QImg} />
                    {answeredQuestion[0].content}
                </QuestionText>
            </Header>
        <Contents>
              <TagList>
              <LevelTag question={answeredQuestion[0]}/>
              <Tag question={answeredQuestion[0]}/>
              </TagList>
              <div style={{display:'flex', gap:'15px'}}>
              {isScrab[answeredQuestion[0].questionId] ?
                       <ScrapImg questionId={answeredQuestion[0].questionId} onClick={() => {handleUnScrab(answeredQuestion[0].questionId)}} src={Bookmarkon} alt="bookmark" />
                    :
                       <ScrapImg questionId={answeredQuestion[0].questionId} onClick={() => {handleScrab(answeredQuestion[0].questionId)}} src={Bookmarkoff} alt="bookmark" />
                    }
              </div>
          </Contents>
        </QuestionBox>
        <Score>점수 : {dummy.score}</Score>
        <div style={{display: 'flex', gap:'30px'}}>
            <Col>
            <MyAnswer>
                <HeadText>
                    내 답변
                </HeadText>
                <SubBox1>
                <Text>
                {dummy.transcription && (
                <span dangerouslySetInnerHTML={{ __html: highlightLanguages(dummy.transcription) }}></span>
                )}
                </Text>
                </SubBox1>
            </MyAnswer>
            <GrayText>* 밑줄 표시는 텍스트 추출 결과 부정확할 가능성이 있는 부분입니다.</GrayText>
            <GoVideoBtn onClick={handleGoVideo}>녹화 영상 보러 가기</GoVideoBtn>
            </Col>
            <BestAnswer>
                <HeadText>
                    AI 피드백
                </HeadText>
                <SubBox>
                <Text>
                    {dummy.feedback}
                </Text>
                </SubBox>
                <HeadText>
                    AI 모범 답안
                </HeadText>
                <SubBox>
                <Text>
                    {dummy.bestAnswer}
                </Text>
                </SubBox>
            </BestAnswer>
        </div>
    </Container>
    <Footer/>
    </>
    }
    </>
  )
}

export default Answer

const Container = styled.div`
    margin: 60px auto;
    width: 1100px;
    @media screen and (max-width: 1000px) {
        width: 768px;  
    }
`
const QuestionBox =  styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    background-color: ${props => (props.isClicked ? colors.lightBlue : colors.white_100)};
    box-shadow: 0px 0px 9.14454px rgba(0, 0, 0, 0.1);
    border-radius: 14.1556px;
    margin-top: 70px;
`
const QuestionText = styled.div`
    display: flex;
    
    width: 1014px;
    height: fit-content;
    word-break:break-all;
    @media screen and (max-width: 1000px) {
        width: 700px;  
    }
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
const QImgStyle = styled.img`
  width: 30px;
  height: 31px;
  margin-left: 30px;
  margin-right: 20px;
  padding-bottom: 10px;
`
const ScrapImg = styled.img`
    width: 46px;
    height: 46px;
    margin-right: 18px;
    margin-bottom: 16px;
    cursor: pointer;
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
const Score = styled.div`
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    flex-direction: row-reverse;
    color: ${colors.black_70};
    margin-top: 36px;
    margin-bottom: 14px;
`
const MyAnswer = styled.div`
    box-shadow: 0px 0px 12.92px rgba(0, 0, 0, 0.1);
    border-radius: 14.16px;
    width: 535px;
    height: 600px;
    @media screen and (max-width: 1000px) {
        height: 500px;
        width: 369px;
    }
    background: ${colors.white_100};
`
const BestAnswer = styled.div`
    box-shadow: 0px 0px 12.92px rgba(0, 0, 0, 0.1);
    border-radius: 14.16px;
    width: 535px;
    height: 714px;
    overflow: scroll;
    @media screen and (max-width: 1000px) {
        width: 369px;
        height: 614px;
    }
    background: ${colors.white_100};
    display: flex;
    flex-direction: column;
    padding-bottom: 24px;
`
const GoVideoBtn = styled.button`
    background: linear-gradient(135.86deg, #9E3DFF 0%, #3840FF 100%);
    border-radius: 4px;
    font-weight: 500;
    font-size: 26px;
    line-height: 29px;
    color: ${colors.white_100};
    height: 66px;
    margin-top: 18px;
    border: none;
    cursor: pointer;
`
const GrayText = styled.div`
    margin-top: 12px;
    font-weight: 500;
    font-size: 16px;
    line-height: 17px;
    color: #89898A;
    width: 535px;
    @media screen and (max-width: 1000px) {
        width: 369px;
        font-size: 12px;
    }
`
const Col = styled.div`
    display: flex;
    flex-direction: column;
`
const HeadText = styled.div`
    background: linear-gradient(135.86deg, #9E3DFF 0%, #3840FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    width: fit-content;
    margin-top: 23px;
    margin-left: 22px;
    font-weight: 700;
    font-size: 18px;
    line-height: 225.8%;
`
const Text = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 150.8%;
    margin-left: 22px;
    margin-right: 22px;
    text-align: justify;
    color: ${colors.black_100};
`
const SubBox = styled.div`
    overflow: scroll;
    height: 347px;
    @media screen and (max-width: 1000px) {
        height: 297px;
    }
`
const LowAnswer = styled.span`
    text-align: justify;
    text-decoration-line: underline;
    color: ${colors.black_60};
    font-weight: 500;
    font-size: 18px;
    line-height: 225.8%;
`
const SubBox1 = styled.div`
    overflow: scroll;
    height: 520px;
    @media screen and (max-width: 1000px) {
        height: 420px;
    }
`