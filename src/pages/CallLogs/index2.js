import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "reactstrap";
import classnames from "classnames";

const CallLogs = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchCallLogs = async () => {
      try {
        // Make a fetch request to your backend endpoint
        // Replace 'your_backend_url/call_logs' with the actual endpoint URL
        const response = await fetch("your_backend_url/call_logs");
        if (!response.ok) {
          throw new Error("Failed to fetch call logs");
        }
        const data = await response.json();
        setLogs(data);
        // Automatically select the latest log
        if (data.length > 0) {
          setSelectedLog(data[0]);
        }
      } catch (error) {
        console.error("Error fetching call logs:", error);
        // If there is an error, fallback to dummy data
        setLogs(dummyLogs);
        setSelectedLog(dummyLogs[0]);
      }
    };

    // Dummy Data
    const dummyLogs = [
      {
        id: "1",
        caller: "John Doe",
        callee: "Jane Doe",
        duration: "5:32",
        status: "Connected",
        startTime: "2024-04-30 10:15:00",
        endTime: "2024-04-30 10:20:32",
        recording: "https://example.com/recording1.mp3",
        transcript: "...",
      },
      {
        id: "2",
        caller: "Alice",
        callee: "Bob",
        duration: "3:45",
        status: "Missed",
        startTime: "2024-04-30 11:20:00",
        endTime: "2024-04-30 11:23:45",
        recording: "https://example.com/recording2.mp3",
        endedReason: "Reason for ending",
        metadata: "Some metadata",
        assistant: "Assistant name",
        userPhoneNumber: "User phone number",
        phoneNumber: "Phone number",
        type: "Type of call",
        startedAt: "Start time",
        endedAt: "End time",
        transcript: "...",
      },
    ];

    fetchCallLogs();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogClick = (log) => {
    setSelectedLog(log);
  };

  return (
    <div className="page-content" style={{ overflowY: "auto" }}>
      <Container fluid style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <Row>
          <Col sm={12} md={4} className="d-flex flex-column">
            <div className="p-3 mb-3 bg-light rounded">
              <input
                style={{ backgroundColor: "hsl(var(--background))" }}
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="call-history mb-3">
              <ul className="list-group">
                {logs.map((log) => (
                  <li
                    key={log.id}
                    className={classnames("list-group-item", {
                      "bg-primary text-white": selectedLog === log,
                    })}
                    onClick={() => handleLogClick(log)}
                    style={{ cursor: "pointer" }}
                  >
                    Call ID: {log.id}
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col sm={12} md={4}>
            {selectedLog && (
              <div className="p-3 mb-3 bg-light rounded">
                <div className="vstack gap-3">
                  <div>
                    <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>
                      <strong>Recording:</strong>
                    </h2>
                    <a
                      href={selectedLog.recording}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Listen
                    </a>
                  </div>
                  <hr className="hr" />
                  <div>
                    <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>
                      Summary: {selectedLog.summary}
                    </h2>
                    <div style={{ color: "rgba(255, 255, 255, 0.533)" }}>
                      <p>This is the summary of your call.</p>
                    </div>
                  </div>
                  <hr className="hr" />
                  <div>
                    <div>
                      <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>
                        <strong>Transcript:</strong>
                      </h2>{" "}
                    </div>
                    <div
                      style={{
                        marginTop: "0px",
                        color: "rgba(255, 255, 255, 0.533)",
                      }}
                    >
                      <p>This is the Transcript of your call.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Col>
          <Col sm={12} md={4}>
            {selectedLog && (
              <div
                style={{
                  flex: "auto",
                  padding: "10px",
                  margin: "10px 10px",
                  border: "1px solid rgba(255, 255, 255, 0.063)",
                }}
              >
                <div style={{ padding: "5px", flex: "1 1 0%" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        display: "flex",
                        WebkitBoxAlign: "center",
                        alignItems: "center",
                        flexFlow: "wrap",
                        gap: "0.5rem",
                      }}
                    >
                      <div style={{ opacity: "1" }}>
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ width: "130px" }}
                        >
                          <span> Resume Call</span>
                        </button>
                      </div>
                    </div>
                    <hr className="hr" />
                    <div>
                      <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>
                        ID:{" "}
                      </h2>
                      <div
                        style={{
                          marginTop: "0px",
                          color: "rgba(255, 255, 255, 0.533)",
                        }}
                      >
                        <p> {selectedLog.id}</p>
                      </div>
                    </div>
                    <hr className="hr" />
                    <div>
                      <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>
                        Cost:{" "}
                      </h2>
                      <div
                        style={{
                          marginTop: "0px",
                          color: "rgba(255, 255, 255, 0.533)",
                        }}
                      >
                        <div><b>STT:</b> $0.00 ($0.01 / min)</div>
                        <div><b>LLM:</b> $0.00 ($0.00 / min)</div>
                        <div>700 prompt tokens</div>
                        <div>46 completion tokens</div>
                        <div><b>TTS:</b> $0.03 ($0.09 / min)</div>
                        <div><b>Transport:</b> $0.00 ($0.00 / min)</div>
                        <div><b>Total:</b> $0.04 ($0.15 / min)</div>
                      </div>
                    </div>
                    <hr className="hr" />
                    <div>
                      <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>
                        Ended Reason
                      </h2>
                      <div
                        style={{
                          marginTop: "0px",
                          color: "rgba(255, 255, 255, 0.533)",
                        }}
                      >
                        <p> {selectedLog.endedReason}</p>
                      </div>
                    </div>
                    <hr className="hr" />
                    <div>
                      <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>
                        Metadata{" "}
                      </h2>
                      <div
                        style={{
                          marginTop: "0px",
                          color: "rgba(255, 255, 255, 0.533)",
                        }}
                      >
                        <p> {selectedLog.metadata}</p>
                      </div>
                    </div>
                    <hr className="hr" />
                    <div>
                      <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>
                        Assistant{" "}
                      </h2>
                      <div
                        style={{
                          marginTop: "0px",
                          color: "rgba(255, 255, 255, 0.533)",
                        }}
                      >
                        <p> {selectedLog.assistant}</p>
                      </div>
                    </div>
                    <hr className="hr" />
                    <div>
                      <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>
                        User Phone Number{" "}
                      </h2>
                      <div
                        style={{
                          marginTop: "0px",
                          color: "rgba(255, 255, 255, 0.533)",
                        }}
                      >
                        <p> {selectedLog.userPhoneNumber}</p>
                      </div>
                    </div>
                    <hr className="hr" />
                    <div>
                      <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>
                        Phone Number{" "}
                      </h2>
                      <div
                        style={{
                          marginTop: "0px",
                          color: "rgba(255, 255, 255, 0.533)",
                        }}
                      >
                        <p> {selectedLog.phoneNumber}</p>
                      </div>
                    </div>
                    <hr className="hr" />
                    <div>
                      <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>
                        Type{" "}
                      </h2>
                      <div
                        style={{
                          marginTop: "0px",
                          color: "rgba(255, 255, 255, 0.533)",
                        }}
                      >
                        <p> {selectedLog.type}</p>
                      </div>
                    </div>
                    <hr className="hr" />
                    <div>
                      <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>
                        Started At{" "}
                      </h2>
                      <div
                        style={{
                          marginTop: "0px",
                          color: "rgba(255, 255, 255, 0.533)",
                        }}
                      >
                        <p> {selectedLog.startedAt}</p>
                      </div>
                    </div>
                    <hr className="hr" />
                    <div>
                      <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem" }}>
                        Ended At{" "}
                      </h2>
                      <div
                        style={{
                          marginTop: "0px",
                          color: "rgba(255, 255, 255, 0.533)",
                        }}
                      >
                        <p> {selectedLog.endedAt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CallLogs;
