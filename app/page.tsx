import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
	const session = await getServerSession(authOptions)
	// console.log(session)

	if (!session) {
		redirect('/api/auth/signin')
	}

	return (
		<main className='flex flex-col items-center justify-between min-h-screen p-24'>
			<h1>Hello World</h1>
		</main>
	)
}
