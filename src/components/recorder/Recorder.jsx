import React, {useState, useEffect} from "react";
import { RecordWebcam, useRecordWebcam } from "react-record-webcam";
import './style.css';
import styled, {keyframes} from "styled-components";
// import Modal from "../../Modal/Modal";
// import Q from "../../../assets/Q..svg";
// import axios from "axios";
// import { BaseUrl } from "../../../privateKey";
// import { ColorRing } from 'react-loader-spinner';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import colors from '../../style/color';
import Timerapp from "../timer/Timerapp";

export default function Recorder(props) {

  const [isUrl, setIsUrl] = useState("");
  const [alert, setAlert] = useState(false);
  let [isminute, setIsMinute] = useState(0);
  const [running, setRunning] = useState(false);

  let today = new Date();
  let time = {
      year: today.getFullYear(),  //현재 년도
      month: today.getMonth() + 1, // 현재 월
      date: today.getDate(), // 현제 날짜
      hours: today.getHours(), //현재 시간
      minutes: today.getMinutes(), //현재 분
      seconds: today.getSeconds(), //현재 초
  };

  let timestring = `${time.year}${time.month}${time.date}${time.hours}${time.minutes}${time.seconds}`;

  const OPTIONS = {
    fileName: timestring,
    filename: timestring + ".mp4",
    mimeType: "video/webm",
    width: 1920,
    height: 1080,
    disableLogs: true,
    video: true,
    
  }

  const recordWebcam = useRecordWebcam(OPTIONS);
  useEffect(() => {
    setTimeout(() => recordWebcam.open(), 5000);
  }, [])

  useEffect(()=> {
    let intervalId;

    if (running) {
      intervalId = setInterval(() => {
        setIsMinute((prevMinute) => prevMinute + 1);
      }, 10000);
    }
    console.log(isminute);
    return () => {
      clearInterval(intervalId);
    };
  }, [running])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalQuestion, setModalQuestion] = useState([]);
  const [filename, setFilename] = useState(`${timestring}.webm`);
  const [questionId, setQuestionId] = useState(props.questionkey);
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getRecordingFile = async () => {
    const blob = recordWebcam.getRecording();

    console.log({ blob });
  };

  const getBlob = async (blob) => {
    console.log({ blob });
  };

  const onClickVideoModal = () => {
    setIsModalOpen(true);
  }

  const onClickCloseModal = () => {
    setIsModalOpen((prev) => !prev);
    setTranscript("");
  }

  const isalert = alert && recordWebcam.status === "RECORDING";

  const startTime = () => {
    setIsMinute(0);
    setRunning(true);
  }

  const stopTime = () => {
    setIsMinute(0);
    setRunning(false);
    setAlert(false);
  }

  const onClickRecordStart = () => {
    recordWebcam.start();
    startTime();
    setTimeout(() => {
      setAlert(true);
    }, 5000);
  }

  const onClickRecordStop = () => {
    recordWebcam.stop();
    stopTime();
  }

  const onClickRecordOpen = () => {
    recordWebcam.open();
    stopTime();
  }

  const onClickRecordClose = () => {
    recordWebcam.close();
    stopTime();
  }

  const accessToken = localStorage.getItem('accessToken');

  return (
    <div>
<div className="demo-section">
        <BtnLayout>
        {recordWebcam.status === "RECORDING" ?
        <Blinkanimation
        disabled={
          recordWebcam.status === "CLOSED" ||
          recordWebcam.status === "RECORDING" ||
          recordWebcam.status === "PREVIEW"
        }
        onClick={onClickRecordStart}
        >
          녹화중
        </Blinkanimation>
        :
        <RecorderBtnStyle
        disabled={
          recordWebcam.status === "CLOSED" ||
          recordWebcam.status === "RECORDING" ||
          recordWebcam.status === "PREVIEW"
        }
        onClick={onClickRecordStart}
      >
        녹화 시작
      </RecorderBtnStyle>
        }
          <RecorderBtnStyle
            disabled={recordWebcam.status !== "RECORDING"}
            onClick={onClickRecordStop}
          >
            녹화 정지
          </RecorderBtnStyle>
          <RecorderBtnStyle
            disabled={recordWebcam.status === "CLOSED"}
            onClick={onClickRecordOpen}
          >
            다시 녹화
          </RecorderBtnStyle>
          <RecorderBtnStyle
            disabled={
              recordWebcam.status === "OPEN" ||
              recordWebcam.status === "RECORDING" ||
              recordWebcam.status === "PREVIEW"
            }
            onClick={onClickRecordOpen}
          >
            카메라 켜기
          </RecorderBtnStyle>
          <RecorderBtnStyle
            disabled={recordWebcam.status === "CLOSED"}
            onClick={onClickRecordClose}
          >
            카메라 끄기
          </RecorderBtnStyle>
          {/* <RecorderBtnStyle
            disabled={recordWebcam.status !== "PREVIEW"}
            onClick={recordWebcam.download}
            key={questionId}
          >
            Download
          </RecorderBtnStyle> */}
          {/* <RecorderBtnStyle
                  disabled={recordWebcam.status !== "PREVIEW"}
                  onClick={async () => {
                    const blob = await recordWebcam.getRecording();
                    getBlob(blob);
                  }}
                >
                  Get blob
          </RecorderBtnStyle> */}
          {/* <RecorderBtnStyle2
            disabled={
              recordWebcam.status === "OPEN" ||
              recordWebcam.status === "RECORDING" ||
              recordWebcam.status === "ERROR" ||
              recordWebcam.status === "기다려주세요..."
            }
            onClick={async () => {
              const isblob = await recordWebcam.getRecording({type: "video/webm"});
              getBlob(isblob);}}
            >
            내 답변 보기
          </RecorderBtnStyle2> */}
        </BtnLayout>
        {
          isalert &&
          <AlertContainer>
            <span style={{fontWeight: "700", fontSize:"18px"}}>{isminute}분</span>이 지났습니다!
          </AlertContainer>
        }
        <Timerapp/>
        <VideoDiv>
        <Video
          ref={recordWebcam.webcamRef}
          style={{
            display: `${
              recordWebcam.status === "OPEN" ||
              recordWebcam.status === "RECORDING"
                ? "block"
                : "none"
            }`
          }}
          autoPlay
          muted
        ></Video>
        <Video
          ref={recordWebcam.previewRef}
          video={true}
          audio={true}
          style={{
            display: `${recordWebcam.status === "OPEN" ||
                        recordWebcam.status === "CLOSED" ||
                        recordWebcam.status === "RECORDING" ? "none" : "block"}`,
          }}
          autoPlay
          controls
        ></Video>
        </VideoDiv>
      </div>
    </div>
  );
}

