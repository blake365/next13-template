// image carousel component
'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ArrowSquareLeft, ArrowSquareRight } from '@phosphor-icons/react'

interface Props {
	images: string[]
}

export default function Carousel({ images }: Props) {
	const [index, setIndex] = useState(0)

	const next = () => {
		setIndex((index + 1) % images.length)
	}

	const prev = () => {
		setIndex((index - 1 + images.length) % images.length)
	}

	return (
		<div className=''>
			<div className='flex flex-col items-center justify-center w-full h-full '>
				<div className='flex flex-row items-center justify-center w-full h-full'>
					<div className='flex flex-row items-center justify-center w-1/12 h-full '>
						<ArrowSquareLeft
							size={50}
							weight='fill'
							className='cursor-pointer'
							onClick={prev}
						/>
					</div>
					<div className='flex flex-row items-center justify-center w-10/12 h-full'>
						<Image
							src={images[index]}
							alt={'campsite image ' + index}
							width={500}
							height={400}
							className='rounded-md shadow-md'
						/>
					</div>
					<div className='flex flex-row items-center justify-center w-1/12 h-full '>
						<ArrowSquareRight
							size={50}
							weight='fill'
							className='cursor-pointer'
							onClick={next}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
