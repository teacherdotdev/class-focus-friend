import { useEffect, useRef, useState } from "react";
import { createSaveFile, downloadSaveFile, getSaveFileName, openSubstituteHandoff, restoreSaveFile, validateSaveFile } from "../../utils/exportImportUtils";
import Modal from "../Modal/Modal";
import RichText from "../Text/RichText";
import { useTranslation } from "../../i18n";

const detectComputerType = () => {
  const platform = navigator.userAgentData?.platform || navigator.platform || "";
  return /Mac|iPhone|iPad/i.test(platform) ? "mac" : /Win/i.test(platform) ? "windows" : null;
}

const ExportImportModal = ({ classroomData, validIds, onClose }) => {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState(null);
  const [computerType, setComputerType] = useState(detectComputerType);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const exportSetup = () => {
    const filename = getSaveFileName();
    openSubstituteHandoff(filename);
    downloadSaveFile(createSaveFile(classroomData), filename);
    setMessage({ type: "success", text: t("save.created"), filename });
  }

  const importSetup = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const save = validateSaveFile(JSON.parse(await file.text()), validIds);
      restoreSaveFile(save);
      window.location.reload();
    } catch {
      setMessage({ type: "error", text: t("save.invalid") });
    } finally {
      event.target.value = "";
    }
  }

  return (
    <Modal
      isOpen
      onClose={onClose}
      className="export-import-modal"
      ariaLabelledBy="export-import-title"
      closeLabel={t("save.close")}
    >
        <p className="export-import-label">{t("save.label")}</p>
        <h2 id="export-import-title">{t("save.title")}</h2>
        <p className="export-import-copy">{t("save.copy")}</p>

        <div className="export-import-included">
          <h3>{t("save.includedTitle")}</h3>
          <ul>
            <li>{t("save.included1")}</li>
            <li>{t("save.included2")}</li>
            <li>{t("save.included3")}</li>
            <li>{t("save.included4")}</li>
          </ul>
          <p>{t("save.noStudentData")}</p>
        </div>

        <div className="export-import-actions">
          <button className="export-import-primary" type="button" onClick={exportSetup}>{t("save.create")}</button>
          <button className="export-import-secondary" type="button" onClick={() => fileInputRef.current?.click()}>{t("save.restore")}</button>
          <input ref={fileInputRef} className="export-import-file" type="file" accept="application/json,.json" onChange={importSetup} />
        </div>

        {message?.type === "success" && (
          <div className="export-import-success" role="status">
            <h3>🎉 {message.text}</h3>
            <p>{t("save.downloadNote")}</p>
            <p className="export-import-filename"><b>{t("save.fileLabel")}</b> {message.filename}</p>
            <h3>{t("save.whereTitle")}</h3>
            <div className="export-import-os-buttons">
              <button type="button" className={computerType === "mac" ? "selected" : ""} onClick={() => setComputerType("mac")}>{t("save.mac")}</button>
              <button type="button" className={computerType === "windows" ? "selected" : ""} onClick={() => setComputerType("windows")}>{t("save.windows")}</button>
            </div>
            {computerType === "mac" && <p className="export-import-path"><RichText textKey="save.macPath" /></p>}
            {computerType === "windows" && <p className="export-import-path"><RichText textKey="save.windowsPath" /></p>}
            <p className="export-import-download-note">{t("save.locationNote")}</p>
          </div>
        )}

        {message?.type === "error" && <p className="export-import-message error" role="alert">⚠ {message.text}. {t("save.invalidNote")}</p>}

        <div className="export-import-instructions">
          <h3>{t("save.howTitle")}</h3>
          <ol>
            <li><b>{t("save.how1Label")}</b> {t("save.how1")}</li>
            <li><b>{t("save.how2Label")}</b> {t("save.how2")}</li>
            <li><b>{t("save.how3Label")}</b> {t("save.how3")}</li>
            <li><b>{t("save.how4Label")}</b> {t("save.how4")}</li>
          </ol>
        </div>

        <button className="export-import-dismiss" type="button" onClick={onClose}>{t("save.dismiss")}</button>
    </Modal>
  );
}

export default ExportImportModal;
