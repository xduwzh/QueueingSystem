let signupList = []
let waitList = []

const MAX_SIGNUPS = 25

export const mockSignup = (user) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const MAX_SIGNUPS = 25

      // 所有已报名的 ID（含候补）
      const allIds = [...signupList, ...waitList].map(u => u.id)

      // 构造唯一 ID：naki, naki1, naki2...
      let baseId = user.id
      let newId = baseId
      let counter = 1
      while (allIds.includes(newId)) {
        newId = baseId + counter
        counter++
      }

      const userWithNewId = {
        ...user,
        id: newId,
      }

      if (signupList.length < MAX_SIGNUPS) {
        signupList.push(userWithNewId)
        resolve({
          success: true,
          status: "signed",
          message: newId === baseId 
            ? "报名成功 / Signup successful"
            : `已为朋友报名：${newId} / Signed up for a friend as ${newId}`,
        })
      } else {
        waitList.push(userWithNewId)
        resolve({
          success: true,
          status: "waitlisted",
          message: newId === baseId 
            ? "已加入候补 / Added to waitlist"
            : `为朋友候补：${newId} / Waitlisted for a friend as ${newId}`,
        })
      }
    }, 500)
  })
}

export const mockCancelSignup = (user) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allLists = [signupList, waitList]
      let removed = false

      for (let list of allLists) {
        // 找出该用户的所有报名（含 naki, naki1, ...）
        const userEntries = list
          .map((u, index) => ({ u, index }))
          .filter(({ u }) => u.id === user.id || u.id.startsWith(user.id))

        if (userEntries.length > 0) {
          // 删除最后一项
          const { index } = userEntries[userEntries.length - 1]
          list.splice(index, 1)
          removed = true
          break
        }
      }

      if (removed) {
        resolve({ success: true })
      } else {
        resolve({ success: false, message: "没有找到可取消的报名 / No signup found to cancel" })
      }
    }, 500)
  })
}

export const mockFetchSignups = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        signed: [...signupList],
        waitlisted: [...waitList],
      })
    }, 300)
  })
}

// 可选：开发时用于调试，清空所有报名数据
export const mockLogoutClearAll = () => {
  signupList = []
  waitList = []
}
