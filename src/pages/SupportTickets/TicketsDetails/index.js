import React from 'react';
import { Container, Row } from 'reactstrap';

import Section from './Section';
import TicketDescription from './TicketDescription';
import TicketDetails from './TicketDetails';


const TicketsDetaiks = () => {
    document.title = "TICKET DETAILS | AI ENHANCE";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Section />
                    </Row>
                    <Row>
                        <TicketDescription />
                       
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default TicketsDetaiks;