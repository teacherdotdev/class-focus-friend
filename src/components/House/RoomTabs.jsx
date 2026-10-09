import { useTranslation } from "../../i18n";

const RoomTabs = ({ rooms, activeRoom, setActiveRoom, unlockedRoomIds, unlockAll }) => {
  const { t } = useTranslation();
  
  return (
    <div 
      className="room-tabs" 
      role="tablist" 
      aria-label={t("rooms.label")}
    >
      {rooms.map((room) => {
        const isLocked = !unlockedRoomIds.includes(room.id) && !unlockAll;

        return (
        <button 
          key={room.id} 
          className={activeRoom === room.id ? "selected" : ""}
          type="button" 
          role="tab" 
          aria-selected={activeRoom === room.id}
          disabled={isLocked}
          onClick={() => setActiveRoom(room.id)}
        >
          <span aria-hidden="true">
            {room.icon}
          </span>
          
          <span className="room-tab-copy">
            <b>{t(`room.${room.id}.name`)}</b>
            <small>
              {isLocked ? t("rooms.locked") : t("rooms.available")}
            </small>
          </span>

          </button>
        );
      })}
    </div>
  )
}

export default RoomTabs;
