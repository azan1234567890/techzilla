import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row, Button } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Dropzone from "react-dropzone";
import './styles.css';

const CreateProject = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      const latestFile = uploadedFiles[0];
      setSelectedFileId(latestFile.id);
    }
  }, [uploadedFiles]);

  const handleAcceptedFiles = (files) => {
    setError("");
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    
    const filteredFiles = files.filter(file => allowedTypes.includes(file.type));
    if (filteredFiles.length !== files.length) {
      setError("Only PDF and Word files are allowed.");
    }

    try {
      const newFiles = filteredFiles.map((file) =>
        Object.assign(file, {
          id: Date.now() + Math.random(),
          createdAt: new Date().toLocaleString(),
          preview: URL.createObjectURL(file),
          formattedSize: formatBytes(file.size),
        })
      );
      setSelectedFiles(newFiles);
    } catch (e) {
      setError("Failed to accept files. Please try again.");
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) return;
    try {
      const newUploadedFiles = selectedFiles.map((file) => ({
        id: file.id,
        name: file.name,
        size: file.size,
        type: file.type,
        url: file.preview,
        createdAt: file.createdAt,
      }));

      setUploadedFiles([...newUploadedFiles, ...uploadedFiles]);
      setSelectedFiles([]);
    } catch (e) {
      setError("Failed to upload files. Please try again.");
    }
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleDelete = (id) => {
    try {
      setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
      if (selectedFileId === id) {
        setSelectedFileId(null);
      }
    } catch (e) {
      setError("Failed to delete the file. Please try again.");
    }
  };

  const handleCopyURL = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (e) {
      setError("Failed to copy URL. Please try again.");
    }
  };

  const handleFileClick = (id) => {
    setSelectedFileId(id);
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "application/pdf":
        return "ri-file-pdf-line";
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return "ri-file-word-line";
      default:
        return "ri-file-line";
    }
  };

  const selectedFile = uploadedFiles.find(file => file.id === selectedFileId);

  document.title = "Documents | AI ENHANCE";

  return (
    <React.Fragment>
      <div className="page-content" style={{ height: '100vh', overflowY: 'hidden' }}>
        <Container fluid style={{ height: '100%', minWidth: '900px' }}>
          <BreadCrumb title="Documents" pageTitle="Projects" />
          <Row style={{ height: 'calc(100% - 60px)', display:'flex',  }}>
            <div style={{ height: '100%', width: '350px', display: 'flex', flexDirection: 'column' }}>
              <Card style={{ height: '100%', display: "flex", flexDirection: "column", marginBottom:'0px' }}>
                <CardBody style={{ overflowY:'auto' }}>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <Dropzone
                    onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)}
                    accept=".pdf,.doc,.docx"
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        className="dropzone dz-clickable"
                        style={{ minHeight: "30px", cursor: "pointer" }}
                      >
                        <input {...getInputProps()} />
                        <div
                          className="dz-message needsclick"
                          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                          <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                          <h6 className="text-muted">Drop files here or click to upload.</h6>
                        </div>
                        <ul
                          className="list-unstyled mb-0"
                          id="dropzone-preview"
                          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                          {selectedFiles.map((f, i) => (
                            <li
                              key={i}
                              className="align-items-center rounded p-2 mb-3"
                              style={{
                                backgroundColor: 'rgba(22, 33, 75, 0.92)',
                                fontSize: '.75rem',
                                lineHeight: '1rem',
                              }}
                            >
                              <Link to="#" className="text-muted font-weight-bold">
                                {f.name}
                              </Link>
                              <p className="mb-0">
                                <strong>{f.formattedSize}</strong>
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Dropzone>
                  <div className="mb-2 d-grid" style={{ paddingTop: '15px' }}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleUpload}
                      disabled={selectedFiles.length === 0}
                    >
                      Upload
                    </button>
                  </div>
                  <div>
                    <ul className="list-group">
                      {uploadedFiles.map((file, index) => (
                        <li
                          key={file.id}
                          className="list-group-item"
                          onClick={() => handleFileClick(file.id)}
                          style={{
                            cursor: "pointer",
                            backgroundColor: selectedFileId === file.id ? "#16214beb" : "inherit",
                            borderRadius: '6px',
                            marginBottom: index !== uploadedFiles.length - 1 ? '5px' : 0,
                            border: 'none',
                          }}
                        >
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardBody>
              </Card>
            </div>
            <Col lg={9} style={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', flex: '1 1 0%' }}>
              <Card className="flex-grow-1" style={{ flex: '1 1 0%', marginBottom: '0px', overflow: 'hidden' }}>
                <CardBody style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                  {selectedFile ? (
                    <div style={{ display: 'flex', flexDirection: 'column', flex:'1 1 0%' }} >
                      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#072142', padding: '10px', margin: '10px', borderRadius: '1rem', alignSelf: 'center', height: '40%', width: '100%'}}>
                        <i className={`display-4 text-muted ${getFileIcon(selectedFile.type)}`} style={{ marginRight: '15px', height: "90%",  fontSize: '4rem' }}></i>
                        <div style={{ height: '70%', marginRight:'10px'}}>
                          <h3 className="card-title" style={{ border: '2px solid #878a99', width: 'fit-content', padding: '7px', borderRadius: '5px', padding: '10px'}}>{selectedFile.name}</h3>
                          <p className="card-text" style={{ paddingTop: '15px'}}>Type: {selectedFile.type ? selectedFile.type.split('/').pop().toUpperCase() : 'Unknown'}</p>
                          <p className="card-text">Size: {formatBytes(selectedFile.size)}</p>
                        </div>

                        <div className="vl"></div>

                        <div style={{ margin: '20px', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', paddingTop: '20px' }}>
                        <p className="card-text">Document ID: </p>
                        <p className="text-muted">{selectedFile.id}</p>
                        <p className="card-text">Created At: </p>
                        <p className="text-muted">{selectedFile.createdAt}</p>
                      </div>
                      </div>
                      <div style={{ margin: '20px' }}>
                        <Button color="primary" href={selectedFile.url} download style={{ marginRight: '10px' }}>
                          <i className="ri-download-line"></i> Download
                        </Button>
                        <Button color="secondary" onClick={() => handleCopyURL(selectedFile.url)} style={{ marginRight: '10px' }}>
                          <i className={copySuccess ? "ri-check-line" : "ri-file-copy-line"}></i> {copySuccess ? "Copied" : "Copy URL"}
                        </Button>
                        <Button color="danger" onClick={() => handleDelete(selectedFile.id)}>
                          <i className="ri-delete-bin-line"></i> Delete
                        </Button>
                      </div>
                    
                    </div>
                  ) : (
                    <div className="text-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1 1 0%', flexDirection: 'column' }}>
                      <i className="display-2 text-muted ri-file-upload-line"></i>
                      <h2 className="mt-2">No Document Selected</h2>
                      <p className="text-muted">Click on a document to view its details.</p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateProject;
