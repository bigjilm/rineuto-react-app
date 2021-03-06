import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import magicGif from '../assets/ahahah.gif';
import UserContext from '../userContext';
import { postLoginUser } from '../utils/services';

export default function LoginPage({ setIsLoadingUser }) {
  const [didLoginFail, setDidLoginFail] = useState(false);
  let history = useHistory();
  const { setUser } = useContext(UserContext);

  const nameInput = useRef(null);

  useEffect(() => {
    document.title = 'Login | Rineuto Lichtspiele';
    nameInput.current.focus();
  }, []);

  return (
    <LoginPageStyled>
      <LoginFormStyled onSubmit={handleSubmit}>
        <LabelStyled>
          Name
          <InputStyled ref={nameInput} name="username" />
        </LabelStyled>
        <LabelStyled>
          Passwort
          <InputStyled type="password" name="password" />
        </LabelStyled>
        <ButtonStyled>Login</ButtonStyled>
      </LoginFormStyled>
      {didLoginFail && <ImageStyled src={magicGif} alt="ah ah ah you didn't say the magic word"></ImageStyled>}
    </LoginPageStyled>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const loginData = Object.fromEntries(formData);
    postLoginUser(loginData)
      .then((user) => {
        setUser(user);
        setIsLoadingUser(false);
        setDidLoginFail(false);
        history.push('/');
      })
      .catch((err) => {
        console.error(err);
        form.reset();
        nameInput.current.focus();
        setDidLoginFail(true);
      });
  }
}

const LoginPageStyled = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 40px;
  justify-items: center;
  padding: 40px 20px;
  color: white;
`;

const LoginFormStyled = styled.form`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 15px;
`;

const LabelStyled = styled.label`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 5px;
`;

const InputStyled = styled.input`
  min-width: 240px;
  padding: 5px;
`;

const ButtonStyled = styled.button`
  justify-self: center;
  width: min-content;
  padding: 5px 20px;
  background-color: white;
  border-radius: 3px;
`;

const ImageStyled = styled.img`
  width: 90%;
  max-width: 400px;
`;
