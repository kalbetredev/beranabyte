import { useCallback, useState } from "react";

interface Disclosure {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDisclosure = (isOpenDefault = false): Disclosure => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  return { isOpen, onOpen, onClose };
};

export default useDisclosure;
