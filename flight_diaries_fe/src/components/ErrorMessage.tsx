import { useEffect } from "react";

interface ErrorMessageProps {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const ErrorMessage = (props: ErrorMessageProps) => {
  const { errorMessage, setErrorMessage } = props;
  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setErrorMessage("");
    }, 3000);

    return () => {
      clearTimeout(errorTimeout);
    };
  }, [errorMessage]);

  return <div className="text-red-600 text-2xl ">{errorMessage}</div>;
};

export default ErrorMessage;
