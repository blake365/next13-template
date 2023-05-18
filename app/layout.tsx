import AuthProvider from './AuthProvider'
import NavMenu from './NavMenu'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Camping on Lazy M Farm',
	description: '',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<AuthProvider>
			<html lang='en'>
				<body className={inter.className}>
					<NavMenu />
					<div className='max-w-full p-4 mx-auto lg:max-w-4xl'>{children}</div>
				</body>
			</html>
		</AuthProvider>
	)
}
