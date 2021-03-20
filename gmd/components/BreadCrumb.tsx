import * as React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from 'next/link'

const BreadCrumb: React.FC = () => {
	return (
		<Breadcrumbs aria-label="breadcrumb">
			<Link href="/">
				<a color="inherit">TOP</a>
			</Link>
			<Link href="/about">
				<a color="inherit">広告代理</a>
			</Link>
		</Breadcrumbs>
	)
}
export default BreadCrumb
