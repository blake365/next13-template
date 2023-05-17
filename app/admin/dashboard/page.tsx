import { authOptions } from '../../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdminCampWrapper from '@/components/adminCampWrapper'

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
		<div className=''>
			<h1 className='text-4xl'>Admin Dashboard</h1>

			<div>
				<Tabs defaultValue='bookings' className='mx-auto'>
					<TabsList className=''>
						<TabsTrigger value='bookings'>Bookings</TabsTrigger>
						<TabsTrigger value='users'>Users</TabsTrigger>
						<TabsTrigger value='campsites'>Campsites</TabsTrigger>
					</TabsList>
					<TabsContent value='bookings'>List of bookings here</TabsContent>
					<TabsContent value='users'>List of users here</TabsContent>
					<TabsContent value='campsites'>
						<AdminCampWrapper admin={admin} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
