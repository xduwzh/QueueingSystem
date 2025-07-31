import { useState, useEffect } from "react"
import { useUser } from "../context/UserContext"

const EventInfo = () => {
  const { user } = useUser()
  const [info, setInfo] = useState("")
  const [editing, setEditing] = useState(false)
  const [tempInfo, setTempInfo] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("eventInfo")
    if (stored) setInfo(stored)
  }, [])

  const saveInfo = () => {
    localStorage.setItem("eventInfo", tempInfo)
    setInfo(tempInfo)
    setEditing(false)
  }

  return (
    <div style={{ marginBottom: "2rem", border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
      <h3>活动信息 / Event Info</h3>

      {!editing ? (
        <>
          <p style={{ whiteSpace: "pre-wrap" }}>{info || "暂无信息 / No event info yet"}</p>
          {user?.id === "admin" && (
            <button onClick={() => {
              setTempInfo(info)
              setEditing(true)
            }}>
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
  )
}

export default EventInfo
