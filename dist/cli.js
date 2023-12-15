#!/usr/bin/env node

(()=>{"use strict";var e={n:t=>{var o=t&&t.__esModule?()=>t.default:()=>t;return e.d(o,{a:o}),o},d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};require("dotenv/config");const t=require("webpack-merge"),o=require("path"),n=require("child_process"),s=require("tsconfig-paths-webpack-plugin"),r=require("webpack"),a=require("app-root-path");var i=e.n(a);const l=require("chalk");var c=e.n(l);const p=require("cli-spinners");var u=e.n(p);const d=require("cli-loading-animation"),g=require("mini-css-extract-plugin");var m=e.n(g);const h=process.env.WP_HOST;if(!h)throw new Error("undefined-env-wp_host");const w="dev"===process.argv[2],f={current:null,trigger:e=>{f.stop&&f.stop();const{start:t,stop:o}=(0,d.loading)(c().magenta((e=>{switch(e){case"compilation":return"Generating WP compiler...";case"bundling":return"Generating WP assets...";case"waiting":return"Compilation completed, waiting for file changes..."}})(e)),{clearOnEnd:!0,spinner:u().dots});f.current=e,f.start=t,f.stop=o,f.start()},terminate:()=>{f.stop&&f.stop()}},v={mode:w?"development":"production",devtool:w?"inline-source-map":"source-map",module:{rules:[{test:/\.tsx?$/,use:[{loader:"ts-loader",options:{transpileOnly:!0}}],exclude:/node_modules\/(?!@hund-ernesto\/wtr)/},{test:/\.scss$/,use:[m().loader,"css-loader","sass-loader"]},{test:/\.(png|svg|jpg|jpeg|gif)$/i,type:"asset/resource",generator:{filename:"assets/images/[name][ext]"}},{test:/\.(woff|woff2|eot|ttf|otf)$/i,type:"asset/resource",generator:{filename:"assets/fonts/[name][ext]"}}]},resolve:{extensions:["",".tsx",".ts",".js",".jsx",".css",".scss"],modules:["node_modules"],alias:{"@":i().path},plugins:[new s.TsconfigPathsPlugin({configFile:(0,o.resolve)(i().path,"tsconfig.json"),extensions:[".ts",".js"]})]},plugins:[new r.DefinePlugin({PROJECT:JSON.stringify(i().path),CORE_WP:JSON.stringify((0,o.resolve)(i().path,"node_modules/@hund-ernesto/wtr")),WP_HOST:JSON.stringify(h)}),new(m())({})],output:{publicPath:"/wp-content/themes/wp-theme/dist/"},optimization:{splitChunks:{cacheGroups:{styles:{name:"main",type:"css/mini-extract",chunks:"all",enforce:!0}}}}},y=(e,t)=>{if(e||t?.hasErrors())return f.terminate(),void console.error(c().red("WP Compiler bundle failed due to an unknown error"))},b=(0,r.webpack)((0,t.merge)(v,{target:"web",entry:{main:(0,o.resolve)(i().path,"node_modules/@hund-ernesto/wtr/src/bundle.tsx")},output:{filename:"[name].js",path:(0,o.resolve)(i().path,"_out/wp-theme/dist"),clean:!0}})),x=(0,r.webpack)((0,t.merge)(v,{target:"node",entry:{index:(0,o.resolve)(i().path,"node_modules/@hund-ernesto/wtr/src/compiler.tsx")},output:{filename:"[name].js",path:(0,o.resolve)(i().path,".compiler"),clean:!0}}));f.trigger("compilation"),w?x.watch({},y):x.run(y),x.hooks.done.tap("DoneMessage",(async e=>{f.stop?.(),await new Promise(((e,t)=>{console.log(c().magenta("=== Compilation LOG ===")),console.log(c().magenta());const s=(0,o.resolve)(i().path,"./.compiler/index.js"),r=(0,n.spawn)("node",[s]);r.stdout.on("data",(e=>{console.log(c().white(e))})),r.stderr.on("data",(e=>{console.error(c().red(e))})),r.on("close",(o=>{console.log(c().magenta()),console.log(c().magenta("=== LOG END ===")),console.log(c().magenta()),0===o?e():t(`Compilation failed with exit code ${o}`)}))})),f.trigger("bundling"),b.run(y),b.hooks.done.tap("DoneMessage",(async e=>{f.stop?.(),w?f.trigger("waiting"):console.log(c().blue("Compilation completed, you are ready to go!"))}))}))})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVVHLElBQ3pCN0IsUUFBUXFCLElBQUksZUFDWnJCLFFBQVFxQixJQUFJLFlBQWMsb0JBQzFCckIsUUFBUXFCLElBQUksZUFFQyxJQUFUUSxFQUNIVixJQUVBQyxFQUFRLHFDQUFxQ1MsSUFDOUMsR0FDQyxJQXFCRjdFLEVBQUtFLFFBQVEsWUFFYmdELEVBQU9XLElBQUlqQixHQUVYTSxFQUFPWSxNQUFNQyxLQUFLQyxJQUFJLGVBQWVDLE1BQU9uQixJQUMzQzlDLEVBQUtHLFNBRURMLEVBQ0hFLEVBQUtFLFFBQVEsV0FFYjhDLFFBQVFxQixJQUFJLFNBQVcsK0NBQ3hCLEdBQ0MsRyIsInNvdXJjZXMiOlsid2VicGFjazovL0BodW5kLWVybmVzdG8vd3RyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0BodW5kLWVybmVzdG8vd3RyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL0BodW5kLWVybmVzdG8vd3RyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AaHVuZC1lcm5lc3RvL3d0ci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0BodW5kLWVybmVzdG8vd3RyL2V4dGVybmFsIGNvbW1vbmpzIFwiZG90ZW52L2NvbmZpZ1wiIiwid2VicGFjazovL0BodW5kLWVybmVzdG8vd3RyL2V4dGVybmFsIGNvbW1vbmpzIFwid2VicGFjay1tZXJnZVwiIiwid2VicGFjazovL0BodW5kLWVybmVzdG8vd3RyL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vQGh1bmQtZXJuZXN0by93dHIvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImNoaWxkX3Byb2Nlc3NcIiIsIndlYnBhY2s6Ly9AaHVuZC1lcm5lc3RvL3d0ci9leHRlcm5hbCBjb21tb25qcyBcInRzY29uZmlnLXBhdGhzLXdlYnBhY2stcGx1Z2luXCIiLCJ3ZWJwYWNrOi8vQGh1bmQtZXJuZXN0by93dHIvZXh0ZXJuYWwgY29tbW9uanMgXCJ3ZWJwYWNrXCIiLCJ3ZWJwYWNrOi8vQGh1bmQtZXJuZXN0by93dHIvZXh0ZXJuYWwgY29tbW9uanMgXCJhcHAtcm9vdC1wYXRoXCIiLCJ3ZWJwYWNrOi8vQGh1bmQtZXJuZXN0by93dHIvZXh0ZXJuYWwgY29tbW9uanMgXCJjaGFsa1wiIiwid2VicGFjazovL0BodW5kLWVybmVzdG8vd3RyL2V4dGVybmFsIGNvbW1vbmpzIFwiY2xpLXNwaW5uZXJzXCIiLCJ3ZWJwYWNrOi8vQGh1bmQtZXJuZXN0by93dHIvZXh0ZXJuYWwgY29tbW9uanMgXCJjbGktbG9hZGluZy1hbmltYXRpb25cIiIsIndlYnBhY2s6Ly9AaHVuZC1lcm5lc3RvL3d0ci9leHRlcm5hbCBjb21tb25qcyBcIm1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXCIiLCJ3ZWJwYWNrOi8vQGh1bmQtZXJuZXN0by93dHIvLi9zcmMvY2xpLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJjb25zdCBfX1dFQlBBQ0tfTkFNRVNQQUNFX09CSkVDVF9fID0gcmVxdWlyZShcImRvdGVudi9jb25maWdcIik7IiwiY29uc3QgX19XRUJQQUNLX05BTUVTUEFDRV9PQkpFQ1RfXyA9IHJlcXVpcmUoXCJ3ZWJwYWNrLW1lcmdlXCIpOyIsImNvbnN0IF9fV0VCUEFDS19OQU1FU1BBQ0VfT0JKRUNUX18gPSByZXF1aXJlKFwicGF0aFwiKTsiLCJjb25zdCBfX1dFQlBBQ0tfTkFNRVNQQUNFX09CSkVDVF9fID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7IiwiY29uc3QgX19XRUJQQUNLX05BTUVTUEFDRV9PQkpFQ1RfXyA9IHJlcXVpcmUoXCJ0c2NvbmZpZy1wYXRocy13ZWJwYWNrLXBsdWdpblwiKTsiLCJjb25zdCBfX1dFQlBBQ0tfTkFNRVNQQUNFX09CSkVDVF9fID0gcmVxdWlyZShcIndlYnBhY2tcIik7IiwiY29uc3QgX19XRUJQQUNLX05BTUVTUEFDRV9PQkpFQ1RfXyA9IHJlcXVpcmUoXCJhcHAtcm9vdC1wYXRoXCIpOyIsImNvbnN0IF9fV0VCUEFDS19OQU1FU1BBQ0VfT0JKRUNUX18gPSByZXF1aXJlKFwiY2hhbGtcIik7IiwiY29uc3QgX19XRUJQQUNLX05BTUVTUEFDRV9PQkpFQ1RfXyA9IHJlcXVpcmUoXCJjbGktc3Bpbm5lcnNcIik7IiwiY29uc3QgX19XRUJQQUNLX05BTUVTUEFDRV9PQkpFQ1RfXyA9IHJlcXVpcmUoXCJjbGktbG9hZGluZy1hbmltYXRpb25cIik7IiwiY29uc3QgX19XRUJQQUNLX05BTUVTUEFDRV9PQkpFQ1RfXyA9IHJlcXVpcmUoXCJtaW5pLWNzcy1leHRyYWN0LXBsdWdpblwiKTsiLCJpbXBvcnQgXCJkb3RlbnYvY29uZmlnXCI7XG5pbXBvcnQgeyBtZXJnZSB9IGZyb20gXCJ3ZWJwYWNrLW1lcmdlXCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IHNwYXduIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IFRzY29uZmlnUGF0aHNQbHVnaW4gfSBmcm9tIFwidHNjb25maWctcGF0aHMtd2VicGFjay1wbHVnaW5cIjtcbmltcG9ydCB7IHdlYnBhY2ssIERlZmluZVBsdWdpbiwgQ29uZmlndXJhdGlvbiwgU3RhdHMgfSBmcm9tIFwid2VicGFja1wiO1xuaW1wb3J0IGFwcFJvb3QgZnJvbSBcImFwcC1yb290LXBhdGhcIjtcbmltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIjtcbmltcG9ydCBjbGlTcGlubmVycyBmcm9tIFwiY2xpLXNwaW5uZXJzXCI7XG5pbXBvcnQgeyBMb2FkZXJBY3Rpb25zLCBsb2FkaW5nIH0gZnJvbSBcImNsaS1sb2FkaW5nLWFuaW1hdGlvblwiO1xuaW1wb3J0IE1pbmlDc3NFeHRyYWN0UGx1Z2luIGZyb20gXCJtaW5pLWNzcy1leHRyYWN0LXBsdWdpblwiO1xuXG4vKipcbiAqIE9wdGlvbnNcbiAqL1xuXG5jb25zdCBXUF9IT1NUID0gcHJvY2Vzcy5lbnYuV1BfSE9TVDtcblxuaWYgKCFXUF9IT1NUKSB7XG5cdHRocm93IG5ldyBFcnJvcihcInVuZGVmaW5lZC1lbnYtd3BfaG9zdFwiKTsgLy8gVE9ETyBFcnJvciBkaXNwbGF5XG59XG5cbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5hcmd2WzJdID09PSBcImRldlwiO1xuXG4vKipcbiAqIEhhbmRsZSBDTEkgc3RlcHMgdmlzdWFsaXphdGlvblxuICovXG5cbmludGVyZmFjZSBJU3RlcCBleHRlbmRzIFBhcnRpYWw8TG9hZGVyQWN0aW9ucz4ge1xuXHRjdXJyZW50OiBzdHJpbmcgfCBudWxsO1xuXHR0cmlnZ2VyOiB0eXBlb2YgdHJpZ2dlclN0ZXA7XG5cdHRlcm1pbmF0ZTogdHlwZW9mIHRlcm1pbmF0ZVN0ZXA7XG59XG5cbnR5cGUgU3RlcEtleSA9IFwiY29tcGlsYXRpb25cIiB8IFwiYnVuZGxpbmdcIiB8IFwid2FpdGluZ1wiO1xuXG5jb25zdCBnZXRTdGVwTWVzc2FnZSA9IChrZXk6IFN0ZXBLZXkpID0+IHtcblx0c3dpdGNoIChrZXkpIHtcblx0XHRjYXNlIFwiY29tcGlsYXRpb25cIjpcblx0XHRcdHJldHVybiBcIkdlbmVyYXRpbmcgV1AgY29tcGlsZXIuLi5cIjtcblx0XHRjYXNlIFwiYnVuZGxpbmdcIjpcblx0XHRcdHJldHVybiBcIkdlbmVyYXRpbmcgV1AgYXNzZXRzLi4uXCI7XG5cdFx0Y2FzZSBcIndhaXRpbmdcIjpcblx0XHRcdHJldHVybiBcIkNvbXBpbGF0aW9uIGNvbXBsZXRlZCwgd2FpdGluZyBmb3IgZmlsZSBjaGFuZ2VzLi4uXCI7XG5cdH1cbn07XG5cbmNvbnN0IHRyaWdnZXJTdGVwID0gKGtleTogU3RlcEtleSkgPT4ge1xuXHRpZiAoISFzdGVwW1wic3RvcFwiXSkge1xuXHRcdHN0ZXAuc3RvcCgpO1xuXHR9XG5cblx0Y29uc3QgeyBzdGFydCwgc3RvcCB9ID0gbG9hZGluZyhjaGFsay5tYWdlbnRhKGdldFN0ZXBNZXNzYWdlKGtleSkpLCB7XG5cdFx0Y2xlYXJPbkVuZDogdHJ1ZSxcblx0XHRzcGlubmVyOiBjbGlTcGlubmVyc1tcImRvdHNcIl0sXG5cdH0pO1xuXHRzdGVwLmN1cnJlbnQgPSBrZXk7XG5cdHN0ZXAuc3RhcnQgPSBzdGFydDtcblx0c3RlcC5zdG9wID0gc3RvcDtcblxuXHRzdGVwLnN0YXJ0KCk7XG59O1xuXG5jb25zdCB0ZXJtaW5hdGVTdGVwID0gKCkgPT4ge1xuXHRpZiAoISFzdGVwW1wic3RvcFwiXSkge1xuXHRcdHN0ZXAuc3RvcCgpO1xuXHR9XG59O1xuXG5jb25zdCBzdGVwOiBJU3RlcCA9IHtcblx0Y3VycmVudDogbnVsbCxcblx0dHJpZ2dlcjogdHJpZ2dlclN0ZXAsXG5cdHRlcm1pbmF0ZTogdGVybWluYXRlU3RlcCxcbn07XG5cbi8qKlxuICogV2VicGFjayBnbG9iYWwgY29uZmlndXJhdGlvblxuICovXG5cbmNvbnN0IGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSB7XG5cdG1vZGU6IGlzRGV2ID8gXCJkZXZlbG9wbWVudFwiIDogXCJwcm9kdWN0aW9uXCIsXG5cdGRldnRvb2w6IGlzRGV2ID8gXCJpbmxpbmUtc291cmNlLW1hcFwiIDogXCJzb3VyY2UtbWFwXCIsXG5cdG1vZHVsZToge1xuXHRcdHJ1bGVzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRlc3Q6IC9cXC50c3g/JC8sXG5cdFx0XHRcdHVzZTogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGxvYWRlcjogXCJ0cy1sb2FkZXJcIixcblx0XHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdFx0dHJhbnNwaWxlT25seTogdHJ1ZSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdFx0ZXhjbHVkZTogL25vZGVfbW9kdWxlc1xcLyg/IUBodW5kLWVybmVzdG9cXC93dHIpLyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRlc3Q6IC9cXC5zY3NzJC8sXG5cdFx0XHRcdC8vIHVzZTogW1wic3R5bGUtbG9hZGVyXCIsIFwiY3NzLWxvYWRlclwiLCBcInNhc3MtbG9hZGVyXCJdLCAvLyBUT0RPIGRhIHJpYXR0aXZhcmUgYXNzaWVtZSBhbGxhIHZlcnNpb25lIGNvbiBpbCBzZXJ2ZVxuXHRcdFx0XHR1c2U6IFtNaW5pQ3NzRXh0cmFjdFBsdWdpbi5sb2FkZXIsIFwiY3NzLWxvYWRlclwiLCBcInNhc3MtbG9hZGVyXCJdLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGVzdDogL1xcLihwbmd8c3ZnfGpwZ3xqcGVnfGdpZikkL2ksXG5cdFx0XHRcdHR5cGU6IFwiYXNzZXQvcmVzb3VyY2VcIixcblx0XHRcdFx0Z2VuZXJhdG9yOiB7XG5cdFx0XHRcdFx0ZmlsZW5hbWU6IFwiYXNzZXRzL2ltYWdlcy9bbmFtZV1bZXh0XVwiLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGVzdDogL1xcLih3b2ZmfHdvZmYyfGVvdHx0dGZ8b3RmKSQvaSxcblx0XHRcdFx0dHlwZTogXCJhc3NldC9yZXNvdXJjZVwiLFxuXHRcdFx0XHRnZW5lcmF0b3I6IHtcblx0XHRcdFx0XHRmaWxlbmFtZTogXCJhc3NldHMvZm9udHMvW25hbWVdW2V4dF1cIixcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XSxcblx0fSxcblx0cmVzb2x2ZToge1xuXHRcdGV4dGVuc2lvbnM6IFtcIlwiLCBcIi50c3hcIiwgXCIudHNcIiwgXCIuanNcIiwgXCIuanN4XCIsIFwiLmNzc1wiLCBcIi5zY3NzXCJdLFxuXHRcdG1vZHVsZXM6IFtcIm5vZGVfbW9kdWxlc1wiXSxcblx0XHRhbGlhczoge1xuXHRcdFx0XCJAXCI6IGFwcFJvb3RbXCJwYXRoXCJdLFxuXHRcdH0sXG5cdFx0cGx1Z2luczogW1xuXHRcdFx0bmV3IFRzY29uZmlnUGF0aHNQbHVnaW4oe1xuXHRcdFx0XHRjb25maWdGaWxlOiByZXNvbHZlKGFwcFJvb3RbXCJwYXRoXCJdLCBcInRzY29uZmlnLmpzb25cIiksXG5cdFx0XHRcdGV4dGVuc2lvbnM6IFtcIi50c1wiLCBcIi5qc1wiXSxcblx0XHRcdH0pLFxuXHRcdF0sIC8vIFRPRE8gZXZhbHVhdGUgaWYgbmVlZGVkXG5cdH0sXG5cdHBsdWdpbnM6IFtcblx0XHRuZXcgRGVmaW5lUGx1Z2luKHtcblx0XHRcdFBST0pFQ1Q6IEpTT04uc3RyaW5naWZ5KGFwcFJvb3RbXCJwYXRoXCJdKSxcblx0XHRcdENPUkVfV1A6IEpTT04uc3RyaW5naWZ5KHJlc29sdmUoYXBwUm9vdFtcInBhdGhcIl0sIFwibm9kZV9tb2R1bGVzL0BodW5kLWVybmVzdG8vd3RyXCIpKSxcblx0XHRcdFdQX0hPU1Q6IEpTT04uc3RyaW5naWZ5KFdQX0hPU1QpLFxuXHRcdH0pLFxuXHRcdG5ldyBNaW5pQ3NzRXh0cmFjdFBsdWdpbih7fSksXG5cdF0sXG5cdG91dHB1dDoge1xuXHRcdHB1YmxpY1BhdGg6IFwiL3dwLWNvbnRlbnQvdGhlbWVzL3dwLXRoZW1lL2Rpc3QvXCIsXG5cdH0sXG5cdG9wdGltaXphdGlvbjoge1xuXHRcdHNwbGl0Q2h1bmtzOiB7XG5cdFx0XHRjYWNoZUdyb3Vwczoge1xuXHRcdFx0XHRzdHlsZXM6IHtcblx0XHRcdFx0XHRuYW1lOiBcIm1haW5cIixcblx0XHRcdFx0XHR0eXBlOiBcImNzcy9taW5pLWV4dHJhY3RcIixcblx0XHRcdFx0XHRjaHVua3M6IFwiYWxsXCIsXG5cdFx0XHRcdFx0ZW5mb3JjZTogdHJ1ZSxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0fSxcblx0fSxcbn07XG5cbmNvbnN0IHdlYnBhY2tFcnJvckhhbmRsZXIgPSAoZXJyOiBFcnJvciB8IG51bGwgfCB1bmRlZmluZWQsIHN0YXRzOiBTdGF0cyB8IHVuZGVmaW5lZCkgPT4ge1xuXHRpZiAoZXJyIHx8IHN0YXRzPy5oYXNFcnJvcnMoKSkge1xuXHRcdHN0ZXAudGVybWluYXRlKCk7XG5cdFx0Y29uc29sZS5lcnJvcihjaGFsay5yZWQoXCJXUCBDb21waWxlciBidW5kbGUgZmFpbGVkIGR1ZSB0byBhbiB1bmtub3duIGVycm9yXCIpKTtcblx0XHRyZXR1cm47XG5cdH1cbn07XG5cbi8qKlxuICogV2VicGFjayBidW5kbGUgZ2VuZXJhdG9yXG4gKi9cblxuY29uc3QgYnVuZGxlID0gd2VicGFjayhcblx0bWVyZ2UoY29uZmlndXJhdGlvbiwge1xuXHRcdHRhcmdldDogXCJ3ZWJcIixcblx0XHRlbnRyeTogeyBtYWluOiByZXNvbHZlKGFwcFJvb3RbXCJwYXRoXCJdLCBcIm5vZGVfbW9kdWxlcy9AaHVuZC1lcm5lc3RvL3d0ci9zcmMvYnVuZGxlLnRzeFwiKSB9LFxuXHRcdG91dHB1dDoge1xuXHRcdFx0ZmlsZW5hbWU6IFwiW25hbWVdLmpzXCIsXG5cdFx0XHRwYXRoOiByZXNvbHZlKGFwcFJvb3RbXCJwYXRoXCJdLCBcIl9vdXQvd3AtdGhlbWUvZGlzdFwiKSxcblx0XHRcdGNsZWFuOiB0cnVlLFxuXHRcdH0sXG5cdH0pXG4pO1xuXG4vKipcbiAqIFdlYnBhY2sgY29tcGlsZXIgZ2VuZXJhdG9yXG4gKi9cblxuY29uc3QgY29tcGlsZXIgPSB3ZWJwYWNrKFxuXHRtZXJnZShjb25maWd1cmF0aW9uLCB7XG5cdFx0dGFyZ2V0OiBcIm5vZGVcIixcblx0XHRlbnRyeToge1xuXHRcdFx0aW5kZXg6IHJlc29sdmUoYXBwUm9vdFtcInBhdGhcIl0sIFwibm9kZV9tb2R1bGVzL0BodW5kLWVybmVzdG8vd3RyL3NyYy9jb21waWxlci50c3hcIiksXG5cdFx0fSxcblx0XHRvdXRwdXQ6IHtcblx0XHRcdGZpbGVuYW1lOiBcIltuYW1lXS5qc1wiLFxuXHRcdFx0cGF0aDogcmVzb2x2ZShhcHBSb290W1wicGF0aFwiXSwgXCIuY29tcGlsZXJcIiksXG5cdFx0XHRjbGVhbjogdHJ1ZSxcblx0XHR9LFxuXHR9KVxuKTtcblxuY29uc3QgcnVuQ29tcGlsZXIgPSAoKSA9PlxuXHRuZXcgUHJvbWlzZTx2b2lkPigoX3Jlc29sdmUsIF9yZWplY3QpID0+IHtcblx0XHRjb25zb2xlLmxvZyhjaGFsay5tYWdlbnRhKFwiPT09IENvbXBpbGF0aW9uIExPRyA9PT1cIikpO1xuXHRcdGNvbnNvbGUubG9nKGNoYWxrLm1hZ2VudGEoKSk7XG5cblx0XHRjb25zdCBvdXRwdXRQYXRoID0gcmVzb2x2ZShhcHBSb290W1wicGF0aFwiXSwgXCIuLy5jb21waWxlci9pbmRleC5qc1wiKTtcblx0XHRjb25zdCBjaGlsZFByb2Nlc3MgPSBzcGF3bihcIm5vZGVcIiwgW291dHB1dFBhdGhdKTtcblxuXHRcdGNoaWxkUHJvY2Vzcy5zdGRvdXQub24oXCJkYXRhXCIsIChkYXRhKSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhjaGFsay53aGl0ZShkYXRhKSk7XG5cdFx0fSk7XG5cblx0XHRjaGlsZFByb2Nlc3Muc3RkZXJyLm9uKFwiZGF0YVwiLCAoZGF0YSkgPT4ge1xuXHRcdFx0Y29uc29sZS5lcnJvcihjaGFsay5yZWQoZGF0YSkpO1xuXHRcdH0pO1xuXG5cdFx0Y2hpbGRQcm9jZXNzLm9uKFwiY2xvc2VcIiwgKGNvZGUpID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKGNoYWxrLm1hZ2VudGEoKSk7XG5cdFx0XHRjb25zb2xlLmxvZyhjaGFsay5tYWdlbnRhKFwiPT09IExPRyBFTkQgPT09XCIpKTtcblx0XHRcdGNvbnNvbGUubG9nKGNoYWxrLm1hZ2VudGEoKSk7XG5cblx0XHRcdGlmIChjb2RlID09PSAwKSB7XG5cdFx0XHRcdF9yZXNvbHZlKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRfcmVqZWN0KGBDb21waWxhdGlvbiBmYWlsZWQgd2l0aCBleGl0IGNvZGUgJHtjb2RlfWApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuLyoqXG4gKiBFeGVjdXRpb25cbiAqL1xuXG5jb25zdCBzdGFydCA9ICgpID0+IHtcblx0c3RlcC50cmlnZ2VyKFwiY29tcGlsYXRpb25cIik7XG5cblx0aWYgKGlzRGV2KSB7XG5cdFx0Y29tcGlsZXIud2F0Y2goe30sIHdlYnBhY2tFcnJvckhhbmRsZXIpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbXBpbGVyLnJ1bih3ZWJwYWNrRXJyb3JIYW5kbGVyKTtcblx0fVxuXG5cdGNvbXBpbGVyLmhvb2tzLmRvbmUudGFwKFwiRG9uZU1lc3NhZ2VcIiwgYXN5bmMgKHN0YXRzKSA9PiB7XG5cdFx0c3RlcC5zdG9wPy4oKTtcblxuXHRcdGF3YWl0IHJ1bkNvbXBpbGVyKCk7XG5cblx0XHRzdGVwLnRyaWdnZXIoXCJidW5kbGluZ1wiKTtcblxuXHRcdGJ1bmRsZS5ydW4od2VicGFja0Vycm9ySGFuZGxlcik7XG5cblx0XHRidW5kbGUuaG9va3MuZG9uZS50YXAoXCJEb25lTWVzc2FnZVwiLCBhc3luYyAoc3RhdHMpID0+IHtcblx0XHRcdHN0ZXAuc3RvcD8uKCk7XG5cblx0XHRcdGlmIChpc0Rldikge1xuXHRcdFx0XHRzdGVwLnRyaWdnZXIoXCJ3YWl0aW5nXCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS5sb2coY2hhbGsuYmx1ZShcIkNvbXBpbGF0aW9uIGNvbXBsZXRlZCwgeW91IGFyZSByZWFkeSB0byBnbyFcIikpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcbn07XG5cbnN0YXJ0KCk7XG4iXSwibmFtZXMiOlsiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZSIsImdldHRlciIsIl9fZXNNb2R1bGUiLCJkIiwiYSIsImV4cG9ydHMiLCJkZWZpbml0aW9uIiwia2V5IiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsIm9iaiIsInByb3AiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJyZXF1aXJlIiwiV1BfSE9TVCIsInByb2Nlc3MiLCJlbnYiLCJFcnJvciIsImlzRGV2IiwiYXJndiIsInN0ZXAiLCJjdXJyZW50IiwidHJpZ2dlciIsInN0b3AiLCJzdGFydCIsImxvYWRpbmciLCJnZXRTdGVwTWVzc2FnZSIsImNsZWFyT25FbmQiLCJzcGlubmVyIiwidGVybWluYXRlIiwiY29uZmlndXJhdGlvbiIsIm1vZGUiLCJkZXZ0b29sIiwicnVsZXMiLCJ0ZXN0IiwidXNlIiwibG9hZGVyIiwib3B0aW9ucyIsInRyYW5zcGlsZU9ubHkiLCJleGNsdWRlIiwidHlwZSIsImdlbmVyYXRvciIsImZpbGVuYW1lIiwicmVzb2x2ZSIsImV4dGVuc2lvbnMiLCJtb2R1bGVzIiwiYWxpYXMiLCJwbHVnaW5zIiwiVHNjb25maWdQYXRoc1BsdWdpbiIsImNvbmZpZ0ZpbGUiLCJEZWZpbmVQbHVnaW4iLCJQUk9KRUNUIiwiSlNPTiIsInN0cmluZ2lmeSIsIkNPUkVfV1AiLCJvdXRwdXQiLCJwdWJsaWNQYXRoIiwib3B0aW1pemF0aW9uIiwic3BsaXRDaHVua3MiLCJjYWNoZUdyb3VwcyIsInN0eWxlcyIsIm5hbWUiLCJjaHVua3MiLCJlbmZvcmNlIiwid2VicGFja0Vycm9ySGFuZGxlciIsImVyciIsInN0YXRzIiwiaGFzRXJyb3JzIiwiY29uc29sZSIsImVycm9yIiwiYnVuZGxlIiwid2VicGFjayIsIm1lcmdlIiwidGFyZ2V0IiwiZW50cnkiLCJtYWluIiwicGF0aCIsImNsZWFuIiwiY29tcGlsZXIiLCJpbmRleCIsIndhdGNoIiwicnVuIiwiaG9va3MiLCJkb25lIiwidGFwIiwiYXN5bmMiLCJQcm9taXNlIiwiX3Jlc29sdmUiLCJfcmVqZWN0IiwibG9nIiwib3V0cHV0UGF0aCIsImNoaWxkUHJvY2VzcyIsInNwYXduIiwic3Rkb3V0Iiwib24iLCJkYXRhIiwic3RkZXJyIiwiY29kZSJdLCJzb3VyY2VSb290IjoiIn0=