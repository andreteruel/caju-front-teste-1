import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { formatDocument, validCPF } from "~/utils/validade";
import { useState } from "react";
import useToast from "~/hooks/useToast";

type seachBarProps = {
  loadRegistrations: () => void;
  setSearchCpf: (doc:string) => void;
}

export const SearchBar = ({loadRegistrations, setSearchCpf}:seachBarProps) => {
  const toast = useToast();
  const history = useHistory();
  const [cpf, setCpf ] = useState('');

  const searchCpf = (doc: string) => {
    const newDoc = formatDocument(doc);
    setCpf(newDoc)
    if(newDoc.length >= 11){
      const cpfValid = validCPF(doc);
      if(cpfValid && cpfValid != ''){
        toast.displayToast(cpfValid, 'warning');
        return;
      }
      setSearchCpf(newDoc);
    }else{
      setSearchCpf('');
    }
  }

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };
  
  return (
    <S.Container>
      <TextField  placeholder="Digite um CPF válido" maxLength={11}  value={cpf} onChange={(e) => searchCpf(e.target.value)} />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={()=> loadRegistrations()}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
