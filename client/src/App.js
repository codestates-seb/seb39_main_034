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

//Components
import Gnb from './components/Gnb/Gnb'
import Goal from './pages/Goal'

import Test from './pages/Test'

axios.defaults.baseURL = process.env.REACT_APP_API_URL
// axios.defaults.withCredentials = true

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Gnb />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/main" element={<Main />} />
          <Route exact path="/goal" element={<Goal />} />
          <Route exact path="/goal/detail/:id" element={<DetailView />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/test" element={<Test />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
