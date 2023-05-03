import React from 'react';
import { Container } from './styles';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';

export default function Quiz() {
  const devices = useCameraDevices();
  console.log("Device", devices);
  const device = devices.front;

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    console.log('frame', frame)
  }, [])
  
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