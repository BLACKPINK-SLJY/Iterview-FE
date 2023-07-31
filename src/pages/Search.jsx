import React, {useState} from 'react'
import Nav from '../components/nav/Nav'
import { styled } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import DropDownBtn from '../components/toggle/DropDownBtn';
import QuestionBtn from '../components/questionBtn/questionBtn';
import X from "../assets/svg/xBtn.svg";
import { useRecoilState } from 'recoil';
import { ClickedState, QuestionState } from '../recoil/QuestionState';
import { useEffect } from 'react';
import Footer from '../components/footer/Footer';
import colors from '../style/color';
import { UserState } from '../recoil/userState';
import NotAccess from './NotAccess';
import { ColorRing } from 'react-loader-spinner';

function Search() {
    const [user, setUser] = useRecoilState(UserState);
    const [clickedQuestion, setclickedQuestion] = useRecoilState(ClickedState);
    const location = useLocation();
    const navigate = useNavigate();
    const search = location.state?.content;
    const [result, setResult] = useState(location.state?.searchResult);
    const [resultQuestion, setResultQuestion] = useRecoilState(QuestionState);
    const [ischoose, setIsChoose] = useState(true);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        if(result){
          setResult(location.state.searchResult.sort((a,b) => a.level - b.level));
          setclickedQuestion([]);
          setLoading(false);
          setResultQuestion(location.state.searchResult);
        }
      }, [location.state?.searchResult, setResultQuestion]);



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

      const questionArr = [...(result || [])];
      const favoriteArr = questionArr.sort((a, b) => b.entireBookmarkedCount - a.entireBookmarkedCount);
  
      const handleDropDown = (selectedValue) => {
              if(selectedValue === '난이도 낮은 순') {
                  setResult(questionArr.sort((a,b) => a.level - b.level));
              }
              else if (selectedValue === '난이도 높은 순') {
                  setResult(questionArr.sort((a,b) => b.level - a.level));
              }
              else setResult(favoriteArr);
          }

  return (
    <>
    {user ?
    <>
    <Nav/>
    {loading ?
      <>
      <div style={{textAlign: "center", marginTop: "350px"}}>
        <ColorRing
        visible={true}
        height="100"
        width="100"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#9E3DFF', '#3840FF', '#ACADAD', '#9E3DFF', '#3840FF']}
        />
        <div style={{paddingTop:"30px", fontSize:"30px"}}>답변 불러오는 중...</div>
      </div>
      </>
      :
      <>
      <Container>
      <SearchTitle>"{search}" 검색결과</SearchTitle>
      <br/>
      <br/>
      <br/>
      {result && result.length > 0 ?
      <>
      <div style={{display:'flex', flexDirection:'row-reverse'}}>
      <DropDownBtn handleDropDown={(selectedValue) => handleDropDown(selectedValue)}/>
      </div>
      <QuestionBtn contents={result} ischoose={ischoose} handleQuestionClick={handleQuestionClick} selectedQuestionIds={selectedQuestionIds}/>
      </>
      :
      <div style={{justifyContent:'center', textAlign:'center', marginTop:'104px'}}>
      <img src={X} style={{width: "28px", height: "28px", margin: "0 auto", textAlign:"center", marginTop:"18px", marginBottom:"28px"}} alt='x'/>
      <div style={{display: "flex", flexDirection:"row", fontWeight:"600", fontSize:"26px", lineHeight:"35px", margin: "0 auto", textAlign:"center", marginBottom:"28px", justifyContent:'center'}}>
      <div style={{color: "#DB5752"}}>"{search}"</div>
      <div>에 대한 질문이 없어요!</div>
      </div>
      <div style={{margin: "0 auto", textAlign:"center", color:"#ACADAD", fontWeight:"600", fontSize:"21px", lineHeight:"180.2%"}}>단어의 철자가 정확한지 확인해보시고</div>
      <div style={{margin: "0 auto", textAlign:"center", color:"#ACADAD", fontWeight:"600", fontSize:"21px", lineHeight:"180.2%", marginBottom:"700px"}}>다른 검색어를 입력해 보세요</div>
      </div>
      }
      </Container>
      <br/>
      <br/>
      <Footer />
      {result && result.length > 0 &&
            <GoTestBtn disabled={selectedQuestionIds.length === 0} onClick={() => navigate('/interview')}>면접 보기 ({selectedQuestionIds.length})</GoTestBtn>
      }
      </>
    }
    </>
    :
    <>
    <Nav />
    <NotAccess/>
    </>
    }
    </>
  )
}

export default Search

const SearchTitle = styled.div`
  margin: 0 auto;
  margin-top: 94px;
  width: auto;
  height: 62px;

  font-weight: 700;
  font-size: 45.5282px;
  line-height: 62px;
  text-align: center;
  padding-top: 20px;

  color: #303132;
`
const Container = styled.div`
    margin-top: 80px;
    margin: 0 auto;
    width: 1100px;
    @media screen and (max-width: 1000px) {
        width: 768px;  
    }
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