export interface CannabisRecipe {
  dishName: string;
  description: string;
  infusionInstructions: string;
  dosageInfo: string;
  cookingTime: string;
  recipe: string;
  cookingTips: string;
  potencyLevel: 'Low' | 'Medium' | 'High';
  productType: 'Flower' | 'Concentrate' | 'Distillate';
}

export interface CannabisFormState {
  productType: string;
  desiredDish: string;
  potencyLevel: string;
  isLoading: boolean;
  recipe: string | null;
}