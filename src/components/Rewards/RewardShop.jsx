import RewardList from "./RewardList";
import { useTranslation } from "../../i18n";

const RewardShop = ({ rewards, titleId }) => {
  const { t } = useTranslation();
  const { points, accessories, unlocked, equipped, buyOrEquip, isPreviewing } = rewards;

  return (
    <div className="shop-card">
      <div className="card-heading">
        <div>
          <p className="card-label">{t("shop.label")}</p>
          <h2 id={titleId}>{t("shop.title")}</h2>
        </div>

        <span className="points-badge">{isPreviewing ? t("scene.preview") : t("scene.stars", { points })}</span>
      </div>

      <RewardList
        points={points}
        accessories={accessories}
        unlocked={unlocked}
        equipped={equipped}
        buyOrEquip={buyOrEquip}
        isPreviewing={isPreviewing}
      />
    </div>
  );
};

export default RewardShop;
