import {
    validateUserForm,
    validName,
    validEmail,
    validCPF,
    formatDocument,
  } from './validade';
  import { validateUserProps } from './types';
  
  describe('validateUserForm', () => {
    it('should return success as true and no errors for valid input', () => {
      const validProps: validateUserProps = {
        employeeName: 'John Doe',
        email: 'john.doe@example.com',
        cpf: '12345678909',
        admissionDate: '2023-01-01',
      };
  
      const result = validateUserForm(validProps);
  
      expect(result.success).toBe(true);
      expect(result.errs).toEqual({});
    });
  
    it('should return an error for an invalid employee name', () => {
      const invalidProps: validateUserProps = {
        employeeName: 'J',
        email: 'john.doe@example.com',
        cpf: '12345678909',
        admissionDate: '2023-01-01',
      };
  
      const result = validateUserForm(invalidProps);
  
      expect(result.success).toBe(false);
      expect(result.errs.employeeName).toBe('O nome deve ter pelo menos duas letras');
    });
  
    it('should return an error for an invalid email', () => {
      const invalidProps: validateUserProps = {
        employeeName: 'John Doe',
        email: 'john.doeexample.com',
        cpf: '12345678909',
        admissionDate: '2023-01-01',
      };
  
      const result = validateUserForm(invalidProps);
  
      expect(result.success).toBe(false);
      expect(result.errs.email).toBe('Formato de e-mail inválido');
    });
  
    it('should return an error for an invalid CPF', () => {
      const invalidProps: validateUserProps = {
        employeeName: 'John Doe',
        email: 'john.doe@example.com',
        cpf: '12345678900',
        admissionDate: '2023-01-01',
      };
  
      const result = validateUserForm(invalidProps);
  
      expect(result.success).toBe(false);
      expect(result.errs.cpf).toBe('O CPF informado é inválido / errado.');
    });
  
    it('should return an error for an empty admission date', () => {
      const invalidProps: validateUserProps = {
        employeeName: 'John Doe',
        email: 'john.doe@example.com',
        cpf: '12345678909',
        admissionDate: '',
      };
  
      const result = validateUserForm(invalidProps);
  
      expect(result.success).toBe(false);
      expect(result.errs.admissionDate).toBe('Escolha uma data valida.');
    });
  });
  
  describe('validName', () => {
    it('should return an error for a name with less than 2 characters', () => {
      expect(validName('J')).toBe('O nome deve ter pelo menos duas letras');
    });
  
    it('should return an error for a name starting with a number', () => {
      expect(validName('1John')).toBe('A primeira letra não pode ser um número');
    });
  
    it('should return an error for a name without a surname', () => {
      expect(validName('John')).toBe('Digite seu nome completo.');
    });
  
    it('should return an empty string for a valid name', () => {
      expect(validName('John Doe')).toBe('');
    });
  });
  
  describe('validEmail', () => {
    it('should return an error for an invalid email format', () => {
      expect(validEmail('john.doeexample.com')).toBe('Formato de e-mail inválido');
    });
  
    it('should return an error for an empty email if required', () => {
      expect(validEmail('', true)).toBe('E-mail é obrigatório');
    });
  
    it('should return undefined for an empty email if not required', () => {
      expect(validEmail(undefined, false)).toBeUndefined();
    });
  
    it('should return an empty string for a valid email', () => {
      expect(validEmail('john.doe@example.com')).toBe('');
    });
  });
  
  describe('validCPF', () => {
    it('should return an error for an empty CPF', () => {
      expect(validCPF('')).toBe('CPF é obrigatório');
    });
  
    it('should return an error for an invalid CPF format', () => {
      expect(validCPF('123.456.789-0')).toBe('Formato de CPF inválido.');
    });
  
    it('should return an error for an invalid CPF', () => {
      expect(validCPF('12345678900')).toBe('O CPF informado é inválido / errado.');
    });
  
    it('should return an empty string for a valid CPF', () => {
      expect(validCPF('12345678909')).toBe('');
    });
  });
  
  describe('formatDocument', () => {
    it('should return an empty string for an empty field', () => {
      expect(formatDocument('')).toBe('');
    });
  
    it('should format a CPF correctly', () => {
      expect(formatDocument('12345678909')).toBe('123.456.789-09');
    });
  });
  