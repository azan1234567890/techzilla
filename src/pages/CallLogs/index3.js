// // call logs with second responsiveness 
// import React, { useEffect, useState } from "react";
// import { Container } from "reactstrap";

// const CallLogs = () => {
//   const [logs, setLogs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedLog, setSelectedLog] = useState(null);

//   useEffect(() => {
//     // Fetch data from the backend
//     const fetchCallLogs = async () => {
//       try {
//         // Make a fetch request to your backend endpoint
//         // Replace 'your_backend_url/call_logs' with the actual endpoint URL
//         const response = await fetch("your_backend_url/call_logs");
//         if (!response.ok) {
//           throw new Error("Failed to fetch call logs");
//         }
//         const data = await response.json();
//         setLogs(data);
//         // Automatically select the latest log
//         if (data.length > 0) {
//           setSelectedLog(data[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching call logs:", error);
//         // If there is an error, fallback to dummy data
//         setLogs(dummyLogs);
//         setSelectedLog(dummyLogs[0]);
//       }
//     };

//     // Dummy Data
//     const dummyLogs = [
//       {
//         id: "1",
//         caller: "John Doe",
//         callee: "Jane Doe",
//         duration: "5:32",
//         status: "Connected",
//         startTime: "2024-04-30 10:15:00",
//         endTime: "2024-04-30 10:20:32",
//         recording: "https://example.com/recording1.mp3",
//         transcript: "...",
//       },
//       {
//         id: "2",
//         caller: "Alice",
//         callee: "Bob",
//         duration: "3:45",
//         status: "Missed",
//         startTime: "2024-04-30 11:20:00",
//         endTime: "2024-04-30 11:23:45",
//         recording: "https://example.com/recording2.mp3",
//         endedReason: "Reason for ending",
//         metadata: "Some metadata",
//         assistant: "Assistant name",
//         userPhoneNumber: "User phone number",
//         phoneNumber: "Phone number",
//         type: "Type of call",
//         startedAt: "Start time",
//         endedAt: "End time",
//         transcript: "...",
//       },
//     ];

//     fetchCallLogs();
//   }, []);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleLogClick = (log) => {
//     setSelectedLog(log);
//   };

//   return (
//     <div className="page-content" style={{ overflowX: "auto" }}>
//       <Container fluid style={{ paddingTop: "20px", paddingBottom: "20px" }}>
//         <div className="container" style={{ display: "flex", flexDirection: "row", border: "1px solid rgba(255, 255, 255, 0.063)", borderRadius: "1rem", paddingLeft: "0px" }}>
//           <div style={{ display: "flex", flexDirection: "column", overflow: "auto", border: "1px solid rgba(255, 255, 255, 0.063)", borderRadius: "1rem", flex: "1", minWidth: "300px" }}>
//             <div style={{ padding: "1rem", border: "1px solid rgba(255, 255, 255, 0.063)" }}>
//               <input style={{ backgroundColor: "hsl(var(--background))", display: "flex", justifyContent: "center" }} type="text" className="form-control" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
//             </div>
//             <div className="call-history" style={{ borderRadius: "1rem", padding: "16px", width: "100%" }}>
//               <ul className="list-group">
//                 {logs.map((log) => (
//                   <li key={log.id} className="list-group-item" onClick={() => handleLogClick(log)} style={{ cursor: "pointer", backgroundColor: selectedLog === log ? "#405189" : "inherit" }}>
//                     Call ID: {log.id}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {selectedLog && (
//             <div style={{ display: "flex", flexDirection: "column" }}>
//               <div style={{ padding: "16px", flex: "1", border: "1px solid rgba(255, 255, 255, 0.063)", minWidth: "300px" }} className="vstack gap-3">
//                 <div>
//                   <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}><strong>Recording:</strong></h2>
//                   <a href={selectedLog.recording} target="_blank" rel="noopener noreferrer">Listen</a>
//                 </div>
//                 <hr className="hr" />
//                 <div>
//                   <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>Summary: {selectedLog.summary}</h2>
//                   <div style={{ color: "rgba(255, 255, 255, 0.533)" }}>
//                     <p> This is the summary of your call.</p>
//                   </div>
//                 </div>
//                 <hr className="hr" />
//                 <div>
//                   <div>
//                     <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}><strong>Transcript:</strong></h2>{" "}
//                   </div>
//                   <div style={{ marginTop: "0px", color: "rgba(255, 255, 255, 0.533)" }}>
//                     <p> This is the Transcript of your call.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {selectedLog && (
//             <div style={{ padding: "16px", flex: "1", border: "1px solid rgba(255, 255, 255, 0.063)", minWidth: "300px" }}>
//               <div style={{ padding: "5px" }}>
//                 <div style={{ display: "flex", flexDirection: "column" }}>
//                   <div style={{ opacity: "1" }}>
//                     <button type="button" className="btn btn-primary" style={{ width: "130px" }}>
//                       <span> Resume Call</span>
//                     </button>
//                   </div>
//                   <hr className="hr" />
//                   <div>
//                     <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>ID: {selectedLog.id}</h2>
//                   </div>
//                   <hr className="hr" />
//                   <div>
//                     <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>Cost: {selectedLog.cost}</h2>
//                   </div>
//                   <hr className="hr" />
//                   <div>
//                     <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>Ended Reason: {selectedLog.endedReason}</h2>
//                   </div>
//                   <hr className="hr" />
//                   <div>
//                     <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>Metadata: {selectedLog.metadata}</h2>
//                   </div>
//                   <hr className="hr" />
//                   <div>
//                     <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>Assistant: {selectedLog.assistant}</h2>
//                   </div>
//                   <hr className="hr" />
//                   <div>
//                     <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>User Phone Number: {selectedLog.userPhoneNumber}</h2>
//                   </div>
//                   <hr className="hr" />
//                   <div>
//                     <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>Phone Number: {selectedLog.phoneNumber}</h2>
//                   </div>
//                   <hr className="hr" />
//                   <div>
//                     <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>Type: {selectedLog.type}</h2>
//                   </div>
//                   <hr className="hr" />
//                   <div>
//                     <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>Started At: {selectedLog.startedAt}</h2>
//                   </div>
//                   <hr className="hr" />
//                   <div>
//                     <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>Ended At: {selectedLog.endedAt}</h2>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default CallLogs;
