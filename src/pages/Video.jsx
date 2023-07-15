import React from 'react'
import { TranscriptEditor } from '@bbc/react-transcript-editor';
import { useState, useRef, useEffect } from 'react';
import Nav from '../components/nav/Nav';
import { styled } from 'styled-components';
import '../style/video.css';
import colors from '../style/color';
import LevelTag from '../components/toggle/tag/LevelTag';
import Tag from '../components/toggle/tag/tag';
import Bookmarkoff from '../assets/svg/bookmark/bookmarkoff.svg';
import Bookmarkon from '../assets/svg/bookmark/bookmarkon.svg';
import QImg from '../assets/svg/Q.svg';
import { useRecoilState } from 'recoil';
import { AnsweredState, QuestionState, ScrabedState } from '../recoil/QuestionState';
import { UserState } from '../recoil/userState';
import axios from 'axios';
import Footer from '../components/footer/Footer';

function Video() {
    const [data, setData] = useState({});
    const transcriptEditorRef = useRef();
    const [questions, setQuestions] = useRecoilState(QuestionState);
    const [isAnswer, setIsAnswer] = useRecoilState(AnsweredState);
    const [isScrab, setIsScrab] = useRecoilState(ScrabedState);
    const [user, setUser] = useRecoilState(UserState);
    const [dummy, setIsdummy] = useState([]);

    // useEffect(() => {
    //     axios
    //     .get('http://15.165.104.225/answer/replay/dummy', {})
    //     .then((res) => {
    //         setIsdummy(res.data.data);
    //     })
    // })
    const answeredQuestion = questions.filter((item) => item.questionId === isAnswer);

    const shouldSendHeader = !!user;
  
    const axiosConfig = {
        headers: shouldSendHeader ? { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } : {},
      };

    const handleScrab = (questionId) => {
        axios.put(`http://15.165.104.225/question/bookmark/${questionId}`, null, axiosConfig)
        .then((res) => {
            console.log(res.data);
            setIsScrab((prevScrab) => ({ ...prevScrab, [questionId]: true }));
        })
    }
  
    const handleUnScrab = (questionId) => {
      axios.put(`http://15.165.104.225/question/unbookmark/${questionId}`, null, axiosConfig)
      .then((res) => {
          console.log(res.data);
          setIsScrab((prevScrab) => ({ ...prevScrab, [questionId]: false }));
      })
  }

    const json = {
        "action": "audio-transcribe",
        "retval": {
            "status": true,
            "wonid": "octo:2692ea33-d595-41d8-bfd5-aa7f2d2f89ee",
            "punct": "There is a day. About ten years ago when I asked a friend to hold a baby dinosaur robot upside down. It was a toy called plea. All that he'd ordered and I was really excited about it because I've always loved about this one has really caught technical features. It had more orders and touch sensors. It had an infra red camera and one of the things that had was a tilt sensor so it. Knew what direction. It was facing. If and when you held it upside down. I thought. It's a super courts are showing off to my friend and I said to hold it, but he'll see what debts. We were watching the theatrics of this robe that struggle and cry out and and after a few seconds. The first. After my little and I said o.k. That's enough. Now, let's put him back down and pepper, about to make it. Stop crying and I was kind of a weird experience for me one thing, wasn't the most maternal person at the time. Although, since then I've become a mother and nine months ago. And that is a score when hold them up to now, but my response to this robot was also interesting because I knew exactly how this machine work it. And yet. I still felt compelled to be kind to it. And that observation sparked that curiosity that I spent the fat, the past decade pursuing it. Why did they comfort this robe. One of the things I discovered was that my treatment of this machine was more than just an awkward moment in my living room that in a world were increasingly integrating robots into our lives and things like that might actually have consequences because the first thing that I discovered is that. It's not just me in two thousand seven. The Washington Post reported that the United States military was testing this robot diffused landmines. We workers were shaped like a stick insect would walk around a minefield on its legs and every time he stepped on a mine. One of the legs would blow up would continue on the other legs to block your minds in the colonel was in charge of this testing exercise for calling it off because he says it's too inhumane to watch this damage robot drag itself along the minefield. What would cause a hardened military officer and someone like myself to have this response to row. But what. Of course for prime for science fiction, pop culture really want to personify these things, but it goes a little bit deeper than that it turns out that we are biologically hard wired to project intent and life onto any movement in a physical space. It seems I promised us some people treat all sort of robots like their life. These bomb disposal units get names. They get medals of honour had funeral for them with gun salutes. Research shows that we do this. Even with very simple household robots like the room. A vacuum cleaner. Just a desk that runs around the floor and clean it just the fact that it's moving around on his own will cause people to name the marimba and feel bad for the room. But when he gets stuck under the couch. We can design about specifically to invoke this response using eyes and faces were movement. People are magically subconsciously associate with state of mind. There's an entire body of research called Human robot interaction that really shows how all this works so. For example. Researchers at Stamford University found out that makes people really uncomfortable and asked them to touch her about his private parts from this from any other studies. We know. We know that people respond to the cues given to them by the lifelike machines. Even if they know that they're not real. We're heading towards a world where robots are everywhere about the technology is moving out from behind factory was entering workplaces households and as these machines. They can sense and make a ton of my decisions and learn enter into the shared spaces. I think that maybe the best analogy. We have for this is our relationship with animals. Thousands of years ago, we started to domesticate animals and we train them for work and weaponry and companionship. Throughout history. We've treated. Some animals like tools are the products and other animals. We treated with kindness and given a place in society as our companions. I think it's possible. We might start to integrate Robartes, but similar weights animals are alive. Robert and that. And I can tell you from working. What about the sister were pretty far away from developing robots. They can feel anything there, but we feel for that. And that matters because if we're trying to integrate robots into the shared spaces need to understand that people treat them differently than other devices that in some cases. For example, the case of a soldier who becomes emotionally attached to the robot. They work. Well, if that can be anything from inefficient to dangerous. But in other cases. It can actually be used for the faster this emotional connection to, but we're really seeing some great use cases. For example, robots working with autistic children to engage them in ways that we haven't seen previously robot's working with teachers to engage kids and learning with new results and it's not just for kids early studies show that we can help doctors and patients and health care settings and this is the pirate b. b. c. But it's used in nursing homes with dementia patients has been around for a while I remember years ago. Being a party and telling someone about this throwback and her response was on my cart. I can't believe we're giving people robots instead of human care. And this is a really common response and I think it's absolutely correct because that would be terrible. And in this case. It's not with this robot replace it with this robot replaces his animal therapy in context which he was real animals. We can use robots because people consistently treat them like more. More like an animal and have it acknowledging this emotional connection. Robert, can also help us anticipate challenges as these devices. Move into more intimate areas of people's lives and for example is it. o.k. If your child's teddy bear robot records private conversations. Is it. o.k. If your sex robot has compelling in our purchasers because rope. That's plus capitalism equals questions around consumer protection and privacy and those aren't the only reason, said her behaviour around these machines could, madam. A few years after that first initial experience. I had with this baby dinosaur robot do workshop with her friend Hannah Scott. Scott, then we took five of these baby dinosaur about we give them. The five teams of people. We had the name them and play with them and interact with them for about an hour. Then we unveiled a him or a hatchet and we told them to torture and kill the row and then this turned out to be a little more dramatic than we expected it to be because none of the participants wouldn't even so much as straight. A robot. So we had to improvise. End at some point. He said o.k. You can save your team's robot. If you destroy another team throw. I I. And anyone that didn't work. They couldn't do it. So finally said, We're gonna destroy all the robots are someone takes a hatchet to one of them. This guy stood up and he took the hatchet and the whole room, Winston. See brother had to down on the robot's neck and there was this half joking. Half serious moment of silence in the room from this farm and but so that was a really interesting experience. It wasn't a controlled study up your sleeve, but it did lead to some leader research that I did. i. t. With plush, London. Cynthia busy. Or we had people come into the lab and smash these Hex bugs that move around in a really lifelike way, like insects. So instead of choosing something huge. People are trying to reach for something more basic. And what we found was that high embassy people would hesitate, more hit the heck's bucks. This is just a little study, but it's part of a large body of research that is starting to indicate that there may be a connection between people's tendencies for empathy and their behaviour around, Rover. But my question for the coming era of human robot interaction is not to. We empathise with throw, but it. Can robots change people's thinking, Is there reason to. For example, prevent the child from kicking about Doc That just out of respect for property because the child may be more likely to take a real dark and again. It's not just kids and this is the violent video games question, but it's a completely new level because of this visceral physicality that we respond more intensely. Two images on a screen, we behave violently towards Robarts specifically robots that are designed to mimic life is that a healthy outlook from the behaviour or is that training cruelty muscles. The answer to this question has the potential impact human behaviour has the potential impact social norms. It has the potential to inspire rules around. What we can and can't do certain Robarts animal cruelty, but because even if robots can't fuel our behaviour towards a matter for us and regardless of whether we end up changing ovals robots might be able to help us come to a new understanding of ourselves. Most of what learned over the past ten years have not been about technology. A It's been about human psychology and empathy and how we relate to others. And because when a child is kind to her room. But when a soldier tries to save a robot on the battlefield. When a group of people refuses to harm her about a baby dinosaur. Those robots aren't just motors in years and a groom's. Their reflections of our own humanity.",
            "words": [
                {
                    "start": 13.02,
                    "confidence": 0.68,
                    "end": 13.17,
                    "word": "there",
                    "punct": "There",
                    "index": 0
                },
                {
                    "start": 13.17,
                    "confidence": 0.61,
                    "end": 13.38,
                    "word": "is",
                    "punct": "is",
                    "index": 1
                },
                {
                    "start": 13.38,
                    "confidence": 0.99,
                    "end": 13.44,
                    "word": "a",
                    "punct": "a",
                    "index": 2
                },
                {
                    "start": 13.44,
                    "confidence": 1,
                    "end": 13.86,
                    "word": "day",
                    "punct": "day.",
                    "index": 3
                },
                {
                    "start": 13.86,
                    "confidence": 1,
                    "end": 14.13,
                    "word": "about",
                    "punct": "About",
                    "index": 4
                },
                {
                    "start": 14.13,
                    "confidence": 1,
                    "end": 14.38,
                    "word": "ten",
                    "punct": "ten",
                    "index": 5
                },
                {
                    "start": 14.38,
                    "confidence": 1,
                    "end": 14.61,
                    "word": "years",
                    "punct": "years",
                    "index": 6
                },
                {
                    "start": 14.61,
                    "confidence": 1,
                    "end": 15.15,
                    "word": "ago",
                    "punct": "ago",
                    "index": 7
                },
                {
                    "start": 15.47,
                    "confidence": 0.78,
                    "end": 15.59,
                    "word": "when",
                    "punct": "when",
                    "index": 8
                },
                {
                    "start": 15.68,
                    "confidence": 0.98,
                    "end": 15.84,
                    "word": "i",
                    "punct": "I",
                    "index": 9
                },
                {
                    "start": 15.86,
                    "confidence": 1,
                    "end": 16.19,
                    "word": "asked",
                    "punct": "asked",
                    "index": 10
                },
                {
                    "start": 16.19,
                    "confidence": 0.95,
                    "end": 16.28,
                    "word": "a",
                    "punct": "a",
                    "index": 11
                },
                {
                    "start": 16.28,
                    "confidence": 1,
                    "end": 16.65,
                    "word": "friend",
                    "punct": "friend",
                    "index": 12
                },
                {
                    "start": 16.65,
                    "confidence": 1,
                    "end": 16.74,
                    "word": "to",
                    "punct": "to",
                    "index": 13
                },
                {
                    "start": 16.74,
                    "confidence": 1,
                    "end": 17.2,
                    "word": "hold",
                    "punct": "hold",
                    "index": 14
                },
                {
                    "start": 17.23,
                    "confidence": 0.88,
                    "end": 17.33,
                    "word": "a",
                    "punct": "a",
                    "index": 15
                },
                {
                    "start": 17.33,
                    "confidence": 1,
                    "end": 17.63,
                    "word": "baby",
                    "punct": "baby",
                    "index": 16
                },
                {
                    "start": 17.63,
                    "confidence": 1,
                    "end": 18.14,
                    "word": "dinosaur",
                    "punct": "dinosaur",
                    "index": 17
                },
                {
                    "start": 18.14,
                    "confidence": 0.98,
                    "end": 18.59,
                    "word": "robot",
                    "punct": "robot",
                    "index": 18
                },
                {
                    "start": 18.72,
                    "confidence": 1,
                    "end": 19.17,
                    "word": "upside",
                    "punct": "upside",
                    "index": 19
                },
                {
                    "start": 19.17,
                    "confidence": 1,
                    "end": 19.58,
                    "word": "down",
                    "punct": "down.",
                    "index": 20
                },
                {
                    "start": 21.83,
                    "confidence": 0.61,
                    "end": 21.9,
                    "word": "it",
                    "punct": "It",
                    "index": 21
                },
                {
                    "start": 21.95,
                    "confidence": 0.95,
                    "end": 22.09,
                    "word": "was",
                    "punct": "was",
                    "index": 22
                },
                {
                    "start": 22.1,
                    "confidence": 0.38,
                    "end": 22.22,
                    "word": "a",
                    "punct": "a",
                    "index": 23
                },
            ]}}

    const customTheme = {
        primaryColor: 'blue',
        secondaryColor: 'gray',
        // 기타 스타일 관련 속성
        };
  return (
      <>
      <Nav/>
      <Container>
      <QuestionBox>
            <Header>
                <QuestionText>
                    <QImgStyle src={QImg} />
                    {answeredQuestion[0].content}
                </QuestionText>
            </Header>
        <Contents>
              <TagList>
              <LevelTag question={answeredQuestion[0]}/>
              <Tag question={answeredQuestion[0]}/>
              </TagList>
              <div style={{display:'flex', gap:'15px'}}>
              {isScrab[answeredQuestion[0].questionId] ?
                       <ScrapImg questionId={answeredQuestion[0].questionId} onClick={() => {handleUnScrab(answeredQuestion[0].questionId)}} src={Bookmarkon} alt="bookmark" />
                    :
                       <ScrapImg questionId={answeredQuestion[0].questionId} onClick={() => {handleScrab(answeredQuestion[0].questionId)}} src={Bookmarkoff} alt="bookmark" />
                    }
              </div>
          </Contents>
        </QuestionBox>
        <VideoInfo>Frontend | 2023.05.12 금요일 | 34분 23초</VideoInfo>
        <TranscriptEditor
        className="custom-transcript-editor"
        theme={customTheme}
        transcriptData={json}
        mediaUrl={dummy.url}
        sttJsonType={"bbckaldi"}
        // isEditable={true}
        />
      </Container>
      <Footer/>
      </>
  )
}

