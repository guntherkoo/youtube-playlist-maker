const { LoaderOptionsPlugin } = require('webpack');
const compose = require('next-compose');
const withSass = require('@zeit/next-sass');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const sass = {
	cssModules: true,
	cssLoaderOptions: {
		importLoaders: 1,
		localIdentName: '[name]-[local]-[hash:base64:5]',
	},
};

// const isProd = process.env.NODE_ENV === 'production';

module.exports = Object.assign(
	compose([
		[withSass, sass],
		{
			webpack: (config, options) => {
				config.plugins.push(new LodashModuleReplacementPlugin({
					shorthands: true,
				}));

				config.module.rules.unshift({
					test: /\.scss$/,
					use: ['classnames-loader'],
				});

				return config;
			},
		}
	]),
	{
		target: 'serverless',
		// generateBuildId: async () => {
		// // const fromGit = await nextBuildId({
		// //   dir: __dirname,
		// // });

		// return process.env.GIT_COMMIT || "localMachine";
		// },
	}
);
