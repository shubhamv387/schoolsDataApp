import { Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata = {
  title: 'School Database',
  description: 'school database app using next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={poppins.className} suppressHydrationWarning={true}>
        <Toaster />
        <h1 className='text-center text-xl font-semibold bg-amber-700 py-5'>School Database Management</h1>

        <main className='mx-auto my-10 max-w-7xl w-full flex flex-col items-center justify-center mt-10 px-4 md:px-2'>
          {children}
        </main>
      </body>
    </html>
  )
}
