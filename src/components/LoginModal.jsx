import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";

const LoginModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (!users[userId] || users[userId] !== password) {
      setError("用户名或密码错误 / Incorrect username or password");
      return;
    }

    dispatch(login({ id: userId, avatarUrl: "" }));
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <h3>登录 / Login</h3>

        <input
          type="text"
          placeholder="用户名 / Username"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={styles.input}
          onKeyDown={handleKeyDown}
        />

        <input
          type="password"
          placeholder="密码 / Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          onKeyDown={handleKeyDown}
        />

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.actions}>
          <button onClick={onClose}>关闭 / Close</button>
          <button onClick={handleLogin}>登录 / Login</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modal: {
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
  },
  modalContent: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    width: "300px",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
  },
  error: {
    color: "red",
    marginBottom: "0.5rem",
  },
};

export default LoginModal;
