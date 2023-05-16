import { authOptions } from '../../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

// admin dashboard with features to manage campsites, users, and bookings
export default async function Dashboard() {
	const session = await getServerSession(authOptions)
	// console.log(session)
	if (!session) {
		redirect('/api/auth/signin')
	}

	const currentUserEmail = session?.user?.email!

	// console.log(currentUserEmail)
	const admin = await prisma.user.findFirst({
		where: {
			email: currentUserEmail,
			role: 'admin',
		},
	})

	!admin && redirect('/api/auth/signin')

	return (
		<div className='flex flex-col items-center justify-start min-h-screen gap-4 p-4'>
			<h1 className='text-4xl'>Admin Dashboard</h1>

			<div>
				<h3>Campsites List</h3>
			</div>
		</div>
	)
}
