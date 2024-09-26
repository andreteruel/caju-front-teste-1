import styled from "styled-components";

export const ContainerModal = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${window.innerHeight-64}px;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 64px;
`;

 export const Modal = styled.div`
  width: 600px;
  height: 200px;
  border-radius: 20px;
  position: relative;
  background-color: #FFF;
`;

export const CloseBox = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #FFF;
  cursor: pointer;
`;

export const ContainerText = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-top: 30px;
`;

export const ContainerButtons = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  padding: 8px;
  margin-top: 40px;
`;
