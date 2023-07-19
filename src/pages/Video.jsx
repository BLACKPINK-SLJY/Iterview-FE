import React from 'react'
import { TranscriptEditor } from '@bbc/react-transcript-editor';
import { useState, useRef, useEffect } from 'react';
import Nav from '../components/nav/Nav';
import { styled } from 'styled-components';
import '../style/video.css';
import colors from '../style/color';
import LevelTag from '../components/toggle/tag/LevelTag';
import Tag from '../components/toggle/tag/tag';
import Bookmarkoff from '../assets/svg/bookmark/bookmarkoff.svg';
import Bookmarkon from '../assets/svg/bookmark/bookmarkon.svg';
import QImg from '../assets/svg/Q.svg';
import { useRecoilState } from 'recoil';
import { AnsweredState, QuestionState, ScrabedState } from '../recoil/QuestionState';
import { UserState } from '../recoil/userState';
import axios from 'axios';
import Footer from '../components/footer/Footer';
import { BaseUrl } from '../privateKey';
import getBlobDuration from "get-blob-duration";

function Video() {
    const [questions, setQuestions] = useRecoilState(QuestionState);
    const [isAnswer, setIsAnswer] = useRecoilState(AnsweredState);
    const [isScrab, setIsScrab] = useRecoilState(ScrabedState);
    const [user, setUser] = useRecoilState(UserState);
    const [videodata, setVideodata] = useState([]);
    const [duration, setDuration] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        axios
        .get(`${BaseUrl}/answer/replay?questionId=${isAnswer}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
        .then((res) => {
            setVideodata(res.data.data);
            const spanElement = document.querySelector("._2N6hqY-gxXwJ-2c8sRoL5i");
            if(spanElement) {
                time === "" ? spanElement.textContent = "00:00:00:00" : spanElement.textContent = time;
            }
            getVideoDuration(res.data.data.url);
        })
    },[time])
    
    const answeredQuestion = questions.filter((item) => item.questionId === isAnswer);

    const shouldSendHeader = !!user;
  
    const axiosConfig = {
        headers: shouldSendHeader ? { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } : {},
      };

    const handleScrab = (questionId) => {
        axios.put(`${BaseUrl}/question/bookmark/${questionId}`, null, axiosConfig)
        .then((res) => {
            console.log(res.data);
            setIsScrab((prevScrab) => ({ ...prevScrab, [questionId]: true }));
        })
    }
  
    const handleUnScrab = (questionId) => {
      axios.put(`${BaseUrl}/question/unbookmark/${questionId}`, null, axiosConfig)
      .then((res) => {
          console.log(res.data);
          setIsScrab((prevScrab) => ({ ...prevScrab, [questionId]: false }));
      })
  }

  async function getVideoDuration(blob) {
    try {
      const duration = await getBlobDuration(blob);
      console.log(duration);
      setDuration(formatDuration(duration));
      console.log("Duration:", formatDurationMilli(duration));
      setTime(formatDurationMilli(duration));
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function formatDuration(duration) {
    duration = Math.floor(duration);
    const seconds = Math.floor(duration % 60);
    const minutes = Math.floor((duration / 60) % 60);
  
    const formattedDuration = `${minutes}분 ${seconds}초`;
  
    return formattedDuration;
  }

  function padZero(value) {
    return value.toString().padStart(2, '0').slice(-2);
  }
  
  function formatDurationMilli(duration) {
    const milliseconds = Math.floor((duration % 1) * 1000);
    duration = Math.floor(duration);
    const seconds = Math.floor(duration % 60);
    const minutes = Math.floor((duration / 60) % 60);
    const hours = Math.floor(duration / 3600);
  
    const formattedMilliseconds = padZero(milliseconds);
    const formattedSeconds = padZero(seconds);
    const formattedMinutes = padZero(minutes);
    const formattedHours = padZero(hours);
  
    const formattedDuration = `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  
    return formattedDuration;
  }

  const convertedJson = {
    action: "audio-transcribe",
    retval: {
      status: true,
      wonid: "octo:2692ea33-d595-41d8-bfd5-aa7f2d2f89ee",
      punct: videodata.results?.transcripts[0].transcript.replace(/@@/g, ''),
      words: videodata.results?.items.map((item) => ({
        start: parseFloat(item.start_time),
        confidence: item.alternatives[0].confidence,
        end: parseFloat(item.end_time),
        word: item.alternatives[0].content.replace(/@@/g, ''),
        punct: item.alternatives[0].content.replace(/@@/g, ''),
      })),
    },
  };

    const customTheme = {
        primaryColor: 'blue',
        secondaryColor: 'gray',
        };

    

  return (
      <>
      <Nav/>
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
        <VideoInfo>{videodata.category} | {videodata.date} | {duration}</VideoInfo>
        <TranscriptEditor
        className="custom-transcript-editor"
        theme={customTheme}
        transcriptData={convertedJson}
        mediaUrl={videodata.url}
        sttJsonType={"bbckaldi"}
        // isEditable={true}
        />
      </Container>
      <Footer/>
      </>
  )
}

export default Video

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
    margin-top: 90px;
    margin-bottom: 33px;
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
const VideoInfo = styled.div`
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: ${colors.black_70};
    margin-bottom: 12px;
`