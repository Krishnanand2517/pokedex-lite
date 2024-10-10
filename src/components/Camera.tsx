"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";

import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";
import {
  load as cocoSSDLoad,
  ObjectDetection,
} from "@tensorflow-models/coco-ssd";

let detectInterval: NodeJS.Timeout;

export default function Camera() {
  const [isLoading, setIsLoading] = useState(true);

  const cameraRef = useRef<Webcam>(null);

  const runObjectDetection = async (net: ObjectDetection) => {
    if (cameraRef.current && cameraRef.current.video?.readyState === 4) {
      const detectedObjects = await net.detect(
        cameraRef.current.video,
        undefined,
        0.6
      );

      console.log(detectedObjects);
    }
  };

  const runCoco = useCallback(async () => {
    setIsLoading(true); // model loading started
    const net = await cocoSSDLoad();
    setIsLoading(false); // model loading finished

    detectInterval = setInterval(() => {
      runObjectDetection(net);
    }, 10);
  }, []);

  const showMyVideo = () => {
    if (cameraRef.current && cameraRef.current.video?.readyState === 4) {
      const myVideoWidth = cameraRef.current.video.videoWidth;
      const myVideoHeight = cameraRef.current.video.videoHeight;

      cameraRef.current.video.width = myVideoWidth;
      cameraRef.current.video.height = myVideoHeight;
    }
  };

  useEffect(() => {
    runCoco();
    showMyVideo();
  }, [runCoco]);

  return (
    <>
      {isLoading ? (
        <p className="tracking-tight">Loading real-time detection model...</p>
      ) : (
        <div>
          <Webcam
            ref={cameraRef}
            muted
            className="rounded-md w-full lg:h-[480px]"
          />
        </div>
      )}
    </>
  );
}
