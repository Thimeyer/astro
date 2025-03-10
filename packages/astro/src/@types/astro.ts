import type {
	MarkdownHeading,
	MarkdownMetadata,
	MarkdownRenderingResult,
	RehypePlugins,
	RemarkPlugins,
	RemarkRehype,
	ShikiConfig,
} from '@astrojs/markdown-remark';
import type * as babel from '@babel/core';
import type { OutgoingHttpHeaders } from 'node:http';
import type { AddressInfo } from 'node:net';
import type * as rollup from 'rollup';
import type * as vite from 'vite';
import type { RemotePattern } from '../assets/utils/remotePattern.js';
import type { SerializedSSRManifest } from '../core/app/types.js';
import type { PageBuildData } from '../core/build/types.js';
import type { AstroConfigType } from '../core/config/index.js';
import type { AstroTimer } from '../core/config/timer.js';
import type { TSConfig } from '../core/config/tsconfig.js';
import type { AstroCookies } from '../core/cookies/index.js';
import type { ResponseWithEncoding } from '../core/endpoint/index.js';
import type { AstroIntegrationLogger, Logger, LoggerLevel } from '../core/logger/core.js';
import type { AstroDevOverlay, DevOverlayCanvas } from '../runtime/client/dev-overlay/overlay.js';
import type { DevOverlayHighlight } from '../runtime/client/dev-overlay/ui-library/highlight.js';
import type { Icon } from '../runtime/client/dev-overlay/ui-library/icons.js';
import type { DevOverlayTooltip } from '../runtime/client/dev-overlay/ui-library/tooltip.js';
import type { DevOverlayWindow } from '../runtime/client/dev-overlay/ui-library/window.js';
import type { AstroComponentFactory, AstroComponentInstance } from '../runtime/server/index.js';
import type { OmitIndexSignature, Simplify } from '../type-utils.js';
import type { SUPPORTED_MARKDOWN_FILE_EXTENSIONS } from './../core/constants.js';

export { type AstroIntegrationLogger };

export type {
	MarkdownHeading,
	MarkdownMetadata,
	MarkdownRenderingResult,
	RehypePlugins,
	RemarkPlugins,
	ShikiConfig,
} from '@astrojs/markdown-remark';
export type {
	ExternalImageService,
	ImageService,
	LocalImageService,
} from '../assets/services/service.js';
export type {
	GetImageResult,
	ImageInputFormat,
	ImageMetadata,
	ImageOutputFormat,
	ImageQuality,
	ImageQualityPreset,
	ImageTransform,
	UnresolvedImageTransform,
} from '../assets/types.js';
export type { RemotePattern } from '../assets/utils/remotePattern.js';
export type { SSRManifest } from '../core/app/types.js';
export type { AstroCookies } from '../core/cookies/index.js';

export interface AstroBuiltinProps {
	'client:load'?: boolean;
	'client:idle'?: boolean;
	'client:media'?: string;
	'client:visible'?: boolean;
	'client:only'?: boolean | string;
}

export interface TransitionAnimation {
	name: string; // The name of the keyframe
	delay?: number | string;
	duration?: number | string;
	easing?: string;
	fillMode?: string;
	direction?: string;
}

export interface TransitionAnimationPair {
	old: TransitionAnimation | TransitionAnimation[];
	new: TransitionAnimation | TransitionAnimation[];
}

export interface TransitionDirectionalAnimations {
	forwards: TransitionAnimationPair;
	backwards: TransitionAnimationPair;
}

export type TransitionAnimationValue =
	| 'initial'
	| 'slide'
	| 'fade'
	| 'none'
	| TransitionDirectionalAnimations;

// Allow users to extend this for astro-jsx.d.ts
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AstroClientDirectives {}

export interface AstroBuiltinAttributes {
	'class:list'?:
		| Record<string, boolean>
		| Record<any, any>
		| Iterable<string>
		| Iterable<any>
		| string;
	'set:html'?: any;
	'set:text'?: any;
	'is:raw'?: boolean;
	'transition:animate'?: TransitionAnimationValue;
	'transition:name'?: string;
	'transition:persist'?: boolean | string;
}

export interface AstroDefineVarsAttribute {
	'define:vars'?: any;
}

export interface AstroStyleAttributes {
	'is:global'?: boolean;
	'is:inline'?: boolean;
}

export interface AstroScriptAttributes {
	'is:inline'?: boolean;
}

export interface AstroComponentMetadata {
	displayName: string;
	hydrate?: 'load' | 'idle' | 'visible' | 'media' | 'only';
	hydrateArgs?: any;
	componentUrl?: string;
	componentExport?: { value: string; namespace?: boolean };
	astroStaticSlot: true;
}

/** The flags supported by the Astro CLI */
export interface CLIFlags {
	root?: string;
	site?: string;
	base?: string;
	host?: string | boolean;
	port?: number;
	config?: string;
	drafts?: boolean;
	open?: boolean;
}

/**
 * Astro global available in all contexts in .astro files
 *
 * [Astro reference](https://docs.astro.build/reference/api-reference/#astro-global)
 */
export interface AstroGlobal<
	Props extends Record<string, any> = Record<string, any>,
	Self = AstroComponentFactory,
	Params extends Record<string, string | undefined> = Record<string, string | undefined>,
> extends AstroGlobalPartial,
		AstroSharedContext<Props, Params> {
	/**
	 * A full URL object of the request URL.
	 * Equivalent to: `new URL(Astro.request.url)`
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#url)
	 */
	url: AstroSharedContext['url'];
	/** Parameters passed to a dynamic page generated using [getStaticPaths](https://docs.astro.build/en/reference/api-reference/#getstaticpaths)
	 *
	 * Example usage:
	 * ```astro
	 * ---
	 * export async function getStaticPaths() {
	 *    return [
	 *     { params: { id: '1' } },
	 *   ];
	 * }
	 *
	 * const { id } = Astro.params;
	 * ---
	 * <h1>{id}</h1>
	 * ```
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astroparams)
	 */
	params: AstroSharedContext<Props, Params>['params'];
	/** List of props passed to this component
	 *
	 * A common way to get specific props is through [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), ex:
	 * ```typescript
	 * const { name } = Astro.props
	 * ```
	 *
	 * [Astro reference](https://docs.astro.build/en/core-concepts/astro-components/#component-props)
	 */
	props: AstroSharedContext<Props, Params>['props'];
	/** Information about the current request. This is a standard [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object
	 *
	 * For example, to get a URL object of the current URL, you can use:
	 * ```typescript
	 * const url = new URL(Astro.request.url);
	 * ```
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astrorequest)
	 */
	request: Request;
	/** Information about the outgoing response. This is a standard [ResponseInit](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response#init) object
	 *
	 * For example, to change the status code you can set a different status on this object:
	 * ```typescript
	 * Astro.response.status = 404;
	 * ```
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astroresponse)
	 */
	response: ResponseInit & {
		readonly headers: Headers;
	};
	/** Redirect to another page (**SSR Only**)
	 *
	 * Example usage:
	 * ```typescript
	 * if(!isLoggedIn) {
	 *   return Astro.redirect('/login');
	 * }
	 * ```
	 *
	 * [Astro reference](https://docs.astro.build/en/guides/server-side-rendering/)
	 */
	redirect: AstroSharedContext['redirect'];
	/**
	 * The <Astro.self /> element allows a component to reference itself recursively.
	 *
	 * [Astro reference](https://docs.astro.build/en/guides/api-reference/#astroself)
	 */
	self: Self;
	/** Utility functions for modifying an Astro component’s slotted children
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astroslots)
	 */
	slots: Record<string, true | undefined> & {
		/**
		 * Check whether content for this slot name exists
		 *
		 * Example usage:
		 * ```typescript
		 *	if (Astro.slots.has('default')) {
		 *   // Do something...
		 *	}
		 * ```
		 *
		 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astroslots)
		 */
		has(slotName: string): boolean;
		/**
		 * Asynchronously renders this slot and returns a string
		 *
		 * Example usage:
		 * ```astro
		 * ---
		 * let html: string = '';
		 * if (Astro.slots.has('default')) {
		 *   html = await Astro.slots.render('default')
		 * }
		 * ---
		 * <Fragment set:html={html} />
		 * ```
		 *
		 * A second parameters can be used to pass arguments to a slotted callback
		 *
		 * Example usage:
		 * ```astro
		 * ---
		 * html = await Astro.slots.render('default', ["Hello", "World"])
		 * ---
		 * ```
		 * Each item in the array will be passed as an argument that you can use like so:
		 * ```astro
		 * <Component>
		 *		{(hello, world) => <div>{hello}, {world}!</div>}
		 * </Component>
		 * ```
		 *
		 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astroslots)
		 */
		render(slotName: string, args?: any[]): Promise<string>;
	};
}

/** Union type of supported markdown file extensions */
type MarkdowFileExtension = (typeof SUPPORTED_MARKDOWN_FILE_EXTENSIONS)[number];

export interface AstroGlobalPartial {
	/**
	 * Fetch local files into your static site setup
	 *
	 * Example usage:
	 * ```typescript
	 * const posts = await Astro.glob('../pages/post/*.md');
	 * ```
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astroglob)
	 */
	glob(globStr: `${any}.astro`): Promise<AstroInstance[]>;
	glob<T extends Record<string, any>>(
		globStr: `${any}${MarkdowFileExtension}`
	): Promise<MarkdownInstance<T>[]>;
	glob<T extends Record<string, any>>(globStr: `${any}.mdx`): Promise<MDXInstance<T>[]>;
	glob<T extends Record<string, any>>(globStr: string): Promise<T[]>;
	/**
	 * Returns a [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object built from the [site](https://docs.astro.build/en/reference/configuration-reference/#site) config option
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astrosite)
	 */
	site: URL | undefined;
	/**
	 * Returns a string with the current version of Astro.
	 *
	 * Useful for using `<meta name="generator" content={Astro.generator} />` or crediting Astro in a site footer.
	 *
	 * [HTML Specification for `generator`](https://html.spec.whatwg.org/multipage/semantics.html#meta-generator)
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astrogenerator)
	 */
	generator: string;
}

