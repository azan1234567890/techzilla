
// import { createAsyncThunk } from "@reduxjs/toolkit";


// export const dummyLogs = [
//   {
//     id: 1,
//     caller: "John Doe",
//     callee: "Jane Doe",
//     duration: "5:32",
//     status: "Connected",
//     startTime: "2024-04-30 10:15:00",
//     endTime: "2024-04-30 10:20:32",
//     recording:
//       "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3",
//     Transcript: "This is your transcript",
//     cost: " STT: $0.08 ($0.01 / min) LLM: $0.90 ($0.00 / min) 700 prompt tokens 46 completion tokens TTS: $0.03 ($0.09 / min) Transport: $0.00 ($0.00 / min) Total: $0.04 ($0.15 / min)",
//     Summary: "This is your Summary"

//   },
//   {
//     id: 2,
//     caller: "Alice",
//     callee: "Bob",
//     duration: "3:45",
//     status: "Missed",
//     startTime: "2024-04-30 11:20:00",
//     endTime: "2024-04-30 11:23:45",
//     recording:
//       "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3",
//     Transcript: "This is your transcript",
//     cost: " STT: $0.20 ($0.01 / min) LLM: $0.00 ($0.70 / min) Tokens: (700 prompt tokens 46 completion tokens) TTS: $0.83 ($0.76 / min) Transport: $0.00 ($0.90 / min) Total: $0.04 ($0.15 / min)",
//     Summary: "This is your Summary"

//   },
// ];

// export const fetchCallLogs = createAsyncThunk("CallLogs/fetchCallLogs", async () => {
//   try {
//     // const response = await fetch("");
//     // if (!response.ok) {
//     //   throw new Error("Failed to fetch call logs");
//     // }
//     // const data = await response.json();
//     // return data;
//     return dummyLogs; 
//   } catch (error) {
//     throw error;
//   }
// });

// export const setSelectedLog = (log) => {
//     return { type: 'CallLogs/setSelectedLog', payload: log };
//   };
  
//   export const setSearchTerm = (term) => {
//     return { type: 'CallLogs/setSearchTerm', payload: term };
//   };

//   export const selectLog = (log) => {
//   return { type: 'callLogs/selectLog', payload: log };
// };

// // export { fetchCallLogs };