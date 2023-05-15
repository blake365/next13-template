import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

interface Props {
	params: {
		slug: string
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const camp = await prisma.campsite.findUnique({
		where: { slug: params.slug },
	})
	return { title: `${camp?.name}` }
}

export default async function CampsiteDetail({ params }: Props) {
	console.log(params.slug)
	const camp = await prisma.campsite.findUnique({
		where: {
			slug: params.slug,
		},
	})

	if (!camp) {
		redirect('/')
	}

	return (
		<div>
			<h1>{camp.name}</h1>

			{/* <img
				width={300}
				src={image ?? '/mememan.webp'}
				alt={`${name}'s profile`}
			/> */}
		</div>
	)
}