type ServerConfig = {
	/**
	 * @name server.host
	 * @type {string | boolean}
	 * @default `false`
	 * @version 0.24.0
	 * @description
	 * Set which network IP addresses the dev server should listen on (i.e. 	non-localhost IPs).
	 * - `false` - do not expose on a network IP address
	 * - `true` - listen on all addresses, including LAN and public addresses
	 * - `[custom-address]` - expose on a network IP address at `[custom-address]`
	 */
	host?: string | boolean;

	/**
	 * @name server.port
	 * @type {number}
	 * @default `4321`
	 * @description
	 * Set which port the dev server should listen on.
	 *
	 * If the given port is already in use, Astro will automatically try the next available port.
	 */
	port?: number;

	/**
	 * @name server.headers
	 * @typeraw {OutgoingHttpHeaders}
	 * @default `{}`
	 * @version 1.7.0
	 * @description
	 * Set custom HTTP response headers to be sent in `astro dev` and `astro preview`.
	 */
	headers?: OutgoingHttpHeaders;

	/**
	 * @name server.open
	 * @type {boolean}
	 * @default `false`
	 * @version 2.1.8
	 * @description
	 * Control whether the dev server should open in your browser window on startup.
	 *
	 * ```js
	 * {
	 *   server: { open: true }
	 * }
	 * ```
	 */
	open?: boolean;
};

export interface ViteUserConfig extends vite.UserConfig {
	ssr?: vite.SSROptions;
}

export interface ImageServiceConfig<T extends Record<string, any> = Record<string, any>> {
	// eslint-disable-next-line @typescript-eslint/ban-types
	entrypoint: 'astro/assets/services/sharp' | 'astro/assets/services/squoosh' | (string & {});
	config?: T;
}

/**
 * Astro User Config
 * Docs: https://docs.astro.build/reference/configuration-reference/
 */
export interface AstroUserConfig {
	/**
	 * @docs
	 * @kind heading
	 * @name Top-Level Options
	 */

	/**
	 * @docs
	 * @name root
	 * @cli --root
	 * @type {string}
	 * @default `"."` (current working directory)
	 * @summary Set the project root. The project root is the directory where your Astro project (and all `src`, `public` and `package.json` files) live.
	 * @description  You should only provide this option if you run the `astro` CLI commands in a directory other than the project root directory. Usually, this option is provided via the CLI instead of the [Astro config file](https://docs.astro.build/en/guides/configuring-astro/#supported-config-file-types), since Astro needs to know your project root before it can locate your config file.
	 *
	 * If you provide a relative path (ex: `--root: './my-project'`) Astro will resolve it against your current working directory.
	 *
	 * #### Examples
	 *
	 * ```js
	 * {
	 *   root: './my-project-directory'
	 * }
	 * ```
	 * ```bash
	 * $ astro build --root ./my-project-directory
	 * ```
	 */
	root?: string;

	/**
	 * @docs
	 * @name srcDir
	 * @type {string}
	 * @default `"./src"`
	 * @description Set the directory that Astro will read your site from.
	 *
	 * The value can be either an absolute file system path or a path relative to the project root.
	 *
	 * ```js
	 * {
	 *   srcDir: './www'
	 * }
	 * ```
	 */
	srcDir?: string;

	/**
	 * @docs
	 * @name publicDir
	 * @type {string}
	 * @default `"./public"`
	 * @description
	 * Set the directory for your static assets. Files in this directory are served at `/` during dev and copied to your build directory during build. These files are always served or copied as-is, without transform or bundling.
	 *
	 * The value can be either an absolute file system path or a path relative to the project root.
	 *
	 * ```js
	 * {
	 *   publicDir: './my-custom-publicDir-directory'
	 * }
	 * ```
	 */
	publicDir?: string;

	/**
	 * @docs
	 * @name outDir
	 * @type {string}
	 * @default `"./dist"`
	 * @see build.server
	 * @description Set the directory that `astro build` writes your final build to.
	 *
	 * The value can be either an absolute file system path or a path relative to the project root.
	 *
	 * ```js
	 * {
	 *   outDir: './my-custom-build-directory'
	 * }
	 * ```
	 */
	outDir?: string;

	/**
	 * @docs
	 * @name cacheDir
	 * @type {string}
	 * @default `"./node_modules/.astro"`
	 * @description Set the directory for caching build artifacts. Files in this directory will be used in subsequent builds to speed up the build time.
	 *
	 * The value can be either an absolute file system path or a path relative to the project root.
	 *
	 * ```js
	 * {
	 *   cacheDir: './my-custom-cache-directory'
	 * }
	 * ```
	 */
	cacheDir?: string;

	/**
	 * @docs
	 * @name redirects
	 * @type {Record<string, RedirectConfig>}
	 * @default `{}`
	 * @version 2.9.0
	 * @description Specify a mapping of redirects where the key is the route to match
	 * and the value is the path to redirect to.
	 *
	 * You can redirect both static and dynamic routes, but only to the same kind of route.
	 * For example you cannot have a `'/article': '/blog/[...slug]'` redirect.
	 *
	 *
	 * ```js
	 * {
	 *   redirects: {
	 *     '/old': '/new',
	 *     '/blog/[...slug]': '/articles/[...slug]',
	 *   }
	 * }
	 * ```
	 *
	 *
	 * For statically-generated sites with no adapter installed, this will produce a client redirect using a [`<meta http-equiv="refresh">` tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#http-equiv) and does not support status codes.
	 *
	 * When using SSR or with a static adapter in `output: static`
	 * mode, status codes are supported.
	 * Astro will serve redirected GET requests with a status of `301`
	 * and use a status of `308` for any other request method.
	 *
	 * You can customize the [redirection status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages) using an object in the redirect config:
	 *
	 * ```js
	 * {
	 *   redirects: {
	 *     '/other': {
	 *       status: 302,
	 *       destination: '/place',
	 *     },
	 *   }
	 * }
	 * ```
	 */
	redirects?: Record<string, RedirectConfig>;

	/**
	 * @docs
	 * @name site
	 * @type {string}
	 * @description
	 * Your final, deployed URL. Astro uses this full URL to generate your sitemap and canonical URLs in your final build. It is strongly recommended that you set this configuration to get the most out of Astro.
	 *
	 * ```js
	 * {
	 *   site: 'https://www.my-site.dev'
	 * }
	 * ```
	 */
	site?: string;

	/**
	 * @docs
	 * @name compressHTML
	 * @type {boolean}
	 * @default `true`
	 * @description
	 * This is an option to minify your HTML output and reduce the size of your HTML files. By default, Astro removes all whitespace from your HTML, including line breaks, from `.astro` components. This occurs both in development mode and in the final build.
	 * To disable HTML compression, set the `compressHTML` flag to `false`.
	 *
	 * ```js
	 * {
	 *   compressHTML: false
	 * }
	 * ```
	 */
	compressHTML?: boolean;

	/**
	 * @docs
	 * @name base
	 * @type {string}
	 * @description
	 * The base path to deploy to. Astro will use this path as the root for your pages and assets both in development and in production build.
	 *
	 * In the example below, `astro dev` will start your server at `/docs`.
	 *
	 * ```js
	 * {
	 *   base: '/docs'
	 * }
	 * ```
	 *
	 * When using this option, all of your static asset imports and URLs should add the base as a prefix. You can access this value via `import.meta.env.BASE_URL`.
	 *
	 * The value of `import.meta.env.BASE_URL` will be determined by your `trailingSlash` config, no matter what value you have set for `base`.
	 *
	 * A trailing slash is always included if `trailingSlash: "always"` is set. If `trailingSlash: "never"` is set, `BASE_URL` will not include a trailing slash, even if `base` includes one.
	 *
	 * Additionally, Astro will internally manipulate the configured value of `config.base` before making it available to integrations. The value of `config.base` as read by integrations will also be determined by your `trailingSlash` configuration in the same way.
	 *
	 * In the example below, the values of `import.meta.env.BASE_URL` and `config.base` when processed will both be `/docs`:
	 * ```js
	 * {
	 * 	 base: '/docs/',
	 * 	 trailingSlash: "never"
	 * }
	 * ```
	 *
	 * In the example below, the values of `import.meta.env.BASE_URL` and `config.base` when processed will both be `/docs/`:
	 *
	 * ```js
	 * {
	 * 	 base: '/docs',
	 * 	 trailingSlash: "always"
	 * }
	 * ```
	 */
	base?: string;

	/**
	 * @docs
	 * @name trailingSlash
	 * @type {('always' | 'never' | 'ignore')}
	 * @default `'ignore'`
	 * @see build.format
	 * @description
	 *
	 * Set the route matching behavior of the dev server. Choose from the following options:
	 *   - `'always'` - Only match URLs that include a trailing slash (ex: "/foo/")
	 *   - `'never'` - Never match URLs that include a trailing slash (ex: "/foo")
	 *   - `'ignore'` - Match URLs regardless of whether a trailing "/" exists
	 *
	 * Use this configuration option if your production host has strict handling of how trailing slashes work or do not work.
	 *
	 * You can also set this if you prefer to be more strict yourself, so that URLs with or without trailing slashes won't work during development.
	 *
	 * ```js
	 * {
	 *   // Example: Require a trailing slash during development
	 *   trailingSlash: 'always'
	 * }
	 * ```
	 */
	trailingSlash?: 'always' | 'never' | 'ignore';

	/**
	 * @docs
	 * @name scopedStyleStrategy
	 * @type {('where' | 'class' | 'attribute')}
	 * @default `'attribute'`
	 * @version 2.4
	 * @description
	 *
	 * Specify the strategy used for scoping styles within Astro components. Choose from:
	 *   - `'where'` 		- Use `:where` selectors, causing no specificity increase.
	 *   - `'class'` 		- Use class-based selectors, causing a +1 specificity increase.
	 *   - `'attribute'` 	- Use `data-` attributes, causing a +1 specificity increase.
	 *
	 * Using `'class'` is helpful when you want to ensure that element selectors within an Astro component override global style defaults (e.g. from a global stylesheet).
	 * Using `'where'` gives you more control over specificity, but requires that you use higher-specificity selectors, layers, and other tools to control which selectors are applied.
	 * Using `'attribute'` is useful when you are manipulating the `class` attribute of elements and need to avoid conflicts between your own styling logic and Astro's application of styles.
	 */
	scopedStyleStrategy?: 'where' | 'class' | 'attribute';

