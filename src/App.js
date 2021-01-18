import React, {useRef} from "react";
import "./App.css";
import  "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { ReactComponent as Logo } from './wakeupbruh.svg';
import TimeComponent from './TimeComponent.js';
//import useSound from 'use-sound';
//import duckArmy from './duck_army.mp3';
//import Button from "./Button.js";
//import Sound from "./Sound";

import readyfoschoo from './are_you_ready.mp3';

function App() {

  let isAwake = false;
  const audio = new Audio(readyfoschoo);
  const timeUntilResetWakeup = 10000; // 1 minute

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //  Load posenet
  const runFacemesh = async () => {

    // NEW MODEL
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {
      detect(net);
    }, 50);
  };

  const getPointDist = (eyePoint1, eyePoint2) => {
    let xdiff = eyePoint1[0]-eyePoint2[0];
    let ydiff = eyePoint1[1]-eyePoint2[1];
    let squarex = Math.pow(xdiff,2);
    let squarey = Math.pow(ydiff, 2);
    return Math.sqrt(squarex+squarey);
  }

  let counter = 0;
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await net.estimateFaces({input:video});

      //console.log(face);
      const eyeAspectRatio = () => {
        try {
          let A = getPointDist(face[0].annotations.leftEyeUpper0[4], face[0].annotations.leftEyeLower0[5])
          let B = getPointDist(face[0].annotations.leftEyeUpper0[3], face[0].annotations.leftEyeLower0[4])
          let C = getPointDist(face[0].annotations.leftEyeUpper0[2], face[0].annotations.leftEyeLower0[3])
          let wideLeft = getPointDist(face[0].annotations.leftEyeLower0[0], face[0].annotations.leftEyeLower0[8])

          let D = getPointDist(face[0].annotations.rightEyeUpper0[2], face[0].annotations.rightEyeLower0[3])
          let E = getPointDist(face[0].annotations.rightEyeUpper0[3], face[0].annotations.rightEyeLower0[4])
          let F = getPointDist(face[0].annotations.rightEyeUpper0[4], face[0].annotations.rightEyeLower0[5])
          let wideRight = getPointDist(face[0].annotations.rightEyeLower0[0], face[0].annotations.rightEyeLower0[8])


          let leftRatio = (A+B+C)/(3*wideLeft);
          let rightRatio = (D+E+F)/(3*wideRight);

          return (leftRatio+rightRatio)/2;
        } catch  { return; }
      }

      try {
        if(eyeAspectRatio()<.25) {
            console.log(eyeAspectRatio());
            counter++;
            console.log("counter =" + counter);
            if(counter>=15){
              doWakeUpSequence();
            }
        }
        else counter = 0;
      } catch {
        return;
      }
    }
  };
  alert("PRESS TO UNMUTE SOUNDS");

  const doWakeUpSequence = () => {
    if(!isAwake) {
      console.log("ur eyes are closed");
      audio.play();
      alert("WAKE UP BRUH");
      isAwake = true;
      resetWakeup();
    }
  }

  const resetWakeup = () => {
    setTimeout(() => {
      console.log('resetting wakeup flag!')
      isAwake = false;
    }, timeUntilResetWakeup);
  }

  runFacemesh();


  return (

    // To plug in a new value, replace "get shit on" with whatever value
    <div className="App">
      <TimeComponent />
      <Logo />
      <p> Detecting drowsiness and keeping you awake when you need it most. Act sleepy to try it out! </p>

      <header className="App-header">
      
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />


        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>

  );
}

export default App;

