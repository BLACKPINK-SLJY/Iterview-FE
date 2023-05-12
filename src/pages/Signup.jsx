import React, {useState} from 'react'
import AnimationBar from '../components/animationBar'
import Nav from '../components/nav/Nav'
import SignUpImg from '../assets/svg/JOIN.svg'
import colors from '../style/color';
import { styled } from 'styled-components';
import Footer from '../components/footer/Footer';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState('');
  // const [user, setUser] = useRecoilState(userState);

  const Btndisabled = username && email && (password === passwordConfirm);

  return (
    <>
    <Nav />
    <AnimationBar />
    <FormStyle>
      <JoinImg src={SignUpImg} alt='login' />
          <LoginEmailBoxLayout>
            <div>닉네임</div>
              <PlaceholderStyle
                  placeholder='잇터뷰이'
                  type='text'
                  value={username}
                  onChange={(e) => {
                      setUsername(e.target.value);
                  }}
              />
          </LoginEmailBoxLayout>
          <LoginPasswordBoxLayout>
                <div>이메일</div>
                <PlaceholderStyle
                    placeholder='example@example.com'
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </LoginPasswordBoxLayout>
            <LoginPasswordBoxLayout>
                <div>비밀번호</div>
                <PlaceholderStyle
                    placeholder='••••••••'
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </LoginPasswordBoxLayout>
            <LoginPasswordBoxLayout>
                <div>비밀번호 확인</div>
                <PlaceholderStyle
                    placeholder='••••••••'
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