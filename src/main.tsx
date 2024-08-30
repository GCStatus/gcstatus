import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import store from './store'

const container = document.querySelector('#root')!
const Root = createRoot(container!)

Root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
