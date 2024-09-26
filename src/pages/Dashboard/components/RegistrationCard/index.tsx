import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Registration } from "~/services/registrations";

type Props = {
  data: Registration;
  openModal: (register: Registration, mensagem: string, status:string) => void;
  openModalDelete: (id:string) => void;
};

const RegistrationCard = (props: Props) => {
  return (
        <S.Card>
          <S.IconAndText>
            <HiOutlineUser />
            <h3>{props.data.employeeName}</h3>
          </S.IconAndText>
          <S.IconAndText>
            <HiOutlineMail />
            <p>{props.data.email}</p>
          </S.IconAndText>
          <S.IconAndText>
            <HiOutlineCalendar />
            <span>{props.data.admissionDate}</span>
          </S.IconAndText>
          <S.Actions>
            {
              props.data.status === "REVIEW" ?
                <>
                  <ButtonSmall bgcolor="rgb(255, 145, 154)" onClick={()=>props.openModal(props.data, 'Deseja reprovar o card?', 'REPROVED')} >Reprovar</ButtonSmall>
                  <ButtonSmall bgcolor="rgb(155, 229, 155)" onClick={()=>props.openModal(props.data, 'Deseja aprovar o card?', 'APROVED')}>Aprovar</ButtonSmall>
                </>
                :
                <ButtonSmall bgcolor="#ff8858" onClick={()=>props.openModal(props.data, 'Deseja revisar novamente o card?', 'REVIEW')}>Revisar novamente</ButtonSmall>
            }
            <HiOutlineTrash data-testid="trash-icon" onClick={()=>props.openModalDelete(props.data.id)} />
          </S.Actions>
        </S.Card>
  );
};

export default RegistrationCard;
