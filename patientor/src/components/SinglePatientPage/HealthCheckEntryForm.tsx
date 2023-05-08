import { useState, useEffect } from "react";

import { HealthCheckFormValues, HealthCheckRating } from "../../types";

import Select from "./Select";
import { SelectOption } from "../../types";
import { useGlobalContext } from "../../context";

const initialValues: HealthCheckFormValues = {
  description: "",
  date: "",
  specialist: "",
  healthCheckRating: HealthCheckRating.Healthy,
  diagnosisCodes: [],
  type: "HealthCheck",
};

interface Props {
  handleSubmit: (newEntry: HealthCheckFormValues) => Promise<void>;
  children: React.ReactNode;
}

const HealthCheckEntryForm = ({ handleSubmit, children }: Props) => {
  const { diagnoses } = useGlobalContext();
  const [values, setValues] = useState<HealthCheckFormValues>(initialValues);

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
    }
  }, [diagnoses]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
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
      <h2 className="my-2 text-2xl font-semibold">New HealthCheck Entry</h2>
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
        <div className="mb-4">
          <label
            htmlFor="healthCheckRating"
            className="block mb-2 font-bold text-gray-700"
          >
            Healthcheck Rating
          </label>
          <input
            type="text"
            name="healthCheckRating"
            value={values.healthCheckRating}
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
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

export default HealthCheckEntryForm;
