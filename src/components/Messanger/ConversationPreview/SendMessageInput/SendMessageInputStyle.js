import styled from 'styled-components'

export const SendMessageInputStyle = styled.div`
    border-top: 2px solid rgba(230,235,239,1);
`

export const IconStyle = styled.img`
    height: 32px;
`

export const FormStyle = styled.form`
    margin: 0 auto;

    & > textarea {
        resize: none;
        min-width: 300px;
    }
`

export const PhotoStyle = styled.div`
    width: 55px;
    height: 55px;
    border-radius: 50%;

    > span {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
        font-size: 1.3rem;
    }
`

export const MyPhotoStyle = styled(PhotoStyle)`
    margin-right: auto;
`

export const CompanionPhotoStyle = styled(PhotoStyle)`
    margin-left: auto;
`