import React, { useEffect, useState } from 'react';
import { Container, Title, Subtitle, HelpList, Help } from './styles';
import DefaultButton from '../../components/DefaultButton';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Camera } from 'react-native-vision-camera';


export default function Home() {
  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  function handleNavigateToQuiz(){
    if(hasCameraPermission){
      navigation.navigate("Quiz");
    } else {
      Alert.alert("Atenção", "Você precisa dar permissão para continuar.")
    }
  }

  async function checkCameraPermission(){
    const cameraPermission = await Camera.getCameraPermissionStatus();
    console.log(cameraPermission);
    if(cameraPermission !== "authorized") {
      const newCameraPermission = await Camera.requestCameraPermission()
      setHasCameraPermission(newCameraPermission === "authorized");
    } else {
      setHasCameraPermission(true);
    }
  }

  useEffect(() => {
    checkCameraPermission();
  }, []);

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
        <DefaultButton 
          text='Continuar'
          onPress={handleNavigateToQuiz}
        />
    </Container>
  );
}