import React from 'react'
import { Logos, NavLayout, SignButtonLayout, SignUpButton, LoginButton } from './style'
import Logo from "../../assets/svg/Logo.svg"
import Logo2 from "../../assets/svg/Logo_2.svg"
import { useNavigate } from 'react-router-dom';

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
        </Logos>
        <SignButtonLayout>
            <SignUpButton onClick={onClickSignup}>회원가입</SignUpButton>
            <LoginButton onClick={onClickLogin}>로그인</LoginButton>
        </SignButtonLayout>
    </NavLayout>
    </>
  )
}

export default Nav

