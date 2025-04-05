
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Heart, 
  Cake, 
  Weight, 
  Activity, 
  Brain, 
  Clock3, 
  Baby, 
  FlaskConical,
  ArrowRight, 
  Search,
  ChevronDown,
  Plus,
  X
} from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition, SlideUp } from "@/pages/AnimatedTransition";
import  GoalCard  from "@/pages/Goalcard";
import Navbar  from "@/components/Navbar";
import  Footer  from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const allGoals = [
  {
    category: "Weight Management",
    goals: [
      { id: "weight-loss", title: "Lose 10kg in 60 days", icon: <Weight className="h-5 w-5" />, description: "Safe, sustainable weight loss plan" },
      { id: "weight-loss-30", title: "Quick 30-day Slim Down", icon: <Weight className="h-5 w-5" />, description: "Accelerated weight loss program" },
      { id: "maintenance", title: "Maintain Current Weight", icon: <Activity className="h-5 w-5" />, description: "Balance nutrition while staying stable" },
      { id: "muscle-gain", title: "Build Lean Muscle", icon: <Activity className="h-5 w-5" />, description: "Gain strength without excess fat" },
    ]
  },
  {
    category: "Life Events",
    goals: [
      { id: "wedding", title: "Wedding Prep", icon: <Cake className="h-5 w-5" />, description: "Look your best for the big day" },
      { id: "pregnancy", title: "Pregnancy Support", icon: <Baby className="h-5 w-5" />, description: "Nutrition for expecting mothers" },
      { id: "postpartum", title: "Postpartum Recovery", icon: <Baby className="h-5 w-5" />, description: "Rebuild strength after childbirth" },
      { id: "athletic", title: "Athletic Performance", icon: <Activity className="h-5 w-5" />, description: "Fuel for active lifestyles" },
    ]
  },
  {
    category: "Health & Wellness",
    goals: [
      { id: "heart-health", title: "Heart Health", icon: <Heart className="h-5 w-5" />, description: "Cardiovascular-optimized meals" },
      { id: "diabetes", title: "Diabetes Management", icon: <FlaskConical className="h-5 w-5" />, description: "Balance blood sugar levels" },
      { id: "longevity", title: "Live to 90+", icon: <Clock3 className="h-5 w-5" />, description: "Nutrition for a longer, healthier life" },
      { id: "brain-health", title: "Cognitive Function", icon: <Brain className="h-5 w-5" />, description: "Support mental clarity and focus" },
    ]
  },
  {
    category: "Celebrity Inspired",
    goals: [
      { id: "shahrukh-khan", title: "Look Like Shah Rukh Khan", icon: <Activity className="h-5 w-5" />, description: "Build the lean, toned physique of King Khan" },
      { id: "hrithik-roshan", title: "Hrithik Roshan Physique", icon: <Activity className="h-5 w-5" />, description: "Sculpted muscles with perfect definition" },
      { id: "deepika-padukone", title: "Deepika Padukone Body", icon: <Activity className="h-5 w-5" />, description: "Toned, lean and graceful appearance" },
      { id: "virat-kohli", title: "Virat Kohli Fitness", icon: <Activity className="h-5 w-5" />, description: "Athlete's endurance with lean muscle" },
      { id: "thor", title: "Thor's Body in 60 Days", icon: <Activity className="h-5 w-5" />, description: "Build massive strength and power like Thor" },
      { id: "cr7", title: "Cristiano Ronaldo Diet", icon: <Activity className="h-5 w-5" />, description: "Lean, athletic build with exceptional endurance" },
    ]
  }
];

