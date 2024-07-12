import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { mockTicket } from './mockData'; // Import the mock data

const TicketDescription = () => {
    const { ticketId } = useParams(); // Assuming you're using React Router to get the ticket ID from the URL
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                // Simulate a network request delay
                await new Promise(resolve => setTimeout(resolve, 1));
                // Use mock data instead of an API call
                setTicket(mockTicket);

                // const response = await axios.get(`/api/tickets/${ticketId}`); // Update with your API endpoint
                // setTicket(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [ticketId]);

    const handleDownload = (file) => {
        const blob = new Blob([file.content], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.name); // Specify the download file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading ticket: {error.message}</div>;
    }

    return (
        <React.Fragment>
            <Col xxl={12}>
                <Card>
                    <CardBody className="p-4">
                        <h5 className="fw-semibold text-uppercase mb-3">Ticket Description</h5>
                        <p className="text-muted">
                            {ticket ? ticket.description : 'No description available.'}
                            {/* <Link to="#" className="link-primary text-decoration-underline">Example</Link> */}
                        </p>
                    </CardBody>

                    <CardBody>
                        <h6 className="card-title fw-semibold text-uppercase mb-3">Files Attachment</h6>
                        {ticket && ticket.attachments && ticket.attachments.map((file, index) => (
                            <div key={index} className="d-flex align-items-center border border-dashed p-2 rounded mt-2">
                                <div className="flex-shrink-0 avatar-sm">
                                    <div className="avatar-title bg-light rounded">
                                        <i className={`ri-file-${file.type}-line fs-20 text-primary`}></i>
                                    </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1"><Link to="#">{file.name}</Link></h6>
                                    <small className="text-muted">{file.size}</small>
                                </div>
                                <div className="hstack gap-3 fs-16">
                                    <Link to="#" className="text-muted" onClick={() => handleDownload(file)}>
                                        <i className="ri-download-2-line"></i>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default TicketDescription;
