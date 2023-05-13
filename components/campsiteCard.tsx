// card for displaying campsite information

import Image from 'next/image'
import Link from 'next/link'

export default function CampsiteCard({ camp }: any) {
	// console.log(camp)
	return (
		<div className='flex flex-col items-center justify-between p-4 m-4 border-2 border-gray-200 rounded-md shadow-md'>
			<div className='flex flex-col items-center justify-between w-full h-48'>
				{/* <Image
					src={camp.image}
					alt={camp.title}
					width={300}
					height={200}
					className='rounded-md'
				/> */}
				<h2 className='text-xl'>{camp.title}</h2>
			</div>
			<div className='flex flex-col items-center justify-between w-full h-48'>
				<p>{camp.description}</p>
				<p>{camp.capacity} people</p>
				<p>${camp.price} / night</p>
				<Link href={`/campsite/${camp.id}`}>
					<button className='p-2 m-2 text-white bg-green-600 rounded-md shadow-md hover:bg-green-700'>
						Book Now
					</button>
				</Link>
			</div>
		</div>
	)
}
