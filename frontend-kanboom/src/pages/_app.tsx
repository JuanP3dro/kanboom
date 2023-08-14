import BoardProvider from '@/context/boardContext';
import AuthProvider from '../context/authContext'
import '../styles/globals.css';
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <ToastContainer
    position="top-right"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />
  <AuthProvider>
    <BoardProvider>
      <Component {...pageProps} />
    </BoardProvider>
  </AuthProvider>
</>
}
