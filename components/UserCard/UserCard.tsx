import Link from 'next/link'
// import styles from './UserCard.module.css'

interface Props {
	id: string
	name: string | null
	age: number | null
	image: string | null
}

export default function UserCard({ id, name, age, image }: Props) {
	return (
		<div>
			<img src={image ?? '/mememan.webp'} alt={`${name}'s profile`} />
			<div>
				<h3>
					<Link href={`/users/${id}`}>{name}</Link>
				</h3>
				<p>{id}</p>
				<p>Age: {age}</p>
			</div>
		</div>
	)
}
