// This part is common in all files. So it will form a common file via commonChunksPlugin.
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "font-awesome/css/font-awesome.min.css";
// import "../sass/font.scss";

// OR
// import above files in common scss file and use that single file everywhere.
import "../sass/main.scss";

// This is page specific file.
import "../sass/index.scss";

// This is common script.
import "./main.ts";
import "./contact";
import { myLogger } from "./myCommon";

console.log("this is from index");
console.log($(window));

myLogger("index data");
