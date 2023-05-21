// booking calendar component
'use client'

import { useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { format } from 'date-fns'
import { signIn, useSession } from 'next-auth/react'
import { revalidatePath } from 'next/cache'

const css = `
    .my-selected:not([disabled]) {
    font-weight: semi-bold;
    background-color: teal;
    color: white;
    }

    .my-selected:not([disabled]):hover {
    background-color: teal !important;
    color: white;
    }

    .my-selected {
        background-color: teal !important;
        color: white !important;
    }
`

export default function BookCalendar({ camp }) {
	const [guests, setGuests] = useState<number>(2)
	const [range, setRange] = useState<DateRange | undefined>()

	const { data: session, status } = useSession()

	let footer = <p>Please pick the first day.</p>
	if (range?.from) {
		if (!range.to) {
			footer = <p>Check in: {format(range.from, 'PPP')}</p>
		} else if (range.to) {
			footer = (
				<div>
					<p>Check in: {format(range.from, 'PPP')} </p>
					<p>Check out: {format(range.to, 'PPP')}</p>
				</div>
			)
		}
	}

	// create a booking
	const createBooking = async () => {
		// check if user is logged in
		if (!session) {
			console.log('please log in')
			signIn()
		}
		// check if range is valid
		if (!range?.from || !range?.to) {
			console.log('please select a valid range')
			return
		}
		// get the number of days
		const days = (range?.to - range?.from) / 60 / 60 / 24 / 1000
		// console.log(days)
		// create the booking
		const bookingData = {
			campsiteId: camp.id,
			numberOfGuests: guests,
			numberOfNights: days,
			startDate: range.from,
			endDate: range.to,
			totalCost: camp.price * days,
		}

		const res = await fetch('/api/booking', {
			method: 'POST',
			body: JSON.stringify(bookingData),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		await res.json()
		revalidatePath(`/campsite/${camp.slug}`)
	}

	let bookedDays = camp.bookings.map((booking) => {
		return {
			from: booking.startDate,
			to: booking.endDate,
		}
	})

	bookedDays.push({ before: new Date() })

	const disabledDays = bookedDays

	// console.log((range?.to - range?.from) / 60 / 60 / 24 / 1000 + 1)

	return (
		<div className='flex flex-col p-2 mx-auto space-y-2 bg-gray-100 border border-gray-700 rounded-md shadow-md w-fit'>
			<style>{css}</style>
			<div className='flex flex-row items-center justify-between mr-6 align-middle'>
				<h3 className='inline ml-5 text-xl font-bold'>Price per Night:</h3>
				<p className='inline ml-2 text-xl font-bold'>${camp.price}</p>
			</div>

			<div className='flex flex-row items-center justify-between mr-6 align-middle'>
				<h3 className='ml-5 text-xl font-bold '>Number of Guests:</h3>
				<input
					className='w-12 p-1 text-center border border-teal-600 rounded-sm shadow-sm bg-gray-50'
					// placeholder='2'
					type='number'
					min='1'
					max={camp.capacity}
					value={guests}
					onChange={(e) => setGuests(parseInt(e.target.value))}
				/>
			</div>
			<div className=''>
				<DayPicker
					defaultMonth={new Date()}
					mode='range'
					min={2}
					max={5}
					selected={range}
					showOutsideDays
					modifiersClassNames={{ selected: 'my-selected' }}
					styles={{
						caption: { color: 'teal' },
					}}
					modifiersStyles={{ disabled: { color: 'gray', fontSize: '80%' } }}
					disabled={disabledDays}
					onSelect={setRange}
					footer={footer}
				/>
			</div>
			<div className='flex flex-row items-center justify-between mr-6 align-middle'>
				<h3 className='inline ml-5 text-xl font-bold'>Total:</h3>
				{range?.to && range?.from ? (
					<p className='inline ml-2 text-xl font-bold'>
						${camp.price * ((range?.to - range?.from) / 60 / 60 / 24 / 1000)}
					</p>
				) : (
					<p>...</p>
				)}
			</div>
			<button
				className='p-2 mb-4 text-white bg-teal-600 rounded-md disabled:opacity-50 hover:bg-teal-700 disabled:cursor-not-allowed'
				disabled={!range?.to || !range}
				onClick={() => {
					console.log('booking start')
					createBooking()
				}}
			>
				Book Campsite
			</button>
		</div>
	)
}
