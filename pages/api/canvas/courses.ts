// API Route: Get all active courses
import type { NextApiRequest, NextApiResponse } from 'next'
import { getCourses } from '@/lib/canvas-api'
import type { Course, CanvasError } from '@/types/canvas'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Course[] | CanvasError>
) {
	// Only allow GET requests
	if (req.method !== 'GET') {
		res.setHeader('Allow', ['GET'])
		return res.status(405).json({ errors: [{ message: `Method ${req.method} Not Allowed` }] })
	}

	try {
		const courses = await getCourses()
		return res.status(200).json(courses)
	} catch (error) {
		console.error('API route error:', error)
		return res.status(500).json({
			errors: [{
				message: error instanceof Error ? error.message : 'Failed to fetch courses'
			}]
		})
	}
}
