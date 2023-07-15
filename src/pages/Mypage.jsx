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
import { AnsweredState } from '../recoil/QuestionState';

function Mypage(props) {
    const [user, setUser] = useRecoilState(UserState);
    const [mysol, setMySol] = useState(true);
    const [iscategory, setIscategory] = useState('');
    const [contents, setContents] = useState([]);
    const [recent, setRecent] = useState([]);
    const [inMypage, setInMypage] = useState(true);
    const [isAnswer, setIsAnswer] = useRecoilState(AnsweredState);
    const navigate = useNavigate();

    const shouldSendHeader = !!user;

    const axiosConfig = {
        headers: shouldSendHeader ? { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } : {},
        params: {
          category: iscategory,
        },
      };
    
    const getMySol = (text) => {
        setMySol(text);
        console.log(mysol);
    }

    useEffect(() => {
        if(mysol) {
            handleAnswered();
        }
        else {
            handleBookmark();
        }
    }, [mysol])

    const handleAnswered = () => {
        axios
        .get('http://15.165.104.225/question/my/answered', {
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
        })
    }

    const handleBookmark = () => {
        axios
        .get('http://15.165.104.225/question/my/bookmarked', {
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
        })
    }

    const questionArr = [...contents];
    const levelArr = questionArr.sort((a,b) => a.level - b.level);
    const favoriteArr = questionArr.sort((a, b) => b.entireBookmarkedCount - a.entireBookmarkedCount);

    const handleDropDown = (selectedValue) => {
            if(selectedValue === '난이도 낮은 순') setContents(levelArr);
            else if (selectedValue === '난이도 높은 순') setContents(levelArr.reverse());
            else if(selectedValue === '인기 순') setContents(favoriteArr);
            else if(selectedValue === '최신 순') setContents(recent);
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
        <MyPageDropDownBtn handleDropDown={(selectedValue) => handleDropDown(selectedValue)} />
        <DropDownRole />
        </div>
        </BtnFlex>
        {mysol ?
        <QuestionBtn contents={contents} inmypage={inMypage} handleGoAnswer={handleGoAnswer} mysol={mysol}/>
        :
        <QuestionBtn contents={contents} inmypage={inMypage}/>
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