import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Label,
    Input,
    FormFeedback,
    Form,
    CardHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from 'reactstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { editProfile, resetProfileFlag } from '../../../../slices/thunks';
import avatar from '../../../../assets/images/users/avatar-8.jpg';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import classnames from 'classnames';
import Flatpickr from "react-flatpickr";
import { Link } from 'react-router-dom';

const Settings = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('admin@gmail.com');
    const [idx, setIdx] = useState('1');
    const [userName, setUserName] = useState('Admin');
    const [lastName, setLastName] = useState('Adame');
    const [activeTab, setActiveTab] = useState('1');
    const [profileImage, setProfileImage] = useState(avatar);
    const [imageFile, setImageFile] = useState(null);

    const selectLayoutState = (state) => state.Profile;
    const userProfileData = createSelector(
        selectLayoutState,
        (state) => ({
            user: state.user,
            success: state.success,
            error: state.error,
        })
    );

    const { user, success, error } = useSelector(userProfileData);

    useEffect(() => {
        if (sessionStorage.getItem('authUser')) {
            const obj = JSON.parse(sessionStorage.getItem('authUser'));

            if (user && Object.keys(user).length > 0) {
                obj.data.first_name = user.first_name;
                obj.data.last_name = user.last_name;
                sessionStorage.removeItem('authUser');
                sessionStorage.setItem('authUser', JSON.stringify(obj));
            }

            setUserName(obj.data.first_name);
            setLastName(obj.data.last_name);
            setEmail(obj.data.email);
            setIdx(obj.data._id || '1');

            setTimeout(() => {
                dispatch(resetProfileFlag());
            }, 3000);
        }
    }, [dispatch, user]);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            first_name: userName || 'Admin',
            last_name: lastName || 'Adame',
            idx: idx || '1',
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('Please Enter Your First Name'),
            last_name: Yup.string().required('Please Enter Your Last Name'),
        }),
        onSubmit: (values) => {
            dispatch(editProfile(values));
        },
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const tabChange = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    document.title = 'Profile Settings | Velzon - React Admin & Dashboard Template';

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Profile Settings" pageTitle="Pages" />
                    <Row>
                        <Col xxl={3}>
                            <Card className="card-bg-fill">
                                <CardBody className="p-4">
                                    <div className="text-center">
                                        <div className="profile-user position-relative d-inline-block mx-auto mb-4">
                                            <img
                                                src={profileImage}
                                                className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                                alt="user-profile"
                                                onClick={() => document.getElementById('profileImageInput').click()}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            <input
                                                type="file"
                                                id="profileImageInput"
                                                style={{ display: 'none' }}
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                        <h5 className="fs-16 mb-1">{userName} {lastName}</h5>
                                        <p className="text-muted mb-0">Lead Designer / Developer</p>
                                    </div>
                                    {success && (
                                        <div className="alert alert-success mt-3">
                                            Profile updated successfully
                                        </div>
                                    )}
                                </CardBody>
                            </Card>
  
                <Card>
                  <CardBody>
                    <div className="d-flex align-items-center mb-5">
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-0">Complete Your Profile</h5>
                      </div>
                      <div className="flex-shrink-0">
                        <Button color="link" className="badge bg-light text-primary fs-12">
                          <i className="ri-edit-box-line align-bottom me-1"></i> Edit
                        </Button>
                      </div>
                    </div>
                    <div className="progress animated-progress custom-progress progress-label">
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: '30%' }}
                        aria-valuenow="30"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div className="label">30%</div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <div className="d-flex align-items-center mb-4">
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-0">Portfolio</h5>
                      </div>
                      <div className="flex-shrink-0">
                        <Button color="link" className="badge bg-light text-primary fs-12">
                          <i className="ri-add-fill align-bottom me-1"></i> Add
                        </Button>
                      </div>
                    </div>
                    <div className="mb-3 d-flex">
                      <div className="avatar-xs d-block flex-shrink-0 me-3">
                        <span className="avatar-title rounded-circle fs-16 bg-body text-body">
                          <i className="ri-github-fill"></i>
                        </span>
                      </div>
                      <Input
                        type="text"
                        className="form-control"
                        id="gitUsername"
                        placeholder="Username"
                        defaultValue="@daveadame"
                      />
                    </div>
                    <div className="mb-3 d-flex">
                      <div className="avatar-xs d-block flex-shrink-0 me-3">
                        <span className="avatar-title rounded-circle fs-16 bg-primary">
                          <i className="ri-global-fill"></i>
                        </span>
                      </div>
                      <Input
                        type="text"
                        className="form-control"
                        id="websiteInput"
                        placeholder="www.example.com"
                        defaultValue="www.velzon.com"
                      />
                    </div>
                    <div className="mb-3 d-flex">
                      <div className="avatar-xs d-block flex-shrink-0 me-3">
                        <span className="avatar-title rounded-circle fs-16 bg-success">
                          <i className="ri-dribbble-fill"></i>
                        </span>
                      </div>
                      <Input
                        type="text"
                        className="form-control"
                        id="dribbleName"
                        placeholder="Username"
                        defaultValue="@dave_adame"
                      />
                    </div>
                    <div className="d-flex">
                      <div className="avatar-xs d-block flex-shrink-0 me-3">
                        <span className="avatar-title rounded-circle fs-16 bg-danger">
                          <i className="ri-pinterest-fill"></i>
                        </span>
                      </div>
                      <Input
                        type="text"
                        className="form-control"
                        id="pinterestName"
                        placeholder="Username"
                        defaultValue="Advance Dave"
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
  
              <Col xxl={9}>
                <Card>
                  <CardHeader>
                    <Nav className="nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === '1' })}
                          onClick={() => {
                            tabChange('1');
                          }}
                        >
                          <i className="fas fa-home"></i>
                          Personal Details
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === '2' })}
                          onClick={() => {
                            tabChange('2');
                          }}
                        >
                          <i className="far fa-user"></i>
                          Change Password
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === '3' })}
                          onClick={() => {
                            tabChange('3');
                          }}
                        >
                          <i className="far fa-envelope"></i>
                          Experience
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === '4' })}
                          onClick={() => {
                            tabChange('4');
                          }}
                        >
                          <i className="far fa-envelope"></i>
                          Privacy Policy
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </CardHeader>
  
                  <CardBody>
                    <TabContent activeTab={activeTab} className="text-muted">
                      <TabPane tabId="1">
                        <Form
                          className="needs-validation"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                          <Row>
                            <Col lg={6}>
                              <div className="mb-3">
                                <Label htmlFor="firstnameInput" className="form-label">
                                  First Name
                                </Label>
                                <Input
                                  name="first_name"
                                  type="text"
                                  className="form-control"
                                  id="firstnameInput"
                                  placeholder="Enter your firstname"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.first_name || ''}
                                  invalid={validation.touched.first_name && validation.errors.first_name}
                                />
                                {validation.touched.first_name && validation.errors.first_name ? (
                                  <FormFeedback type="invalid">{validation.errors.first_name}</FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="mb-3">
                                <Label htmlFor="lastnameInput" className="form-label">Last Name</Label>
                                <Input
                                  name="last_name"
                                  type="text"
                                  className="form-control"
                                  id="lastnameInput"
                                  placeholder="Enter your lastname"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.last_name || ''}
                                  invalid={validation.touched.last_name && validation.errors.last_name}
                                />
                                {validation.touched.last_name && validation.errors.last_name ? (
                                  <FormFeedback type="invalid">{validation.errors.last_name}</FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="mb-3">
                                <Label htmlFor="phonenumberInput" className="form-label">Phone Number</Label>
                                <Input type="text" className="form-control" id="phonenumberInput"
                                  placeholder="Enter your phone number" defaultValue="+(1) 987 6543" />
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="mb-3">
                                <Label htmlFor="emailInput" className="form-label">Email Address</Label>
                                <Input type="email" className="form-control" id="emailInput"
                                  placeholder="Enter your email" defaultValue="daveadame@velzon.com" />
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="mb-3">
                                <Label htmlFor="JoiningdatInput" className="form-label">Joining Date</Label>
                                <Flatpickr
                                  className="form-control"
                                  options={{
                                    dateFormat: "d M, Y"
                                  }}
                                />
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="mb-3">
                                <Label htmlFor="skillsInput" className="form-label">Skills</Label>
                                <select className="form-select mb-3">
                                  <option >Select your Skill </option>
                                  <option value="Choices1">CSS</option>
                                  <option value="Choices2">HTML</option>
                                  <option value="Choices3">PYTHON</option>
                                  <option value="Choices4">JAVA</option>
                                  <option value="Choices5">ASP.NET</option>
                                </select>
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="mb-3">
                                <Label htmlFor="designationInput" className="form-label">Designation</Label>
                                <Input type="text" className="form-control" id="designationInput" placeholder="Designation"
                                  defaultValue="Lead Designer / Developer" />
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="mb-3">
                                <Label htmlFor="websiteInput1" className="form-label">Website</Label>
                                <Input type="text" className="form-control" id="websiteInput1"
                                  placeholder="www.example.com" defaultValue="www.velzon.com" />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <Label htmlFor="cityInput" className="form-label">City</Label>
                                <Input type="text" className="form-control" id="cityInput"
                                  placeholder="City" defaultValue="California" />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <Label htmlFor="countryInput" className="form-label">Country</Label>
                                <Input type="text" className="form-control" id="countryInput"
                                  placeholder="Country" defaultValue="United States" />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <Label htmlFor="zipcodeInput" className="form-label">Zip Code</Label>
                                <Input type="text" className="form-control" minLength="5"
                                  maxLength="6" id="zipcodeInput" placeholder="Enter zipcode" defaultValue="90011" />
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="mb-3 pb-2">
                                <Label htmlFor="exampleFormControlTextarea" className="form-label">Description</Label>
                                <textarea className="form-control" id="exampleFormControlTextarea" rows="3"
                                  defaultValue="Hi I'm Anna Adame, It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same family."></textarea>
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="hstack gap-2 justify-content-end">
                                <button type="submit" className="btn btn-primary">Updates</button>
                                <button type="button" className="btn btn-soft-danger">Cancel</button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </TabPane>

                                        <TabPane tabId="2">
                                            <Form>
                                                <Row className="g-2">
                                                    <Col lg={4}>
                                                        <div>
                                                            <Label htmlFor="oldpasswordInput" className="form-label">Old
                                                                Password*</Label>
                                                            <Input type="password" className="form-control"
                                                                id="oldpasswordInput"
                                                                placeholder="Enter current password" />
                                                        </div>
                                                    </Col>

                                                    <Col lg={4}>
                                                        <div>
                                                            <Label htmlFor="newpasswordInput" className="form-label">New
                                                                Password*</Label>
                                                            <Input type="password" className="form-control"
                                                                id="newpasswordInput" placeholder="Enter new password" />
                                                        </div>
                                                    </Col>

                                                    <Col lg={4}>
                                                        <div>
                                                            <Label htmlFor="confirmpasswordInput" className="form-label">Confirm
                                                                Password*</Label>
                                                            <Input type="password" className="form-control"
                                                                id="confirmpasswordInput"
                                                                placeholder="Confirm password" />
                                                        </div>
                                                    </Col>

                                                    <Col lg={12}>
                                                        <div className="mb-3">
                                                            <Link to="#"
                                                                className="link-primary text-decoration-underline">Forgot
                                                                Password ?</Link>
                                                        </div>
                                                    </Col>

                                                    <Col lg={12}>
                                                        <div className="text-end">
                                                            <button type="button" className="btn btn-primary">Change
                                                                Password</button>
                                                        </div>
                                                    </Col>

                                                </Row>

                                            </Form>
                                            <div className="mt-4 mb-3 border-bottom pb-2">
                                                <div className="float-end">
                                                    <Link to="#" className="link-primary">All Logout</Link>
                                                </div>
                                                <h5 className="card-title">Login History</h5>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="flex-shrink-0 avatar-sm">
                                                    <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                        <i className="ri-smartphone-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>iPhone 12 Pro</h6>
                                                    <p className="text-muted mb-0">Los Angeles, United States - March 16 at
                                                        2:47PM</p>
                                                </div>
                                                <div>
                                                    <Link to="#">Logout</Link>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="flex-shrink-0 avatar-sm">
                                                    <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                        <i className="ri-tablet-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Apple iPad Pro</h6>
                                                    <p className="text-muted mb-0">Washington, United States - November 06
                                                        at 10:43AM</p>
                                                </div>
                                                <div>
                                                    <Link to="#">Logout</Link>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="flex-shrink-0 avatar-sm">
                                                    <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                        <i className="ri-smartphone-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Galaxy S21 Ultra 5G</h6>
                                                    <p className="text-muted mb-0">Conneticut, United States - June 12 at
                                                        3:24PM</p>
                                                </div>
                                                <div>
                                                    <Link to="#">Logout</Link>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0 avatar-sm">
                                                    <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                        <i className="ri-macbook-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Dell Inspiron 14</h6>
                                                    <p className="text-muted mb-0">Phoenix, United States - July 26 at
                                                        8:10AM</p>
                                                </div>
                                                <div>
                                                    <Link to="#">Logout</Link>
                                                </div>
                                            </div>
                                        </TabPane>

                                        <TabPane tabId="3">
                                            <form>
                                                <div id="newlink">
                                                    <div id="1">
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="jobTitle" className="form-label">Job
                                                                        Title</Label>
                                                                    <Input type="text" className="form-control"
                                                                        id="jobTitle" placeholder="Job title"
                                                                        defaultValue="Lead Designer / Developer" />
                                                                </div>
                                                            </Col>

                                                            <Col lg={6}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="companyName" className="form-label">Company
                                                                        Name</Label>
                                                                    <Input type="text" className="form-control"
                                                                        id="companyName" placeholder="Company name"
                                                                        defaultValue="Themesbrand" />
                                                                </div>
                                                            </Col>

                                                            <Col lg={6}>
                                                                <div className="mb-3">
                                                                    <label htmlFor="experienceYear"
                                                                        className="form-label">Experience Years</label>
                                                                    <Row>
                                                                        <Col lg={5}>
                                                                            <select className="form-control" data-choices
                                                                                data-choices-search-false
                                                                                name="experienceYear"
                                                                                id="experienceYear">
                                                                                <option defaultValue="">Select years</option>
                                                                                <option value="Choice 1">2001</option>
                                                                                <option value="Choice 2">2002</option>
                                                                                <option value="Choice 3">2003</option>
                                                                                <option value="Choice 4">2004</option>
                                                                                <option value="Choice 5">2005</option>
                                                                                <option value="Choice 6">2006</option>
                                                                                <option value="Choice 7">2007</option>
                                                                                <option value="Choice 8">2008</option>
                                                                                <option value="Choice 9">2009</option>
                                                                                <option value="Choice 10">2010</option>
                                                                                <option value="Choice 11">2011</option>
                                                                                <option value="Choice 12">2012</option>
                                                                                <option value="Choice 13">2013</option>
                                                                                <option value="Choice 14">2014</option>
                                                                                <option value="Choice 15">2015</option>
                                                                                <option value="Choice 16">2016</option>
                                                                                <option value="Choice 17" >2017</option>
                                                                                <option value="Choice 18">2018</option>
                                                                                <option value="Choice 19">2019</option>
                                                                                <option value="Choice 20">2020</option>
                                                                                <option value="Choice 21">2021</option>
                                                                                <option value="Choice 22">2022</option>
                                                                            </select>
                                                                        </Col>

                                                                        <div className="col-auto align-self-center">
                                                                            to
                                                                        </div>

                                                                        <Col lg={5}>
                                                                            <select className="form-control" data-choices
                                                                                data-choices-search-false
                                                                                name="choices-single-default2">
                                                                                <option defaultValue="">Select years</option>
                                                                                <option value="Choice 1">2001</option>
                                                                                <option value="Choice 2">2002</option>
                                                                                <option value="Choice 3">2003</option>
                                                                                <option value="Choice 4">2004</option>
                                                                                <option value="Choice 5">2005</option>
                                                                                <option value="Choice 6">2006</option>
                                                                                <option value="Choice 7">2007</option>
                                                                                <option value="Choice 8">2008</option>
                                                                                <option value="Choice 9">2009</option>
                                                                                <option value="Choice 10">2010</option>
                                                                                <option value="Choice 11">2011</option>
                                                                                <option value="Choice 12">2012</option>
                                                                                <option value="Choice 13">2013</option>
                                                                                <option value="Choice 14">2014</option>
                                                                                <option value="Choice 15">2015</option>
                                                                                <option value="Choice 16">2016</option>
                                                                                <option value="Choice 17">2017</option>
                                                                                <option value="Choice 18">2018</option>
                                                                                <option value="Choice 19">2019</option>
                                                                                <option value="Choice 20">2020</option>
                                                                                <option value="Choice 21">2021</option>
                                                                                <option value="Choice 22">2022</option>
                                                                            </select>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </Col>

                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="jobDescription" className="form-label">Job
                                                                        Description</Label>
                                                                    <Input type='textarea'
                                                                        className="form-control"
                                                                        value={'write'}
                                                                        rows="3"
                                                                        placeholder="Enter description"
                                                                        onChange={(e) => textArea(e)}
                                                                    />

                                                                </div>
                                                            </Col>

                                                            <div className="hstack gap-2 justify-content-end">
                                                                <Link className="btn btn-primary"
                                                                    to="#">Delete</Link>
                                                            </div>
                                                        </Row>
                                                    </div>
                                                </div>
                                                <div id="newForm" style={{ "display": "none" }}>
                                                </div>

                                                <Col lg={12}>
                                                    <div className="hstack gap-2">
                                                        <button type="submit" className="btn btn-success">Update</button>
                                                        <Link to="#" className="btn btn-primary">Add
                                                            New</Link>
                                                    </div>
                                                </Col>
                                            </form>
                                        </TabPane>

                                        <TabPane tabId="4">
                                            <div className="mb-4 pb-2">
                                                <h5 className="card-title text-decoration-underline mb-3">Security:</h5>
                                                <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0">
                                                    <div className="flex-grow-1">
                                                        <h6 className="fs-14 mb-1">Two-factor Authentication</h6>
                                                        <p className="text-muted">Two-factor authentication is an enhanced
                                                            security meansur. Once enabled, you'll be required to give
                                                            two types of identification when you log into Google
                                                            Authentication and SMS are Supported.</p>
                                                    </div>
                                                    <div className="flex-shrink-0 ms-sm-3">
                                                        <Link to="#"
                                                            className="btn btn-sm btn-primary">Enable Two-facor
                                                            Authentication</Link>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                                                    <div className="flex-grow-1">
                                                        <h6 className="fs-14 mb-1">Secondary Verification</h6>
                                                        <p className="text-muted">The first factor is a password and the
                                                            second commonly includes a text with a code sent to your
                                                            smartphone, or biometrics using your fingerprint, face, or
                                                            retina.</p>
                                                    </div>
                                                    <div className="flex-shrink-0 ms-sm-3">
                                                        <Link to="#" className="btn btn-sm btn-primary">Set
                                                            up secondary method</Link>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                                                    <div className="flex-grow-1">
                                                        <h6 className="fs-14 mb-1">Backup Codes</h6>
                                                        <p className="text-muted mb-sm-0">A backup code is automatically
                                                            generated for you when you turn on two-factor authentication
                                                            through your iOS or Android Twitter app. You can also
                                                            generate a backup code on twitter.com.</p>
                                                    </div>
                                                    <div className="flex-shrink-0 ms-sm-3">
                                                        <Link to="#"
                                                            className="btn btn-sm btn-primary">Generate backup codes</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <h5 className="card-title text-decoration-underline mb-3">Application Notifications:</h5>
                                                <ul className="list-unstyled mb-0">
                                                    <li className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <label htmlFor="directMessage"
                                                                className="form-check-label fs-14">Direct messages</label>
                                                            <p className="text-muted">Messages from people you follow</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input className="form-check-input" type="checkbox"
                                                                    role="switch" id="directMessage" defaultChecked />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex mt-2">
                                                        <div className="flex-grow-1">
                                                            <Label className="form-check-label fs-14"
                                                                htmlFor="desktopNotification">
                                                                Show desktop notifications
                                                            </Label>
                                                            <p className="text-muted">Choose the option you want as your
                                                                default setting. Block a site: Next to "Not allowed to
                                                                send notifications," click Add.</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input className="form-check-input" type="checkbox"
                                                                    role="switch" id="desktopNotification" defaultChecked />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex mt-2">
                                                        <div className="flex-grow-1">
                                                            <Label className="form-check-label fs-14"
                                                                htmlFor="emailNotification">
                                                                Show email notifications
                                                            </Label>
                                                            <p className="text-muted"> Under Settings, choose Notifications.
                                                                Under Select an account, choose the account to enable
                                                                notifications for. </p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input className="form-check-input" type="checkbox"
                                                                    role="switch" id="emailNotification" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex mt-2">
                                                        <div className="flex-grow-1">
                                                            <Label className="form-check-label fs-14"
                                                                htmlFor="chatNotification">
                                                                Show chat notifications
                                                            </Label>
                                                            <p className="text-muted">To prevent duplicate mobile
                                                                notifications from the Gmail and Chat apps, in settings,
                                                                turn off Chat notifications.</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input className="form-check-input" type="checkbox"
                                                                    role="switch" id="chatNotification" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex mt-2">
                                                        <div className="flex-grow-1">
                                                            <Label className="form-check-label fs-14"
                                                                htmlFor="purchaesNotification">
                                                                Show purchase notifications
                                                            </Label>
                                                            <p className="text-muted">Get real-time purchase alerts to
                                                                protect yourself from fraudulent charges.</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input className="form-check-input" type="checkbox"
                                                                    role="switch" id="purchaesNotification" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="card-title text-decoration-underline mb-3">Delete This
                                                    Account:</h5>
                                                <p className="text-muted">Go to the Data & Privacy section of your profile
                                                    Account. Scroll to "Your data & privacy options." Delete your
                                                    Profile Account. Follow the instructions to delete your account :
                                                </p>
                                                <div>
                                                    <Input type="password" className="form-control" id="passwordInput"
                                                        placeholder="Enter your password" defaultValue="make@321654987"
                                                        style={{ maxWidth: "265px" }} />
                                                </div>
                                                <div className="hstack gap-2 mt-3">
                                                    <Link to="#" className="btn btn-soft-danger">Close &
                                                        Delete This Account</Link>
                                                    <Link to="#" className="btn btn-light">Cancel</Link>
                                                </div>
                                            </div>
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Settings;