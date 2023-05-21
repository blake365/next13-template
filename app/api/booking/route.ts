import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

// add a booking

// add a campsite
export async function POST(req: Request, res: Response) {
	console.log('start POST /api/booking')
	const session = await getServerSession(authOptions)

	const currentUserEmail = session?.user?.email!
	const user = await prisma.user.findFirst({
		where: {
			email: currentUserEmail,
		},
	})

	if (!user) {
		return NextResponse.error()
	}

	console.log('user', user)
	const data = await req.json()

	data.userId = user.id

	console.log('data', data)
	const booking = await prisma.booking.create({
		data,
	})

	return NextResponse.json(booking)
}
