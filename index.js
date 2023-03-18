const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
const PORT = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.post('/filtro', function (req, res) {
    // separar los parametro
    const { body } = req
    // validamos que es un arreglo
    if (!Array.isArray(body)) {
        res.status(401).send({
            message: 'No es un arreglo'
        })
    }
    var repetidos=[];
    var generico = [];
    const dominiosTriple = ['xx']
    // recorremos el areglo
    for (let index = 0; index < body.length; index++) {
        // desestructura y obtener el nombre de dominio
        const desestructurar =body[index].url.split("/").reverse()[0];
        const domi = desestructurar.split(".").reverse()[0];
        const termina = desestructurar.split(".").reverse()[1];
        // variable comun
        let evaluar =''
        // validar .co y .xx
        const sitiosX = dominiosTriple.indexOf(domi)
        evaluar =`${termina}.${domi}`
        
        if(sitiosX !== -1){
            // tercer data
            const tercer = desestructurar.split(".").reverse()[2];
            evaluar = `${tercer}.${termina}.${domi}`
        }
        
        // obtenemos el ultimo valor de repetido
        const x = repetidos.length
        // buscamos el valor
        const valorAgregar = repetidos.indexOf(evaluar)
        //const valorAgregar = repetidos.find(e=> e.url= body[index].url)
        // si no esta se agrega
        if(valorAgregar === -1){
            repetidos.push(evaluar)
            generico.push({url:evaluar, contador:1})
        }else {
            // se deben agregar 
            const agregarBien= generico.find(e=> e.url=== evaluar)
            agregarBien.contador =agregarBien.contador +1
            //generico.push({url:body[index].url, contador:contador + 1})
        }

    }
    let response =[]
    for (let index = 0; index < generico.length; index++) {
        response.push(`${generico[index].url} (${generico[index].contador})`)
        
    }
    // contar veces repetida
    // obtener domino

    res.send(response)
})


app.listen(PORT, () => { console.log(PORT); })