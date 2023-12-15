#!/usr/bin/env node

import "dotenv/config";
import { merge } from "webpack-merge";
import { resolve } from "path";
import { spawn } from "child_process";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import { webpack, DefinePlugin, Configuration, Stats } from "webpack";
import appRoot from "app-root-path";
import chalk from "chalk";
import cliSpinners from "cli-spinners";
import { LoaderActions, loading } from "cli-loading-animation";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

/**
 * Options
 */

const WP_HOST = process.env.WP_HOST;

if (!WP_HOST) {
	throw new Error("undefined-env-wp_host"); // TODO Error display
}

const isDev = process.argv[2] === "dev";

/**
 * Handle CLI steps visualization
 */

interface IStep extends Partial<LoaderActions> {
	current: string | null;
	trigger: typeof triggerStep;
	terminate: typeof terminateStep;
}

type StepKey = "compilation" | "bundling" | "waiting";

const getStepMessage = (key: StepKey) => {
	switch (key) {
		case "compilation":
			return "Generating WP compiler...";
		case "bundling":
			return "Generating WP assets...";
		case "waiting":
			return "Compilation completed, waiting for file changes...";
	}
};

const triggerStep = (key: StepKey) => {
	if (!!step["stop"]) {
		step.stop();
	}

	const { start, stop } = loading(chalk.magenta(getStepMessage(key)), {
		clearOnEnd: true,
		spinner: cliSpinners["dots"],
	});
	step.current = key;
	step.start = start;
	step.stop = stop;

	step.start();
};

const terminateStep = () => {
	if (!!step["stop"]) {
		step.stop();
	}
};

const step: IStep = {
	current: null,
	trigger: triggerStep,
	terminate: terminateStep,
};

/**
 * Webpack global configuration
 */

const configuration: Configuration = {
	mode: isDev ? "development" : "production",
	devtool: isDev ? "inline-source-map" : "source-map",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "ts-loader",
						options: {
							transpileOnly: true,
						},
					},
				],
				exclude: /node_modules\/(?!@hund-ernesto\/wtr)/,
			},
			{
				test: /\.scss$/,
				// use: ["style-loader", "css-loader", "sass-loader"], // TODO da riattivare assieme alla versione con il serve
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/images/[name][ext]",
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/fonts/[name][ext]",
				},
			},
		],
	},
	resolve: {
		extensions: ["", ".tsx", ".ts", ".js", ".jsx", ".css", ".scss"],
		modules: ["node_modules"],
		alias: {
			"@": appRoot["path"],
		},
		plugins: [
			new TsconfigPathsPlugin({
				configFile: resolve(appRoot["path"], "tsconfig.json"),
				extensions: [".ts", ".js"],
			}),
		], // TODO evaluate if needed
	},
	plugins: [
		new DefinePlugin({
			PROJECT: JSON.stringify(appRoot["path"]),
			CORE_WP: JSON.stringify(resolve(appRoot["path"], "node_modules/@hund-ernesto/wtr")),
			WP_HOST: JSON.stringify(WP_HOST),
		}),
		new MiniCssExtractPlugin({}),
	],
	output: {
		publicPath: "/wp-content/themes/wp-theme/dist/",
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: "main",
					type: "css/mini-extract",
					chunks: "all",
					enforce: true,
				},
			},
		},
	},
};

const webpackErrorHandler = (err: Error | null | undefined, stats: Stats | undefined) => {
	if (err || stats?.hasErrors()) {
		step.terminate();
		console.error(chalk.red("WP Compiler bundle failed due to an unknown error"));
		return;
	}
};

/**
 * Webpack bundle generator
 */

const bundle = webpack(
	merge(configuration, {
		target: "web",
		entry: { main: resolve(appRoot["path"], "node_modules/@hund-ernesto/wtr/src/bundle.tsx") },
		output: {
			filename: "[name].js",
			path: resolve(appRoot["path"], "_out/wp-theme/dist"),
			clean: true,
		},
	})
);

/**
 * Webpack compiler generator
 */

const compiler = webpack(
	merge(configuration, {
		target: "node",
		entry: {
			index: resolve(appRoot["path"], "node_modules/@hund-ernesto/wtr/src/compiler.tsx"),
		},
		output: {
			filename: "[name].js",
			path: resolve(appRoot["path"], ".compiler"),
			clean: true,
		},
	})
);

const runCompiler = () =>
	new Promise<void>((_resolve, _reject) => {
		console.log(chalk.magenta("=== Compilation LOG ==="));
		console.log(chalk.magenta());

		const outputPath = resolve(appRoot["path"], "./.compiler/index.js");
		const childProcess = spawn("node", [outputPath]);

		childProcess.stdout.on("data", (data) => {
			console.log(chalk.white(data));
		});

		childProcess.stderr.on("data", (data) => {
			console.error(chalk.red(data));
		});

		childProcess.on("close", (code) => {
			console.log(chalk.magenta());
			console.log(chalk.magenta("=== LOG END ==="));
			console.log(chalk.magenta());

			if (code === 0) {
				_resolve();
			} else {
				_reject(`Compilation failed with exit code ${code}`);
			}
		});
	});

/**
 * Execution
 */

const start = () => {
	step.trigger("compilation");

	if (isDev) {
		compiler.watch({}, webpackErrorHandler);
	} else {
		compiler.run(webpackErrorHandler);
	}

	compiler.hooks.done.tap("DoneMessage", async (stats) => {
		step.stop?.();

		await runCompiler();

		step.trigger("bundling");

		bundle.run(webpackErrorHandler);

		bundle.hooks.done.tap("DoneMessage", async (stats) => {
			step.stop?.();

			if (isDev) {
				step.trigger("waiting");
			} else {
				console.log(chalk.blue("Compilation completed, you are ready to go!"));
			}
		});
	});
};

start();
