import React, {useState} from 'react'
import Nav from '../components/nav/Nav';
import Footer from '../components/footer/Footer';
import { styled } from 'styled-components';
import colors from '../style/color';
import QuestionToggle from '../components/toggle/QuestionToggle';
import DropDownBtn from '../components/toggle/DropDownBtn';
import QuestionBtn from '../components/questionBtn/questionBtn';
import Dice from '../assets/svg/dice.svg';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ClickedState, QuestionState } from '../recoil/QuestionState';
import axios from 'axios';
import { UserState } from '../recoil/userState';
import { BaseUrl } from '../privateKey';
import { postRefreshToken } from '../instance/apis';

function Question() {
    const {category} = useParams();
    const [ischoose, setIsChoose] = useState(true);
    const [questions, setQuestions] = useRecoilState(QuestionState);
    const [user, setUser] = useRecoilState(UserState);
    const [isCategory, setIsCategory] = useState('');
    const navigate = useNavigate();
    const [alertShown, setAlertShown] = useState(false);


    const [selectedQuestionIds, setSelectedQuestionIds] = useRecoilState(ClickedState);

    const handleQuestionClick = (questionId) => {
      setSelectedQuestionIds((prevIds) => {
        if (prevIds.includes(questionId)) {
            prevIds = prevIds.filter((id) => id !== questionId);
        } else {
            prevIds = [...prevIds, questionId];
        }
        return prevIds;
      });
    };
    
    const getIsChoose = (text) => {
        setIsChoose(text);
    }

    const shouldSendHeader = !!user;

    const [axiosConfig, setAxiosConfig] = useState({
        headers: {},
        params: {
          category: category,
        },
      });
    
    useEffect(() => {
        setQuestions([]);
        if (ischoose) {
          const configWithToken = {
            headers: shouldSendHeader ? { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } : {},
            params: {
              category: category,
            },
          };
          setAxiosConfig(configWithToken); // axiosConfig 업데이트
      
          axios
            .get(`${BaseUrl}/question/list/order/level`, axiosConfig) // 수정: 수정된 axiosConfig 사용
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
              setQuestions(res.data.data);
              return Promise.resolve(res);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setAlertShown(false); // 경고창이 띄워진 후에 1초 뒤에 false로 변경
            });
        } else {
            const configWithToken = {
                headers: shouldSendHeader ? { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } : {},
                params: {
                  category: category,
                },
              };
              setAxiosConfig(configWithToken);
          axios
            .get(`${BaseUrl}/question/random`, axiosConfig) // 수정: 수정된 axiosConfig 사용
            .then((res) => {
              if(!alertShown) {
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
              // 성공적으로 처리된 응답
              setQuestions(res.data.data);
              return Promise.resolve(res);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setAlertShown(false); // 경고창이 띄워진 후에 1초 뒤에 false로 변경
            });
        }
      }, [category, ischoose]);

    useEffect(() => {
      }, [selectedQuestionIds, category]);

    useEffect(() => {
        setSelectedQuestionIds([]);
    }, [ischoose]);

    useEffect(() => {
        if(category === 'fe') setIsCategory('Frontend');
        if(category === 'be') setIsCategory('Backend');
        if(category === 'aos') setIsCategory('Android');
        if(category === 'ios') setIsCategory('iOS');
    }, [category])

    const handleRandom = () => {
      const configWithToken = {
        headers: shouldSendHeader ? { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } : {},
        params: {
          category: category,
        },
      };
      setAxiosConfig(configWithToken); // axiosConfig 업데이트

        axios.get(`${BaseUrl}/question/random`, axiosConfig)
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
          // 성공적으로 처리된 응답
          setQuestions(res.data.data);
          return Promise.resolve(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setAlertShown(false); // 경고창이 띄워진 후에 1초 뒤에 false로 변경
        });
    }

    const questionArr = [...(questions || [] )];
    const favoriteArr = questionArr.sort((a, b) => b.entireBookmarkedCount - a.entireBookmarkedCount);

    const handleDropDown = (selectedValue) => {
      const configWithToken = {
        headers: shouldSendHeader ? { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } : {},
        params: {
          category: category,
        },
      };
      setAxiosConfig(configWithToken);
        axios
        .get(`${BaseUrl}/question/list/order/level`, axiosConfig)
        .then((res) => {
          if(!alertShown) {
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
          // 성공적으로 처리된 응답
          setQuestions(res.data.data);
          if(selectedValue === '난이도 낮은 순') setQuestions(res.data.data);
          else if (selectedValue === '난이도 높은 순') {
              const reversedData = [...res.data.data].reverse();
              setQuestions(reversedData);
          }
          else setQuestions(favoriteArr);
          return Promise.resolve(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setAlertShown(false); // 경고창이 띄워진 후에 1초 뒤에 false로 변경
        });
    }

  return (
    <>
    <Nav />
    <Container>
        { ischoose ?
            <GraText>CHOOSE TEST</GraText>
            :
            <GraText>RANDOM TEST</GraText>
        }
        <CategoryText>{isCategory}</CategoryText>
        <TextStyle2>질문을 선택해 질문에 대한 답을 준비해보세요.<br/>동영상 녹화를 통해 면접 영상을 확인할 수 있습니다.</TextStyle2>
        <BtnFlex>
        <QuestionToggle getIsChoose={getIsChoose} />
        <div style={{display: "flex", gap:"16px", alignItems: "end"}}>
        {ischoose ?
        <DropDownBtn handleDropDown={(selectedValue) => handleDropDown(selectedValue)}/>
        :
        <RandomTestBtn onClick={handleRandom}><img src={Dice} alt='주사위' style={{marginRight: '6px'}}/>랜덤</RandomTestBtn>
        }
        </div>
        </BtnFlex>
        {ischoose ?
        <QuestionBtn contents={questions} ischoose={ischoose} handleQuestionClick={handleQuestionClick} selectedQuestionIds={selectedQuestionIds}/>
        :
        <QuestionBtn contents={questions} ischoose={ischoose} handleRandom={handleRandom} />
        }
        <br/>
    </Container>
    <Footer />
    {ischoose ?
        <GoTestBtn disabled={selectedQuestionIds.length === 0} onClick={() => navigate('/interview')}>면접 보기 ({selectedQuestionIds.length})</GoTestBtn>
        :
        <GoTestBtn disabled={!user} onClick={() => navigate('/interview')}>면접 보기</GoTestBtn>
        }
    </>
  )
}

export default Question

const Container = styled.div`
    margin-top: 80px;
    margin: 0 auto;
    width: 1100px;
    @media screen and (max-width: 1000px) {
        width: 768px;  
    }
`
const TextStyle2 = styled.div`
  margin-top: 25px;
  text-align: left;
  font-weight: 700;
  font-size: 17px;
  line-height: 200.2%;
  color: ${colors.black_70};
`
const GraText = styled.div`
    margin-top: 80px;
    padding-top: 5px;
    display: inline-block;
    font-family: 'Gotham';
    font-weight: 700;
    font-size: 18px;
    line-height: 19px;
    background: linear-gradient(135.86deg, #9E3DFF 0%, #3840FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`
const CategoryText = styled.div`
    font-family: 'Gotham';
    font-weight: 700;
    font-size: 50px;
    line-height: 52px;
    margin-top: 22px;

    color: ${colors.black_100};
`
const BtnFlex = styled.div`
    display: flex;
    justify-content: space-between;
`
const GoTestBtn = styled.button`
    border: none;
    z-index: 2;
    width: 190px;
    height: 62px;
    position: sticky;
    left: calc(50% - 194.35px/2 - 0.33px);
    bottom: 40px;
    box-shadow: 0px 0px 9.20818px rgba(0, 0, 0, 0.1);
    border-radius: 34.9911px;
    background: linear-gradient(135.86deg, #9E3DFF 0%, #3840FF 100%);
    cursor: pointer;

    color: ${colors.white_100};
    font-size: 22px;
    line-height: 27px;
    letter-spacing: 0.05em;
    font-weight: 700;

    &:disabled {
        background: ${colors.black_20};
        cursor: not-allowed;
    }
`
const RandomTestBtn = styled.button`
    padding-top: 4px;
    width: 90px;
    height: 36px;
    font-size: 16px;
    border: none;
    background-color: ${colors.white_100};
    font-weight: 700;
    line-height: 200.2%;
    color: ${colors.black_90};
    filter: drop-shadow(0px 0px 9.14454px rgba(0, 0, 0, 0.1));
    border-radius: 4.24669px;
`