export const dynamic = 'force-static'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Camping on Lazy M Farm',
	description: '',
}

import { prisma } from '@/lib/prisma'

import CampsiteCard from '@/components/campsiteCard'

// ssr landing page for the farm

export default async function Home() {
	const campsites = await prisma.campsite.findMany()

	// console.log(campsites)
	return (
		<main className='flex flex-col items-center min-h-screen p-4'>
			<h1 className='mt-2 text-6xl'>Welcome to the Farm</h1>
			<h3 className='mt-1 text-3xl'>A unique camping experience</h3>
			{campsites.map((camp) => (
				<CampsiteCard camp={camp} key={camp.id} admin={false} />
			))}
		</main>
	)
}
