
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RefreshCcw, ArrowRight, Plus, Search, Brain, AlertCircle, CheckCircle, X } from "lucide-react";
import { PageTransition, SlideUp } from "@/pages/AnimatedTransition";
import { IngredientItem } from "@/pages/IngredientItem";
import  Navbar  from "@/components/Navbar";
import  Footer  from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CustomIngredientModal } from "@/pages/CustomIngredientModal";
import { 
  enrichIngredientsWithNutrition, 
  findIngredientAlternatives, 
  generateMealPlan,
  calculateDailyRequirements,
  type HealthParameters,
  type EnrichedIngredient
} from "@/lib/nutritionRecommendation";

// Sample ingredients with more comprehensive data
const ingredientsList = [
  { id: 1, name: "Chicken Breast", quantity: "500g", category: "Protein" },
  { id: 2, name: "Brown Rice", quantity: "2 cups", category: "Grains" },
  { id: 3, name: "Spinach", quantity: "200g", category: "Vegetables" },
  { id: 4, name: "Olive Oil", quantity: "100ml", category: "Oils" },
  { id: 5, name: "Greek Yogurt", quantity: "500g", category: "Dairy" },
  { id: 6, name: "Eggs", quantity: "12", category: "Protein" },
  { id: 7, name: "Sweet Potato", quantity: "2 medium", category: "Vegetables" },
  { id: 8, name: "Quinoa", quantity: "1 cup", category: "Grains" },
  { id: 9, name: "Avocado", quantity: "2", category: "Fruits" },
  { id: 10, name: "Salmon", quantity: "400g", category: "Protein" },
  { id: 11, name: "Almonds", quantity: "100g", category: "Nuts" },
  { id: 12, name: "Banana", quantity: "3", category: "Fruits" },
  { id: 13, name: "Lentils", quantity: "500g", category: "Protein" },
  { id: 14, name: "Kale", quantity: "200g", category: "Vegetables" },
  { id: 15, name: "Blueberries", quantity: "200g", category: "Fruits" },
  { id: 16, name: "Cottage Cheese", quantity: "250g", category: "Dairy" },
  { id: 17, name: "Oats", quantity: "500g", category: "Grains" },
  { id: 18, name: "Broccoli", quantity: "300g", category: "Vegetables" },
  { id: 19, name: "Turkey Breast", quantity: "500g", category: "Protein" },
  { id: 20, name: "Tofu", quantity: "400g", category: "Protein" },
];