export default Video

const Container = styled.div`
    margin: 60px auto;
    width: 1100px;
    @media screen and (max-width: 1000px) {
        width: 768px;  
    }
`
const QuestionBox =  styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    background-color: ${props => (props.isClicked ? colors.lightBlue : colors.white_100)};
    box-shadow: 0px 0px 9.14454px rgba(0, 0, 0, 0.1);
    border-radius: 14.1556px;
    margin-top: 90px;
    margin-bottom: 33px;
`
const QuestionText = styled.div`
    display: flex;
    
    width: 1014px;
    height: fit-content;
    word-break:break-all;
    @media screen and (max-width: 1000px) {
        width: 700px;  
    }
`
const Header = styled.div`
    display: flex;
    height: fit-content;
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
    color: ${colors.black_100};
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 14px;
    cursor: pointer;
    @media screen and (max-width: 1000px) {
        width: 750px;  
    }
`
const QImgStyle = styled.img`
  width: 30px;
  height: 31px;
  margin-left: 30px;
  margin-right: 20px;
  padding-bottom: 10px;
`
const ScrapImg = styled.img`
    width: 46px;
    height: 46px;
    margin-right: 18px;
    margin-bottom: 16px;
    cursor: pointer;
`
const Contents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const TagList = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-left: 76px;
    margin-top: 12px;
    margin-bottom: 24px;
`
const VideoInfo = styled.div`
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: ${colors.black_70};
    margin-bottom: 12px;
`