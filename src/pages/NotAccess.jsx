import React from 'react'
import X from "../assets/svg/xBtn.svg";
import { styled } from 'styled-components';
import colors from '../style/color';

function NotAccess() {
  return (
    <>
    <Container>
    <div style={{justifyContent:'center', textAlign:'center', marginTop:'200px'}}>
    <img src={X} style={{width: "28px", height: "28px", margin: "0 auto", textAlign:"center", marginTop:"18px", marginBottom:"28px"}} alt='x'/>
    <BlackText>해당 페이지에 접근 권한이 없습니다.</BlackText>
    <BlackText><span style={{color:'#FF6464'}}>로그인 후 이용</span>해주세요.</BlackText>
    </div>
    </Container>
    </>
  )
}

export default NotAccess

const Container = styled.div`
    margin-top: 80px;
    margin: 0 auto;
    width: 1100px;
    @media screen and (max-width: 1000px) {
        width: 768px;  
    }
`
const BlackText = styled.div`
    font-weight: 600;
    font-size: 30px;
    line-height: 43px;
    text-align: center;
    color: ${colors.black_100};
`