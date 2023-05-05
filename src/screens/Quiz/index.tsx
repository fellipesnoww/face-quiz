import React, { useEffect } from 'react';
import { Container } from './styles';
import { Camera, useCameraDevices, useFrameProcessor, } from 'react-native-vision-camera';
import { Face, scanFaces } from 'vision-camera-face-detector';
import { runOnJS } from 'react-native-reanimated';

export default function Quiz() {
  const devices = useCameraDevices();
  const device = devices.front;
  const [faces, setFaces] = React.useState<Face[]>();
  
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    const scannedFaces = scanFaces(frame);
    if(scannedFaces.length > 0) {
      runOnJS(setFaces)(scannedFaces);
    }
  }, []);

  useEffect(() => {
    console.log(faces);
  }, [faces]);
  
  if (device == null) return <></>
  return (
    <Camera
      style={{flex: 1}}
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}
    />
  )
}