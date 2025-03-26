import React, { useEffect, useState } from "react";
import { Cookie, ChevronDown, ChevronUp } from "lucide-react";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
  });

  // Check if user has already set cookie preferences
  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Wait a bit before showing the banner for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(newPreferences);
    saveCookiePreferences(newPreferences);
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(newPreferences);
    saveCookiePreferences(newPreferences);
    setShowBanner(false);
  };

  const saveCustomPreferences = () => {
    saveCookiePreferences(preferences);
    setShowBanner(false);
  };

  const handlePreferenceChange = (type: keyof CookiePreferences) => {
    if (type === "necessary") return; // Can't toggle necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const saveCookiePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));

    if (prefs.analytics) {
      console.log("Analytics cookies enabled");
    }

    if (prefs.marketing) {
      console.log("Marketing cookies enabled");
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white shadow-lg border-t border-gray-200">
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-2 text-livrr-green">
            <Cookie className="h-6 w-6" />
            <span className="font-semibold">Cookie Settings</span>
          </div>

          <div className="flex-1">
            <p className="text-sm text-livrr-gray-dark mb-2">
              We use cookies to enhance your browsing experience, serve
              personalized ads or content, and analyze our traffic. By clicking
              "Accept All", you consent to our use of cookies.
            </p>

            {showDetails && (
              <div className="mt-4 mb-2 space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-livrr-green-dark">
                      Necessary Cookies
                    </p>
                    <p className="text-xs text-livrr-gray">
                      Essential for the website to function properly. Cannot be
                      disabled.
                    </p>
                  </div>
                  <div className="bg-livrr-green/20 text-livrr-green px-2 py-1 rounded-full text-xs">
                    Required
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-livrr-green-dark">
                      Analytics Cookies
                    </p>
                    <p className="text-xs text-livrr-gray">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange("analytics")}
                    className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${
                      preferences.analytics ? "bg-livrr-green" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform duration-200 ${
                        preferences.analytics
                          ? "transform translate-x-5"
                          : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-livrr-green-dark">
                      Marketing Cookies
                    </p>
                    <p className="text-xs text-livrr-gray">
                      Used to track visitors across websites to display relevant
                      advertisements.
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange("marketing")}
                    className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${
                      preferences.marketing ? "bg-livrr-green" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform duration-200 ${
                        preferences.marketing
                          ? "transform translate-x-5"
                          : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-livrr-green text-xs flex items-center mt-1 hover:underline"
            >
              {showDetails ? (
                <>
                  Hide details <ChevronUp className="h-3 w-3 ml-1" />
                </>
              ) : (
                <>
                  Cookie details <ChevronDown className="h-3 w-3 ml-1" />
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {showDetails && (
              <button
                onClick={saveCustomPreferences}
                className="px-4 py-2 text-sm bg-livrr-green text-white rounded-full hover:bg-livrr-green-dark transition-colors"
              >
                Save Preferences
              </button>
            )}

            <button
              onClick={acceptNecessary}
              className="px-4 py-2 text-sm border border-livrr-green text-livrr-green rounded-full hover:bg-livrr-green/5 transition-colors"
            >
              Only Necessary
            </button>

            <button
              onClick={acceptAll}
              className="px-4 py-2 text-sm bg-gradient-to-r from-livrr-green to-livrr-blue text-white rounded-full hover:opacity-90 transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
