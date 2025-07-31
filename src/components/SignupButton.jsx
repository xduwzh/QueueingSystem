import { useUser } from "../context/UserContext"
import { mockSignup } from "../mockApi"
import { useState } from "react"

const SignupButton = ({ signedList = [], onSignupSuccess }) => {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const alreadySigned = user && signedList.some(p => p.id === user.id)

  const handleSignup = async () => {
    if (!user) {
      setMessage("请先登录 / Please log in first")
      setIsError(true)
      return
    }

    setLoading(true)
    setMessage("")
    setIsError(false)

    try {
      const res = await mockSignup(user)
      if (res.success) {
        setMessage("报名成功 / Signup successful")
        setIsError(false)
        onSignupSuccess?.() // ✅ 调用新的回调名
      } else {
        setMessage(res.message || "报名失败 / Signup failed")
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
      <button onClick={handleSignup} disabled={loading}>
        {loading
          ? "提交中... / Submitting..."
          : alreadySigned
          ? "为朋友报名 / Sign up for a friend"
          : "点击报名 / Sign Up"}
      </button>
      {message && (
        <div style={{ marginTop: "0.5rem", color: isError ? "red" : "green" }}>
          {message}
        </div>
      )}
    </div>
  )
}

export default SignupButton
