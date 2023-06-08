// component to upload pictures to supabase storage bucket

'use client'

import { useEffect, useState } from 'react'

import { supabase } from '../config/config'
import Image from 'next/image'
import { Button } from './ui/button'
import { useRouter } from 'next/router'

function PictureUpload({ camp }) {
	const [loading, setLoading] = useState(false)
	// const [pictures, setPictures] = useState([])

	const [file, setFile] = useState<File>()
	const [name, setName] = useState<string>('')

	const pictures = [camp.mainImage, camp.image2, camp.image3]

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFile(e.target?.files[0])
		setName(e.target.name)
	}
	// console.log(selected.ID)

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setLoading(true)
		e.preventDefault()
		console.log(name)
		// Upload the file to Supabase storage
		const { data, error } = await supabase.storage
			.from('images')
			.upload(`${file.name}`, file, {
				cacheControl: '3600',
				upsert: false,
			})

		// Handle the response from the API
		if (!data) {
			console.error('Failed to upload photo', error)
			setLoading(false)

			return
		}
		// Extract the file URL from the response

		const fileUrl =
			'https://hkalrotbophnaqzzywdi.supabase.co/storage/v1/object/public/images/' +
			data.path

		if (name === 'mainImage') {
			// send an api request to update the mainImage on the campsite
			const body = {
				id: camp.id,
				mainImage: fileUrl,
				process: 'upload',
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
			// router.push(`/admin/campsite/${data.slug}`)
		} else if (name === 'image2') {
			// send an api request to update the image2 on the campsite
			const body = {
				id: camp.id,
				image2: fileUrl,
				process: 'upload',
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
		} else if (name === 'image3') {
			// send an api request to update the image3 on the campsite
			const body = {
				id: camp.id,
				image3: fileUrl,
				process: 'upload',
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
		} else return

		// Handle the result from the API

		setLoading(false)
	}

	return (
		<div className='flex flex-col space-y-2'>
			<h2>Campsite Photos</h2>
			<form onSubmit={handleFormSubmit}>
				<input type='file' onChange={handleFileChange} name='mainImage' />
				<Button variant='secondary' type='submit'>
					Upload Main Photo
				</Button>
			</form>
			<form onSubmit={handleFormSubmit}>
				<input type='file' onChange={handleFileChange} name='image2' />
				<Button variant='secondary' type='submit'>
					Upload Second Photo
				</Button>
			</form>
			<form onSubmit={handleFormSubmit}>
				<input type='file' onChange={handleFileChange} name='image3' />
				<Button variant='secondary' type='submit'>
					Upload Third Photo
				</Button>
			</form>
			{/* <div className='flex flex-row flex-wrap m-2 space-x-2 space-y-2'>
				{pictures.length > 0 ? '' : <div>Pictures have not been added.</div>}
				{pictures.map((image) => {
					return (
						<Image
							src={image}
							alt='default'
							width={150}
							height={150}
							key={image}
						/>
					)
				})}
			</div> */}
		</div>
	)
}

export default PictureUpload
