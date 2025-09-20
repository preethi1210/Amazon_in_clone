import React from 'react';
const LanguageSelector = ({ selectedLang, setSelectedLang }) => {
  const languages = [
    { code: 'en', native: 'English' },
    { code: 'hi', native: 'हिन्दी' },
    { code: 'ta', native: 'தமிழ்' },
    { code: 'te', native: 'తెలుగు' },
    { code: 'ml', native: 'മലയാളം' },
  ];

  const selectedLanguage = languages.find(lang => lang.code === selectedLang) || languages[0];
  const otherLanguages = languages.filter(lang => lang.code !== selectedLanguage.code);

  const handleSelect = (code) => setSelectedLang(code);

  return (
    <div className="absolute top-full left-0 z-50 min-w-[12rem] mt-1 bg-white text-black border border-gray-200 rounded-sm shadow-lg">
      <ul className="text-sm">
        <li className="px-4 py-2 bg-gray-50 font-medium flex items-center gap-2 cursor-default select-none">
          <span className="w-4 h-4 flex items-center justify-center border border-gray-400 rounded-full">
            <span className="w-2 h-2 bg-orange-500 rounded-full" />
          </span>
          <span>{`${selectedLanguage.native} - ${selectedLanguage.code.toUpperCase()}`}</span>
        </li>
        <hr className="my-1 border-gray-200" />
        {otherLanguages.map(lang => (
          <li
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 select-none"
          >
            <span className="w-4 h-4 flex items-center justify-center border border-gray-400 rounded-full">
              {selectedLang === lang.code && (
                <span className="w-2 h-2 bg-orange-500 rounded-full" />
              )}
            </span>
            <span>{`${lang.native} - ${lang.code.toUpperCase()}`}</span>
          </li>
        ))}
      </ul>

      <div className="px-4 py-2 text-blue-600 hover:underline text-xs cursor-pointer select-none">
        Learn more
      </div>

      <hr className="my-1 border-gray-200" />

      <div className="flex items-center gap-2 px-4 py-2 text-xs select-none">
        <img
          src="https://flagcdn.com/w40/in.png"
          alt="India Flag"
          className="w-5 h-4 object-cover"
        />
        <span>You are shopping on <strong>Amazon.in</strong></span>
      </div>

      <div className="px-4 pb-3 text-blue-600 hover:underline text-xs cursor-pointer select-none">
        Change your country or region
      </div>
    </div>
  );
};


export default LanguageSelector;
