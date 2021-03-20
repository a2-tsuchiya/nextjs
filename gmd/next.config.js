module.exports = {
	// reactStrictMode: true,
	assetPrefix: process.env.GITHUB_PAGES == 'true' ? '/nextjs/' : '',
	basePath: process.env.GITHUB_PAGES == 'true' ? '/nextjs' : '',
}
