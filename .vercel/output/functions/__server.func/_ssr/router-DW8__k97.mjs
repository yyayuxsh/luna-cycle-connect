import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DW8__k97.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DfPE8REf.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$11 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lovable App" },
			{
				name: "description",
				content: "Luna is a menstrual health app for women, with an optional partner connection mode."
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Lovable App"
			},
			{
				property: "og:description",
				content: "Luna is a menstrual health app for women, with an optional partner connection mode."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			},
			{
				name: "twitter:title",
				content: "Lovable App"
			},
			{
				name: "twitter:description",
				content: "Luna is a menstrual health app for women, with an optional partner connection mode."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cb3f10dd-06ef-4e99-9d17-5f596f5ef812/id-preview-9005178c--bd4d5ce6-f489-4077-aa35-1120fd08307f.lovable.app-1781842428106.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cb3f10dd-06ef-4e99-9d17-5f596f5ef812/id-preview-9005178c--bd4d5ce6-f489-4077-aa35-1120fd08307f.lovable.app-1781842428106.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$11.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$10 = () => import("./signup-oee2spwP.mjs");
var Route$10 = createFileRoute("/signup")({
	head: () => ({ meta: [{ title: "Create your Luna account" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./login-wiu7ggik.mjs");
var Route$9 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Log in to Luna" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./experience-Dpn2QsoZ.mjs");
var Route$8 = createFileRoute("/experience")({
	head: () => ({ meta: [{ title: "Choose Your Experience — Luna" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./account-type-BnOObkZr.mjs");
var Route$7 = createFileRoute("/account-type")({
	head: () => ({ meta: [{ title: "Who are you? — Luna" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("../_app-DypY_5gg.mjs");
var Route$6 = createFileRoute("/_app")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./routes-CXyyg06w.mjs");
var Route$5 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Luna — Understand Your Cycle. Support Each Other." },
		{
			name: "description",
			content: "Luna is a modern menstrual health companion with an optional Couple Mode to keep partners informed and connected."
		},
		{
			property: "og:title",
			content: "Luna — Menstrual Health, Together"
		},
		{
			property: "og:description",
			content: "Track your cycle privately or share insights with your partner."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("../_app.profile-CgXPyvem.mjs");
var Route$4 = createFileRoute("/_app/profile")({
	head: () => ({ meta: [{ title: "Profile — Luna" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_app.partner-1orB9ihS.mjs");
var Route$3 = createFileRoute("/_app/partner")({
	head: () => ({ meta: [{ title: "Partner — Luna" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_app.home-Bgj1mZuO.mjs");
var Route$2 = createFileRoute("/_app/home")({
	head: () => ({ meta: [{ title: "Home — Luna" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_app.cycle-DOBlabwZ.mjs");
var Route$1 = createFileRoute("/_app/cycle")({
	head: () => ({ meta: [{ title: "Cycle — Luna" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_app.checkin-CtoRrWgj.mjs");
var Route = createFileRoute("/_app/checkin")({
	head: () => ({ meta: [{ title: "Daily Check-In — Luna" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var SignupRoute = Route$10.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$11
});
var LoginRoute = Route$9.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$11
});
var ExperienceRoute = Route$8.update({
	id: "/experience",
	path: "/experience",
	getParentRoute: () => Route$11
});
var AccountTypeRoute = Route$7.update({
	id: "/account-type",
	path: "/account-type",
	getParentRoute: () => Route$11
});
var AppRoute = Route$6.update({
	id: "/_app",
	getParentRoute: () => Route$11
});
var IndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$11
});
var AppProfileRoute = Route$4.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AppRoute
});
var AppPartnerRoute = Route$3.update({
	id: "/partner",
	path: "/partner",
	getParentRoute: () => AppRoute
});
var AppHomeRoute = Route$2.update({
	id: "/home",
	path: "/home",
	getParentRoute: () => AppRoute
});
var AppCycleRoute = Route$1.update({
	id: "/cycle",
	path: "/cycle",
	getParentRoute: () => AppRoute
});
var AppRouteChildren = {
	AppCheckinRoute: Route.update({
		id: "/checkin",
		path: "/checkin",
		getParentRoute: () => AppRoute
	}),
	AppCycleRoute,
	AppHomeRoute,
	AppPartnerRoute,
	AppProfileRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	AccountTypeRoute,
	ExperienceRoute,
	LoginRoute,
	SignupRoute
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
