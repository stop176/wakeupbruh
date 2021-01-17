import React, {useRef} from "react";
import "./App.css";
import  "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { ReactComponent as Logo } from './wakeupbruh.svg';
import TimeComponent from './TimeComponent.js';
import useSound from 'use-sound';
import duckArmy from './duck_army.mp3';

function App() {

  const BoopButton = () => {
  const [play] = useSound(duckArmy);
  return <button onClick={play}>Boop!</button>;
};


  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //  Load posenet
  const runFacemesh = async () => {
    // OLD MODEL
    //debugging


    // NEW MODEL
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {
      detect(net);
    }, 10);
  };

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
      console.log(face);


    }
  };

runFacemesh();

  return (
    <div className="App">
      <TimeComponent />
      <Logo />
      <p> Detecting drowsiness and keeping you awake when you need it most </p>
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

      <h1> WAKE UP MF </h1>

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
      <BoopButton />

    </div>
  );
}


export default App;
