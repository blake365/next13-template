'use client'

import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Props {
	params: {
		slug: string
	}
}

// page with form to edit campsite data

export default function CampsiteDetail({ params }: Props) {
	console.log(params.slug)
	const [camp, setCamp] = useState<any>({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const url = new URL('/api/campsite', window.location.origin)
		url.search = new URLSearchParams({ slug: params.slug }).toString()

		const fetchCamp = async () => {
			const response = await fetch(url)
			const data = await response.json()
			return data
		}

		fetchCamp().then((res) => {
			console.log(res)
			setCamp(res)
			setLoading(false)
		})
	}, [])

	// console.log(camp)
	const updateCamp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
	}

	return (
		<form onSubmit={updateCamp}>
			{loading ? (
				<div>loading...</div>
			) : (
				<div className='flex flex-col justify-start min-h-screen gap-4 mb-6 '>
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
						rows={10}
						defaultValue={camp.shortDescription ?? ''}
					></Textarea>
					<Label htmlFor='rules'> Rules </Label>
					<Textarea
						name='rules'
						cols={30}
						rows={10}
						defaultValue={camp.rules ?? ''}
					></Textarea>
					<Label htmlFor='cancellation'> Cancellation Policy </Label>
					<Textarea
						name='cancellation'
						cols={30}
						rows={10}
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
						rows={10}
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

					<Label htmlFor='pets'>Pets</Label>
					<select name='pets' id='pets' defaultValue={camp.pets ?? false}>
						<option value='true'>Allowed</option>
						<option value='false'>Not Allowed</option>
					</select>

					<Label htmlFor='open'>Open</Label>
					<select name='open' id='open' defaultValue={camp.open ?? false}>
						<option value='true'>Open</option>
						<option value='false'>Closed</option>
					</select>

					<Label htmlFor='electricity'>Electricity</Label>
					<select
						name='electricity'
						id='electricity'
						defaultValue={camp.electricity ?? false}
					>
						<option value='true'>Available</option>
						<option value='false'>Not Available</option>
					</select>

					<Label htmlFor='potableWater'>Potable Water</Label>
					<select
						name='potableWater'
						id='potableWater'
						defaultValue={camp.potableWater ?? false}
					>
						<option value='true'>Available</option>
						<option value='false'>Not Available</option>
					</select>

					<Label htmlFor='toilets'>Toilets</Label>
					<select
						name='toilets'
						id='toilets'
						defaultValue={camp.toilets ?? false}
					>
						<option value='true'>Available</option>
						<option value='false'>Not Available</option>
					</select>

					<Label htmlFor='primitive'>Primitive</Label>
					<select
						name='primitive'
						id='primitive'
						defaultValue={camp.primitive ?? false}
					>
						<option value='true'>Yes</option>
						<option value='false'>No</option>
					</select>

					<Label htmlFor='picnicTable'>Picnic Table</Label>
					<select
						name='picnicTable'
						id='picnicTable'
						defaultValue={camp.picnicTable ?? false}
					>
						<option value='true'>Available</option>
						<option value='false'>Not Available</option>
					</select>

					<Label htmlFor='firePit'>Fire Pit</Label>
					<select
						name='firePit'
						id='firePit'
						defaultValue={camp.firePit ?? false}
					>
						<option value='true'>Available</option>
						<option value='false'>Not Available</option>
					</select>

					{/* image uploads */}
				</div>
			)}
			<button type='submit'>Update Camp</button>
		</form>
	)
}
