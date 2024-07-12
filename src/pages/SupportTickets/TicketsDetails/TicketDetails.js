import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Table } from 'reactstrap';

import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar10 from "../../../assets/images/users/avatar-10.jpg";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";

const TicketDetails = () => {
    return (
        <React.Fragment>
            <Col xxl={3}>
                <Card>
                    <CardHeader>
                        <h5 className="card-title mb-0">Ticket Details</h5>
                    </CardHeader>
                    <CardBody>
                        <div className="table-responsive table-card">
                            <Table className="table-borderless align-middle mb-0">
                                <tbody>
                                    <tr>
                                        <td className="fw-medium">Ticket ID</td>
                                        <td>#VLZ<span id="t-no">135</span></td>
                                    </tr>
                                   
                                   
                                   
                                    <tr>
                                        <td className="fw-medium">Status:</td>
                                       
                                    </tr>
                                    <tr>
                                        <td className="fw-medium">Priority</td>
                                        <td>
                                            <span className="badge bg-danger" id="t-priority">High</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="fw-medium">Create Date</td>
                                        <td id="c-date">20 Dec, 2021</td>
                                    </tr>
                                    
                                    
                                </tbody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>
               
            </Col>
        </React.Fragment>
    );
};

export default TicketDetails;