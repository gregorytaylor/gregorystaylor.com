//
// server
//

const express = require('express');
const gzipStatic = require('connect-gzip-static');
const app = express();

app.use((req, res, next) => {
	// console.dir(req.headers);
	next();
})

// app.use(express.static('./dist/', {
// 	setHeaders: (res, path, stat) => {

// 	}
// }));

app.use(gzipStatic('./docs', {
	setHeaders: (res, path, stat) => {
	}
}));
app.listen(3000);