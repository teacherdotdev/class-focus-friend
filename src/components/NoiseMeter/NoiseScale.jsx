import { useTranslation } from "../../i18n";

const NoiseScale = ({ microphone, noiseTone, greenUntil = 34, redFrom = 67 }) => {
  const { t } = useTranslation();

  return (
    <section>
      <div
        className="meter"
        style={{ background: `linear-gradient(90deg, #cce2d3 0 ${greenUntil}%, #f3dda4 ${greenUntil}% ${redFrom}%, #efc0b0 ${redFrom}% 100%)` }}
        role="meter"
        aria-label={t("noise.scale.label")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={microphone.level}
      >
        <span className={noiseTone} style={{ width: `${microphone.level}%` }} />
      </div>
      <div className="noise-scale"><span>{t("noise.scale.quiet")}</span><span>{t("noise.scale.talking")}</span><span>{t("noise.scale.lively")}</span></div>
    </section>
  );
};

export default NoiseScale;
