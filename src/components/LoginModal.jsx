import { useState } from "react"
import { useUser } from "../context/UserContext"

const LoginModal = ({ onClose }) => {
  const { login } = useUser()
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "{}")
    if (!users[userId] || users[userId] !== password) {
      alert("用户名或密码错误 / Incorrect username or password")
      return
    }

    login({ id: userId, avatarUrl: "" })
    onClose()
  }

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h3>登录 / Login</h3>
        <input
          type="text"
          placeholder="用户名 / Username"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="密码 / Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
          <button onClick={onClose}>关闭 / Close</button>
          <button onClick={handleLogin}>登录 / Login</button>
        </div>
      </div>
    </div>
  )
}

const inputStyle = { width: "100%", padding: "0.5rem", marginBottom: "1rem" }

const modalStyle = {
  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.3)", display: "flex",
  justifyContent: "center", alignItems: "center", zIndex: 1000
}

const modalContentStyle = {
  backgroundColor: "white", padding: "2rem", borderRadius: "8px", width: "300px"
}

export default LoginModal
