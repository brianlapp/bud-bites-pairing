export interface StrainPairing {
  id: string;
  strain_name: string;
  pairing_suggestion: string; // JSON string containing detailed pairing information
  created_at: string;
  helpful_votes: number;
  not_helpful_votes: number;
}

export interface PairingData {
  dishName: string;
  description: string;
  pairingReason: string;
  recipe: string;
  cookingTips: string;
}