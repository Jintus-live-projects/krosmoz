import { Input } from "@/components/ui/input";
import { useState } from "react";

type Props = {
  answer: string;
  hint: string;
  onSuccess?: (hint: string) => void;
};

export function Rebus(props: Props) {
  const { answer, onSuccess, hint } = props;
  const [value, setValue] = useState("");
  const [valid, setValid] = useState<boolean | null>(null);

  function handleYeyboardEvent(event: React.KeyboardEvent<HTMLInputElement>) {
    setValid(null);

    if (event.key === "Enter") {
      const isValid = value.toLowerCase() === answer.toLowerCase();
      setValid(isValid);

      if (!isValid) {
        setValue("");
      }

      if (isValid) {
        onSuccess?.(hint);
      }
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <img src="/rebus.png" alt="Rebus" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Votre réponse"
        onKeyDown={handleYeyboardEvent}
        aria-invalid={valid === false}
      />
    </div>
  );
}
