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

## Getting Started

### Installation

System requirements:

- A working installation of WordPress (local or remote);
- Node.js 18.17 or later.

### Automatic installation

We recommend starting a new **wtr** project using the `init` command, which sets up everything automatically for you.
To create a project, run:

```bash
npx @hund-ernesto/wtr init
```

After the prompts, `init` command will create a folder named `website`, install the required dependencies and build the starting theme that you will upload to your Wordpress installation.

> **Good to know**:
>
> - You must upload it like you would normally do for any other Wordpress theme: inside the `wp-content/themes/` directory.

#### One last step

Before being able to start you need one additional step: update the generated `.env` file with the URL of your Wordpress installation.

```dotenv
# ./env
WP_HOST="http://yourlocalwordpress.local"
```

### Run the development server

**wtr** can run with 2 different modes.

#### Run in watch mode

Watch mode is useful when developing on a local Wordpress installation.
You can symlink `_out/wp-theme` to your `/wp-content/themes` and start working on your template.

```bash
npm run dev
```

This mode is suggested if you need to directly work with custom Wordpress functionalities (for example register custom REST endpoints).

#### Run as a Webpack server

Serve mode is useful if you have to interact to a remote Wordpress installation with real data on it.

```bash
npm run start
```

#### Deploying your theme

Ready to publish online? use `npm run build` command to bundle and compile your Wordpress theme.
You will find your theme inside the `_out` folder in your project root.
