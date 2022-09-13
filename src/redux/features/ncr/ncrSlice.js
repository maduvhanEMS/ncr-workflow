import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isSuccess: false,
  data: [
    {
      id: 1,
      status: "Initiated",
      partDescription: "HEDP Body",
      productName: "40mm",
      nonConformance:
        "Propellant failure. Failed to meet relative dynamic vivacity",
      priorityLevel: "",
      details: [],
      files: [],
    },
    {
      id: 2,
      status: "In Progress",
      partDescription: "Propellant S365",
      productName: "Propellant S365",
      nonConformance: "Performance above specifation",
      priorityLevel: "Medium",
      details: [
        {
          name: "Heinrich",
          department: "QA",
          status: "Completed",
        },
        { name: "Saajidah", department: "OPS", status: "Checked out" },
        { name: "Peter", department: "PD", status: "Not Started" },
      ],
      files: [],
    },
    {
      id: 3,
      status: "In Progress",
      partDescription: "Propellant S265",
      productName: "Propellant S265",
      nonConformance:
        "From web development to data science, Python offers an incredibly diverse set of tools. Its easy-to-read syntax and quick learning curve makes it a popular language but it lacks the divers",
      priorityLevel: "low",
      details: [
        {
          name: "Heinrich",
          department: "QA",
          status: "Checked out",
        },
        { name: "Saajidah", department: "OPS", status: "Checked out" },
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
    addNCR: (state, action) => {
      state.data.push(action.payload);
    },
    updateNCR: (state, action) => {
      const { status, id } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      state.data[index].status = status;
    },

    AssignNCR: (state, action) => {
      // state.isSuccess = true;
      const { id, details, files, priority } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      state.data[index].status = "In Progress";
      state.data[index].details = details;
      state.data[index].files = files;
      state.data[index].priorityLevel = priority;
    },
    reset: (state) => (state.isSuccess = false),
  },
});

export const { updateNCR, AssignNCR, reset, addNCR } = ncrSlice.actions;
export default ncrSlice.reducer;
