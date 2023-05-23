// component with campsite rules

export default function Rules({ rules }: { rules: string }) {
	const capitalizeFirstLetter = (string: string) => {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

	const directionItems = rules
		.split(',')
		.map((direction: string, index: number) => (
			<li key={index}>{capitalizeFirstLetter(direction.trim())}</li>
		))

	return (
		<div className='p-4'>
			<h3 className='text-lg font-bold '>Campsite Rules</h3>

			<div className='text-lg '>{directionItems}</div>
		</div>
	)
}
