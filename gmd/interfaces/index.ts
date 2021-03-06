// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
	id: number
	name: string
}
export interface IData {
	userId: number
	id: number
	title: string
	body: string
}
export interface IPage {
	data: IProduct[]
}
export interface IProduct {
	product_category: string
}
