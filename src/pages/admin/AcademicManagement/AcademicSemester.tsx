import { useGetAcademicSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
   const { data, isLoading, isError } = useGetAcademicSemesterQuery(undefined);
   console.log(data);
   return (
      <div>
         <h1>This is our academic semester Page!!!</h1>
      </div>
   );
};

export default AcademicSemester;
