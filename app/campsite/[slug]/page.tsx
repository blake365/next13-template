import Carousel from '@/components/carousel'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Image from 'next/image'

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
	})

	if (!camp) {
		redirect('/')
	}

	let allImages: string[] = []
	camp.mainImage && allImages.push(camp.mainImage)

	if (camp.images.length > 0) {
		allImages = allImages.concat(camp.images)
	}

	return (
		<div className='flex flex-col justify-start min-h-screen gap-4'>
			{/* header */}
			<h1 className='mt-4 text-5xl'>{camp.name}</h1>
			{/* campsite images */}
			<div className='flex sm:flex-row flex-col w-full sm:h-[500px] min-h-fit gap-2'>
				{/* large image */}
				<div className='relative h-full overflow-hidden min-h-[400px] sm:w-1/2'>
					<Image
						src={camp.mainImage!}
						alt={camp.name}
						// width={500}
						// height={500}
						fill={true}
						className='rounded-md shadow-md'
						style={{ objectFit: 'cover' }}
					/>
				</div>
				{/* small images */}
				<div className='flex flex-col h-full gap-2 sm:w-1/2'>
					<div className='relative min-h-[200px] h-full  sm:h-1/2'>
						<Image
							src={camp.mainImage!}
							alt={camp.name}
							// width={500}
							// height={500}
							fill={true}
							className='rounded-md shadow-md'
							style={{ objectFit: 'cover' }}
						/>
					</div>
					<div className='relative min-h-[200px] h-full sm:h-1/2'>
						<Image
							src={camp.mainImage!}
							alt={camp.name}
							// width={500}
							// height={500}
							fill={true}
							className='rounded-md shadow-md'
							style={{ objectFit: 'cover' }}
						/>
					</div>
				</div>
			</div>

			{/* other information */}
			<div className='flex flex-col justify-center space-x-5 md:flex-row'>
				{/* description */}

				<div>
					<div>{camp.longDescription}</div>
					<div>Camp amenities </div>
					<div>Reviews</div>
				</div>

				{/* booking calendar */}
				<div>Calendar</div>
			</div>
			{/* {admin && (
				<div>
					<CampsiteForm campsite={camp} />
				</div>
			)} */}
		</div>
	)
}
