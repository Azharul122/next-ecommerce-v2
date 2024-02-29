"use client"
import { SkeletonTheme } from 'react-loading-skeleton'
import Footer from './Components/Footer'
import Header from './Components/Header'
import { GlobalProviders } from './Context/GlobalProvider'
import AuthProvider from './Context/Provider/AuthProvider'
import { WishProvider } from './Context/Provider/WishListContext'
import './globals.css'
import { Inter } from 'next/font/google'





export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SkeletonTheme >
          <AuthProvider>
            <WishProvider>
              <GlobalProviders>
                <Header></Header>
                {children}
                <Footer></Footer>
              </GlobalProviders>
            </WishProvider>
          </AuthProvider>
        </SkeletonTheme>
      </body>
    </html>
  )
}
