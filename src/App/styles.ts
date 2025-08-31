import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #8e44ad 0%, #e91e63 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  margin-bottom: 2rem;
`;

export const Form = styled.form`
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 2.5rem;
  max-width: 400px;
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: #4a4a4a;
  font-size: 1rem;
`;

export const Input = styled.input`
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #8e44ad;
  }
`;

export const Select = styled.select`
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #8e44ad;
  }
`;

export const Button = styled.button`
  background-color: #8e44ad;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  padding: 0.85rem 0;
  width: 100%;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #732d91;
  }
`;

export const MessageBox = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 2.5rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  color: #333;
`;