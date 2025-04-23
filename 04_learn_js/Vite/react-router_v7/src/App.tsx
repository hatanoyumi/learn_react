import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Post from './pages/Post'
import Account from './pages/mypage/Account'
import Settings from './pages/mypage/Settings'
import Layout from './pages/mypage/Layout'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/post/:id' element={<Post />} />
      <Route path='/mypage' element={<Layout />}>
        <Route path='account' element={<Account />} />
        <Route path='settings' element={<Settings />} />
      </Route>
    </Routes>

  )
}

export default App;
