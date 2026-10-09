import { useTranslation } from "../../i18n";

// Lets a teacher pick the language every page is shown in. The choice is
// remembered on this computer.
const LanguagePicker = () => {
  const { code, t, setLanguage, availableLanguages } = useTranslation();

  return (
    <label className="language-picker">
      <span className="language-picker-label">{t("language.label")}</span>
      <select value={code} onChange={(event) => setLanguage(event.target.value)}>
        {availableLanguages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguagePicker;
