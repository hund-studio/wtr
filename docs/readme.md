# 📦 WTR - Wordpress Typescript React

## Intro

### Why WTR?

WTR arises from the need to have a tool for quickly creating small WordPress sites while maintaining the backend, which customers are so attached to. It aims to solve well-known issues encountered over the years of developing in Typescript:

1. Achieving a partial form of server-side rendering;
2. Improving SEO/Crawlers performance;
3. Optimizing the use of assets, chunk splitting, etc.;
4. Avoiding the need to reconfigure Webpack (or your preferred bundler) from scratch every time.

### What is WTR, then?

WTR is nothing more than an npm-installable package through the command:

```bash
npm i @hund-ernesto/wtr
```

It contains:

- A preconfigured bundler (Webpack) ready to use (also in watch mode) $^{1}$;
- A script that prerenders the WordPress PHP theme templates using the `renderToString()` function from react/server;
- Some React Hooks to interact with various WordPress features (such as menus or multilingual plugins);
- A router that allows updating page metadata by directly taking data set by Yoast;
- Default support for ACF.

$_{1\ Inside\ Webpack,\ support\ for\ scss,\ css\ modules,\ images,\ fonts\ is\ active}$

> Disclaimer: The features made available for WTR are tailored to our way of development and our stack of plugins/technologies. If you need further information regarding support for unlisted plugins, contact us at [developer@hund.studio](mailto:developer@hund.studio).

WTR is a way to quickly develop a site without worrying about WordPress, Typescript, or React, focusing only on what matters.

## Plugin Support

Being a WordPress theme, most plugins that can be installed on WordPress can also be used with WTR. However, some plugins that modify/intervene on the frontend may conflict with the hybrid Server Side Rendering system and cause total or partial malfunction. In general, our policy is: the fewer plugins, the better for everyone...in the world.

Here are the plugins directly integrated into WTR that can provide various useful functionalities:

- Advanced Custom Fields;
- qTranslate-XT;
- Yoast SEO.

> Disclaimer: In the case of particularly useful plugins, we can consider integrating them. Write to [developer@hund.studio](mailto:developer@hund.studio).

## Important Notes in No Particular Order

- WTR only works with Typescript, not Javascript. So, if you are not already using it, get on board;
- Currently, we have not created a create-react-app-style command to generate an initial boilerplate. However, to start, it is sufficient to generate literally 2 files...

## How to Get Started

To start using WTR, you will need:

- A local PHP development environment;
- An installation of WordPress;
- NodeJS installed on your machine.

Once these requirements are met, follow these steps:

1. Create the project folder

```bash
mkdir my-wordpress-theme
```

2. Start a new project

```bash
npm init -y
```

3. Install WTR

```bash
npm i @hund-ernesto/wtr
```

4. Add a `tsconfig.json` file, a `declarations.d.ts` file, and an `.env` file

```JSON
// ./tsconfig.json
{
	"compilerOptions": {
		"target": "ESNext",
		"module": "ESNext",
		"moduleResolution": "node10",
		"baseUrl": "./",
		"strict": true,
		"esModuleInterop": true,
		"declaration": false,
		"skipLibCheck": true,
		"jsx": "react-jsx",
		"paths": {
			"@/*": ["./*"]
		}
	}
}
```

To prevent TypeScript complaints when importing .jpg .png or similar...

```typescript
// ./declarations.d.ts
/// <reference types="@hund-ernesto/wtr/declarations/global" />
```

To link WTR with WordPress APIs

```dotenv
# ./env
WP_HOST="http://yourlocalwordpress.local"
```

5. Add the file with the basic layout of your app

```typescript
// ./src/app/layout.tsx
import { FC, Fragment, PropsWithChildren } from "react";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Fragment>
			<main>{children}</main>
		</Fragment>
	);
};

export default RootLayout;
```

6. Start creating the necessary WordPress templates

```typescript
// ./src/app/[front-page]/page.tsx
import { FC, Fragment } from "react";

export default function Page({ data, error }: any) {
	return (
		<Fragment>
			<h1>Hello World</h1>
		</Fragment>
	);
}
```

Well. The setup is complete, and from here, you can refer to the Wiki for further guides and examples.
