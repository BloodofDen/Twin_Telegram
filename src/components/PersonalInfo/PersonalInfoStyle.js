import styled from 'styled-components'

export const IconStyle = styled.img`
    height: 32px;
    max-width: none;
`

export const PersonalInfoStyle = styled.div`
    background: #fff;
`

export const PhotoStyle = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;

    > span {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
        font-size: 2rem;
    }
`

export const InputStyle = styled.input`
    font-size: 1.25rem !important;    
    cursor: ${props => props.isEditMode ? '' : 'default'};
    border: none;
    border-radius: unset;
    padding-right: ${props => props.isEditMode ? '55px !important' : ''};
    max-width: 300px;
    background-color: transparent !important;
    color: ${props => props.isInversedColor ? '#fff' : '#94CC4C'}; 
    text-overflow: ellipsis;

    &:focus {
        border-color: ${props => props.isInversedColor ? '#fff' : '#94CC4C'};
        box-shadow: 0 0 3px ${props => props.isInversedColor ? '#fff' : '#94CC4C'};
    }

    &[readonly] {
        padding-left: 0.75rem;
        border-color: transparent;
        background-color: transparent;
        font-size: unset;
    }

    &::-webkit-input-placeholder {
        opacity: 1;
        text-overflow: ellipsis;
        transition: opacity 0.3s ease;
        font-size: 1.25rem;
        color: ${props => props.isInversedColor ? '#fff' : '#94CC4C'}; 
    }
    &::-moz-placeholder {
        opacity: 1;
        text-overflow: ellipsis;
        transition: opacity 0.3s ease;
        font-size: 1.25rem;
        color: ${props => props.isInversedColor ? '#fff' : '#94CC4C'}; 
    }
    &:-ms-input-placeholder {
        opacity: 1;
        text-overflow: ellipsis;
        transition: opacity 0.3s ease;
        font-size: 1.25rem;
        color: ${props => props.isInversedColor ? '#fff' : '#94CC4C'}; 
    }
    &:-moz-placeholder {
        opacity: 1;
        text-overflow: ellipsis;
        transition: opacity 0.3s ease;
        font-size: 1.25rem;
        color: ${props => props.isInversedColor ? '#fff' : '#94CC4C'}; 
    }
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

export const ShiftStyle = styled.div`
    top: 5px;
    right: 5px;
`

export const ButtonShiftStyle = styled(ButtonStyle)`
    top: 5px;
    right: 5px;
`

export const EditDataFieldStyle = styled.div`
    &:hover .edit-icon {
        opacity: 1;
    }
    & .edit-icon {
        opacity: 0;
    }
`

export const BgGreenStyle = styled.article`
    background-color: rgba(148,204,76,0.8);
`