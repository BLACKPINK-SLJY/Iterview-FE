import React, {useState} from 'react'
import { styled } from 'styled-components';
import colors from '../../style/color';

function MypageToggle(props) {
    const [mypageSort, setMypagetSort] = useState(true);

    const toggledHandler = () => {
        setMypagetSort((prev) => !prev);
    }
    const sendIsChoose = () => {
        props.getMySol(!mypageSort);
    }
    return (
        <BtnWrapper>
            <CheckBox type="checkbox" id="toggleBtn" onChange={toggledHandler} />
            <ButtonLabel htmlFor="toggleBtn" selectSort={mypageSort} onClick={sendIsChoose} />
        </BtnWrapper>
    )
}

export default MypageToggle

const BtnWrapper = styled.div`
    display: flex;
    z-index: 0;
    margin-top: 54.38px;
`
const CheckBox = styled.input`
    display: none;
`
const ButtonLabel = styled.label`
    z-index: 0;
    width: 220px;
    height: 36px;
    background-color: ${colors.white_100};
    box-shadow: 0px 0px 9.14454px rgba(0, 0, 0, 0.1);
    border-radius: 4.24669px;

    &::before {
        display: flex;
        position: absolute;
        content: '내가 푼 문제';
        padding-left: 1.3rem;
        justify-content: flex-start;
        align-items: center;
        width: 108px;
        height: 2.3rem;
        color: ${colors.black_90};
        font-weight: 700;
        font-size: 14.4755px;
        line-height: 200.2%;
        /* transition: all 0.2s ease-in-out; */
        border-radius: 4.24669px;
    }
    &::after {
        display: flex;
        position: relative;
        content: '북마크';
        padding-top: 2px;
        width: 110px;
        height: 34px;
        justify-content: center;
        align-items: center;
        left: 6.9rem;
        background-color: ${colors.black_90};
        color: ${colors.white_100};
        font-weight: 700;
        font-size: 14.4755px;
        line-height: 200.2%;
        transition: all 0.2s ease-in-out;
        border-radius: 4.24669px;
    }
    ${(props) => 
        props.selectSort &&
        `
            &::before {
                content: "북마크";
                justify-content: center;
                padding-left: 6.9rem;
            };
            &::after {
                content: "내가 푼 문제";
                width: 110px;
                height: 34px;
                left: 0rem;
                padding-top: 2px;
                background-color: ${colors.black_90};
                color: ${colors.white_100};
                border-radius: 4.24669px;
            }
        `
    }
`