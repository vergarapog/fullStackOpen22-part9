import { useEffect } from "react";
import { useGlobalContext } from "../../context";

const ErrorMessage = () => {
  const { errorMessage, setErrorMessage } = useGlobalContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  if (errorMessage === "") {
    return <></>;
  }

  return (
    <div className={"w-100 bg-red-500 py-2 text-center text-white text-2xl"}>
      {errorMessage}
    </div>
  );
};

export default ErrorMessage;
