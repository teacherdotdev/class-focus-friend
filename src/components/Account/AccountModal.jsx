import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import RichText from "../Text/RichText";
import { useTranslation } from "../../i18n";

const AccountModal = ({ account, onClose }) => {
  const { t } = useTranslation();
  const [isCreating, setIsCreating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { clearError } = account;

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  useEffect(() => clearError, [clearError, isCreating]);

  const submit = async (event) => {
    event.preventDefault();
    const signedIn = isCreating
      ? await account.createAccount(email, password)
      : await account.signIn(email, password);

    if (!signedIn) return;
    setPassword("");
    onClose();
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      className="account-modal"
      ariaLabelledBy="account-title"
      closeLabel={t("account.close")}
    >
      {account.teacher ? (
        <>
          <p className="account-label">{t("account.label")}</p>
          <h2 id="account-title">{t("account.savedTitle")}</h2>
          <p className="account-copy">
            <RichText
              textKey="account.savedBody"
              values={{ email: account.teacher.email }}
              links={{ email: `mailto:${account.teacher.email}` }}
            />
          </p>

          <button className="account-secondary" type="button" onClick={account.signOut}>
            {t("account.signOut")}
          </button>
          <p className="account-note">
            {t("account.signOutNote")}
          </p>
        </>
      ) : (
        <>
          <p className="account-label">{t("account.label")}</p>
          <h2 id="account-title">{isCreating ? t("account.createTitle") : t("account.welcomeTitle")}</h2>
          <p className="account-copy">
            {isCreating ? t("account.createBody") : t("account.signInBody")}
          </p>

          <form className="account-form" onSubmit={submit}>
            <label htmlFor="account-email">{t("account.email")}</label>
            <input
              id="account-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label htmlFor="account-password">{t("account.password")}</label>
            <input
              id="account-password"
              type="password"
              autoComplete={isCreating ? "new-password" : "current-password"}
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {isCreating && <p className="account-hint">{t("account.passwordHint")}</p>}

            {account.errorMessage && (
              <p className="account-message error" role="alert">
                ⚠ {account.errorMessage}
              </p>
            )}

            <button className="account-primary" type="submit" disabled={account.isBusy}>
              {account.isBusy ? t("account.busy") : isCreating ? t("account.create") : t("account.signIn")}
            </button>
          </form>

          <button
            className="account-switch"
            type="button"
            onClick={() => setIsCreating((creating) => !creating)}
          >
            {isCreating ? t("account.haveAccount") : t("account.needAccount")}
          </button>

          <p className="account-note">{t("account.note")}</p>
        </>
      )}
    </Modal>
  );
};

export default AccountModal;