	/**
	 * @docs
	 * @name adapter
	 * @typeraw {AstroIntegration}
	 * @see output
	 * @description
	 *
	 * Deploy to your favorite server, serverless, or edge host with build adapters. Import one of our first-party adapters for [Netlify](https://docs.astro.build/en/guides/deploy/netlify/#adapter-for-ssr), [Vercel](https://docs.astro.build/en/guides/deploy/vercel/#adapter-for-ssr), and more to engage Astro SSR.
	 *
	 * [See our Server-side Rendering guide](https://docs.astro.build/en/guides/server-side-rendering/) for more on SSR, and [our deployment guides](https://docs.astro.build/en/guides/deploy/) for a complete list of hosts.
	 *
	 * ```js
	 * import netlify from '@astrojs/netlify/functions';
	 * {
	 *   // Example: Build for Netlify serverless deployment
	 *   adapter: netlify(),
	 * }
	 * ```
	 */
	adapter?: AstroIntegration;

	/**
	 * @docs
	 * @name output
	 * @type {('static' | 'server' | 'hybrid')}
	 * @default `'static'`
	 * @see adapter
	 * @description
	 *
	 * Specifies the output target for builds.
	 *
	 * - `'static'` - Building a static site to be deploy to any static host.
	 * - `'server'` - Building an app to be deployed to a host supporting SSR (server-side rendering).
	 * - `'hybrid'` - Building a static site with a few server-side rendered pages.
	 *
	 * ```js
	 * import { defineConfig } from 'astro/config';
	 *
	 * export default defineConfig({
	 *   output: 'static'
	 * })
	 * ```
	 */
	output?: 'static' | 'server' | 'hybrid';

	/**
	 * @docs
	 * @kind heading
	 * @name Build Options
	 */
	build?: {
		/**
		 * @docs
		 * @name build.format
		 * @typeraw {('file' | 'directory')}
		 * @default `'directory'`
		 * @description
		 * Control the output file format of each page.
		 *   - If `'file'`, Astro will generate an HTML file (ex: "/foo.html") for each page.
		 *   - If `'directory'`, Astro will generate a directory with a nested `index.html` file (ex: "/foo/index.html") for each page.
		 *
		 * ```js
		 * {
		 *   build: {
		 *     // Example: Generate `page.html` instead of `page/index.html` during build.
		 *     format: 'file'
		 *   }
		 * }
		 * ```
		 *
		 * #### Effect on Astro.url
		 * Setting `build.format` controls what `Astro.url` is set to during the build. When it is:
		 * - `directory` - The `Astro.url.pathname` will include a trailing slash to mimic folder behavior; ie `/foo/`.
		 * - `file` - The `Astro.url.pathname` will include `.html`; ie `/foo.html`.
		 *
		 * This means that when you create relative URLs using `new URL('./relative', Astro.url)`, you will get consistent behavior between dev and build.
		 *
		 * To prevent inconsistencies with trailing slash behaviour in dev, you can restrict the [`trailingSlash` option](#trailingslash) to `'always'` or `'never'` depending on your build format:
		 * - `directory` - Set `trailingSlash: 'always'`
		 * - `file` - Set `trailingSlash: 'never'`
		 */
		format?: 'file' | 'directory';
		/**
		 * @docs
		 * @name build.client
		 * @type {string}
		 * @default `'./dist/client'`
		 * @description
		 * Controls the output directory of your client-side CSS and JavaScript when `output: 'server'` or `output: 'hybrid'` only.
		 * `outDir` controls where the code is built to.
		 *
		 * This value is relative to the `outDir`.
		 *
		 * ```js
		 * {
		 *   output: 'server', // or 'hybrid'
		 *   build: {
		 *     client: './client'
		 *   }
		 * }
		 * ```
		 */
		client?: string;
		/**
		 * @docs
		 * @name build.server
		 * @type {string}
		 * @default `'./dist/server'`
		 * @description
		 * Controls the output directory of server JavaScript when building to SSR.
		 *
		 * This value is relative to the `outDir`.
		 *
		 * ```js
		 * {
		 *   build: {
		 *     server: './server'
		 *   }
		 * }
		 * ```
		 */
		server?: string;
		/**
		 * @docs
		 * @name build.assets
		 * @type {string}
		 * @default `'_astro'`
		 * @see outDir
		 * @version 2.0.0
		 * @description
		 * Specifies the directory in the build output where Astro-generated assets (bundled JS and CSS for example) should live.
		 *
		 * ```js
		 * {
		 *   build: {
		 *     assets: '_custom'
		 *   }
		 * }
		 * ```
		 */
		assets?: string;
		/**
		 * @docs
		 * @name build.assetsPrefix
		 * @type {string}
		 * @default `undefined`
		 * @version 2.2.0
		 * @description
		 * Specifies the prefix for Astro-generated asset links. This can be used if assets are served from a different domain than the current site.
		 *
		 * For example, if this is set to `https://cdn.example.com`, assets will be fetched from `https://cdn.example.com/_astro/...` (regardless of the `base` option).
		 * You would need to upload the files in `./dist/_astro/` to `https://cdn.example.com/_astro/` to serve the assets.
		 * The process varies depending on how the third-party domain is hosted.
		 * To rename the `_astro` path, specify a new directory in `build.assets`.
		 *
		 * ```js
		 * {
		 *   build: {
		 *     assetsPrefix: 'https://cdn.example.com'
		 *   }
		 * }
		 * ```
		 */
		assetsPrefix?: string;
		/**
		 * @docs
		 * @name build.serverEntry
		 * @type {string}
		 * @default `'entry.mjs'`
		 * @description
		 * Specifies the file name of the server entrypoint when building to SSR.
		 * This entrypoint is usually dependent on which host you are deploying to and
		 * will be set by your adapter for you.
		 *
		 * Note that it is recommended that this file ends with `.mjs` so that the runtime
		 * detects that the file is a JavaScript module.
		 *
		 * ```js
		 * {
		 *   build: {
		 *     serverEntry: 'main.mjs'
		 *   }
		 * }
		 * ```
		 */
		serverEntry?: string;
		/**
		 * @docs
		 * @name build.redirects
		 * @type {boolean}
		 * @default `true`
		 * @version 2.6.0
		 * @description
		 * Specifies whether redirects will be output to HTML during the build.
		 * This option only applies to `output: 'static'` mode; in SSR redirects
		 * are treated the same as all responses.
		 *
		 * This option is mostly meant to be used by adapters that have special
		 * configuration files for redirects and do not need/want HTML based redirects.
		 *
		 * ```js
		 * {
		 *   build: {
		 *     redirects: false
		 *   }
		 * }
		 * ```
		 */
		redirects?: boolean;
		/**
		 * @docs
		 * @name build.inlineStylesheets
		 * @type {('always' | 'auto' | 'never')}
		 * @default `auto`
		 * @version 2.6.0
		 * @description
		 * Control whether project styles are sent to the browser in a separate css file or inlined into `<style>` tags. Choose from the following options:
		 *  - `'always'` - project styles are inlined into `<style>` tags
		 *  - `'auto'` - only stylesheets smaller than `ViteConfig.build.assetsInlineLimit` (default: 4kb) are inlined. Otherwise, project styles are sent in external stylesheets.
		 *  - `'never'` - project styles are sent in external stylesheets
		 *
		 * ```js
		 * {
		 * 	build: {
		 *		inlineStylesheets: `never`,
		 * 	},
		 * }
		 * ```
		 */
		inlineStylesheets?: 'always' | 'auto' | 'never';

		/**
		 * @docs
		 * @name build.split
		 * @type {boolean}
		 * @default `false`
		 * @deprecated Deprecated since version 3.0.
		 * @description
		 * The build config option `build.split` has been replaced by the adapter configuration option [`functionPerRoute`](/en/reference/adapter-reference/#functionperroute).
		 *
		 * Please see your [SSR adapter's documentation](/en/guides/integrations-guide/#official-integrations) for using `functionPerRoute` to define how your SSR code is bundled.
		 *
		 */
		split?: boolean;

		/**
		 * @docs
		 * @name build.excludeMiddleware
		 * @type {boolean}
		 * @default `false`
		 * @deprecated Deprecated since version 3.0.
		 * @description
		 * The build config option `build.excludeMiddleware` has been replaced by the adapter configuration option [`edgeMiddleware`](/en/reference/adapter-reference/#edgemiddleware).
		 *
		 * Please see your [SSR adapter's documentation](/en/guides/integrations-guide/#official-integrations) for using `edgeMiddleware` to define whether or not any SSR middleware code will be bundled when built.
		 */
		excludeMiddleware?: boolean;
	};

