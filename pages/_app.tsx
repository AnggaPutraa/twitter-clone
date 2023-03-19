import Layout from '@/components/Layout'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import EditModal from '@/components/modals/EditModal'

export default function App({ Component, pageProps }: AppProps) {
  const toastStyleOptions = {
    style: {
      color: 'white',
    },
    success: {
      style: {
        background: '#171717',
      },
    },
    error: {
      style: {
        background: '#171717',
      },
    },
  }
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster toastOptions={toastStyleOptions} />
      <EditModal />
      <LoginModal />
      <RegisterModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
