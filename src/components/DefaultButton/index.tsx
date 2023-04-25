import React from 'react';
import { Container, Text } from './styles';
import { TouchableOpacityProps } from 'react-native';

interface DefaultButtonProps extends TouchableOpacityProps {
    text: string;
}


export default function DefaultButton({text, ...props}: DefaultButtonProps) {
  return (
    <Container {...props}>
        <Text>{text}</Text>
    </Container>
  );
}