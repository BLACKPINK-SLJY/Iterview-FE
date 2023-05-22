import React, {useEffect, useRef, useState} from 'react'
import { Logos, NavLayout, SignButtonLayout, SignUpButton, LoginButton, SearchNickLayout } from './style'
import Logo from "../../assets/svg/Logo.svg"
import Logo2 from "../../assets/svg/Logo_2.svg"
import { useNavigate } from 'react-router-dom';
import SearchBar from '../searchBar/Searchbar';
import { css, styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import useDetectClose from './useDetectClose';
import colors from '../../style/color';

function Nav() {
  const [selectIsOpen, selectRef, selectHandler] = useDetectClose(false)
  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);
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
        <Logos>
            <img src={Logo} alt="logo" style={{cursor: "pointer"}} onClick={onClickHome}/>
            <img src={Logo2} alt="iterview" style={{cursor: "pointer"}} onClick={onClickHome}/>
            <DropdownContainer>
              <DropdownSelect style={{marginLeft: "14px"}} onClick={selectHandler} ref={selectRef}>
              <TextStyle>직무선택</TextStyle>
              <FontAwesomeIcon icon={faAngleDown} style={{color:"white", paddingTop:"13px"}} />
              </DropdownSelect>
              <DropDownMenu isDropped={selectIsOpen}>
                <Ul>
                  <li>
                    <LinkWrapper href="#1-1">Frontend</LinkWrapper>
                  </li>
                  <li>
                    <LinkWrapper href="#1-2">Backend</LinkWrapper>
                  </li>
                  <li>
                    <LinkWrapper href="#1-4">Android</LinkWrapper>
                  </li>
                  <li>
                    <LinkWrapper href="#1-5">ios</LinkWrapper>
                  </li>
                </Ul>
              </DropDownMenu>
              </DropdownContainer>
        </Logos>
        {/* <SignButtonLayout>
            <SignUpButton onClick={onClickSignup}>회원가입</SignUpButton>
            <LoginButton onClick={onClickLogin}>로그인</LoginButton>
        </SignButtonLayout> */}
        <SearchNickLayout>
        <SearchBar />
        <DropdownContainer>
          <DropdownSelect onClick={myPageHandler} ref={myPageRef}>
            <TextStyle>유민진<SpanStyle>님</SpanStyle>
            <FontAwesomeIcon icon={faAngleDown} style={{color:"white", marginLeft: "7px"}} />
            </TextStyle>      
          </DropdownSelect>
          <DropDownMenu2 isDropped={myPageIsOpen}>
            <Ul>
              <li>
              <LinkWrapper href="#1-1">My Page</LinkWrapper>
              </li>
              <li>
              <LinkWrapper href="#1-2">Log Out</LinkWrapper>
              </li>
            </Ul>
          </DropDownMenu2>
        </DropdownContainer>
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
  cursor: pointer;
`
const SpanStyle = styled.span`
 font-weight: 400;
 margin-left: 7px;
`
const DropdownSelect = styled.div`
  display: flex;
  gap: 6px;
  cursor: pointer;
`
const DropDownMenu = styled.div`
  background-color: ${colors.black_100};
  position: absolute;
  top: 69px;
  left: 50%;
  width: 258px;
  height: 235px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;
  border-radius: 0px 0px 10px 10px;

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`
const DropDownMenu2 = styled.div`
  background-color: ${colors.black_100};
  position: absolute;
  top: 69px;
  left: 50%;
  width: 258px;
  height: 122px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;
  border-radius: 0px 0px 10px 10px;

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`
const LinkWrapper = styled.a`
  font-weight: 500;
  font-size: 18.4932px;
  line-height: 27px;
  letter-spacing: 0.05em;
  text-decoration: none;
  color: white;
`;
const Ul = styled.ul`
  & > li {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const DropdownContainer = styled.div`
  position: relative;
  text-align: center;
`;