import React, {useCallback, useRef, useState} from 'react'
import { styled } from 'styled-components';
import colors from '../../style/color';
import data from '../../data/data';
import QImg from '../../assets/svg/Q.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Bookmarkoff from '../../assets/svg/bookmark/bookmarkoff.svg';
import Bookmarkon from '../../assets/svg/bookmark/bookmarkon.svg';
import Tag from '../toggle/tag/tag';

function QuestionBtn(props) {
    const parentRef = useRef(null);
    const childRef = useRef(null);

    const [isCollapse, setIsCollapse] = useState(false);
    const [visibleAll, setVisibleAll] = useState(false);

    const handleClick = useCallback(
        (event) => {
          setVisibleAll(!visibleAll);
          event.stopPropagation();
          if (parentRef.current === null || childRef.current === null) {
            return;
          }
          if (parentRef.current.clientHeight > 0) {
            parentRef.current.style.height = "0";
            parentRef.current.style.background = "white";
          } else {
            parentRef.current.style.height = `${childRef.current.clientHeight}px`;
            parentRef.current.style.background = "#F5F5F7";
          }
          setIsCollapse(!isCollapse);
        },
        [isCollapse]
      );

      const parentRefHeight = parentRef.current?.style.height ?? "0px";

  return (
    <Container>
        <Header onClick={handleClick}>
            {visibleAll ?
                <div style={{display:"flex", width:"1014px", height:"fit-content",}}>
                <QImgStyle src={QImg} />
                    <div style={{}}>
                        {data[0].questions[0].question}
                    </div>
                </div>
            :
                <div style={{display:"flex", width:"1014px"}}>
                <QImgStyle src={QImg} />
                    <div style={{display:"block", textOverflow:"ellipsis", overflow:"hidden", whiteSpace:"nowrap"}}>
                        {data[0].questions[0].question}
                    </div>
                </div>
            }
            <FontAwesomeIcon icon={faAngleDown} style={{marginRight:"26px", color:"#89898A", marginBottom:"6px"}}/>
        </Header>
        <ContentsWrapper ref={parentRef}>
            <Contents ref={childRef}>
                {props.contents}
                <TagList>
                    <Tag />
                </TagList>
                <ScrapImg src={Bookmarkoff} alt="bookmark" />
            </Contents>
        </ContentsWrapper>
    </Container>
  )
}

export default QuestionBtn

const Container = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    background-color: ${colors.white_100};
    box-shadow: 0px 0px 9.14454px rgba(0, 0, 0, 0.1);
    border-radius: 14.1556px;
    margin-top: 20px;
`
const Header = styled.div`
    display: flex;
    align-items: center;
    height: fit-content;
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
    color: ${colors.black_100};
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 14px;
    cursor: pointer;
`
const ScrapImg = styled.img`
    width: 46px;
    height: 46px;
    margin-right: 10px;
    margin-bottom: 16px;
`
const QImgStyle = styled.img`
  width: 30px;
  height: 31px;
  margin-left: 30px;
  margin-right: 15.4px;
  padding-bottom: 10px;

`
const ContentsWrapper = styled.div`
    height: 0;
    width: 100%;
    overflow: hidden;
    transition: height 0.1s ease;
`
const Contents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.1px;
  height: fit-content;
  border-radius: 0 0 14.1556px 14.1556px;
  background-color: ${colors.white_100};
  box-shadow: 0px 0px 9.14454px rgba(0, 0, 0, 0.1);
`
const TagList = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-left: 76px;
    margin-top: 12px;
    margin-bottom: 24px;
`