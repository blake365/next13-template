// wrapper to display campsites in admin dashboard
'use client'
import { useEffect, useState, useTransition } from 'react'
import CampsiteCard from './campsiteCard'
import { PlusCircle, Pencil } from '@phosphor-icons/react'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function useCamps() {
	const { data, error, isLoading } = useSWR('/api/campsite', fetcher)

	return {
		campsites: data,
		isLoading,
		isError: error,
	}
}

export default function AdminCampWrapper({ admin }: any) {
	const [campId, setCampId] = useState()

	const { campsites, isLoading } = useCamps()

	console.log(campsites)

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className='flex flex-row flex-wrap items-center h-full justify-evenly'>
			<button className='flex flex-col items-center justify-center text-blue-600 align-middle hover:text-blue-400'>
				<div>Add Campsite</div>
				<PlusCircle size={60} weight='fill' />
			</button>
			{campsites.map((campsite) => (
				<>
					{admin && (
						<button
							className='relative flex justify-center w-full h-full bg-gray-300 border border-black rounded-md hover:bg-gray-200'
							onClick={() => {
								setCampId(campsite.id)
								// console.log(campId)
							}}
						>
							<Pencil size={42} weight='fill' className='text-blue-600' />
						</button>
					)}
					<CampsiteCard camp={campsite} key={campsite.id} />
				</>
			))}
		</div>
	)
}
