import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
`;

export const CounterArea = styled.View`
    width: 100%;
    top: 80px;
    align-items: center;
    justify-content: center;
    z-index: 1;
    position: absolute;
`;

export const Counter = styled.View`
    align-items: flex-start;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.palatinate_blue};
    padding: 16px 12px;
    border-radius: 4px;
    flex-direction: row;
    margin-vertical: 10px;
    width: 100%;
`;

export const CounterText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.black};
`;