	/**
	 * @docs
	 * @kind heading
	 * @name Prefetch Options
	 * @type {boolean | object}
	 * @description
	 * Enable prefetching for links on your site to provide faster page transitions.
	 * (Enabled by default on pages using the `<ViewTransitions />` router. Set `prefetch: false` to opt out of this behaviour.)
	 *
	 * This configuration automatically adds a prefetch script to every page in the project
	 * giving you access to the `data-astro-prefetch` attribute.
	 * Add this attribute to any `<a />` link on your page to enable prefetching for that page.
	 *
	 * ```html
	 * <a href="/about" data-astro-prefetch>About</a>
	 * ```
	 * Further customize the default prefetching behavior using the [`prefetch.defaultStrategy`](#prefetchdefaultstrategy) and [`prefetch.prefetchAll`](#prefetchprefetchall) options.
	 *
	 * See the [Prefetch guide](https://docs.astro.build/en/guides/prefetch/) for more information.
	 */
	prefetch?:
		| boolean
		| {
				/**
				 * @docs
				 * @name prefetch.prefetchAll
				 * @type {boolean}
				 * @description
				 * Enable prefetching for all links, including those without the `data-astro-prefetch` attribute.
				 * This value defaults to `true` when using the `<ViewTransitions />` router. Otherwise, the default value is `false`.
				 *
				 * ```js
				 * prefetch: {
				 * 	prefetchAll: true
				 * }
				 * ```
				 *
				 * When set to `true`, you can disable prefetching individually by setting `data-astro-prefetch="false"` on any individual links.
				 *
				 * ```html
				 * <a href="/about" data-astro-prefetch="false">About</a>
				 *```
				 */
				prefetchAll?: boolean;

				/**
				 * @docs
				 * @name prefetch.defaultStrategy
				 * @type {'tap' | 'hover' | 'viewport'}
				 * @default `'hover'`
				 * @description
				 * The default prefetch strategy to use when the `data-astro-prefetch` attribute is set on a link with no value.
				 *
				 * - `'tap'`: Prefetch just before you click on the link.
				 * - `'hover'`: Prefetch when you hover over or focus on the link. (default)
				 * - `'viewport'`: Prefetch as the links enter the viewport.
				 *
				 * You can override this default value and select a different strategy for any individual link by setting a value on the attribute.
				 *
				 * ```html
				 * <a href="/about" data-astro-prefetch="viewport">About</a>
				 * ```
				 */
				defaultStrategy?: 'tap' | 'hover' | 'viewport';
		  };

	/**
	 * @docs
	 * @kind heading
	 * @name Server Options
	 * @description
	 *
	 * Customize the Astro dev server, used by both `astro dev` and `astro preview`.
	 *
	 * ```js
	 * {
	 *   server: { port: 1234, host: true}
	 * }
	 * ```
	 *
	 * To set different configuration based on the command run ("dev", "preview") a function can also be passed to this configuration option.
	 *
	 * ```js
	 * {
	 *   // Example: Use the function syntax to customize based on command
	 *   server: ({ command }) => ({ port: command === 'dev' ? 4321 : 4000 })
	 * }
	 * ```
	 */

	/**
	 * @docs
	 * @name server.host
	 * @type {string | boolean}
	 * @default `false`
	 * @version 0.24.0
	 * @description
	 * Set which network IP addresses the server should listen on (i.e. non-localhost IPs).
	 * - `false` - do not expose on a network IP address
	 * - `true` - listen on all addresses, including LAN and public addresses
	 * - `[custom-address]` - expose on a network IP address at `[custom-address]` (ex: `192.168.0.1`)
	 */

	/**
	 * @docs
	 * @name server.port
	 * @type {number}
	 * @default `4321`
	 * @description
	 * Set which port the server should listen on.
	 *
	 * If the given port is already in use, Astro will automatically try the next available port.
	 *
	 * ```js
	 * {
	 *   server: { port: 8080 }
	 * }
	 * ```
	 */

	/**
	 * @name server.open
	 * @type {boolean}
	 * @default `false`
	 * @version 2.1.8
	 * @description
	 * Control whether the dev server should open in your browser window on startup.
	 *
	 * ```js
	 * {
	 *   server: { open: true }
	 * }
	 * ```
	 */

	/**
	 * @docs
	 * @name server.headers
	 * @typeraw {OutgoingHttpHeaders}
	 * @default `{}`
	 * @version 1.7.0
	 * @description
	 * Set custom HTTP response headers to be sent in `astro dev` and `astro preview`.
	 */

	server?: ServerConfig | ((options: { command: 'dev' | 'preview' }) => ServerConfig);

	/**
	 * @docs
	 * @kind heading
	 * @name Image Options
	 */
	image?: {
		/**
		 * @docs
		 * @name image.endpoint
		 * @type {string}
		 * @default `undefined`
		 * @version 3.1.0
		 * @description
		 * Set the endpoint to use for image optimization in dev and SSR. Set to `undefined` to use the default endpoint.
		 *
		 * The endpoint will always be injected at `/_image`.
		 *
		 * ```js
		 * {
		 *   image: {
		 *     // Example: Use a custom image endpoint
		 *     endpoint: './src/image-endpoint.ts',
		 *   },
		 * }
		 * ```
		 */
		endpoint?: string;

		/**
		 * @docs
		 * @name image.service
		 * @type {{entrypoint: 'astro/assets/services/sharp' | 'astro/assets/services/squoosh' | string, config: Record<string, any>}}
		 * @default `{entrypoint: 'astro/assets/services/sharp', config?: {}}`
		 * @version 2.1.0
		 * @description
		 * Set which image service is used for Astro’s assets support.
		 *
		 * The value should be an object with an entrypoint for the image service to use and optionally, a config object to pass to the service.
		 *
		 * The service entrypoint can be either one of the included services, or a third-party package.
		 *
		 * ```js
		 * {
		 *   image: {
		 *     // Example: Enable the Sharp-based image service
		 *     service: { entrypoint: 'astro/assets/services/sharp' },
		 *   },
		 * }
		 * ```
		 */
		service?: ImageServiceConfig;

		/**
		 * @docs
		 * @name image.domains
		 * @type {string[]}
		 * @default `{domains: []}`
		 * @version 2.10.10
		 * @description
		 * Defines a list of permitted image source domains for remote image optimization. No other remote images will be optimized by Astro.
		 *
		 * This option requires an array of individual domain names as strings. Wildcards are not permitted. Instead, use [`image.remotePatterns`](#imageremotepatterns) to define a list of allowed source URL patterns.
		 *
		 * ```js
		 * // astro.config.mjs
		 * {
		 *   image: {
		 *     // Example: Allow remote image optimization from a single domain
		 *     domains: ['astro.build'],
		 *   },
		 * }
		 * ```
		 */
		domains?: string[];

		/**
		 * @docs
		 * @name image.remotePatterns
		 * @type {RemotePattern[]}
		 * @default `{remotePatterns: []}`
		 * @version 2.10.10
		 * @description
		 * Defines a list of permitted image source URL patterns for remote image optimization.
		 *
		 * `remotePatterns` can be configured with four properties:
		 * 1. protocol
		 * 2. hostname
		 * 3. port
		 * 4. pathname
		 *
		 * ```js
		 * {
		 *   image: {
		 *     // Example: allow processing all images from your aws s3 bucket
		 *     remotePatterns: [{
		 *       protocol: 'https',
		 *       hostname: '**.amazonaws.com',
		 *     }],
		 *   },
		 * }
		 * ```
		 *
		 * You can use wildcards to define the permitted `hostname` and `pathname` values as described below. Otherwise, only the exact values provided will be configured:
		 * `hostname`:
		 *   - Start with '**.' to allow all subdomains ('endsWith').
		 *   - Start with '*.' to allow only one level of subdomain.
		 *
		 * `pathname`:
		 *   - End with '/**' to allow all sub-routes ('startsWith').
		 *   - End with '/*' to allow only one level of sub-route.

		 */
		remotePatterns?: Partial<RemotePattern>[];
	};

	/**
	 * @docs
	 * @kind heading
	 * @name Markdown Options
	 */
	markdown?: {
		/**
		 * @docs
		 * @name markdown.drafts
		 * @type {boolean}
		 * @default `false`
		 * @deprecated Deprecated since version 3.0. Use content collections instead.
		 * @description
		 * Control whether Markdown draft pages should be included in the build.
		 *
		 * A Markdown page is considered a draft if it includes `draft: true` in its frontmatter. Draft pages are always included & visible during development (`astro dev`) but by default they will not be included in your final build.
		 *
		 * ```js
		 * {
		 *   markdown: {
		 *     // Example: Include all drafts in your final build
		 *     drafts: true,
		 *   }
		 * }
		 * ```
		 */
		drafts?: boolean;

		/**
		 * @docs
		 * @name markdown.shikiConfig
		 * @typeraw {Partial<ShikiConfig>}
		 * @description
		 * Shiki configuration options. See [the Markdown configuration docs](https://docs.astro.build/en/guides/markdown-content/#shiki-configuration) for usage.
		 */
		shikiConfig?: Partial<ShikiConfig>;

		/**
		 * @docs
		 * @name markdown.syntaxHighlight
		 * @type {'shiki' | 'prism' | false}
		 * @default `shiki`
		 * @description
		 * Which syntax highlighter to use, if any.
		 * - `shiki` - use the [Shiki](https://github.com/shikijs/shiki) highlighter
		 * - `prism` - use the [Prism](https://prismjs.com/) highlighter
		 * - `false` - do not apply syntax highlighting.
		 *
		 * ```js
		 * {
		 *   markdown: {
		 *     // Example: Switch to use prism for syntax highlighting in Markdown
		 *     syntaxHighlight: 'prism',
		 *   }
		 * }
		 * ```
		 */
		syntaxHighlight?: 'shiki' | 'prism' | false;

		/**
		 * @docs
		 * @name markdown.remarkPlugins
		 * @type {RemarkPlugins}
		 * @description
		 * Pass [remark plugins](https://github.com/remarkjs/remark) to customize how your Markdown is built. You can import and apply the plugin function (recommended), or pass the plugin name as a string.
		 *
		 * ```js
		 * import remarkToc from 'remark-toc';
		 * {
		 *   markdown: {
		 *     remarkPlugins: [remarkToc]
		 *   }
		 * }
		 * ```
		 */
		remarkPlugins?: RemarkPlugins;
		/**
		 * @docs
		 * @name markdown.rehypePlugins
		 * @type {RehypePlugins}
		 * @description
		 * Pass [rehype plugins](https://github.com/remarkjs/remark-rehype) to customize how your Markdown's output HTML is processed. You can import and apply the plugin function (recommended), or pass the plugin name as a string.
		 *
		 * ```js
		 * import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
		 * {
		 *   markdown: {
		 *     rehypePlugins: [rehypeAccessibleEmojis]
		 *   }
		 * }
		 * ```
		 */
		rehypePlugins?: RehypePlugins;
		/**
		 * @docs
		 * @name markdown.gfm
		 * @type {boolean}
		 * @default `true`
		 * @version 2.0.0
		 * @description
		 * Astro uses [GitHub-flavored Markdown](https://github.com/remarkjs/remark-gfm) by default. To disable this, set the `gfm` flag to `false`:
		 *
		 * ```js
		 * {
		 *   markdown: {
		 *     gfm: false,
		 *   }
		 * }
		 * ```
		 */
		gfm?: boolean;
		/**
		 * @docs
		 * @name markdown.smartypants
		 * @type {boolean}
		 * @default `true`
		 * @version 2.0.0
		 * @description
		 * Astro uses the [SmartyPants formatter](https://daringfireball.net/projects/smartypants/) by default. To disable this, set the `smartypants` flag to `false`:
		 *
		 * ```js
		 * {
		 *   markdown: {
		 *     smartypants: false,
		 *   }
		 * }
		 * ```
		 */
		smartypants?: boolean;
		/**
		 * @docs
		 * @name markdown.remarkRehype
		 * @type {RemarkRehype}
		 * @description
		 * Pass options to [remark-rehype](https://github.com/remarkjs/remark-rehype#api).
		 *
		 * ```js
		 * {
		 *   markdown: {
		 *     // Example: Translate the footnotes text to another language, here are the default English values
		 *     remarkRehype: { footnoteLabel: "Footnotes", footnoteBackLabel: "Back to content"},
		 *   },
		 * };
		 * ```
		 */
		remarkRehype?: RemarkRehype;
	};

