import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  CardBody,
  Row,
  Col,
  Card,
  Container,
  CardHeader,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  Input,
  Label,
  FormFeedback,


} from "reactstrap";
import { Link } from "react-router-dom";
import * as moment from "moment";
import CountUp from "react-countup";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import DeleteModal from "../../Components/Common/DeleteModal";

//Import Icons
import FeatherIcon from "feather-icons-react";

//Import actions
import {
  getInvoices as onGetInvoices,
  deleteInvoice as onDeleteInvoice,
} from "../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

import Loader from "../../Components/Common/Loader";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createSelector } from "reselect";
// import mockBillingData from '../mockBillingData';


const InvoiceList = () => {
  const dispatch = useDispatch();
  const selectLayoutState = (state) => state.Invoice;
  const selectinvoiceProperties = createSelector(
    selectLayoutState,
    (state) => ({
      invoices: state.invoices,
      isInvoiceSuccess: state.isInvoiceSuccess,
      error: state.error,
    })
  );

  
  // Inside your component
  const {
    invoices, isInvoiceSuccess, error
  } = useSelector(selectinvoiceProperties);


  //delete invoice
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);

  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    if (invoices && !invoices.length) {
      dispatch(onGetInvoices());
    }
  }, [dispatch, invoices]);

  useEffect(() => {
    setInvoice(invoices);
  }, [invoices]);

  // Delete Data
  const onClickDelete = (invoice) => {
    setInvoice(invoice);
    setDeleteModal(true);
  };

  const handleDeleteInvoice = () => {
    if (invoice) {
      dispatch(onDeleteInvoice(invoice._id));
      setDeleteModal(false);
    }
  };



  const handleValidTime = (time) => {
    const time1 = new Date(time);
    const getHour = time1.getUTCHours();
    const getMin = time1.getUTCMinutes();
    const getTime = `${getHour}:${getMin}`;
    var meridiem = "";
    if (getHour >= 12) {
      meridiem = "PM";
    } else {
      meridiem = "AM";
    }
    const updateTime = moment(getTime, 'hh:mm').format('hh:mm') + " " + meridiem;
    return updateTime;
  };

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".invoiceCheckBox");

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

  // Delete Multiple
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState(false);

  const deleteMultiple = () => {
    const checkall = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element) => {
      dispatch(onDeleteInvoice(element.value));
      setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".invoiceCheckBox:checked");
    ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  
  const [modal, setModal] = useState(false);
  const toggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Please Enter Email'),
    cardNumber: Yup.string().required('Please Enter Card Number').matches(/^\d{4} \d{4} \d{4} \d{4}$/, 'Card Number is not valid'),
    cardName: Yup.string().required('Please Enter Full Name on Card'),
    cardExpiry: Yup.string().required('Please Enter Expiry Date').matches(/^\d{2} \/ \d{2}$/, 'Expiry Date is not valid'),
    cardCVC: Yup.string().required('Please Enter CVC').matches(/^\d{3,4}$/, 'CVC is not valid'),
    address1: Yup.string().required('Please Enter Address Line 1'),
    city: Yup.string().required('Please Enter City'),
    postalCode: Yup.string().required('Please Enter Postal Code'),
    country: Yup.string().required('Please Enter Country'),
  });

  const validation = useFormik({
    initialValues: {
      email: '',
      cardNumber: '',
      cardName: '',
      cardExpiry: '',
      cardCVC: '',
      address1: '',
      address2: '',
      city: '',
      postalCode: '',
      country: 'Pakistan',
      phoneNumber: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form values:', values);
      toggle();
    },
  });


  //Column
  const columns = useMemo(
    () => [
      {
        header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
        cell: (cell) => {
          return <input type="checkbox" className="invoiceCheckBox form-check-input" value={cell.getValue()} onChange={() => deleteCheckbox()} />;
        },
        id: '#',
        accessorKey: "_id",
        enableColumnFilter: false,
        enableSorting: false,
      },
     
      {
        header: "DATE",
        accessorKey: "date",
        enableColumnFilter: false,
        // cell: (cell) => (
          // <>
          //   {handleValidDate(cell.getValue())},{" "}
          //   <small className="text-muted">{handleValidTime(cell.getValue())}</small>
          // </>
        // ),
      },
      {
        header: "AMOUNT",
        accessorKey: "amount",
        enableColumnFilter: false,
      },
      {
        header: "PAYMENT STATUS",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell) => {
          switch (cell.getValue()) {
            case "Paid":
              return <span className="badge text-uppercase bg-success-subtle text-success"> {cell.getValue()} </span>;
            case "Unpaid":
              return <span className="badge text-uppercase bg-warning-subtle text-warning"> {cell.getValue()} </span>;
            case "Cancel":
              return <span className="badge text-uppercase bg-danger-subtle text-danger"> {cell.getValue()} </span>;
            default:
              return <span className="badge text-uppercase bg-primary-subtle text-primary"> {cell.getValue()} </span>;
          }
        }
      },
      {
        header: "Action",
        cell: (cellProps) => {
          return (
            <UncontrolledDropdown >
              <DropdownToggle
                href="#"
                className="btn btn-soft-secondary btn-sm dropdown"
                tag="button"
              >
                <i className="ri-more-fill align-middle"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem href="/apps-invoices-details">
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                  View
                </DropdownItem>

        

                <DropdownItem href="/#">
                  <i className="ri-download-2-line align-bottom me-2 text-muted"></i>{" "}
                  Download
                </DropdownItem>

                <DropdownItem divider />

         
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    [checkedAll]
  );
  document.title = "Billing| AI Enhance";

  return (
    <React.Fragment>
      <div className="page-content" style={{ overflowY: "auto" }}>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={() => handleDeleteInvoice()}
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
        <Container fluid>
          <BreadCrumb title="Billing" pageTitle="Dashboard" />
          <Row>
            
                <Col xl={3} md={6}>
                  <Card className="card-animate">
                    <CardBody>
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <p className="text-uppercase fw-medium text-muted mb-0">
                          Billing Overview
                          </p>
                        </div>  
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                          <h4 className="fs-22 fw-semibold ff-secondary mb-1">
                            <CountUp
                              start={0}
                              prefix="$"
                              decimals="1"
                              end= "240"
                              duration={4}
                              className="counter-value"
                            />
                          </h4>
                         
                          <span className="text-muted">
                            {" "}
                            you will have to pay                          </span>
                          <span>
                            <h6 className="fs-18 fw-semibold ff-secondary mt-3">
                            on March 1, 2024
                            </h6>
                          </span>
                        </div>
                       
                      </div>
                    </CardBody>
                  </Card>
                </Col>
             
            
             <Col xl={3} md={6}>
                  <Card className="card-animate">
                    <CardBody>
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <p className="text-uppercase fw-medium text-muted mb-0">
                          Last Month                          </p>
                        </div>  
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                          <h4 className="fs-22 fw-semibold ff-secondary mb-1">
                            <CountUp
                              start={0}
                              prefix="$"
                              decimals="1"
                              end= "210.6"
                              duration={4}
                              className="counter-value"
                            />
                          </h4>
                         
                          <span className="text-muted">
                            
                            you paid
                          </span>
                          <span>
                            <h6 className="fs-18 fw-semibold ff-secondary mt-3">
                              on Feb 1, 2024
                            </h6>
                          </span>
                        </div>
                       
                      </div>
                    </CardBody>
                  </Card>
                </Col>
            <Col xl={3} md={6}>
                  <Card className="card-animate">
                    <CardBody>
                    <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <p className="text-uppercase fw-medium text-muted mb-0">
                            Payment Information
                          </p>
                        </div>  
                      </div>
                    <div>
                <h5 className="mt-2">Card details</h5>
                <p className="mb-1">**** **** **** 1234</p>
                <p>**/** ***</p>
                <a href="#" onClick={toggle}>
                  Change card &rarr;
                </a>
              </div>
          {/* <Button color="primary" onClick={toggle}>Add Payment Info</Button> */}
      <Modal isOpen={modal} toggle={toggle} centered size="lg">
        <ModalHeader toggle={toggle}>Add Payment Information</ModalHeader>
        <Form onSubmit={validation.handleSubmit}>
          <ModalBody>
            <Row className="g-3">
              <Col lg={12}>
                <Label htmlFor="email" className="form-label">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email}
                  invalid={validation.touched.email && validation.errors.email}
                />
                {validation.touched.email && validation.errors.email ? (
                  <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                ) : null}
              </Col>
              <Col lg={12}>
                <Label htmlFor="cardNumber" className="form-label">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.cardNumber}
                  invalid={validation.touched.cardNumber && validation.errors.cardNumber}
                />
                {validation.touched.cardNumber && validation.errors.cardNumber ? (
                  <FormFeedback type="invalid">{validation.errors.cardNumber}</FormFeedback>
                ) : null}
              </Col>
              <Col lg={12}>
                <Label htmlFor="cardName" className="form-label">Cardholder Name</Label>
                <Input
                  id="cardName"
                  name="cardName"
                  type="text"
                  placeholder="Full name on card"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.cardName}
                  invalid={validation.touched.cardName && validation.errors.cardName}
                />
                {validation.touched.cardName && validation.errors.cardName ? (
                  <FormFeedback type="invalid">{validation.errors.cardName}</FormFeedback>
                ) : null}
              </Col>
              <Col lg={6}>
                <Label htmlFor="cardExpiry" className="form-label">Expiry Date</Label>
                <Input
                  id="cardExpiry"
                  name="cardExpiry"
                  type="text"
                  placeholder="MM / YY"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.cardExpiry}
                  invalid={validation.touched.cardExpiry && validation.errors.cardExpiry}
                />
                {validation.touched.cardExpiry && validation.errors.cardExpiry ? (
                  <FormFeedback type="invalid">{validation.errors.cardExpiry}</FormFeedback>
                ) : null}
              </Col>
              <Col lg={6}>
                <Label htmlFor="cardCVC" className="form-label">CVC</Label>
                <Input
                  id="cardCVC"
                  name="cardCVC"
                  type="text"
                  placeholder="CVC"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.cardCVC}
                  invalid={validation.touched.cardCVC && validation.errors.cardCVC}
                />
                {validation.touched.cardCVC && validation.errors.cardCVC ? (
                  <FormFeedback type="invalid">{validation.errors.cardCVC}</FormFeedback>
                ) : null}
              </Col>
              <Col lg={12}>
                <Label htmlFor="address1" className="form-label">Address Line 1</Label>
                <Input
                  id="address1"
                  name="address1"
                  type="text"
                  placeholder="Enter Address Line 1"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.address1}
                  invalid={validation.touched.address1 && validation.errors.address1}
                />
                {validation.touched.address1 && validation.errors.address1 ? (
                  <FormFeedback type="invalid">{validation.errors.address1}</FormFeedback>
                ) : null}
              </Col>
              <Col lg={12}>
                <Label htmlFor="address2" className="form-label">Address Line 2</Label>
                <Input
                  id="address2"
                  name="address2"
                  type="text"
                  placeholder="Enter Address Line 2"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.address2}
                />
              </Col>
              <Col lg={6}>
                <Label htmlFor="city" className="form-label">City</Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Enter City"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.city}
                  invalid={validation.touched.city && validation.errors.city}
                />
                {validation.touched.city && validation.errors.city ? (
                  <FormFeedback type="invalid">{validation.errors.city}</FormFeedback>
                ) : null}
              </Col>
              <Col lg={6}>
                <Label htmlFor="postalCode" className="form-label">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  placeholder="Enter Postal Code"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.postalCode}
                  invalid={validation.touched.postalCode && validation.errors.postalCode}
                />
                {validation.touched.postalCode && validation.errors.postalCode ? (
                  <FormFeedback type="invalid">{validation.errors.postalCode}</FormFeedback>
                ) : null}
              </Col>
              <Col lg={12}>
                <Label htmlFor="country" className="form-label">Country</Label>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  value="Pakistan"
                  readOnly
                />
              </Col>
              <Col lg={12}>
                <Label htmlFor="phoneNumber" className="form-label">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  placeholder="Enter Phone Number"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.phoneNumber}
                />
              </Col>
              <Col lg={12}>
                <Label className="form-check-label" htmlFor="saveInfo">
                  <Input
                    type="checkbox"
                    id="saveInfo"
                    name="saveInfo"
                    onChange={validation.handleChange}
                  />
                  {' '}
                  Securely save my information for 1-click checkout
                </Label>
              </Col>
            </Row>
          </ModalBody>
          <div className="modal-footer">
            <Button type="button" color="secondary" onClick={toggle}>Close</Button>
            <Button type="submit" color="primary">Save</Button>
          </div>
        </Form>
      </Modal>
                    </CardBody>
                  </Card>
      </Col>
      <Col xl={3} md={6}>
                  <Card className="card-animate">
                    <CardBody>
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <p className="text-uppercase fw-medium text-muted mb-0">
                            Pay your Bills
                          </p>
                        </div>  
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                          <h4 className="fs-22 fw-semibold ff-secondary mb-5">
                            PAY NOW
                          </h4>
                         
                         
                          <span>
                            {/* <h6 className="fs-18 fw-semibold ff-secondary mt-3"> */}
                               <a href="#" onClick={toggle}>
                              Proceed to Payments &rarr;
                </a>
                            {/* </h6> */}
                          </span>
                        </div>
                       
                      </div>
                    </CardBody>
                  </Card>
                </Col>
          </Row>
          
         
          <Row>
            <Col lg={12}>
              <Card id="invoiceList">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">Invoices</h5>
                    <div className="flex-shrink-0">
                      {/* <div className="d-flex gap-2 flex-wrap">
                        {isMultiDeleteButton && <button className="btn btn-danger me-1"
                          onClick={() => setDeleteModalMulti(true)}
                        ><i className="ri-delete-bin-2-line"></i></button>}
                        <Link
                          to="/apps-invoices-create"
                          className="btn btn-primary"
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Create
                          Invoice
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <div>
                    {isInvoiceSuccess && invoices.length ? (
                      <TableContainer
                        columns={columns}
                        data={(invoices || [])}
                        // isGlobalFilter={true}
                        isAddUserList={false}
                        customPageSize={10}
                        className="custom-header-css"
                        tableClass="align-middle table-nowrap"
                        thClass="text-muted"
                        // filterClass="bg-light-subtle"
                        // isInvoiceListFilter={true}
                        // SearchPlaceholder='Search for customer, email, country, status or something...'
                      />
                    ) : (<Loader error={error} />)
                    }
                    <ToastContainer closeButton={false} limit={1} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default InvoiceList;