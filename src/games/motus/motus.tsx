import { Input } from "@/components/ui/input";
import { useAnswerInput } from "@/hooks/answer-input";
import { useReducer } from "react";

type Props = {
  answer: string;
  onSuccess: () => void;
};

type MotusState = {
  attempts: Attempt[];
};

type MotusAction = { type: "ADD_ATTEMPT"; payload: string };

type Attempt = {
  letters: Letter[];
};

type Letter = {
  char: string;
  state: LetterState;
};

type LetterState = "correct" | "present" | "absent";

function reducerFactory(answer: string) {
  const letterUsage: Record<string, number> = {};
  for (const char of answer) {
    letterUsage[char] = (letterUsage[char] || 0) + 1;
  }

  return function (state: MotusState, action: MotusAction): MotusState {
    switch (action.type) {
      case "ADD_ATTEMPT": {
        const currentUsage: Record<string, number> = {};

        const newAttempt: Attempt = {
          letters: action.payload.split("").map((char, index) => {
            currentUsage[char] = (currentUsage[char] || 0) + 1;
            if (char === answer[index]) {
              return { char, state: "correct" };
            } else if (
              answer.includes(char) &&
              currentUsage[char] <= letterUsage[char]
            ) {
              return { char, state: "present" };
            } else {
              return { char, state: "absent" };
            }
          }),
        };
        return {
          ...state,
          attempts: [...state.attempts, newAttempt],
        };
      }
      default:
        return state;
    }
  };
}

export function Motus(props: Props) {
  const { answer, onSuccess } = props;

  const [state, dispatch] = useReducer(reducerFactory(answer), {
    attempts: [],
  } as MotusState);

  function onValidate(value: string) {
    dispatch({ type: "ADD_ATTEMPT", payload: value });
  }

  const { inputValue, setInputValue, invalid, handleKeyDown } = useAnswerInput(
    answer,
    onSuccess,
    (value) => value.length === answer.length,
    onValidate
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="mx-auto">
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${answer.length}, min-content)`,
          }}
        >
          {state.attempts.length
            ? state.attempts.map((attempt) => {
                return attempt.letters.map((letter, index) => (
                  <LetterBox
                    key={index}
                    state={letter.state}
                    char={letter.char}
                  />
                ));
              })
            : Array.from({ length: answer.length }).map((_, index) => (
                <LetterBox key={index} state="absent" />
              ))}
        </div>
      </div>
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

function LetterBox(props: { state: LetterState; char?: string }) {
  const { state, char } = props;
  return (
    <span
      className={`w-8 h-8 flex items-center justify-center border ${
        state === "correct"
          ? "bg-green-500 text-white"
          : state === "present"
          ? "bg-yellow-500 text-white"
          : "bg-gray-200 text-black"
      }`}
    >
      {char?.toUpperCase()}
    </span>
  );
}
