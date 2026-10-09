import { useEffect, useRef, useState } from "react";
import NoiseScale from "./NoiseScale";
import { useTranslation } from "../../i18n";

const SAMPLE_SECONDS = 5;

const getStableAverage = (samples) => {
  const sorted = [...samples].sort((a, b) => a - b);
  const trim = Math.floor(sorted.length * 0.15);
  const stableSamples = sorted.slice(trim, sorted.length - trim || sorted.length);
  return stableSamples.reduce((sum, value) => sum + value, 0) / Math.max(1, stableSamples.length);
};

const NoiseCard = ({ noise, focusMode = false, embedded = false }) => {
  const { t } = useTranslation();
  const { noiseMessage, noiseTone, expectation, microphone, activity, activities, setActivity, soundThresholds, trackSound, setTrackSound, setSoundThreshold, loudThreshold } = noise;
  const dialogRef = useRef(null);
  const [calibrationStage, setCalibrationStage] = useState("idle");
  const [secondsLeft, setSecondsLeft] = useState(SAMPLE_SECONDS);
  const [quietSample, setQuietSample] = useState(null);
  const [showSoundBar, setShowSoundBar] = useState(true);
  const [showMicrophoneControls, setShowMicrophoneControls] = useState(false);
  const samplesRef = useRef([]);
  const previewThreshold = expectation.threshold;
  const previewLabel = t(`activity.${activity}.label`);

  useEffect(() => {
    if (calibrationStage === "quiet" || calibrationStage === "talking") {
      samplesRef.current.push(microphone.rawLevel);
    }
  }, [microphone.rawLevel, calibrationStage]);

  useEffect(() => {
    if (calibrationStage !== "quiet" && calibrationStage !== "talking") return;
    setSecondsLeft(SAMPLE_SECONDS);
    samplesRef.current = [];
    const countdown = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    const finish = window.setTimeout(() => {
      const samples = samplesRef.current;
      const average = getStableAverage(samples);
      if (calibrationStage === "quiet") {
        setQuietSample(average);
        setCalibrationStage("ready");
      } else {
        const calibrated = microphone.setCalibration(quietSample, average);
        if (calibrated) {
          microphone.stop();
        }
        setCalibrationStage(calibrated ? "done" : "retry");
      }
    }, SAMPLE_SECONDS * 1000);
    return () => {
      window.clearInterval(countdown);
      window.clearTimeout(finish);
    };
  }, [calibrationStage, microphone.setCalibration, microphone.stop, quietSample]);

  const beginCalibration = async () => {
    if (microphone.status !== "on" && !(await microphone.start())) return;
    setCalibrationStage("quiet");
  };

  return (
    <section className={`${embedded ? "embedded-noise-setup" : "card noise-card"} ${focusMode && !showSoundBar ? "sound-bar-hidden" : ""}`}>
      {focusMode && showSoundBar && <div className="card-heading">
        <div><p className="card-label">{focusMode ? t("noise.classroomSound") : t("noise.setupLabel")}</p><h2>{focusMode ? noiseMessage : t("noise.setupTitle")}</h2></div>
        <i className={`status-dot ${noiseTone}`} aria-hidden="true" />
      </div>}
      {!focusMode && <label className="checkbox-option sound-tracking-option">
        <input type="checkbox" checked={trackSound} onChange={(event) => setTrackSound(event.target.checked)} />
        {t("noise.track")}
      </label>}
      {!focusMode && trackSound && <fieldset className="sound-profile-choice">
        <legend>{t("noise.acceptableVolume")}</legend>
        <div>
          {Object.keys(activities).map((activityId) => (
            <button className={activity === activityId ? "selected" : ""} type="button" key={activityId} onClick={() => setActivity(activityId)}>
              <b>{t(`activity.${activityId}.label`)}</b>
            </button>
          ))}
        </div>
      </fieldset>}
      {(focusMode || trackSound) && <>
      {focusMode && showSoundBar && <><p className="noise-expectation">
        {t("noise.goal", { activity: previewLabel.toLowerCase() })}
        {' '}<b>{t(`activity.${activity}.detail`)}</b>
      </p>
      <NoiseScale
        microphone={microphone}
        noiseTone={noiseTone}
        greenUntil={previewThreshold}
        redFrom={loudThreshold}
      /></>}

      <div className="noise-actions">
        {focusMode && <label className="checkbox-option">
          <input type="checkbox" checked={showSoundBar} onChange={(event) => setShowSoundBar(event.target.checked)} />
          {t("noise.showBar")}
        </label>}
        {focusMode && <button className="outline microphone-toggle" type="button" aria-expanded={showMicrophoneControls} aria-controls="focus-microphone-controls" onClick={() => setShowMicrophoneControls((visible) => !visible)}>{t("noise.selectMicrophone")}</button>}
        {!focusMode && <button className="outline" type="button" onClick={() => dialogRef.current.showModal()}>{t("noise.openCalibration")}</button>}

      </div>

      {focusMode && <div className="microphone-setup" id="focus-microphone-controls" hidden={!showMicrophoneControls}>
        <label htmlFor="focus-microphone-choice">{t("noise.microphone")}</label>
        <select id="focus-microphone-choice" value={microphone.selectedDeviceId} disabled={microphone.status === "starting"} onChange={(event) => microphone.selectDevice(event.target.value, true)}>
          <option value="">{t("noise.defaultMicrophone")}</option>
          {microphone.devices.filter((device) => device.deviceId).map((device, index) => <option key={device.deviceId} value={device.deviceId}>{device.label || t("noise.microphoneNumber", { number: index + 1 })}</option>)}
        </select>
        <button className="outline" type="button" disabled={microphone.status === "starting"} onClick={() => microphone.start()}>
          {microphone.status === "starting" ? t("noise.connecting") : microphone.status === "on" ? t("noise.reconnect") : t("noise.connect")}
        </button>
      </div>}

      {!focusMode && (
        <div className="microphone-setup">
          <dialog className="sound-calibration-dialog" aria-labelledby="calibration-title" ref={dialogRef} onClose={() => { setCalibrationStage("idle"); microphone.stop(); }}>
            <h2 id="calibration-title">{calibrationStage === "done" ? t("calibration.recommendedTitle") : t("calibration.title")}</h2>
            {calibrationStage !== "done" && <>
            <p className="help-text">{t("calibration.help")}</p>
            <label htmlFor="microphone-choice">{t("noise.microphone")}</label>
            <select id="microphone-choice" value={microphone.selectedDeviceId} onChange={(event) => { setCalibrationStage("idle"); microphone.selectDevice(event.target.value); }}>
              {!microphone.devices.length && <option value="">{t("noise.defaultMicrophone")}</option>}
              {microphone.devices.map((device, index) => <option key={device.deviceId} value={device.deviceId}>{device.label || t("noise.microphoneNumber", { number: index + 1 })}</option>)}
            </select></>}

          <div className="calibration-panel" aria-live="polite">
            {calibrationStage === "idle" && <><p><b>{t("calibration.introTitle")}</b> {t("calibration.introBody")}</p><button className="outline" type="button" onClick={beginCalibration}>{microphone.calibration ? t("calibration.again") : t("calibration.start")}</button></>}
            {calibrationStage === "quiet" && <p><b>{t("calibration.step1")}</b> {t("calibration.step1Body", { seconds: secondsLeft })}</p>}
            {calibrationStage === "ready" && <><p><b>{t("calibration.step2")}</b> {t("calibration.step2Body")}</p><button className="primary" type="button" onClick={() => setCalibrationStage("talking")}>{t("calibration.measure")}</button></>}
            {calibrationStage === "talking" && <p><b>{t("calibration.listening")}</b> {t("calibration.listeningBody", { seconds: secondsLeft })}</p>}
            {calibrationStage === "done" && <>
              <p>{t("calibration.doneBody")}</p>
              <dl className="calibration-recommendations">
                <div><dt>{t("calibration.individual")}</dt><dd>30%</dd></div>
                <div><dt>{t("calibration.group")}</dt><dd>70%</dd></div>
              </dl>
              <p>{t("calibration.doneNote")}</p>
            </>}
            {calibrationStage === "retry" && <><p><b>{t("calibration.retryTitle")}</b> {t("calibration.retryBody")}</p><button className="outline" type="button" onClick={() => setCalibrationStage("quiet")}>{t("calibration.restart")}</button></>}
          </div>

            <div className="calibration-footer"><button className="outline" type="button" onClick={() => dialogRef.current.close()}>{calibrationStage === "done" ? t("calibration.done") : t("calibration.close")}</button></div>
            {["denied", "missing", "unsupported"].includes(microphone.status) && <p role="alert">{t("noise.unavailable")}</p>}
          </dialog>
          <div className="sound-thresholds">
            <label>
              <span><b>{t("noise.limitTitle")}</b><small>{t("noise.limitDetail", { percent: soundThresholds[activity] })}</small></span>
              <input type="range" min="10" max="80" value={soundThresholds[activity]} onChange={(event) => setSoundThreshold(activity, Number(event.target.value))} />
            </label>

          </div>
        </div>
      )}
      </>}

      {microphone.status === "denied" && <p className="help-text">{t("noise.denied")}</p>}
      {microphone.status === "missing" && <p className="help-text">{t("noise.missing")} {focusMode ? t("noise.missingFocus") : t("noise.missingSetup")}</p>}
      {microphone.status === "unsupported" && <p className="help-text">{t("noise.unsupported")}</p>}
    </section>
  );
};

export default NoiseCard;
