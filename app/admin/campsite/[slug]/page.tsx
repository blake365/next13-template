'use client'

import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import PictureUpload from '@/components/pictureUpload'

interface Props {
	params: {
		slug: string
	}
}

// page with form to edit campsite data

export default function CampsiteDetail({ params }: Props) {
	const { data: session, status } = useSession()

	if (!session) {
		redirect('/api/auth/signin')
	}

	if (session?.user.role !== 'admin') {
		redirect('/api/auth/signin')
	}

	const router = useRouter()
	// console.log(params.slug)
	const [camp, setCamp] = useState<any>({})
	const [loading, setLoading] = useState(true)

	// console.log(camp)
	const updateCamp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)

		const body = {
			id: camp.id,
			name: formData.get('name'),
			longDescription: formData.get('longDescription'),
			shortDescription: formData.get('shortDescription'),
			rules: formData.get('rules'),
			cancellation: formData.get('cancellation'),
			location: formData.get('location'),
			latitude: formData.get('latitude'),
			longitude: formData.get('longitude'),
			directions: formData.get('directions'),
			streetAddress: formData.get('streetAddress'),
			city: formData.get('city'),
			state: formData.get('state'),
			zip: formData.get('zip'),
			capacity: formData.get('capacity'),
			price: formData.get('price'),
			open: formData.get('open'),
			primitive: formData.get('primitive'),
			picnicTable: formData.get('picnicTable'),
			firePit: formData.get('firePit'),
			pets: formData.get('pets'),
			toilets: formData.get('toilets'),
			electricity: formData.get('electricity'),
			potableWater: formData.get('potableWater'),
		}

		const res = await fetch('/api/campsite', {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const data = await res.json()

		console.log(data)
		router.push(`/admin/campsite/${data.slug}`)
	}

	useEffect(() => {
		const url = new URL('/api/campsite', window.location.origin)
		url.search = new URLSearchParams({ slug: params.slug }).toString()

		const fetchCamp = async () => {
			const response = await fetch(url)
			const data = await response.json()
			return data
		}

		fetchCamp().then((res) => {
			// console.log(res)
			setCamp(res)
			setLoading(false)
		})
	}, [])

	return (
		<>
			<div className='flex justify-between mb-2'>
				<h1 className='text-4xl font-bold'>Update {camp.name}</h1>
				<Link
					href={`/campsite/${camp.slug}`}
					className='p-2 underline hover:text-gray-600'
				>
					go to page
				</Link>
			</div>
			<form onSubmit={updateCamp}>
				<div className='flex flex-col justify-start gap-4 mb-6 md:flex-row '>
					<div className='w-full md:w-1/2'>
						<Label htmlFor='name'>Camp Name</Label>
						<Input type='text' name='name' defaultValue={camp.name ?? ''} />
						<Label htmlFor='longDescription'> Long Description </Label>
						<Textarea
							name='longDescription'
							cols={30}
							rows={10}
							defaultValue={camp.longDescription ?? ''}
						></Textarea>
						<Label htmlFor='shortDescription'> Card Description </Label>

						<Textarea
							name='shortDescription'
							cols={30}
							rows={3}
							defaultValue={camp.shortDescription ?? ''}
						></Textarea>
						<Label htmlFor='rules'> Rules </Label>
						<Textarea
							name='rules'
							cols={30}
							rows={6}
							defaultValue={camp.rules ?? ''}
						></Textarea>
						<Label htmlFor='cancellation'> Cancellation Policy </Label>
						<Textarea
							name='cancellation'
							cols={30}
							rows={6}
							defaultValue={camp.cancellation ?? ''}
						></Textarea>
						<Label htmlFor='location'>Location</Label>
						<Input
							type='text'
							name='location'
							defaultValue={camp.location ?? ''}
						/>

						<Label htmlFor='latitude'>Latitude</Label>
						<Input
							type='number'
							name='latitude'
							defaultValue={camp.latitude ?? ''}
						/>
						<Label htmlFor='longitude'>Longitude</Label>
						<Input
							type='number'
							name='longitude'
							defaultValue={camp.longitude ?? ''}
						/>

						<Label htmlFor='directions'> Directions </Label>
						<Textarea
							name='directions'
							cols={30}
							rows={6}
							defaultValue={camp.directions ?? ''}
						></Textarea>

						<Label htmlFor='streetAddress'> Street Address </Label>
						<Input
							type='text'
							name='streetAddress'
							defaultValue={camp.streetAddress ?? ''}
						/>

						<Label htmlFor='city'> City </Label>
						<Input type='text' name='city' defaultValue={camp.city ?? ''} />

						<Label htmlFor='state'> State </Label>
						<Input type='text' name='state' defaultValue={camp.state ?? ''} />

						<Label htmlFor='zip'> Zip </Label>
						<Input type='text' name='zip' defaultValue={camp.zip ?? ''} />

						<Label htmlFor='capacity'> Capacity </Label>
						<Input
							type='number'
							name='capacity'
							defaultValue={camp.capacity ?? 2}
						/>

						<Label htmlFor='price'> Price </Label>
						<Input type='number' name='price' defaultValue={camp.price ?? 20} />
					</div>

					<div className='flex flex-row flex-wrap items-start justify-start w-full md:flex-col md:w-1/3'>
						<div className='flex flex-col p-1 space-y-1 h-fit'>
							<Label htmlFor='open'>Open</Label>
							<select
								name='open'
								id='open'
								className='p-1 border shadow-sm'
								defaultValue={camp.open ?? false}
							>
								<option value='true'>Open</option>
								<option value='false'>Closed</option>
							</select>
						</div>

						<div className='flex flex-col p-1 space-y-1 h-fit'>
							<Label htmlFor='primitive'>Primitive</Label>
							<select
								name='primitive'
								id='primitive'
								defaultValue={camp.primitive ?? false}
								className='p-1 border shadow-sm'
							>
								<option value='true'>Yes</option>
								<option value='false'>No</option>
							</select>
						</div>

						<div className='flex flex-col p-1 space-y-1 h-fit'>
							<Label htmlFor='picnicTable'>Picnic Table</Label>
							<select
								name='picnicTable'
								id='picnicTable'
								defaultValue={camp.picnicTable ?? false}
								className='p-1 border shadow-sm'
							>
								<option value='true'>Available</option>
								<option value='false'>Not Available</option>
							</select>
						</div>

						<div className='flex flex-col p-1 space-y-1 h-fit'>
							<Label htmlFor='firePit'>Fire Pit</Label>
							<select
								name='firePit'
								id='firePit'
								defaultValue={camp.firePit ?? false}
								className='p-1 border shadow-sm'
							>
								<option value='true'>Available</option>
								<option value='false'>Not Available</option>
							</select>
						</div>
						<div className='flex flex-col p-1 space-y-1 h-fit'>
							<Label htmlFor='pets'>Pets</Label>
							<select
								name='pets'
								id='pets'
								className='p-1 border shadow-sm'
								defaultValue={camp.pets ?? false}
							>
								<option value='true'>Allowed</option>
								<option value='false'>Not Allowed</option>
							</select>
						</div>

						<div className='flex flex-col p-1 space-y-1 h-fit'>
							<Label htmlFor='electricity'>Electricity</Label>
							<select
								name='electricity'
								id='electricity'
								defaultValue={camp.electricity ?? false}
								className='p-1 border shadow-sm'
							>
								<option value='true'>Available</option>
								<option value='false'>Not Available</option>
							</select>
						</div>

						<div className='flex flex-col p-1 space-y-1 h-fit'>
							<Label htmlFor='potableWater'>Potable Water</Label>
							<select
								name='potableWater'
								id='potableWater'
								defaultValue={camp.potableWater ?? false}
								className='p-1 border shadow-sm'
							>
								<option value='true'>Available</option>
								<option value='false'>Not Available</option>
							</select>
						</div>

						<div className='flex flex-col p-1 space-y-1 h-fit'>
							<Label htmlFor='toilets'>Toilets</Label>
							<select
								name='toilets'
								id='toilets'
								defaultValue={camp.toilets ?? false}
								className='p-1 border shadow-sm'
							>
								<option value='true'>Available</option>
								<option value='false'>Not Available</option>
							</select>
						</div>
					</div>
				</div>
				<Button type='submit' variant='default'>
					Update Camp
				</Button>
			</form>
			{/* image uploads */}
			<PictureUpload camp={camp} />
		</>
	)
}
