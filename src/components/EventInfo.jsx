import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateEventInfo } from "../store/eventInfoSlice";

const EventInfo = () => {
  const user = useSelector((state) => state.user.currentUser); // ✅ Redux 获取用户信息
  const info = useSelector((state) => state.eventInfo.info);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [tempInfo, setTempInfo] = useState("");

  const saveInfo = () => {
    dispatch(updateEventInfo(tempInfo));
    setEditing(false);
  };

  return (
    <div
      style={{
        marginBottom: "2rem",
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
      }}
    >
      <h3>活动信息 / Event Info</h3>

      {!editing ? (
        <>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {info || "暂无信息 / No event info yet"}
          </p>
          {user?.id === "admin" && (
            <button
              onClick={() => {
                setTempInfo(info);
                setEditing(true);
              }}
            >
              编辑 / Edit
            </button>
          )}
        </>
      ) : (
        <>
          <textarea
            rows={6}
            style={{ width: "100%", marginBottom: "1rem" }}
            value={tempInfo}
            onChange={(e) => setTempInfo(e.target.value)}
          />
          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={() => setEditing(false)}>取消 / Cancel</button>
            <button onClick={saveInfo}>保存 / Save</button>
          </div>
        </>
      )}
    </div>
  );
};

export default EventInfo;
