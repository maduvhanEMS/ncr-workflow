import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isSuccess: false,
  data: [
    {
      id: 1,
      status: "Initiated",
      color: "black",
      descrtiption:
        "Propellant failure. Failed to meet relative dynamic vivacity",
      priorityLevel: "",
      details: [],
      files: [],
    },
    {
      id: 2,
      status: "In Progress",
      color: "purple",
      descrtiption: "Performance above specifation",
      priorityLevel: "Medium",
      details: [
        {
          name: "Heinrich",
          department: "QA",
          status: "Completed",
        },
        { name: "Saajidah", department: "OPS", status: "Pending" },
        { name: "Peter", department: "PD", status: "Pending" },
      ],
      files: [],
    },
    {
      id: 3,
      status: "In Progress",
      color: "red",
      descrtiption:
        "From web development to data science, Python offers an incredibly diverse set of tools. Its easy-to-read syntax and quick learning curve makes it a popular language but it lacks the divers",
      priorityLevel: "low",
      details: [
        {
          name: "Heinrich",
          department: "QA",
          status: "Pending",
        },
        { name: "Saajidah", department: "OPS", status: "Pending" },
        {
          name: "Peter",
          department: "PD",
          status: "Completed",
        },
      ],
      files: [],
    },
  ],
};

export const ncrSlice = createSlice({
  name: "ncr",
  initialState,
  reducers: {
    updateNCR: (state, action) => {
      const { status, id } = action.payload;
      state.data[id].status = status;
    },
    AssignNCR: (state, action) => {
      // state.isSuccess = true;
      const { id, details, files, priority } = action.payload;
      const index = state.data.findIndex((item) => item.id === parseInt(id));
      state.data[index].status = "In Progress";
      state.data[index].details = details;
      state.data[index].files = files;
      state.data[index].priorityLevel = priority;
    },
    reset: (state) => (state.isSuccess = false),
  },
});

export const { updateNCR, AssignNCR, reset } = ncrSlice.actions;
export default ncrSlice.reducer;
