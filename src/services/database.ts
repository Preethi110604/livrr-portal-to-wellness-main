
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (these would be replaced with your actual keys)
const supabaseUrl = 'https://eisoqaauuffifotkskmo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc29xYWF1dWZmaWZvdGtza21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NzcwODUsImV4cCI6MjA1NzQ1MzA4NX0.J8fv9hutJOnWl3efotAzzueINCP6SixxGTVQ6dks3Zc';

// Create a single supabase client for the entire app
const supabase = createClient(supabaseUrl, supabaseKey);

// Waitlist form submission
export const submitWaitlistEntry = async (data: { name: string; email: string }) => {
  try {
    // Insert data into waitlist table
    const { error } = await supabase
      .from('waitlist')
      .insert([{ 
        user_name: data.name, 
        user_email: data.email,
        created_at: new Date().toISOString()
      }]);
      
    if (error) throw error;
    console.log('Successfully submitted to waitlist');
    return { success: true };
  } catch (error) {
    console.error('Error submitting to waitlist:', error);
    return { success: false, error };
  }
};

// Join Movement form submission
export const submitJoinMovement = async (data: { 
  name: string; 
  email: string; 
  phone?: string;
  age?: string;
}) => {
  try {
    // Insert data into movement_joiners table
    const { error } = await supabase
      .from('movement_joiners')
      .insert([{ 
        user_name: data.name, 
        user_email: data.email,
        user_phone: data.phone || null,
        user_age: data.age || null,
        created_at: new Date().toISOString()
      }]);
      
    if (error) throw error;
    console.log('Successfully submitted to movement_joiners');
    return { success: true };
  } catch (error) {
    console.error('Error submitting to movement:', error);
    return { success: false, error };
  }
};

// Survey data submission
export const submitSurveyData = async (data: any) => {
  try {
    // Add timestamp to survey data
    const dataWithTimestamp = {
      ...data,
      created_at: new Date().toISOString()
    };
    
    const { error } = await supabase
      .from('survey_responses')
      .insert([dataWithTimestamp]);
      
    if (error) throw error;
    console.log('Successfully submitted survey data');
    return { success: true };
  } catch (error) {
    console.error('Error submitting survey data:', error);
    return { success: false, error };
  }
};

// Function to handle form submission with fallback
export const submitFormData = async (formType: 'waitlist' | 'movement' | 'survey', data: any) => {
  try {
    // First try submitting to Supabase
    let result;
    switch (formType) {
      case 'waitlist':
        result = await submitWaitlistEntry(data);
        break;
      case 'movement':
        result = await submitJoinMovement(data);
        break;
      case 'survey':
        result = await submitSurveyData(data);
        break;
      default:
        throw new Error('Invalid form type');
    }
    
    if (result.success) {
      return { success: true };
    } else {
      throw result.error || new Error('Submission failed');
    }
  } catch (error) {
    console.error(`Error submitting ${formType} data:`, error);
    
    // If Supabase fails, we can store data in localStorage as a fallback
    try {
      // Get existing data or initialize empty array
      const existingData = JSON.parse(localStorage.getItem(`livrr_${formType}_data`) || '[]');
      
      // Add timestamp to data
      const dataWithTimestamp = {
        ...data,
        submittedAt: new Date().toISOString()
      };
      
      // Add new submission to array
      existingData.push(dataWithTimestamp);
      
      // Save back to localStorage
      localStorage.setItem(`livrr_${formType}_data`, JSON.stringify(existingData));
      
      return { success: true, storedLocally: true };
    } catch (localError) {
      console.error('Failed to store in localStorage:', localError);
      return { success: false, error: localError };
    }
  }
};
