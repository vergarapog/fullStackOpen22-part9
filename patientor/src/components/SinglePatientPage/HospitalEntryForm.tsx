import { useState, useEffect } from "react";

import { HospitalFormValues } from "../../types";
import Select from "./Select";
import { SelectOption } from "../../types";
import { useGlobalContext } from "../../context";

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
  const { diagnoses } = useGlobalContext();

  const [values, setValues] = useState<HospitalFormValues>(initialValues);

  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);
  const [selectValue, setSelectValue] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (diagnoses.length > 0) {
      const diagnosesAsSelectOption: SelectOption[] = diagnoses.map(
        (diagnose) => {
          return { label: diagnose.code, value: diagnose.code };
        }
      );
      setSelectOptions(diagnosesAsSelectOption);
      setSelectValue([diagnosesAsSelectOption[0]]);
    }
  }, [diagnoses]);

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
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //get diagnosesCodes as string from Array of SelectValues useState
    const selectValuesAsDiagnoseCodes = selectValue.map((val) => {
      return val.value;
    });

    handleSubmit({ ...values, diagnosisCodes: selectValuesAsDiagnoseCodes });
    console.log({ ...values, diagnosisCodes: selectValuesAsDiagnoseCodes }); // do something with form values
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
            className="w-40 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
              className="w-40 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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

        <Select
          multiple={true}
          options={selectOptions}
          value={selectValue}
          onChange={(o) => setSelectValue(o)}
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

export default HospitalEntryForm;
