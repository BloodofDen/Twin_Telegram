import styled from 'styled-components'

export const ConversationStyle = styled.li`
    &:first-child {
        border-top: 2px solid rgba(230,235,239,1);
    }
    
    border-bottom: 2px solid rgba(230,235,239,1);
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

export const UnreadMessageIndicatorStyle = styled.div`
    background: #EFAB9D;
    color: #fff;
    border-radius: 50%;
    font-weight: bold;
    font-size: 14px;
    width: 22px;
    height: 22px;
    margin-left: auto;
    align-self: flex-end;
    flex-shrink: 0;

    & > span {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -46%);
    }
`

export const TruncateStyle = styled.div`
    max-width: 100%;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
`