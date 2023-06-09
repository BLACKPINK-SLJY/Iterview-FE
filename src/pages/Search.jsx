import React, {useState} from 'react'
import Nav from '../components/nav/Nav'
import { styled } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import DropDownBtn from '../components/toggle/DropDownBtn';
import QuestionBtn from '../components/questionBtn/questionBtn';
import X from "../assets/svg/xBtn.svg";
import { useRecoilState } from 'recoil';
import { ClickedState } from '../recoil/QuestionState';
import { useEffect } from 'react';
import Footer from '../components/footer/Footer';
import colors from '../style/color';

function Search() {
    const [clickedQuestion, setclickedQuestion] = useRecoilState(ClickedState);
    const location = useLocation();
    const navigate = useNavigate();
    const search = location.state.content;
    const [result, setResult] = useState(location.state.searchResult);
    const [ischoose, setIsChoose] = useState(true);

    useEffect(() => {
        setResult(location.state.searchResult.sort((a,b) => a.level - b.level));
        setclickedQuestion([]);
      }, [location.state.searchResult]);



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

      const questionArr = [...result];
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
    <Nav/>
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
    <GoTestBtn disabled={selectedQuestionIds.length === 0} onClick={() => navigate('/interview')}>면접 보기 ({selectedQuestionIds.length})</GoTestBtn>
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
    position: fixed;
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