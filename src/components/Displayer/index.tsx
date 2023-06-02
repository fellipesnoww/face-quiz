import React from 'react';
import { Container, Text } from './styles';
import { TouchableOpacityProps } from 'react-native';

interface CounterProps {
  text: string;
  value: string | number;
}


export default function Counter({text, value}: CounterProps) {
  return (
    <Container>
        <Text>{text}</Text>
        <Text>{value}</Text>
    </Container>
  );
}