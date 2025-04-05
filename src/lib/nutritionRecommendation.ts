// This file contains the ML-based nutrition recommendation system
import { pipeline } from "@huggingface/transformers";

// Health parameters interface
export interface HealthParameters {
  age: number;
  weight: number; // in kg
  height: number; // in cm
  gender: 'male' | 'female' | 'other';
  goal: string;
  timeframe: number; // in days
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very active';
  healthConditions: string[];
  currentFat?: number; // in percentage
  cholesterol?: number; // in mg/dL
  glucose?: number; // in mg/dL
  triglycerides?: number; // in mg/dL
}

// Nutritional content interface for ingredients
export interface NutritionalContent {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  calcium?: number;
  magnesium?: number;
  iron?: number;
  vitaminA?: number;
  vitaminC?: number;
  vitaminD?: number;
  vitaminE?: number; // Added vitaminE to the interface
}

// Ingredient with nutritional content
export interface EnrichedIngredient {
  id: number;
  name: string;
  quantity: string;
  category: string;
  nutritionalContent: NutritionalContent;
  alternatives?: {
    id: number;
    name: string;
    quantity: string;
    matchPercentage: number;
    nutritionalContent: NutritionalContent;
  }[];
}

// Daily nutritional requirements based on health parameters
export interface DailyRequirements {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  calcium?: number;
  magnesium?: number;
  iron?: number;
  vitaminA?: number;
  vitaminC?: number;
  vitaminD?: number;
}

// Function to calculate BMR using Mifflin-St Jeor Equation
const calculateBMR = (params: HealthParameters): number => {
  const { weight, height, age, gender } = params;
  
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

// Calculate activity multiplier
const getActivityMultiplier = (activityLevel: string): number => {
  switch (activityLevel) {
    case 'sedentary': return 1.2;
    case 'light': return 1.375;
    case 'moderate': return 1.55;
    case 'active': return 1.725;
    case 'very active': return 1.9;
    default: return 1.2;
  }
};

// Calculate daily calorie needs
const calculateDailyCalories = (params: HealthParameters): number => {
  const bmr = calculateBMR(params);
  const activityMultiplier = getActivityMultiplier(params.activityLevel);
  let tdee = bmr * activityMultiplier;
  
  // Adjust based on goal
  if (params.goal.includes('weight loss') || params.goal.includes('kg down') || params.goal.includes('slim')) {
    return tdee - 500; // Calorie deficit for weight loss
  } else if (params.goal.includes('muscle') || params.goal.includes('bulk') || params.goal.includes('strength')) {
    return tdee + 300; // Calorie surplus for muscle gain
  } else {
    return tdee; // Maintenance calories
  }
};

// Calculate macro and micronutrient requirements
export const calculateDailyRequirements = (params: HealthParameters): DailyRequirements => {
  const calories = calculateDailyCalories(params);
  
  // Standard macronutrient distribution
  let proteinPerKg = 1.6; // Default protein requirement
  let fatPercentage = 0.25; // Default fat percentage
  let carbPercentage = 0.55; // Default carb percentage
  
  // Adjust based on goals
  if (params.goal.includes('muscle') || params.goal.includes('strength') || params.goal.includes('like') && params.goal.includes('shahrukh')) {
    proteinPerKg = 2.0; // Higher protein for muscle building
    fatPercentage = 0.25;
    carbPercentage = 0.50;
  } else if (params.goal.includes('weight loss') || params.goal.includes('kg down') || params.goal.includes('slim')) {
    proteinPerKg = 1.8; // Higher protein for preserving muscle during weight loss
    fatPercentage = 0.30;
    carbPercentage = 0.40;
  }
  
  const protein = params.weight * proteinPerKg; // Protein in grams
  const fat = (calories * fatPercentage) / 9; // Fat in grams
  const carbs = (calories * carbPercentage) / 4; // Carbs in grams
  
  // Calculate micronutrients (simplified)
  const calcium = params.gender === 'female' ? 1200 : 1000; // mg
  const magnesium = params.gender === 'female' ? 320 : 420; // mg
  const iron = params.gender === 'female' ? 18 : 8; // mg
  const fiber = 30; // g
  
  return {
    calories,
    protein,
    carbs,
    fat,
    fiber,
    calcium,
    magnesium,
    iron,
  };
};

// Sample nutritional database for common ingredients
const ingredientsNutritionalDB: Record<string, NutritionalContent> = {
  "Chicken Breast": { calories: 165, protein: 31, carbs: 0, fat: 3.6, calcium: 15, magnesium: 29 },
  "Brown Rice": { calories: 216, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5, magnesium: 86 },
  "Spinach": { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, calcium: 99, magnesium: 79, iron: 2.7 },
  "Olive Oil": { calories: 884, protein: 0, carbs: 0, fat: 100, vitaminE: 14 },
  "Greek Yogurt": { calories: 59, protein: 10, carbs: 3.6, fat: 0.4, calcium: 111 },
  "Eggs": { calories: 155, protein: 13, carbs: 1.1, fat: 11, vitaminD: 1.2, vitaminA: 270 },
  "Sweet Potato": { calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3, vitaminA: 14187 },
  "Quinoa": { calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9, fiber: 2.8, magnesium: 64, iron: 1.5 },
  "Avocado": { calories: 160, protein: 2, carbs: 8.5, fat: 14.7, fiber: 6.7, magnesium: 29, vitaminC: 10 },
  "Salmon": { calories: 208, protein: 20, carbs: 0, fat: 13, vitaminD: 11, calcium: 13 },
  "Almonds": { calories: 579, protein: 21, carbs: 22, fat: 49, fiber: 12.5, magnesium: 270, calcium: 269 },
  "Banana": { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fiber: 2.6, magnesium: 27, vitaminC: 8.7 },
  "Broccoli": { calories: 55, protein: 3.7, carbs: 11.2, fat: 0.6, fiber: 5.2, calcium: 47, vitaminC: 89.2 },
  "Lentils": { calories: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 8, iron: 3.3, magnesium: 36 },
  "Oats": { calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fiber: 10.6, magnesium: 177, iron: 4.7 },
};

// Enrich the ingredients with nutritional content
export const enrichIngredientsWithNutrition = (ingredients: any[]): EnrichedIngredient[] => {
  return ingredients.map(ingredient => {
    // Look up nutritional content or provide defaults
    const nutritionalContent = ingredientsNutritionalDB[ingredient.name] || {
      calories: 100,
      protein: 5,
      carbs: 15,
      fat: 2
    };
    
    return {
      ...ingredient,
      nutritionalContent
    };
  });
};

// Find alternative ingredients based on nutritional similarity
export const findIngredientAlternatives = (
  ingredient: EnrichedIngredient, 
  availableIngredients: EnrichedIngredient[],
  numberOfAlternatives: number = 3
): EnrichedIngredient => {
  // Don't suggest alternatives for ingredients we already have
  if (availableIngredients.some(i => i.id === ingredient.id)) {
    return ingredient;
  }
  
  const targetNutrition = ingredient.nutritionalContent;
  
  // Calculate nutritional similarity scores
  const alternativesWithScores = availableIngredients
    .filter(i => i.id !== ingredient.id && i.category === ingredient.category) // Same category
    .map(candidate => {
      const candidateNutrition = candidate.nutritionalContent;
      
      // Calculate similarity based on macronutrients (simple Euclidean distance)
      const proteinDiff = Math.abs(targetNutrition.protein - candidateNutrition.protein) / targetNutrition.protein;
      const carbsDiff = Math.abs(targetNutrition.carbs - candidateNutrition.carbs) / (targetNutrition.carbs || 1);
      const fatDiff = Math.abs(targetNutrition.fat - candidateNutrition.fat) / (targetNutrition.fat || 1);
      
      // Calculate overall similarity score (1 = perfect match, 0 = completely different)
      const similarityScore = 1 - (proteinDiff + carbsDiff + fatDiff) / 3;
      const matchPercentage = Math.round(similarityScore * 100);
      
      return {
        ...candidate,
        matchPercentage: matchPercentage > 0 ? matchPercentage : 5, // Minimum 5% match
      };
    })
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, numberOfAlternatives);
  
  return {
    ...ingredient,
    alternatives: alternativesWithScores.map(alt => ({
      id: alt.id,
      name: alt.name, 
      quantity: adjustQuantityBasedOnNutrition(
        ingredient.nutritionalContent,
        alt.nutritionalContent,
        ingredient.quantity
      ),
      matchPercentage: alt.matchPercentage,
      nutritionalContent: alt.nutritionalContent
    }))
  };
};

