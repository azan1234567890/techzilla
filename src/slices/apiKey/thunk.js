import { createAsyncThunk } from '@reduxjs/toolkit';
import { addApiKey, deleteApiKey, renameApiKey } from './reducer';
// Mock data fetch function
const fetchMockApiKeys = async () => {
  return [
    {
      id: 1,
      name: "Test API Key 1",
      createBy: "User 1",
      apikey: "1234567890abcdef",
      status: "Active",
      create_date: "2023-01-01",
      expiry_date: "2024-01-01"
    },
    {
      id: 2,
      name: "Test API Key 2",
      createBy: "User 2",
      apikey: "abcdef1234567890",
      status: "Inactive",
      create_date: "2022-01-01",
      expiry_date: "2023-01-01"
    }
  ];
};

// Async thunk to fetch API keys
export const fetchApiKeys = createAsyncThunk('apiKeys/fetchApiKeys', async () => {
  const response = await fetchMockApiKeys();
  return response;
});
export  { addApiKey, deleteApiKey, renameApiKey };













// import { createAsyncThunk } from "@reduxjs/toolkit";
// //Include Both Helper File with needed methods
// import {
//     getAPIKey as getAPIKeyApi
// } from "../../helpers/fakebackend_helper";

// export const getAPIKey = createAsyncThunk("apiKey/getAPIKey", async () => {
//     try {
//         const response = getAPIKeyApi();
//         return response;
//     } catch (error) {
//         return error;
//     }
// });

