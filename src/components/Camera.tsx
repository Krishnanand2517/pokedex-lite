"use client";

import { useEffect, useRef } from "react";
import Webcam from "react-webcam";

export default function Camera() {
  const cameraRef = useRef<Webcam>(null);

  const showMyVideo = () => {
    if (cameraRef.current && cameraRef.current.video?.readyState === 4) {
      const myVideoWidth = cameraRef.current.video.videoWidth;
      const myVideoHeight = cameraRef.current.video.videoHeight;

      cameraRef.current.video.width = myVideoWidth;
      cameraRef.current.video.height = myVideoHeight;
    }
  };

  useEffect(() => {
    showMyVideo();
  }, []);

  return (
    <div>
      <Webcam
        ref={cameraRef}
        muted
        className="rounded-md w-full lg:h-[480px]"
      />
    </div>
  );
}
