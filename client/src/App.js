import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import GlobalStyle from './styles/globalStyles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Pages
import Landing from './pages/Landing'
import Main from './pages/Main'
import DetailView from './pages/Detail'
import Create from './pages/Create'
import Signup from './pages/Signup'
import Login from './pages/Login'

//Components
import Gnb from './components/Gnb/Gnb'
import Goal from './pages/Goal'

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
          <Route exact path="/detail" element={<DetailView />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
