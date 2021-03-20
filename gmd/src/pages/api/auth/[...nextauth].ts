import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiRequest, NextApiResponse } from 'next'

const findUserByCredentials = (credentials: Record<string, string>) => {
	console.log(process.env)
	if (
		credentials.username === process.env.USER_ID &&
		credentials.password === process.env.USER_SECRET
	) {
		return { id: 1, name: 'Taro' }
	} else {
		return null
	}
}

const options = {
	providers: [
		Providers.Credentials({
			name: 'Credentials',
			credentials: {
				username: {
					label: 'Username',
					type: 'text',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const user = findUserByCredentials(credentials)
				if (user) {
					return Promise.resolve(user)
				} else {
					return Promise.resolve(null)
				}
			},
		}),
	],
}
export default (req: NextApiRequest, res: NextApiResponse) =>
	NextAuth(req, res, options)
