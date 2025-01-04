export interface PairingData {
  dishName: string;
  description: string;
  pairingReason: string;
  recipe: string;
  cookingTips: string;
}

export interface PairingFormState {
  strain: string;
  isLoading: boolean;
  pairing: string | null;
}