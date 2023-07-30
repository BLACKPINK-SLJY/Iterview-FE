import React, {useState, useEffect} from 'react'
import Nav from '../components/nav/Nav'
import { styled } from 'styled-components';
import colors from '../style/color';
import QImg from '../assets/svg/Q.svg';
import Sound from '../assets/svg/sound.svg';
import Recorder from '../components/recorder/Recorder';
import Silence from '../assets/mp3/silence.mp3'
import Timerapp from '../components/timer/Timerapp';
import Footer from '../components/footer/Footer';
import Modal from '../components/modal/modal';
import Tag from '../components/toggle/tag/tag';
import SmallCheck from '../assets/svg/smallcheck.svg';
import { useRecoilState } from 'recoil';
import { AnsweredState, ClickedState, QuestionState } from '../recoil/QuestionState';
import Keywords from '../components/toggle/tag/Keywords';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../recoil/userState';
import { axios } from 'axios';
import Mp3 from '../assets/mp3/test.mp3';
import NotAccess from './NotAccess';

function Test() {
    const [selected, setSelected] = useRecoilState(ClickedState);
    const [questions, setQuestions] = useRecoilState(QuestionState);
    const [isSubmitModal, setIsSubmitModal] = useState(false);
    const [isCloseModal, setIsCloseModal] = useState(false);
    const [isNum, setIsNum] = useState(0);
    const [iscategory, setIsCategory] = useState(questions[0].category.toLowerCase());
    const [isDisabled, setIsDisabled] = useState(false);
    const [user, setUser] = useRecoilState(UserState);
    const [execute, setExecute] = useState(false);
    const [doneRecord, setDoneRecord] = useRecoilState(AnsweredState);
    const navigate = useNavigate();

    const clickedTest = questions.filter((item) => selected.includes(item.questionId)).map((item) => item);

    const [istitle, setIstitle] = useState(clickedTest.length > 0 ? clickedTest[isNum].content : "");
    const [isRandomTitle, setIsRandomTitle] = useState(questions[isNum].content);
    const [isquestionId, setIsquestionId] = useState(clickedTest.length > 0 ? clickedTest[isNum].questionId : 0);
    const [isRandomId, setIsRandomId] = useState(questions[isNum].questionId);
    const [isCount, setIsCount] = useState(isNum+1);

    const handleSubmitAnswer = () => {
        setIsSubmitModal(true);
        setExecute(true);
    };

    useEffect(() => {
        if(!doneRecord) {
            setIsDisabled(true);
        }
        else {
            setIsDisabled(false);
        }
    }, [isNum, doneRecord])

    const onClickNextModal = () => {
        setIsSubmitModal(false);
        setExecute(false);
        setIsNum((isNum) => isNum+1);
        if(selected.length > 0){
            setIstitle(clickedTest[isNum+1].content);
            setIsquestionId(clickedTest[isNum+1].questionId)
        }
        else {
            setIsRandomTitle(questions[isNum+1].content);
            setIsRandomId(questions[isNum+1].questionId);
        }
        setIsCount(isCount+1);
    }

    const onClickCloseModal = () => {
        setIsCloseModal(true);
    }

  return (
    <>
    {user ?
    <>
        <Nav />
        <Container>
            <QuestionBox>
                <Header>
                {selected.length > 0 ? 
                    <QuestionText>
                        <QImgStyle src={QImg} />
                            {istitle}
                    </QuestionText>
                    :
                    <QuestionText>
                        <QImgStyle src={QImg} />
                            {isRandomTitle}
                    </QuestionText>
                }
                </Header>
            </QuestionBox>
            {selected.length > 0 ?
                <Recorder execute={execute} isquestionId={isquestionId} isSubmitModal={isSubmitModal} isNum={isNum}/>
                :
                <Recorder execute={execute} isRandomId={isRandomId} isNum={isNum}/>
            }
            <EndSubmitLayout>
              <EndBtn onClick={onClickCloseModal}>종료하기</EndBtn>
              <TextStyle>{isCount}
                {selected.length > 0 ?
                            <TextStyle2> / {selected.length}</TextStyle2>
                            :
                            <TextStyle2> / {questions.length}</TextStyle2>
                }
              </TextStyle>
              <SubmitBtn onClick={handleSubmitAnswer} disabled={isDisabled}>제출하기</SubmitBtn>
            </EndSubmitLayout>
        </Container>
        <Footer />
        {isSubmitModal &&
            <Modal>
                <ModalContainer>
                    <QuestionContain>
                        <QImgStyle src={QImg} />
                        {selected.length > 0 ?
                            <div style={{textAlign:"left"}}>
                                {istitle}
                            </div>
                        :
                            <div style={{textAlign:"left"}}>
                                {isRandomTitle}
                            </div>
                        }
                    </QuestionContain>
                    <div style={{marginTop:"27px", fontStyle:"normal", fontSize:"20px", fontWeight:"500", color:"#787879"}}>모범 답변 키워드</div>
                    <TagContain>
                        {selected.length > 0 ?
                            <Keywords clickedTest={clickedTest[isNum]}/>
                            :
                            <Keywords clickedTest={questions[isNum]}/>
                        }
                    </TagContain>
                    { selected.length > 0 && isCount === selected.length ?
                    <>
                        <div style={{fontWeight: "500", fontSize: "20px", color: "#424344"}}>
                            모든 질문이 종료되었습니다. 답변을 확인하러 가시겠습니까?
                        </div>
                        <div style={{display: "flex", marginTop: "40px", justifyContent: "center", gap:"22px"}}>
                            <NoBtn onClick={() => navigate(`/question/${iscategory}`)}>아니요</NoBtn>
                            <ModalNextBtn onClick={() => navigate(`/mypage/${user.account}`)}>내 답변 확인하기</ModalNextBtn>
                        </div>
                    </>
                    : selected.length <= 0 && isCount === questions.length ?
                    <>
                        <div style={{fontWeight: "500", fontSize: "20px", color: "#424344"}}>
                            모든 질문이 종료되었습니다. 답변을 확인하러 가시겠습니까?
                        </div>
                        <div style={{display: "flex", marginTop: "40px", justifyContent: "center", gap:"22px"}}>
                            <NoBtn onClick={() => navigate(`/question/${iscategory}`)}>아니요</NoBtn>
                            <ModalNextBtn onClick={() => navigate(`/mypage/${user.account}`)}>내 답변 확인하기</ModalNextBtn>
                        </div>
                    </>
                    :
                    <>
                        <ModalNextBtn onClick={onClickNextModal}>다음 질문</ModalNextBtn>
                        <ModalCompleteText><Smallcheck src={SmallCheck} />답변이 제출되었습니다.</ModalCompleteText>
                    </>
                    }
                </ModalContainer>
            </Modal>}
            {isCloseModal && 
            <Modal>
                <ModalContainer>
                        <div style={{fontWeight: "500", fontSize: "20px", color: "#424344", paddingTop:"40px", paddingBottom:"40px"}}>
                            종료하기를 누르시면 면접이 종료됩니다. 정말로 면접을 나가시겠습니까?
                        </div>
                        <div style={{display: "flex", paddingBottom:"40px", justifyContent:"center", gap:"25px"}}>
                        <NoBtn onClick={() => setIsCloseModal(false)}>아니요</NoBtn>
                        <ModalNextBtn onClick={() => navigate(`/question/${iscategory}`)}>네</ModalNextBtn>
                        </div>
                </ModalContainer>
            </Modal>
            }
    </>
        :
    <>
    <Nav />
    <NotAccess/>
    </>
    }
    </>
  )
}

