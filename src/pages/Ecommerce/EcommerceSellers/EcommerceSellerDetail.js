import React, { useEffect, useState, useMemo } from "react";

import "./styles.css";

import {
  CardBody,
  Container,
  Progress,
  Row,
  Col,
  Card,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
} from "reactstrap";

//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";

import Img2 from "../../../assets/images/companies/img-2.png";
import ReviewSlider from "../../../Components/Common/ReviewSlider";
import TableContainer from "../../../Components/Common/TableContainer";
//Import actions
import { getProducts as onGetProducts } from "../../../slices/thunks";


import {
  Rating,
  Published,
  Price,
} from "../EcommerceProducts/EcommerceProductCol";

import Revenue from "../../DashboardEcommerce/Revenue";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";

const EcommerceSellerDetail = () => {
  
  document.title = "AI Assistants | Velzon - React Admin & Dashboard Template"; // Meta title

  const [activeTab, setActiveTab] = useState('model');
  const [selectedAssistant, setSelectedAssistant] = useState('Mary');

  const assistants = ['Mary', 'John', 'Alice']; // Example list of assistants

  const renderContent = () => {
    switch (activeTab) {
      case 'model':
        return <div>Model Content</div>;
      case 'transcriber':
        return <div>Transcriber Content</div>;
      case 'voice':
        return <div>Voice Content</div>;
      case 'functions':
        return <div>Functions Content</div>;
      case 'advanced':
        return <div>Advanced Content</div>;
      case 'analysis':
        return <div>Analysis Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="page-content" style={{ overflowY: 'hidden', height: '100vh' }}>
      <Container fluid={true}>
        <BreadCrumb title="AI Assistants" breadcrumbItem="AI Assistants" />
        <Row>

          <Col md={3} className="left-column">
          <Card style= {{padding: '20px'}}> 
            <button className="create-assistant-btn">Create Assistant</button>
            <ul className="assistants-list">
              {assistants.map((assistant, index) => (
                <li 
                  key={index} 
                  className={selectedAssistant === assistant ? 'active' : ''}
                  onClick={() => setSelectedAssistant(assistant)}
                >
                  {assistant}
                </li>
              ))}
            </ul>
            </Card>
          </Col>

          <Col md={9}>
          <Card style= {{padding: '20px'}}>
            <div className="header-section">
              <h1>{selectedAssistant}</h1>
              <div className="header-buttons">
                <button className="talk-with-assistant-btn">Talk with {selectedAssistant}</button>
              </div>
            </div>
            <div className="metrics-section">
              <div className="metric">
                <span>Cost</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '40%' }}></div>
                </div>
                <span>~$0.13 /min</span>
              </div>
              <div className="metric">
                <span>Latency</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '70%' }}></div>
                </div>
                <span>~1650 ms</span>
              </div>
            </div>
            <div className="tabs">
              <ul className="tabs-list">
                <li onClick={() => setActiveTab('model')} className={activeTab === 'model' ? 'active' : ''}>Model</li>
                <li onClick={() => setActiveTab('transcriber')} className={activeTab === 'transcriber' ? 'active' : ''}>Transcriber</li>
                <li onClick={() => setActiveTab('voice')} className={activeTab === 'voice' ? 'active' : ''}>Voice</li>
                <li onClick={() => setActiveTab('functions')} className={activeTab === 'functions' ? 'active' : ''}>Functions</li>
                <li onClick={() => setActiveTab('advanced')} className={activeTab === 'advanced' ? 'active' : ''}>Advanced</li>
                <li onClick={() => setActiveTab('analysis')} className={activeTab === 'analysis' ? 'active' : ''}>Analysis</li>
              </ul>
              <div className="tab-content">
                {renderContent()}
              </div>
            </div>
            <div className="publish-section">
              <button className="publish-btn">Publish</button>
            </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default EcommerceSellerDetail;
