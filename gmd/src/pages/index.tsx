import axios from 'axios'
import useSWR from 'swr'
// import Link from 'next/link'
// import Layout from 'components/Layout'
import { Category } from '@prisma/client'

import { GetStaticProps } from 'next'
import { IPage, IProduct } from 'interfaces/index'

// axiosでルートパス設定できるらしい。。
const url = 'https://qp1ceno1ai.execute-api.ap-northeast-1.amazonaws.com/dev'

const IndexPage: React.FC<IPage> = (props) => {
	console.log(props)

	const { data: products, error } = useSWR(`${url}/product`, fetcher, {
		initialData: props.data,
		revalidateOnFocus: false,
	})
	const { data: category } = useSWR('/api/category', getCategory, {
		revalidateOnFocus: false,
	})

	if (error) return <div>failed to load</div>
	if (!products) return <div>loading...</div>
	if (!category) return <div>loading...</div>

	return (
		<div>
			<ul>
				{category.map((item) => (
					<li key={item.id}>{item.name}</li>
				))}
			</ul>
			<ul>
				{products.map((item) => (
					<li key={item.product_category}>{item.product_category}</li>
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

const getCategory = async (url: string): Promise<Category[]> => {
	const res = await axios.get<Category[]>(url)
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
const fetcher = async (url: string): Promise<IProduct[]> => {
	const res = await axios.post<IProduct[]>(url)
	return Promise.resolve(res.data)
}
export const getStaticProps: GetStaticProps = async () => {
	const products = await fetcher(`${url}/product`)
	return { props: { products }, revalidate: 60 }
}

export default IndexPage
