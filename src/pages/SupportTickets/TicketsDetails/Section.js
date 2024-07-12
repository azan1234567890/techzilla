import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import img from "../../../assets/images/companies/img-4.png";
import { mockSection } from './mockData'; 
// import axios from 'axios';

const Section = () => {
    const [ticketData, setTicketData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTicketData = async () => {
            try {
                // mock
                await new Promise(resolve => setTimeout(resolve, 1));
                setTicketData(mockSection);

                // const response = await axios.get(`/api/tickets/${ticketId}`); // Update with your API endpoint
                // setTicketData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTicketData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading ticket data: {error.message}</div>;
    }

    return (
        <React.Fragment>
            <Col lg={12}>
                <Card className="mt-n4 mx-n4 card-border-effect-none mb-n5 border-bottom-0 border-start-0 rounded-0">
                    <div>
                        <CardBody className="pb-4 mb-5">
                            <Row>
                                <div className="col-md">
                                    <Row className="align-items-center">
                                        <div className="col-md-auto">
                                            <div className="avatar-md mb-md-0 mb-4">
                                                <div className="avatar-title bg-white rounded-circle">
                                                    <img src={img} alt="" className="avatar-sm" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md">
                                            <h2 className="fw-semibold" id="ticket-title">
                                                {ticketData ? ticketData.title : 'Loading...'}
                                            </h2>
                                            <div className="hstack gap-3 flex-wrap">
                                                <div className="text-muted">
                                                    Create Date: <span className="fw-medium" id="create-date">
                                                        {ticketData ? ticketData.createDate : 'Loading...'}
                                                    </span>
                                                </div>
                                                <div className="vr"></div>
                                                <div className={`badge rounded-pill fs-12 ${ticketData && ticketData.status === 'New' ? 'bg-info' : 'bg-secondary'}`} id="ticket-status">
                                                    {ticketData ? ticketData.status : 'Loading...'}
                                                </div>
                                                <div className={`badge rounded-pill fs-12 ${ticketData && ticketData.priority === 'High' ? 'bg-danger' : 'bg-secondary'}`} id="ticket-priority">
                                                    {ticketData ? ticketData.priority : 'Loading...'}
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                </div>
                            </Row>
                        </CardBody>
                    </div>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default Section;
