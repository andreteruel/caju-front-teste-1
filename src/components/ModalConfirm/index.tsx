import { ButtonModal } from "../Buttons";
import * as S from "./styled";
import { HiOutlineX } from "react-icons/hi";

type ModalProps ={
  mensagem: string;
  closeModal: () => void;
  confirmModal: () => void;
}

export const ModalConfirm = ({mensagem, closeModal, confirmModal}: ModalProps) => {
  return (
    <S.ContainerModal>
      <S.Modal>
        <S.CloseBox>
          <HiOutlineX style={{width:'30px', height:'30px'}} data-testeid="close-icon" onClick={() => closeModal()} />
        </S.CloseBox>
        <S.ContainerText><h3>{mensagem}</h3></S.ContainerText>
        <S.ContainerButtons>
          <ButtonModal bgcolor="rgb(255, 145, 154)" onClick={() => closeModal()} >Cancelar</ButtonModal>
          <ButtonModal bgcolor="rgb(155, 229, 155)" onClick={() => confirmModal()}>Confirmar</ButtonModal>
        </S.ContainerButtons>
      </S.Modal>
    </S.ContainerModal>
  );
} 