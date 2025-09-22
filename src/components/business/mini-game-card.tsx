import { LockIcon } from "lucide-react";
import type { MouseEventHandler } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  title: string;
  status: "locked" | "unlocked" | "completed";
  hint?: string;
  onStart?: MouseEventHandler<HTMLButtonElement>;
};

export function MiniGameCard(props: Props) {
  const { title, status, hint, onStart } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 grid-rows-2 gap-4 justify-items-end text-neutral-400">
        <span className="justify-self-start text-foreground">Statut</span>
        {getStatusLabel(status)}
        <span className="justify-self-start text-foreground">Indice</span>
        {hint ? <span>{hint}</span> : <LockIcon />}
      </CardContent>
      <CardFooter className="flex-col items-stretch">
        <Button disabled={status !== "unlocked"} onClick={onStart}>
          Résoudre l'énigme
        </Button>
      </CardFooter>
    </Card>
  );
}

function getStatusLabel(status: Props["status"]) {
  switch (status) {
    case "locked":
      return "Verrouillé";
    case "unlocked":
      return "Déverrouillé";
    case "completed":
      return "Terminé";
  }
}
