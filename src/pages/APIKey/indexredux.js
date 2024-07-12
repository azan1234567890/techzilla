import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Card, CardBody, CardHeader, Col, Container,
  DropdownItem, DropdownMenu, DropdownToggle, Input, Label,
  Modal, ModalBody, ModalHeader, Row, UncontrolledDropdown
} from "reactstrap";
import DeleteModal from "../../Components/Common/DeleteModal";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { APIKeys, CreatedBy, CreatedDate, ExpiryDate, Name, Status } from "./APIKeyCol";
// import { fetchApiKeys } from '../../store/apiKeyThunks';
import { addApiKey, deleteApiKey, renameApiKey, fetchApiKeys } from '../../slices/thunks';

const APIKey = () => {
  document.title = "API KEY | AI ENHANCE";

  const dispatch = useDispatch();
  const { keys: apiKeys, loading, error } = useSelector(state => state.apiKeys);

  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [apiKeyName, setApiKeyName] = useState('');
  const [customApiKeyName, setCustomApiKeyName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState(null);
  const [renameModal, setRenameModal] = useState(false);
  const [newApiKeyName, setNewApiKeyName] = useState('');

  useEffect(() => {
    dispatch(fetchApiKeys());
  }, [dispatch]);

  const handleClose = () => {
    setShow(false);
    setRenameModal(false);
  };

  const handleShow = () => setShow(true);

  const handleCreateAPIKey = () => {
    if ((showCustomInput && customApiKeyName.trim() && apiKey.trim()) || (!showCustomInput && apiKeyName.trim() && apiKey.trim())) {
      const newApiKey = {
        id: apiKeys.length + 1,
        name: showCustomInput ? customApiKeyName : apiKeyName,
        createBy: "User",
        apikey: apiKey,
        status: "Active",
        create_date: new Date().toISOString().split('T')[0],
        expiry_date: "2025-01-01"
      };
      dispatch(addApiKey(newApiKey));
      setShow(false);
      setApiKeyName('');
      setCustomApiKeyName('');
      setApiKey('');
      setShowCustomInput(false);
    } else {
      document.getElementById('api-key-error-msg').classList.remove('d-none');
      document.getElementById('api-key-error-msg').innerText = 'API Key Name and API Key are required.';
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteApiKey(id));
    setDeleteModal(false);
  };

  const handleRename = (id, newName) => {
    dispatch(renameApiKey({ id, newName }));
    setRenameModal(false);
  };

  const columns = useMemo(
    () => [
      {
        header: (
          <Input
            type="checkbox"
            id="checkBoxAll"
            className="form-check-input"
            onClick={() => checkedAll()}
          />
        ),
        cell: (cell) => {
          return (
            <Input
              type="checkbox"
              className="orderCheckBox form-check-input"
              value={cell.getValue()}
            />
          );
        },
        id: "#",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Name {...cell} />;
        },
      },
      {
        header: "API Key",
        accessorKey: "apikey",
        enableColumnFilter: false,
        border: "1px solid black",
        cell: (cell) => {
          return <APIKeys {...cell} />;
        },
      },
      {
        header: "Created Date",
        accessorKey: "create_date",
        enableColumnFilter: false,
        cell: (cell) => {
          return <CreatedDate {...cell} />;
        },
      },
      {
        header: "Action",
        disableFilters: true,
        enableSorting: false,
        cell: (cell) => {
          return (
            <UncontrolledDropdown className="dropdown">
              <DropdownToggle
                role="button"
                tag="button"
                className="btn btn-soft-secondary btn-sm dropdown"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="ri-more-fill align-middle"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu dropdown-menu-end">
                <li>
                  <DropdownItem
                    className="edit-item-btn"
                    onClick={() => {
                      setSelectedApiKey(cell.row.original);
                      setNewApiKeyName(cell.row.original.name);
                      setRenameModal(true);
                    }}
                  >
                    Rename
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem
                    className="remove-item-btn"
                    onClick={() => {
                      setSelectedApiKey(cell.row.original);
                      setDeleteModal(true);
                    }}
                  >
                    Delete
                  </DropdownItem>
                </li>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    [apiKeys] // Add apiKeys as a dependency
  );

  const handleDropdownChange = (e) => {
    if (e.target.value === "Other") {
      setShowCustomInput(true);
      setApiKeyName('');
    } else {
      setShowCustomInput(false);
      setApiKeyName(e.target.value);
    }
  };

  const checkedAll = () => {
    const checkall = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".orderCheckBox");

    if (checkall.checked) {
      ele.forEach((ele) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele) => {
        ele.checked = false;
      });
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <DeleteModal
          show={deleteModal}
          onCloseClick={() => setDeleteModal(false)}
          onDeleteClick={() => handleDelete(selectedApiKey.id)}
        />
        <Container fluid>
          <BreadCrumb title="API Key" pageTitle="Apps" />

          <Row>
            <Col lg={12}>
              <Card id="apiKeyList">
                <CardHeader className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">API Keys</h5>
                  <div className="d-flex gap-1 flex-wrap">
                    <Button
                      type="button"
                      color="primary"
                      className="btn create-btn"
                      onClick={handleShow}
                      data-bs-target="#api-key-modal"
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Add API Key
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  {loading ? <p>Loading...</p> : error ? <p>Error: {error}</p> : (
                    <div>
                      <TableContainer
                        columns={columns}
                        data={apiKeys}
                        customPageSize={8}
                        divClass="table-responsive table-card mb-1"
                        tableClass="align-middle table-nowrap"
                        theadClass="table-light text-muted"
                      />
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <div
        className="modal fade"
        id="api-key-modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <Modal isOpen={show} toggle={handleClose} className="modal-content">
            <ModalHeader className="modal-header">Create API Key</ModalHeader>
            <ModalBody className="modal-body">
              <form autoComplete="off">
                <div
                  id="api-key-error-msg"
                  className="alert alert-danger py-2 d-none"
                ></div>
                <Input type="hidden" id="apikeyId" />
                <div className="mb-3">
                  <Label htmlFor="api-key-name" className="form-label">
                    API Key Name <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="select"
                    className="form-select"
                    id="api-key-dropdown"
                    value={apiKeyName}
                    onChange={handleDropdownChange}
                  >
                    <option value="" disabled>Select API Key</option>
                    <option value="Twilio">Twilio</option>
                    <option value="GoHighLevel">GoHighLevel</option>
                    <option value="Other">Other</option>
                  </Input>
                </div>
                {showCustomInput && (
                  <div className="mb-3">
                    <Label htmlFor="custom-api-key-name" className="form-label">
                      Custom API Key Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="custom-api-key-name"
                      placeholder="Enter custom api key name"
                      value={customApiKeyName}
                      onChange={(e) => setCustomApiKeyName(e.target.value)}
                    />
                  </div>
                )}
                <div className="mb-3">
                  <Label htmlFor="api-key" className="form-label">
                    API Key <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="api-key"
                    placeholder="Enter api key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>
              </form>
            </ModalBody>
            <div className="modal-footer">
              <div className="hstack gap-2 justify-content-end">
                <Button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  color="primary"
                  id="createApi-btn"
                  onClick={handleCreateAPIKey}
                >
                  Create API
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>

      <Modal isOpen={renameModal} toggle={handleClose} className="modal-content">
        <ModalHeader className="modal-header">Rename API Key</ModalHeader>
        <ModalBody className="modal-body">
          <form autoComplete="off">
            <div className="mb-3">
              <Label htmlFor="new-api-key-name" className="form-label">
                New API Key Name <span className="text-danger">*</span>
              </Label>
              <Input
                type="text"
                className="form-control"
                id="new-api-key-name"
                placeholder="Enter new api key name"
                value={newApiKeyName}
                onChange={(e) => setNewApiKeyName(e.target.value)}
              />
            </div>
          </form>
        </ModalBody>
        <div className="modal-footer">
          <div className="hstack gap-2 justify-content-end">
            <Button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={() => handleRename(selectedApiKey.id, newApiKeyName)}
            >
              Rename API
            </Button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default APIKey;
