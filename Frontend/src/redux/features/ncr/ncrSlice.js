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
      characteristics: [
        {
          characteristics: "",
          specification: "",
          results: "",
          classification: "",
        },
      ],
      details: [
        {
          name: "",
          department: "",
          status: "Not Started",
          createdAt: Date.now(),
          comments: "",
          correctiveActions: "",
          decision: "",
        },
      ],
      files: [],
      affectedInformation: {
        safety: false,
        strength: false,
        systemPerformance: false,
        maintainability: false,
        interchangeability: false,
        reliability: false,
        specification: false,
      },
      createdAt: Date.now(),
    },
    {
      id: 2,
      status: "Initiated",
      partDescription: "Propellant S365",
      productName: "Propellant S365",
      nonConformance: "Performance above specifation",
      priorityLevel: "",
      characteristics: [
        {
          characteristics: "",
          specification: "",
          results: "",
          classification: "",
        },
      ],
      details: [
        {
          name: "",
          department: "",
          status: "Not Started",
          createdAt: Date.now(),
          comments: "",
          correctiveActions: "",
          decision: "",
        },
      ],
      files: [],
      createdAt: Date.now(),
    },
    {
      id: 3,
      status: "Initiated",
      partDescription: "Propellant S265",
      productName: "Propellant S265",
      nonConformance:
        "From web development to data science, Python offers an incredibly diverse set of tools. Its easy-to-read syntax and quick learning curve makes it a popular language but it lacks the divers",
      priorityLevel: "low",
      characteristics: [
        {
          characteristics: "",
          specification: "",
          results: "",
          classification: "",
        },
      ],
      details: [
        {
          name: "",
          department: "",
          status: "",
          createdAt: Date.now(),
          comments: "",
          correctiveActions: "",
          decision: "",
        },
      ],
      files: [],
      createdAt: Date.now(),
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
      console.log("actions");
      // state.isSuccess = true;
      const { id, details, files, priorityLevel, characteristics } =
        action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      state.data[index].status = "In Progress";
      state.data[index].details = details;
      state.data[index].files = files;
      state.data[index].characteristics = characteristics;
      state.data[index].priorityLevel = priorityLevel;
    },
    reset: (state) => (state.isSuccess = false),
  },
});

export const { updateNCR, AssignNCR, reset, addNCR } = ncrSlice.actions;
export default ncrSlice.reducer;
