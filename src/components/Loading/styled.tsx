import styled from "styled-components";

export const ContainerLoader = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${window.innerHeight-64}px;
  background-color: rgba(0, 0, 0, 0.5);
`;

 export const Loader = styled.div`
  border-width: 0.5rem;
  border-style: solid;
  border-color: rgba(255, 117, 0, 1) rgba(232, 5, 55, 1) rgba(255, 117, 0, 1) rgba(232, 5, 55, 1);
  width: 3.625rem;
  height: 3.625rem;
  border-radius: 50%;
  position: relative;
  -webkit-animation: spin 2s infinite;
  animation: spin 2s infinite;

  &:before,
  &:after {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: rgba(255, 117, 0, 1);
    position: absolute;
    left: 0.125rem;
  }

  &:before {
    top: 0.063rem;
  }

  &:after {
    bottom: 0.063rem;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;