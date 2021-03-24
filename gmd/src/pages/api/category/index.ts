import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
	log: ['query', 'info'],
})

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		const category = await prisma.tbl_category.findMany()
		res.status(200).json(category)
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message })
	}
}
export default handler
