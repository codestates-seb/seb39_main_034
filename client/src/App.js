import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import store from './redux/store'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import GlobalStyle from './styles/globalStyles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

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
  return (
    <BrowserRouter>
      <CookiesProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
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
          </ThemeProvider>
        </Provider>
      </CookiesProvider>
    </BrowserRouter>
  )
}

export default App
