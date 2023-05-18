import React, {useState} from 'react'
import { styled } from 'styled-components';
import colors from '../style/color';
import FE from "../assets/svg/FE.svg";
import BE from "../assets/svg/BE.svg";
import AND from "../assets/svg/AND.svg";
import IOS from "../assets/svg/IOS.svg";

import GFE from "../assets/svg/GraFE.svg";
import GBE from "../assets/svg/GraBE.svg";
import GAND from "../assets/svg/GraAND.svg";
import GIOS from "../assets/svg/GraIOS.svg";
import Nav from '../components/nav/Nav';
import Footer from '../components/footer/Footer';

function Select() {
    const [onHover, setOnHover] = useState(0);
    const [onHover2, setOnHover2] = useState(0);
    const [onHover3, setOnHover3] = useState(0);
    const [onHover4, setOnHover4] = useState(0);

  return (
    <>
    <Nav />
        <TextStyle2>원하는 직무를 선택해보세요.<br/>더 세분화된 직무별 질문을 확인할 수 있습니다.</TextStyle2>
    <SelectGrid>
      <div 
        onMouseOver={()=>setOnHover(1)}
        onMouseOut={()=>setOnHover(0)}
      >
      {onHover ? (
          <SelecBtn><img src={GFE} alt="gfe"></img><br/><GraText>Frontend</GraText></SelecBtn>
      ) : <SelecBtn><img src={FE} alt="fe"></img><br/>Frontend</SelecBtn>
      }
      </div>
      <div 
        onMouseOver={()=>setOnHover2(1)}
        onMouseOut={()=>setOnHover2(0)}
      >
      {onHover2 ? (
          <SelecBtn><img src={GBE} alt="gbe"></img><br/><GraText>Backend</GraText></SelecBtn>
      ) : <SelecBtn><img src={BE} alt="be"></img><br/>Backend</SelecBtn>
      }
      </div>
      <div 
        onMouseOver={()=>setOnHover3(1)}
        onMouseOut={()=>setOnHover3(0)}
      >
      {onHover3 ? (
          <SelecBtn><img src={GAND} alt="gandroid"></img><br/><GraText>Android</GraText></SelecBtn>
      ) : <SelecBtn><img src={AND} alt="android"></img><br/>Android</SelecBtn>
      }
      </div>
      <div 
        onMouseOver={()=>setOnHover4(1)}
        onMouseOut={()=>setOnHover4(0)}
      >
      {onHover4 ? (
          <SelecBtn><img src={GIOS} alt="gios"></img><br/><GraText>ios</GraText></SelecBtn>
      ) : <SelecBtn><img src={IOS} alt="ios"></img><br/>ios</SelecBtn>
      }
      </div>
    </SelectGrid>
    <Footer />
    </>
  )
}

export default Select

const TextStyle2 = styled.div`
  margin-top: 80px;
  margin-bottom: 61px;

  text-align: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 200.2%;
  color: ${colors.black_70};
`
const SelecBtn = styled.button`
  background: ${colors.white_100};
  box-shadow: 0px 0px 11.1402px rgba(0, 0, 0, 0.1);
  border-radius: 17.2449px;

  font-weight: 700;
  font-size: 40px;
  line-height: 134.2%;
  width: 392px;
  height: 251px;
  border: none;
  cursor: pointer;

  transition: .3s;

  &:hover {
    transform: scale(1.1, 1.1);
  }
`
const GraText = styled.div`
    background: linear-gradient(135.86deg, #9E3DFF 0%, #3840FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    /* text-fill-color: transparent; */
`
const SelectGrid = styled.div`
  width: 838px;
  height: 542px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: auto;
  grid-gap: 40px;
  column-gap: 53px;
  
  margin-bottom: 200px;
`