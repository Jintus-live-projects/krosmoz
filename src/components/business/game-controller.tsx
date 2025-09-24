import {
  GameContext,
  type Game,
  type GameAction,
  type GameState,
} from "@/context/game";
import { Motus } from "@/games/rebus/motus";
import { Rebus } from "@/games/rebus/rebus";
import { useReducer, type PropsWithChildren } from "react";

type GameControllerState = {
  games: Game[];
  currentGameIndex: number;
  finalAnswer: string;
};

function gameStateReducer(state: GameControllerState, action: GameAction) {
  switch (action.type) {
    case "complete": {
      const newGames = state.games.map((game, index) => {
        if (index === action.index) {
          return { ...game, state: "completed" as GameState };
        }
        if (index === action.index + 1) {
          return { ...game, state: "unlocked" as GameState };
        }
        return game;
      });
      return {
        ...state,
        games: newGames,
        currentGameIndex: state.currentGameIndex + 1,
      };
    }
    default:
      return state;
  }
}

const initialState: GameControllerState = {
  finalAnswer: "epee",
  currentGameIndex: 0,
  games: [
    {
      hint: "combat",
      answer: "tournoi",
      state: "unlocked",
    },
    {
      hint: "arme",
      answer: "arme",
      state: "locked",
    },
    {
      hint: "chevalier",
      answer: undefined,
      state: "locked",
    },
  ],
};

export function GameController(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(gameStateReducer, initialState);

  function getGame(index: number, onComplete: () => void) {
    function onSuccess() {
      onComplete();
      dispatch({ type: "complete", index });
    }

    const answer = state.games[index].answer;

    switch (index) {
      case 0:
        return <Rebus answer={answer!} onSuccess={onSuccess} />;
      case 1:
        return <Motus answer={answer!} onSuccess={onSuccess} />;
      case 2:
        return <div>Game 3</div>;
      default:
        return <div>Unknown game</div>;
    }
  }
  return (
    <GameContext.Provider
      value={{
        ...state,
        getGame,
        dispatch,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
