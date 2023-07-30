import styled from "styled-components";

export const SearchBoxStyle = styled.div`
    margin-top: 8px;
    height: 40px;
    position: relative;
    
    display: flex;
    align-items: center;
    flex-direction: row-reverse;

`

export const StyleSearchBar = styled.input`
    width: 340px;
    height: 40px;

    background: #F5F5F7;
    border-radius: 42px;
    border: none;
    padding-left: 22px;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.05em;
    outline: none;
    &:focus::placeholder {
        color: transparent;
        border: none;
    }

    box-sizing: border-box;

    input::-webkit-search-decoration,
    input::-webkit-search-cancel-button,
    input::-webkit-search-results-button,
    input::-webkit-search-results-decoration{
        -webkit-appearance: none;
    }

   input.hide-clear[type=search]::-ms-clear, input.hide-clear[type=search]::-ms-reveal {
   display:none; 
}
`

export const MagnifierImg = styled.img`
    margin-right: 19px;
    width: 22px;
    height: 22px;
    position: absolute;
`