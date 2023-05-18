import styled from "styled-components";
import colors from '../../style/color';

export const NavLayout = styled.div`
    width: 100%;
    height: 104px;
    background-color: ${colors.black_100};
    display: flex;
    justify-content: space-around;
`
export const NavLayout2 = styled.div`
    width: 100%;
    height: 104px;
    background-color: ${colors.black_100};
    display: flex;
`

export const Logos = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`

export const LoginButton = styled.button`
    width: 67px;
    height: 32px;

    text-align: center;

    background-color: ${colors.white_100};
    border-radius: 34px;

    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0.05em;
    border: none;

    cursor: pointer;
`

export const SignUpButton = styled.button`
    width: 67px;
    height: 32px;

    text-align: center;

    background-color: ${colors.black_100};
    color: ${colors.white_100};
    border-radius: 34px;

    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0.05em;
    border: none;

    cursor: pointer;
`

export const SignButtonLayout = styled.div`
    gap: 24px;
    display: flex;

    justify-content: center;
    align-items: center;
`
export const SearchNickLayout = styled.div`
    gap: 34px;
    display: flex;

    justify-content: center;
    align-items: center;
`