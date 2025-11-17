import Link from 'next/link'
import { useRouter } from 'next/router'

const BottomNav = () => {
	const router = useRouter()

	return (
		<div className='sm:hidden'>
			<nav className='fixed bottom-0 w-full border-t bg-zinc-100 pb-safe dark:border-zinc-800 dark:bg-zinc-900'>
				<div className='mx-auto flex h-16 max-w-md items-center justify-around px-6'>
					{links.map(({ href, label, icon }) => (
						<Link
							key={label}
							href={href}
							className={`flex h-full w-full flex-col items-center justify-center space-y-1 ${
								router.pathname === href
									? 'text-indigo-500 dark:text-indigo-400'
									: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
							}`}
						>
							{icon}
							<span className='text-xs text-zinc-600 dark:text-zinc-400'>
								{label}
							</span>
						</Link>
					))}
				</div>
			</nav>
		</div>
	)
}

export default BottomNav

const links = [
	{
		label: 'Home',
		href: '/',
		icon: (
			<svg
				viewBox='0 0 15 15'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				width='18'
				height='18'
			>
				<path
					d='M7.5.5l.325-.38a.5.5 0 00-.65 0L7.5.5zm-7 6l-.325-.38L0 6.27v.23h.5zm5 8v.5a.5.5 0 00.5-.5h-.5zm4 0H9a.5.5 0 00.5.5v-.5zm5-8h.5v-.23l-.175-.15-.325.38zM1.5 15h4v-1h-4v1zm13.325-8.88l-7-6-.65.76 7 6 .65-.76zm-7.65-6l-7 6 .65.76 7-6-.65-.76zM6 14.5v-3H5v3h1zm3-3v3h1v-3H9zm.5 3.5h4v-1h-4v1zm5.5-1.5v-7h-1v7h1zm-15-7v7h1v-7H0zM7.5 10A1.5 1.5 0 019 11.5h1A2.5 2.5 0 007.5 9v1zm0-1A2.5 2.5 0 005 11.5h1A1.5 1.5 0 017.5 10V9zm6 6a1.5 1.5 0 001.5-1.5h-1a.5.5 0 01-.5.5v1zm-12-1a.5.5 0 01-.5-.5H0A1.5 1.5 0 001.5 15v-1z'
					fill='currentColor'
				/>
			</svg>
		),
	},
	{
		label: 'Survey',
		href: '/survey',
		icon: (
			<svg
				viewBox='0 0 15 15'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				width='18'
				height='18'
			>
				<path
					d='M11 3h1v1h-1V3zM6 3h1v1H6V3zM1 3h1v1H1V3zm10 4h1v1h-1V7zM6 7h1v1H6V7zM1 7h1v1H1V7zm10 4h1v1h-1v-1zm-5 0h1v1H6v-1zm-5 0h1v1H1v-1z'
					fill='currentColor'
				/>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M2 1a1 1 0 00-1 1v11a1 1 0 001 1h11a1 1 0 001-1V2a1 1 0 00-1-1H2zM0 2a2 2 0 012-2h11a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V2z'
					fill='currentColor'
				/>
			</svg>
		),
	},
	{
		label: 'Assignments',
		href: '/assignments',
		icon: (
			<svg
				viewBox='0 0 15 15'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				width='18'
				height='18'
			>
				<path
					d='M3.5 0v.5V0zm0 15v.5V15zm0-15h8V0h-8v1zm8 0v.5a.5.5 0 00.5-.5h-.5zm0 0h.5a.5.5 0 00-.146-.354L11.5 0zm3 3h.5a.5.5 0 00-.146-.354L14.5 3zm-3-3v3h1V0h-1zm.5 2.5h3v-1h-3v1zm-.5.5v12h1V3h-1zM11.5 15h-8v1h8v-1zm-7.5-.5v-14H3v14h1zM11.146.146l3 3 .708-.707-3-3-.708.707zM3.5 15.5a.5.5 0 01-.5-.5H2a1.5 1.5 0 001.5 1.5v-1zm8 1a1.5 1.5 0 001.5-1.5h-1a.5.5 0 01-.5.5v1zM5 5h5V4H5v1zm0 2h5V6H5v1zm0 2h3V8H5v1z'
					fill='currentColor'
				/>
			</svg>
		),
	},
]
