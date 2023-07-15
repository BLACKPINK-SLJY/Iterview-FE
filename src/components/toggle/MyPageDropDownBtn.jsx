import React, {useState} from 'react'
import { styled, css } from 'styled-components';
import colors from '../../style/color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import useDetectClose from '../nav/useDetectClose';

function DropDownBtn({handleDropDown}) {
    const [selectIsOpen, selectRef, selectHandler] = useDetectClose(false)
    const [selectedText, setSelectedText] = useState("최신 순");

    const handleLi = (selectedValue) => {
      handleDropDown(selectedValue);
      setSelectedText(selectedValue);
    }

  return (
    <>
        <DropdownContainer>
            <DropDownSelect onClick={selectHandler} ref={selectRef}>
                <div style={{paddingTop:"3px"}}>{selectedText}</div>
                <FontAwesomeIcon icon={faAngleDown} style={{paddingTop:"10px"}}/>
            </DropDownSelect>
            <DropDownMenu isDropped={selectIsOpen}>
                <Ul>
                    <li onClick={() => handleLi("최신 순")} style={{cursor:'pointer'}}>
                        <LinkWrapper>최신 순</LinkWrapper>
                    </li>
                    <li onClick={() => handleLi("난이도 낮은 순")} style={{cursor:'pointer'}}>
                        <LinkWrapper>난이도 낮은 순</LinkWrapper>
                    </li>
                    <li onClick={() => handleLi("난이도 높은 순")} style={{cursor:'pointer'}}>
                        <LinkWrapper>난이도 높은 순</LinkWrapper>
                    </li>
                    <li onClick={() => handleLi("인기 순")} style={{cursor:'pointer'}}>
                        <LinkWrapper>인기 순</LinkWrapper>
                    </li>
                </Ul>
            </DropDownMenu>
        </DropdownContainer>
    </>
  )
}

export default DropDownBtn

const DropdownContainer = styled.div`
  position: relative;
  text-align: center;
  display: inline-block;
`
const DropDownSelect = styled.div`
    width: 130px;
    height: 36px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    gap: 6px;
    font-weight: 700;
    font-size: 15px;
    line-height: 200.2%;
    justify-content: space-between;
    cursor: pointer;

    background-color: ${colors.white_100};
    border-radius: 4.24669px;
    filter: drop-shadow(0px 0px 9.14454px rgba(0, 0, 0, 0.1));
`
const DropDownMenu = styled.div`
  background-color: ${colors.white_100};
  position: absolute;
  top: 60px;
  left: 50%;
  width: 130px;
  height: 152px;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;
  border-radius: 4.24669px;
  box-shadow: 0px 0px 9.14454px rgba(0, 0, 0, 0.1);

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      left: 50%;
    `};
`
const Ul = styled.ul`
  & > li:first-child{
    padding-top: 4px;
  }
  & > li {
    padding-top: 4px;
    padding-bottom: 4px;
    width: 130px;
  }
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  :hover {
      background-color: #EDF0FF;
  }
`;
const LinkWrapper = styled.a`
    font-weight: 700;
    font-size: 15px;
    line-height: 200.2%;
    letter-spacing: 0.05em;
    text-decoration: none;
    color: ${colors.black_80};
`;