import styled, { keyframes } from "styled-components";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const sparkle = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(-45deg, #8e44ad, #e91e63, #2196f3, #4caf50);
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

export const BackgroundAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  margin-bottom: 2rem;
  animation: ${float} 3s ease-in-out infinite;
  position: relative;
  
  &::after {
    content: '✨';
    position: absolute;
    top: -20px;
    right: -30px;
    animation: ${sparkle} 2s ease-in-out infinite;
  }
`;

export const Form = styled.form`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  padding: 2.5rem;
  max-width: 450px;
  width: 100%;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transform: translateY(0);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: #4a4a4a;
  font-size: 1rem;
  
  span {
    display: block;
    margin-bottom: 0.5rem;
  }
`;

export const Input = styled.input`
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: #8e44ad;
    box-shadow: 0 0 0 3px rgba(142, 68, 173, 0.2);
  }
`;

export const Select = styled.select`
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234a4a4a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;

  &:focus {
    outline: none;
    border-color: #8e44ad;
    box-shadow: 0 0 0 3px rgba(142, 68, 173, 0.2);
  }
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #8e44ad 0%, #e91e63 100%);
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  padding: 0.85rem 0;
  width: 100%;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(142, 68, 173, 0.4);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(142, 68, 173, 0.6);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const MessageBox = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  padding: 2.5rem;
  max-width: 600px;
  width: 100%;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
  color: #333;
`;

export const BookContainer = styled.div`
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  .page {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .page-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      
      .story-text {
        padding: 1rem;
        font-size: 0.9rem;
        line-height: 1.5;
        height: 40%;
        overflow-y: auto;
        background: #f9f9f9;
      }
      
      .page-number {
        position: absolute;
        bottom: 10px;
        right: 10px;
        font-size: 0.8rem;
        color: #888;
      }
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  
  .storybook-fullscreen {
    margin: 0 auto;
    
    .page {
      background-color: #fff;
      
      .page-content {
        .story-text {
          padding: 1.5rem;
          font-size: 1.1rem;
        }
      }
    }
  }
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(142, 68, 173, 0.2);
  border-radius: 50%;
  border-top-color: #8e44ad;
  animation: spin 1s ease-in-out infinite;
  margin: 0 auto 1rem;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const PageCounter = styled.div`
  margin-top: 1rem;
  font-weight: 600;
  color: #8e44ad;
`;

export const NavigationButton = styled.button`
  padding: 0.5rem 1rem;
  background: #8e44ad;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: #732d91;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: #e91e63;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #c2185b;
  }
`;