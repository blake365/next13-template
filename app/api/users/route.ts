import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

// export async function GET(request: Request) {
// 	const users = await prisma.user.findMany()
// 	console.log(users)
// 	return NextResponse.json(users)
// }

export async function PUT(req: Request) {
	const session = await getServerSession(authOptions)

	const currentUserEmail = session?.user?.email!
	console.log('currentUserEmail', currentUserEmail)
	const data = await req.json()
	data.age = Number(data.age)
	console.log('data', data)
	const user = await prisma.user.update({
		where: {
			email: currentUserEmail,
		},
		data,
	})

	return NextResponse.json(user)
}
