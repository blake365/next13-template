import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Props {
	params: {
		id: string
	}
}

export async function generateMetadata(): Promise<Metadata> {
	return { title: 'User profile' }
}

export default async function UserProfile({ params }: Props) {
	// console.log(params.id)

	const session = await getServerSession(authOptions)
	// console.log(session)
	if (!session) {
		redirect('/api/auth/signin')
	}

	const currentUserEmail = session?.user?.email!

	const user = await prisma.user.findUnique({
		where: {
			id: params.id,
		},
		include: {
			bookings: {
				include: {
					campsite: true,
				},
				orderBy: {
					createdAt: 'desc',
				},
			},
			reviews: true,
		},
	})

	const {
		id,
		firstName,
		lastName,
		dateOfBirth,
		streetAddress,
		city,
		state,
		zip,
		email,
		bookings,
		reviews,
	} = user ?? {}

	if (email !== currentUserEmail) {
		redirect('/')
	}

	// console.log(bookings)
	return (
		<div className='flex flex-col justify-start min-h-screen gap-4 mb-6 '>
			{/* TODO: Style user profile add edit profile button and form */}
			<h1 className='text-3xl'>Your Profile</h1>
			<div>
				<h3 className='text-xl'>Personal Info</h3>
				<div>First Name: {firstName}</div>
				<div>Last Name: {lastName}</div>
				<div>Email: {email}</div>
				<div>
					Address: {streetAddress} {city}, {state} {zip}
				</div>
				<div>Date of Birth: {dateOfBirth?.toDateString()}</div>
			</div>
			<h3 className='text-xl'>Bookings</h3>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead></TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Booking Date</TableHead>
						<TableHead>Campsite</TableHead>
						<TableHead>Check In</TableHead>
						<TableHead>Check Out</TableHead>
						<TableHead>Guests</TableHead>
						<TableHead>Nights</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{bookings?.map((booking) => (
						<TableRow key={booking.id}>
							<TableCell>
								<Button variant='outline'>
									<Link href={`/booking/${booking.id}`}>Details</Link>
								</Button>
							</TableCell>
							<TableCell>{booking.status}</TableCell>
							<TableCell>{booking.createdAt.toDateString()}</TableCell>
							<TableCell>{booking.campsite.name}</TableCell>
							<TableCell>{booking.startDate.toDateString()}</TableCell>
							<TableCell>{booking.endDate.toDateString()}</TableCell>
							<TableCell>{booking.numberOfGuests}</TableCell>
							<TableCell>{booking.numberOfNights}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* TODO: Reviews */}
		</div>
	)
}
