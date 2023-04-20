import { useState } from "react";

interface HealthCheckFormValues {
  description: string;
  date: string;
  specialist: string;
  healthCheckRating: string;
  diagnosisCodes: string[];
}

const initialValues: HealthCheckFormValues = {
  description: "",
  date: "",
  specialist: "",
  healthCheckRating: "",
  diagnosisCodes: [],
};

interface Props {
  children: React.ReactNode;
}

const HealthCheckEntryForm = ({ children }: Props) => {
  const [values, setValues] = useState<HealthCheckFormValues>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values); // do something with form values
  };

  return (
    <div className="border p-4">
      <h2 className="my-2 text-2xl font-semibold">New HealthCheck Entry</h2>
      <form onSubmit={handleSubmit}>
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

export default HealthCheckEntryForm;
