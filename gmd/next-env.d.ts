/// <reference types="next" />
/// <reference types="next/types/global" />

const webpack = require('webpack')
const path = require('path')

module.exports = {
	webpack(config, _) {
		config.resolve.modules.push(path.resolve('./'))
		config.devtool = 'inline-source-map'
		return config
	},
}