const Ingredients = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [availableIngredients, setAvailableIngredients] = useState<number[]>([1, 4, 5, 6, 9]);
  const [categories, setCategories] = useState<string[]>(["Protein", "Vegetables", "Dairy"]);
  const [showRecommended, setShowRecommended] = useState(false);
  const [recommendedIngredients, setRecommendedIngredients] = useState<number[]>([]);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [enrichedIngredients, setEnrichedIngredients] = useState<EnrichedIngredient[]>([]);
  const [customIngredients, setCustomIngredients] = useState<EnrichedIngredient[]>([]);
  const [userParameters, setUserParameters] = useState<HealthParameters | null>(null);
  const [dailyRequirements, setDailyRequirements] = useState<{
    protein: number;
    calories: number;
    carbs: number;
    fat: number;
  } | null>(null);
  const [nutritionProgress, setNutritionProgress] = useState({
    protein: 0,
    calories: 0,
    carbs: 0,
    fat: 0
  });
  const [requirementsMet, setRequirementsMet] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Load user health parameters from local storage
  useEffect(() => {
    const storedParams = localStorage.getItem('healthParameters');
    if (storedParams) {
      try {
        const params = JSON.parse(storedParams);
        setUserParameters(params);
        
        // Calculate daily requirements based on these parameters
        const requirements = calculateDailyRequirements(params);
        setDailyRequirements(requirements);
        
        console.log("Loaded user parameters:", params);
        console.log("Daily requirements:", requirements);
      } catch (error) {
        console.error("Failed to parse health parameters:", error);
      }
    }
  }, []);
  
  // Enrich ingredients with nutritional data
  useEffect(() => {
    const enriched = enrichIngredientsWithNutrition([...ingredientsList, ...customIngredients]);
    setEnrichedIngredients(enriched);
    console.log("Enriched ingredients:", enriched);
  }, [customIngredients]);
  
  // Generate recommendations based on user parameters when the page loads
  useEffect(() => {
    if (userParameters && enrichedIngredients.length > 0 && !analysisComplete) {
      analyzeUserGoals();
    }
  }, [userParameters, enrichedIngredients]);
  
  // Update nutrition progress whenever available ingredients change
  useEffect(() => {
    if (enrichedIngredients.length > 0) {
      updateNutritionProgress();
    }
  }, [availableIngredients, enrichedIngredients]);
  
  // Check if requirements are met
  useEffect(() => {
    if (!dailyRequirements) return;
    
    const proteinMet = nutritionProgress.protein >= dailyRequirements.protein * 0.9; // 90% is acceptable
    setRequirementsMet(proteinMet);
    
    console.log("Nutrition progress:", nutritionProgress);
    console.log("Requirements met:", proteinMet);
  }, [nutritionProgress, dailyRequirements]);
  
  const updateNutritionProgress = () => {
    if (!enrichedIngredients.length) return;
    
    // Get all ingredients (standard + custom) with IDs in availableIngredients
    const allIngredientsWithIds = [...enrichedIngredients];
    
    // Get custom ingredients that are selected
    const customSelected = customIngredients.filter(ingredient => 
      availableIngredients.includes(ingredient.id)
    );
    
    const selectedIngredients = allIngredientsWithIds.filter(
      ingredient => availableIngredients.includes(ingredient.id)
    );
    
    // Calculate total nutrition from selected ingredients
    const totals = selectedIngredients.reduce((acc, ingredient) => {
      const nutrition = ingredient.nutritionalContent;
      return {
        protein: acc.protein + (nutrition.protein || 0),
        calories: acc.calories + (nutrition.calories || 0),
        carbs: acc.carbs + (nutrition.carbs || 0),
        fat: acc.fat + (nutrition.fat || 0)
      };
    }, { protein: 0, calories: 0, carbs: 0, fat: 0 });
    
    setNutritionProgress(totals);
  };
  
  const analyzeUserGoals = async () => {
    if (!userParameters) {
      toast.error("Please set your health parameters first");
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // Get available ingredients objects
      const availableIngredientsObjects = enrichedIngredients;
      
      // Use our ML-based recommendation engine
      const mealPlan = await generateMealPlan(userParameters, availableIngredientsObjects);
      
      // Extract recommended ingredients from the meal plan
      const allMealIngredients = [
        ...(mealPlan.meals.breakfast || []), 
        ...(mealPlan.meals.lunch || []), 
        ...(mealPlan.meals.dinner || [])
      ];
      
      // Get IDs of recommended ingredients
      const recommendedIds = allMealIngredients
        .map(ingredient => ingredient.id)
        .filter((id, index, array) => array.indexOf(id) === index); // Unique IDs
      
      setRecommendedIngredients(recommendedIds);
      
      // Store the meal plan for use in the recipes page
      localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
      
      // Automatically select recommended ingredients for the user
      setAvailableIngredients(prev => {
        const newSelection = [...new Set([...prev, ...recommendedIds])];
        return newSelection;
      });
      
      setAnalysisComplete(true);
      setShowRecommended(true);
      toast.success("AI analysis complete! Here are your recommended ingredients.");
    } catch (error) {
      console.error("Failed to generate meal plan:", error);
      toast.error("Failed to analyze your goals. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const toggleCategory = (category: string) => {
    setCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const toggleIngredient = (id: number, available: boolean) => {
    setAvailableIngredients(prev => 
      available 
        ? [...prev, id] 
        : prev.filter(ingredientId => ingredientId !== id)
    );
  };

  const handleAddCustomIngredient = (ingredient: any) => {
    // Generate a unique ID for the custom ingredient
    const newId = Math.max(...[...ingredientsList, ...customIngredients].map(i => i.id)) + 1;
    
    const newIngredient = {
      ...ingredient,
      id: newId,
    };
    
    setCustomIngredients(prev => [...prev, newIngredient]);
    
    // Automatically select the new ingredient
    setAvailableIngredients(prev => [...prev, newId]);
    
    toast.success(`Added "${ingredient.name}" to your ingredients`);
  };
  
  // Get all ingredients (base + custom)
  const allIngredients = [...ingredientsList, ...customIngredients];
  
  // Filter ingredients based on search, categories, and recommendations
  const filteredIngredients = allIngredients.filter(ingredient => {
    const matchesSearch = searchQuery === "" || 
                         ingredient.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categories.length === 0 || 
                           categories.includes(ingredient.category);
    
    const matchesRecommended = !showRecommended || 
                              recommendedIngredients.includes(ingredient.id);
    
    return matchesSearch && matchesCategory && (showRecommended ? matchesRecommended : true);
  });
  
  const allCategories = Array.from(new Set(allIngredients.map(i => i.category)));
  
  // Calculate progress percentages for nutrition
  const getProgressPercentage = (nutrient: keyof typeof nutritionProgress) => {
    if (!dailyRequirements) return 0;
    const target = dailyRequirements[nutrient];
    return Math.min(100, Math.round((nutritionProgress[nutrient] / target) * 100));
  };
  
  const handleContinue = () => {
    if (!requirementsMet) {
      toast.error("You haven't selected enough protein sources to meet your daily requirements. Please add more protein-rich ingredients.");
      return;
    }
    
    // Store available ingredients to use in alternatives page
    localStorage.setItem('availableIngredients', JSON.stringify(availableIngredients));
    navigate("/alternatives");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <PageTransition>
          <section className="py-12 px-6">
            <div className="container mx-auto">
              <SlideUp>
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  What's in Your <span className="gradient-text">Kitchen</span>?
                </h1>
              </SlideUp>
              
              <SlideUp delay={0.1}>
                <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                  Select the ingredients you already have. We'll create recipes that use what you have and suggest alternatives for what you don't.
                </p>
              </SlideUp>
              
              {!userParameters && (
                <SlideUp delay={0.2}>
                  <div className="max-w-2xl mx-auto mb-8 p-4 border border-amber-200 bg-amber-50/50 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Your profile is incomplete</p>
                      <p className="text-xs text-amber-700 mt-1">
                        For personalized ingredients and recipes based on your health goals, please complete your health profile.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-amber-500/10 border-amber-500/30 text-amber-700 hover:bg-amber-500/20"
                        onClick={() => navigate("/health-parameters")}
                      >
                        Complete Health Profile
                      </Button>
                    </div>
                  </div>
                </SlideUp>
              )}
              
              {userParameters && dailyRequirements && (
                <SlideUp delay={0.2}>
                  <div className="max-w-2xl mx-auto mb-8">
                    <div className="p-4 border border-blue-200 bg-blue-50/50 rounded-lg mb-4">
                      <h3 className="font-medium text-blue-800 text-sm mb-2">
                        Your Daily Requirements for Goal: {userParameters.goal}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-blue-700 mb-1">Protein: {Math.round(dailyRequirements.protein)}g</p>
                          <div className="h-2 bg-blue-200 rounded overflow-hidden">
                            <div 
                              className="h-full bg-blue-600 transition-all duration-500" 
                              style={{ width: `${getProgressPercentage('protein')}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-blue-700 mt-1">
                            {Math.round(nutritionProgress.protein)}g / {Math.round(dailyRequirements.protein)}g
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-blue-700 mb-1">Calories: {Math.round(dailyRequirements.calories)}</p>
                          <div className="h-2 bg-blue-200 rounded overflow-hidden">
                            <div 
                              className="h-full bg-blue-600 transition-all duration-500" 
                              style={{ width: `${getProgressPercentage('calories')}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-blue-700 mt-1">
                            {Math.round(nutritionProgress.calories)} / {Math.round(dailyRequirements.calories)}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-blue-700 mb-1">Carbs: {Math.round(dailyRequirements.carbs)}g</p>
                          <div className="h-2 bg-blue-200 rounded overflow-hidden">
                            <div 
                              className="h-full bg-blue-600 transition-all duration-500" 
                              style={{ width: `${getProgressPercentage('carbs')}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-blue-700 mt-1">
                            {Math.round(nutritionProgress.carbs)}g / {Math.round(dailyRequirements.carbs)}g
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-blue-700 mb-1">Fat: {Math.round(dailyRequirements.fat)}g</p>
                          <div className="h-2 bg-blue-200 rounded overflow-hidden">
                            <div 
                              className="h-full bg-blue-600 transition-all duration-500" 
                              style={{ width: `${getProgressPercentage('fat')}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-blue-700 mt-1">
                            {Math.round(nutritionProgress.fat)}g / {Math.round(dailyRequirements.fat)}g
                          </p>
                        </div>
                      </div>
                      
                      {requirementsMet ? (
                        <div className="mt-3 flex items-center gap-2 text-green-700">
                          <CheckCircle className="h-4 w-4" />
                          <p className="text-xs font-medium">Protein requirements met - you can continue!</p>
                        </div>
                      ) : (
                        <p className="mt-3 text-xs text-amber-700">
                          <strong>Note:</strong> You need to select enough ingredients to meet at least 90% of your daily protein requirement.
                        </p>
                      )}
                    </div>
                  
                    <Button
                      onClick={() => {
                        if (analysisComplete) {
                          setShowRecommended(prev => !prev);
                        } else {
                          analyzeUserGoals();
                        }
                      }}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>Analyzing your goal: {userParameters.goal}...</>
                      ) : (
                        <>
                          <Brain className="h-4 w-4" />
                          {showRecommended 
                            ? "Show All Ingredients" 
                            : analysisComplete 
                              ? "Show AI Recommended Ingredients" 
                              : "Analyze My Goal & Recommend Ingredients"}
                        </>
                      )}
                    </Button>
                    {showRecommended && (
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        Showing ingredients recommended for: <span className="font-medium">{userParameters.goal}</span>
                      </p>
                    )}
                  </div>
                </SlideUp>
              )}
              
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6 mb-10">
                  <div className="md:w-2/3">
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search ingredients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="glass w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="md:w-1/3 flex flex-col justify-end">
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-3 rounded-lg font-medium transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      Add Custom Ingredient
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {allCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        categories.includes(category)
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                  <button
                    onClick={() => setCategories(allCategories)}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground hover:bg-secondary/80 transition-colors flex items-center gap-1"
                  >
                    <RefreshCcw className="h-3 w-3" />
                    Reset
                  </button>
                </div>
                
                <div className="space-y-3 mb-8">
                  {filteredIngredients.map((ingredient) => (
                    <IngredientItem
                      key={ingredient.id}
                      name={ingredient.name}
                      quantity={ingredient.quantity}
                      available={availableIngredients.includes(ingredient.id)}
                      onToggle={(available) => toggleIngredient(ingredient.id, available)}
                      className={recommendedIngredients.includes(ingredient.id) ? "border-primary/30 bg-primary/5" : ""}
                    />
                  ))}
                  
                  {filteredIngredients.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No ingredients match your current filters.</p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setCategories(allCategories);
                          setSearchQuery('');
                          setShowRecommended(false);
                        }}
                        className="mt-2"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mt-12"
                >
                  <p className="text-sm text-muted-foreground mb-4">
                    {availableIngredients.length} ingredients selected
                  </p>
                  
                  <button
                    onClick={handleContinue}
                    disabled={!requirementsMet}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors mx-auto
                      ${requirementsMet 
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                  >
                    Find Recipe Alternatives
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  
                  {!requirementsMet && (
                    <p className="text-xs text-amber-600 mt-2">
                      You need more protein sources to continue
                    </p>
                  )}
                </motion.div>
              </div>
            </div>
          </section>
        </PageTransition>
      </main>
      
      <CustomIngredientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddIngredient={handleAddCustomIngredient}
      />
      
      <Footer />
    </div>
  );
};

export default Ingredients;
