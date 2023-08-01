import React, {useEffect, useState} from 'react'
import Nav from '../components/nav/Nav'
import { styled } from 'styled-components';
import colors from '../style/color';
import MypageToggle from '../components/toggle/MypageToggle';
import MyPageDropDownBtn from '../components/toggle/MyPageDropDownBtn';
import DropDownRole from '../components/toggle/DropDownRole';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { UserState } from '../recoil/userState';
import axios from 'axios';
import QuestionBtn from '../components/questionBtn/questionBtn';
import Footer from '../components/footer/Footer';
import { useNavigate } from 'react-router-dom';
import { AnsweredState, QuestionState, ScrabedState } from '../recoil/QuestionState';
import { BaseUrl } from '../privateKey';
import { postRefreshToken } from '../instance/apis';

function Mypage(props) {
    const [user, setUser] = useRecoilState(UserState);
    const [mysol, setMySol] = useState(true);
    const [iscategory, setIscategory] = useState('');
    const [contents, setContents] = useState([]);
    const [recent, setRecent] = useState([]);
    const [inMypage, setInMypage] = useState(true);
    const [question, setQuestion] = useRecoilState(QuestionState);
    const [isAnswer, setIsAnswer] = useRecoilState(AnsweredState);
    const [filteredContents, setFilteredContents] = useState(contents);
    const navigate = useNavigate();
    const [alertShown, setAlertShown] = useState(false);
    const [isScrab, setIsScrab] = useRecoilState(ScrabedState);
    
    const [selectedDropDownValue, setSelectedDropDownValue] = useState("최신 순");
    const [selectedRoleDropDownValue, setSelectedRoleDropDownValue] = useState("전체");

    // const updateScrabStatus = (dataFromServer) => {
    //   setScrab(dataFromServer);
    // };

    const shouldSendHeader = !!user;

    const getMySol = (text) => {
        setMySol(text);

        if(mysol) {
            setInMypage(true);
        }
        else {
            setInMypage(false);
        }
    }

    useEffect(() => {
       console.log(filteredContents);
        axios.get(`${BaseUrl}/question/list`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then((res) => {
          if(!alertShown){
          if (res.data.status === 40003) {
            if (res.data.message === "엑세스 토큰의 유효기간이 만료되었습니다.") {
              const originRequest = res.config;
              // 리프레시 토큰 api
              postRefreshToken().then((refreshTokenResponse) => {
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
                else if (refreshTokenResponse.data.status === 40004) {
                  throw new Error('로그인 만료, 다시 로그인해주세요.');
                  }
                })
                .catch((error) => {
                  alert('로그인 만료, 다시 로그인해주세요.');
                  setUser(null);
                  navigate('/login');
                  return;
                });
              }
              }}
          return res;
        })
        .then((res) => {
          // 성공적으로 처리된 응답
          setQuestion(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        })

        if(shouldSendHeader){
        if(mysol) {
            handleAnswered();
        }
        else {
            handleBookmark();
        }
      }

    }, [mysol])

    const handleAnswered = () => {
        axios
        .get(`${BaseUrl}/question/my/answered`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: iscategory === '' ? {} : {
              category: iscategory,
            },
        })
        .then((res) => {

          if(!alertShown){
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
                else if (refreshTokenResponse.data.status === 40004) {
                  throw new Error('로그인 만료, 다시 로그인해주세요.');
                }
              })
              .catch((error) => {
                console.error('리프레시 토큰 요청 실패:', error);
                // alert('로그인 만료, 다시 로그인해주세요.');
                // setUser(null);
                navigate('/login');
                return;
              });
            }
              }}
          return res;
        })
        .then((res) => {
          // 성공적으로 처리된 응답
          setRecent(res.data.data);
          setContents(res.data.data);
          setFilteredContents(res.data.data)
          console.log(recent);
        })
        .catch((err) => {
          console.log(err);
        })
      }

    const handleBookmark = () => {
        axios
        .get(`${BaseUrl}/question/my/bookmarked`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: iscategory === '' ? {} : {
              category: iscategory,
            },
        })
        .then((res) => {
          if(!alertShown){
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
                else if (refreshTokenResponse.data.status === 40004) {
                  throw new Error('로그인 만료, 다시 로그인해주세요.');
                }
              })
              .catch((error) => {
                console.error('리프레시 토큰 요청 실패:', error);
                // alert('로그인 만료, 다시 로그인해주세요.');
                // setUser(null);
                navigate('/login');
                return;
              });
            }
              }}
          return res;
        })
        .then((res) => {
          // 성공적으로 처리된 응답
          setRecent(res.data.data);
          setContents(res.data.data);
          setFilteredContents(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }

    const questionArr = [...filteredContents];
    const levelArr = Array.from(questionArr).sort((a,b) => a.level - b.level);
    const favoriteArr = Array.from(questionArr).sort((a, b) => b.entireBookmarkedCount - a.entireBookmarkedCount);

    const handleDropDown = (selectedValue) => {
      if (selectedValue === '난이도 낮은 순') {
        const updatedLevelArr = Array.from(questionArr).sort((a, b) => a.level - b.level);
        setFilteredContents(updatedLevelArr);
      }
      else if (selectedValue === '난이도 높은 순') {
        const updatedLevelArr = Array.from(levelArr).sort((a, b) => b.level - a.level);
        setFilteredContents(updatedLevelArr);
      }
      else if (selectedValue === '인기 순') {
        const updatedFavoriteArr = Array.from(favoriteArr).sort((a, b) => b.entireBookmarkedCount - a.entireBookmarkedCount);
        setFilteredContents(updatedFavoriteArr);
      }
      else if (selectedValue === '최신 순') {
        setFilteredContents(recent);
      }
    
      setSelectedDropDownValue(selectedValue);
        }

        const handleRole = (selectedRole, selectValue) => {
          if (selectedRole === "Frontend") {
            if (selectValue === '최신 순') {
              setFilteredContents(recent.filter((item) => item.category === "FE"));
            }
            else if (selectValue === '난이도 낮은 순') {
              const updatedLevelArr = Array.from(contents).filter((item) => item.category === "FE").sort((a, b) => a.level - b.level);
              setFilteredContents(updatedLevelArr);
            }
            else if (selectValue === '난이도 높은 순') {
              const updatedLevelArr = Array.from(contents).filter((item) => item.category === "FE").sort((a, b) => b.level - a.level);
              setFilteredContents(updatedLevelArr);
            }
            else if (selectValue === '인기 순') {
              const updatedFavoriteArr = Array.from(contents).filter((item) => item.category === "FE").sort((a, b) => b.entireBookmarkedCount - a.entireBookmarkedCount);
              setFilteredContents(updatedFavoriteArr);
            }
          }
          else if (selectedRole === "Backend") {
            if (selectValue === '최신 순') {
              setFilteredContents(recent.filter((item) => item.category === "BE"));
            }
            else if (selectValue === '난이도 낮은 순') {
              const updatedLevelArr = Array.from(contents).filter((item) => item.category === "BE").sort((a, b) => a.level - b.level);
              setFilteredContents(updatedLevelArr);
            }
            else if (selectValue === '난이도 높은 순') {
              const updatedLevelArr = Array.from(contents).filter((item) => item.category === "BE").sort((a, b) => b.level - a.level);
              setFilteredContents(updatedLevelArr);
            }
            else if (selectValue === '인기 순') {
              const updatedFavoriteArr = Array.from(contents).filter((item) => item.category === "BE").sort((a, b) => b.entireBookmarkedCount - a.entireBookmarkedCount);
              setFilteredContents(updatedFavoriteArr);
            }
          }
          else if (selectedRole === "Android") {
            if (selectValue === '최신 순') {
              setFilteredContents(recent.filter((item) => item.category === "AOS"));
            }
            else if (selectValue === '난이도 낮은 순') {
              const updatedLevelArr = Array.from(contents).filter((item) => item.category === "AOS").sort((a, b) => a.level - b.level);
              setFilteredContents(updatedLevelArr);
            }
            else if (selectValue === '난이도 높은 순') {
              const updatedLevelArr = Array.from(contents).filter((item) => item.category === "AOS").sort((a, b) => b.level - a.level);
              setFilteredContents(updatedLevelArr);
            }
            else if (selectValue === '인기 순') {
              const updatedFavoriteArr = Array.from(contents).filter((item) => item.category === "AOS").sort((a, b) => b.entireBookmarkedCount - a.entireBookmarkedCount);
              setFilteredContents(updatedFavoriteArr);
            }
          }
          else if (selectedRole === "iOS") {
            if (selectValue === '최신 순') {
              setFilteredContents(recent.filter((item) => item.category === "IOS"));
            }
            else if (selectValue === '난이도 낮은 순') {
              const updatedLevelArr = Array.from(contents).filter((item) => item.category === "IOS").sort((a, b) => a.level - b.level);
              setFilteredContents(updatedLevelArr);
            }
            else if (selectValue === '난이도 높은 순') {
              const updatedLevelArr = Array.from(contents).filter((item) => item.category === "IOS").sort((a, b) => b.level - a.level);
              setFilteredContents(updatedLevelArr);
            }
            else if (selectValue === '인기 순') {
              const updatedFavoriteArr = Array.from(contents).filter((item) => item.category === "IOS").sort((a, b) => b.entireBookmarkedCount - a.entireBookmarkedCount);
              setFilteredContents(updatedFavoriteArr);
            }
          }
          else if (selectedRole === "전체") {
            if (selectValue === '최신 순') {
              setFilteredContents(recent);
            }
            else if (selectValue === '난이도 낮은 순') {
              const updatedLevelArr = Array.from(contents).sort((a, b) => a.level - b.level);
              setFilteredContents(updatedLevelArr);
            }
            else if (selectValue === '난이도 높은 순') {
              const updatedLevelArr = Array.from(contents).sort((a, b) => b.level - a.level);
              setFilteredContents(updatedLevelArr);
            }
            else if (selectValue === '인기 순') {
              const updatedFavoriteArr = Array.from(contents).sort((a, b) => b.entireBookmarkedCount - a.entireBookmarkedCount);
              setFilteredContents(updatedFavoriteArr);
            }
          }
        
          setSelectedRoleDropDownValue(selectedRole);
        
          }
          

    const handleGoAnswer = (questionId) => {
        navigate(`/mypage/${user.account}/${questionId}`);
        setIsAnswer(questionId);
    }

  return (
    <>
    <Nav />
    <Container>
        <CategoryText>MY PAGE</CategoryText>
        <TextStyle2>내 답변과 면접 영상을 확인해 보세요.<br/>스스로 피드백 하는 시간을 가질 수 있습니다.</TextStyle2>
        <BtnFlex>
        <MypageToggle getMySol={getMySol}/>
        <div style={{display: "flex", gap:"16px", alignItems: "end"}}>
        <MyPageDropDownBtn handleDropDown={(selectedValue) => handleDropDown(selectedValue)} mysol={inMypage}/>
        <DropDownRole handleRole={(selectedRole) => handleRole(selectedRole, selectedDropDownValue)} mysol={inMypage} />
        </div>
        </BtnFlex>
        {mysol ?
        <QuestionBtn contents={filteredContents} inmypage={inMypage} handleGoAnswer={handleGoAnswer} mysol={mysol}/>
        :
        <QuestionBtn contents={filteredContents} inmypage={inMypage} isBookScrab={isScrab}/>
        }
    </Container>
    <br/>
    <br/>
    <br/>
    <Footer />
    </>
  )
}

export default Mypage

const Container = styled.div`
    /* margin-top: 80px; */
    margin: 0 auto;
    width: 1100px;
    @media screen and (max-width: 1000px) {
        width: 768px;  
    }
`
const CategoryText = styled.div`
    font-family: 'Gotham';
    font-weight: 700;
    font-size: 50px;
    line-height: 52px;
    margin-top: 102px;

    color: ${colors.black_100};
`
const TextStyle2 = styled.div`
  margin-top: 25px;
  text-align: left;
  font-weight: 700;
  font-size: 17px;
  line-height: 200.2%;
  color: ${colors.black_70};
`
const BtnFlex = styled.div`
    display: flex;
    justify-content: space-between;
`