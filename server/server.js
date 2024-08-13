import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app= express()
app.use(cors())
app.use(express.json())
const db= mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: 'crud'
})

app.get('/', (request,response)=>{
    const sql = "SELECT * FROM modul"
    db.query(sql,(error,result)=>{
        if(error) return response.json({Message : "Error inside server"})
            return response.json(result)
    })
})
app.post('/modul',(request,response)=>{
    const sql= "INSERT INTO modul (`Keys`,`TR`,`EN`) VALUES (?)"
    const values =[
        request.body.Keys,
        request.body.TR,
        request.body.EN
    ]
    db.query(sql,[values],(error,result)=>{
        if(error) return response.json(error)
            return response.json(result)
    })
})

app.get('/read/:id',(request,response)=>{
    const sql= "SELECT * FROM modul WHERE ID = ? "
    const id= request.params.id
    db.query(sql,[id],(error,result)=>{
        if(error) return response.json({Message : "Error inside server"})
            return response.json(result)
    })
})
app.put('/edit/:id',(request,response)=>{
    const sql= "UPDATE modul SET `Keys`=?, `TR`=?, `EN`=? WHERE ID=? "
    const id= request.params.id
    db.query(sql,[request.body.Keys, request.body.TR, request.body.EN, id],(error,result)=>{
        if(error) return response.json({Message : "Error inside server"})
            return response.json(result)
    })
})
app.delete('/delete/:id',(request,response)=>{
    const sql=" DELETE FROM modul WHERE ID=?"
    const id= request.params.id
    db.query(sql,[id],(error,result)=>{
        if(error) return response.json({Message : "Error inside server"})
            return response.json(result)
    })
})

app.listen(8081,()=>{
    console.log("listening")
}) 
    