import { MiniGameCard } from "@/components/business/mini-game-card";
import { ResultCard } from "@/components/business/result-card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { GameContext } from "@/context/game";
import { useContext, useState } from "react";

export function Home() {
  const [minigameOpen, setMinigameOpen] = useState(false);
  const gameContext = useContext(GameContext)!;

  return (
    <>
      <div className="container grid grid-cols-3 gap-8">
        {gameContext.games.map((game, index) => (
          <MiniGameCard
            key={index}
            title="Minigame 1"
            status={game.state}
            hint={game.hint}
            onStart={() => {
              setMinigameOpen(true);
            }}
          />
        ))}
        <ResultCard
          className="col-span-3"
          hints={[undefined, undefined, undefined]}
          answer=""
        ></ResultCard>
      </div>
      <Dialog open={minigameOpen} onOpenChange={setMinigameOpen}>
        <DialogContent>
          <DialogTitle>Minigame 1</DialogTitle>
          {gameContext.getGame(gameContext.currentGameIndex, () =>
            setMinigameOpen(false)
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
