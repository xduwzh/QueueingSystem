// export async function submitSignup(data) {
//   const res = await fetch("/api/signup", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })

//   if (!res.ok) {
//     throw new Error("Failed to submit signup")
//   }

//   return res.json()
// }

// export async function submitSignup(data) {
//   console.log("模拟提交报名：", data)
//   return new Promise((resolve) => setTimeout(resolve, 500))
// }

// 模拟报名数据
const mockSignups = [
  { name: "小明 Xiaoming" },
  { name: "小红 Xiaohong" },
  { name: "小张 Xiaozhang" },
  { name: "小李 Xiaoli" },
  { name: "小王 Xiaowang" },
  { name: "阿喵 Amiao" },
  { name: "Leo" },
  { name: "Chris" },
  { name: "Zhenghang" },
  { name: "Yuke" },
  { name: "Peng" },
  { name: "Lily" },
  { name: "Tom" },
  { name: "Jerry" },
  { name: "Kiki" },
  { name: "Mimi" },
  { name: "Sam" },
  { name: "Eve" },
  { name: "Ada" },
  { name: "Jojo" },
  { name: "Nana" },
  { name: "Lulu" },
  { name: "Fafa" },
  { name: "Bobo" },
  { name: "Cici" },
  { name: "候补1 Waiting1" },
  { name: "候补2 Waiting2" },
]

export async function fetchSignups() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSignups)
    }, 300) // 模拟网络延迟
  })
}

export async function submitSignup(data) {
  console.log("模拟提交报名：", data)
  return new Promise((resolve) => setTimeout(resolve, 500))
}
