import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { Product } from '@prisma/client'

const url = 'https://qp1ceno1ai.execute-api.ap-northeast-1.amazonaws.com/dev'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		const products = await axios.post<Product>(`${url}/product`)
		res.status(200).json(products.data)
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message })
	}
}
export default handler
