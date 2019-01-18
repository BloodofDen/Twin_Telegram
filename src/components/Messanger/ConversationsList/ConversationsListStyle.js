import styled from 'styled-components'

export const ConversationsListStyle = styled.div`
    width: 30%;
    height: 100%;
    background-color: #fff;
    border-right: 2px solid rgba(230,235,239,1);
`

export const MessagesListStyle = styled.ul`
    overflow-y: auto;

    ul::-webkit-scrollbar {
        width: 10px;
    }
    ul::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.15);
            -webkit-border-radius: 10px;
            border-radius: 10px;
    }
    ul::-webkit-scrollbar-thumb {
            -webkit-border-radius: 10px;
            border-radius: 10px;
            background: #646464; 
    }
`