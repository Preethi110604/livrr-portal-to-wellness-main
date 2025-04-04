
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageTransition, SlideUp } from "@/pages/AnimatedTransition";
import  Navbar  from "@/components/Navbar";
import  Footer  from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, User, Weight, Ruler, Dumbbell, Clock, Heart } from "lucide-react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HealthParameters as HealthParametersType } from "../lib/nutritionRecommendation";

const formSchema = z.object({
  age: z.number().min(16).max(100),
  weight: z.number().min(30).max(250),
  height: z.number().min(120).max(250),
  gender: z.enum(["male", "female", "other"]),
  goal: z.string().min(3).max(100),
  timeframe: z.number().min(7).max(365),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very active"]),
  healthConditions: z.array(z.string()),
  currentFat: z.number().min(5).max(70).optional(),
  cholesterol: z.number().min(100).max(300).optional(),
  glucose: z.number().min(70).max(200).optional(),
  triglycerides: z.number().min(50).max(300).optional(),
});

const HealthParameters = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 30,
      weight: 70,
      height: 170,
      gender: "male",
      goal: "Lose 5kg in 60 days",
      timeframe: 60,
      activityLevel: "moderate",
      healthConditions: [],
      currentFat: 20,
      cholesterol: 180,
      glucose: 95,
      triglycerides: 150,
    },
  });
  
  const handleNext = () => {
    setStep(prev => prev + 1);
  };
  
  const handlePrevious = () => {
    setStep(prev => prev - 1);
  };
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Save to local storage for persistence
    const healthParams: HealthParametersType = {
      age: data.age,
      weight: data.weight,
      height: data.height,
      gender: data.gender,
      goal: data.goal,
      timeframe: data.timeframe,
      activityLevel: data.activityLevel,
      healthConditions: data.healthConditions || [],
      currentFat: data.currentFat,
      cholesterol: data.cholesterol,
      glucose: data.glucose,
      triglycerides: data.triglycerides,
    };
    
    localStorage.setItem('healthParameters', JSON.stringify(healthParams));
    toast.success("Health parameters saved!");
    
    // Navigate to ingredients page
    navigate("/ingredients");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <PageTransition>
          <section className="py-12 px-6">
            <div className="container mx-auto max-w-2xl">
              <SlideUp>
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  Your Health <span className="gradient-text">Profile</span>
                </h1>
              </SlideUp>
              
              <SlideUp delay={0.1}>
                <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                  Let's personalize your nutrition plan based on your goals and health parameters.
                </p>
              </SlideUp>
              
              <Card className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {step === 1 && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                        
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <User className="h-4 w-4" /> Age
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    {...field} 
                                    onChange={e => field.onChange(parseInt(e.target.value))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="weight"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <Weight className="h-4 w-4" /> Weight (kg)
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="number" 
                                      {...field} 
                                      onChange={e => field.onChange(parseInt(e.target.value))}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="height"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <Ruler className="h-4 w-4" /> Height (cm)
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="number" 
                                      {...field} 
                                      onChange={e => field.onChange(parseInt(e.target.value))}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <div className="pt-6 flex justify-end">
                          <Button 
                            type="button"
                            onClick={handleNext}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            Next <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                    
                    {step === 2 && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <h2 className="text-xl font-semibold mb-4">Your Goals</h2>
                        
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="goal"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>What's your primary goal?</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="e.g., Lose 8kg in 1 month, Build muscle like Shahrukh Khan" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="timeframe"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" /> Target timeframe (days)
                                </FormLabel>
                                <FormControl>
                                  <div className="space-y-2">
                                    <Slider
                                      min={7}
                                      max={365}
                                      step={1}
                                      value={[field.value]}
                                      onValueChange={(values) => field.onChange(values[0])}
                                    />
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                      <span>1 week</span>
                                      <span>{field.value} days</span>
                                      <span>1 year</span>
                                    </div>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="activityLevel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <Dumbbell className="h-4 w-4" /> Activity Level
                                </FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select activity level" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="sedentary">Sedentary (little exercise)</SelectItem>
                                    <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                                    <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                                    <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                                    <SelectItem value="very active">Very Active (2x training/day)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="pt-6 flex justify-between">
                          <Button 
                            type="button"
                            variant="outline"
                            onClick={handlePrevious}
                          >
                            Back
                          </Button>
                          
                          <Button 
                            type="button"
                            onClick={handleNext}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            Next <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                    
                    {step === 3 && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <h2 className="text-xl font-semibold mb-4">Health Conditions</h2>
                        
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="healthConditions"
                            render={() => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <Heart className="h-4 w-4" /> Select any that apply:
                                </FormLabel>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                  {['Diabetes', 'Hypertension', 'Heart Disease', 'High Cholesterol', 'Celiac', 'Lactose Intolerance', 'Vegetarian', 'Vegan'].map((condition) => (
                                    <FormField
                                      key={condition}
                                      control={form.control}
                                      name="healthConditions"
                                      render={({ field }) => {
                                        return (
                                          <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                              <Checkbox
                                                checked={field.value?.includes(condition)}
                                                onCheckedChange={(checked) => {
                                                  return checked
                                                    ? field.onChange([...field.value, condition])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                          (value) => value !== condition
                                                        )
                                                      )
                                                }}
                                              />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                              {condition}
                                            </FormLabel>
                                          </FormItem>
                                        )
                                      }}
                                    />
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="pt-2">
                            <Button 
                              type="button"
                              variant="ghost" 
                              onClick={() => setShowAdvanced(!showAdvanced)}
                              className="text-xs text-muted-foreground"
                            >
                              {showAdvanced ? 'Hide advanced metrics' : 'Show advanced health metrics'}
                            </Button>
                            
                            {showAdvanced && (
                              <div className="grid grid-cols-2 gap-4 mt-4">
                                <FormField
                                  control={form.control}
                                  name="currentFat"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Body Fat %</FormLabel>
                                      <FormControl>
                                        <Input 
                                          type="number" 
                                          {...field} 
                                          onChange={e => field.onChange(parseInt(e.target.value))}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="cholesterol"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Cholesterol (mg/dL)</FormLabel>
                                      <FormControl>
                                        <Input 
                                          type="number" 
                                          {...field} 
                                          onChange={e => field.onChange(parseInt(e.target.value))}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="glucose"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Glucose (mg/dL)</FormLabel>
                                      <FormControl>
                                        <Input 
                                          type="number" 
                                          {...field} 
                                          onChange={e => field.onChange(parseInt(e.target.value))}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="triglycerides"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Triglycerides (mg/dL)</FormLabel>
                                      <FormControl>
                                        <Input 
                                          type="number" 
                                          {...field} 
                                          onChange={e => field.onChange(parseInt(e.target.value))}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="pt-6 flex justify-between">
                          <Button 
                            type="button"
                            variant="outline"
                            onClick={handlePrevious}
                          >
                            Back
                          </Button>
                          
                          <Button 
                            type="submit"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            Complete Profile
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </Form>
              </Card>
            </div>
          </section>
        </PageTransition>
      </main>
      
    </div>
  );
};

export default HealthParameters;
