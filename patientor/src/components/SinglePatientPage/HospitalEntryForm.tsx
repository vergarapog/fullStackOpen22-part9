import { useState } from "react";

import { HospitalFormValues } from "../../types";
import Select from "./Select";

const initialValues: HospitalFormValues = {
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
  discharge: { date: "", criteria: "" },
  type: "Hospital",
};

interface Props {
  handleSubmit: (newEntry: HospitalFormValues) => Promise<void>;
  children: React.ReactNode;
}

const HospitalEntryForm = ({ handleSubmit, children }: Props) => {
  const [values, setValues] = useState<HospitalFormValues>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "dischargeDate") {
      setValues({ ...values, discharge: { ...values.discharge, date: value } });
    } else if (name === "dischargeCriteria") {
      setValues({
        ...values,
        discharge: { ...values.discharge, criteria: value },
      });
    } else if (name === "diagnosisCodes") {
      const diagnosisCodesArray = value.split(",");
      setValues({ ...values, diagnosisCodes: diagnosisCodesArray });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(values);
    console.log(values); // do something with form values
  };

  return (
    <div tabIndex={0} className="border p-4  focus:border-blue-400">
      <h2 className="my-2 text-2xl font-semibold">New Hospital Entry</h2>
      <form onSubmit={handleSubmitForm}>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block mb-2 font-bold text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            value={values.description}
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="healthCheckRating"
            className="block mb-2 font-bold text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            value={values.date}
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="specialist"
            className="block mb-2 font-bold text-gray-700"
          >
            Specialist
          </label>
          <input
            type="text"
            name="specialist"
            value={values.specialist}
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="border p-4 w-1/2 mb-4">
          <h3 className="font-bold">Discharge</h3>
          <div className="mb-4">
            <label
              htmlFor="dischargeDate"
              className="block mb-2  text-sm text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              name="dischargeDate"
              value={values.discharge.date}
              onChange={handleChange}
              className="w-36 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dischargeCriteria"
              className="block mb-2  text-sm text-gray-700"
            >
              Criteria
            </label>
            <input
              type="text"
              name="dischargeCriteria"
              value={values.discharge.criteria}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="diagnosisCodes"
            className="block mb-2 font-bold text-gray-700"
          >
            Diagnosis codes
          </label>

          <select multiple>
            <option value="M24.2">Disorder of ligament</option>
            <option value="M51.2">
              Other specified intervertebral disc displacement
            </option>
            <option value="S03.5">
              Sprain and strain of joints and ligaments of other and unspecified
              parts of head
            </option>
            <option value="J10.1">
              Influenza with other respiratory manifestations, other influenza
              virus codeentified
            </option>
            <option value="J06.9">
              Acute upper respiratory infection, unspecified
            </option>
            <option value="Z57.1">Occupational exposure to radiation</option>
            <option value="N30.0">Acute cystitis</option>
            <option value="H54.7">Unspecified visual loss</option>
            <option value="J03.0">Streptococcal tonsillitis</option>
            <option value="L60.1">Onycholysis</option>
            <option value="Z74.3">Need for continuous supervision</option>
            <option value="L20">Atopic dermatitis</option>
            <option value="F43.2">Adjustment disorders</option>
            <option value="S62.5">Fracture of thumb</option>
            <option value="H35.29">Other proliferative retinopathy</option>
          </select>
        </div>

        <Select
          options={options}
          value={{
            label: "",
            value: "",
          }}
          onChange={function (
            value: { label: string; value: string } | undefined
          ): void {
            throw new Error("Function not implemented.");
          }}
        />

        <div className="space-x-2">
          {children}
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
];

export default HospitalEntryForm;
