import React, { useState } from 'react';
import { Camera, useCameraDevices, useFrameProcessor, } from 'react-native-vision-camera';
import { Face, scanFaces } from 'vision-camera-face-detector';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

export default function Quiz() {
  const devices = useCameraDevices();
  const device = devices.front;
  const [faces, setFaces] = useState<Face[]>();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [rightWinkCounter, setRightWinkCounter] = useState(0);
  const [leftWinkCounter, setLeftWinkCounter] = useState(0);
  
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
    //TODO: Verify response
  }

  function handleFaceChange(face: Face){
    if(currentQuestion < 10) {
      if(face.leftEyeOpenProbability > 0.8 && face.rightEyeOpenProbability == 0.1) { //Wink Right eye
        if(rightWinkCounter === 3){
          // Answer question true
          setRightWinkCounter(0);
          setCurrentQuestion(prev => prev + 1);
        } else {
          setRightWinkCounter(prev => prev + 1);
        }
      } else if(face.rightEyeOpenProbability > 0.8 && face.leftEyeOpenProbability == 0.1) { //Wink Left eye
        if(leftWinkCounter === 3){
          // Answer question false
          setLeftWinkCounter(0);
          setCurrentQuestion(prev => prev + 1);
        } else {
          setLeftWinkCounter(prev => prev + 1);
        }
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
      console.log(scannedFaces);
      runOnJS(handleFaceChange)(scannedFaces[0]);
    }
  }, []);
  
  if (device == null) return <></>;

  return (
    <>
      {faces && faces.length > 0 && (<Animated.View style={animatedStyle}/>)}
      <Camera
        style={{flex: 1}}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
      />
    </>
  )
}