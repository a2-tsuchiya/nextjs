import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
// import Layout from 'components/Layout'

import { GetStaticProps } from 'next'
import { IPage, IData } from 'interfaces/index'

const url = 'https://jsonplaceholder.typicode.com/posts'

const IndexPage: React.FC<IPage> = (props) => {
	// const { data } = props
	console.log(props)
	const { data, error } = useSWR(url, fetcher, {
		initialData: props.data,
		revalidateOnFocus: false,
	})

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	return (
		<div>
			<ul>
				{data.map((item) => (
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
	const data = await fetcher(url)
	return { props: { data }, revalidate: 60 }
}

export default IndexPage
