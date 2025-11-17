// API Route: Get all assignments from all courses
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllAssignments, getCourses } from '@/lib/canvas-api'
import type { Assignment, AssignmentWithCourse, CanvasError } from '@/types/canvas'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<AssignmentWithCourse[] | CanvasError>
) {
	// Only allow GET requests
	if (req.method !== 'GET') {
		res.setHeader('Allow', ['GET'])
		return res.status(405).json({ errors: [{ message: `Method ${req.method} Not Allowed` }] })
	}

	try {
		// Fetch all assignments and all courses
		const [assignments, courses] = await Promise.all([
			getAllAssignments(),
			getCourses()
		])

		// Create a map of course ID to course info for quick lookup
		const courseMap = new Map(courses.map(course => [course.id, course]))

		// Enrich assignments with course name and code
		const assignmentsWithCourse: AssignmentWithCourse[] = assignments.map(assignment => {
			const course = courseMap.get(assignment.course_id)
			return {
				...assignment,
				course_name: course?.name || 'Unknown Course',
				course_code: course?.course_code || 'N/A'
			}
		})

		return res.status(200).json(assignmentsWithCourse)
	} catch (error) {
		console.error('API route error:', error)
		return res.status(500).json({
			errors: [{
				message: error instanceof Error ? error.message : 'Failed to fetch assignments'
			}]
		})
	}
}
