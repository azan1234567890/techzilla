import React, {useState, useEffect} from 'react';
import {Col, Row, Container, Card} from 'reactstrap';
import "./styles.css";
import BreadCrumb from '../../Components/Common/BreadCrumb';

const AIAssistants = () => {
    document.title = "AI Assistants | Dashboard";

    const [progressData, setProgressData] = useState({
      cost: [20, 30, 10, 40],
      latency: [15, 25, 10, 50],
    });
  
    useEffect(() => {
      const fetchMockData = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const mockData = {
              cost: [40, 25, 20, 15],
              latency: [10, 20, 30, 40],
            };
            resolve(mockData);
          }, 1000);
        });
      };
  
      const fetchData = async () => {
        const data = await fetchMockData();
        setProgressData(data);
      };
  
      fetchData();
    }, []);

    const [activeTab, setActiveTab] = useState('model');
    const [selectedAssistant, setSelectedAssistant] = useState('Mary');
    const assistants = ['Mary', 'John', 'Alice']; 

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
            <Container fluid={true} style={{height: '100%'}}>
                <BreadCrumb title="AI Assistants" breadcrumbItem="AI Assistants" />
                <Row style={{height: 'calc(100% - 60px)'}}>
                    <Col md={3} className="left-column">
                        <Card className='d-flex flex-column' style={{height: '100%', padding: '20px'}}> 
                            <button type='button' className="create-assistant-btn btn btn-primary">Select Assistant</button>
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
                        <Card style={{padding: '20px', height: '100%'}}>
                            <div className="header-section">
                                <h1>{selectedAssistant}</h1>
                                <div className="header-buttons">
                                    <button className="talk-with-assistant-btn btn btn-primary">Talk with {selectedAssistant}</button>
                                </div>
                            </div>
                            <div className="legend">
                                <div className="legend-item">
                                    <span className="circle" style={{ backgroundColor: '#20c997' }}></span> Fixed Cost
                                </div>
                                <div className="legend-item">
                                    <span className="circle" style={{ backgroundColor: '#ff7f50' }}></span> deepgram
                                </div>
                                <div className="legend-item">
                                    <span className="circle" style={{ backgroundColor: '#6495ed' }}></span> gpt-3.5 turbo
                                </div>
                                <div className="legend-item">
                                    <span className="circle" style={{ backgroundColor: '#ffd700' }}></span> 11labs
                                </div>
                            </div>
                            <div className="metrics-section">
                                <div className="metric">
                                    <span>Cost</span>
                                    <div className="progress-bar">
                                        {progressData.cost.map((width, index) => (
                                            <div
                                                key={index}
                                                className="progress"
                                                style={{ width: `${width}%`, backgroundColor: getColor(index) }}
                                                onMouseOver={() => showTooltip(index, 'cost')}
                                                onMouseOut={hideTooltip}
                                            >
                                                {/* <div className="tooltip" id={`tooltip-cost-${index}`}  data-tooltip-pos="down" data-tooltip-length="fit">
                                                    TTS: {getTooltipLabel(index)} Cost (USD): {calculateCost(width)}
                                                </div> */}
                                            </div>
                                        ))}
                                    </div>
                                    <span>~$0.13 /min</span>
                                </div>
                                <div className="metric">
                                    <span>Latency</span>
                                    <div className="progress-bar">
                                        {progressData.latency.map((width, index) => (
                                            <div
                                                key={index}
                                                className="progress"
                                                style={{ width: `${width}%`, backgroundColor: getColor(index) }}
                                                onMouseOver={() => showTooltip(index, 'latency')}
                                                onMouseOut={hideTooltip}
                                            >
                                                <div className="tooltip" id={`tooltip-latency-${index}`}>
                                                    Latency: {getTooltipLabel(index)} (ms)
                                                </div>
                                            </div>
                                        ))}
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
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const getColor = (index) => {
    const colors = ['#20c997', '#ff7f50', '#6495ed', '#ffd700'];
    return colors[index % colors.length];
};

const getTooltipLabel = (index) => {
    const labels = ['Fixed Cost', 'deepgram', 'gpt-3.5 turbo', '11labs'];
    return labels[index % labels.length];
};

const calculateCost = (width) => {
    return (width * 0.13).toFixed(3); 
};

const showTooltip = (index, type) => {
    const tooltip = document.getElementById(`tooltip-${type}-${index}`);
    if (tooltip) {
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = 1;
    }
};

const hideTooltip = () => {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = 0;
    });
};

export default AIAssistants;