// Helper function to adjust quantity based on nutritional differences
const adjustQuantityBasedOnNutrition = (
  sourceNutrition: NutritionalContent,
  targetNutrition: NutritionalContent,
  sourceQuantity: string
): string => {
  // Extract numerical value and unit
  const match = sourceQuantity.match(/(\d+(?:\.\d+)?)\s*([a-zA-Z]+)?/);
  if (!match) return sourceQuantity;
  
  const value = parseFloat(match[1]);
  const unit = match[2] || 'g';
  
  // Adjust based on protein content ratio
  if (sourceNutrition.protein && targetNutrition.protein) {
    const ratio = sourceNutrition.protein / targetNutrition.protein;
    const newValue = Math.round(value * ratio * 10) / 10; // Round to 1 decimal place
    return `${newValue} ${unit}`;
  }
  
  return sourceQuantity;
};

// Generate meal plan based on health parameters and available ingredients
export const generateMealPlan = async (
  params: HealthParameters,
  availableIngredients: EnrichedIngredient[]
): Promise<any> => {
  const dailyRequirements = calculateDailyRequirements(params);
  
  // Mock implementation for now - in production this would call the ML model
  // We'll simulate an ML response with our rule-based system
  
  const breakfast = selectIngredientsForMeal(
    availableIngredients, 
    dailyRequirements, 
    0.3, // 30% of daily nutrition for breakfast
    ['Grains', 'Fruits', 'Dairy']
  );
  
  const lunch = selectIngredientsForMeal(
    availableIngredients, 
    dailyRequirements, 
    0.35, // 35% of daily nutrition for lunch
    ['Protein', 'Vegetables', 'Grains']
  );
  
  const dinner = selectIngredientsForMeal(
    availableIngredients, 
    dailyRequirements, 
    0.35, // 35% of daily nutrition for dinner
    ['Protein', 'Vegetables', 'Grains']
  );
  
  return {
    dailyRequirements,
    meals: {
      breakfast,
      lunch,
      dinner,
    },
    tips: generateGoalSpecificTips(params.goal),
    progress: estimateTimeToGoal(params),
  };
};

