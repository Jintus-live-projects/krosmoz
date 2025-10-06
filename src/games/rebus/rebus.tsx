import { Input } from "@/components/ui/input";
import { useAnswerInput } from "@/hooks/answer-input";

type Props = {
  answer: string;
  onSuccess: () => void;
};

export function Rebus(props: Props) {
  const { answer, onSuccess } = props;

  const { inputValue, setInputValue, invalid, handleKeyDown } = useAnswerInput(
    answer,
    onSuccess
  );
  return (
    <div className="flex flex-col gap-4">
      <img src="images/rebus.png" alt="Rebus" />
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Votre réponse"
        onKeyDown={handleKeyDown}
        aria-invalid={invalid}
      />
    </div>
  );
}
