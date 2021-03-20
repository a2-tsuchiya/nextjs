/**
 * ちょっと分かりにくいシリーズ
 */

import * as React from 'react'

/**
 * TIPS: createRef/useRef
 * ref: renderメソッドで作成されたDOMもしくはReact要素(にアクセスする)
 */
export interface Props {
	value: string
}
// ClassはcreateRefを使う
export class InputRefClass extends React.Component<Props, {}> {
	public textInput: React.RefObject<HTMLInputElement>

	constructor(props: Props) {
		super(props)
		this.textInput = React.createRef<HTMLInputElement>()
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		console.log('this.textInput.current', this.textInput.current)
	}

	render() {
		return (
			<div>
				<input
					type="text"
					ref={this.textInput}
					onClick={this.handleClick}
				/>
			</div>
		)
	}
}
// FCはuseRefを使う(Hook API)
export const InputRefFC: React.FC<Props> = (props) => {
	const textInput = React.useRef(null)
	const handleClick = () => {
		console.log('textInput.current', textInput.current)
	}
	return (
		<div>
			<input
				type="text"
				ref={textInput}
				onClick={handleClick}
				defaultValue={props.value}
			/>
		</div>
	)
}
/**
 * TIPS: forwardRef
 * forwardRef: コンポーネントを通じてその子コンポーネントにrefを渡す
 * ButtonProps(Reactコンポーネント)から、レンダリングされたbutton要素(DOMノード)にrefを渡す
 * TS: 参照する要素とそのプロパティの型をGenericで渡す
 */
type ButtonProps = React.HTMLProps<HTMLButtonElement>
export const ButtonForwardRef = React.forwardRef<
	HTMLButtonElement,
	ButtonProps
>((props, ref) => {
	const handleClick = () => console.log('ref', ref)
	return (
		<button ref={ref} className="FancyButton" onClick={handleClick}>
			{props.children}
		</button>
	)
})

export const Demo: React.FC = () => {
	const ref = React.useRef(null)
	return (
		<>
			<ButtonForwardRef ref={ref}>Click Me !!</ButtonForwardRef>
			<InputRefClass value="class" />
			<InputRefFC value="fc" />
		</>
	)
}

export default Demo
