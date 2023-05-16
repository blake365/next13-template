// form for editing and adding campsite data

'use client'

import useState from 'react'

export function CampsiteForm({ campsite }: any) {
	const updateCampsite = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)

		const body = {
			id: campsite.id,
			name: formData.get('name'),
			location: formData.get('location'),
			latitude: formData.get('latitude'),
			longitude: formData.get('longitude'),
			capacity: formData.get('capacity'),
			pets: formData.get('pets'),
			price: formData.get('price'),
			open: formData.get('open'),
			longDescription: formData.get('longDescription'),
			shortDescription: formData.get('shortDescription'),
			mainImage: formData.get('mainImage'),
		}

		const res = await fetch('/api/campsite', {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		await res.json()
	}

	return (
		<div>
			<h2>Add/Edit Campsite</h2>
			<form onSubmit={updateCampsite}>
				<label htmlFor='name'>Name</label>
				<input type='text' name='name' defaultValue={campsite?.name ?? ''} />
				<label htmlFor='shortDescription'>Short Description</label>
				<textarea
					name='shortDescription'
					cols={30}
					rows={2}
					defaultValue={campsite?.shortDescription ?? ''}
				></textarea>
				<label htmlFor='longDescription'>Long Description</label>
				<textarea
					name='longDescription'
					cols={30}
					rows={10}
					defaultValue={campsite?.longDescription ?? ''}
				></textarea>

				<label htmlFor='location'>Location</label>
				<input
					type='text'
					name='location'
					defaultValue={campsite?.location ?? ''}
				/>

				<label htmlFor='latitude'>Latitude</label>
				<input
					type='number'
					name='latitude'
					defaultValue={campsite?.latitude ?? 0}
				/>

				<label htmlFor='longitude'>Longitude</label>
				<input
					type='number'
					name='longitude'
					defaultValue={campsite?.longitude ?? 0}
				/>

				<label htmlFor='capacity'>Capacity</label>
				<input
					type='number'
					name='capacity'
					defaultValue={campsite?.capacity ?? 2}
				/>

				<label htmlFor='pets'>Pets</label>
				<input
					type='checkbox'
					name='pets'
					defaultValue={campsite?.pets ?? false}
				/>

				<label htmlFor='open'>Open</label>
				<input
					type='checkbox'
					name='open'
					defaultValue={campsite?.open ?? false}
				/>

				<label htmlFor='price'>Price</label>
				<input
					type='number'
					name='price'
					defaultValue={campsite?.price ?? 30}
				/>

				<label htmlFor='image'>Main Image</label>
				<input
					type='text'
					name='image'
					defaultValue={campsite?.mainImage ?? ''}
				/>

				<button type='submit'>Save</button>
			</form>
		</div>
	)
}
