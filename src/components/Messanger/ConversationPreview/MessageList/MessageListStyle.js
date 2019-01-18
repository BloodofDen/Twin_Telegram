import styled from 'styled-components'

export const EmptyMessagingStyle = styled.div`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.1rem;
    font-style: italic;
    font-weight: bold;
    white-space: nowrap;
    user-select: none;
`

export const MessageListStyle = styled.div`
    overflow-y: auto;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        width: 3px;
    }
    &::-webkit-scrollbar-track {
        background: rgba(148, 204, 76, 0.2);
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: rgba(148, 204, 76, 1);
    }
`