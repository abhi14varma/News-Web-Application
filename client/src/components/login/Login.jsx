import React, { useState, useEffect, useContext } from 'react';

import { TextField, Box, Button, Typography, styled } from '@mui/material';

import { API , ProcessError } from '../../service/api.js';



const Component = styled(Box)`
    width: 400px;
    margin: auto;
    dislay:flex;
    flex:1;
    align-items: center;
    padding:40px;  
`;
const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Wrapper = styled(Box)`
    padding: 15px 25px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 15px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = () => {
    const componentStyle = {
        color: 'red',
      };

      const [account, toggleAccount] = useState('login');
      const [signup, setSignup] = useState(signupInitialValues);
      const [login, setLogin] = useState(loginInitialValues);
      const [error, setError] = useState('');

      const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const signupUser = async () => {
        try {
        let response = await API.userSignup(signup);
         if (response.isSuccess) {
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            setError('Something went wrong! please try again later');
        }
    }catch (error) {
        const processedError = ProcessError(error);
        console.error("Error during signup:", processedError);
        // Handle the error, show an error message, or perform any necessary actions
      }
    };

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            setError('');
        } else {
            setError('Something went wrong! please try again later');
        }
    }

    return(
        <Component>
            <Box>
            {
                    account === 'login' ?
            <Wrapper>
            <p style= {componentStyle} >Username</p>
        <TextField  variant="outlined" value={login.username} onChange={(e) => onValueChange(e)} name = "username" placeholder='Enter username here'/>
        <br/>
        <p style= {componentStyle}>Password</p>
        <TextField  variant="outlined" value={login.password} onChange={(e) => onValueChange(e)} name = "password" placeholder='Enter password here'/>
        <br/>
        {error && <Error>{error}</Error>}
        <br/>
        <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
        <br/>
        <br/>
        <Text>OR</Text>
        <SignupButton onClick={() => toggleSignup()}>Create Account</SignupButton>
    </Wrapper>
          :
        <Wrapper>
        <TextField  variant="outlined" onChange={(e) => onInputChange(e)} name='name' label='name' />
        <br/>
        <TextField  variant="outlined" onChange={(e) => onInputChange(e)} name='username' label='username' />
        <br/>
        <TextField  variant="outlined" onChange={(e) => onInputChange(e)} name='password'label='password'/>
        <br/>
        {error && <Error>{error}</Error>}
        <br/>
        <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
        <br/>
        <Text>OR</Text>
        <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an  Account</LoginButton>
        </Wrapper>
             }
        </Box>
        </Component>

    )
}

export default Login;