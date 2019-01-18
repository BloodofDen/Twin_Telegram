import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'

export const MessageStyle = styled.div`
    flex-grow: 2;

    & > div:last-child {
        flex-shrink: 0;
    }

    & .edit-message {
        opacity: 0;
    }

    &:hover {
        .edit-message {
            opacity: 1;
        }
    }
`

export const TextareaStyled = styled(TextareaAutosize)`
    border: none;
    border-radius: 0.25rem;
    resize: none;

    &:focus {
        border-color: #94CC4C;
        box-shadow: 0 0 3px #94CC4C;
    }

    &::-webkit-input-placeholder {
        opacity: 1;
        text-overflow: ellipsis;
        transition: opacity 0.3s ease;
        // font-size: 1.25rem;
    }
    &::-moz-placeholder {
        opacity: 1;
        text-overflow: ellipsis;
        transition: opacity 0.3s ease;
        // font-size: 1.25rem;
    }
    &:-ms-input-placeholder {
        opacity: 1;
        text-overflow: ellipsis;
        transition: opacity 0.3s ease;
        // font-size: 1.25rem;
    }
    &:-moz-placeholder {
        opacity: 1;
        text-overflow: ellipsis;
        transition: opacity 0.3s ease;
        // font-size: 1.25rem;
    }
`

export const PhotoStyle = styled.div`
    width: 48px;
    height: 48px;
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

export const IconStyle = styled.img`
    height: ${({ editStyle }) => editStyle ? 20 : 32}px;
    max-width: none;
`

export const ButtonStyle = styled.button`
    &:focus {
        outline: 0;
        box-shadow: none;
    }    

    & img {
        width: 1.2rem;
        height: 1.2rem;
    }
`

export const MessageTextStyle = styled.p`
    word-break: break-all;
`