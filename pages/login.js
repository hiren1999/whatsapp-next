import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import Head from "next/head";
import styled from "styled-components";

const Login = () => {
    /* <---- Google login Popup open here   -----> */
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    };

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo src='/images/whatsapp-logo.png'></Logo>
                <Button variant='outlined' onClick={signIn}>
                    SIGN WITH GOOGLE
                </Button>
            </LoginContainer>
        </Container>
    );
};

export default Login;

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`;

const LoginContainer = styled.div`
    padding: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 3px 6px #00000040;
`;

const Logo = styled.img`
    width: 200px;
    height: 200px;
    margin-bottom: 50px;
`;
