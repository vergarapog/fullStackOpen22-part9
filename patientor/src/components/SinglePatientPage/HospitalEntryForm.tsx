import { useState } from "react";

import { HospitalFormValues } from "../../types";

const initialValues: HospitalFormValues = {
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
  discharge: { date: "", criteria: "" },
  type: "Hospital",
};

interface Props {
  handleSubmit: (
    newEntry: HospitalFormValues
  ) => Promise<"sss, remove later" | undefined>;
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
    <div className="border p-4">
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
            type="text"
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
              type="text"
              name="dischargeDate"
              value={values.discharge.date}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
          <input
            type="text"
            name="diagnosisCodes"
            value={values.diagnosisCodes}
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="space-x-2">
          {children}
          <button className="px-2 py-1 bg-blue-500 text-white rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default HospitalEntryForm;
