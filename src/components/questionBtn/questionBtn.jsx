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
import { useNavigate } from 'react-router-dom';
import { postRefreshToken } from '../../instance/apis';

function QuestionBtn(props) {
  const { ischoose, contents, handleQuestionClick, selectedQuestionIds, inmypage, handleGoAnswer, mysol, isBookScrab } = props;
  const [isBookmarked, setIsBookmarked] = useState({});
  const [user, setUser] = useRecoilState(UserState);
  const navigate = useNavigate();
  const [alertShown, setAlertShown] = useState(false);

  const shouldSendHeader = !!user;

  const axiosConfig = {
      headers: shouldSendHeader ? { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } : {},
    };

    useEffect(() => {
      // contents가 변경될 때마다 각 question의 북마크 상태를 isBookmarked에 업데이트합니다.
      const updatedIsBookmarked = {};
      contents.forEach((question) => {
        updatedIsBookmarked[question.questionId] = question.bookmarked === 'Y';
      });
      setIsBookmarked(updatedIsBookmarked);
    }, [contents]);

  const handleScrab = (questionId) => {
      axios.put(`${BaseUrl}/question/bookmark/${questionId}`, null, axiosConfig)
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
            // 성공적으로 처리된 응답
            setIsBookmarked((prevIsBookmarked) => ({
              ...prevIsBookmarked,
              [questionId]: true,
            }));
            console.log(res.data);
            return Promise.resolve(res);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setAlertShown(false); // 경고창이 띄워진 후에 1초 뒤에 false로 변경
          });
  }

  const handleUnScrab = (questionId) => {
    axios.put(`${BaseUrl}/question/unbookmark/${questionId}`, null, axiosConfig)
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
            // 성공적으로 처리된 응답
            setIsBookmarked((prevIsBookmarked) => ({
              ...prevIsBookmarked,
              [questionId]: false,
            }));
            console.log(res.data);
            return Promise.resolve(res);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setAlertShown(false); // 경고창이 띄워진 후에 1초 뒤에 false로 변경
          });
}

const handleScrabOrUnScrab = (questionId) => {
  if (isBookmarked[questionId]) {
    // 이미 북마크되어 있으면 해제합니다
    handleUnScrab(questionId);
  } else {
    // 북마크되어 있지 않으면 북마크합니다
    handleScrab(questionId);
  }
};

  return (
    <>
    {ischoose ?
        contents && contents.map((question) => (
            <Container key={question.questionId} isClicked={selectedQuestionIds.includes(question.questionId)}>
            <Header onClick={() => user ? handleQuestionClick(question.questionId) : (alert("로그인 후 이용 바랍니다."), navigate('/login'))}>
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
                    {question.answered === 'Y' &&
                    <AnswerText>답변완료</AnswerText>
                    }
                    {!user ?
                       <></>
                    :
                    <ScrapImg
                    questionId={question.questionId}
                    isBookmarked={isBookmarked[question.questionId]}
                    onClick={() => handleScrabOrUnScrab(question.questionId)}
                    src={isBookmarked[question.questionId] ? Bookmarkon : Bookmarkoff}
                    alt="bookmark"
                    />
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
            <Header onClick={() => user ? {} : (alert("로그인 후 이용 바랍니다."), navigate('/login'))}>
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
              {question.answered === 'Y' && mysol ?
                    <AnswerText onClick={() => handleGoAnswer(question.questionId)}>내 답변 보기</AnswerText>
                    : question.answered === 'Y' &&
                    <AnswerText>답변완료</AnswerText>
                    }
                {!user ?
                    <></>
                : 
                <ScrapImg
                questionId={question.questionId}
                isBookmarked={isBookmarked[question.questionId]}
                onClick={() => handleScrabOrUnScrab(question.questionId)}
                src={isBookmarked[question.questionId] ? Bookmarkon : Bookmarkoff}
                alt="bookmark"
                />
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
    cursor: pointer;
`