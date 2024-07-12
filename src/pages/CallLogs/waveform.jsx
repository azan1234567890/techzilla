// import React, { useEffect, useRef } from "react";
// import WaveSurfer from "wavesurfer.js";

// const Waveform = ({ audioSrc }) => {
//   const waveformRef = useRef(null);

//   useEffect(() => {
//     if (audioSrc) {
//       const wavesurfer = WaveSurfer.create({
//         container: waveformRef.current,
//         backend: "WebAudio",
//         height: 100,
//         barWidth: 2,
//         progressColor: "#35AAF9",
//         responsive: true,
//         cursorWidth: 0,
//       });

//       wavesurfer.load(audioSrc);

//       return () => {
//         wavesurfer.destroy();
//       };
//     }
//   }, [audioSrc]);

//   return <div ref={waveformRef} />;
// };

// export default Waveform;



