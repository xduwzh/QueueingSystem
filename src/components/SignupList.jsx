import React from "react"

const SignupList = ({ signedList, waitList }) => {
  return (
    <div>
      <section style={{ marginBottom: "2rem" }}>
        <h3>报名名单 / Signed Participants ({signedList.length}/25)</h3>
        {signedList.length === 0 ? (
          <p>暂无报名 / No signups yet</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {signedList.map((user, index) => (
              <li key={user.id} style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ marginRight: "0.5rem" }}>{index + 1}.</span>
                <img
                  src={user.avatarUrl || "/default-avatar.png"}
                  alt="avatar"
                  style={{ width: 30, height: 30, borderRadius: "50%", marginRight: "0.5rem" }}
                />
                <span>{user.id}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3>候补名单 / Waitlist ({waitList.length})</h3>
        {waitList.length === 0 ? (
          <p>暂无候补 / No one on the waitlist</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {waitList.map((user, index) => (
              <li key={user.id} style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ marginRight: "0.5rem" }}>{index + 1}.</span>
                <img
                  src={user.avatarUrl || "/default-avatar.png"}
                  alt="avatar"
                  style={{ width: 30, height: 30, borderRadius: "50%", marginRight: "0.5rem" }}
                />
                <span>{user.id}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default SignupList
