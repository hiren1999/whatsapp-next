import styled from "styled-components";

const Loading = () => {
    return (
        <Loader>
            <img src='/images/loader.gif' />
        </Loader>
    );
};

export default Loading;

const Loader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;
