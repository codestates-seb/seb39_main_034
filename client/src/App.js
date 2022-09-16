import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import GlobalStyle from './styles/globalStyles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Pages
import Landing from './pages/Landing'

//Components
import Gnb from './components/Gnb/Gnb'
import Timeline from './components/diary/Timeline'
import Checklist from './components/todo/Checklist'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Gnb />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/check" element={<Checklist />} />
          {/* <Route exact path="/main" element={<Main />} /> */}
          {/* <Route exact path="/milestone" element={<Milestone />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} /> */}
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
