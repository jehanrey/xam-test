import { createBrowserRouter } from 'react-router-dom'

import nonAuthRouter from './routes/nonAuth'
import authRouter from './routes/auth'
import App from './App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      authRouter,
      nonAuthRouter
    ]
  }
])

export default router