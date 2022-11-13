import React, { useEffect, useRef } from "react";

export default function Video() {
  const videoRef = useRef(null);
  // console.log(videoRef, 'ref');
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          width: { min: 1024, ideal: 1280, max: 1920 },
          height: { min: 576, ideal: 720, max: 1080 },
        },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getVideo();
  }, [videoRef]);
  return (
    <>
      <video ref={videoRef}></video>
    </>
  );
}
