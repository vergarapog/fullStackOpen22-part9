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
        <div className="bg-black text-white flex justify-center  mt-4 mb-10 rounded-xl py-3">
          <Typography variant="h4">Patientor</Typography>
        </div>
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
