import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

// edit a campsite
export async function PUT(req: Request, res: Response) {
	const session = await getServerSession(authOptions)

	const currentUserEmail = session?.user?.email!
	const admin = await prisma.user.findFirst({
		where: {
			email: currentUserEmail,
			role: 'admin',
		},
	})

	if (!admin) {
		return NextResponse.json({
			error: 'You are not authorized to edit this campsite.',
		})
	}

	const data = await req.json()
	data.slug = data.name.toLowerCase().replace(/ /g, '_')
	// console.log('data', data)
	const campsite = await prisma.campsite.update({
		where: {
			id: data.id,
		},
		data,
	})

	return NextResponse.json(campsite)
}

// add a campsite
export async function POST(req: Request, res: Response) {
	const session = await getServerSession(authOptions)

	const currentUserEmail = session?.user?.email!
	const admin = await prisma.user.findFirst({
		where: {
			email: currentUserEmail,
			role: 'admin',
		},
	})

	if (!admin) {
		return NextResponse.json({
			error: 'You are not authorized to add a campsite.',
		})
	}

	const data = await req.json()
	data.slug = data.name.toLowerCase().replace(/ /g, '_')
	delete data.id
	// console.log('data', data)
	const campsite = await prisma.campsite.create({
		data,
	})

	return NextResponse.json(campsite)
}
