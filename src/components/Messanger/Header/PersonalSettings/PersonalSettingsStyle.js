import styled from 'styled-components'

export const PersonalSettingsStyle = styled.div`
    width: 30%;
    cursor: pointer;    

    img {
        height: 24px;
    }
`
export const LogoStyle = styled.div`
    padding: 10px 15px;
    
    &:hover {
        background-color: rgba(148,204,76,1);
    }
    
    & > span {
        font-weight: bold;
    }
`

export const DropdownStyle = styled.div`
    margin: 0;
    padding: 0;
    border-radius: 0;
    color: rgba(148,204,76,1);
    border-right: 1px solid #94CC4C;
    border-left: 1px solid #94CC4C;

    & li {
        padding: 10px;

        &:hover {
            background-color: rgba(148,204,76,.1);
        }
        &:last-child {
            border-bottom: 1px solid #94CC4C;
        }
    }
    & span {
        font-weight: bold;
    }
`