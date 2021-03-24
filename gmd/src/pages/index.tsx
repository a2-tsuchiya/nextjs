import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
// import Layout from 'components/Layout'
import { tbl_category } from '@prisma/client'

import { GetStaticProps } from 'next'
import { IPage, IData } from 'interfaces/index'

const IndexPage: React.FC<IPage> = (props) => {
	console.log(props)

	const { data: posts, error } = useSWR(
		'https://jsonplaceholder.typicode.com/posts',
		fetcher,
		{
			initialData: props.data,
			revalidateOnFocus: false,
		}
	)
	const { data: category } = useSWR('/api/category', getCategory, {
		revalidateOnFocus: false,
	})

	if (error) return <div>failed to load</div>
	if (!posts) return <div>loading...</div>
	if (!category) return <div>loading...</div>

	return (
		<div>
			<ul>
				{category.map((item) => (
					<li key={item.category_id}>{item.category_name}</li>
				))}
			</ul>
			<ul>
				{posts.map((item) => (
					<li key={item.id}>
						<Link href={`/products/${item.id}`}>
							<a>{item.title}</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
/**
 * SSGのビルド時のみ呼ばれるライフサイクル
 * ビルド時にAPIを叩き、コンポーネントのPropsにその内容を渡す
 */
// export const getStaticProps: GetStaticProps = async () => {
// 	const res = await axios.get<IData[]>(
// 		`https://jsonplaceholder.typicode.com/posts`
// 	)
// 	const data: IData[] = res.data
// 	return { props: { data } }
// }

const getCategory = async (url: string): Promise<tbl_category[]> => {
	const res = await axios.get<tbl_category[]>(url)
	console.log(res.data)
	return Promise.resolve(res.data)
}

// interface IUser {
// 	id: number
// 	name: string
// }
// const getUser = async (url: string): Promise<IUser[]> => {
// 	const res = await axios.get<IUser[]>(url)
// 	console.log(res.data)
// 	return Promise.resolve(res.data)
// }

/**
 * SSRとCSR（SWR）の併用。fetcherをクライアント/サーバで共有する
 * ビルド時に静的レンダリングして、クライアント側からも動的にレンダリングする
 * @param url
 */
const fetcher = async (url: string): Promise<IData[]> => {
	const res = await axios.get<IData[]>(url)
	return Promise.resolve(res.data)
}
export const getStaticProps: GetStaticProps = async () => {
	const posts = await fetcher('https://jsonplaceholder.typicode.com/posts')
	return { props: { posts }, revalidate: 60 }
}

export default IndexPage
