import React, {useEffect, useState} from 'react'
import Nav from '../components/nav/Nav'
import { styled } from 'styled-components';
import colors from '../style/color';
import MypageToggle from '../components/toggle/MypageToggle';
import MyPageDropDownBtn from '../components/toggle/MyPageDropDownBtn';
import DropDownRole from '../components/toggle/DropDownRole';
import { useRecoilState } from 'recoil';
import { UserState } from '../recoil/userState';
import axios from 'axios';
import QuestionBtn from '../components/questionBtn/questionBtn';
import Footer from '../components/footer/Footer';
import { useNavigate } from 'react-router-dom';
import { AnsweredState, QuestionState } from '../recoil/QuestionState';
import { BaseUrl } from '../privateKey';

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
    
    const [selectedDropDownValue, setSelectedDropDownValue] = useState("최신 순");
    const [selectedRoleDropDownValue, setSelectedRoleDropDownValue] = useState("전체");

    const shouldSendHeader = !!user;

    const axiosConfig = {
        headers: shouldSendHeader ? { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } : {},
        params: {
          category: iscategory,
        },
      };
    
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
        axios.get(`${BaseUrl}/question/list`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then((res) => setQuestion(res.data.data))

        if(mysol) {
            handleAnswered();
        }
        else {
            handleBookmark();
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
            setRecent(res.data.data);
            setContents(res.data.data);
            setFilteredContents(res.data.data)
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
            setRecent(res.data.data);
            setContents(res.data.data);
            setFilteredContents(res.data.data)
        })
    }

    const questionArr = [...filteredContents];
    const levelArr = Array.from(questionArr).sort((a,b) => a.level - b.level);
    const favoriteArr = Array.from(questionArr).sort((a, b) => b.entireBookmarkedCount - a.entireBookmarkedCount);

    const handleDropDown = (selectedValue) => {
      console.log(contents);

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
              setFilteredContents(recent.filter((item) => item.category === "IOS"));
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
        <QuestionBtn contents={filteredContents} inmypage={inMypage} />
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