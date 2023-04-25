import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.french_gray};
`;

export const Title = styled.Text`
    font-size: 32px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.black};
    margin-bottom: 20px;
`;

export const Subtitle = styled.Text`
    font-size: 16px;
    font-weight: normal;
    color: ${({theme}) => theme.colors.black};
`;

export const HelpList = styled.View`
    margin-left: 12px;
    margin-top: 12px;
`;

export const Help = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.black};
`;