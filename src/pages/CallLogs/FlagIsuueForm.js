// FlagIssueForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { flagIssue } from "../../slices/callLogsSlice";

const FlagIssueForm = ({ logId }) => {
  const dispatch = useDispatch();
  const [issue, setIssue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(flagIssue({ logId, issue }));
    setIssue(""); // Clear the form
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        placeholder="Describe the issue..."
        required
      />
      <button type="submit">Flag Issue</button>
    </form>
  );
};

export default FlagIssueForm;
