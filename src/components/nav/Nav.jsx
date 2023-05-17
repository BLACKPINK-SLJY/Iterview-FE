import React from 'react'
import { Logos, NavLayout, SignButtonLayout, SignUpButton, LoginButton, SearchNickLayout } from './style'
import Logo from "../../assets/svg/Logo.svg"
import Logo2 from "../../assets/svg/Logo_2.svg"
import { useNavigate } from 'react-router-dom';
import SearchBar from '../searchBar/Searchbar';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

function Nav() {
  const navigate = useNavigate();

  const onClickLogin = () => {
    navigate("/login");
  }

  const onClickSignup = () => {
    navigate("/signup");
  }

  const onClickHome = () => {
    navigate("/");
  }

  return (
    <>
    <NavLayout>
        <Logos onClick={onClickHome}>
            <img src={Logo} alt="logo" />
            <img src={Logo2} alt="iterview" />
            <DropdownSelect style={{marginLeft: "14px"}}>
            <TextStyle>직무선택</TextStyle>
            <FontAwesomeIcon icon={faAngleDown} style={{color:"white", paddingTop:"13px"}} />
            </DropdownSelect>
        </Logos>
        {/* <SignButtonLayout>
            <SignUpButton onClick={onClickSignup}>회원가입</SignUpButton>
            <LoginButton onClick={onClickLogin}>로그인</LoginButton>
        </SignButtonLayout> */}
        <SearchNickLayout>
        <SearchBar />
        <TextStyle>유민진<SpanStyle>님</SpanStyle>
        <FontAwesomeIcon icon={faAngleDown} style={{color:"white", marginLeft: "7px"}} />
        </TextStyle>
        </SearchNickLayout>
    </NavLayout>
    </>
  )
}

export default Nav

const TextStyle = styled.div`
  font-weight: 700;
  font-size: 18.4932px;
  padding-top: 8px;
  line-height: 27px;
  letter-spacing: 0.05em;
  color: white;
`
const SpanStyle = styled.span`
 font-weight: 400;
 margin-left: 7px;
`
const DropdownSelect = styled.div`
  display: flex;
  gap: 6px;
`