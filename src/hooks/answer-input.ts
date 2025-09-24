import { useCallback, useState, type KeyboardEvent } from "react";

export function useAnswerInput(
  answer: string,
  onSuccess: () => void,
  isValidable?: (value: string) => boolean,
  onValidate?: (value: string) => void
) {
  const [inputValue, setInputValue] = useState("");
  const [invalid, setInvalid] = useState<boolean>(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      setInvalid(false);

      if (event.key === "Enter" && (isValidable?.(inputValue) ?? true)) {
        const isValid = inputValue.toLowerCase() === answer.toLowerCase();
        setInvalid(!isValid);
        onValidate?.(inputValue);

        if (!isValid) {
          setInputValue("");
        } else {
          onSuccess();
        }
      }
    },
    [inputValue, answer, onSuccess, isValidable, onValidate]
  );

  return {
    inputValue,
    setInputValue,
    invalid,
    setInvalid,
    handleKeyDown,
  };
}