export default Test

const Container = styled.div`
    margin-top: 80px;
    margin: 0 auto;
    width: 1100px;
    height: 980px;
    @media screen and (max-width: 1000px) {
        width: 768px;  
    }
`
const QuestionBox =  styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    background-color: ${colors.white_100};
    box-shadow: 0px 0px 9.14454px rgba(0, 0, 0, 0.1);
    border-radius: 14.1556px;
    margin-top: 80px;
`
const QuestionText = styled.div`
    display: flex;
    justify-content: center;
    width: 1014px;
    height: fit-content;
    word-break:break-all;
    @media screen and (max-width: 1000px) {
        width: 700px;  
    }
`
const Header = styled.div`
    display: flex;
    align-items: center;
    height: fit-content;
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
    color: ${colors.black_100};
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 14px;
`
const QImgStyle = styled.img`
  width: 30px;
  height: 31px;
  margin-right: 15.4px;
`
const SpeakerStyle = styled.img`
  margin-left: 25px;
  width: 35px;
  height: 35px;
  cursor: pointer;
`
const EndSubmitLayout = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 33px;
  padding-left: 10px;
  padding-right: 10px;
`
const EndBtn = styled.button`
  width: 95.86px;
  height: 37.57px;
  border: 1.5px solid #FF6464;
  color: #FF6464;
  font-weight: 500;
  filter: drop-shadow(0px 0px 8.7223px rgba(0, 0, 0, 0.1));
  border-radius: 33.1447px;
  cursor: pointer;
`
const SubmitBtn = styled.button`
  width: 95.86px;
  height: 37.57px;
  background: linear-gradient(135.86deg, #9E3DFF 0%, #3840FF 100%);
  box-shadow: 0px 0px 8.7223px rgba(0, 0, 0, 0.1);
  border-radius: 33.1447px;
  border: none;
  color: white;
  cursor: pointer;
  &:disabled {
      cursor: not-allowed;
  }
`
const TextStyle = styled.div`
  display: flex;
  gap: 8px;
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 700;
  font-size: 23.7884px;
  line-height: 29px;
  color: #424344;
`
const TextStyle2 = styled.div`
  font-family: 'Gotham';
  font-style: normal;
  font-weight: 700;
  font-size: 23.7884px;
  line-height: 29px;
  color: ${colors.black_50};
`
const ModalContainer = styled.div`
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 32px;
    align-items: center;
    height: fit-content;
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
    color: ${colors.black_100};
    justify-content: center;
`
const QuestionContain = styled.div`
    display: flex;
    width: 550px;
    text-align: center;
    justify-content: center;
`
const ModalNextBtn = styled.button`
    background: linear-gradient(135.86deg, #9E3DFF 0%, #3840FF 100%);
    box-shadow: 0px 0px 8.7223px rgba(0, 0, 0, 0.1);
    border-radius: 33.1447px;
    padding-left: 30px;
    padding-right: 30px;
    width: fit-content;
    height: 44px;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: ${colors.white_100};
    border: none;
    margin-bottom: 16px;
    cursor: pointer;
`
const ModalCompleteText = styled.div`
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;

    color: #3840FF;
`
const Smallcheck = styled.img`
    width: 12px;
    height: 12px;
    margin-right: 6px;
`
const TagContain = styled.div`
    width: 550px;
    margin-top: 14px;
    margin-bottom: 42px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    row-gap: 16px;
    text-align: center;
    justify-content: center;
    line-height: 150px;
    align-content: center;
`
const NoBtn = styled.div`
    width: 100px;
    height: 44px;
    padding: 14px 20px 0px 20px;
    background: #666667;
    box-shadow: 0px 0px 8.7223px rgba(0, 0, 0, 0.1);
    border-radius: 33.1447px;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: ${colors.white_100};
    cursor: pointer;
`
