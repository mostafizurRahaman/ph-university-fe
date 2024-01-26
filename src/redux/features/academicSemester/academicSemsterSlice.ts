import { createSlice } from "@reduxjs/toolkit";

// ** define a type for initialState of AcademicSemester :

export interface IAcademicSemester {
   _id: string;
   name: string;
   year: string;
   code: string;
   startMonth: string;
   endMonth: string;
   createdAt: string;
   updatedAt: string;
}

interface IInitialState {
   academicSemesters: IAcademicSemester[];
}

// ** Define a academicSemester:
const initialState: IInitialState = {
   academicSemesters: [],
};

const academicSemesterSlice = createSlice({
   name: "academicSemester",
   initialState,
   reducers: {
      postAcademicSemester: (state, action) => {
         state.academicSemesters.push(action.payload);
      },
   },
});

// ** destructure adn export the actions:

export const { postAcademicSemester } = academicSemesterSlice.actions;

// ** export the reducers from slice:
export default academicSemesterSlice.reducer;
