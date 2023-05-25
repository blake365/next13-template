import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

// get a campsite
export async function GET(req: Request, res: Response) {
	const { searchParams } = new URL(req.url)
	const slug = searchParams.get('slug')
	// console.log('slug', slug)

	if (!slug) {
		return NextResponse.json("Missing 'slug' parameter")
	}

	const campsite = await prisma.campsite.findUnique({
		where: {
			slug: slug,
		},
	})

	return NextResponse.json(campsite)
}

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
	// console.log('data', data)
	const campsite = await prisma.campsite.create({
		data,
	})

	return NextResponse.json(campsite)
}
