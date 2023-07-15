import React, {useState, useEffect} from "react";
import { RecordWebcam, useRecordWebcam } from "react-record-webcam";
import './style.css';
import styled, {keyframes} from "styled-components";
import colors from '../../style/color';
import Timerapp from "../timer/Timerapp";
import axios from "axios";
import { useRecoilState } from 'recoil';
import { AnsweredState, ClickedState } from "../../recoil/QuestionState";
import { BaseUrl } from '../../privateKey';


const Recorder = ((props) => {
  const [selected, setSelected] = useRecoilState(ClickedState);
  const [isUrl, setIsUrl] = useState("");
  const [alert, setAlert] = useState(false);
  let [isminute, setIsMinute] = useState(0);
  const [running, setRunning] = useState(false);
  const {isNum, isquestionId, isRandomId, execute} = props;
  const [doneRecord, setDoneRecord] = useRecoilState(AnsweredState);

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
    filename: timestring,
    mimeType: "video/webm",
    width: 1920,
    height: 1080,
    disableLogs: true,
    video: true,
  }

  const recordWebcam = useRecordWebcam(OPTIONS);

  useEffect(() => {
    recordWebcam.close();
    const timer = setTimeout(() => {
      recordWebcam.open();
    }, 5000);

    return () => clearTimeout(timer);
  }, [isNum])

  useEffect(()=> {
    let intervalId;

    if (running) {
      intervalId = setInterval(() => {
        setIsMinute((prevMinute) => prevMinute + 1);
        console.log(isminute);
      }, 10000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [running])

  useEffect(() => {
    if(execute) {
      handleSubmitAnswer();
    }
  }, [execute])

  useEffect(() => {
    setDoneRecord(false);
  }, [isquestionId, isRandomId])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalQuestion, setModalQuestion] = useState([]);
  const [filename, setFilename] = useState(`${timestring}.webm`);
  const [questionId, setQuestionId] = useState(props.questionkey);
  const [transcript, setTranscript] = useState("");

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
    if (
      recordWebcam.status === "CLOSED" ||
      recordWebcam.status === "RECORDING" ||
      recordWebcam.status === "PREVIEW"
    ) {
      return;
    }

    recordWebcam.start();
    startTime();
    setTimeout(() => {
      setAlert(true);
    }, 10000);
  }

  const onClickRecordStop = () => {
    recordWebcam.stop();
    stopTime();
    setDoneRecord(true);
  }

  const onClickRecordOpen = () => {
    recordWebcam.open();
    stopTime();
  }

  const onClickRecordClose = () => {
    recordWebcam.close();
    stopTime();
  }

  const handleSubmitAnswer = async () => {
    const isblob = await recordWebcam.getRecording({type: "video/webm"});

    getBlob(isblob);
    if(selected.length > 0) {
    axios
      .get(`${BaseUrl}/answer/presigned-url/upload?questionId=${isquestionId}`, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('accessToken')}` 
        },
      })
      .then((res) => {
        console.log(res.data.data.presignedUrl);
        axios
        .put(res.data.data.presignedUrl,
          isblob,
          {
          headers: { "Content-Type": "video/webm" }
          },
        )
        .then((res) => {
          console.log()
          console.log(res.data);
          handleRequestdb(isquestionId);
        })
      })
    }
    else {
      axios
      .get(`${BaseUrl}/answer/presigned-url/upload?questionId=${isRandomId}`, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('accessToken')}` 
        },
      })
      .then((res) => {
        console.log(isblob);
        
        axios
        .put(res.data.data.presignedUrl, {
          isblob
        })
        .then((res) => {
          console.log(res.data);
          handleRequestdb(isRandomId);
        })
      })
    }
  }

  const handleRequestdb = (mode) => {
    axios
    .get(`${BaseUrl}/answer/sync-db?questionId=${mode}`,{
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('accessToken')}` 
      },
    })
    .then((res) => {
      console.log(res.data);
      handleRequestTranscribe(mode);
    })
  }

  const handleRequestTranscribe = (mode) => {
    axios
    .get(`${BaseUrl}/transcription?questionId=${mode}`,{
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('accessToken')}` 
      },
    })
    .then((res) => {
      console.log(res.data);
    })
  }

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
        </BtnLayout>
        {
          isalert &&
          <AlertContainer>
            <span style={{fontWeight: "700", fontSize:"18px"}}>{isminute}분</span>이 지났습니다!
          </AlertContainer>
        }
        <Timerapp isNum={isNum}/>
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
})

export default Recorder

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
    cursor: not-allowed;
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
    cursor: not-allowed;
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
  top: 400px;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-top: 10px;
  z-index: 5;
  font-weight: 400;
  font-size: 16.5px;
  line-height: 21px;
  letter-spacing: 0.0025em;
  @media screen and (max-width: 1000px) {
       top: 400px;
  }

  color: white;
  width: 226px;
  height: 39px;
  background: #303132;
  opacity: 0.8;
  box-shadow: 0px 0px 12.92px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`