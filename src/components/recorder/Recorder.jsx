import React, {useState, useEffect} from "react";
import { useRecordWebcam } from "react-record-webcam";
import './style.css';
import styled, {keyframes} from "styled-components";
import colors from '../../style/color';
import Timerapp from "../timer/Timerapp";
import axios from "axios";
import { useRecoilState } from 'recoil';
import { AnsweredState, ClickedState } from "../../recoil/QuestionState";
import { BaseUrl } from '../../privateKey';
import { postRefreshToken } from "../../instance/apis";
import { UserState } from '../../recoil/userState';
import { useNavigate } from 'react-router-dom';


const Recorder = ((props) => {
  const [selected, setSelected] = useRecoilState(ClickedState);
  const [boolalert, setAlert] = useState(false);
  let [isminute, setIsMinute] = useState(0);
  const [running, setRunning] = useState(false);
  const {isNum, isquestionId, isRandomId, execute} = props;
  const [doneRecord, setDoneRecord] = useRecoilState(AnsweredState);
  const [shouldStartRecording, setShouldStartRecording] = useState(false);
  const [user, setUser] = useRecoilState(UserState);
  const navigate = useNavigate();
  const [alertShown, setAlertShown] = useState(false);

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
    const openTimer = setTimeout(() => {
      recordWebcam.open();
      setShouldStartRecording(true);
    }, 5000);
  
    return () => clearTimeout(openTimer);
  }, [isNum]);
  
  useEffect(() => {
    if (recordWebcam.status === 'OPEN' && !recordWebcam.recording && shouldStartRecording) {
      const startTimer = setTimeout(() => {
        recordWebcam.start();
        startTime();
        setTimeout(() => {
          setAlert(true);
        }, 60000);
      });
      
      return () => clearTimeout(startTimer);
    }
  }, [isNum, recordWebcam.status, recordWebcam.recording]);

  useEffect(()=> {
    let intervalId;

    if (running) {
      intervalId = setInterval(() => {
        setIsMinute((prevMinute) => prevMinute + 1);
      }, 60000);
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

  const isalert = boolalert && recordWebcam.status === "RECORDING";

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
    }, 60000);
  }

  const onClickRecordStop = () => {
    recordWebcam.stop();
    stopTime();
    setDoneRecord(true);
  }

  const onClickRecordRestart = () => {
    if (recordWebcam.status !== 'OPEN') {
      recordWebcam.open();
      stopTime();
    } else if (recordWebcam.status === 'OPEN' && recordWebcam.recording === false) {
      setShouldStartRecording(true);
      startTime();
      setTimeout(() => {
        setAlert(true);
      }, 60000);
    }
  }

  // const onClickCameraOpen = () => {
  //   if (recordWebcam.status !== 'OPEN') {
  //     recordWebcam.open();
  //     stopTime();
  //     setShouldStartRecording(false);
  //   }
  // }

  // const onClickRecordClose = () => {
  //   recordWebcam.close();
  //   stopTime();
  // }

  const handleSubmitAnswer = async () => {
    const isblob = await recordWebcam.getRecording({type: "video/webm"});
    if(selected.length > 0) {
    axios
      .get(`${BaseUrl}/answer/presigned-url/upload?questionId=${isquestionId}`, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('accessToken')}` 
        },
      })
      .then((res) => {
        if(!alertShown){
          setAlertShown(true);
          if (res.data.status === 40003) {
            if (res.data.message === "엑세스 토큰의 유효기간이 만료되었습니다.") {
              const originRequest = res.config;
              // 리프레시 토큰 api
              return postRefreshToken().then((refreshTokenResponse) => {
                // 리프레시 토큰 요청이 성공할 때
                if (refreshTokenResponse.data.status === 20001) {
                  const newAccessToken = refreshTokenResponse.data.data.access_token;
                  localStorage.setItem('accessToken', refreshTokenResponse.data.data.access_token);
                  localStorage.setItem('refreshToken', refreshTokenResponse.data.data.refresh_token);
                  axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`; // 수정: headers.common을 사용하여 모든 요청에 적용
                  // 진행중이던 요청 이어서하기
                  originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                  return axios(originRequest);
                }
                // 리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
                if (refreshTokenResponse.data.status === 40004) {
                  alert('로그인 만료, 다시 로그인해주세요.');
                  setUser(null);
                  navigate('/login');
                  setAlertShown(true);
                  throw new Error('로그인 만료, 다시 로그인해주세요.');
                }}
                )}
              }}
          return res;
        })
        .then((res) => {
          axios
          .put(res.data.data.presignedUrl,
            isblob,
            {
            headers: { "Content-Type": "video/webm" }
            },
          )
          .then((res) => {
            handleRequestdb(isquestionId);
          })
          return Promise.resolve(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setAlertShown(false);
        });
    }
    else {
      axios
      .get(`${BaseUrl}/answer/presigned-url/upload?questionId=${isRandomId}`, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('accessToken')}` 
        },
      })
      .then((res) => {
        if(!alertShown){
          setAlertShown(true);
          if (res.data.status === 40003) {
            if (res.data.message === "엑세스 토큰의 유효기간이 만료되었습니다.") {
              const originRequest = res.config;
              // 리프레시 토큰 api
              return postRefreshToken().then((refreshTokenResponse) => {
                // 리프레시 토큰 요청이 성공할 때
                if (refreshTokenResponse.data.status === 20001) {
                  const newAccessToken = refreshTokenResponse.data.data.access_token;
                  localStorage.setItem('accessToken', refreshTokenResponse.data.data.access_token);
                  localStorage.setItem('refreshToken', refreshTokenResponse.data.data.refresh_token);
                  axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`; // 수정: headers.common을 사용하여 모든 요청에 적용
                  // 진행중이던 요청 이어서하기
                  originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                  return axios(originRequest);
                }
                // 리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
                if (refreshTokenResponse.data.status === 40004) {
                  alert('로그인 만료, 다시 로그인해주세요.');
                  setUser(null);
                  navigate('/login');
                  throw new Error('로그인 만료, 다시 로그인해주세요.');
                }}
              )}
            }}
        return res;
      })
        .then((res) => {
          axios
          .put(res.data.data.presignedUrl, {
            isblob
          })
          .then((res) => {
            handleRequestdb(isRandomId);
          })
          return Promise.resolve(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setAlertShown(false);
        });
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
            onClick={onClickRecordRestart}
          >
            다시 녹화
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
    position: absolute;
    width: 1100px;
    height: 600px;

    @media screen and (max-width: 1000px) {
        width: 768px;
        height: 450px;
    }

    #controller{
      top: 24% !important;
      left: 12% !important;
    }

    #top-layer {
      position: absolute;
      top: 40%;
      right: 40%;
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