import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import PatientListPage from "./components/PatientListPage";
import SinglePatientPage from "./components/SinglePatientPage";

import { useGlobalContext } from "./context";

const App = () => {
  const { patients, diagnoses, setPatients } = useGlobalContext();

  const patientMatch = useMatch("/patient/:id");
  const singlePatient = patientMatch
    ? patients.find((u) => {
        return u.id === patientMatch.params.id;
      })
    : undefined;

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/patient/:id"
            element={
              <SinglePatientPage
                singlePatient={singlePatient}
                diagnoses={diagnoses}
              />
            }
          />
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
