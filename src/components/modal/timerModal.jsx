import { useRef } from 'react';
import styled from 'styled-components';
import colors from '../../style/color';

const TimerModal = ({ dateFormat, closeModal, children }) => {

    const outside = useRef();

    return (
        <Background>
                {/* <ModalCloseButton onClick={() => closeModal(false)} /> */}
                {children}
                {/* <ModalButton onClick={() => closeModal(true)}>닫기</ModalButton> */}
        </Background>
    );
};

export default TimerModal;

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(245, 245, 247, 0.7);
    z-index: 1;
`;

const ModalLayout = styled.div`
    z-index: 999;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -100%);

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