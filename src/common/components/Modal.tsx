import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const { isOpen, onClose, children } = props;

  return (
    <Transition.Root appear as={Fragment} show={isOpen}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center flex justify-center items-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-middle bg-white dark:bg-gray-800 rounded-lg text-left w-full overflow-hidden shadow-xl transform transition-all max-w-sm my-8">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
