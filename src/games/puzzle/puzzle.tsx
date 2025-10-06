import { Button } from "@/components/ui/button";
import { useReducer } from "react";

const PUZZLE_SIDE = 3;

type Props = {
  onSuccess: () => void;
};

type PuzzleState = {
  grid: Array<Array<number | null>>;
  isCompleted: boolean;
};
type PuzzleAction = { type: "MOVE_TILE"; at: number };

function reducerFunction(
  state: PuzzleState,
  action: PuzzleAction
): PuzzleState {
  if (action.type === "MOVE_TILE") {
    const flatGrid = state.grid.flat();
    const emptyIndex = flatGrid.indexOf(null);
    const targetIndex = action.at;

    const isAdjacent =
      (emptyIndex % PUZZLE_SIDE !== 0 && emptyIndex - 1 === targetIndex) || // left
      (emptyIndex % PUZZLE_SIDE !== PUZZLE_SIDE - 1 &&
        emptyIndex + 1 === targetIndex) || // right
      emptyIndex - PUZZLE_SIDE === targetIndex || // above
      emptyIndex + PUZZLE_SIDE === targetIndex; // below

    if (isAdjacent) {
      [flatGrid[emptyIndex], flatGrid[targetIndex]] = [
        flatGrid[targetIndex],
        flatGrid[emptyIndex],
      ];
      const newGrid: PuzzleState["grid"] = [];
      for (let i = 0; i < PUZZLE_SIDE; i++) {
        newGrid.push(
          flatGrid.slice(i * PUZZLE_SIDE, i * PUZZLE_SIDE + PUZZLE_SIDE)
        );
      }
      const isCompleted = newGrid
        .flat()
        .slice(1)
        .every((val, index) => val === index + 2);
      return { ...state, grid: newGrid, isCompleted };
    }
  }
  return state;
}

const initialState: PuzzleState = {
  grid: [
    [null, 7, 2],
    [9, 3, 4],
    [8, 5, 6],
  ],
  isCompleted: false,
};

export function Puzzle(props: Props) {
  const { onSuccess } = props;
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  return (
    <>
      <div
        className={`grid grid-cols-${PUZZLE_SIDE} grid-rows-${PUZZLE_SIDE} mx-auto`}
      >
        {state.grid.flat().map((tile, index) => (
          <Tile
            key={index}
            index={tile}
            onClick={() => dispatch({ type: "MOVE_TILE", at: index })}
          />
        ))}
      </div>
      {state.isCompleted && <Button onClick={() => onSuccess()}>Fermer</Button>}
    </>
  );
}

type TileProps = {
  index: number | null;
  onClick?: () => void;
};

function Tile(props: TileProps) {
  const { index, onClick } = props;
  return index !== null ? (
    <img
      className="w-16 h-16 bg-gray-300 border user-select-none cursor-pointer"
      src={`images/dofus_0${index}.gif`}
      alt={`Tile ${index}`}
      onClick={onClick}
    />
  ) : (
    <div className="w-16 h-16 bg-white border"></div>
  );
}
