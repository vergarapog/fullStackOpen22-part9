import { Patient } from "../../types";

import { Male, Female } from "@mui/icons-material";

interface SinglePatientPageProps {
  singlePatient: Patient | null;
}

const SinglePatientPage = ({ singlePatient }: SinglePatientPageProps) => {
  return singlePatient ? (
    <div>
      <div>
        <h1>{singlePatient.name}</h1>
        <div>{singlePatient.gender === "male" ? <Male /> : <Female />}</div>
      </div>
      <p>ssn: {singlePatient.ssn}</p>
      <p>occupation: {singlePatient.occupation}</p>
    </div>
  ) : (
    <div>Patient not found</div>
  );
};

export default SinglePatientPage;
