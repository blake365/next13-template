'use client'

import { signOut } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export function SignInButton() {
	const { data: session, status } = useSession()
	// console.log(session, status)

	if (status === 'loading') {
		return <>...</>
	}

	if (status === 'authenticated') {
		return (
			<>
				<Link href={`/dashboard`}>My Profile</Link>
				<SignOutButton />
			</>
		)
	}

	return <button onClick={() => signIn()}>Sign in</button>
}

export function SignOutButton() {
	return <button onClick={() => signOut()}>Sign Out</button>
}
