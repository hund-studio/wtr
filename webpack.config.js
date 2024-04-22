const { resolve } = require("path");
const nodeExternals = require("webpack-node-externals");
const ShebangPlugin = require("webpack-shebang-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = [
	{
		mode: "production",
		target: "node",
		externalsPresets: { node: true },
		externals: [nodeExternals()],
		entry: { cli: "./src/cli.ts" },
		output: {
			filename: "[name].js",
			path: resolve(__dirname, "dist"),
			clean: true,
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: "ts-loader",
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: ["", ".tsx", ".ts", ".js", ".jsx", ".css", ".scss"],
		},
		devtool: "inline-source-map",
		plugins: [
			new ShebangPlugin(),
			new FileManagerPlugin({
				events: {
					onStart: {
						delete: ["./declarations/"],
					},
					onEnd: {
						copy: [
							{ source: "./src/global.d.ts", destination: "./declarations/global.d.ts" },
							{ source: "./declarations/src/**/*", destination: "./declarations/" },
							{ source: "./declarations/init/src/**/*", destination: "./declarations/init" },
						],
						delete: ["./declarations/init/src", "./declarations/src"],
					},
				},
				runTasksInSeries: false,
				runOnceInWatchMode: false,
			}),
		],
	},
];
