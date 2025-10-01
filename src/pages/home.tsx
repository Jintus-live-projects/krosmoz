import { MiniGameCard } from "@/components/business/mini-game-card";
import { ResultCard } from "@/components/business/result-card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { GameContext } from "@/context/game";
import { useContext, useState } from "react";

export function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const gameContext = useContext(GameContext)!;

  return (
    <>
      <div className="container grid grid-cols-3 gap-8">
        {gameContext.games.map((game, index) => (
          <MiniGameCard
            key={index}
            title={`Phase ${index + 1}`}
            status={game.state}
            hint={game.hint}
            onStart={() => {
              setDialogOpen(true);
            }}
          />
        ))}
        <ResultCard
          className="col-span-3"
          onSuccess={() => setDialogOpen(true)}
        ></ResultCard>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          {gameContext.isWin ? (
            <div>
              <DialogTitle>Félicitation !</DialogTitle>
              <p className="py-4">
                Rendez-vous en terre de Pandala pour découvrir la suite de
                l'aventure.
              </p>
              <Button onClick={() => setDialogOpen(false)}>Fermer</Button>
            </div>
          ) : (
            <>
              <DialogTitle>
                Phase {gameContext.currentGameIndex + 1}
              </DialogTitle>
              {gameContext.getGame(gameContext.currentGameIndex, () =>
                setDialogOpen(false)
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
