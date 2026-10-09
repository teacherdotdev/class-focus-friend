import Link from "../Link/Link";
import OtterMark from "../Otter/OtterMark";
import { useTranslation } from "../../i18n";

const accountButtonText = (t, { teacher, saveState, isBusy }) => {
  if (isBusy && teacher) return t("header.opening");
  if (!teacher) return t("header.signIn");
  if (saveState === "saving") return t("header.saving");
  if (saveState === "error") return t("header.notSaved");
  return t("header.saved");
};

// The About and Privacy pages share this header, so classroom buttons only
// appear when a classroom was handed to it.
const Header = ({ header, rightLink }) => {
  const { t } = useTranslation();
  const { onOpenExportImport, onOpenAccount, account } = header ?? {};
  return (
    <header className="app-header">
      <Link className="brand" href="/">
        <OtterMark />
        {t("app.name")}
      </Link>

      {header && (
        <>
          <div className="app-header-actions">
            <button
              className={`account-trigger ${account.saveState === "error" ? "warning" : ""}`}
              type="button"
              title={account.teacher ? t("header.signedInAs", { email: account.teacher.email }) : undefined}
              onClick={onOpenAccount}
            >
              {accountButtonText(t, account)}
            </button>
            <button className="export-import-trigger" type="button" onClick={onOpenExportImport}>{t("header.saveClassroom")}</button>
          </div>
        </>
      )}

      {rightLink && (
        <Link className="header-link" href={rightLink.href}>{rightLink.label}</Link>
      )}
    </header>

  )
}

export default Header;
