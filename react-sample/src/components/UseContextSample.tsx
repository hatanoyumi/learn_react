import React, { useContext } from "react"

type User = {
  id: number
  name: string
}

// ユーザーデータを保存するContextを作成
const UserContext = React.createContext<User | null>(null)
const GrandChild = () => {
  // userContestにContextを渡すことで、Contextから値を取得
  const user = useContext(UserContext)

  return user !== null ? <p>Hello, {user.name}</p> : null
}

const Child = () => {
  const now = new Date()

  return (
    <div>
      <h2>useContext</h2>
      <p>Current: {now.toLocaleString()}</p>
      <GrandChild />
      <hr />
    </div>
  )
}

const ParentUseContext = () => {
  const user: User = {
    id: 1,
    name: 'Alice',
  }
  return (
    // Contextに値を渡す
    <UserContext.Provider value={user}>
      <Child />
    </UserContext.Provider>
  )
}

export default ParentUseContext