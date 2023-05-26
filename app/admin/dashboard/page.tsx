import { authOptions } from '../../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { BookingColumns } from '@/components/bookTable/columns'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DataTable } from '@/components/bookTable/data-table'
import { UserColumns } from '@/components/userTable/columns'
import { CampColumns } from '@/components/campTable/columns'

// admin dashboard with features to manage campsites, users, and bookings
export default async function Dashboard() {
	const session = await getServerSession(authOptions)
	// console.log(session)
	if (!session) {
		redirect('/api/auth/signin')
	}

	const currentUserEmail = session?.user?.email!

	const admin = await prisma.user.findFirst({
		where: {
			email: currentUserEmail,
			role: 'admin',
		},
	})

	!admin && redirect('/api/auth/signin')

	const bookings = await prisma.booking.findMany({
		include: {
			campsite: true,
			User: true,
		},
	})

	const users = await prisma.user.findMany()

	const campsites = await prisma.campsite.findMany()

	return (
		<div className=''>
			<h1 className='text-4xl'>Admin Dashboard</h1>

			<div>
				<Tabs defaultValue='bookings' className='mx-auto'>
					<TabsList className=''>
						<TabsTrigger value='bookings'>Bookings</TabsTrigger>
						<TabsTrigger value='users'>Users</TabsTrigger>
						<TabsTrigger value='campsites'>Campsites</TabsTrigger>
						<TabsTrigger value='reviews'>Reviews</TabsTrigger>
						<TabsTrigger value='addons'>Addons</TabsTrigger>
					</TabsList>
					<TabsContent value='bookings'>
						<DataTable
							columns={BookingColumns}
							data={bookings}
							filter='status'
							button={false}
						/>
					</TabsContent>
					<TabsContent value='users'>
						<DataTable
							columns={UserColumns}
							data={users}
							filter='email'
							button={false}
						/>
					</TabsContent>
					<TabsContent value='campsites'>
						<DataTable
							columns={CampColumns}
							data={campsites}
							filter='open'
							button={true}
						/>
					</TabsContent>
					<TabsContent value='reviews'>
						<p>Reviews</p>
					</TabsContent>
					<TabsContent value='addons'>
						<p>Addons</p>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
