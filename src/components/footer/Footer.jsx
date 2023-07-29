import React from 'react'
import styled from 'styled-components';
import GrayLogo from '../../assets/svg/GrayLogo.svg';
import Facebook from '../../assets/svg/Facebook.svg';
import Instagram from '../../assets/svg/Instagram.svg';
import Twitter from '../../assets/svg/Twitter.svg';
import Youtube from '../../assets/svg/Youtube.svg';
import colors from '../../style/color';

const FooterStyle = styled.div`
    height: 313px;
    width: 100%;

    position: relative;
    display: block;
    left: 0;
    bottom: 0;

    background: #F5F5F7;
    border-top: 1px solid #ACADAD;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`

const FooterLayout = styled.div`
    position: relative;
`
const GrayLogoLayout = styled.div`
    position: relative;
    bottom: 40px;
`
const FooterFirst = styled.div`
    display: flex;
    gap: 5px;
    justify-content: center;

    color: ${colors.black_40};
    font-size: 13px;
    line-height: 18px;
`
const FooterIterview = styled.div`
    font-weight: 600;
`
const FooterSecond = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;

    position: relative;
    top: 13px;

    color: ${colors.black_20};
    font-size: 13px;
    line-height: 18px;
`
const FooterRole = styled.div`
    font-weight: 400;
`
const SNSLayout = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;

    position: relative;
    top: 40px;
`

function Footer() {
  return (
    <FooterStyle>
        <FooterLayout>
            <GrayLogoLayout>
                <img src={GrayLogo} alt='Logo' />
            </GrayLogoLayout>
            <FooterFirst>
                <FooterIterview>2023 숭실대학교 컴퓨터학부 소프트웨어 공모전</FooterIterview>
                <div>| ⓒ 2023 ITERVIEW INC.</div>
            </FooterFirst>
            <FooterSecond>
                <FooterRole>기획 이조은</FooterRole>
                <FooterRole>디자인 유민진</FooterRole>
                <FooterRole>프론트엔드 서채연</FooterRole>
                <FooterRole>백엔드 주승우</FooterRole>
            </FooterSecond>
            <SNSLayout>
                <img src={Facebook} alt='Facebook' />
                <img src={Instagram} alt='Instagram' />
                <img src={Youtube} alt='Youtube' />
                <img src={Twitter} alt='Twitter' />
            </SNSLayout>
        </FooterLayout>
    </FooterStyle>
  )
}

export default Footer