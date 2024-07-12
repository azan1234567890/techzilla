import React, { useRef, useState } from 'react';
import { Col, Row } from 'reactstrap';
import Flatpickr from "react-flatpickr";

const Section = (props) => {
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

    return (
        <React.Fragment>
            <Row className="mb-3 pb-1">
                <Col xs={12}>
                    <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                        <div className="flex-grow-1">
                            <h1 className="fs-16 mb-1"><b>Welcome To AI Enhance</b></h1>
                            {/* <p className="text-muted mb-0">Here's what's happening with your store today.</p> */}
                        </div>
                        <div className="mt-3 mt-lg-0">
                            <form action="#">
                                <Row className="g-3 mb-0 align-items-center">
                                    <div className="col-sm-auto">
                                        <div className="input-group">
                                        
                                            <Flatpickr
                                                ref={datepickerRef}
                                                className="form-control"
                                                options={{
                                                    mode: "range",
                                                    dateFormat: "d M, Y",
                                                    defaultDate: ["01 Jan 2022", "31 Jan 2022"]
                                                }}
                                                onClick={handleIconClick}
                                            />
                                            <div 
                                                className="input-group-text bg-primary border-primary text-white" 
                                                onClick={handleIconClick}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <i className="ri-calendar-2-fill" onClick={handleIconClick}></i>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Section;
