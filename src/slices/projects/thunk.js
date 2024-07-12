import { createAsyncThunk } from '@reduxjs/toolkit';
import {  setSelectedFiles,
  addUploadedFiles,
  setSelectedFileId,
  setError,
  setCopySuccess,
  deleteFile} from './reducer';
import axios from 'axios';

// const placeholderUploadURL = 'https://jsonplaceholder.typicode.com/posts';

export const uploadFilesToServer = createAsyncThunk(
  'projects/uploadFilesToServer',
  async (files, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });
      // URL of backend server here!
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export { setSelectedFiles,
  addUploadedFiles,
  setSelectedFileId,
  setError,
  setCopySuccess,
  deleteFile};




















// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { setSelectedFileId, setCopySuccess } from './reducer';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Placeholder URL for backend
// const BACKEND_URL = 'http://example.com/api/files';

// // Async thunk for file upload
// export const uploadFiles = createAsyncThunk(
//   'files/uploadFiles',
//   async (files, { rejectWithValue }) => {
//     try {
//       return files.map(file => ({
//         id: Date.now() + Math.random(),
//         name: file.name,
//         size: file.size,
//         type: file.type,
//         url: URL.createObjectURL(file),
//         createdAt: new Date().toLocaleString(),
//       }));
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Async thunk for file deletion
// export const deleteFile = createAsyncThunk(
//   'files/deleteFile',
//   async (id, { rejectWithValue }) => {
//     try {
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Import project-related helper functions
// import {
//   getProjectList as getProjectListApi,
//   addProjectList as addProjectListApi,
//   updateProjectList as updateProjectListApi,
//   deleteProjectList as deleteProjectListApi
// } from "../../helpers/fakebackend_helper";

// // Async thunks for project list
// export const getProjectList = createAsyncThunk("projects/getProjectList", async () => {
//   try {
//     const response = await getProjectListApi();
//     return response;
//   } catch (error) {
//     return error;
//   }
// });

// export const addProjectList = createAsyncThunk("projects/addProjectList", async (project) => {
//   try {
//     const response = await addProjectListApi(project);
//     const data = await response;
//     toast.success("Project list Added Successfully", { autoClose: 3000 });
//     return data;
//   } catch (error) {
//     toast.error("Project list Addition Failed", { autoClose: 3000 });
//     return error;
//   }
// });

// export const updateProjectList = createAsyncThunk("projects/updateProjectList", async (project) => {
//   try {
//     const response = await updateProjectListApi(project);
//     const data = await response;
//     toast.success("Project list Updated Successfully", { autoClose: 3000 });
//     return data;
//   } catch (error) {
//     toast.error("Project list Update Failed", { autoClose: 3000 });
//     return error;
//   }
// });

// export const deleteProjectList = createAsyncThunk("projects/deleteProjectList", async (data) => {
//   try {
//     const response = await deleteProjectListApi(data);
//     const newdata = await response;
//     toast.success("Project list Deleted Successfully", { autoClose: 3000 });
//     return newdata;
//   } catch (error) {
//     toast.error("Project list Deletion Failed", { autoClose: 3000 });
//     return error;
//   }
// });

// export { setSelectedFileId, setCopySuccess };
