import React, {useState} from 'react'
import { styled } from 'styled-components';
import colors from '../../style/color';

function QuestionToggle() {
    const [selectSort, setSelectSort] = useState(true);

    const toggledHandler = () => {
        setSelectSort((prev) => !prev);
    }
    return (
        <BtnWrapper>
            <CheckBox type="checkbox" id="toggleBtn" onChange={toggledHandler} />
            <ButtonLabel htmlFor="toggleBtn" selectSort={selectSort} />
        </BtnWrapper>
    )
}

export default QuestionToggle

const BtnWrapper = styled.div`
    display: flex;
    z-index: 0;
    margin-top: 54.38px;
    margin-bottom: 50px;
`
const CheckBox = styled.input`
    display: none;
`
const ButtonLabel = styled.label`
    z-index: 0;
    width: 168px;
    height: 36px;
    background-color: ${colors.white_100};
    box-shadow: 0px 0px 9.14454px rgba(0, 0, 0, 0.1);
    border-radius: 4.24669px;

    &::before {
        display: flex;
        position: absolute;
        content: '선택 면접';
        padding-left: 1rem;
        justify-content: flex-start;
        align-items: center;
        width: 84px;
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
        content: '랜덤 면접';
        padding-top: 2px;
        width: 84px;
        height: 34px;
        justify-content: center;
        align-items: center;
        left: 5.12rem;
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
                content: "랜덤 면접";
                justify-content: center;
                padding-left: 5.3rem;
            };
            &::after {
                content: "선택 면접";
                width: 86px;
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