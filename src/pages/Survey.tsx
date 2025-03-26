import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { ArrowRight, CheckCircle, ArrowLeft, Send, ArrowUp, Heart, Activity, Clipboard, HelpCircle } from 'lucide-react';
import { useFormSubmission } from "@/hooks/use-form-submission";

const Survey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [otherText, setOtherText] = useState<Record<number, string>>({});
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  
  const questions = [
    {
      question: "How often do you check your overall health?",
      options: [
        "0-4 months",
        "4-8 months",
        "8-12 months",
        "Never",
        "Regularly for Glucose and Blood Pressure"
      ],
      icon: <Activity className="w-8 h-8 text-livrr-green" />
    },
    {
      question: "If you follow a diet plan, have you ever felt like quitting it? Why?",
      options: [
        "Yes, because it was too restrictive",
        "Yes, because I didn't see results",
        "No, I stick to my diet plan",
        "I have never followed a diet plan",
        "Other (please specify)"
      ],
      hasTextbox: true,
      icon: <Clipboard className="w-8 h-8 text-livrr-green" />
    },
    {
      question: "Do you have any food allergies or chronic illnesses?",
      options: [
        "Yes, I have food allergies",
        "Yes, I have chronic illness",
        "Both food allergies and chronic illness",
        "No, I don't have either"
      ],
      hasTextbox: true,
      hasDropdown: true,
      icon: <HelpCircle className="w-8 h-8 text-livrr-green" />
    },
    {
      question: "If you have used a fitness app before, what was the most challenging aspect of using it?",
      options: [
        "Lack of personalized workout plans",
        "Lack of engagement",
        "Complicated interface",
        "I have never used a fitness app",
        "Other (please specify)"
      ],
      hasTextbox: true,
      icon: <Activity className="w-8 h-8 text-livrr-green" />
    },
    {
      question: "If you don't go to the gym, what alternative methods do you use to stay fit?",
      options: [
        "Home workouts",
        "Outdoor activities (running, cycling, etc.)",
        "Sports and recreational activities",
        "I don't have an alternative fitness plan",
        "I go to the gym regularly"
      ],
      icon: <Heart className="w-8 h-8 text-livrr-green" />
    },
    {
      question: "Have you ever experienced mental stress that significantly affected your daily life?",
      options: [
        "Yes, frequently",
        "Yes, occasionally",
        "Rarely",
        "No, never"
      ],
      icon: <HelpCircle className="w-8 h-8 text-livrr-green" />
    },
    {
      question: "Do you believe organic groceries, edibles, and personal care products are practical for daily use?",
      options: [
        "Yes, I use them regularly",
        "Yes, but they are expensive",
        "No, I don't think they make a big difference",
        "No, I have never considered using them"
      ],
      icon: <Clipboard className="w-8 h-8 text-livrr-green" />
    }
  ];
  
  const chronicIllnesses = [
    "Diabetes",
    "Hypertension",
    "Heart Disease",
    "PCOS",
    "Thyroid Disorders",
    "Fatty Liver",
    "Arthritis",
    "Asthma",
    "Digestive Disorders",
    "Other"
  ];
  
  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
    
    if (currentQuestion === questions.length - 1) {
      handleSubmit();
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };
  
  const handleMultiSelect = (answer: string) => {
    setAnswers(prev => {
      const currentAnswers = prev[currentQuestion] as string[] || [];
      if (currentAnswers.includes(answer)) {
        return {
          ...prev,
          [currentQuestion]: currentAnswers.filter(a => a !== answer)
        };
      } else {
        return {
          ...prev,
          [currentQuestion]: [...currentAnswers, answer]
        };
      }
    });
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const { isSubmitting, submitForm } = useFormSubmission({
    formType: 'survey',
    successMessage: {
      title: "Survey Submitted",
      description: "Thank you for taking the time to complete our survey. Your feedback is valuable to us."
    },
    onSuccess: () => setSurveyCompleted(true)
  });
  
  const handleSubmit = async () => {
    console.log('Preparing to submit survey answers:', answers);
    console.log('Text answers:', otherText);
    
    const surveyData = {
      answers,
      additionalText: otherText
    };
    
    await submitForm(surveyData);
    
    if (surveyCompleted) {
      setCurrentQuestion(0);
      setAnswers({});
      setOtherText({});
    }
  };
  
  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };
  
  return (
    <div className="bg-gradient-to-b from-white to-livrr-beige/20 min-h-screen">
      <CustomCursor />
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="bg-livrr-green/10 text-livrr-green-dark px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
              Your Wellness Journey
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-livrr-green-dark">
              Help Us Understand You Better
            </h1>
            <p className="text-lg text-livrr-gray-dark">
              Answer these questions to help us tailor our services to your specific needs and preferences.
            </p>
          </div>
          
          <div className="w-full h-2 bg-gray-200 rounded-full mb-10">
            <div 
              className="h-full bg-gradient-to-r from-livrr-green to-livrr-blue rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          
          <div className="glass-card rounded-xl p-8 md:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-livrr-green/5 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-livrr-blue/5 rounded-full"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                {questions[currentQuestion].icon}
                <h2 className="text-xl md:text-2xl font-semibold text-livrr-green-dark">
                  {questions[currentQuestion].question}
                </h2>
              </div>
              
              <div className="space-y-4 mb-8">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-300 flex items-center justify-between group hover:border-livrr-green hover:bg-livrr-green/5 ${
                      answers[currentQuestion] === option 
                        ? 'border-livrr-green bg-livrr-green/10 shadow-sm' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <span className="text-gray-800">{option}</span>
                    <span className={`w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300 ${
                      answers[currentQuestion] === option 
                        ? 'bg-livrr-green text-white' 
                        : 'bg-gray-100 text-gray-400 group-hover:bg-livrr-green/20'
                    }`}>
                      <CheckCircle className="w-4 h-4" />
                    </span>
                  </button>
                ))}
                
                {questions[currentQuestion].hasTextbox && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional information (optional):
                    </label>
                    <textarea 
                      className="form-input h-24 resize-none"
                      placeholder="Please provide any additional details..."
                      value={otherText[currentQuestion] || ''}
                      onChange={(e) => setOtherText(prev => ({
                        ...prev,
                        [currentQuestion]: e.target.value
                      }))}
                    ></textarea>
                  </div>
                )}
                
                {questions[currentQuestion].hasDropdown && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select any chronic conditions that apply:
                    </label>
                    <select 
                      className="form-input"
                      onChange={(e) => handleMultiSelect(e.target.value)}
                      value=""
                    >
                      <option value="" disabled>Select condition</option>
                      {chronicIllnesses.map((illness, index) => (
                        <option key={index} value={illness}>{illness}</option>
                      ))}
                    </select>
                    
                    {(answers[currentQuestion] as string[] || []).length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {(answers[currentQuestion] as string[] || []).map((illness, index) => (
                          <div 
                            key={index}
                            className="bg-livrr-green/10 text-livrr-green-dark px-3 py-1 rounded-full text-sm flex items-center gap-1"
                          >
                            {illness}
                            <button 
                              onClick={() => handleMultiSelect(illness)}
                              className="w-4 h-4 rounded-full bg-livrr-green/20 flex items-center justify-center text-livrr-green hover:bg-livrr-green hover:text-white transition-colors"
                            >
                              <span className="text-xs">×</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <button 
                  onClick={handlePrevious}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 text-gray-700 transition-all ${
                    currentQuestion === 0 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:border-livrr-green hover:text-livrr-green'
                  }`}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>
                
                {currentQuestion === questions.length - 1 ? (
                  <button 
                    onClick={handleSubmit}
                    className="button-primary flex items-center gap-2"
                  >
                    Submit <Send className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    onClick={() => setCurrentQuestion(prev => prev + 1)}
                    className="button-primary flex items-center gap-2"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      </main>
      
      <Footer />
      
      <a 
        href="#" 
        className="fixed bottom-6 right-6 bg-gradient-to-r from-livrr-green to-livrr-blue w-12 h-12 rounded-full shadow-md flex items-center justify-center text-white transition-all duration-300 hover:shadow-lg hover:scale-110 z-50"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </a>
    </div>
  );
};

export default Survey;
