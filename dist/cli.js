#!/usr/bin/env node

(()=>{"use strict";var e={81:e=>{e.exports=require("child_process")}},t={};function r(s){var n=t[s];if(void 0!==n)return n.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,r),o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{require("dotenv/config");const e=require("fs"),t=require("cli-loading-animation"),s=require("webpack-merge"),n=require("path");var o=r(81);const i=require("tsconfig-paths-webpack-plugin"),a=require("webpack"),l=require("app-root-path");var c=r.n(l);const p=require("chalk");var u=r.n(p);const d=require("cli-spinners");var g=r.n(d);const h=require("mini-css-extract-plugin");var m=r.n(h);const v=require("webpack-dev-server");var w=r.n(v);const f=e=>{b.stop&&b.stop();const{start:r,stop:s}=(0,t.loading)(u().magenta((e=>{switch(e){case"initialization":return"Setting up boilerplate...";case"configuration":return"Installing required packages...";case"compilation":return"Generating WP compiler...";case"serving":return"Server started at http://localhost:9000 ...";case"bundling":return"Generating WP assets...";case"waiting":return"Waiting for file changes..."}})(e)),{clearOnEnd:!0,spinner:g().dots});b.current=e,b.start=r,b.stop=s,b.start()},y=()=>{b.stop&&b.stop()},b={current:null,trigger:f,terminate:y};if("init"===process.argv[2]){f("initialization"),(0,e.cpSync)((0,n.resolve)(c().path,"node_modules/@hund-ernesto/wtr/init"),(0,n.resolve)(process.cwd(),"website"),{recursive:!0}),process.chdir((0,n.resolve)(process.cwd(),"website")),f("configuration");const{spawnSync:t}=r(81);0===t("npm",["install"],{stdio:"inherit"}).status?(y(),console.log(u().blue("Initialization completed, you are ready to go!")),process.exit()):(console.error("Error running npm install"),process.exit(1))}const x=process.env.WP_HOST;if(!x)throw new Error("undefined-env-wp_host");const O="start"===process.argv[2],_=O||"dev"===process.argv[2],P={mode:_?"development":"production",devtool:_?"inline-source-map":"source-map",module:{rules:[{test:/\.tsx?$/,use:[{loader:"ts-loader",options:{transpileOnly:!0}}],exclude:/node_modules\/(?!@hund-ernesto\/wtr)/},{test:/\.scss$/,use:[m().loader,"css-loader","sass-loader"]},{test:/\.(png|svg|jpg|jpeg|gif)$/i,type:"asset/resource",generator:{filename:"assets/images/[name][ext]"}},{test:/\.(woff|woff2|eot|ttf|otf)$/i,type:"asset/resource",generator:{filename:"assets/fonts/[name][ext]"}}]},resolve:{extensions:["",".tsx",".ts",".js",".jsx",".css",".scss"],modules:["node_modules"],alias:{"@":c().path},plugins:[new i.TsconfigPathsPlugin({configFile:(0,n.resolve)(c().path,"tsconfig.json"),extensions:[".ts",".js"]})]},plugins:[new a.DefinePlugin({MODE:JSON.stringify(O?"serve":_?"watch":"build"),PROJECT:JSON.stringify(c().path),CORE_WP:JSON.stringify((0,n.resolve)(c().path,"node_modules/@hund-ernesto/wtr")),WP_HOST:JSON.stringify(x)}),new(m())({})],output:{publicPath:"/wp-content/themes/wp-theme/dist/"},optimization:{splitChunks:{cacheGroups:{styles:{name:"main",type:"css/mini-extract",chunks:"all",enforce:!0}}}}},k=(e,t)=>{if(e||t?.hasErrors())return b.terminate(),void console.error(u().red("WP Compiler bundle failed due to an unknown error"))},q=(0,a.webpack)((0,s.merge)(P,{target:"web",entry:{main:(0,n.resolve)(c().path,"node_modules/@hund-ernesto/wtr/src/bundle.tsx")},output:{filename:"[name].js",path:(0,n.resolve)(c().path,"_out/wp-theme/dist"),clean:!0,publicPath:O?"/":void 0},infrastructureLogging:{level:"error"},stats:"none"})),S=new(w())({static:[(0,n.resolve)(c().path,"node_modules/@hund-ernesto/wtr/server"),(0,n.resolve)(c().path,"_out/wp-theme/dist")],compress:!0,port:9e3,historyApiFallback:!0},q),j=(0,a.webpack)((0,s.merge)(P,{target:"node",entry:{index:(0,n.resolve)(c().path,"node_modules/@hund-ernesto/wtr/src/compiler.tsx")},output:{filename:"[name].js",path:(0,n.resolve)(c().path,".compiler"),clean:!0}}));b.trigger("compilation"),O?(b.trigger("serving"),S.start()):_?j.watch({},k):j.run(k),j.hooks.done.tap("DoneMessage",(async e=>{b.stop?.(),await new Promise(((e,t)=>{const r=(0,n.resolve)(c().path,"./.compiler/index.js"),s=(0,o.spawn)("node",[r]);let i=[];s.stdout.on("data",(e=>{if(e){const t=e.toString().trim();i.push(u().white(t))}})),s.stderr.on("data",(e=>{if(e){const t=e.toString().trim();i.push(u().red(t))}})),s.on("close",(r=>{i.length?i=[u().green("✓ Application rendered the following LOGS"),...i,u().green("↥ Application LOG END")]:i.push(u().green("✓ Application rendered without LOGS")),console.log(i.join("\n")),0===r?e():t(`Compilation failed with exit code ${r}`)}))})),b.trigger("bundling"),q.run(k),q.hooks.done.tap("DoneMessage",(async e=>{b.stop?.(),_?b.trigger("waiting"):console.log(u().green("✓ Compilation completed, you are ready to go!"))}))}))})()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBTSxDQUNULE1BQU1DLEVBQWNELEVBQUtFLFdBQVdDLE9BQ3BDTixFQUFlTyxLQUFLLFVBQVlILEdBQ2pDLEtBR0ROLEVBQWFVLE9BQU9OLEdBQUcsUUFBU0MsSUFDL0IsR0FBSUEsRUFBTSxDQUNULE1BQU1DLEVBQWNELEVBQUtFLFdBQVdDLE9BQ3BDTixFQUFlTyxLQUFLLFFBQVVILEdBQy9CLEtBR0ROLEVBQWFJLEdBQUcsU0FBVU8sSUFDbkJULEVBQXVCLE9BQzVCQSxFQUFpQixDQUNoQixVQUFZLGdEQUNUQSxFQUNILFVBQVksMEJBR2JBLEVBQWVPLEtBQUssVUFBWSx3Q0FHakNuRixRQUFRQyxJQUFJMkUsRUFBZVUsS0FBSyxPQUVuQixJQUFURCxFQUNIZCxJQUVBQyxFQUFRLHFDQUFxQ2EsSUFDOUMsR0FDQyxJQXdCRjFHLEVBQUtTLFFBQVEsWUFDYjJELEVBQU9rQixJQUFJdEIsR0FFWEksRUFBT21CLE1BQU1DLEtBQUtDLElBQUksZUFBZUMsTUFBT3hCLElBQzNDbEUsRUFBS0MsU0FFRDRCLEVBQ0g3QixFQUFLUyxRQUFRLFdBRWJZLFFBQVFDLElBQUksVUFBWSxpREFDekIsR0FDQyxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGh1bmQtZXJuZXN0by93dHIvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImNoaWxkX3Byb2Nlc3NcIiIsIndlYnBhY2s6Ly9AaHVuZC1lcm5lc3RvL3d0ci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AaHVuZC1lcm5lc3RvL3d0ci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9AaHVuZC1lcm5lc3RvL3d0ci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGh1bmQtZXJuZXN0by93dHIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AaHVuZC1lcm5lc3RvL3d0ci9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudi9jb25maWdcIiIsIndlYnBhY2s6Ly9AaHVuZC1lcm5lc3RvL3d0ci9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZnNcIiIsIndlYnBhY2s6Ly9AaHVuZC1lcm5lc3RvL3d0ci9leHRlcm5hbCBjb21tb25qcyBcImNsaS1sb2FkaW5nLWFuaW1hdGlvblwiIiwid2VicGFjazovL0BodW5kLWVybmVzdG8vd3RyL2V4dGVybmFsIGNvbW1vbmpzIFwid2VicGFjay1tZXJnZVwiIiwid2VicGFjazovL0BodW5kLWVybmVzdG8vd3RyL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vQGh1bmQtZXJuZXN0by93dHIvZXh0ZXJuYWwgY29tbW9uanMgXCJ0c2NvbmZpZy1wYXRocy13ZWJwYWNrLXBsdWdpblwiIiwid2VicGFjazovL0BodW5kLWVybmVzdG8vd3RyL2V4dGVybmFsIGNvbW1vbmpzIFwid2VicGFja1wiIiwid2VicGFjazovL0BodW5kLWVybmVzdG8vd3RyL2V4dGVybmFsIGNvbW1vbmpzIFwiYXBwLXJvb3QtcGF0aFwiIiwid2VicGFjazovL0BodW5kLWVybmVzdG8vd3RyL2V4dGVybmFsIGNvbW1vbmpzIFwiY2hhbGtcIiIsIndlYnBhY2s6Ly9AaHVuZC1lcm5lc3RvL3d0ci9leHRlcm5hbCBjb21tb25qcyBcImNsaS1zcGlubmVyc1wiIiwid2VicGFjazovL0BodW5kLWVybmVzdG8vd3RyL2V4dGVybmFsIGNvbW1vbmpzIFwibWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cIiIsIndlYnBhY2s6Ly9AaHVuZC1lcm5lc3RvL3d0ci9leHRlcm5hbCBjb21tb25qcyBcIndlYnBhY2stZGV2LXNlcnZlclwiIiwid2VicGFjazovL0BodW5kLWVybmVzdG8vd3RyLy4vc3JjL2NsaS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJjb25zdCBfX1dFQlBBQ0tfTkFNRVNQQUNFX09CSkVDVF9fID0gcmVxdWlyZShcImRvdGVudi9jb25maWdcIik7IiwiY29uc3QgX19XRUJQQUNLX05BTUVTUEFDRV9PQkpFQ1RfXyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJjb25zdCBfX1dFQlBBQ0tfTkFNRVNQQUNFX09CSkVDVF9fID0gcmVxdWlyZShcImNsaS1sb2FkaW5nLWFuaW1hdGlvblwiKTsiLCJjb25zdCBfX1dFQlBBQ0tfTkFNRVNQQUNFX09CSkVDVF9fID0gcmVxdWlyZShcIndlYnBhY2stbWVyZ2VcIik7IiwiY29uc3QgX19XRUJQQUNLX05BTUVTUEFDRV9PQkpFQ1RfXyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsImNvbnN0IF9fV0VCUEFDS19OQU1FU1BBQ0VfT0JKRUNUX18gPSByZXF1aXJlKFwidHNjb25maWctcGF0aHMtd2VicGFjay1wbHVnaW5cIik7IiwiY29uc3QgX19XRUJQQUNLX05BTUVTUEFDRV9PQkpFQ1RfXyA9IHJlcXVpcmUoXCJ3ZWJwYWNrXCIpOyIsImNvbnN0IF9fV0VCUEFDS19OQU1FU1BBQ0VfT0JKRUNUX18gPSByZXF1aXJlKFwiYXBwLXJvb3QtcGF0aFwiKTsiLCJjb25zdCBfX1dFQlBBQ0tfTkFNRVNQQUNFX09CSkVDVF9fID0gcmVxdWlyZShcImNoYWxrXCIpOyIsImNvbnN0IF9fV0VCUEFDS19OQU1FU1BBQ0VfT0JKRUNUX18gPSByZXF1aXJlKFwiY2xpLXNwaW5uZXJzXCIpOyIsImNvbnN0IF9fV0VCUEFDS19OQU1FU1BBQ0VfT0JKRUNUX18gPSByZXF1aXJlKFwibWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cIik7IiwiY29uc3QgX19XRUJQQUNLX05BTUVTUEFDRV9PQkpFQ1RfXyA9IHJlcXVpcmUoXCJ3ZWJwYWNrLWRldi1zZXJ2ZXJcIik7IiwiaW1wb3J0IFwiZG90ZW52L2NvbmZpZ1wiO1xuaW1wb3J0IHsgY3BTeW5jIH0gZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBMb2FkZXJBY3Rpb25zLCBsb2FkaW5nIH0gZnJvbSBcImNsaS1sb2FkaW5nLWFuaW1hdGlvblwiO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tIFwid2VicGFjay1tZXJnZVwiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBzcGF3biB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyBUc2NvbmZpZ1BhdGhzUGx1Z2luIH0gZnJvbSBcInRzY29uZmlnLXBhdGhzLXdlYnBhY2stcGx1Z2luXCI7XG5pbXBvcnQgeyB3ZWJwYWNrLCBEZWZpbmVQbHVnaW4sIENvbmZpZ3VyYXRpb24sIFN0YXRzIH0gZnJvbSBcIndlYnBhY2tcIjtcbmltcG9ydCBhcHBSb290IGZyb20gXCJhcHAtcm9vdC1wYXRoXCI7XG5pbXBvcnQgY2hhbGsgZnJvbSBcImNoYWxrXCI7XG5pbXBvcnQgY2xpU3Bpbm5lcnMgZnJvbSBcImNsaS1zcGlubmVyc1wiO1xuaW1wb3J0IE1pbmlDc3NFeHRyYWN0UGx1Z2luIGZyb20gXCJtaW5pLWNzcy1leHRyYWN0LXBsdWdpblwiO1xuaW1wb3J0IFdlYnBhY2tEZXZTZXJ2ZXIgZnJvbSBcIndlYnBhY2stZGV2LXNlcnZlclwiO1xuaW1wb3J0IFwid2VicGFjay1kZXYtc2VydmVyXCI7XG5cbi8qKlxuICogSGFuZGxlIENMSSBzdGVwcyB2aXN1YWxpemF0aW9uXG4gKi9cblxuaW50ZXJmYWNlIElTdGVwIGV4dGVuZHMgUGFydGlhbDxMb2FkZXJBY3Rpb25zPiB7XG5cdGN1cnJlbnQ6IHN0cmluZyB8IG51bGw7XG5cdHRyaWdnZXI6IHR5cGVvZiB0cmlnZ2VyU3RlcDtcblx0dGVybWluYXRlOiB0eXBlb2YgdGVybWluYXRlU3RlcDtcbn1cblxudHlwZSBTdGVwS2V5ID1cblx0fCBcImNvbmZpZ3VyYXRpb25cIlxuXHR8IFwiaW5pdGlhbGl6YXRpb25cIlxuXHR8IFwiY29tcGlsYXRpb25cIlxuXHR8IFwiYnVuZGxpbmdcIlxuXHR8IFwid2FpdGluZ1wiXG5cdHwgXCJzZXJ2aW5nXCI7XG5cbmNvbnN0IGdldFN0ZXBNZXNzYWdlID0gKGtleTogU3RlcEtleSkgPT4ge1xuXHRzd2l0Y2ggKGtleSkge1xuXHRcdGNhc2UgXCJpbml0aWFsaXphdGlvblwiOlxuXHRcdFx0cmV0dXJuIFwiU2V0dGluZyB1cCBib2lsZXJwbGF0ZS4uLlwiO1xuXHRcdGNhc2UgXCJjb25maWd1cmF0aW9uXCI6XG5cdFx0XHRyZXR1cm4gXCJJbnN0YWxsaW5nIHJlcXVpcmVkIHBhY2thZ2VzLi4uXCI7XG5cdFx0Y2FzZSBcImNvbXBpbGF0aW9uXCI6XG5cdFx0XHRyZXR1cm4gXCJHZW5lcmF0aW5nIFdQIGNvbXBpbGVyLi4uXCI7XG5cdFx0Y2FzZSBcInNlcnZpbmdcIjpcblx0XHRcdHJldHVybiBcIlNlcnZlciBzdGFydGVkIGF0IGh0dHA6Ly9sb2NhbGhvc3Q6OTAwMCAuLi5cIjtcblx0XHRjYXNlIFwiYnVuZGxpbmdcIjpcblx0XHRcdHJldHVybiBcIkdlbmVyYXRpbmcgV1AgYXNzZXRzLi4uXCI7XG5cdFx0Y2FzZSBcIndhaXRpbmdcIjpcblx0XHRcdHJldHVybiBcIldhaXRpbmcgZm9yIGZpbGUgY2hhbmdlcy4uLlwiO1xuXHR9XG59O1xuXG5jb25zdCB0cmlnZ2VyU3RlcCA9IChrZXk6IFN0ZXBLZXkpID0+IHtcblx0aWYgKCEhc3RlcFtcInN0b3BcIl0pIHtcblx0XHRzdGVwLnN0b3AoKTtcblx0fVxuXG5cdGNvbnN0IHsgc3RhcnQsIHN0b3AgfSA9IGxvYWRpbmcoY2hhbGsubWFnZW50YShnZXRTdGVwTWVzc2FnZShrZXkpKSwge1xuXHRcdGNsZWFyT25FbmQ6IHRydWUsXG5cdFx0c3Bpbm5lcjogY2xpU3Bpbm5lcnNbXCJkb3RzXCJdLFxuXHR9KTtcblx0c3RlcC5jdXJyZW50ID0ga2V5O1xuXHRzdGVwLnN0YXJ0ID0gc3RhcnQ7XG5cdHN0ZXAuc3RvcCA9IHN0b3A7XG5cblx0c3RlcC5zdGFydCgpO1xufTtcblxuY29uc3QgdGVybWluYXRlU3RlcCA9ICgpID0+IHtcblx0aWYgKCEhc3RlcFtcInN0b3BcIl0pIHtcblx0XHRzdGVwLnN0b3AoKTtcblx0fVxufTtcblxuY29uc3Qgc3RlcDogSVN0ZXAgPSB7XG5cdGN1cnJlbnQ6IG51bGwsXG5cdHRyaWdnZXI6IHRyaWdnZXJTdGVwLFxuXHR0ZXJtaW5hdGU6IHRlcm1pbmF0ZVN0ZXAsXG59O1xuXG4vKipcbiAqIEluaXRpYWxpemF0aW9uIHNjcmlwdFxuICovXG5cbmNvbnN0IGlzSW5pdCA9IHByb2Nlc3MuYXJndlsyXSA9PT0gXCJpbml0XCI7XG5cbmlmIChpc0luaXQpIHtcblx0dHJpZ2dlclN0ZXAoXCJpbml0aWFsaXphdGlvblwiKTtcblxuXHRjcFN5bmMoXG5cdFx0cmVzb2x2ZShhcHBSb290W1wicGF0aFwiXSwgXCJub2RlX21vZHVsZXMvQGh1bmQtZXJuZXN0by93dHIvaW5pdFwiKSxcblx0XHRyZXNvbHZlKHByb2Nlc3MuY3dkKCksIFwid2Vic2l0ZVwiKSxcblx0XHR7XG5cdFx0XHRyZWN1cnNpdmU6IHRydWUsXG5cdFx0fVxuXHQpO1xuXG5cdHByb2Nlc3MuY2hkaXIocmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcIndlYnNpdGVcIikpO1xuXG5cdHRyaWdnZXJTdGVwKFwiY29uZmlndXJhdGlvblwiKTtcblx0Y29uc3QgeyBzcGF3blN5bmMgfSA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xuXHRjb25zdCBucG1JbnN0YWxsID0gc3Bhd25TeW5jKFwibnBtXCIsIFtcImluc3RhbGxcIl0sIHsgc3RkaW86IFwiaW5oZXJpdFwiIH0pO1xuXG5cdGlmIChucG1JbnN0YWxsLnN0YXR1cyA9PT0gMCkge1xuXHRcdHRlcm1pbmF0ZVN0ZXAoKTtcblx0XHRjb25zb2xlLmxvZyhjaGFsay5ibHVlKFwiSW5pdGlhbGl6YXRpb24gY29tcGxldGVkLCB5b3UgYXJlIHJlYWR5IHRvIGdvIVwiKSk7XG5cdFx0cHJvY2Vzcy5leGl0KCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS5lcnJvcihcIkVycm9yIHJ1bm5pbmcgbnBtIGluc3RhbGxcIik7XG5cdFx0cHJvY2Vzcy5leGl0KDEpO1xuXHR9XG59XG5cbi8qKlxuICogT3B0aW9uc1xuICovXG5cbmNvbnN0IFdQX0hPU1QgPSBwcm9jZXNzLmVudi5XUF9IT1NUO1xuXG5pZiAoIVdQX0hPU1QpIHtcblx0dGhyb3cgbmV3IEVycm9yKFwidW5kZWZpbmVkLWVudi13cF9ob3N0XCIpOyAvLyBUT0RPIEVycm9yIGRpc3BsYXlcbn1cblxuY29uc3QgaXNTZXJ2ZSA9IHByb2Nlc3MuYXJndlsyXSA9PT0gXCJzdGFydFwiO1xuY29uc3QgaXNEZXYgPSBpc1NlcnZlIHx8IHByb2Nlc3MuYXJndlsyXSA9PT0gXCJkZXZcIjtcblxuLyoqXG4gKiBXZWJwYWNrIGdsb2JhbCBjb25maWd1cmF0aW9uXG4gKi9cbmNvbnN0IGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSB7XG5cdG1vZGU6IGlzRGV2ID8gXCJkZXZlbG9wbWVudFwiIDogXCJwcm9kdWN0aW9uXCIsXG5cdGRldnRvb2w6IGlzRGV2ID8gXCJpbmxpbmUtc291cmNlLW1hcFwiIDogXCJzb3VyY2UtbWFwXCIsXG5cdG1vZHVsZToge1xuXHRcdHJ1bGVzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdHRlc3Q6IC9cXC50c3g/JC8sXG5cdFx0XHRcdHVzZTogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGxvYWRlcjogXCJ0cy1sb2FkZXJcIixcblx0XHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdFx0dHJhbnNwaWxlT25seTogdHJ1ZSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdFx0ZXhjbHVkZTogL25vZGVfbW9kdWxlc1xcLyg/IUBodW5kLWVybmVzdG9cXC93dHIpLyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRlc3Q6IC9cXC5zY3NzJC8sXG5cdFx0XHRcdHVzZTogW01pbmlDc3NFeHRyYWN0UGx1Z2luLmxvYWRlciwgXCJjc3MtbG9hZGVyXCIsIFwic2Fzcy1sb2FkZXJcIl0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0ZXN0OiAvXFwuKHBuZ3xzdmd8anBnfGpwZWd8Z2lmKSQvaSxcblx0XHRcdFx0dHlwZTogXCJhc3NldC9yZXNvdXJjZVwiLFxuXHRcdFx0XHRnZW5lcmF0b3I6IHtcblx0XHRcdFx0XHRmaWxlbmFtZTogXCJhc3NldHMvaW1hZ2VzL1tuYW1lXVtleHRdXCIsXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0ZXN0OiAvXFwuKHdvZmZ8d29mZjJ8ZW90fHR0ZnxvdGYpJC9pLFxuXHRcdFx0XHR0eXBlOiBcImFzc2V0L3Jlc291cmNlXCIsXG5cdFx0XHRcdGdlbmVyYXRvcjoge1xuXHRcdFx0XHRcdGZpbGVuYW1lOiBcImFzc2V0cy9mb250cy9bbmFtZV1bZXh0XVwiLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRdLFxuXHR9LFxuXHRyZXNvbHZlOiB7XG5cdFx0ZXh0ZW5zaW9uczogW1wiXCIsIFwiLnRzeFwiLCBcIi50c1wiLCBcIi5qc1wiLCBcIi5qc3hcIiwgXCIuY3NzXCIsIFwiLnNjc3NcIl0sXG5cdFx0bW9kdWxlczogW1wibm9kZV9tb2R1bGVzXCJdLFxuXHRcdGFsaWFzOiB7XG5cdFx0XHRcIkBcIjogYXBwUm9vdFtcInBhdGhcIl0sXG5cdFx0fSxcblx0XHRwbHVnaW5zOiBbXG5cdFx0XHRuZXcgVHNjb25maWdQYXRoc1BsdWdpbih7XG5cdFx0XHRcdGNvbmZpZ0ZpbGU6IHJlc29sdmUoYXBwUm9vdFtcInBhdGhcIl0sIFwidHNjb25maWcuanNvblwiKSxcblx0XHRcdFx0ZXh0ZW5zaW9uczogW1wiLnRzXCIsIFwiLmpzXCJdLFxuXHRcdFx0fSksXG5cdFx0XSwgLy8gVE9ETyBldmFsdWF0ZSBpZiBuZWVkZWRcblx0fSxcblx0cGx1Z2luczogW1xuXHRcdG5ldyBEZWZpbmVQbHVnaW4oe1xuXHRcdFx0TU9ERTogSlNPTi5zdHJpbmdpZnkoaXNTZXJ2ZSA/IFwic2VydmVcIiA6IGlzRGV2ID8gXCJ3YXRjaFwiIDogXCJidWlsZFwiKSxcblx0XHRcdFBST0pFQ1Q6IEpTT04uc3RyaW5naWZ5KGFwcFJvb3RbXCJwYXRoXCJdKSxcblx0XHRcdENPUkVfV1A6IEpTT04uc3RyaW5naWZ5KHJlc29sdmUoYXBwUm9vdFtcInBhdGhcIl0sIFwibm9kZV9tb2R1bGVzL0BodW5kLWVybmVzdG8vd3RyXCIpKSxcblx0XHRcdFdQX0hPU1Q6IEpTT04uc3RyaW5naWZ5KFdQX0hPU1QpLFxuXHRcdH0pLFxuXHRcdG5ldyBNaW5pQ3NzRXh0cmFjdFBsdWdpbih7fSksXG5cdF0sXG5cdG91dHB1dDoge1xuXHRcdHB1YmxpY1BhdGg6IFwiL3dwLWNvbnRlbnQvdGhlbWVzL3dwLXRoZW1lL2Rpc3QvXCIsXG5cdH0sXG5cdG9wdGltaXphdGlvbjoge1xuXHRcdHNwbGl0Q2h1bmtzOiB7XG5cdFx0XHRjYWNoZUdyb3Vwczoge1xuXHRcdFx0XHRzdHlsZXM6IHtcblx0XHRcdFx0XHRuYW1lOiBcIm1haW5cIixcblx0XHRcdFx0XHR0eXBlOiBcImNzcy9taW5pLWV4dHJhY3RcIixcblx0XHRcdFx0XHRjaHVua3M6IFwiYWxsXCIsXG5cdFx0XHRcdFx0ZW5mb3JjZTogdHJ1ZSxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0fSxcblx0fSxcbn07XG5cbmNvbnN0IHdlYnBhY2tFcnJvckhhbmRsZXIgPSAoZXJyOiBFcnJvciB8IG51bGwgfCB1bmRlZmluZWQsIHN0YXRzOiBTdGF0cyB8IHVuZGVmaW5lZCkgPT4ge1xuXHRpZiAoZXJyIHx8IHN0YXRzPy5oYXNFcnJvcnMoKSkge1xuXHRcdHN0ZXAudGVybWluYXRlKCk7XG5cdFx0Y29uc29sZS5lcnJvcihjaGFsay5yZWQoXCJXUCBDb21waWxlciBidW5kbGUgZmFpbGVkIGR1ZSB0byBhbiB1bmtub3duIGVycm9yXCIpKTtcblx0XHRyZXR1cm47XG5cdH1cbn07XG5cbi8qKlxuICogV2VicGFjayBidW5kbGUgZ2VuZXJhdG9yXG4gKi9cblxuY29uc3QgYnVuZGxlID0gd2VicGFjayhcblx0bWVyZ2UoY29uZmlndXJhdGlvbiwge1xuXHRcdHRhcmdldDogXCJ3ZWJcIixcblx0XHRlbnRyeTogeyBtYWluOiByZXNvbHZlKGFwcFJvb3RbXCJwYXRoXCJdLCBcIm5vZGVfbW9kdWxlcy9AaHVuZC1lcm5lc3RvL3d0ci9zcmMvYnVuZGxlLnRzeFwiKSB9LFxuXHRcdG91dHB1dDoge1xuXHRcdFx0ZmlsZW5hbWU6IFwiW25hbWVdLmpzXCIsXG5cdFx0XHRwYXRoOiByZXNvbHZlKGFwcFJvb3RbXCJwYXRoXCJdLCBcIl9vdXQvd3AtdGhlbWUvZGlzdFwiKSxcblx0XHRcdGNsZWFuOiB0cnVlLFxuXHRcdFx0cHVibGljUGF0aDogaXNTZXJ2ZSA/IFwiL1wiIDogdW5kZWZpbmVkLFxuXHRcdH0sXG5cdFx0aW5mcmFzdHJ1Y3R1cmVMb2dnaW5nOiB7IGxldmVsOiBcImVycm9yXCIgfSxcblx0XHRzdGF0czogXCJub25lXCIsXG5cdH0pXG4pO1xuXG4vKipcbiAqIFdlYnBhY2sgc2VydmVyXG4gKi9cblxuY29uc3Qgc2VydmVyID0gbmV3IFdlYnBhY2tEZXZTZXJ2ZXIoXG5cdHtcblx0XHRzdGF0aWM6IFtcblx0XHRcdHJlc29sdmUoYXBwUm9vdFtcInBhdGhcIl0sIFwibm9kZV9tb2R1bGVzL0BodW5kLWVybmVzdG8vd3RyL3NlcnZlclwiKSxcblx0XHRcdHJlc29sdmUoYXBwUm9vdFtcInBhdGhcIl0sIFwiX291dC93cC10aGVtZS9kaXN0XCIpLFxuXHRcdF0sXG5cdFx0Y29tcHJlc3M6IHRydWUsXG5cdFx0cG9ydDogOTAwMCxcblx0XHRoaXN0b3J5QXBpRmFsbGJhY2s6IHRydWUsXG5cdH0sXG5cdGJ1bmRsZVxuKTtcblxuLyoqXG4gKiBXZWJwYWNrIGNvbXBpbGVyIGdlbmVyYXRvclxuICovXG5cbmNvbnN0IGNvbXBpbGVyID0gd2VicGFjayhcblx0bWVyZ2UoY29uZmlndXJhdGlvbiwge1xuXHRcdHRhcmdldDogXCJub2RlXCIsXG5cdFx0ZW50cnk6IHtcblx0XHRcdGluZGV4OiByZXNvbHZlKGFwcFJvb3RbXCJwYXRoXCJdLCBcIm5vZGVfbW9kdWxlcy9AaHVuZC1lcm5lc3RvL3d0ci9zcmMvY29tcGlsZXIudHN4XCIpLFxuXHRcdH0sXG5cdFx0b3V0cHV0OiB7XG5cdFx0XHRmaWxlbmFtZTogXCJbbmFtZV0uanNcIixcblx0XHRcdHBhdGg6IHJlc29sdmUoYXBwUm9vdFtcInBhdGhcIl0sIFwiLmNvbXBpbGVyXCIpLFxuXHRcdFx0Y2xlYW46IHRydWUsXG5cdFx0fSxcblx0fSlcbik7XG5cbmNvbnN0IHJ1bkNvbXBpbGVyID0gKCkgPT5cblx0bmV3IFByb21pc2U8dm9pZD4oKF9yZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG5cdFx0Y29uc3Qgb3V0cHV0UGF0aCA9IHJlc29sdmUoYXBwUm9vdFtcInBhdGhcIl0sIFwiLi8uY29tcGlsZXIvaW5kZXguanNcIik7XG5cdFx0Y29uc3QgY2hpbGRQcm9jZXNzID0gc3Bhd24oXCJub2RlXCIsIFtvdXRwdXRQYXRoXSk7XG5cdFx0bGV0IHJlYWRhYmxlT3V0cHV0OiBzdHJpbmdbXSA9IFtdO1xuXG5cdFx0Y2hpbGRQcm9jZXNzLnN0ZG91dC5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcblx0XHRcdGlmIChkYXRhKSB7XG5cdFx0XHRcdGNvbnN0IHRyaW1tZWREYXRhID0gZGF0YS50b1N0cmluZygpLnRyaW0oKTtcblx0XHRcdFx0cmVhZGFibGVPdXRwdXQucHVzaChjaGFsay53aGl0ZSh0cmltbWVkRGF0YSkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Y2hpbGRQcm9jZXNzLnN0ZGVyci5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcblx0XHRcdGlmIChkYXRhKSB7XG5cdFx0XHRcdGNvbnN0IHRyaW1tZWREYXRhID0gZGF0YS50b1N0cmluZygpLnRyaW0oKTtcblx0XHRcdFx0cmVhZGFibGVPdXRwdXQucHVzaChjaGFsay5yZWQodHJpbW1lZERhdGEpKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGNoaWxkUHJvY2Vzcy5vbihcImNsb3NlXCIsIChjb2RlKSA9PiB7XG5cdFx0XHRpZiAoISFyZWFkYWJsZU91dHB1dFtcImxlbmd0aFwiXSkge1xuXHRcdFx0XHRyZWFkYWJsZU91dHB1dCA9IFtcblx0XHRcdFx0XHRjaGFsay5ncmVlbihcIuKckyBBcHBsaWNhdGlvbiByZW5kZXJlZCB0aGUgZm9sbG93aW5nIExPR1NcIiksXG5cdFx0XHRcdFx0Li4ucmVhZGFibGVPdXRwdXQsXG5cdFx0XHRcdFx0Y2hhbGsuZ3JlZW4oXCLihqUgQXBwbGljYXRpb24gTE9HIEVORFwiKSxcblx0XHRcdFx0XTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlYWRhYmxlT3V0cHV0LnB1c2goY2hhbGsuZ3JlZW4oXCLinJMgQXBwbGljYXRpb24gcmVuZGVyZWQgd2l0aG91dCBMT0dTXCIpKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc29sZS5sb2cocmVhZGFibGVPdXRwdXQuam9pbihcIlxcblwiKSk7XG5cblx0XHRcdGlmIChjb2RlID09PSAwKSB7XG5cdFx0XHRcdF9yZXNvbHZlKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRfcmVqZWN0KGBDb21waWxhdGlvbiBmYWlsZWQgd2l0aCBleGl0IGNvZGUgJHtjb2RlfWApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuLyoqXG4gKiBFeGVjdXRpb25cbiAqL1xuXG5jb25zdCBzdGFydCA9ICgpID0+IHtcblx0c3RlcC50cmlnZ2VyKFwiY29tcGlsYXRpb25cIik7XG5cblx0aWYgKGlzU2VydmUpIHtcblx0XHRzdGVwLnRyaWdnZXIoXCJzZXJ2aW5nXCIpO1xuXHRcdHNlcnZlci5zdGFydCgpO1xuXHR9IGVsc2UgaWYgKGlzRGV2KSB7XG5cdFx0Y29tcGlsZXIud2F0Y2goe30sIHdlYnBhY2tFcnJvckhhbmRsZXIpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbXBpbGVyLnJ1bih3ZWJwYWNrRXJyb3JIYW5kbGVyKTtcblx0fVxuXG5cdGNvbXBpbGVyLmhvb2tzLmRvbmUudGFwKFwiRG9uZU1lc3NhZ2VcIiwgYXN5bmMgKHN0YXRzKSA9PiB7XG5cdFx0c3RlcC5zdG9wPy4oKTtcblxuXHRcdGF3YWl0IHJ1bkNvbXBpbGVyKCk7XG5cblx0XHRzdGVwLnRyaWdnZXIoXCJidW5kbGluZ1wiKTtcblx0XHRidW5kbGUucnVuKHdlYnBhY2tFcnJvckhhbmRsZXIpO1xuXG5cdFx0YnVuZGxlLmhvb2tzLmRvbmUudGFwKFwiRG9uZU1lc3NhZ2VcIiwgYXN5bmMgKHN0YXRzKSA9PiB7XG5cdFx0XHRzdGVwLnN0b3A/LigpO1xuXG5cdFx0XHRpZiAoaXNEZXYpIHtcblx0XHRcdFx0c3RlcC50cmlnZ2VyKFwid2FpdGluZ1wiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGNoYWxrLmdyZWVuKFwi4pyTIENvbXBpbGF0aW9uIGNvbXBsZXRlZCwgeW91IGFyZSByZWFkeSB0byBnbyFcIikpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcbn07XG5cbnN0YXJ0KCk7XG4iXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJjYWNoZWRNb2R1bGUiLCJ1bmRlZmluZWQiLCJfX3dlYnBhY2tfbW9kdWxlc19fIiwibiIsImdldHRlciIsIl9fZXNNb2R1bGUiLCJkIiwiYSIsImRlZmluaXRpb24iLCJrZXkiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0Iiwib2JqIiwicHJvcCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsInRyaWdnZXJTdGVwIiwic3RlcCIsInN0b3AiLCJzdGFydCIsImxvYWRpbmciLCJnZXRTdGVwTWVzc2FnZSIsImNsZWFyT25FbmQiLCJzcGlubmVyIiwiY3VycmVudCIsInRlcm1pbmF0ZVN0ZXAiLCJ0cmlnZ2VyIiwidGVybWluYXRlIiwicHJvY2VzcyIsImFyZ3YiLCJjcFN5bmMiLCJyZXNvbHZlIiwiY3dkIiwicmVjdXJzaXZlIiwiY2hkaXIiLCJzcGF3blN5bmMiLCJzdGRpbyIsInN0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCJleGl0IiwiZXJyb3IiLCJXUF9IT1NUIiwiZW52IiwiRXJyb3IiLCJpc1NlcnZlIiwiaXNEZXYiLCJjb25maWd1cmF0aW9uIiwibW9kZSIsImRldnRvb2wiLCJydWxlcyIsInRlc3QiLCJ1c2UiLCJsb2FkZXIiLCJvcHRpb25zIiwidHJhbnNwaWxlT25seSIsImV4Y2x1ZGUiLCJ0eXBlIiwiZ2VuZXJhdG9yIiwiZmlsZW5hbWUiLCJleHRlbnNpb25zIiwibW9kdWxlcyIsImFsaWFzIiwicGx1Z2lucyIsIlRzY29uZmlnUGF0aHNQbHVnaW4iLCJjb25maWdGaWxlIiwiRGVmaW5lUGx1Z2luIiwiTU9ERSIsIkpTT04iLCJzdHJpbmdpZnkiLCJQUk9KRUNUIiwiQ09SRV9XUCIsIm91dHB1dCIsInB1YmxpY1BhdGgiLCJvcHRpbWl6YXRpb24iLCJzcGxpdENodW5rcyIsImNhY2hlR3JvdXBzIiwic3R5bGVzIiwibmFtZSIsImNodW5rcyIsImVuZm9yY2UiLCJ3ZWJwYWNrRXJyb3JIYW5kbGVyIiwiZXJyIiwic3RhdHMiLCJoYXNFcnJvcnMiLCJidW5kbGUiLCJ3ZWJwYWNrIiwibWVyZ2UiLCJ0YXJnZXQiLCJlbnRyeSIsIm1haW4iLCJwYXRoIiwiY2xlYW4iLCJpbmZyYXN0cnVjdHVyZUxvZ2dpbmciLCJsZXZlbCIsInNlcnZlciIsInN0YXRpYyIsImNvbXByZXNzIiwicG9ydCIsImhpc3RvcnlBcGlGYWxsYmFjayIsImNvbXBpbGVyIiwiaW5kZXgiLCJ3YXRjaCIsInJ1biIsImhvb2tzIiwiZG9uZSIsInRhcCIsImFzeW5jIiwiUHJvbWlzZSIsIl9yZXNvbHZlIiwiX3JlamVjdCIsIm91dHB1dFBhdGgiLCJjaGlsZFByb2Nlc3MiLCJzcGF3biIsInJlYWRhYmxlT3V0cHV0Iiwic3Rkb3V0Iiwib24iLCJkYXRhIiwidHJpbW1lZERhdGEiLCJ0b1N0cmluZyIsInRyaW0iLCJwdXNoIiwic3RkZXJyIiwiY29kZSIsImpvaW4iXSwic291cmNlUm9vdCI6IiJ9