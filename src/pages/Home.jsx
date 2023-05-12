import React from 'react'
import { styled } from 'styled-components';
import Mainillust from '../assets/svg/Mainillust.svg';
import AnimationBar from '../components/animationBar';
import Footer from '../components/footer/Footer';
import Nav from '../components/nav/Nav';
import colors from '../style/color';

function Home() {
  return (
    <>
    <Nav />
    <AnimationBar />
    <TextBoxLayout>
          <TextBox>
            <GradientText>온라인 면접 서비스</GradientText>
            <NotgradientText>로 IT 기술 면접 준비를 보다</NotgradientText>
            <Textjump>
              <GradientText>수월하게!</GradientText>
            </Textjump>
          </TextBox>
          <TextBox>
            <GradientText>최신 트렌드</GradientText>
            <NotgradientText>에 맞춰 엄선된 질문으로 면접 준비를 보다</NotgradientText>
            <Textjump>
              <GradientText>확실하게!</GradientText>
            </Textjump>
          </TextBox>
          <ImgStyle>
            <img src={Mainillust} alt='Iterview' />
          </ImgStyle>
          <Button>시작하기</Button>
    </TextBoxLayout>
    <Footer />
    </>
  )
}

export default Home

const TextBoxLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 123px;
  margin-bottom: 122px;
`
const TextBox = styled.div`
  display: flex;

`
const GradientText = styled.div`
  font-weight: 600;
  font-size: 29.2726px;
  line-height: 50px;

  background: linear-gradient(135.86deg, #9E3DFF 0%, #3840FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`
const NotgradientText = styled.div`
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 29.2726px;
  line-height: 50px;
`
const ImgStyle = styled.div`
  width: 702.1px;
  height: 324.36px;
  left: 369px;
  top: 442px;

  margin-top: 60px;
  margin-bottom: 60.64px;
`
const Textjump = styled.div`
  padding-left: 7px;
`

const Button = styled.button`
  width: 315px;
  height: 73px;
  z-index: 1;

  background: ${colors.white_100};
  box-shadow: 0px 0px 12.9193px rgba(0, 0, 0, 0.1);
  border-radius: 76px;

  color: ${colors.black_100};
  font-weight: 800;
  font-size: 25.8385px;
  line-height: 35px;
  letter-spacing: 0.05em;
  transition: .3s;

  border: none;

  &:hover {
    transform: scale(1.1, 1.1);
  }

`