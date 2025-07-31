import { useState } from "react"
import { submitSignup } from "../services/api"

const SignupForm = ({ onSignupSuccess }) => {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setMessage("请输入昵称 / Please enter a name")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      await submitSignup({ name })
      setMessage("报名成功！/ Signed up successfully!")
      setName("")
      onSignupSuccess?.()  // 通知父组件刷新列表
    } catch (err) {
      console.error(err)
      setMessage("报名失败，请稍后再试 / Signup failed, please try again")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>昵称 / ID:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "提交中... / Submitting..." : "报名 / Sign Up"}
      </button>
      {message && <p>{message}</p>}
    </form>
  )
}

export default SignupForm
