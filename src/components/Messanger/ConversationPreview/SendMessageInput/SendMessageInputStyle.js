import styled from 'styled-components'

export const SendMessageInputStyle = styled.div`
    border-top: 2px solid rgba(230,235,239,1);
`

export const IconStyle = styled.img`
    height: 32px;
`

export const FormStyle = styled.form`
    margin: 0 auto;
    width: 70%;

    & > textarea {
        resize: none;
        min-width: 200px;
    }
`

export const PhotoStyle = styled.div`
    width: 55px;
    height: 55px;
    border-radius: 50%;
    flex-shrink: 0;

    > span {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
        font-size: 1.3rem;
    }
`