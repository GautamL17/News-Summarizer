import React, { useState, useEffect } from "react";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  return (
    <div>
      <button className='py-1 px-2 my-2 mx-2 border rounded-lg cursor-pointer hover:bg-zinc-600' onClick={handlePlay}>Play</button>
      <button className='py-1 px-2 my-2 mx-2 border rounded-lg cursor-pointer hover:bg-zinc-600' onClick={handlePause}>Pause</button>
    </div>
  );
};

export default TextToSpeech;