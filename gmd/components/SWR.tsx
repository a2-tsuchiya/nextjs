import useSWR from 'swr'
import axios from 'axios'

import { IData } from 'interfaces/index'

/**
 * TIPS: useSWR (State-While-Revalidate)
 * データフェッチと状態管理（キャッシュと再フェッチ）を兼ねる（最高かっ！）
 * 以下は等価
 * useSWR('/api/user', () => fetcher('/api/user'))
 * useSWR('/api/user', url => fetcher(url))
 * useSWR('/api/user', fetcher)
 */
interface IFetchList {
	(url: string): Promise<IData[]>
}
const fetchList: IFetchList = async (url) => {
	const res = await axios.get<IData[]>(url)
	return Promise.resolve(res.data)
}
// const fetchBlog = async (url: string, id: number): Promise<IData> => {
const fetchBlog = async (...args: any): Promise<IData | void> => {
	console.log(args)
	// const res = await axios.get<IData>(`${url}/${id}`)
	// return Promise.resolve(res.data)
	return Promise.resolve()
}

export const Blog: React.FC = () => {
	const url = `https://jsonplaceholder.typicode.com/posts`

	// Basic Fetching
	// const { data, error } = useSWR<IData[], Error>(url, fetchList)

	// Conditional Fetching
	let shouldFetch: boolean = true
	const { data: list, error } = useSWR<IData[], Error>(
		shouldFetch ? url : null,
		fetchList
	)

	// Multiple Arguments
	// const id = 3
	// const { data: blog } = useSWR<IData | void>([url, id], fetchBlog)

	if (error) return <div>failed to load</div>
	if (!list) return <div>loading...</div>

	return (
		<div>
			<ul>
				{list.map((item) => (
					<li key={item.id}>{item.title}</li>
				))}
			</ul>
		</div>
	)
}
