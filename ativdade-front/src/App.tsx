import { BrowserRouter, Route, Routes } from 'react-router-dom'
import List from './Views/List'
import Forms from './Views/Forms'
import Template from './Views/Template'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {

  return (
    <>    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <main className='place-self-start flex '>
          <Routes>
            <Route path='/' element={<Template />} >
              <Route path='/list' element={<List />} />
              <Route path='/form' element={<Forms />} />
            </Route>
            <Route path='*' element={<>PAGINA NÃO ECONTRADA</>} />
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
