import GlobalStyle from './styles/globalStyles'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { onAccessTest } from './components/Account/TokenAuth'

//Pages
import Landing from './pages/Landing'
import Main from './pages/Main'
import DetailView from './pages/Detail'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Mypage from './pages/Mypage'

//Components
import Gnb from './components/Gnb/Gnb'
import Goal from './pages/Goal'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

function App() {
  // 로그인 상태인지 확인
  const dispatch = useDispatch()

  onAccessTest(dispatch)

  return (
    <>
      <GlobalStyle />
      <Gnb />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
        <Route path="/goal" element={<Goal />} />
        <Route path="/goal/detail/:id" element={<DetailView />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </>
  )
}

export default App
