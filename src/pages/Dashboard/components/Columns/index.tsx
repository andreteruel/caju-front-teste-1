
import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { deleteRegistrationById, Registration, updateRegistrationById } from "~/services/registrations";
import useToast from "~/hooks/useToast";
import { allColumns } from "~/utils/const";
import { useState } from "react";
import { ModalConfirm } from "~/components/ModalConfirm";

type Props = {
  registrations?: Registration[];
  loadRegistrations: () => void;
  setLoading: (load:boolean) => void;
};
const Collumns = (props: Props) => {
  const toast = useToast();
  const [openedModal, setOpenedModal] = useState(false);
  const [openedModalDelete, setOpenedModalDelete] = useState(false);
  const [mensage, setMensage ] = useState('');
  const [statusSelected, setStatusSelected ] = useState('');
  const [idSelected, setIdSelected ] = useState('');
  const [registerSelected, setRegisterSelected ] = useState<Registration>({} as Registration);
  
  const openModal = (register: Registration, mensagem: string, status:string) =>{
    setMensage(mensagem);
    setStatusSelected(status);
    setRegisterSelected(register);
    setIdSelected(register.id);
    setOpenedModal(true)
  }
  const openModalDelete = (id:string) =>{
    setIdSelected(id);
    setOpenedModalDelete(true)
  }

  const alterStatus = async () => {
    props.setLoading(true);
    const register : Registration = {
      ...registerSelected,
      status: statusSelected
    }
    const response = await updateRegistrationById(idSelected, register);
    if(response){
      toast.displayToast(`Seu card está ${allColumns.find(col => col.status === status)?.title}`, 'success');
    }
    setOpenedModal(false);
    props.loadRegistrations();
  }

  const deleteResgister = async () =>{
    props.setLoading(true);
    const response = await deleteRegistrationById(idSelected);
    if(response){
      toast.displayToast('Card deletado com sucesso.', 'success');
    }
    setOpenedModalDelete(false);
    props.loadRegistrations();
  }
  return (
    <>
      {openedModal && <ModalConfirm mensagem={mensage} closeModal={() => setOpenedModal(false)} confirmModal={alterStatus}/>}
      {openedModalDelete && <ModalConfirm mensagem='Deseja deletar esse registro permanentemente?' closeModal={() => setOpenedModalDelete(false)} confirmModal={deleteResgister}/>}
      <S.Container>
        {allColumns.map((collum) => {
          return (
            <S.Column status={collum.status} key={collum.title}>
              <>
                <S.TitleColumn status={collum.status}>
                  {collum.title}
                </S.TitleColumn>
                <S.CollumContent>
                  {props?.registrations?.map((registration) => {
                    if(registration.status !== collum.status){
                      return;
                    }
                    return (
                      <RegistrationCard
                        data={registration}
                        key={registration.id}
                        openModal={openModal}
                        openModalDelete={openModalDelete} 
                      />
                    );
                  })}
                </S.CollumContent>
              </>
            </S.Column>
          );
        })}
      </S.Container>
    </>
  );
};
export default Collumns;
