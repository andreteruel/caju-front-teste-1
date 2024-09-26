import { validateUserProps } from "./types";

export const validateUserForm = (props:validateUserProps) =>{
    let errs:validateUserProps = {} as validateUserProps;
    const nameValid = validName(props.employeeName);
    let success = true;
    if(nameValid || nameValid != ''){
      errs = {
        ...errs,
        employeeName: nameValid,
      }
      success = false;
    }
    const emailValid = validEmail(props.email);
    if(emailValid && emailValid != ''){
      errs = {
        ...errs,
        email: emailValid,
      }
      success = false;
    }
    const cpfValid = validCPF(props.cpf);
    if(cpfValid && cpfValid != ''){
      errs = {
        ...errs,
        cpf: cpfValid,
      }
      success = false;
    }
    if(!props.admissionDate || props.admissionDate == ''){
      errs = {
        ...errs,
        admissionDate: "Escolha uma data valida.",
      }
      success = false;
    }
    return {
      success,
      errs
    };
  }

export const validName = (name: string) =>{
  if(name.trim().length < 2){
    return 'O nome deve ter pelo menos duas letras'
  }
  if(!isNaN(parseFloat(name.substr(0, 1)))){
    return 'A primeira letra não pode ser um número'
  }
  const nameArr = name.trim().split(' ');
  if(nameArr.length < 2){
    return 'Digite seu nome completo.'
  }

  return '';
}

  
export function validEmail(
  email: string | undefined,
  required = true
): string | undefined {
  if (!required && !email) return undefined;

  if (!email) return 'E-mail é obrigatório';

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!regex.test(email)) {
    return 'Formato de e-mail inválido';
  }

  return '';
}

export function validCPF(cpf: string | undefined): string | undefined {
  if (!cpf) return 'CPF é obrigatório';

  const cpfSemFormatacao = cpf.replace(/[^\d]/g, '');

  if (cpfSemFormatacao.length !== 11) {
    return 'Formato de CPF inválido.';
  }

  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpfSemFormatacao.charAt(i - 1)) * (11 - i);
  }
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpfSemFormatacao.charAt(9))) {
    return 'O CPF informado é inválido / errado.';
  }

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpfSemFormatacao.charAt(i - 1)) * (12 - i);
  }
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpfSemFormatacao.charAt(10))) {
    return 'O CPF informado é inválido / errado.';
  }

  return '';
}

export const formatDocument = (field: string) => {
  if (!field) {
    return '';
  }

  if (field.length == 11) {
    return field.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }
  return field.replace(/[^\d]/g, '');
};