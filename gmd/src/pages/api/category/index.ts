import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { Category } from '@prisma/client'

const url = 'https://qp1ceno1ai.execute-api.ap-northeast-1.amazonaws.com/dev'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		const category = await axios.get<Category>(`${url}/category`)
		res.status(200).json(category.data)
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message })
	}
}
export default handler
