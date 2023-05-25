import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

// get all campsites
export async function GET(req: Request, res: Response) {
	const campsites = await prisma.campsite.findMany()

	// console.log('campsites', campsites)
	return NextResponse.json(campsites)
}
