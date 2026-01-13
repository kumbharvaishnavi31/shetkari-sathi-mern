import React, { useEffect } from "react";

const LanguageSelector = () => {
  useEffect(() => {
    // Load Google Translate script
    const addScript = document.createElement("script");
    addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(addScript);

    // Init function for Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,mr",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <div id="google_translate_element" style={{ display: "inline-block" }}></div>
  );
};

export default LanguageSelector;
