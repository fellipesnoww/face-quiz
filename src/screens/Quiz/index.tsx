import React, { useState } from 'react';
import { Camera, useCameraDevices, useFrameProcessor, } from 'react-native-vision-camera';
import { Face, scanFaces } from 'vision-camera-face-detector';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Counter, CounterArea, CounterText } from './styles';
import chatGTPRandomQuestions from "../../utils/questions.json";
import { Question } from '../../models/questions';

export default function Quiz() {
  const devices = useCameraDevices();
  const device = devices.front;
  const [faces, setFaces] = useState<Face[]>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [rightWinkCounter, setRightWinkCounter] = useState(0);
  const [leftWinkCounter, setLeftWinkCounter] = useState(0);
  const [questions, setQuestions] = useState<Question[]>(chatGTPRandomQuestions.questions);

  const faceValues = useSharedValue({
    width: 0,
    height: 0,
    x: 0,
    y: 0
  });

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    zIndex: 1,
    width: faceValues.value.width,
    height: faceValues.value.height,
    marginTop: 250,
    transform: [
      { translateX: faceValues.value.x },
      { translateY: faceValues.value.y }
    ],
    borderColor: "green",
    borderWidth: 10,
    borderRadius: 4
  }));

  function handlePassQuestion(){
    console.log("handlePassQuestion");
    setRightWinkCounter(0);
    setLeftWinkCounter(0);
    setCurrentQuestion(prev => prev + 1);
  }

  function handleFaceChange(face: Face){
    console.log("handleFaceChange rightWinkCounter", rightWinkCounter);
    console.log("handleFaceChange leftWinkCounter", leftWinkCounter);

    if(currentQuestion <= 9) {
      if(rightWinkCounter >= 3){
        handlePassQuestion();
      }
      if(leftWinkCounter >= 3){
        handlePassQuestion();
      }
      if(face.leftEyeOpenProbability >= 0.6 && face.rightEyeOpenProbability <= 0.4) { //Wink Right eye
        console.log("Right eye wink");
        setRightWinkCounter(prev => prev + 1);
      } else if(face.rightEyeOpenProbability >= 0.6 && face.leftEyeOpenProbability <= 0.4) { //Wink Left eye
        console.log("left eye wink");
        setLeftWinkCounter(prev => prev + 1);
      }
    } else {
      //Navigate to result
    }
  }

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    const scannedFaces = scanFaces(frame);
    if(scannedFaces.length > 0) {
      runOnJS(setFaces)(scannedFaces);
      if(scannedFaces[0].bounds){
        faceValues.value = {
          width: scannedFaces[0].bounds.width,
          height: scannedFaces[0].bounds.height,
          x: scannedFaces[0].bounds.x,
          y: scannedFaces[0].bounds.y
        }
      }
      runOnJS(handleFaceChange)(scannedFaces[0]);
    }
  }, []);
  
  if (device == null) return <></>;

  return (
    <>
      {/* {faces && faces.length > 0 && (<Animated.View style={animatedStyle}/>)} */}
      <Camera
        style={{flex: 1}}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
      />
      <CounterArea>
        <Counter>
            <CounterText>{questions[currentQuestion].question}</CounterText>
        </Counter>
        <Counter>
          <CounterText>PISCADAS COM O OLHO DIREITO:</CounterText>
          <CounterText>{rightWinkCounter}</CounterText>
        </Counter>
        <Counter>
          <CounterText>PISCADAS COM O OLHO ESQUERDO:</CounterText>
          <CounterText>{leftWinkCounter}</CounterText>
        </Counter>
      </CounterArea>
    </>
  )
}