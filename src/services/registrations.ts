import useToast from "~/hooks/useToast";
import { CallApi } from "./api";

export interface Registration {
  id: string;
  admissionDate: string,
  email: string,
  employeeName: string,
  status: string,
  cpf: string
}
const toast = useToast();

export const getRegistrations = async (cpf?: string) => {
  try {
    let url = 'registrations';
    console.log(cpf)
    if(cpf && cpf != ''){
        url += `?cpf=${cpf}`
    }
    const response = await CallApi<Registration[]>({method: "GET", url});
    return response;
  } catch (error: any) {
    toast.displayToast('Erro ao buscar os registros.', "error");
    return;
  }
};

export const createRegistration = async (dataToCreate: Omit<Registration, 'id'>) => {
  try {
    const response = await CallApi<Registration[]>({method: "POST", url: 'registrations', data: dataToCreate});
    return response;
  } catch (error: any) {
    toast.displayToast('Erro ao criar o registro.', "error");
    return;
  }
};

export const updateRegistrationById = async (id: string, dataToUpdate: Registration) => {
  try {
    const response = await CallApi<Registration[]>({method: "PUT", url: `registrations/${id}`, data: dataToUpdate});
    return response;
  } catch (error: any) {
    toast.displayToast('Erro ao atualizar o registro.', "error");
    return;
  }
};

export const deleteRegistrationById = async (id: string) => {
  try {
    const response = await CallApi<Registration[]>({method: "DELETE", url: `registrations/${id}`});
    return response;
  } catch (error: any) {
    toast.displayToast('Erro ao apagar o registro.', "error");
    return;
  }
};
