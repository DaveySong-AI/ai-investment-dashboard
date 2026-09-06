import fs from "node:fs";import path from "node:path";
const root=process.cwd(),read=p=>JSON.parse(fs.readFileSync(path.join(root,p),"utf8"));
const required=["date","headline","summary","regime","markets","drivers","sources"];
const idx=read("data/daily/index.json");
for(const date of idx.dates){const d=read(`data/daily/${date}.json`);for(const key of required)if(!(key in d))throw Error(`${date}: missing ${key}`);if(d.date!==date)throw Error(`${date}: date mismatch`);if(!fs.existsSync(path.join(root,`reports/${date}.md`)))throw Error(`${date}: missing Markdown report`)}
const latest=read("data/daily/latest.json");if(latest.date!==idx.latest)throw Error("latest.json and index.json disagree");
const stocks=read("data/stocks/index.json"),must=["AAPL","GOOGL","MSFT","0700.HK","9992.HK"];for(const t of must)if(!stocks.some(s=>s.ticker===t))throw Error(`missing core stock ${t}`);
const memory=read("data/memory/latest.json"),reads=read("data/reads/latest.json");
for(const key of ["asOf","instrument","signals","map","indexView","watch","risks"])if(!(key in memory))throw Error(`memory: missing ${key}`);
if(!memory.instrument.url)throw Error("memory: missing fund URL");
if(!Array.isArray(reads.items)||!reads.items.every(x=>x.url&&x.title&&x.summary))throw Error("reads: invalid item");
console.log(`Validated ${idx.dates.length} reports, ${stocks.length} stocks, memory research and ${reads.items.length} reading links.`);