	/**
	 * @docs
	 * @kind heading
	 * @name Integrations
	 * @description
	 *
	 * Extend Astro with custom integrations. Integrations are your one-stop-shop for adding framework support (like Solid.js), new features (like sitemaps), and new libraries (like Partytown).
	 *
	 * Read our [Integrations Guide](https://docs.astro.build/en/guides/integrations-guide/) for help getting started with Astro Integrations.
	 *
	 * ```js
	 * import react from '@astrojs/react';
	 * import tailwind from '@astrojs/tailwind';
	 * {
	 *   // Example: Add React + Tailwind support to Astro
	 *   integrations: [react(), tailwind()]
	 * }
	 * ```
	 */
	integrations?: Array<
		AstroIntegration | (AstroIntegration | false | undefined | null)[] | false | undefined | null
	>;

	/**
	 * @docs
	 * @kind heading
	 * @name Vite
	 * @description
	 *
	 * Pass additional configuration options to Vite. Useful when Astro doesn't support some advanced configuration that you may need.
	 *
	 * View the full `vite` configuration object documentation on [vitejs.dev](https://vitejs.dev/config/).
	 *
	 * #### Examples
	 *
	 * ```js
	 * {
	 *   vite: {
	 *     ssr: {
	 *       // Example: Force a broken package to skip SSR processing, if needed
	 *       external: ['broken-npm-package'],
	 *     }
	 *   }
	 * }
	 * ```
	 *
	 * ```js
	 * {
	 *   vite: {
	 *     // Example: Add custom vite plugins directly to your Astro project
	 *     plugins: [myPlugin()],
	 *   }
	 * }
	 * ```
	 */
	vite?: ViteUserConfig;

	/**
	 * @docs
	 * @kind heading
	 * @name Legacy Flags
	 * @description
	 * To help some users migrate between versions of Astro, we occasionally introduce `legacy` flags.
	 * These flags allow you to opt in to some deprecated or otherwise outdated behavior of Astro
	 * in the latest version, so that you can continue to upgrade and take advantage of new Astro releases.
	 */
	legacy?: object;

	/**
	 * @docs
	 * @kind heading
	 * @name Experimental Flags
	 * @description
	 * Astro offers experimental flags to give users early access to new features.
	 * These flags are not guaranteed to be stable.
	 */
	experimental?: {
		/**
		 * @docs
		 * @name experimental.optimizeHoistedScript
		 * @type {boolean}
		 * @default `false`
		 * @version 2.10.4
		 * @description
		 * Prevents unused components' scripts from being included in a page unexpectedly.
		 * The optimization is best-effort and may inversely miss including the used scripts. Make sure to double-check your built pages
		 * before publishing.
		 * Enable hoisted script analysis optimization by adding the experimental flag:
		 *
		 * ```js
		 * {
		 * 	experimental: {
		 *		optimizeHoistedScript: true,
		 * 	},
		 * }
		 * ```
		 */
		optimizeHoistedScript?: boolean;

		/**
		 * @docs
		 * @name experimental.devOverlay
		 * @type {boolean}
		 * @default `false`
		 * @version 3.4.0
		 * @description
		 * Enable a dev overlay in development mode. This overlay allows you to inspect your page islands, see helpful audits on performance and accessibility, and more.
		 *
		 * ```js
		 * {
		 * 	experimental: {
		 * 		devOverlay: true,
		 * 	},
		 * }
		 * ```
		 */
		devOverlay?: boolean;

		/**
		 * @docs
		 * @name experimental.i18n
		 * @type {object}
		 * @version 3.5.0
		 * @type {object}
		 * @description
		 *
		 * Configures experimental i18n routing and allows you to specify some customization options.
		 *
		 * See our guide for more information on [internationalization in Astro](/en/guides/internationalization/)
		 */
		i18n?: {
			/**
			 * @docs
			 * @kind h4
			 * @name experimental.i18n.defaultLocale
			 * @type {string}
			 * @version 3.5.0
			 * @description
			 *
			 * The default locale of your website/application. This is a required field.
			 *
			 * No particular language format or syntax is enforced, but we suggest using lower-case and hyphens as needed (e.g. "es", "pt-br") for greatest compatibility.
			 */
			defaultLocale: string;
			/**
			 * @docs
			 * @kind h4
			 * @name experimental.i18n.locales
			 * @type {string[]}
			 * @version 3.5.0
			 * @description
			 *
			 * A list of all locales supported by the website (e.g. `['en', 'es', 'pt-br']`). This list should also include the `defaultLocale`. This is a required field.
			 *
			 * No particular language format or syntax is enforced, but your folder structure must match exactly the locales in the list.
			 */
			locales: string[];

			/**
			 * @docs
			 * @kind h4
			 * @name experimental.i18n.fallback
			 * @type {Record<string, string>}
			 * @version 3.5.0
			 * @description
			 *
			 * The fallback strategy when navigating to pages that do not exist (e.g. a translated page has not been created).
			 *
			 * Use this object to declare a fallback `locale` route for each language you support. If no fallback is specified, then unavailable pages will return a 404.
			 *
			 * ##### Example
			 *
			 * The following example configures your content fallback strategy to redirect unavailable pages in `/pt-br/` to their `es` version, and unavailable pages in `/fr/` to their `en` version. Unavailable `/es/` pages will return a 404.
			 *
			 * ```js
			 * export defualt defineConfig({
			 * 	experimental: {
			 * 		i18n: {
			 * 			defaultLocale: "en",
			 * 			locales: ["en", "fr", "pt-br", "es"],
			 * 			fallback: {
			 * 				pt: "es",
			 * 			  fr: "en"
			 * 			}
			 * 		}
			 * 	}
			 * })
			 * ```
			 */
			fallback?: Record<string, string>;

			/**
			 * @docs
			 * @kind h4
			 * @name experimental.i18n.routingStrategy
			 * @type {'prefix-always' | 'prefix-other-locales'}
			 * @default 'prefix-other-locales'
			 * @version 3.5.0
			 * @description
			 *
			 * Controls the routing strategy to determine your site URLs. Set this based on your folder/URL path configuration for your default language:
			 *
			 *  - `prefix-other-locales`(default): Only non-default languages will display a language prefix.
			 *    The `defaultLocale` will not show a language prefix and content files do not exist in a localized folder.
			 *    URLs will be of the form `example.com/[locale]/content/` for all non-default languages, but `example.com/content/` for the default locale.
			 *  - `prefix-always`: All URLs will display a language prefix.
			 *    URLs will be of the form `example.com/[locale]/content/` for every route, including the default language.
			 *    Localized folders are used for every language, including the default.
			 *
			 */
			routingStrategy?: 'prefix-always' | 'prefix-other-locales';
		};
		/**
		 * @docs
		 * @name experimental.contentCollectionCache
		 * @type {boolean}
		 * @default `false`
		 * @version 3.5.0
		 * @description
		 * Enables a persistent cache for content collections when building in static mode.
		 *
		 * ```js
		 * {
		 * 	experimental: {
		 * 		contentCollectionCache: true,
		 * 	},
		 * }
		 * ```
		 */
		contentCollectionCache?: boolean;
	};
}

// NOTE(fks): We choose to keep our hand-generated AstroUserConfig interface so that
// we can add JSDoc-style documentation and link to the definition file in our repo.
// However, Zod comes with the ability to auto-generate AstroConfig from the schema
// above. If we ever get to the point where we no longer need the dedicated
// @types/config.ts file, consider replacing it with the following lines:
//
// export interface AstroUserConfig extends z.input<typeof AstroConfigSchema> {
// }

/**
 * IDs for different stages of JS script injection:
 * - "before-hydration": Imported client-side, before the hydration script runs. Processed & resolved by Vite.
 * - "head-inline": Injected into a script tag in the `<head>` of every page. Not processed or resolved by Vite.
 * - "page": Injected into the JavaScript bundle of every page. Processed & resolved by Vite.
 * - "page-ssr": Injected into the frontmatter of every Astro page. Processed & resolved by Vite.
 */
export type InjectedScriptStage = 'before-hydration' | 'head-inline' | 'page' | 'page-ssr';

export interface InjectedRoute {
	pattern: string;
	entryPoint: string;
	prerender?: boolean;
}

export interface ResolvedInjectedRoute extends InjectedRoute {
	resolvedEntryPoint?: URL;
}

/**
 * Resolved Astro Config
 * Config with user settings along with all defaults filled in.
 */
