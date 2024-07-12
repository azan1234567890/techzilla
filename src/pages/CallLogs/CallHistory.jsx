import React from 'react';

const CallHistory = ({ filteredLogs, handleLogClick, selectedLog }) => (
  <div className="call-history">
    <ul className="list-group">
      {filteredLogs.map((log, index) => (
        <li
          key={log.id}
          className="list-group-item"
          onClick={() => handleLogClick(log)}
          style={{
            cursor: "pointer",
            backgroundColor: selectedLog && selectedLog.id === log.id ? "#16214beb" : "inherit",
            borderRadius: '6px',
            marginBottom: index !== filteredLogs.length - 1 ? '5px' : 0,
            border: 'none',
          }}
        >
          Call ID: {log.id}
        </li>
      ))}
    </ul>
  </div>
);

export default CallHistory;