const RecorderBtnStyle = styled.button`
  width: 110px;
  height: 40px;

  background: ${colors.black_80};
  box-shadow: 0px 0px 12.9193px rgba(0, 0, 0, 0.1);
  border-radius: 49.0932px;

  color: white;
  font-size: 14px;
  cursor: pointer;

  :disabled {
    opacity: 20%;
    cursor: default;
  }
`
const BtnLayout = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;

  margin-top: 31px;
  margin-bottom: 33px;
`
const blink = keyframes`
  0% {
    background-color: ${colors.black_80};
  }
  50% {
    background-color: #FF6464;
  }
`
const Blinkanimation = styled.div`
  width: 110px;
  height: 40px;
  text-align: center;
  padding-top: 12px;

  box-shadow: 0px 0px 12.9193px rgba(0, 0, 0, 0.1);
  border-radius: 49.0932px;

  color: white;
  font-size: 14px;
  cursor: pointer;

  :disabled {
    opacity: 20%;
    cursor: default;
  }

  animation: ${blink} 1s step-end infinite;;
`
const Video = styled.video`
    width: 1100px;
    height: 600px;

    @media screen and (max-width: 1000px) {
        width: 768px;
        height: 450px;
    }
`
const VideoDiv = styled.div`
    width: 1100px;
    height: 600px;

    @media screen and (max-width: 1000px) {
        width: 768px;
        height: 450px;
    }
`
const AlertContainer = styled.div`
  text-align: center;
  position: absolute;
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-top: 10px;
  z-index: 5;
  font-weight: 400;
  font-size: 16.5px;
  line-height: 21px;
  letter-spacing: 0.0025em;
  @media screen and (max-width: 1000px) {
       top: 45%;
  }

  color: white;
  width: 226px;
  height: 39px;
  background: #303132;
  opacity: 0.8;
  box-shadow: 0px 0px 12.92px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`