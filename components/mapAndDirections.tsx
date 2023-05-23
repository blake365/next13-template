// component with map image and directions

import Image from 'next/image'

export default function MapAndDirections({ camp }: any) {
	const capitalizeFirstLetter = (string: string) => {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

	const directionItems = camp.directions
		.split(',')
		.map((direction: string, index: number) => (
			<li key={index}>{capitalizeFirstLetter(direction.trim())}</li>
		))

	return (
		<div>
			<h3 className='px-4 text-lg font-bold'>Directions</h3>
			<div className='px-4 text-md'>
				{camp.streetAddress}, {camp.city}, {camp.state} {camp.zip}
			</div>
			<div className='flex flex-row flex-wrap items-center justify-center w-full '>
				<Image
					src={camp.mapImage}
					alt={camp.slug}
					width={500}
					height={300}
					className='mx-auto my-4 border border-teal-600 rounded-md shadow-md'
				/>
				<div className='px-4 text-lg'>{directionItems}</div>
			</div>
		</div>
	)
}
