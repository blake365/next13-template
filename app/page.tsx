import Image from 'next/image'
import { prisma } from '@/lib/prisma'

import CampsiteCard from '@/components/campsiteCard'

export default async function Home() {
	const campsites = await prisma.campsite.findMany()

	// console.log(campsites)
	return (
		<main className='flex flex-col items-center min-h-screen p-24'>
			<h1>Welcome to the Farm</h1>
			<h3>A unique camping experience</h3>
			{campsites.map((camp) => (
				<CampsiteCard camp={camp} key={camp.id} />
			))}
		</main>
	)
}
