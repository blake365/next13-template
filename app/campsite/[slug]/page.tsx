import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import ImageBlock from '@/components/imageBlock'
import BookCalendar from '@/components/calendar'

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

// page containing detailed information about a campsite

export default async function CampsiteDetail({ params }: Props) {
	// console.log(params.slug)
	const camp = await prisma.campsite.findUnique({
		where: {
			slug: params.slug,
		},
		include: {
			bookings: true,
		},
	})

	if (!camp) {
		redirect('/')
	}

	// console.log(camp)

	let allImages = { main: '', image1: '', image2: '' }
	allImages.main = camp.mainImage
	allImages.image1 = camp.mainImage
	allImages.image2 = camp.mainImage

	return (
		<div className='flex flex-col justify-start min-h-screen gap-4 mb-6'>
			{/* header */}
			<h1 className='mt-4 text-5xl font-bold'>{camp.name}</h1>
			{/* campsite images */}
			<ImageBlock images={allImages} loading={false} />

			{/* other information */}
			<div className='flex flex-col sm:space-x-5 md:flex-row'>
				{/* description */}

				<div className='flex-grow'>
					<div className='text-lg'>{camp.longDescription}</div>
					<div>Camp amenities </div>
				</div>

				{/* booking calendar */}
				<div className=''>
					<BookCalendar camp={camp} />
				</div>
			</div>
			<div>Reviews</div>
		</div>
	)
}
