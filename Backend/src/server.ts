import express from "express" 
import routes from "./routes"


const app = express()

app.use(express.json())

 app.use(routes)

const PORT = process.env.LOCAL_PORT || 3000

app.listen(PORT,()=>console.log(`servidor rodando corretamente na porta ${PORT} `))