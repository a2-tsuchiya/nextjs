import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'

import { IData } from 'interfaces/index'

interface IPage {
	data: IData
}
const Page: React.FC<IPage> = ({ data }) => {
	return (
		<>
			<h1>Blog: {data.id}</h1>
			<h2>Title: {data.title}</h2>
			<h3>{data.body}</h3>
		</>
	)
}

/**
 * SSGのビルド時のみ呼ばれるライフサイクル
 *  -- `getStaticProps`より前に実行される
 *  -- 対応する動的パラメータを配列で渡す
 */
export const getStaticPaths: GetStaticPaths = async () => {
	const res = await axios.get<IData[]>(
		`https://jsonplaceholder.typicode.com/posts`
	)
	const data = res.data
	const paths = data.map((d) => {
		return {
			params: { id: String(d.id) },
		}
	})
	return {
		paths: paths,
		fallback: true,
	}
}
/**
 * SSGビルド時のみ呼ばれるライフサイクル
 *  -- `getStaticPaths`より後に実行される
 *  -- 引数には動的パラメータを含むコンテキストが渡される
 * @param params
 */
export const getStaticProps: GetStaticProps = async (context) => {
	const postId = context.params!.id
	const res = await axios.get<IData>(
		`https://jsonplaceholder.typicode.com/posts/${postId}`
	)
	const data = res.data
	return {
		props: { data },
	}
}
export default Page
