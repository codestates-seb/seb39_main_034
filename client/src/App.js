import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import GlobalStyle, { Container, Col, Row } from './styles/globalStyles'
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
import Test from './pages/Test'

axios.defaults.baseURL = process.env.REACT_APP_API_URL
// axios.defaults.withCredentials = true

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Container>
          <Row>
            <Col>
              <Gnb />
            </Col>
          </Row>
        </Container>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/main" element={<Main />} />
          <Route path="/goal" element={<Goal />} />
          <Route path="/goal/detail/:id" element={<DetailView />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
