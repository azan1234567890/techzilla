import { createSlice } from '@reduxjs/toolkit';
import { uploadFilesToServer } from './thunk';

const ProjectsSlice = createSlice({
  name: 'ProjectsSlice',
  initialState: {
    selectedFiles: [],
    uploadedFiles: [],
    selectedFileId: null,
    error: '',
    copySuccess: false,
  },
  reducers: {
    setSelectedFiles: (state, action) => {
      state.selectedFiles = action.payload;
    },
    addUploadedFiles: (state, action) => {
      state.uploadedFiles = [...action.payload, ...state.uploadedFiles];
      state.selectedFiles = [];
    },
    setSelectedFileId: (state, action) => {
      state.selectedFileId = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCopySuccess: (state, action) => {
      state.copySuccess = action.payload;
    },
    deleteFile: (state, action) => {
      state.uploadedFiles = state.uploadedFiles.filter(file => file.id !== action.payload);
      if (state.selectedFileId === action.payload) {
        state.selectedFileId = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFilesToServer.fulfilled, (state, action) => {
        state.uploadedFiles = [...action.payload, ...state.uploadedFiles];
      })
      .addCase(uploadFilesToServer.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedFiles,
  addUploadedFiles,
  setSelectedFileId,
  setError,
  setCopySuccess,
  deleteFile,
} = ProjectsSlice.actions;

export default ProjectsSlice.reducer;


























// import { createSlice } from '@reduxjs/toolkit';
// import { uploadFiles, deleteFile } from './thunk';

// const ProjectsSlice = createSlice({
//   name: 'ProjectsSlice',
//   initialState: {
//     selectedFiles: [],
//     uploadedFiles: [],
//     selectedFileId: null,
//     error: '',
//     copySuccess: false,
//   },
//   reducers: {
//     setSelectedFileId(state, action) {
//       state.selectedFileId = action.payload;
//     },
//     setCopySuccess(state, action) {
//       state.copySuccess = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(uploadFiles.fulfilled, (state, action) => {
//         state.uploadedFiles = [...action.payload, ...state.uploadedFiles];
//         state.selectedFiles = [];
//       })
//       .addCase(uploadFiles.rejected, (state, action) => {
//         state.error = action.payload;
//       })
//       .addCase(deleteFile.fulfilled, (state, action) => {
//         state.uploadedFiles = state.uploadedFiles.filter(file => file.id !== action.payload);
//         if (state.selectedFileId === action.payload) {
//           state.selectedFileId = null;
//         }
//       })
//       .addCase(deleteFile.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });

// export const { setSelectedFileId, setCopySuccess } = ProjectsSlice.actions;

// export default ProjectsSlice.reducer;


























// import { createSlice } from "@reduxjs/toolkit";
// import { getProjectList, addProjectList, updateProjectList, deleteProjectList } from './thunk';
// export const initialState = {
//     projectLists: [],
//     error: {},
// };


// const ProjectsSlice = createSlice({
//     name: 'ProjectsSlice',
//     initialState,
//     reducer: {},
//     extraReducers: (builder) => {
//         builder.addCase(getProjectList.fulfilled, (state, action) => {
//             state.projectLists = action.payload;
//         });
//         builder.addCase(getProjectList.rejected, (state, action) => {
//             state.error = action.payload.error || null;
//         });
//         builder.addCase(addProjectList.fulfilled, (state, action) => {
//             state.projectLists.push(action.payload);
//         });
//         builder.addCase(addProjectList.rejected, (state, action) => {
//             state.error = action.payload.error || null;
//         });
//         builder.addCase(updateProjectList.fulfilled, (state, action) => {
//             state.projectLists = state.projectLists.map(project =>
//                 project._id.toString() === action.payload.data._id.toString()
//                     ? { ...project, ...action.payload.data }
//                     : project
//             );
//         });
//         builder.addCase(updateProjectList.rejected, (state, action) => {
//             state.error = action.payload.error || null;
//         });
//         builder.addCase(deleteProjectList.fulfilled, (state, action) => {
//             state.projectLists = state.projectLists.filter(project => project.id.toString() !== action.payload.id.toString());
//         });
//         builder.addCase(deleteProjectList.rejected, (state, action) => {
//             state.error = action.payload.error || null;
//         });
//     }
// });

// export default ProjectsSlice.reducer;