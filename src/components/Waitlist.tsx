import React, { useState } from 'react';
import { useScrollReveal } from '@/utils/animations';
import { useFormSubmission } from "@/hooks/use-form-submission";

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal(0.1);
  const { ref: formRef, isVisible: formVisible } = useScrollReveal(0.1);

  const { isSubmitting, error, submitForm } = useFormSubmission({
    formType: 'waitlist',
    successMessage: {
      title: "Success!",
      description: "You've been added to our waitlist. We'll be in touch soon!"
    },
    onSuccess: () => setSubmitted(true)
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return;
    }
    
    await submitForm({ name, email });
  };

  return (
    <section 
      id="waitlist" 
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="py-20 bg-white relative"
    >
      <div className="container">
        <div 
          className={`text-center mb-10 transition-all duration-700 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="bg-livrr-green/10 text-livrr-green-dark px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Be The First
          </span>
          <h2 className="section-title text-center">
            Join Our Exclusive Waitlist
          </h2>
          <p className="section-subtitle text-center">
            Be among the first to experience Livrr's revolutionary approach to health and wellness. 
            Sign up today and get early access when we launch.
          </p>
        </div>

        <div 
          className="max-w-lg mx-auto"
          ref={formRef as React.RefObject<HTMLDivElement>}
        >
          {!submitted ? (
            <div 
              className={`glass-card rounded-xl p-8 transition-all duration-700 ${
                formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label htmlFor="name" className="block text-livrr-gray-dark mb-2 text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="mb-5">
                  <label htmlFor="email" className="block text-livrr-gray-dark mb-2 text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="form-input"
                    required
                  />
                </div>
                
                {error && (
                  <div className="mb-5 text-red-500 text-sm">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-primary w-full py-3 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    "Join Waitlist"
                  )}
                </button>
              </form>
              
              <div className="mt-6 text-sm text-center text-livrr-gray">
                We'll notify you when Livrr is ready to launch. No spam, ever.
              </div>
            </div>
          ) : (
            <div 
              className="glass-card rounded-xl p-8 text-center animation-fade-in transition-all duration-700 opacity-100 translate-y-0"
            >
              <div className="bg-livrr-green/10 w-16 h-16 rounded-full flex items-center justify-center text-livrr-green mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-display font-semibold text-livrr-green-dark mb-2">
                You're on the list!
              </h3>
              
              <p className="text-livrr-gray-dark mb-6">
                Thank you for joining our waitlist, {name}. We'll notify you at <span className="font-medium">{email}</span> when we're ready to launch.
              </p>
              
              <button
                onClick={() => {
                  setSubmitted(false);
                  setEmail('');
                  setName('');
                }}
                className="button-secondary mx-auto"
              >
                Add Another Email
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Waitlist;
