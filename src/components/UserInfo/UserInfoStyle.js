import styled from 'styled-components'

export const IconStyle = styled.img`
    height: 32px;
    max-width: none;
`

export const BackgroundStyle = styled.div`
    background-color: ${({ white, green }) => white ? '#fff' : green ? 'rgba(148,204,76,0.8)' : ''};
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

export const InfoStyle = styled.p`
    font-size: 1.25rem !important;
    color: ${({ inversedColor }) => inversedColor ? '#fff' : '#94CC4C'};
    font-style: ${({ isEmpty }) => isEmpty ? 'italic' : ''};
`