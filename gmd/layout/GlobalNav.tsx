import * as React from 'react'
import { forwardRef } from 'react'
import Link from 'next/link'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useAppContext } from 'store/AppProvider'
import { signIn, signOut, useSession } from 'next-auth/client'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { TabProps } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'

import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import MoreIcon from '@material-ui/icons/MoreVert'

import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import Fab from '@material-ui/core/Fab'
import CssBaseline from '@material-ui/core/CssBaseline'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

interface IScrollTop {
	window?: () => Window
}
interface IBackToTop extends IScrollTop {
	title: string
}

const useStyles = makeStyles((theme: Theme) => ({
	scroll: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	toolbar: {
		minHeight: 128,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: 'rgba(0,0,0,0.15)',
		'&:hover': {
			backgroundColor: 'rgba(0,0,0,0.25)',
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
		width: '100%',
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvnets: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
	},
}))

/**
 * Scroll to top
 * @param props
 */
export const ScrollTop: React.FC<IScrollTop> = (props) => {
	const { children, window } = props
	const classes = useStyles()

	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	})
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const anchor = (
			(event.target as HTMLDivElement).ownerDocument || document
		).querySelector('#back-to-top-anchor')
		if (anchor) {
			anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}
	return (
		<Zoom in={trigger}>
			<div
				onClick={handleClick}
				role="presentation"
				className={classes.scroll}>
				{children}
			</div>
		</Zoom>
	)
}

// MEMO: Omit<T, K>: T型の中からKプロパティを除外した型を生成する
type LinkTabProps = Omit<
	TabProps<'a', { href: string; label: string }>,
	'component' | 'button'
>
/**
 * Wrap Tabs-Element(MUI) with Link-Element(Next)
 * @see https://github.com/mui-org/material-ui/tree/next/examples/nextjs#the-link-component
 */
const LinkTab = forwardRef<HTMLAnchorElement, LinkTabProps>(
	(props, forwardRef) => {
		const { label, href, ...other } = props
		return (
			<Link href={href}>
				<Tab component="a" label={label} ref={forwardRef} {...other} />
			</Link>
		)
	}
)

/**
 * Global navigation
 * @param props
 */
const GlobalNav: React.FC<IBackToTop> = (props) => {
	const classes = useStyles()
	const { children, title } = props
	const { state, dispatch } = useAppContext()

	const [session, loading] = useSession()
	if (loading) return <div>Loading...</div>

	const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
		dispatch({ type: 'tabValue', payload: newValue })
	}
	const handleClickSignIn = () => signIn()
	const handleClickSignOut = () => signOut()
	return (
		<>
			<CssBaseline />
			<AppBar>
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						ariga-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant="h6">
						{title}
					</Typography>
					{!session && (
						<Button color="inherit" onClick={handleClickSignIn}>
							Login
						</Button>
					)}
					{session && (
						<>
							<div className={classes.search}>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<InputBase
									placeholder="Search..."
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput,
									}}
									inputProps={{ 'aria-label': 'search' }}
								/>
							</div>
							<IconButton
								aria-label="display more actions"
								edge="end"
								color="inherit">
								<MoreIcon />
							</IconButton>
							<Button
								color="inherit"
								onClick={handleClickSignOut}>
								Logout
							</Button>
						</>
					)}
				</Toolbar>
				{session && (
					<Toolbar>
						<Tabs
							value={state.tabValue}
							onChange={handleChange}
							aria-label="global nav tabs">
							<LinkTab label="広告代理" href="/" />
							<LinkTab label="WEB制作" href="/about" />
							<LinkTab label="CRM" href="/users" />
							<LinkTab label="システム開発" href="/products" />
						</Tabs>
					</Toolbar>
				)}
			</AppBar>
			{session && (
				<>
					<Toolbar id="back-to-top-anchor" />
					<Toolbar id="back-to-top-anchor-secondary" />
					{children}
					<ScrollTop {...props}>
						<Fab
							color="primary"
							size="large"
							aria-label="scroll back to top">
							<KeyboardArrowUpIcon />
						</Fab>
					</ScrollTop>
				</>
			)}
		</>
	)
}
export default GlobalNav
