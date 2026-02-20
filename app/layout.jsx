export const metadata = {
  title: 'Game Vault 777 — Create Account',
  description: 'Join Game Vault 777 and claim your $20 bonus.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Cinzel:wght@600;700;900&display=swap" rel="stylesheet" />
        <script src="https://unpkg.com/@phosphor-icons/web" async></script>
      </head>
      <body>{children}</body>
    </html>
  )
}