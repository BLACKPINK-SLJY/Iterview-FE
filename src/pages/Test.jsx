import React from 'react'
import Nav from '../components/nav/Nav'
import { styled } from 'styled-components';
import colors from '../style/color';
import QImg from '../assets/svg/Q.svg';
import data from '../data/data';
import Sound from '../assets/svg/sound.svg';
import Recorder from '../components/recorder/Recorder';
import Mp3 from '../assets/mp3/test.mp3';
import Silence from '../assets/mp3/silence.mp3'
import { useEffect } from 'react';
import Timerapp from '../components/timer/Timerapp';
import Footer from '../components/footer/Footer';
import { useState } from 'react';
import Modal from '../components/modal/modal';
import Tag from '../components/toggle/tag/tag';
import SmallCheck from '../assets/svg/smallcheck.svg';

function Test() {
    const [isSubmitModal, setIsSubmitModal] = useState(false);
    const [isFinish, setIsFinish] = useState(false);

    // useEffect(() => {
    //     soundPlay();
    // });

    const soundPlay = () => {
        const audio = new Audio(Mp3);   
        audio.play();
    }

    const onClickSubmitModal = () => {
        setIsSubmitModal(true);
    }
  return (
    <>
    <Nav />
    <Container>
        <QuestionBox>
            <Header>
                <QuestionText>
                    <QImgStyle src={QImg} />
                        <div>
                            {data[0].questions[0].question}
                        </div>
                    <iframe src={Silence} title="test" allow="autoplay" id="audio" style={{display:"none"}}></iframe>
                    <SpeakerStyle src={Sound} alt="speaker" onClick={soundPlay}/>
                    {/* <audio
                        controls
                        src={Mp3}>
                                    Your browser does not support the
                                    <code>audio</code> element.
                    </audio> */}
                </QuestionText>
            </Header>
        </QuestionBox>
        <Recorder />
        <EndSubmitLayout>
          <EndBtn>종료하기</EndBtn>
          <TextStyle>1<TextStyle2> / 5</TextStyle2></TextStyle>
          <SubmitBtn onClick={onClickSubmitModal}>제출하기</SubmitBtn>
        </EndSubmitLayout>
    </Container>
    <Footer />
    {isSubmitModal &&
    
    <Modal>
        <ModalContainer>
            <QuestionContain>
                <QImgStyle src={QImg} />
                <div style={{}}>
                    {data[0].questions[0].question}
                </div>
            </QuestionContain>
            <div style={{marginTop:"27px", fontStyle:"normal", fontSize:"20px", fontWeight:"500", color:"#787879"}}>모범 답변 키워드</div>
            <TagContain>
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            </TagContain>
            <ModalNextBtn>다음 질문</ModalNextBtn>
            <ModalCompleteText><Smallcheck src={SmallCheck} />답변이 제출되었습니다.</ModalCompleteText>
        </ModalContainer>
    </Modal>}
    </>
  )
}

export default Test

const Container = styled.div`
    margin-top: 80px;
    margin: 0 auto;
    width: 1100px;
    height: 980px;
    @media screen and (max-width: 1000px) {
        width: 768px;  
    }
`
const QuestionBox =  styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    background-color: ${colors.white_100};
    box-shadow: 0px 0px 9.14454px rgba(0, 0, 0, 0.1);
    border-radius: 14.1556px;
    margin-top: 80px;
`
const QuestionText = styled.div`
    display: flex;
    width: 1014px;
    height: fit-content;
    @media screen and (max-width: 1000px) {
        width: 700px;  
    }
`
const Header = styled.div`
    display: flex;
    align-items: center;
    height: fit-content;
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
    color: ${colors.black_100};
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 14px;
`
const QImgStyle = styled.img`
  width: 30px;
  height: 31px;
  margin-right: 15.4px;
`
const SpeakerStyle = styled.img`
  margin-left: 14px;
  width: 35px;
  height: 35px;
  cursor: pointer;
`
const EndSubmitLayout = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 33px;
  padding-left: 10px;
  padding-right: 10px;
`
const EndBtn = styled.button`
  width: 95.86px;
  height: 37.57px;
  border: 1.5px solid #FF6464;
  color: #FF6464;
  font-weight: 500;
  filter: drop-shadow(0px 0px 8.7223px rgba(0, 0, 0, 0.1));
  border-radius: 33.1447px;
`
const SubmitBtn = styled.button`
  width: 95.86px;
  height: 37.57px;
  background: linear-gradient(135.86deg, #9E3DFF 0%, #3840FF 100%);
  box-shadow: 0px 0px 8.7223px rgba(0, 0, 0, 0.1);
  border-radius: 33.1447px;
  border: none;
  color: white;
`
const TextStyle = styled.div`
  display: flex;
  gap: 8px;
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 700;
  font-size: 23.7884px;
  line-height: 29px;
  color: #424344;
`
const TextStyle2 = styled.div`
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 700;
  font-size: 23.7884px;
  line-height: 29px;
  color: ${colors.black_50};
`
const ModalContainer = styled.div`
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 32px;
    align-items: center;
    height: fit-content;
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
    color: ${colors.black_100};
    justify-content: center;
`
const QuestionContain = styled.div`
    display: flex;
    width: 550px;
    text-align: left;
`
const ModalNextBtn = styled.button`
    background: linear-gradient(135.86deg, #9E3DFF 0%, #3840FF 100%);
    box-shadow: 0px 0px 8.7223px rgba(0, 0, 0, 0.1);
    border-radius: 33.1447px;
    width: 120px;
    height: 44px;
    font-weight: 700;
    font-size: 16px;
    line-height: 17px;
    color: ${colors.white_100};
    border: none;
    margin-bottom: 16px;
`
const ModalCompleteText = styled.div`
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;

    color: #3840FF;
`
const Smallcheck = styled.img`
    width: 12px;
    height: 12px;
    margin-right: 6px;
`
const TagContain = styled.div`
    width: 550px;
    margin-top: 14px;
    margin-bottom: 42px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    row-gap: 16px;
    text-align: center;
    justify-content: center;
    line-height: 150px;
    align-content: center;
`