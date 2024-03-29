import React, {useState} from 'react';
import AnimationBar from '../components/animationBar';
import Nav from '../components/nav/Nav';
import { styled } from 'styled-components';
import colors from '../style/color';
import LoginS from '../assets/svg/LOGIN.svg';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import { useRecoilState } from 'recoil';
import { UserState } from '../recoil/userState';
import axios from 'axios';
import { BaseUrl } from '../privateKey';


function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(UserState);

  const navigate = useNavigate();

  const onClickSignUp = () => {
    navigate('/signup');
  }

  const onAccount = (e) => {
    setAccount(e.target.value);
  }

  const onPassword = (e) => {
    setPassword(e.target.value);
  }

  const onHandleSubmit = (e) => {
    e.preventDefault();
    axios
        .post(`${BaseUrl}/login`, {
              account: account,
              password: password,
        })
        .then((res) => {
            console.log(res);
            setUser({
                account: res.data.data.account,
                accessToken : res.data.data.token.access_token,
                refreshToken : res.data.data.token.refresh_token,
            })
            localStorage.setItem('accessToken', res.data.data.token.access_token);
            localStorage.setItem('refreshToken', res.data.data.token.refresh_token);
            navigate('/');
        })
        .catch((err) => {
          console.log(err);
          alert('사용자를 찾을 수 없습니다.');
        })
  }

  const btndisabled = account && password;

  return (
    <>
    <Nav />
    <FormStyle onSubmit={onHandleSubmit}>
      <LoginImg src={LoginS} alt='login' />
      <LoginEmailBoxLayout>
                <div>아이디</div>
                <PlaceholderStyle
                    placeholder='아이디를 입력해 주세요.'
                    type="text"
                    value={account}
                    onChange={onAccount}
                />
            </LoginEmailBoxLayout>
            <LoginPasswordBoxLayout>
                <div>비밀번호</div>
                <PlaceholderStyle
                    placeholder='비밀번호를 입력해 주세요.'
                    type="password"
                    value={password}
                    onChange={onPassword}
                />
            </LoginPasswordBoxLayout>
            <Button type='submit' disabled={btndisabled ? false : true}>로그인</Button>
            <Yetdiv>아직 회원이 아니신가요?<SpanStyle onClick={onClickSignUp}>회원가입</SpanStyle></Yetdiv>
            <Footer />
    </FormStyle>
    </>
  )
}

export default Login

const FormStyle = styled.form`
    margin: 0 auto;
    margin-top: 124px;
    align-items: center;
    display: flex;
    flex-direction: column;
`
const LoginImg = styled.img`
    margin: 0 auto;

    width: 149px;
    height: 52px;
`
const LoginEmailBoxLayout = styled.div`
    padding-top: 93px;
    margin: 0 auto;
`
const LoginPasswordBoxLayout = styled.div`
    padding-top: 30px;
    margin: 0 auto;
`
const PlaceholderStyle = styled.input`
    width: 435px;
    height: 65px;
    margin-top: 10px;
    
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    border: 1px solid #C0C0C0;
    border-radius: 10px;
    padding-left: 25px;
    background-color: ${colors.bgColor};

    &::placeholder {
        color: ${colors.black_20};
    }

    &:focus::placeholder {
        color: transparent;
    }

    &:focus {
      border: 2px solid ${colors.black_100};
    }
`
const Button = styled.button`
  width: 182.52px;
  height: 61.55px;
  z-index: 1;
  margin-top: 84px;

  background: ${colors.white_100};
  box-shadow: 0px 0px 12.9193px rgba(0, 0, 0, 0.1);
  border-radius: 76px;

  color: ${colors.black_100};
  font-weight: 600;
  font-size: 25.8385px;
  line-height: 35px;
  letter-spacing: 0.05em;
  transition: .3s;

  border: none;

  &:hover {
    transform: scale(1.1, 1.1);
  }

  &:disabled {
        cursor: not-allowed;
        color: ${colors.black_30};
    }

  &:active {
      filter: brightness(80%);;
  }

  cursor: pointer;
`
const Yetdiv = styled.div`
  margin-top: 52.45px;
  margin-bottom: 169px;
  font-weight: 500;
  font-size: 15.6279px;
  line-height: 23px;

  color: ${colors.black_50};
`
const SpanStyle = styled.span`
  margin-left: 6.83px;
  font-weight: 700;
  text-decoration-line: underline;
  color: ${colors.black_80};

  cursor: pointer;
`