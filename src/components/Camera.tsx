"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";
import {
  load as cocoSSDLoad,
  ObjectDetection,
} from "@tensorflow-models/coco-ssd";
import { isMobile } from "react-device-detect";

import { renderPredictions } from "@/utils/renderPredictions";
import Description from "./Description";

let detectInterval: NodeJS.Timeout;

export default function Camera() {
  const [isLoading, setIsLoading] = useState(true);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );
  const [capturedImage, setCapturedImage] = useState<string | null>();

  const cameraRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const runObjectDetection = async (net: ObjectDetection) => {
    if (
      canvasRef.current &&
      cameraRef.current &&
      cameraRef.current.video?.readyState === 4
    ) {
      canvasRef.current.width = cameraRef.current.video.videoWidth;
      canvasRef.current.height = cameraRef.current.video.videoHeight;

      const detectedObjects = await net.detect(
        cameraRef.current.video,
        undefined,
        0.6
      );

      const context = canvasRef.current.getContext("2d");

      if (context) {
        renderPredictions(detectedObjects, context);
      }
    }
  };

  const runCoco = useCallback(async () => {
    setIsLoading(true); // model loading started
    const net = await cocoSSDLoad({ base: "lite_mobilenet_v2" });
    setIsLoading(false); // model loading finished

    detectInterval = setInterval(() => {
      runObjectDetection(net);
    }, 100);
  }, []);

  const showMyVideo = () => {
    if (cameraRef.current && cameraRef.current.video?.readyState === 4) {
      const myVideoWidth = cameraRef.current.video.videoWidth;
      const myVideoHeight = cameraRef.current.video.videoHeight;

      cameraRef.current.video.width = myVideoWidth;
      cameraRef.current.video.height = myVideoHeight;
    }
  };

  const switchCamera = () => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  };

  const captureImage = () => {
    if (cameraRef.current && cameraRef.current.video?.readyState === 4) {
      const imageSrc = cameraRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };

  useEffect(() => {
    if (!isMobile) {
      setFacingMode("user");
    }

    runCoco();
    showMyVideo();

    return () => {
      if (detectInterval) {
        clearInterval(detectInterval);
      }
    };
  }, [runCoco]);

  return (
    <>
      {isLoading ? (
        <p className="tracking-tight">Loading real-time detection model...</p>
      ) : (
        <>
          <div className="relative">
            <Webcam
              ref={cameraRef}
              muted
              className="rounded-md w-full lg:h-[480px]"
              videoConstraints={{
                facingMode: facingMode,
              }}
            />

            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 z-50 w-full lg:h-[480px]"
            />

            {isMobile && (
              <button
                onClick={switchCamera}
                className="absolute bottom-2 right-2 bg-foreground text-background px-2 py-1 rounded-full shadow-md text-xs"
              >
                Switch Camera
              </button>
            )}

            <button
              onClick={captureImage}
              className="mx-auto my-4 bg-foreground text-background px-4 py-2 rounded-full shadow-md"
            >
              Capture Image
            </button>
          </div>

          {capturedImage && cameraRef.current?.video && (
            <div>
              <Description
                capturedImgSrc={capturedImage}
                imgWidth={cameraRef.current.video.videoWidth}
                imgHeight={cameraRef.current.video.videoHeight}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
