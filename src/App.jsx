import { useEffect, useState } from "react"
import { useUser } from "./context/UserContext"
import RegisterModal from "./components/RegisterModal"
import LoginModal from "./components/LoginModal"
import SignupList from "./components/SignupList"
import EventInfo from "./components/EventInfo"
import SignupButton from "./components/SignupButton"
import CancelButton from "./components/CancelButton"
import { mockFetchSignups } from "./mockApi"

function App() {
  const { user, logout } = useUser()
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [signedList, setSignedList] = useState([])
  const [waitList, setWaitList] = useState([])

  const fetchSignups = async () => {
    const data = await mockFetchSignups()
    setSignedList(data.signed)
    setWaitList(data.waitlisted)
  }

  useEffect(() => {
    fetchSignups()
  }, [])

  return (
    <div style={{ padding: "2rem" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2>羽毛球接龙报名 / Badminton Signup</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {!user ? (
            <>
              <button onClick={() => setShowRegister(true)}>注册 / Register</button>
              <button onClick={() => setShowLogin(true)}>登录 / Login</button>
            </>
          ) : (
            <>
              <img
                src={user.avatarUrl || "/default-avatar.png"}
                alt="avatar"
                style={{ width: 40, height: 40, borderRadius: "50%" }}
              />
              <span>{user.id}</span>
              <button onClick={logout}>登出 / Logout</button>
            </>
          )}
        </div>
      </header>

      <main>
        <EventInfo />
        {user && (
          <>
            <SignupButton
              signedList={signedList}
              onSignupSuccess={fetchSignups}
            />
            <CancelButton
              signedList={signedList}
              onCancelSuccess={fetchSignups}
            />
          </>
        )}
        <SignupList signedList={signedList} waitList={waitList} />
      </main>

      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  )
}

export default App
