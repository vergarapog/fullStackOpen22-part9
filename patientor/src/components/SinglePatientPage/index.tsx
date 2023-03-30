import { Patient } from "../../types";

interface SinglePatientPageProps {
  singlePatient: Patient | null;
}

const SinglePatientPage = ({ singlePatient }: SinglePatientPageProps) => {
  return singlePatient ? (
    <div>
      <h1>{singlePatient.name}</h1>
      <p>ssn: {singlePatient.ssn}</p>
      <p>occupation: {singlePatient.occupation}</p>
    </div>
  ) : (
    <div>Patient not found</div>
  );
};

export default SinglePatientPage;
