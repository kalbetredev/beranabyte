import React, { useState } from "react";
import { isEmailValid } from "../utils/input-validation";
import FormErrorMessage from "./FormErrorMessage";
import FormInputWithButton from "./FormInputWithButton";

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [validateOnChange, setValidateOnChange] = useState(false);

  const handelInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
    if (validateOnChange) setError(!isEmailValid(event.currentTarget.value));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isEmailValid(email)) {
      setError(true);
      setValidateOnChange(true);
    } else {
      setError(false);
      setValidateOnChange(false);

      //TODO : Submit Email To Server
      console.log(email);
    }
  };

  return (
    <div className="shadow max-w-2xl p-5 rounded-lg border dark:border-gray-700 bg-brand-light bg-opacity-5 dark:bg-brand-dark dark:bg-opacity-20">
      <h2 className="text-xl">Subscribe</h2>
      <p className="text-sm text-gray-400">
        Subscribe to receive notifications when new articles are published
      </p>
      <form action="" onSubmit={handleSubmit}>
        <FormInputWithButton
          inputType="email"
          inputValue={email}
          inputOnChange={handelInputChange}
          inputPlaceholder="Please Enter Your Email"
          btnType="submit"
          btnLabel="subscribe"
          className="mt-3"
          errorState={error}
        />
        {error ? (
          <div className="mt-3">
            <FormErrorMessage message="Invalid Email Address" />
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default SubscriptionForm;
