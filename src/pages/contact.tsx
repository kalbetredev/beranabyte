import React, { useState } from "react";
import FormErrorMessage from "../common/components/FormErrorMessage";
import SocialMediaLinks from "../common/components/SocialMediaLinks";
import Page from "../common/layouts/Page";
import {
  isEmailValid,
  isShortMessageValid,
} from "../common/utils/input-validation";

interface ContactForm {
  email: string;
  message: string;
}

interface FormError {
  email: boolean;
  message: boolean;
}

const ContactPage = () => {
  const [formState, setFormState] = useState<ContactForm>({
    email: "",
    message: "",
  });

  const [error, setError] = useState<FormError>({
    email: false,
    message: false,
  });

  const [validateOnChange, setValidateOnChange] = useState(false);

  const handelEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    const email = event.currentTarget.value;
    setFormState((state) => ({ ...state, email: email }));
    if (validateOnChange)
      setError((state) => ({
        ...state,
        email: !isEmailValid(email),
      }));
  };

  const handleMessageChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const message = event.currentTarget.value;
    setFormState((state) => ({
      ...state,
      message: message,
    }));
    if (validateOnChange)
      setError((state) => ({
        ...state,
        message: !isShortMessageValid(message),
      }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isEmailValid(formState.email)) {
      setError((state) => ({
        ...state,
        email: true,
      }));
      setValidateOnChange(true);
    }

    if (!isShortMessageValid(formState.message)) {
      setError((state) => ({
        ...state,
        message: true,
      }));
      setValidateOnChange(true);
    } else {
      setError({ email: false, message: false });

      //TODO : Submit Email & Message To Server
      console.log(formState.email, formState.message);
    }
  };

  return (
    <Page>
      <div className="w-full mt-20 mb-8">
        <h1 className="w-full text-3xl font-medium">
          Contact <span className="text-brand">Kalkidan</span>
        </h1>
        <h2 className="mt-5">Use Social Media</h2>
        <div className="flex mt-3 mb-10 pb-6 border-b border-gray-300 dark:border-gray-700">
          <SocialMediaLinks />
        </div>
        <h2 className="mt-5">You Can Also Leave a message</h2>
        <div className="mt-5">
          <form method="POST" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="form-label">
                email
              </label>
              <div className="mt-1 max-w-sm">
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handelEmailChange}
                  placeholder="Your Email Address"
                  autoComplete="off"
                  className={
                    "form-input w-full" + (error.email ? " error-ring" : "")
                  }
                />
                {error.email ? (
                  <div className="mt-3">
                    <FormErrorMessage message="Invalid Email Address" />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <div className="mt-1">
                <textarea
                  form="contactForm"
                  id="message"
                  value={formState.message}
                  onChange={handleMessageChange}
                  placeholder="Your Message"
                  className={
                    "w-full text-sm border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 focus:border-brand focus:border-opacity-25 focus:ring-brand focus:ring-opacity-50" +
                    (error.message ? " error-ring" : "")
                  }
                  rows={10}
                  required
                ></textarea>
                {error.message ? (
                  <div className="mt-3">
                    <FormErrorMessage message="Your message should at least be 5 characters long" />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-end items-center">
              <div className="w-full max-w-[200px]">
                <button type="submit" className="w-full primary-btn">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default ContactPage;
