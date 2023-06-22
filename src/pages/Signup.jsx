import React, {useState} from 'react'
import AnimationBar from '../components/animationBar'
import Nav from '../components/nav/Nav'
import SignUpImg from '../assets/svg/JOIN.svg'
import colors from '../style/color';
import { styled } from 'styled-components';
import Footer from '../components/footer/Footer';
import { useRecoilState } from 'recoil';
import { UserState } from '../recoil/userState';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
//   const [user, setUser] = useRecoilState(UserState);

  const navigate = useNavigate();

  const onAccount = (e) => {
    setAccount(e.target.value);
  }

  const onPassword = (e) => {
    setPassword(e.target.value);
  }

  const onHandleSubmit = (e) => {
    e.preventDefault();
    axios
        .post('http://15.165.104.225/signup', {
              account: account,
              password: password,
        })
        .then((res) => {
            console.log(res);
            if(res.data.status === 40106) {
                alert("이미 사용중인 계정입니다.");
            }
            if(res.data.status === 20100) {
                alert("회원가입 성공!");
                navigate("/login");
            }
        })
        .catch((err) => {
            console.log(err);
            alert("회원가입 실패");
        })
  }

  const Btndisabled = account && (password === passwordConfirm);

  return (
    <>
    <Nav />
    <FormStyle onSubmit={onHandleSubmit}>
      <JoinImg src={SignUpImg} alt='login' />
          <LoginEmailBoxLayout>
            <div>아이디</div>
              <PlaceholderStyle
                  placeholder='아이디를 입력해 주세요.'
                  type='text'
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
            <LoginPasswordBoxLayout>
                <div>비밀번호 확인</div>
                <PlaceholderStyle
                    placeholder='비밀번호 확인'
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => {
                        setPasswordConfirm(e.target.value);
                    }}
                />
            </LoginPasswordBoxLayout>
            <Button type='submit' disabled={Btndisabled ? false : true}>회원가입</Button>
            {/* <LoginButtonStyle type= "submit" disabled={btndisabled ? false : true}>로그인</LoginButtonStyle> */}
            <Footer />
    </FormStyle>
    </>
  )
}

export default Signup

const FormStyle = styled.form`
    margin: 0 auto;
    margin-top: 124px;
    align-items: center;
    display: flex;
    flex-direction: column;
`
const JoinImg = styled.img`
    margin: 0 auto;

    width: 113px;
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
  margin-bottom: 116.45px;

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