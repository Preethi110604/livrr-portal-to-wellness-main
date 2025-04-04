import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { ArrowRight, CheckCircle, ArrowLeft, Send, ArrowUp, Heart, Activity, Clipboard, HelpCircle } from 'lucide-react';
import { useFormSubmission } from "@/hooks/use-form-submission";
import { useSwipeable } from 'react-swipeable';

const Goal = () => {
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
  
  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentQuestion(prev => (prev < questions.length - 1 ? prev + 1 : prev)),
    onSwipedRight: () => setCurrentQuestion(prev => (prev > 0 ? prev - 1 : prev)),
  });

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="bg-gradient-to-b from-white to-livrr-beige/20 min-h-screen" {...handlers}>
      <CustomCursor />
      <Navbar />
      
      <main className="pt-28 pb-20 container max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-livrr-green-dark">Help Us Understand You Better</h1>
          <p className="text-lg text-livrr-gray-dark">Swipe left or right to answer questions.</p>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full mb-10">
          <div 
            className="h-full bg-gradient-to-r from-livrr-green to-livrr-blue rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="p-8 bg-white rounded-lg shadow-md">
          <div className="mb-6 flex items-center gap-4">
            {questions[currentQuestion].icon}
            <h2 className="text-xl font-semibold">{questions[currentQuestion].question}</h2>
          </div>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-300 flex items-center justify-between ${
                  answers[currentQuestion] === option 
                    ? 'border-livrr-green bg-livrr-green/10' 
                    : 'border-gray-200 hover:border-livrr-green hover:bg-livrr-green/5'
                }`}
              >
                <span>{option}</span>
                {answers[currentQuestion] === option && (
                  <CheckCircle className="w-5 h-5 text-livrr-green" />
                )}
              </button>
            ))}

            {questions[currentQuestion].hasTextbox && (
              <div className="mt-6">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-livrr-green focus:border-transparent"
                  placeholder="Additional details..."
                  value={otherText[currentQuestion] || ''}
                  onChange={(e) => setOtherText(prev => ({
                    ...prev,
                    [currentQuestion]: e.target.value
                  }))}
                  rows={3}
                />
              </div>
            )}

            {questions[currentQuestion].hasDropdown && (
              <div className="mt-6 space-y-4">
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-livrr-green focus:border-transparent"
                  onChange={(e) => handleMultiSelect(e.target.value)}
                  value=""
                   aria-label="Chronic condition selection"
                >
                  <option value="" disabled>Select chronic illness</option>
                  {chronicIllnesses.map((illness, index) => (
                    <option key={index} value={illness}>{illness}</option>
                  ))}
                </select>

                {(answers[currentQuestion] as string[] || []).length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {(answers[currentQuestion] as string[] || []).map((illness, index) => (
                      <div 
                        key={index}
                        className="bg-livrr-green/10 text-livrr-green-dark px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {illness}
                        <button 
                          onClick={() => handleMultiSelect(illness)}
                          className="text-livrr-green hover:text-livrr-green-dark"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              className={`flex items-center gap-2 px-5 py-2 rounded-full border ${
                currentQuestion === 0
                  ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:border-livrr-green hover:text-livrr-green'
              }`}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-livrr-green text-white hover:bg-livrr-green-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'} <Send className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(prev => prev + 1)}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-livrr-green text-white hover:bg-livrr-green-dark"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </main>
      
      {/* <Footer /> */}
    </div>
  );
};

export default Goal;