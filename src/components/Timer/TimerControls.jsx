import EncouragementMessage from "./EncouragementMessage";
import { useState } from "react";
import { useTranslation } from "../../i18n";

const TimerControls = ({ timerSettings, session, displayCountdown, focusMode = false }) => {
  const { t } = useTranslation();
  const { timer, noiseTone, formatTime, needsTeacherResume, resumeAfterNoise, resetTimer } = timerSettings;
  const {
    showCountdown,
    setShowCountdown,
    hiddenTimerMode,
    setHiddenTimerMode,
  } = displayCountdown
  const [quickMinutes, setQuickMinutes] = useState(timer.durationSeconds / 60);
  const [quickActivity, setQuickActivity] = useState(session.activity);
  const [quickTrackSound, setQuickTrackSound] = useState(session.trackSound);
  const [quickShowCountdown, setQuickShowCountdown] = useState(showCountdown);
  const hasStarted = timer.isRunning || timer.secondsRemaining < timer.durationSeconds;

  const launchSession = (setup) => {
    setShowCountdown(setup.showCountdown ?? true);
    setHiddenTimerMode(setup.hiddenTimerMode ?? "none");
    session.startSession(setup);
  };

  const message = <EncouragementMessage mode={hiddenTimerMode} timer={timer} noiseTone={noiseTone}/>

  return (
    <section className="timer-controls">
      <p className="card-label">{t("session.label")}</p>

      {!hasStarted && (
        <div className="focus-launcher">
          {session.favoriteSessions.length > 0 && <div className="focus-favorites">
            <h2>{t("session.favorites")}</h2>
            {session.favoriteSessions.map((favorite) => (
              <button key={favorite.id} type="button" onClick={() => launchSession({
                minutes: favorite.minutes,
                activity: session.activities[favorite.activity] ? favorite.activity : "partner",
                trackSound: favorite.trackSound ?? true,
                showCountdown: favorite.showCountdown ?? true,
                hiddenTimerMode: favorite.hiddenTimerMode,
                soundThreshold: favorite.soundThreshold,
              })}>
                <b>{favorite.name}</b>
                <span>{t("session.minutesShort", { minutes: favorite.minutes })} · {favorite.trackSound === false ? t("session.noSoundMeter") : t("session.tracksSound")}</span>
              </button>
            ))}
          </div>}

          <form className="quick-start" onSubmit={(event) => {
            event.preventDefault();
            launchSession({ minutes: quickMinutes, activity: quickActivity, trackSound: quickTrackSound, showCountdown: quickShowCountdown });
          }}>
            <h2>{t("session.quickStart")}</h2>
            <label>{t("session.minutes")}<input type="number" min="1" value={quickMinutes} onChange={(event) => setQuickMinutes(Math.max(1, Number(event.target.value) || 1))} /></label>
            <label className="checkbox-option"><input type="checkbox" checked={quickTrackSound} onChange={(event) => setQuickTrackSound(event.target.checked)} /> {t("noise.track")}</label>
            {quickTrackSound && <fieldset className="quick-sound-limit">
              <legend>{t("noise.acceptableVolume")}</legend>
              {Object.keys(session.activities).map((id) => <label key={id}>
                <input type="radio" name="quick-sound-limit" checked={quickActivity === id} onChange={() => setQuickActivity(id)} /> {t("session.soundLimit", { activity: t(`activity.${id}.label`).toLowerCase() })}
              </label>)}
            </fieldset>}
            <label className="checkbox-option"><input type="checkbox" checked={quickShowCountdown} onChange={(event) => setQuickShowCountdown(event.target.checked)} /> {t("session.showCountdown")}</label>
            <button className="primary" type="submit">{t("session.start")}</button>
          </form>
        </div>
      )}

      {hasStarted && <><div className={`timer-display ${showCountdown ? "" : "time-hidden"}`} aria-live="off">
        {showCountdown ? formatTime(timer.secondsRemaining) : message}
      </div>

      <p className="timer-caption">
        {needsTeacherResume
          ? t("session.waiting")
          : timer.isRunning
          ? t("session.building")
          : showCountdown
          ? t("session.lengthCaption", { minutes: timer.durationSeconds / 60 })
          : t("session.label")}
      </p>

      {focusMode && <div className="button-row">
        <button
          className="primary" 
          type="button" 
          onClick={needsTeacherResume ? resumeAfterNoise : timer.toggle}
          disabled={timer.isComplete}
        >
          {timer.isRunning
            ? t("session.pause")
            : timer.isComplete
            ? t("session.complete")
            : needsTeacherResume
            ? t("session.resume")
            : t("session.startShort")}
        </button>

        <button 
          className="plain-button" 
          type="button" 
          onClick={resetTimer}>
            {t("session.reset")}
        </button>
      </div>}</>}
    </section>
  )
}

export default TimerControls;
