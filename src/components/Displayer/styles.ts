import styled from "styled-components/native";

export const Container = styled.View`
    align-items: flex-start;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.palatinate_blue};
    padding: 16px 12px;
    border-radius: 4px;
    position: absolute;
    flex-direction: row;
`;

export const Text = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.black};
`;
