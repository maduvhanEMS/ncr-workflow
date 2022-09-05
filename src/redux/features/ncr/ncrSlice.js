import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [
    {
      status: "Initiated",
      color: "black",
      descrtiption:
        "Propellant failure. Failed to meet relative dynamic vivacity",
      priorityLevel: "high",
      data: [
        { name: "Maduvha", department: "QA", status: "Completed" },
        { name: "Thabiso", department: "OPS", status: "Completed" },
        { name: "Estian", department: "PD", status: "Pending" },
      ],
    },
    {
      status: "In Progress",
      color: "purple",
      descrtiption: "Performance above specifation",
      priorityLevel: "Medium",
      data: [
        {
          name: "Heinrich",
          department: "QA",
          status: "Completed",
        },
        { name: "Saajidah", department: "OPS", status: "Pending" },
        { name: "Peter", department: "PD", status: "Pending" },
      ],
    },
    {
      status: "In Progress",
      color: "red",
      descrtiption:
        "From web development to data science, Python offers an incredibly diverse set of tools. Its easy-to-read syntax and quick learning curve makes it a popular language but it lacks the divers",
      priorityLevel: "low",
      data: [
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
  },
});

export const { updateNCR } = ncrSlice.actions;
export default ncrSlice.reducer;
