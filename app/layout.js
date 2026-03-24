import '../styles/globals.css'

export const metadata = {
  title: 'JEDI - AI Video Generation Platform',
  description: 'Generate stunning AI videos instantly',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
