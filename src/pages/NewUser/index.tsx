import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { useEffect, useState } from "react";
import { formatDocument, validateUserForm } from "~/utils/validade";
import { validateUserProps } from "~/utils/types";
import { createRegistration } from "~/services/registrations";
import useToast from "~/hooks/useToast";
import { LoadingSpinner } from "~/components/Loading";

const NewUserPage = () => {
  const [employeeName, setEmployeeName ] = useState('');
  const [email, setEmail ] = useState('');
  const [cpf, setCpf ] = useState('');
  const [admissionDate, setAdmissionDate ] = useState('');
  const [errors, setErrors ] = useState<validateUserProps>({} as validateUserProps);
  const toast = useToast();
  const [loading, setLoading ] = useState(true);

  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const cadUser = async () =>{
    setLoading(true);
    const register:validateUserProps = {
      employeeName, 
      email, 
      cpf, 
      admissionDate: admissionDate.split('-').reverse().join('/')
    }
    const validFields = validateUserForm(register);
    if(validFields.success){
      const response = await createRegistration({
        ...register,
        status: 'REVIEW'
      });
      if(response){
        toast.displayToast('Cadastro realizado com sucesso.', 'success');
        goToHome();
      }
    }else{
      setErrors(validFields.errs);
      setLoading(false);
    }
  }

  useEffect(() =>{
    setLoading(false);
  }, [])

  return (
    <>
      {loading && <LoadingSpinner />}
      <S.Container>
        <S.Card>
          <IconButton onClick={() => goToHome()} aria-label="back">
            <HiOutlineArrowLeft size={24} />
          </IconButton>
          <TextField error={errors.employeeName} placeholder="Nome" label="Nome" onChange={(e) => setEmployeeName(e.target.value)}/>
          <TextField error={errors.email} placeholder="Email" label="Email" type="email" onChange={(e) => setEmail(e.target.value)}/>
          <TextField error={errors.cpf} placeholder="CPF" maxLength={11} label="CPF" value={cpf} onChange={(e) => setCpf(formatDocument(e.target.value))}/>
          <TextField error={errors.admissionDate} label="Data de admissão" type="date" onChange={(e) => setAdmissionDate(e.target.value)}/>
          <Button onClick={() => cadUser()}>Cadastrar</Button>
        </S.Card>
      </S.Container>
    </>
  );
};

export default NewUserPage;
