import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/authContext.tsx'
import { TransactionsProvider } from './contexts/transactionsContext.tsx'
import { AccountsProvider } from './contexts/accountsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AccountsProvider>
        <TransactionsProvider>
          <App />
        </TransactionsProvider>
      </AccountsProvider>
    </AuthProvider>
  </StrictMode>,
)
