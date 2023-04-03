import { Patient } from "../../types";

import { Male, Female } from "@mui/icons-material";

interface SinglePatientPageProps {
  singlePatient: Patient | null;
}

const SinglePatientPage = ({ singlePatient }: SinglePatientPageProps) => {
  const { name, gender, ssn, occupation, entries } = singlePatient || {};

  return singlePatient ? (
    <div>
      <div>
        <h1>{name}</h1>
        <div>{gender === "male" ? <Male /> : <Female />}</div>
      </div>
      <p>ssn: {ssn}</p>
      <p>occupation: {occupation}</p>

      {entries && entries.length ? (
        <div>
          <h1>entries</h1>
          {entries.map((entry) => {
            return (
              <div>
                {entry.date} {entry.description}
                <ul>
                  {entry.diagnosisCodes?.map((diagnosisCode) => {
                    return <li>{diagnosisCode}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        <div>no entries available</div>
      )}
    </div>
  ) : (
    <div>Patient not found</div>
  );
};

export default SinglePatientPage;
