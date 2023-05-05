import { useState, useEffect } from "react";

import { OccupationalHealthFormValues } from "../../types";
import Select from "./Select";
import { SelectOption } from "../../types";
import { useGlobalContext } from "../../context";

const initialValues: OccupationalHealthFormValues = {
  description: "",
  date: "",
  specialist: "",
  employerName: "",
  diagnosisCodes: [],
  sickLeave: { startDate: "", endDate: "" },
  type: "OccupationalHealthcare",
};

interface Props {
  handleSubmit: (newEntry: OccupationalHealthFormValues) => Promise<void>;
  children: React.ReactNode;
}

const OccupationalEntryForm = ({ handleSubmit, children }: Props) => {
  const { diagnoses } = useGlobalContext();

  const [values, setValues] =
    useState<OccupationalHealthFormValues>(initialValues);

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

    if (name === "startDate") {
      setValues({
        ...values,
        sickLeave: { ...values.sickLeave, startDate: value },
      });
    } else if (name === "endDate") {
      setValues({
        ...values,
        sickLeave: { ...values.sickLeave, endDate: value },
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
    //get diagnosesCodes as string from Array of SelectValues useState
    const selectValuesAsDiagnoseCodes = selectValue.map((val) => {
      return val.value;
    });

    handleSubmit({ ...values, diagnosisCodes: selectValuesAsDiagnoseCodes });
    console.log({ ...values, diagnosisCodes: selectValuesAsDiagnoseCodes }); // do something with form values
  };

  return (
    <div className="border p-4">
      <h2 className="my-2 text-2xl font-semibold">
        New Occupational Healthcare Entry
      </h2>
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
        <div className="mb-4">
          <label
            htmlFor="employerName"
            className="block mb-2 font-bold text-gray-700"
          >
            Employer Name
          </label>
          <input
            type="text"
            name="employerName"
            value={values.employerName}
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="border p-4 w-1/2 mb-4">
          <h3 className="font-bold">Sick Leave</h3>
          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block mb-2  text-sm text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={values.sickLeave?.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block mb-2  text-sm text-gray-700"
            >
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={values.sickLeave?.endDate}
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
          <button className="px-2 py-1 bg-blue-500 text-white rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default OccupationalEntryForm;
