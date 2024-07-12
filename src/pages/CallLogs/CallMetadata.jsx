import React, { useEffect, useState } from "react";

const CallMetadata = ({ selectedLog }) => (
    selectedLog && (
        <div className="d-flex p-2 m-2 c-b custom-border" style={{ flex: "auto", width: '320px' }}>
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
                    <p>{selectedLog.cost}</p>
                  {/* <div>
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
                  </div> */}
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
    )
  );

  export default CallMetadata;