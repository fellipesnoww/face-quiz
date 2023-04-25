import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.palatinate_blue};
    padding: 16px 12px;
    border-radius: 4px;
`;

export const Text = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.black};
`;
