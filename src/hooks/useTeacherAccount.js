import { useCallback, useEffect, useRef, useState } from "react";
import {
  accountErrorMessage,
  classroomFingerprint,
  createAccount,
  currentTeacher,
  fetchSavedClassroom,
  refreshSession,
  saveClassroomToAccount,
  signIn,
  signOut,
} from "../lib/teacherAccount.js";
import { t } from "../i18n";

const SAVE_DELAY_MS = 800;

/**
 * Keeps a teacher's classroom in their account. Signed out, the app still works
 * and keeps everything on this device; signed in, the account holds the copy
 * that follows the teacher from one device to the next.
 */
export const useTeacherAccount = ({ classroomData, applyClassroom }) => {
  const [teacher, setTeacher] = useState(() => currentTeacher());
  const [saveState, setSaveState] = useState("idle");
  const [isBusy, setIsBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // What the account already holds. It stays null until the account and this
  // device agree, so a classroom just loaded from the account is never sent
  // straight back up, and nothing is saved before that first exchange.
  const lastSaved = useRef(null);
  // Set when the teacher erases everything, so a save already on its way out
  // cannot put the erased classroom back.
  const savingStopped = useRef(false);
  const latestClassroom = useRef(classroomData);
  latestClassroom.current = classroomData;

  const uploadClassroom = useCallback(async (teacherId) => {
    const classroom = latestClassroom.current;
    await saveClassroomToAccount(teacherId, classroom);
    lastSaved.current = classroomFingerprint(classroom);
  }, []);

  /** An account with a classroom wins; an empty one adopts this device's work. */
  const joinAccountToClassroom = useCallback(
    async (record) => {
      const saved = await fetchSavedClassroom(record.id);
      if (saved) {
        lastSaved.current = classroomFingerprint(saved);
        applyClassroom(saved);
        return;
      }
      await uploadClassroom(record.id);
    },
    [applyClassroom, uploadClassroom],
  );

  const runAccountAction = useCallback(
    async (work, fallbackMessage) => {
      setIsBusy(true);
      setErrorMessage("");
      try {
        await work();
        const record = currentTeacher();
        setTeacher(record);
        if (record) await joinAccountToClassroom(record);
        setSaveState("saved");
        return true;
      } catch (error) {
        setErrorMessage(accountErrorMessage(error, fallbackMessage));
        setTeacher(currentTeacher());
        return false;
      } finally {
        setIsBusy(false);
      }
    },
    [joinAccountToClassroom],
  );

  const reconnected = useRef(false);
  useEffect(() => {
    if (reconnected.current || !currentTeacher()) return;
    reconnected.current = true;
    runAccountAction(refreshSession, t("account.errorReach"));
  }, [runAccountAction]);

  // Every change to the classroom goes up to the account a moment later, so a
  // teacher never has to remember to save.
  const fingerprint = classroomFingerprint(classroomData);
  useEffect(() => {
    if (!teacher || lastSaved.current === null) return;
    if (fingerprint === lastSaved.current) return;

    setSaveState("saving");
    const timeout = setTimeout(async () => {
      if (savingStopped.current) return;
      try {
        await saveClassroomToAccount(teacher.id, latestClassroom.current);
        lastSaved.current = classroomFingerprint(latestClassroom.current);
        setSaveState("saved");
      } catch {
        setSaveState("error");
      }
    }, SAVE_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [fingerprint, teacher]);

  return {
    teacher,
    saveState,
    isBusy,
    errorMessage,
    clearError: () => setErrorMessage(""),
    signIn: (email, password) =>
      runAccountAction(
        () => signIn(email, password),
        t("account.errorSignIn"),
      ),
    createAccount: (email, password) =>
      runAccountAction(
        () => createAccount(email, password),
        t("account.errorCreate"),
      ),
    /** Empties the classroom kept in the account, alongside erasing this device. */
    eraseSavedClassroom: async () => {
      if (!teacher) return;
      savingStopped.current = true;
      lastSaved.current = null;
      await saveClassroomToAccount(teacher.id, null);
    },
    signOut: () => {
      signOut();
      setTeacher(null);
      setSaveState("idle");
      setErrorMessage("");
      lastSaved.current = null;
    },
  };
};