export interface AstroConfig extends AstroConfigType {
	// Public:
	// This is a more detailed type than zod validation gives us.
	// TypeScript still confirms zod validation matches this type.
	integrations: AstroIntegration[];
}
/**
 * An inline Astro config that takes highest priority when merging with the user config,
 * and includes inline-specific options to configure how Astro runs.
 */
export interface AstroInlineConfig extends AstroUserConfig, AstroInlineOnlyConfig {}
export interface AstroInlineOnlyConfig {
	/**
	 * A custom path to the Astro config file. If relative, it'll resolve based on the current working directory.
	 * Set to false to disable loading any config files.
	 *
	 * If this value is undefined or unset, Astro will search for an `astro.config.(js,mjs,ts)` file relative to
	 * the `root` and load the config file if found.
	 *
	 * The inline config passed in this object will take highest priority when merging with the loaded user config.
	 */
	configFile?: string | false;
	/**
	 * The mode used when building your site to generate either "development" or "production" code.
	 */
	mode?: RuntimeMode;
	/**
	 * The logging level to filter messages logged by Astro.
	 * - "debug": Log everything, including noisy debugging diagnostics.
	 * - "info": Log informational messages, warnings, and errors.
	 * - "warn": Log warnings and errors.
	 * - "error": Log errors only.
	 * - "silent": No logging.
	 *
	 * @default "info"
	 */
	logLevel?: LoggerLevel;
	/**
	 * @internal for testing only, use `logLevel` instead.
	 */
	logger?: Logger;
}

export type ContentEntryModule = {
	id: string;
	collection: string;
	slug: string;
	body: string;
	data: Record<string, unknown>;
	_internal: {
		rawData: string;
		filePath: string;
	};
};

export type DataEntryModule = {
	id: string;
	collection: string;
	data: Record<string, unknown>;
	_internal: {
		rawData: string;
		filePath: string;
	};
};

export interface ContentEntryType {
	extensions: string[];
	getEntryInfo(params: {
		fileUrl: URL;
		contents: string;
	}): GetContentEntryInfoReturnType | Promise<GetContentEntryInfoReturnType>;
	getRenderModule?(
		this: rollup.PluginContext,
		params: {
			contents: string;
			fileUrl: URL;
			viteId: string;
		}
	): rollup.LoadResult | Promise<rollup.LoadResult>;
	contentModuleTypes?: string;
	/**
	 * Handle asset propagation for rendered content to avoid bleed.
	 * Ex. MDX content can import styles and scripts, so `handlePropagation` should be true.
	 * @default true
	 */
	handlePropagation?: boolean;
}

type GetContentEntryInfoReturnType = {
	data: Record<string, unknown>;
	/**
	 * Used for error hints to point to correct line and location
	 * Should be the untouched data as read from the file,
	 * including newlines
	 */
	rawData: string;
	body: string;
	slug: string;
};

export interface DataEntryType {
	extensions: string[];
	getEntryInfo(params: {
		fileUrl: URL;
		contents: string;
	}): GetDataEntryInfoReturnType | Promise<GetDataEntryInfoReturnType>;
}

export type GetDataEntryInfoReturnType = { data: Record<string, unknown>; rawData?: string };

export interface AstroAdapterFeatures {
	/**
	 * Creates and edge function that will communiate with the Astro middleware
	 */
	edgeMiddleware: boolean;
	/**
	 * SSR only. Each route becomes its own function/file.
	 */
	functionPerRoute: boolean;
}

export interface AstroSettings {
	config: AstroConfig;
	adapter: AstroAdapter | undefined;
	injectedRoutes: InjectedRoute[];
	resolvedInjectedRoutes: ResolvedInjectedRoute[];
	pageExtensions: string[];
	contentEntryTypes: ContentEntryType[];
	dataEntryTypes: DataEntryType[];
	renderers: AstroRenderer[];
	scripts: {
		stage: InjectedScriptStage;
		content: string;
	}[];
	/**
	 * Map of directive name (e.g. `load`) to the directive script code
	 */
	clientDirectives: Map<string, string>;
	devOverlayPlugins: string[];
	middlewares: { pre: string[]; post: string[] };
	tsConfig: TSConfig | undefined;
	tsConfigPath: string | undefined;
	watchFiles: string[];
	timer: AstroTimer;
}

export type AsyncRendererComponentFn<U> = (
	Component: any,
	props: any,
	slots: Record<string, string>,
	metadata?: AstroComponentMetadata
) => Promise<U>;

/** Generic interface for a component (Astro, Svelte, React, etc.) */
export interface ComponentInstance {
	default: AstroComponentFactory;
	css?: string[];
	partial?: boolean;
	prerender?: boolean;
	/**
	 * Only used for logging if deprecated drafts feature is used
	 */
	frontmatter?: Record<string, any>;
	getStaticPaths?: (options: GetStaticPathsOptions) => GetStaticPathsResult;
}

export interface AstroInstance {
	file: string;
	url: string | undefined;
	default: AstroComponentFactory;
}

export interface MarkdownInstance<T extends Record<string, any>> {
	frontmatter: T;
	/** Absolute file path (e.g. `/home/user/projects/.../file.md`) */
	file: string;
	/** Browser URL for files under `/src/pages` (e.g. `/en/guides/markdown-content`) */
	url: string | undefined;
	/** Component to render content in `.astro` files. Usage: `<Content />` */
	Content: AstroComponentFactory;
	/** raw Markdown file content, excluding layout HTML and YAML frontmatter */
	rawContent(): string;
	/** Markdown file compiled to HTML, excluding layout HTML */
	compiledContent(): string;
	/** List of headings (h1 -> h6) with associated metadata */
	getHeadings(): MarkdownHeading[];
	default: AstroComponentFactory;
}

type MD = MarkdownInstance<Record<string, any>>;

export type MDXInstance<T extends Record<string, any>> = Omit<
	MarkdownInstance<T>,
	'rawContent' | 'compiledContent'
>;

export interface MarkdownLayoutProps<T extends Record<string, any>> {
	frontmatter: {
		file: MarkdownInstance<T>['file'];
		url: MarkdownInstance<T>['url'];
	} & T;
	file: MarkdownInstance<T>['file'];
	url: MarkdownInstance<T>['url'];
	headings: MarkdownHeading[];
	rawContent: MarkdownInstance<T>['rawContent'];
	compiledContent: MarkdownInstance<T>['compiledContent'];
}

export type MDXLayoutProps<T extends Record<string, any>> = Omit<
	MarkdownLayoutProps<T>,
	'rawContent' | 'compiledContent'
>;

export type GetHydrateCallback = () => Promise<() => void | Promise<void>>;

/**
 * getStaticPaths() options
 *
 * [Astro Reference](https://docs.astro.build/en/reference/api-reference/#getstaticpaths)
 */ export interface GetStaticPathsOptions {
	paginate: PaginateFunction;
	/**
	 * The RSS helper has been removed from getStaticPaths! Try the new @astrojs/rss package instead.
	 * @see https://docs.astro.build/en/guides/rss/
	 */
	rss(): never;
}

export type GetStaticPathsItem = {
	params: { [K in keyof Params]: Params[K] | number };
	props?: Props;
};
export type GetStaticPathsResult = GetStaticPathsItem[];
export type GetStaticPathsResultKeyed = GetStaticPathsResult & {
	keyed: Map<string, GetStaticPathsItem>;
};

/**
 * Return an array of pages to generate for a [dynamic route](https://docs.astro.build/en/core-concepts/routing/#dynamic-routes). (**SSG Only**)
 *
 * [Astro Reference](https://docs.astro.build/en/reference/api-reference/#getstaticpaths)
 */
export type GetStaticPaths = (
	options: GetStaticPathsOptions
) => Promise<GetStaticPathsResult> | GetStaticPathsResult;

/**
 * Infers the shape of the `params` property returned by `getStaticPaths()`.
 *
 * @example
 * ```ts
 * import type { GetStaticPaths } from 'astro';
 *
 * export const getStaticPaths = (() => {
 *   return results.map((entry) => ({
 *     params: { slug: entry.slug },
 *   }));
 * }) satisfies GetStaticPaths;
 *
 * type Params = InferGetStaticParamsType<typeof getStaticPaths>;
 * //   ^? { slug: string; }
 *
 * const { slug } = Astro.params as Params;
 * ```
 */
export type InferGetStaticParamsType<T> = T extends (
	opts?: GetStaticPathsOptions
) => infer R | Promise<infer R>
	? R extends Array<infer U>
		? U extends { params: infer P }
			? P
			: never
		: never
	: never;

/**
 * Infers the shape of the `props` property returned by `getStaticPaths()`.
 *
 * @example
 * ```ts
 * import type { GetStaticPaths } from 'astro';
 *
 * export const getStaticPaths = (() => {
 *   return results.map((entry) => ({
 *     params: { slug: entry.slug },
 *     props: {
 *       propA: true,
 *       propB: 42
 *     },
 *   }));
 * }) satisfies GetStaticPaths;
 *
 * type Props = InferGetStaticPropsType<typeof getStaticPaths>;
 * //   ^? { propA: boolean; propB: number; }
 *
 * const { propA, propB } = Astro.props;
 * ```
 */
export type InferGetStaticPropsType<T> = T extends (
	opts: GetStaticPathsOptions
) => infer R | Promise<infer R>
	? R extends Array<infer U>
		? U extends { props: infer P }
			? P
			: never
		: never
	: never;

export interface HydrateOptions {
	name: string;
	value?: string;
}

export type JSXTransformConfig = Pick<
	babel.TransformOptions,
	'presets' | 'plugins' | 'inputSourceMap'
>;

export type JSXTransformFn = (options: {
	mode: string;
	ssr: boolean;
}) => Promise<JSXTransformConfig>;

export interface ManifestData {
	routes: RouteData[];
}

export interface MarkdownParserResponse extends MarkdownRenderingResult {
	frontmatter: MD['frontmatter'];
}

/**
 * The `content` prop given to a Layout
 *
 * [Astro reference](https://docs.astro.build/en/guides/markdown-content/#markdown-layouts)
 */
