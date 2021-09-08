import React, { useState } from "react";
import FormInputWithButton from "./FormInputWithButton";

const QuickMessageFrom = () => {
  const [message, setMessage] = useState("");

  const handelInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(message);
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
          className="mt-3"
        />
      </form>
    </div>
  );
};

export default QuickMessageFrom;
