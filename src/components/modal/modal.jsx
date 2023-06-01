import { ModalLayout, Background, ModalButton, ModalCloseButton } from "./styles";
import { useRef } from 'react';
import styled from 'styled-components';

const Modal = ({ dateFormat, closeModal, children }) => {

    const outside = useRef();

    return (
        <Background>
            <ModalLayout>
                {/* <ModalCloseButton onClick={() => closeModal(false)} /> */}
                {children}
                {/* <ModalButton onClick={() => closeModal(true)}>닫기</ModalButton> */}
            </ModalLayout>
        </Background>
    );
};

export default Modal;