import { useEffect } from "react";
import { useState } from "react";
import Meyda from "meyda";
// import  MyWorkletNode  from 'AudioWorkletNode'

const getMedia = async () => {
  try {
    return await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
  } catch (error) {
    console.error(error);
  }
};

const useMeydaAnalyser = () => {
  const [analyzer, setAnalyzer] = useState(null);
  const [running, setRunning] = useState(false);
  const [features, setFeatures] = useState(null);

  useEffect(() => {
    const audioContext = new AudioContext();
    let newAnalyzer;

    audioContext.resume(); //разрешение

    getMedia().then((stream) => {
      if (audioContext.state === "closed") {
        return;
      }

      const source = audioContext.createMediaStreamSource(stream);
      newAnalyzer = Meyda.createMeydaAnalyzer({
        audioContext: audioContext,
        source: source,
        bufferSize: 1024,
        featureExtractors: ["amplitudeSpectrum", "mfcc", "rms"],
        callback: (features) => {
          setFeatures(features);

          console.log(features, "features");
        },
      });
      setAnalyzer(newAnalyzer);
    });

    return () => {
      if (newAnalyzer) {
        newAnalyzer.stop();
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [running]);

  useEffect(() => {
    if (analyzer) {
      if (running) {
        analyzer.start();
      } else {
        analyzer.stop();
      }
    } else {
      setRunning(false);
    }
  }, [running, analyzer]);

  return [running, setRunning, features];
};

export default useMeydaAnalyser;
