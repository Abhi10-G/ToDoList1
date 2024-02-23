import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const db=new pg.Client(
    {
        connectionString:"postgres://nctttbyw:3f4EwKwgBJIfgw_bY74P-QMV201npTZ0@arjuna.db.elephantsql.com/nctttbyw",
        password:"3f4EwKwgBJIfgw_bY74P-QMV201npTZ0",
        user:'nctttbyw',
        
    }
)
db.connect()

const server=express();
server.use(bodyParser.urlencoded({extended: false}))

server.get("/",async(req,res)=>
{
    const dbtodo=await db.query("SELECT * FROM public.todo ORDER BY id ASC ")
    res.render("index.ejs",{todos: dbtodo.rows})
}
)
server.post("/add", async (req, res) => {
    const todo = req.body.todo
    await db.query(`INSERT INTO todo (task) VALUES ('${todo}')`)
    res.redirect('/')
  })

  server.post("/delete", async (req, res) => {
    const id = req.body.todo
    await db.query(`DELETE FROM todo WHERE id = ${id}`);
    res.redirect('/');
});

server.listen(3000,()=>
{
    console.log("Server Started");
})
