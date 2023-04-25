import React from 'react';
import { Container, Title, Subtitle, HelpList, Help } from './styles';


export default function App() {
  return (
    <Container>
        <Title>Bem vindo ao face quiz</Title>
        <Subtitle>Ao continuar, serão disponibilizadas algumas questões, você não vai precisar utilizar as mãos para responder</Subtitle>
        <HelpList>
            <Help> - Pisque o olho por 3 segundos para responder como "SIM" ou "VERDADEIRO";</Help>
            <Help> - Pisque os dois olhos por 3 segundos para responder como "NÃO" ou "FALSO";</Help>
            <Help> - Mexa a cabeça 3 vezes para a ESQUERDA para voltar;</Help>
            <Help> - Mexa a cabeça 3 vezes para a DIREITA para voltar;</Help>
        </HelpList>
        
    </Container>
  );
}