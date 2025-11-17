// Assignments Page - Display all assignments from Canvas LMS
import { useState, useEffect } from 'react'
import Page from '@/components/page'
import AssignmentList from '@/components/canvas/assignment-list'
import Loading from '@/components/canvas/loading'
import type { AssignmentWithCourse } from '@/types/canvas'

export default function Assignments() {
	const [assignments, setAssignments] = useState<AssignmentWithCourse[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [groupBy, setGroupBy] = useState<'course' | 'none'>('none')

	useEffect(() => {
		fetchAssignments()
	}, [])

	const fetchAssignments = async () => {
		setLoading(true)
		setError(null)

		try {
			const response = await fetch('/api/canvas/assignments')

			if (!response.ok) {
				throw new Error(`Failed to fetch assignments: ${response.statusText}`)
			}

			const data = await response.json()
			setAssignments(data)
		} catch (err) {
			console.error('Error fetching assignments:', err)
			setError(err instanceof Error ? err.message : 'Failed to load assignments')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Page title="Assignments">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
						My Assignments
					</h1>
					<p className="text-gray-600 dark:text-gray-400">
						View all your assignments from Canvas LMS
					</p>
				</div>

				{/* Controls */}
				{!loading && !error && assignments.length > 0 && (
					<div className="mb-6 flex flex-wrap items-center gap-4">
						{/* Assignment count */}
						<div className="text-sm text-gray-600 dark:text-gray-400">
							{assignments.length} assignment{assignments.length !== 1 ? 's' : ''}
						</div>

						{/* Group by toggle */}
						<div className="flex items-center gap-2">
							<label htmlFor="groupBy" className="text-sm text-gray-600 dark:text-gray-400">
								Group by:
							</label>
							<select
								id="groupBy"
								value={groupBy}
								onChange={(e) => setGroupBy(e.target.value as 'course' | 'none')}
								className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="none">Due Date</option>
								<option value="course">Course</option>
							</select>
						</div>

						{/* Refresh button */}
						<button
							onClick={fetchAssignments}
							className="ml-auto px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							Refresh
						</button>
					</div>
				)}

				{/* Loading state */}
				{loading && <Loading />}

				{/* Error state */}
				{error && (
					<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
						<div className="flex items-start gap-3">
							<svg
								className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<div>
								<h3 className="text-sm font-medium text-red-800 dark:text-red-200">
									Error loading assignments
								</h3>
								<p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
								<button
									onClick={fetchAssignments}
									className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 font-medium"
								>
									Try again
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Assignments list */}
				{!loading && !error && (
					<AssignmentList assignments={assignments} groupBy={groupBy} />
				)}
			</div>
		</Page>
	)
}
