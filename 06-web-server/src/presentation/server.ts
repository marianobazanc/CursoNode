import express, { Router } from "express"
// import path from "path"

interface Options {
    PORT: number
    router: Router
    PUBLIC_PATH?: string
}

export class Server {

    private app = express()
    private readonly port: number
    private readonly publicPath: string
    private readonly routes: Router

    constructor(options: Options) {
        const { PORT, PUBLIC_PATH = 'public', router } = options
        this.port = PORT
        this.publicPath = PUBLIC_PATH
        this.routes = router
    }

    async start() {

        //Middlewares
        this.app.use(express.json())

        //Public folder
        // this.app.use(express.static(this.publicPath))
        // this.app.get('*', (req, res) => {
        //     const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)
        //     res.sendFile(indexPath)
        // })

        //Routes
        this.app.use(this.routes)

        //Up server
        this.app.listen(this.port, () => {
            console.log("Server running.", this.port)
        })

    }
}