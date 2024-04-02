#!/usr/bin/env node

import "dotenv/config";
import { cpSync } from "fs";
import { LoaderActions, loading } from "cli-loading-animation";
import { merge } from "webpack-merge";
import { resolve } from "path";
import { spawn } from "child_process";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import { webpack, DefinePlugin, Configuration, Stats } from "webpack";
import appRoot from "app-root-path";
import chalk from "chalk";
import cliSpinners from "cli-spinners";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import WebpackDevServer from "webpack-dev-server";
import "webpack-dev-server";

/**
 * Handle CLI steps visualization
 */

interface IStep extends Partial<LoaderActions> {
	current: string | null;
	trigger: typeof triggerStep;
	terminate: typeof terminateStep;
}

type StepKey =
	| "configuration"
	| "initialization"
	| "compilation"
	| "bundling"
	| "waiting"
	| "serving";

const getStepMessage = (key: StepKey) => {
	switch (key) {
		case "initialization":
			return "Setting up boilerplate...";
		case "configuration":
			return "Installing required packages...";
		case "compilation":
			return "Generating WP compiler...";
		case "serving":
			return "Server started...";
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
 * Initialization script
 */

const isInit = process.argv[2] === "init";

if (isInit) {
	triggerStep("initialization");

	cpSync(
		resolve(appRoot["path"], "node_modules/@hund-ernesto/wtr/init"),
		resolve(process.cwd(), "website"),
		{
			recursive: true,
		}
	);

	process.chdir(resolve(process.cwd(), "website"));

	triggerStep("configuration");
	const { spawnSync } = require("child_process");
	const npmInstall = spawnSync("npm", ["install"], { stdio: "inherit" });

	if (npmInstall.status === 0) {
		terminateStep();
		console.log(chalk.blue("Initialization completed, you are ready to go!"));
		process.exit();
	} else {
		console.error("Error running npm install");
		process.exit(1);
	}
}

/**
 * Options
 */

const WP_HOST = process.env.WP_HOST;

if (!WP_HOST) {
	throw new Error("undefined-env-wp_host"); // TODO Error display
}

const isServe = process.argv[2] === "start";
const isDev = isServe || process.argv[2] === "dev";

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
			MODE: JSON.stringify(isServe ? "serve" : isDev ? "watch" : "build"),
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
			publicPath: isServe ? "/" : undefined,
		},
		infrastructureLogging: { level: "error" },
		stats: "none",
	})
);

/**
 * Webpack server
 */

const server = new WebpackDevServer(
	{
		static: [
			resolve(appRoot["path"], "node_modules/@hund-ernesto/wtr/server"),
			resolve(appRoot["path"], "_out/wp-theme/dist"),
		],
		compress: true,
		port: 9000,
		historyApiFallback: true,
	},
	bundle
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

	if (isServe) {
		step.trigger("serving");
		server.start();
	} else if (isDev) {
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
