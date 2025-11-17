// Canvas LMS API Client
import type { Course, Assignment } from '@/types/canvas'

const CANVAS_API_URL = process.env.CANVAS_API_URL
const CANVAS_API_TOKEN = process.env.CANVAS_API_TOKEN

if (!CANVAS_API_URL || !CANVAS_API_TOKEN) {
	throw new Error('Canvas API credentials not configured in environment variables')
}

const BASE_URL = `${CANVAS_API_URL}/api/v1`

interface FetchOptions {
	method?: string
	headers?: HeadersInit
	body?: string
}

/**
 * Make an authenticated request to Canvas API
 */
async function canvasRequest<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
	const url = `${BASE_URL}${endpoint}`

	const headers: HeadersInit = {
		'Authorization': `Bearer ${CANVAS_API_TOKEN}`,
		'Content-Type': 'application/json',
		...options.headers,
	}

	try {
		const response = await fetch(url, {
			...options,
			headers,
		})

		// Check for rate limiting
		const rateLimitRemaining = response.headers.get('X-Rate-Limit-Remaining')
		if (rateLimitRemaining) {
			console.log(`Canvas API rate limit remaining: ${rateLimitRemaining}`)
		}

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}))
			throw new Error(
				`Canvas API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
			)
		}

		return await response.json()
	} catch (error) {
		console.error('Canvas API request failed:', error)
		throw error
	}
}

/**
 * Get all active courses for the current user
 */
export async function getCourses(): Promise<Course[]> {
	return canvasRequest<Course[]>(
		'/courses?enrollment_state=active&per_page=100'
	)
}

/**
 * Get all assignments for a specific course
 */
export async function getAssignments(courseId: number): Promise<Assignment[]> {
	return canvasRequest<Assignment[]>(
		`/courses/${courseId}/assignments?include[]=submission&order_by=due_at&per_page=100`
	)
}

/**
 * Get assignments from all active courses
 */
export async function getAllAssignments(): Promise<Assignment[]> {
	try {
		// First, get all active courses
		const courses = await getCourses()

		// Then, fetch assignments for each course in parallel
		const assignmentsPromises = courses.map(course =>
			getAssignments(course.id).catch(error => {
				console.error(`Failed to fetch assignments for course ${course.id}:`, error)
				return [] // Return empty array if a course fails
			})
		)

		const assignmentsArrays = await Promise.all(assignmentsPromises)

		// Flatten the arrays and sort by due date
		const allAssignments = assignmentsArrays.flat()

		// Sort assignments by due date (null dates go to the end)
		allAssignments.sort((a, b) => {
			if (!a.due_at) return 1
			if (!b.due_at) return -1
			return new Date(a.due_at).getTime() - new Date(b.due_at).getTime()
		})

		return allAssignments
	} catch (error) {
		console.error('Failed to fetch all assignments:', error)
		throw error
	}
}

/**
 * Get course information by ID
 */
export async function getCourse(courseId: number): Promise<Course> {
	return canvasRequest<Course>(`/courses/${courseId}`)
}
