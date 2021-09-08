import React, { useState } from "react";
import { isShortMessageValid } from "../utils/input-validation";
import FormErrorMessage from "./FormErrorMessage";
import FormInputWithButton from "./FormInputWithButton";

const QuickMessageFrom = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [validateOnChange, setValidateOnChange] = useState(false);

  const handelInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget.value);
    if (validateOnChange)
      setError(!isShortMessageValid(event.currentTarget.value.toString()));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isShortMessageValid(message)) {
      setError(true);
      setValidateOnChange(true);
    } else {
      setError(false);
      setValidateOnChange(false);

      //TODO : Submit Message To Server
      console.log(message);
    }
  };

  return (
    <div className="shadow max-w-2xl p-5 rounded-lg border dark:border-gray-700 ">
      <h2 className="text-xl">For Your Quick thoughts ...</h2>
      <form action="" onSubmit={handleSubmit}>
        <FormInputWithButton
          inputType="text"
          inputValue={message}
          inputOnChange={handelInputChange}
          inputPlaceholder="Your Message"
          btnType="submit"
          btnLabel="Send"
          errorState={error}
          className="mt-3"
        />
        {error ? (
          <div className="mt-3">
            <FormErrorMessage message="Your message should at least be 5 characters long" />
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default QuickMessageFrom;
