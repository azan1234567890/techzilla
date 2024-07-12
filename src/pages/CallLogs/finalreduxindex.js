import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { fetchCallLogs, setSearchTerm, selectLog } from "../../slices/thunks";
import SearchBar from "./SearchBar";
import CallHistory from "./CallHistory";
import CallDetails from "./CallDetails";
import CallMetadata from "./CallMetadata";
import SimpleBar from "simplebar-react";
import "./styles.css";
import Waveform from './waveform';

const CallLogs = () => {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.CallLogs.logs);
  const selectedLog = useSelector((state) => state.CallLogs.selectedLog);
  const searchTerm = useSelector((state) => state.CallLogs.searchTerm);
  const [filteredLogs, setFilteredLogs] = useState([]);

  useEffect(() => {
    dispatch(fetchCallLogs());
  }, [dispatch]);

  useEffect(() => {
    if (logs.length > 0 && selectedLog === null) {
      dispatch(selectLog(logs[0].id));
    }
  }, [logs, dispatch]);

  useEffect(() => {
    const filtered = logs.filter((log) =>
      (typeof log.id === 'string' || typeof log.id === 'number') &&
      String(log.id).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLogs(filtered);
  }, [logs, searchTerm]);

  const handleSearch = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleLogClick = (log) => {
    dispatch(selectLog(log.id));
  };

  useEffect(() => {
    document.title = "Call Logs";
  }, []);

  return (
    <div className="page-content" style={{ overflowY: 'hidden', height: '100vh' }}>
      <Container fluid className="call-logs-container">
        <BreadCrumb title="Call Logs" pageTitle="Dashboard" />
        <div className="call-logs-content">
          <div className="call-logs-content2">
            <div className="left-section">
              <div className="search-bar-fixed">
                <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
              </div>
              <SimpleBar style={{ maxHeight: 'calc(100% - 40px)' }}>
                <CallHistory
                  filteredLogs={filteredLogs}
                  handleLogClick={handleLogClick}
                  selectedLog={selectedLog}
                />
              </SimpleBar>
            </div>
            <div className="right-section">
              <SimpleBar autoHide={false} style={{ maxHeight: '100%', width: '100%' }}>
              <div className="right-section">
                <CallDetails selectedLog={selectedLog} />
                <CallMetadata selectedLog={selectedLog} />
              </div>
              </SimpleBar>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CallLogs;