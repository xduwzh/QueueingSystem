import { useUser } from "../context/UserContext"
import { mockCancelSignup } from "../mockApi"
import { useState } from "react"

const CancelButton = ({ signedList = [], onCancelSuccess }) => {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  // ✅ 只有报名过的人才能取消
  const alreadySigned = user && signedList.some(p => p.id === user.id)
  if (!alreadySigned) return null

  const handleCancel = async () => {
    if (!user) {
      setMessage("请先登录 / Please log in first")
      setIsError(true)
      return
    }

    setLoading(true)
    setMessage("")
    setIsError(false)

    try {
      const res = await mockCancelSignup(user)
      if (res.success) {
        setMessage("已取消报名 / Signup cancelled")
        setIsError(false)
        onCancelSuccess?.() // ✅ 通知刷新列表
      } else {
        setMessage(res.message || "取消失败 / Cancel failed")
        setIsError(true)
      }
    } catch (err) {
      setMessage("发生错误 / Error occurred")
      setIsError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <button onClick={handleCancel} disabled={loading}>
        {loading ? "取消中... / Cancelling..." : "取消报名 / Cancel Signup"}
      </button>
      {message && (
        <div style={{ marginTop: "0.5rem", color: isError ? "red" : "green" }}>
          {message}
        </div>
      )}
    </div>
  )
}

export default CancelButton
