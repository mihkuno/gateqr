
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/apply" | "/api/auth" | "/api/auth/login" | "/api/auth/logout" | "/api/auth/verify" | "/api/dean" | "/api/dean/applications" | "/api/departments" | "/api/osa" | "/api/osa/applications" | "/dean" | "/entry" | "/login" | "/osa" | "/osa/dashboard" | "/osa/departments" | "/otp" | "/status";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/api": Record<string, never>;
			"/api/apply": Record<string, never>;
			"/api/auth": Record<string, never>;
			"/api/auth/login": Record<string, never>;
			"/api/auth/logout": Record<string, never>;
			"/api/auth/verify": Record<string, never>;
			"/api/dean": Record<string, never>;
			"/api/dean/applications": Record<string, never>;
			"/api/departments": Record<string, never>;
			"/api/osa": Record<string, never>;
			"/api/osa/applications": Record<string, never>;
			"/dean": Record<string, never>;
			"/entry": Record<string, never>;
			"/login": Record<string, never>;
			"/osa": Record<string, never>;
			"/osa/dashboard": Record<string, never>;
			"/osa/departments": Record<string, never>;
			"/otp": Record<string, never>;
			"/status": Record<string, never>
		};
		Pathname(): "/" | "/api/apply" | "/api/auth/login" | "/api/auth/logout" | "/api/auth/verify" | "/api/dean/applications" | "/api/departments" | "/api/osa/applications" | "/dean" | "/entry" | "/login" | "/osa" | "/osa/dashboard" | "/osa/departments" | "/otp" | "/status";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | "/uploads/1782464189018-1776237510778.jpg" | "/uploads/1782464189019-1776237510778.jpg" | "/uploads/1782464189020-1776237510778.jpg" | "/uploads/1782464957551-dedv5v2-1776237510778.jpg" | "/uploads/1782464957552-pbkgj7x-1776237510778.jpg" | "/uploads/1782464957553-ku2ex1k-1776237510778.jpg" | "/uploads/1782464957553-vmqgo48-1776237510778.jpg" | "/uploads/1782464957553-x15pttt-1776237510778.jpg" | "/uploads/1782464961432-4joksji-1776237510778.jpg" | "/uploads/1782464961432-gjepno3-1776237510778.jpg" | "/uploads/1782464961432-v3sty9h-1776237510778.jpg" | "/uploads/1782464961433-1vy81a9-1776237510778.jpg" | "/uploads/1782464961433-d4zgat8-1776237510778.jpg" | "/uploads/1782465019204-exz122b-1776237510778.jpg" | "/uploads/1782465019204-npn3kgz-1776237510778.jpg" | "/uploads/1782465019204-ogf0rl6-1776237510778.jpg" | "/uploads/1782465019204-qx9zbgg-1776237510778.jpg" | "/uploads/1782465019204-w5f56uj-1776237510778.jpg" | "/uploads/1782465125681-bf1fhk3-1776237510778.jpg" | "/uploads/1782465125681-dztze38-1776237510778.jpg" | "/uploads/1782465125681-elvu383-1776237510778.jpg" | "/uploads/1782465125681-ofn0wrh-1776237510778.jpg" | "/uploads/1782465125681-yqday0p-1776237510778.jpg" | "/uploads/1782465930180-btizw8p-1776237510778.jpg" | "/uploads/1782465930181-11d85iy-1776237510778.jpg" | "/uploads/1782465930181-ln74nk3-1776237510778.jpg" | "/uploads/1782465930181-oz12693-1776237510778.jpg" | "/uploads/1782465930181-zadw0v9-1776237510778.jpg" | "/uploads/1782467186051-9kf7ubj-1776237510778.jpg" | "/uploads/1782467186051-do1q4km-1776237510778.jpg" | "/uploads/1782467186052-g3ram04-1776237510778.jpg" | "/uploads/1782467186052-z1gka81-1776237510778.jpg" | "/uploads/1782467186053-avdl1jf-1776237510778.jpg" | "/uploads/1782468339453-izigwr0-726399856_122104194975361474_2517910761741223844_n.jpg" | "/uploads/1782468339454-16yy5mi-726399856_122104194975361474_2517910761741223844_n.jpg" | "/uploads/1782468339454-7ncwk6t-726399856_122104194975361474_2517910761741223844_n.jpg" | "/uploads/1782468339455-1rt08gw-726399856_122104194975361474_2517910761741223844_n.jpg" | "/uploads/1782468339455-tozacdu-726399856_122104194975361474_2517910761741223844_n.jpg" | "/uploads/qr-1-1782467275983.png" | "/uploads/qr-1-1782468408220.png" | string & {};
	}
}