export type MarkdownContent<T extends Record<string, any> = Record<string, any>> = T & {
	astro: MarkdownMetadata;
	url: string | undefined;
	file: string;
};

/**
 * paginate() Options
 *
 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#paginate)
 */
export interface PaginateOptions<PaginateProps extends Props, PaginateParams extends Params> {
	/** the number of items per-page (default: `10`) */
	pageSize?: number;
	/** key: value object of page params (ex: `{ tag: 'javascript' }`) */
	params?: PaginateParams;
	/** object of props to forward to `page` result */
	props?: PaginateProps;
}

/**
 * Represents a single page of data in a paginated collection
 *
 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#the-pagination-page-prop)
 */
export interface Page<T = any> {
	/** result */
	data: T[];
	/** metadata */
	/** the count of the first item on the page, starting from 0 */
	start: number;
	/** the count of the last item on the page, starting from 0 */
	end: number;
	/** total number of results */
	total: number;
	/** the current page number, starting from 1 */
	currentPage: number;
	/** number of items per page (default: 25) */
	size: number;
	/** number of last page */
	lastPage: number;
	url: {
		/** url of the current page */
		current: string;
		/** url of the previous page (if there is one) */
		prev: string | undefined;
		/** url of the next page (if there is one) */
		next: string | undefined;
	};
}

export type PaginateFunction = <
	PaginateData,
	AdditionalPaginateProps extends Props,
	AdditionalPaginateParams extends Params,
>(
	data: PaginateData[],
	args?: PaginateOptions<AdditionalPaginateProps, AdditionalPaginateParams>
) => {
	params: Simplify<
		{
			page: string | undefined;
		} & OmitIndexSignature<AdditionalPaginateParams>
	>;
	props: Simplify<
		{
			page: Page<PaginateData>;
		} & OmitIndexSignature<AdditionalPaginateProps>
	>;
}[];

export type Params = Record<string, string | undefined>;

export type SupportsKind = 'unsupported' | 'stable' | 'experimental' | 'deprecated';

export type AstroFeatureMap = {
	/**
	 * The adapter is able serve static pages
	 */
	staticOutput?: SupportsKind;
	/**
	 * The adapter is able to serve pages that are static or rendered via server
	 */
	hybridOutput?: SupportsKind;
	/**
	 * The adapter is able to serve SSR pages
	 */
	serverOutput?: SupportsKind;
	/**
	 * The adapter can emit static assets
	 */
	assets?: AstroAssetsFeature;

	/**
	 * List of features that orbit around the i18n routing
	 */
	i18n?: AstroInternationalizationFeature;
};

export interface AstroAssetsFeature {
	supportKind?: SupportsKind;
	/**
	 * Whether if this adapter deploys files in an environment that is compatible with the library `sharp`
	 */
	isSharpCompatible?: boolean;
	/**
	 * Whether if this adapter deploys files in an environment that is compatible with the library `squoosh`
	 */
	isSquooshCompatible?: boolean;
}

export interface AstroInternationalizationFeature {
	/**
	 * Whether the adapter is able to detect the language of the browser, usually using the `Accept-Language` header.
	 */
	detectBrowserLanguage?: SupportsKind;
}

export interface AstroAdapter {
	name: string;
	serverEntrypoint?: string;
	previewEntrypoint?: string;
	exports?: string[];
	args?: any;
	adapterFeatures?: AstroAdapterFeatures;
	/**
	 * List of features supported by an adapter.
	 *
	 * If the adapter is not able to handle certain configurations, Astro will throw an error.
	 */
	supportedAstroFeatures?: AstroFeatureMap;
}

type Body = string;

export type ValidRedirectStatus = 300 | 301 | 302 | 303 | 304 | 307 | 308;

// Shared types between `Astro` global and API context object
interface AstroSharedContext<
	Props extends Record<string, any> = Record<string, any>,
	RouteParams extends Record<string, string | undefined> = Record<string, string | undefined>,
> {
	/**
	 * The address (usually IP address) of the user. Used with SSR only.
	 */
	clientAddress: string;
	/**
	 * Utility for getting and setting the values of cookies.
	 */
	cookies: AstroCookies;
	/**
	 * Information about the current request. This is a standard [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object
	 */
	request: Request;
	/**
	 * A full URL object of the request URL.
	 */
	url: URL;
	/**
	 * Route parameters for this request if this is a dynamic route.
	 */
	params: RouteParams;
	/**
	 * List of props returned for this path by `getStaticPaths` (**Static Only**).
	 */
	props: Props;
	/**
	 * Redirect to another page (**SSR Only**).
	 */
	redirect(path: string, status?: ValidRedirectStatus): Response;

	/**
	 * Object accessed via Astro middleware
	 */
	locals: App.Locals;

	/**
	 * The current locale that is computed from the `Accept-Language` header of the browser (**SSR Only**).
	 */
	preferredLocale: string | undefined;

	/**
	 * The list of locales computed from the `Accept-Language` header of the browser, sorted by quality value (**SSR Only**).
	 */

	preferredLocaleList: string[] | undefined;
}

export interface APIContext<
	Props extends Record<string, any> = Record<string, any>,
	APIParams extends Record<string, string | undefined> = Record<string, string | undefined>,
> extends AstroSharedContext<Props, Params> {
	site: URL | undefined;
	generator: string;
	/**
	 * A full URL object of the request URL.
	 * Equivalent to: `new URL(request.url)`
	 */
	url: AstroSharedContext['url'];
	/**
	 * Parameters matching the page’s dynamic route pattern.
	 * In static builds, this will be the `params` generated by `getStaticPaths`.
	 * In SSR builds, this can be any path segments matching the dynamic route pattern.
	 *
	 * Example usage:
	 * ```ts
	 * export function getStaticPaths() {
	 *   return [
	 *     { params: { id: '0' }, props: { name: 'Sarah' } },
	 *     { params: { id: '1' }, props: { name: 'Chris' } },
	 *     { params: { id: '2' }, props: { name: 'Fuzzy' } },
	 *   ];
	 * }
	 *
	 * export async function get({ params }) {
	 *  return {
	 * 	  body: `Hello user ${params.id}!`,
	 *  }
	 * }
	 * ```
	 *
	 * [context reference](https://docs.astro.build/en/reference/api-reference/#contextparams)
	 */
	params: AstroSharedContext<Props, APIParams>['params'];
	/**
	 * List of props passed from `getStaticPaths`. Only available to static builds.
	 *
	 * Example usage:
	 * ```ts
	 * export function getStaticPaths() {
	 *   return [
	 *     { params: { id: '0' }, props: { name: 'Sarah' } },
	 *     { params: { id: '1' }, props: { name: 'Chris' } },
	 *     { params: { id: '2' }, props: { name: 'Fuzzy' } },
	 *   ];
	 * }
	 *
	 * export function get({ props }) {
	 *   return {
	 *     body: `Hello ${props.name}!`,
	 *   }
	 * }
	 * ```
	 *
	 * [context reference](https://docs.astro.build/en/guides/api-reference/#contextprops)
	 */
	props: AstroSharedContext<Props, APIParams>['props'];
	/**
	 * Redirect to another page. Only available in SSR builds.
	 *
	 * Example usage:
	 * ```ts
	 * // src/pages/secret.ts
	 * export function get({ redirect }) {
	 *   return redirect('/login');
	 * }
	 * ```
	 *
	 * [context reference](https://docs.astro.build/en/guides/api-reference/#contextredirect)
	 */
	redirect: AstroSharedContext['redirect'];

	/**
	 * Object accessed via Astro middleware.
	 *
	 * Example usage:
	 *
	 * ```ts
	 * // src/middleware.ts
	 * import {defineMiddleware} from "astro:middleware";
	 *
	 * export const onRequest = defineMiddleware((context, next) => {
	 *   context.locals.greeting = "Hello!";
	 *   return next();
	 * });
	 * ```
	 * Inside a `.astro` file:
	 * ```astro
	 * ---
	 * // src/pages/index.astro
	 * const greeting = Astro.locals.greeting;
	 * ---
	 * <h1>{greeting}</h1>
	 * ```
	 */
	locals: App.Locals;
	ResponseWithEncoding: typeof ResponseWithEncoding;

	/**
	 * Available only when `experimental.i18n` enabled and in SSR.
	 *
	 * It represents the preferred locale of the user. It's computed by checking the supported locales in `i18n.locales`
	 * and locales supported by the users's browser via the header `Accept-Language`
	 *
	 * For example, given `i18n.locales` equals to `['fr', 'de']`, and the `Accept-Language` value equals to `en, de;q=0.2, fr;q=0.6`, the
	 * `Astro.preferredLanguage` will be `fr` because `en` is not supported, its [quality value] is the highest.
	 *
	 * [quality value]: https://developer.mozilla.org/en-US/docs/Glossary/Quality_values
	 */
	preferredLocale: string | undefined;

	/**
	 * Available only when `experimental.i18n` enabled and in SSR.
	 *
	 * It represents the list of the preferred locales that are supported by the application. The list is sorted via [quality value].
	 *
	 * For example, given `i18n.locales` equals to `['fr', 'pt', 'de']`, and the `Accept-Language` value equals to `en, de;q=0.2, fr;q=0.6`, the
	 * `Astro.preferredLocaleList` will be equal to `['fs', 'de']` because `en` isn't supported, and `pt` isn't part of the locales contained in the
	 * header.
	 *
	 * When the `Accept-Header` is `*`, the original `i18n.locales` are returned. The value `*` means no preferences, so Astro returns all the supported locales.
	 *
	 * [quality value]: https://developer.mozilla.org/en-US/docs/Glossary/Quality_values
	 */
	preferredLocaleList: string[] | undefined;
}

export type EndpointOutput =
	| {
			body: Body;
			encoding?: BufferEncoding;
	  }
	| {
			body: Uint8Array;
			encoding: 'binary';
	  };

export type APIRoute<Props extends Record<string, any> = Record<string, any>> = (
	context: APIContext<Props>
) => EndpointOutput | Response | Promise<EndpointOutput | Response>;

