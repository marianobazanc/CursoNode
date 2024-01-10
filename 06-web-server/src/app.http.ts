import { readFileSync } from "fs"
import http from "http"

const server = http.createServer((req, res) => {
    console.log(req.url)
    
    // res.writeHead(200, {'Content-Type': 'text/html'})
    // res.write('<a href="https://www.marianobazan.com" target="_blank">Click aqui</a>')
    
    // const data = {name: 'John Doe', age: '30', city: 'San Fernando del Valle de Catamarca'}
    // res.writeHead(200, {'Content-Type': 'application/json'})
    
    if(req.url === '/'){
        const htmlFile = readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(htmlFile)
        return
    }

    if(req.url?.endsWith('.js')){
        res.writeHead(200, {'Content-Type': 'application/javascript'})
    } else if(req.url?.endsWith('.css')){
        res.writeHead(200, {'Content-Type': 'text/css'})
    }

    const responseContent = readFileSync(`./public${req.url}`, 'utf-8')
    res.end(responseContent)
})

server.listen(8080, () => {
    console.log("Server is running on te port 8080")
})