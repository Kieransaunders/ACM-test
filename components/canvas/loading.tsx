// Loading Component
export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center py-12">
			<div className="relative w-16 h-16">
				{/* Spinning circle */}
				<div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
				<div className="absolute inset-0 border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin"></div>
			</div>
			<p className="mt-4 text-sm text-gray-600 dark:text-gray-400 animate-pulse">
				Loading assignments...
			</p>
		</div>
	)
}
