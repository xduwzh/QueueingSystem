import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";

const RegisterModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!userId || !password) {
      alert("请输入用户名和密码 / Please enter both username and password");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[userId]) {
      alert("该用户名已被注册 / Username already exists");
      return;
    }

    users[userId] = password;
    localStorage.setItem("users", JSON.stringify(users));

    // ✅ 自动登录并保存用户
    const newUser = { id: userId, avatarUrl: "" };
    dispatch(login(newUser));

    // ✅ 自动关闭弹窗
    onClose();
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h3>注册 / Register</h3>
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
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}
        >
          <button onClick={onClose}>关闭 / Close</button>
          <button onClick={handleRegister}>注册 / Register</button>
        </div>
      </div>
    </div>
  );
};

const inputStyle = { width: "100%", padding: "0.5rem", marginBottom: "1rem" };
const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};
const modalContentStyle = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  width: "300px",
};

export default RegisterModal;
