import styled from "styled-components";

export const ModalLayout = styled.div`
    z-index: 999;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    /* max-height: 50%; */
    width: 750px;
    height: fit-content;
    background: white;
    border-radius: 5px;
    text-align: center;

    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 12.92px rgba(0, 0, 0, 0.1);
    border-radius: 20px;

    font-weight: 400;
    font-size: 15px;
    line-height: 22px;

    h1 {
        margin-top: 30px;
        margin-bottom: 28px;
        font-weight: 700;
        font-size: 20px;
        line-height: 29px;
    }
`;

export const ModalCloseButton = styled.div`
    position: fixed;
    top: 10px;
    right: 10px;
    width: 1.2rem;
    height: 1.2rem;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 1.2rem;
    &:active {
        background-color: white;
        filter: brightness(80%);
    }
`;

export const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(48, 49, 50, 0.4);
    z-index: 1;
`;
export const ModalButton = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 4rem;
    background-color: linear-gradient(135.86deg, #9E3DFF 0%, #3840FF 100%);
    border-radius: 0 0 12px 12px;
    color: white;
    text-align: center;
    font-weight: 500;
    font-size: 14px;

    line-height: 4rem;

    &:active {
        filter: brightness(80%);
    }
`;