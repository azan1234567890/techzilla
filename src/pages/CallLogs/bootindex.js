import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { fetchCallLogs, setSelectedLog, setSearchTerm,selectLog } from "../../slices/thunks";
import "./styles.css";


const CallLogs = () => {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.CallLogs.logs);
  const selectedLog = useSelector((state) => state.CallLogs.selectedLog);
  const searchTerm = useSelector((state) => state.CallLogs.searchTerm);
  const [filteredLogs, setFilteredLogs] = useState([]);

  useEffect(() => {
    // console.log("Fetching call logs...");
    dispatch(fetchCallLogs());
  }, [dispatch]);

  useEffect(() => {
    if (logs.length > 0) {
      // Set the latest log as the selected log
      dispatch(setSelectedLog(logs[0]));
    }
  }, [logs, dispatch]);

  useEffect(() => {
    // console.log("Filtered logs:", filteredLogs);
  }, [filteredLogs]);
  
  useEffect(() => {
    // console.log("Logs:", logs);
    // console.log("Search Term:", searchTerm);
    
    const filtered = logs.filter((log) =>
      (typeof log.id === 'string' || typeof log.id === 'number') && 
    String(log.id).toLowerCase().includes(searchTerm.toLowerCase())
  );
    
    setFilteredLogs(filtered);
  }, [logs, searchTerm]);
  

  const handleSearch = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };
  
  const handleLogClick = (log) => {
    dispatch(selectLog(log.id));
  };
  
  document.title = "Call Logs";

  return (
    <div className="page-content" style={{ overflowY: "auto" }}>
  <Container fluid className="pb-3 min-width-900">
        <BreadCrumb title="Call Logs" pageTitle="Dashboard" />
        <div className="container d-flex flex-row border custom-border rounded" style={{ paddingLeft: "0" }}>

        <div className="d-flex flex-column overflow-auto border rounded-lg custom-border rounded" >

        <div className="p-4 border custom-border ">

        <input className="form-control input-bg d-flex justify-content-center rounded-lg" style={{ borderRadius: "0.7rem" }} 

                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="call-history p-4 rounded-lg" style={{ width: "300px" }}>

             <ul className="list-group">
  {filteredLogs.map((log, index) => (
    <li
      key={log.id}
      className="list-group-item"
      onClick={() => handleLogClick(log)}
      style={{
        cursor: "pointer",
        backgroundColor:
          selectedLog && selectedLog.id === log.id
            ? "#16214beb"
            : "inherit",
        borderRadius: '6px',
        marginBottom: index !== filteredLogs.length - 1 ? '5px' : 0,
        border: 'none',
      }}
    >
      Call ID: {log.id}
    </li>
  ))}
              </ul>
            </div>
          </div>

          <div className="d-flex flex-column flex-grow-1 overflow-auto ">

          <div className="d-flex flex-row flex-grow-1">

              <div className="flex-auto p-2 m-2 border custom-border"
              >
                <div className="d-flex flex-column">

                  {selectedLog && (
                    <div className="vstack gap-3">
                      <div>
                      <h2 className="fs-6 lh-1.25">

                          <strong>Recording:</strong>
                        </h2>
                        <div className="audio-container">
                          <audio
                            controls
                            preload="metadata"
                            src={selectedLog.recording}
                          />
                        </div>
                      </div>
                      <hr className="hr" />
                      <div>
                      <h2 className="fs-6 lh-1.25">

                          Summary: {selectedLog.summary}
                        </h2>
                        <div className="custom-border des-color">
                          <p> This is the summary of your call.</p>
                        </div>
                      </div>
                      <hr className="hr" />
                      <div>
                        <div>
                        <h2 className="fs-6 lh-1.25">

                            <strong>Transcript:</strong>
                          </h2>{" "}
                        </div>
                        <div className="description">
                        
                          <p> This is the Transcript of your call.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedLog && (
                <div className="d-flex p-2 m-2 border custom-border" style={{ flex: "auto" }}>
                  <div className="p-2" style={{ flex: "1 1 0%" }}>

                  <div className="d-flex flex-column">

                      {/* <div
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
                      <hr className="hr" /> */}

                      <div>
                      <h2 className="fs-6 lh-1.25">

                          ID:{" "}
                        </h2>
                        <div
                          className="description"
                        >
                          <p> {selectedLog.id}</p>
                        </div>
                      </div>

                      <hr className="hr" />

                      <div>
                      <h2 className="fs-6 lh-1.25">

                          Cost:{" "}
                        </h2>
                        <div
                          className="description"
                        >
                          <div>
                            <b>STT:</b> $0.00 ($0.01 / min)
                          </div>
                          <div>
                            <b>LLM:</b> $0.00 ($0.00 / min)
                          </div>
                          <div>700 prompt tokens</div>
                          <div>46 completion tokens</div>
                          <div>
                            <b>TTS:</b> $0.03 ($0.09 / min)
                          </div>
                          <div>
                            <b>Transport:</b> $0.00 ($0.00 / min)
                          </div>
                          <div>
                            <b>Total:</b> $0.04 ($0.15 / min)
                          </div>
                        </div>
                      </div>

                      <hr className="hr" />

                      <div>
                      <h2 className="fs-6 lh-1.25">

                          Ended Reason
                        </h2>
                        <div
                          className="description"
                        >
                          <p> {selectedLog.endedReason}</p>
                        </div>
                      </div>

                      <hr className="hr" />

                      <div>
                      <h2 className="fs-6 lh-1.25">

                          Metadata{" "}
                        </h2>
                        <div
                          className="description"
                        >
                          <p> {selectedLog.metadata}</p>
                        </div>
                      </div>

                      <hr className="hr" />

                      <div>
                      <h2 className="fs-6 lh-1.25">

                          Assistant{" "}
                        </h2>
                        <div
                         className="description"
                        >
                          <p> {selectedLog.assistant}</p>
                        </div>
                      </div>

                      <hr className="hr" />

                      <div>
                      <h2 className="fs-6 lh-1.25">

                          User Phone Number{" "}
                        </h2>
                        <div
                          className="description"
                        >
                          <p> {selectedLog.userPhoneNumber}</p>
                        </div>
                      </div>

                      <hr className="hr" />

                      <div>
                      <h2 className="fs-6 lh-1.25">

                          Phone Number{" "}
                        </h2>
                        <div
                          className="description"
                        >
                          <p> {selectedLog.phoneNumber}</p>
                        </div>
                      </div>

                      <hr className="hr" />

                      <div>
                      <h2 className="fs-6 lh-1.25">

                          Type{" "}
                        </h2>
                        <div
                          className="description"
                        >
                          <p> {selectedLog.type}</p>
                        </div>
                      </div>

                      <hr className="hr" />

                      <div>
                      <h2 className="fs-6 lh-1.25">

                          Started At{" "}
                        </h2>
                        <div
                          className="description"
                        >
                          <p> {selectedLog.startedAt}</p>
                        </div>
                      </div>

                      <hr className="hr" />

                      <div>
                      <h2 className="fs-6 lh-1.25">

                          Ended At{" "}
                        </h2>
                        <div
                         className="description"
                        >
                          <p> {selectedLog.endedAt}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CallLogs;