export interface EndpointHandler {
	[method: string]: APIRoute | ((params: Params, request: Request) => EndpointOutput | Response);
}

export type Props = Record<string, unknown>;

export interface AstroRenderer {
	/** Name of the renderer. */
	name: string;
	/** Import entrypoint for the client/browser renderer. */
	clientEntrypoint?: string;
	/** Import entrypoint for the server/build/ssr renderer. */
	serverEntrypoint: string;
	/** JSX identifier (e.g. 'react' or 'solid-js') */
	jsxImportSource?: string;
	/** Babel transform options */
	jsxTransformOptions?: JSXTransformFn;
}

export interface SSRLoadedRenderer extends AstroRenderer {
	ssr: {
		check: AsyncRendererComponentFn<boolean>;
		renderToStaticMarkup: AsyncRendererComponentFn<{
			html: string;
			attrs?: Record<string, string>;
		}>;
		supportsAstroStaticSlot?: boolean;
	};
}

export type HookParameters<
	Hook extends keyof AstroIntegration['hooks'],
	Fn = AstroIntegration['hooks'][Hook],
> = Fn extends (...args: any) => any ? Parameters<Fn>[0] : never;

export interface AstroIntegration {
	/** The name of the integration. */
	name: string;
	/** The different hooks available to extend. */
	hooks: {
		'astro:config:setup'?: (options: {
			config: AstroConfig;
			command: 'dev' | 'build' | 'preview';
			isRestart: boolean;
			updateConfig: (newConfig: Record<string, any>) => void;
			addRenderer: (renderer: AstroRenderer) => void;
			addWatchFile: (path: URL | string) => void;
			injectScript: (stage: InjectedScriptStage, content: string) => void;
			injectRoute: (injectRoute: InjectedRoute) => void;
			addClientDirective: (directive: ClientDirectiveConfig) => void;
			addDevOverlayPlugin: (entrypoint: string) => void;
			addMiddleware: (mid: AstroIntegrationMiddleware) => void;
			logger: AstroIntegrationLogger;
			// TODO: Add support for `injectElement()` for full HTML element injection, not just scripts.
			// This may require some refactoring of `scripts`, `styles`, and `links` into something
			// more generalized. Consider the SSR use-case as well.
			// injectElement: (stage: vite.HtmlTagDescriptor, element: string) => void;
		}) => void | Promise<void>;
		'astro:config:done'?: (options: {
			config: AstroConfig;
			setAdapter: (adapter: AstroAdapter) => void;
			logger: AstroIntegrationLogger;
		}) => void | Promise<void>;
		'astro:server:setup'?: (options: {
			server: vite.ViteDevServer;
			logger: AstroIntegrationLogger;
		}) => void | Promise<void>;
		'astro:server:start'?: (options: {
			address: AddressInfo;
			logger: AstroIntegrationLogger;
		}) => void | Promise<void>;
		'astro:server:done'?: (options: { logger: AstroIntegrationLogger }) => void | Promise<void>;
		'astro:build:ssr'?: (options: {
			manifest: SerializedSSRManifest;
			/**
			 * This maps a {@link RouteData} to an {@link URL}, this URL represents
			 * the physical file you should import.
			 */
			entryPoints: Map<RouteData, URL>;
			/**
			 * File path of the emitted middleware
			 */
			middlewareEntryPoint: URL | undefined;
			logger: AstroIntegrationLogger;
		}) => void | Promise<void>;
		'astro:build:start'?: (options: { logger: AstroIntegrationLogger }) => void | Promise<void>;
		'astro:build:setup'?: (options: {
			vite: vite.InlineConfig;
			pages: Map<string, PageBuildData>;
			target: 'client' | 'server';
			updateConfig: (newConfig: vite.InlineConfig) => void;
			logger: AstroIntegrationLogger;
		}) => void | Promise<void>;
		'astro:build:generated'?: (options: {
			dir: URL;
			logger: AstroIntegrationLogger;
		}) => void | Promise<void>;
		'astro:build:done'?: (options: {
			pages: { pathname: string }[];
			dir: URL;
			routes: RouteData[];
			logger: AstroIntegrationLogger;
		}) => void | Promise<void>;
	};
}

export type MiddlewareNext<R> = () => Promise<R>;
export type MiddlewareHandler<R> = (
	context: APIContext,
	next: MiddlewareNext<R>
) => Promise<R> | R | Promise<void> | void;

export type MiddlewareResponseHandler = MiddlewareHandler<Response>;
export type MiddlewareEndpointHandler = MiddlewareHandler<Response | EndpointOutput>;
export type MiddlewareNextResponse = MiddlewareNext<Response>;

// NOTE: when updating this file with other functions,
// remember to update `plugin-page.ts` too, to add that function as a no-op function.
export type AstroMiddlewareInstance<R> = {
	onRequest?: MiddlewareHandler<R>;
};

export type AstroIntegrationMiddleware = {
	order: 'pre' | 'post';
	entrypoint: string;
};

export interface AstroPluginOptions {
	settings: AstroSettings;
	logger: Logger;
}

/**
 * - page: a route that lives in the file system, usually an Astro component
 * - endpoint: a route that lives in the file system, usually a JS file that exposes endpoints methods
 * - redirect: a route points to another route that lives in the file system
 * - fallback: a route that doesn't exist in the file system that needs to be handled with other means, usually the middleware
 */
export type RouteType = 'page' | 'endpoint' | 'redirect' | 'fallback';

export interface RoutePart {
	content: string;
	dynamic: boolean;
	spread: boolean;
}

type RedirectConfig =
	| string
	| {
			status: ValidRedirectStatus;
			destination: string;
	  };

export interface RouteData {
	route: string;
	component: string;
	generate: (data?: any) => string;
	params: string[];
	pathname?: string;
	// expose the real path name on SSG
	distURL?: URL;
	pattern: RegExp;
	segments: RoutePart[][];
	type: RouteType;
	prerender: boolean;
	redirect?: RedirectConfig;
	redirectRoute?: RouteData;
}

export type RedirectRouteData = RouteData & {
	redirect: string;
};

export type SerializedRouteData = Omit<RouteData, 'generate' | 'pattern' | 'redirectRoute'> & {
	generate: undefined;
	pattern: string;
	redirectRoute: SerializedRouteData | undefined;
	_meta: {
		trailingSlash: AstroConfig['trailingSlash'];
	};
};

export type RuntimeMode = 'development' | 'production';

export type SSRError = Error & vite.ErrorPayload['err'];

export interface SSRElement {
	props: Record<string, any>;
	children: string;
}

/**
 * A hint on whether the Astro runtime needs to wait on a component to render head
 * content. The meanings:
 *
 * - __none__ (default) The component does not propagation head content.
 * - __self__ The component appends head content.
 * - __in-tree__ Another component within this component's dependency tree appends head content.
 *
 * These are used within the runtime to know whether or not a component should be waited on.
 */
export type PropagationHint = 'none' | 'self' | 'in-tree';

export type SSRComponentMetadata = {
	propagation: PropagationHint;
	containsHead: boolean;
};

export interface SSRResult {
	styles: Set<SSRElement>;
	scripts: Set<SSRElement>;
	links: Set<SSRElement>;
	componentMetadata: Map<string, SSRComponentMetadata>;
	createAstro(
		Astro: AstroGlobalPartial,
		props: Record<string, any>,
		slots: Record<string, any> | null
	): AstroGlobal;
	resolve: (s: string) => Promise<string>;
	response: ResponseInit;
	renderers: SSRLoadedRenderer[];
	/**
	 * Map of directive name (e.g. `load`) to the directive script code
	 */
	clientDirectives: Map<string, string>;
	compressHTML: boolean;
	partial: boolean;
	/**
	 * Only used for logging
	 */
	pathname: string;
	cookies: AstroCookies | undefined;
	_metadata: SSRMetadata;
}

/**
 * Ephemeral and mutable state during rendering that doesn't rely
 * on external configuration
 */
export interface SSRMetadata {
	hasHydrationScript: boolean;
	hasDirectives: Set<string>;
	hasRenderedHead: boolean;
	headInTree: boolean;
	extraHead: string[];
	propagators: Set<AstroComponentInstance>;
}

/* Preview server stuff */
export interface PreviewServer {
	host?: string;
	port: number;
	closed(): Promise<void>;
	stop(): Promise<void>;
}

export interface PreviewServerParams {
	outDir: URL;
	client: URL;
	serverEntrypoint: URL;
	host: string | undefined;
	port: number;
	base: string;
	logger: AstroIntegrationLogger;
}

export type CreatePreviewServer = (
	params: PreviewServerParams
) => PreviewServer | Promise<PreviewServer>;

export interface PreviewModule {
	default: CreatePreviewServer;
}

/* Client Directives */
type DirectiveHydrate = () => Promise<void>;
type DirectiveLoad = () => Promise<DirectiveHydrate>;

type DirectiveOptions = {
	/**
	 * The component displayName
	 */
	name: string;
	/**
	 * The attribute value provided
	 */
	value: string;
};

export type ClientDirective = (
	load: DirectiveLoad,
	options: DirectiveOptions,
	el: HTMLElement
) => void;

export interface ClientDirectiveConfig {
	name: string;
	entrypoint: string;
}

export interface DevOverlayPlugin {
	id: string;
	name: string;
	icon: Icon;
	init?(canvas: ShadowRoot, eventTarget: EventTarget): void | Promise<void>;
	beforeTogglingOff?(canvas: ShadowRoot): boolean | Promise<boolean>;
}

export type DevOverlayMetadata = Window &
	typeof globalThis & {
		__astro_dev_overlay__: {
			root: string;
		};
	};

declare global {
	interface HTMLElementTagNameMap {
		'astro-dev-overlay': AstroDevOverlay;
		'astro-dev-overlay-window': DevOverlayWindow;
		'astro-dev-overlay-plugin-canvas': DevOverlayCanvas;
		'astro-dev-overlay-tooltip': DevOverlayTooltip;
		'astro-dev-overlay-highlight': DevOverlayHighlight;
	}
}
