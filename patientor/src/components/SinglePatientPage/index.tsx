import { Diagnose, Entry, HealthCheckRating, Patient } from "../../types";

import {
  Male,
  Female,
  Favorite,
  LocalHospital,
  HomeRepairService,
  VerifiedUser,
} from "@mui/icons-material";
import { assertNever } from "../../helpers";
import { green, orange, yellow, red } from "@mui/material/colors";
import CreateEntryButton from "./CreateEntryButton";

interface SinglePatientPageProps {
  singlePatient: Patient | null;
  diagnoses: Diagnose[];
}

const SinglePatientPage = ({
  singlePatient,
  diagnoses,
}: SinglePatientPageProps) => {
  const { id, name, gender, ssn, occupation, entries } = singlePatient || {};

  return singlePatient ? (
    <div>
      <div>
        <h1 className="text-3xl">{name}</h1>
        <div>{gender === "male" ? <Male /> : <Female />}</div>
      </div>
      <p>ssn: {ssn}</p>
      <p>occupation: {occupation}</p>

      {entries && entries.length ? (
        <div>
          <div className="">
            <CreateEntryButton id={id} />
          </div>
          <h3 className="text-2xl text-white bg-black rounded my-3 p-2 text-center">
            Entries
          </h3>

          {entries.map((entry) => {
            return (
              <div key={entry.id} className="p-4 border">
                <EntryDetails entry={entry} diagnoses={diagnoses} />
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

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnose[] }> = ({
  entry,
  diagnoses,
}) => {
  const renderDiagnosesNames = (
    diagnosisCodes: string[] | undefined
  ): JSX.Element[] | null => {
    if (!diagnosisCodes) {
      return null;
    }

    return diagnosisCodes?.map((diagnosisCode) => {
      const diagnoseObj = diagnoses.find((diagnose) =>
        diagnose.code === diagnosisCode ? diagnose : undefined
      );
      return (
        <li key={diagnosisCode}>
          {diagnosisCode} {diagnoseObj?.name}{" "}
        </li>
      );
    });
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <>
          <div>
            <p>
              {entry.date} {renderTypeIcon(entry.type)} ({entry.type})
            </p>
          </div>
          <div>{entry.description}</div>
          <ul>{renderDiagnosesNames(entry.diagnosisCodes)}</ul>
          <div className="pt-4">diagnose by {entry.specialist}</div>
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <div>
            <p>
              {entry.date} {renderTypeIcon(entry.type)} ({entry.type}){" "}
              {entry.employerName}
            </p>
          </div>
          <div>{entry.description}</div>
          <ul>{renderDiagnosesNames(entry.diagnosisCodes)}</ul>
          <div className="pt-4">diagnose by {entry.specialist}</div>
        </>
      );
    case "HealthCheck":
      return (
        <>
          <div>
            <p>
              {entry.date} {renderTypeIcon(entry.type)} ({entry.type})
            </p>
          </div>
          <div>{entry.description}</div>
          <div>{renderHeartAndColorByRating(entry.healthCheckRating)}</div>
          <ul>{renderDiagnosesNames(entry.diagnosisCodes)}</ul>
          <div className="pt-4">diagnose by {entry.specialist}</div>
        </>
      );
    default:
      return assertNever(entry);
  }
};

const renderTypeIcon = (type: string) => {
  switch (type) {
    case "Hospital":
      return <LocalHospital />;
    case "OccupationalHealthcare":
      return <HomeRepairService />;
    case "HealthCheck":
      return <VerifiedUser />;

    default:
      return <></>;
  }
};

const renderHeartAndColorByRating = (healthCheckRating: HealthCheckRating) => {
  switch (healthCheckRating) {
    case 0:
      return <Favorite sx={{ color: green[500] }} />;
    case 1:
      return <Favorite sx={{ color: yellow[500] }} />;
    case 2:
      return <Favorite sx={{ color: orange[500] }} />;
    case 3:
      return <Favorite sx={{ color: red[500] }} />;

    default:
      return <></>;
  }
};

export default SinglePatientPage;
