import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 8px solid grey;
  border-right: 8px solid grey;
  border-bottom: 8px solid grey;
  border-left: 16px solid black;
  background: transparent;
  width: 250px;
  height: 250px;
  border-radius: 50%;
`;

export default LoadingSpinner;
