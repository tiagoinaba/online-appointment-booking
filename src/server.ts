import { createServer } from "http";
import { parse } from 'url';
import next from 'next';

const app = next({ dev: true })
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url!, true);
        handle(req, res, parsedUrl);
    }).listen(3000);

    console.log('hello')
})