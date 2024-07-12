import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Button,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
// redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";
import {
  getTicketsList,
  addNewTicket,
  updateTicket,
  deleteTicket,
} from "../../../slices/thunks";
import {
  TicketsId,
  Title,
  Client,
  AssignedTo,
  CreateDate,
  DueDate,
  Status,
  Priority,
} from "./TicketCol";
// Import Flatpickr
import Flatpickr from "react-flatpickr";
import { isEmpty } from "lodash";
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";
import { createSelector } from "reselect";
import { FaTimes } from "react-icons/fa";

const TicketsData = () => {
  const dispatch = useDispatch();

  const selectLayoutState = (state) => state.Tickets;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    ticketsList: state.ticketsList,
    isTicketSuccess: state.isTicketSuccess,
    error: state.error,
  }));

  const { ticketsList, isTicketSuccess, error } = useSelector(
    selectLayoutProperties
  );

  const [isEdit, setIsEdit] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  // Delete Tickets
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);
  const [modal, setModal] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const datepickerRef = useRef(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleIconClick = () => {
    if (datepickerRef.current) {
      if (isCalendarOpen) {
        datepickerRef.current.flatpickr.close();
      } else {
        datepickerRef.current.flatpickr.open();
      }
      setIsCalendarOpen(!isCalendarOpen);
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((file, i) => i !== index));
    if (fileInputRef.current) {
      // Create a new DataTransfer object
      const dataTransfer = new DataTransfer();
      // Add the remaining files to the DataTransfer object
      selectedFiles.forEach((file, i) => {
        if (i !== index) {
          dataTransfer.items.add(file);
        }
      });
      // Update the file input field with the remaining files
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setTicket(null);
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the file input field when modal is closed
      }
    } else {
      setModal(true);
      setcreDate(dateFormat());
      setdueDate(dateFormat());
    }
  }, [modal]);

  // validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (ticket && ticket.id) || "",
      title: (ticket && ticket.title) || "",
      client: (ticket && ticket.client) || "",
      assigned: (ticket && ticket.assigned) || "",
      create: (ticket && ticket.create) || "",
      due: (ticket && ticket.due) || "",
      status: (ticket && ticket.status) || "",
      priority: (ticket && ticket.priority) || "",
      description: (ticket && ticket.description) || "",
      attachments: [],
    },
    validationSchema: Yup.object({
      id: Yup.string().required("Please Enter id"),
      title: Yup.string().required("Please Enter Title"),
      client: Yup.string().required("Please Enter Client Name"),
      assigned: Yup.string().required("Please Enter Assigned Name"),
      status: Yup.string().required("Please Enter Your Joining status"),
      priority: Yup.string().required("Please Enter Your Priority"),
      description: Yup.string().required("Please Enter Description"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("id", values.id);
      formData.append("title", values.title);
      formData.append("client", values.client);
      formData.append("assigned", values.assigned);
      formData.append("create", credate);
      formData.append("due", duedate);
      formData.append("status", values.status);
      formData.append("priority", values.priority);
      formData.append("description", values.description);
      selectedFiles.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file);
      });

      if (isEdit) {
        const updateTickets = {
          _id: ticket ? ticket._id : 0,
          ...values,
          create: credate,
          due: duedate,
        };
        // Update ticket with formData
        dispatch(updateTicket(updateTickets, formData));
      } else {
        const newTicket = {
          _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          ...values,
          create: credate,
          due: duedate,
        };
        // Add new ticket with formData
        dispatch(addNewTicket(newTicket, formData));
      }
      validation.resetForm();
      toggle();
    },
  });

  const onClickDelete = (ticket) => {
    setTicket(ticket);
    setDeleteModal(true);
  };

  const handleDeleteTicket = () => {
    if (ticket) {
      dispatch(deleteTicket(ticket._id));
      setDeleteModal(false);
    }
  };

  const handleTicketsClick = useCallback(
    (arg) => {
      const ticket = arg;

      setTicket({
        _id: ticket._id,
        id: ticket.id,
        title: ticket.title,
        client: ticket.client,
        assigned: ticket.assigned,
        create: ticket.create,
        due: ticket.due,
        status: ticket.status,
        priority: ticket.priority,
        description: ticket.description,
      });

      setIsEdit(true);
      toggle();
    },
    [toggle]
  );

  useEffect(() => {
    if (ticketsList && !ticketsList.length) {
      dispatch(getTicketsList());
    }
  }, [dispatch, ticketsList]);

  useEffect(() => {
    setTickets(ticketsList);
  }, [ticketsList]);

  useEffect(() => {
    if (!isEmpty(ticketsList)) {
      setTickets(ticketsList);
      setIsEdit(false);
    }
  }, [ticketsList]);

  const handleTicketsClicks = () => {
    setTicket("");
    setIsEdit(false);
    toggle();
  };

  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".ticketCheckBox");

    if (checkall.checked) {
      ele.forEach((ele) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele) => {
        ele.checked = false;
      });
    }
    deleteCheckbox();
  }, []);

  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState(false);

  const deleteMultiple = () => {
    const checkall = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element) => {
      dispatch(deleteTicket(element.value));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".ticketCheckBox:checked");
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  const columns = useMemo(
    () => [
      {
        header: (
          <input
            type="checkbox"
            id="checkBoxAll"
            className="form-check-input"
            onClick={() => checkedAll()}
          />
        ),
        cell: (cell) => {
          return (
            <input
              type="checkbox"
              className="ticketCheckBox form-check-input"
              value={cell.getValue()}
              onChange={() => deleteCheckbox()}
            />
          );
        },
        id: "#",
        accessorKey: "_id",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "ID",
        accessorKey: "id",
        enableColumnFilter: false,
        cell: (cell) => {
          return <TicketsId {...cell} />;
        },
      },
      {
        header: "Title",
        accessorKey: "title",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Title {...cell} />;
        },
      },
      {
        header: "Create Date",
        accessorKey: "create",
        enableColumnFilter: false,
        cell: (cell) => {
          return <CreateDate {...cell} />;
        },
      },
      {
        header: "Priority",
        accessorKey: "priority",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Priority {...cell} />;
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Status {...cell} />;
        },
      },
      {
        header: "Actions",
        cell: (cell) => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="btn btn-soft-secondary btn-sm">
                <i className="ri-more-fill align-middle"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <li>
                  <DropdownItem href="/apps-tickets-details">
                    <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                    View
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem
                    className="edit-item-btn"
                    href="#showModal"
                    data-bs-toggle="modal"
                    onClick={() => {
                      const TicketData = cell.row.original;
                      handleTicketsClick(TicketData);
                    }}
                  >
                    <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                    Edit
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem
                    className="remove-item-btn"
                    data-bs-toggle="modal"
                    href="#deleteOrder"
                    onClick={() => {
                      const ticketData = cell.row.original;
                      onClickDelete(ticketData);
                    }}
                  >
                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                    Delete
                  </DropdownItem>
                </li>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    [checkedAll]
  );

  const dateFormat = () => {
    let d = new Date(),
      months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    return (
      d.getDate() +
      " " +
      months[d.getMonth()] +
      ", " +
      d.getFullYear()
    ).toString();
  };

  const [credate, setcreDate] = useState(dateFormat());
  const [duedate, setdueDate] = useState(dateFormat());

  const credateformate = (e) => {
    const date = e.toString().split(" ");
    const joinDate = (date[2] + " " + date[1] + ", " + date[3]).toString();
    setcreDate(joinDate);
  };

  const duedateformate = (e) => {
    const date = e.toString().split(" ");
    const joinDate = (date[2] + " " + date[1] + ", " + date[3]).toString();
    setdueDate(joinDate);
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearchQuery = ticket.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatusFilter =
      statusFilter === "" || ticket.status === statusFilter;
    const matchesDateRange =
      dateRange.length === 0 ||
      (new Date(ticket.create) >= dateRange[0] &&
        new Date(ticket.create) <= dateRange[1]);
    return matchesSearchQuery && matchesStatusFilter && matchesDateRange;
  });
  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteTicket}
          onCloseClick={() => setDeleteModal(false)}
        />
        <DeleteModal
          show={deleteModalMulti}
          onDeleteClick={() => {
            deleteMultiple();
            setDeleteModalMulti(false);
          }}
          onCloseClick={() => setDeleteModalMulti(false)}
        />
        <Col lg={12}>
          <Card>
            <CardHeader className="card-header-has-action">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <h4 className="card-title mb-0">Tickets</h4>
                </div>
                <div className="flex-shrink-0 d-flex">
                  <button
                    className="btn btn-danger add-btn me-1"
                    onClick={() => setDeleteModalMulti(true)}
                    style={{ display: isMultiDeleteButton ? "block" : "none" }}
                  >
                    <i className="ri-delete-bin-2-line"></i>
                  </button>
                  <button
                    className="btn btn-success add-btn"
                    onClick={() => handleTicketsClicks()}
                  >
                    <i className="ri-add-line align-bottom me-1"></i> Add Ticket
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardHeader>
              <Row className="g-3">
                <Col sm={3}>
                  <div className="search-box">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Search by title..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </Col>
                <Col sm={3}>
                  <div className="col-sm-auto">
                    <div className="input-group">
                      <Flatpickr
                        ref={datepickerRef}
                        value={dateRange}
                        placeholder="Select a date range"
                        onChange={(date) => setDateRange(date)}
                        options={{ mode: "range", dateFormat: "Y-m-d" }}
                        className="form-control"
                        onClick={handleIconClick}
                      />
                      <div
                        className="input-group-text bg-primary border-primary text-white"
                        onClick={handleIconClick}
                        style={{ cursor: "pointer" }}
                      >
                        <i
                          className="ri-calendar-2-fill"
                          onClick={handleIconClick}
                        ></i>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col sm={3}>
                  <Input
                    type="select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="form-select"
                  >
                    <option value=""> Status</option>
                    <option value="Inprogress">Inprogress</option>
                    <option value="Closed">Closed</option>
                  </Input>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <div>
                {isTicketSuccess && ticketsList.length ? (
                  <TableContainer
                    columns={columns}
                    data={filteredTickets}
                    isGlobalFilter={false}
                    isAddUserList={false}
                    customPageSize={10}
                    divClass="table-responsive table"
                    tableClass="align-middle table-nowrap mb-0 overflow-x-hidden "
                    theadClass="table-light"
                    isTicketsFilter={true}
                    SearchPlaceholder="Search for tickets..."
                  />
                ) : (
                  <Loader error={error} />
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        size="lg"
        className="border-0"
        modalClassName="zoomIn"
      >
        <ModalHeader toggle={toggle} className="p-3 bg-primary-subtle">
          {!!isEdit ? "Edit Ticket" : "Add Ticket"}
        </ModalHeader>
        <Form
          className="tablelist-form"
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <ModalBody>
            <Row className="g-3">
              <Col lg={12}>
                <div>
                  <Label htmlFor="tasksTitle-field" className="form-label">
                    Title
                  </Label>
                  <Input
                    name="title"
                    id="tasksTitle-field"
                    className="form-control"
                    placeholder="Enter Title"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.title || ""}
                    invalid={
                      validation.touched.title && validation.errors.title
                        ? true
                        : false
                    }
                  />
                  {validation.touched.title && validation.errors.title ? (
                    <FormFeedback type="invalid">
                      {validation.errors.title}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col lg={12}>
                <div>
                  <Label
                    htmlFor="tasksDescription-field"
                    className="form-label"
                  >
                    Description
                  </Label>
                  <Input
                    name="description"
                    id="tasksDescription-field"
                    className="form-control"
                    placeholder="Enter Description"
                    type="textarea"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description || ""}
                    invalid={
                      validation.touched.description &&
                      validation.errors.description
                        ? true
                        : false
                    }
                  />
                  {validation.touched.description &&
                  validation.errors.description ? (
                    <FormFeedback type="invalid">
                      {validation.errors.description}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={12}>
                <Label htmlFor="priority-field" className="form-label">
                  Priority
                </Label>
                <Input
                  name="priority"
                  type="select"
                  className="form-select"
                  id="priority-field"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.priority || ""}
                >
                  <option value="">Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Input>
                {validation.touched.priority && validation.errors.priority ? (
                  <FormFeedback type="invalid">
                    {validation.errors.priority}
                  </FormFeedback>
                ) : null}
              </Col>

              <Col lg={12}>
                <div>
                  <Label htmlFor="tasksAttachment-field" className="form-label">
                    Attach Files
                  </Label>
                  <Input
                    name="attachment"
                    id="tasksAttachment-field"
                    className="form-control"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    innerRef={fileInputRef}
                    invalid={
                      validation.touched.attachment &&
                      validation.errors.attachment
                        ? true
                        : false
                    }
                  />
                  {validation.touched.attachment &&
                  validation.errors.attachment ? (
                    <FormFeedback type="invalid">
                      {validation.errors.attachment}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col lg={12}>
                <div>
                  {selectedFiles.length > 0 && (
                    <div>
                      <h5>Selected Files:</h5>
                      <ul>
                        {selectedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="d-flex justify-content-between align-items-center mt-2"
                          >
                            <span>{file.name}</span>
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => handleRemoveFile(index)}
                            >
                              <FaTimes />
                            </Button>
                          </div>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </ModalBody>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <button
                onClick={() => {
                  setModal(false);
                }}
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-success" id="add-btn">
                {!!isEdit ? "Update" : "Add Ticket"}
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default TicketsData;
