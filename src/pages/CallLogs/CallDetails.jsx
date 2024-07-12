import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { useDispatch } from "react-redux";
import { createTicket } from "../../slices/thunks";

const CallDetails = ({ selectedLog }) => {
  const [modal, setModal] = useState(false);
  const [issueDescription, setIssueDescription] = useState("");
  const dispatch = useDispatch();

  const toggle = () => setModal(!modal);

  const handleIssueSubmit = () => {
    dispatch(createTicket({ logId: selectedLog.id, description: issueDescription }));
    setModal(false);
    setIssueDescription("");
  };

  return (
    selectedLog && (
      <div className="d-flex p-2 m-2 c-b custom-border" style={{ flex: "auto", width: '320px'  }}>
        <div className="p-2" style={{ flex: "1 1 0%" }}>
          <div style={{paddingBottom: '5px'}}>
            <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem"}}>
              <strong>Recording:</strong>
            </h2>
            <div className="audio-container">
              <audio controls preload="metadata" src={selectedLog.recording} />
            </div>
          </div>
          <hr className="hr" />
          <div style={{paddingBottom: '5px'}}>
            <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem", paddingTop: '20px' }}>
              Summary: 
            </h2>
            <div style={{ color: "rgba(255, 255, 255, 0.533)" }}>
              <p> {selectedLog.Summary} </p>
            </div>
          </div>
          <hr className="hr" />
          <div style={{paddingBottom: '5px'}}>
            <h2 style={{ fontSize: ".875rem", lineHeight: "1.25rem", paddingTop: '20px' }}>
              <strong>Transcript:</strong>
            </h2>
            <div style={{ marginTop: "0px", color: "rgba(255, 255, 255, 0.533)" }}>
              <p> {selectedLog.Transcript}</p>
            </div>
          </div>
          <Button color="danger" onClick={toggle}>Flag Issue</Button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Flag Issue</ModalHeader>
            <ModalBody>
              <Input
                type="textarea"
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder="Describe the issue..."
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleIssueSubmit}>Submit</Button>
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  );
};

export default CallDetails;
