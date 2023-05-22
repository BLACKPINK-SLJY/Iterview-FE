import React, {useState} from 'react'
import data from '../data/data'
import Nav from '../components/nav/Nav';
import Footer from '../components/footer/Footer';
import { styled } from 'styled-components';
import colors from '../style/color';
import QuestionToggle from '../components/toggle/QuestionToggle';
import DropDownBtn from '../components/toggle/DropDownBtn';
import SelectBtn from '../components/toggle/SelectBtn';
import QuestionBtn from '../components/questionBtn/questionBtn';

function Question() {
    const [ischoose, setIsChoose] = useState(false);
    const [isSelect, setIsSelect] = useState(false);
    
    const getIsChoose = (text) => {
        setIsChoose(text);
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
        <CategoryText>{data[0].category}</CategoryText>
        <TextStyle2>질문을 선택해 질문에 대한 답을 준비해보세요.<br/>동영상 녹화를 통해 면접 영상을 확인할 수 있습니다.</TextStyle2>
        <BtnFlex>
        <QuestionToggle getIsChoose={getIsChoose} />
        <div style={{display: "flex", gap:"16px", alignItems: "end"}}>
        <DropDownBtn />
        {ischoose &&
             <SelectBtn />
        }
        </div>
        </BtnFlex>
        <QuestionBtn />
        <br/>
        <GoTestBtn disabled={true}>면접 보러 가기</GoTestBtn>
    </Container>
    <Footer />
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
    width: 220px;
    height: 62px;
    position: fixed;
    left: calc(50% - 194.35px/2 - 0.33px);
    bottom: 40px;
    box-shadow: 0px 0px 9.20818px rgba(0, 0, 0, 0.1);
    border-radius: 34.9911px;
    background: linear-gradient(135.86deg, #9E3DFF 0%, #3840FF 100%);

    color: ${colors.white_100};
    font-size: 22px;
    line-height: 27px;
    letter-spacing: 0.05em;

    :disabled {
        background: ${colors.black_20};
    }
`