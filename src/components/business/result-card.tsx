import { GameContext, type Game } from "@/context/game";
import { useAnswerInput } from "@/hooks/answer-input";
import {
  CircleQuestionMarkIcon,
  EqualIcon,
  LockIcon,
  PlusIcon,
} from "lucide-react";
import { useContext, type ComponentProps } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

type Props = ComponentProps<"div"> & {
  onSuccess: () => void;
};

function GameResult({ game }: { game: Game }) {
  return game.hint && game.state === "completed" ? (
    <span>{game.hint}</span>
  ) : (
    <LockIcon />
  );
}

export function ResultCard(props: Props) {
  const { onSuccess, ...htmlProps } = props;
  const gameContext = useContext(GameContext)!;
  function handleSuccess() {
    gameContext.dispatch({ type: "win" });
    onSuccess();
  }
  const { inputValue, setInputValue, invalid, handleKeyDown } = useAnswerInput(
    gameContext.finalAnswer,
    handleSuccess
  );
  return (
    <Card {...htmlProps}>
      <CardHeader>
        <CardTitle>Résultat</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-7 gap-2">
          <GameResult game={gameContext.games[0]} />
          <PlusIcon />
          <GameResult game={gameContext.games[1]} />
          <PlusIcon />
          <GameResult game={gameContext.games[2]} />
          <EqualIcon />
          <CircleQuestionMarkIcon />
        </div>
        <Input
          placeholder="Entrez votre réponse"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-invalid={invalid}
        />
      </CardContent>
    </Card>
  );
}
