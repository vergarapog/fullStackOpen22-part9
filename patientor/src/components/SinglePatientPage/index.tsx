import { Diagnose, Patient } from "../../types";

import { Male, Female } from "@mui/icons-material";

interface SinglePatientPageProps {
  singlePatient: Patient | null;
  diagnoses: Diagnose[];
}

const SinglePatientPage = ({
  singlePatient,
  diagnoses,
}: SinglePatientPageProps) => {
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
          <h3>entries</h3>
          {entries.map((entry) => {
            return (
              <div key={entry.id}>
                {entry.date} {entry.description}
                <ul>
                  {entry.diagnosisCodes?.map((diagnosisCode) => {
                    const diagnoseObj = diagnoses.find((diagnose) =>
                      diagnose.code === diagnosisCode ? diagnose : undefined
                    );
                    return (
                      <li key={diagnosisCode}>
                        {diagnosisCode} {diagnoseObj?.name}{" "}
                      </li>
                    );
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
