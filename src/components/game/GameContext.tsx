import { createContext, useContext, useReducer, useEffect } from "react";

export interface Plant {
  id: string;
  strain: string;
  growthStage: number;
  waterLevel: number;
  readyToHarvest: boolean;
}

export interface GameState {
  money: number;
  plants: Plant[];
  unlockedStrains: string[];
  tutorial: boolean;
  points: number;
}

type GameAction =
  | { type: "WATER_PLANT"; plantId: string }
  | { type: "PLANT_SEED"; strain: string }
  | { type: "HARVEST_PLANT"; plantId: string }
  | { type: "SELL_HARVEST"; amount: number }
  | { type: "COMPLETE_TUTORIAL" }
  | { type: "LOAD_GAME"; state: GameState };

const initialState: GameState = {
  money: 1000,
  plants: [],
  unlockedStrains: ["OG Kush"],
  tutorial: true,
  points: 0,
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "WATER_PLANT":
      return {
        ...state,
        plants: state.plants.map((plant) =>
          plant.id === action.plantId
            ? { ...plant, waterLevel: Math.min(plant.waterLevel + 25, 100) }
            : plant
        ),
      };
    case "PLANT_SEED":
      if (state.money < 100) return state;
      return {
        ...state,
        money: state.money - 100,
        plants: [
          ...state.plants,
          {
            id: Math.random().toString(),
            strain: action.strain,
            growthStage: 0,
            waterLevel: 50,
            readyToHarvest: false,
          },
        ],
      };
    case "HARVEST_PLANT":
      return {
        ...state,
        plants: state.plants.filter((plant) => plant.id !== action.plantId),
        points: state.points + 10,
      };
    case "SELL_HARVEST":
      return {
        ...state,
        money: state.money + action.amount,
      };
    case "COMPLETE_TUTORIAL":
      return {
        ...state,
        tutorial: false,
      };
    case "LOAD_GAME":
      return action.state;
    default:
      return state;
  }
};

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem("cannabisGame");
    if (savedState) {
      dispatch({ type: "LOAD_GAME", state: JSON.parse(savedState) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cannabisGame", JSON.stringify(state));
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};