// Helper function to select ingredients for a meal
const selectIngredientsForMeal = (
  availableIngredients: EnrichedIngredient[],
  dailyRequirements: DailyRequirements,
  nutritionPortion: number, // What portion of daily requirements this meal should fulfill
  preferredCategories: string[]
): EnrichedIngredient[] => {
  // First priority: ingredients from preferred categories
  const preferredIngredients = availableIngredients.filter(
    i => preferredCategories.some(cat => i.category.toLowerCase().includes(cat.toLowerCase()))
  );
  
  // Second priority: other available ingredients
  const otherIngredients = availableIngredients.filter(
    i => !preferredCategories.some(cat => i.category.toLowerCase().includes(cat.toLowerCase()))
  );
  
  // Combine with preference for the preferred categories
  const orderedIngredients = [...preferredIngredients, ...otherIngredients];
  
  const selectedIngredients: EnrichedIngredient[] = [];
  let currentProtein = 0;
  let currentCalories = 0;
  let currentCarbs = 0;
  let currentFat = 0;
  
  // Target nutrition values for this meal
  const targetProtein = dailyRequirements.protein * nutritionPortion;
  const targetCalories = dailyRequirements.calories * nutritionPortion;
  const targetCarbs = dailyRequirements.carbs * nutritionPortion;
  const targetFat = dailyRequirements.fat * nutritionPortion;
  
  // Select ingredients until we meet our targets
  for (const ingredient of orderedIngredients) {
    // Skip if we've already selected this ingredient
    if (selectedIngredients.some(i => i.id === ingredient.id)) {
      continue;
    }
    
    // Calculate how much this ingredient would contribute
    const { protein, calories, carbs, fat } = ingredient.nutritionalContent;
    
    // If adding this ingredient helps us get closer to our targets
    if (currentProtein < targetProtein || 
        currentCalories < targetCalories ||
        currentCarbs < targetCarbs ||
        currentFat < targetFat) {
      
      selectedIngredients.push(ingredient);
      
      currentProtein += protein;
      currentCalories += calories;
      currentCarbs += carbs;
      currentFat += fat;
      
      // Stop if we've met all our targets
      if (currentProtein >= targetProtein &&
          currentCalories >= targetCalories &&
          currentCarbs >= targetCarbs &&
          currentFat >= targetFat) {
        break;
      }
    }
    
    // Stop if we've selected enough ingredients
    if (selectedIngredients.length >= 4) {
      break;
    }
  }
  
  return selectedIngredients;
};

// Generate tips based on goal
const generateGoalSpecificTips = (goal: string): string[] => {
  if (goal.toLowerCase().includes('weight loss') || goal.toLowerCase().includes('kg down')) {
    return [
      "Focus on high-protein foods to maintain muscle mass",
      "Increase fiber intake to feel fuller for longer",
      "Stay hydrated - sometimes thirst is mistaken for hunger",
      "Aim for 7-9 hours of sleep to regulate hunger hormones"
    ];
  } 
  else if (goal.toLowerCase().includes('muscle') || goal.toLowerCase().includes('like shahrukh')) {
    return [
      "Consume protein within 30 minutes after your workout",
      "Include all three macronutrients in each meal",
      "Stay in a slight calorie surplus to build muscle",
      "Prioritize protein quality from diverse sources"
    ];
  }
  else {
    return [
      "Eat a rainbow of fruits and vegetables daily",
      "Include omega-3 rich foods like fatty fish or flaxseeds",
      "Focus on whole foods over processed alternatives",
      "Balance your plate with protein, complex carbs and healthy fats"
    ];
  }
};

// Estimate time to goal
const estimateTimeToGoal = (params: HealthParameters): string => {
  // Extract weight goal if present
  const weightGoalMatch = params.goal.match(/(\d+)\s*kg/);
  if (weightGoalMatch) {
    const weightGoal = parseInt(weightGoalMatch[1]);
    // Healthy weight loss rate is 0.5-1 kg per week
    const weeksNeeded = weightGoal / 0.75;
    return `At a healthy pace, you could achieve this goal in approximately ${Math.round(weeksNeeded)} weeks`;
  }
  
  // Extract timeline if present
  const timelineMatch = params.goal.match(/(\d+)\s*(?:days|weeks|months)/);
  if (timelineMatch) {
    return `Based on your goal timeline of ${timelineMatch[0]}, we've optimized your nutrition plan accordingly`;
  }
  
  return `Follow this nutrition plan consistently to see results in 4-12 weeks`;
};
