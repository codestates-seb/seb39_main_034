import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import GlobalStyle from './styles/globalStyles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Pages
import Gnb from './components/Gnb/Gnb'
import Landing from './pages/Landing'
import Main from './pages/Main'
import Milestone from './pages/Milestone'
import Create from './pages/Create'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Gnb />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/main" element={<Main />} />
          <Route exact path="/milestone" element={<Milestone />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
