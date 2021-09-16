import React from "react";
import FormInputWithButton from "./FormInputWithButton";
import Joi from "joi";

const messageFormSchema = Joi.object({
  message: Joi.string().min(5).max(500).required(),
});

const QuickMessageFrom = () => {
  const onSubmit = (data) => {
    console.log(data.message);
  };

  return (
    <div className="shadow max-w-2xl p-5 rounded-lg border dark:border-gray-700 ">
      <h2 className="text-xl">For Your Quick thoughts ...</h2>
      <FormInputWithButton
        inputName="message"
        inputPlaceholder="Your Message"
        btnLabel="Send"
        className="mt-3"
        onSubmit={onSubmit}
        validationSchema={messageFormSchema}
      />
    </div>
  );
};

export default QuickMessageFrom;