const Healthprofile = () => {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Weight Management"]);
  const [isCustomGoalModalOpen, setIsCustomGoalModalOpen] = useState(false);
  const [customGoalTitle, setCustomGoalTitle] = useState("");
  const [customGoalTimeframe, setCustomGoalTimeframe] = useState("");
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const handleGoalSelection = (goalId: string, goalTitle: string) => {
    setSelectedGoal(goalId);
    
    // Store the selected goal
    const selectedGoalObj = allGoals.flatMap(category => category.goals).find(goal => goal.id === goalId);
    if (selectedGoalObj) {
      // Load or initialize health parameters
      let healthParams = JSON.parse(localStorage.getItem('healthParameters') || '{}');
      
      // Update the goal field
      healthParams.goal = selectedGoalObj.title;
      localStorage.setItem('healthParameters', JSON.stringify(healthParams));
      
      toast.success(`Selected goal: ${goalTitle}`);
      
      setTimeout(() => {
        navigate("/health-parameters");
      }, 500);
    }
  };

  const handleCustomGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customGoalTitle) {
      toast.error("Please enter a goal description");
      return;
    }

    // Create and store custom goal
    let healthParams = JSON.parse(localStorage.getItem('healthParameters') || '{}');
    healthParams.goal = customGoalTitle + (customGoalTimeframe ? ` in ${customGoalTimeframe}` : '');
    localStorage.setItem('healthParameters', JSON.stringify(healthParams));
    
    toast.success(`Custom goal set: ${healthParams.goal}`);
    setIsCustomGoalModalOpen(false);
    
    setTimeout(() => {
      navigate("/health-parameters");
    }, 500);
  };
  
  // Filter goals based on search query
  const filteredGoals = searchQuery 
    ? allGoals.map(category => ({
        ...category,
        goals: category.goals.filter(goal => 
          goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          goal.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.goals.length > 0)
    : allGoals;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <PageTransition>
          <section className="py-12 px-6">
            <div className="container mx-auto">
              <SlideUp>
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  Choose Your Health <span className="gradient-text">Goal</span>
                </h1>
              </SlideUp>
              
              <SlideUp delay={0.1}>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                  Select a health objective and we'll customize recipes using your available ingredients to help you achieve it.
                </p>
              </SlideUp>
              
              <SlideUp delay={0.2}>
                <div className="max-w-md mx-auto mb-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search for a goal..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="glass w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </SlideUp>

              <SlideUp delay={0.3}>
                <div className="max-w-md mx-auto mb-12">
                  <Button 
                    onClick={() => setIsCustomGoalModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create Custom Goal
                  </Button>
                </div>
              </SlideUp>
              
              {filteredGoals.map((category, categoryIndex) => (
                <div key={category.category} className="mb-12">
                  <button
                    onClick={() => toggleCategory(category.category)}
                    className="flex items-center justify-between w-full text-left mb-4"
                  >
                    <h2 className="text-xl font-semibold">{category.category}</h2>
                    <ChevronDown className={`h-5 w-5 transition-transform ${
                      expandedCategories.includes(category.category) ? "transform rotate-180" : ""
                    }`} />
                  </button>
                  
                  {expandedCategories.includes(category.category) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                      {category.goals.map((goal, goalIndex) => (
                        <motion.div
                          key={goal.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * goalIndex }}
                        >
                          <GoalCard
                            title={goal.title}
                            description={goal.description}
                            icon={goal.icon}
                            onClick={() => handleGoalSelection(goal.id, goal.title)}
                            isSelected={selectedGoal === goal.id}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              
              <div className="text-center mt-8">
                <p className="text-muted-foreground text-sm mb-4">Don't see your goal?</p>
                <button 
                  onClick={() => setIsCustomGoalModalOpen(true)}
                  className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-5 py-2 rounded-lg font-medium transition-colors mx-auto"
                >
                  Create Custom Goal
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>
        </PageTransition>
      </main>
      
      {isCustomGoalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Create Custom Goal</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCustomGoalModalOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleCustomGoalSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Goal Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={customGoalTitle}
                  onChange={(e) => setCustomGoalTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Thor's Body, Cristiano Ronaldo Diet, etc."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Timeframe (optional)
                </label>
                <input
                  type="text"
                  value={customGoalTimeframe}
                  onChange={(e) => setCustomGoalTimeframe(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 30 days, 3 months, etc."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCustomGoalModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Set Goal</Button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Healthprofile;
