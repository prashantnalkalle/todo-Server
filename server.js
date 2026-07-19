const express= require('express')
const cors = require('cors')
const PORT = 3000

const app =express()

app.use(cors({
    origin : ['http://127.0.0.1:5500','http://localhost:3000'],
    methods :['GET','POST',"PUT","PATCH",'DELETE']
}))

app.listen(PORT)

let todos =[
     {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
  {
    "userId": 1,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
  },
  {
    "userId": 1,
    "id": 4,
    "title": "et porro tempora",
    "completed": true
  },
  {
    "userId": 1,
    "id": 5,
    "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    "completed": false
  },
  {
    "userId": 1,
    "id": 6,
    "title": "qui ullam ratione quibusdam voluptatem quia omnis",
    "completed": false
  },
  {
    "userId": 1,
    "id": 7,
    "title": "illo expedita consequatur quia in",
    "completed": false
  },
  {
    "userId": 1,
    "id": 8,
    "title": "quo adipisci enim quam ut ab",
    "completed": true
  },
  {
    "userId": 1,
    "id": 9,
    "title": "molestiae perspiciatis ipsa",
    "completed": false
  },
  {
    "userId": 1,
    "id": 10,
    "title": "illo est ratione doloremque quia maiores aut",
    "completed": true
  }
]

app.use(express.json())

app.get('/todos',(req,res)=>{
    try{

        res.status(200).json({
            success : true,
            data : todos
        })

    }
    catch(err){
        res.status(500).json({
            success : false,
            message : 'Something Went Wrong',
        })
    }
})

app.get('/todos/:id',(req,res)=>{
    try{
        let id = Number(req.params.id)
        let todo = todos.find(ele => ele.id == id)
        if(!todo){
            return res.status(404).json({
                success : false,
                message :'NOT Found'
            })
        }

        res.status(200).json({
            success : true,
            data : todo
        })
        
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : 'something went wrong'
        })
    }
})


app.post('/todos',(req,res)=>{
    try{
        let {title,completed,userId} = req.body

        if(!title){
           return res.status(404).json({
                success : false,
                message : "Title is Missing!"
            })
        }

        let newObj = {
            title : title,
            completed : completed,
            userId : userId,
            id : Date.now().toString()
        }

        todos.unshift(newObj)

        res.status(201).json({
            success : true,
            data : newObj,
            message : `The New Todo Item with Id ${newObj.id} Is Added Successfully`
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : 'something went wrong'
        })
    }
})

app.put('/todos/:id',(req,res)=>{
    try{
        let id = Number(req.params.id)
        let {title,completed,userId} = req.body

        if(!title){
            return res.status(404).json({
                success : false,
                message  : `Title is not available`
            })
        }
        let getindex = todos.findIndex(ele => ele.id ==id)
        if(getindex === -1){
            return res.status(404).json({
                success : false,
                message : `The Todo Item With Id ${id} Is Not Found`
            })
        }

        let udpateObj ={
            title : title,
            completed : completed,
            userId : userId,
            id : id 
        }

        todos[getindex] = udpateObj

        res.status(200).json({
            success : true,
            data : udpateObj,
            message : `The Todo Item With Id ${id} Is Updated Successfully`
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : "Something Went Wrong"
        })
    }
})
app.delete('/todos/:id',(req,res) =>{
    try{
        let id = Number(req.params.id)
        let getindex = todos.findIndex(ele => ele.id == id)
        if(getindex == -1){
            return res.status(404).json({
                success : false,
                message : `The Todo Item with Id ${id} Is not Found`
            })
        }
        let removeObj = todos.splice(getindex,1)
        res.status(200).json({
            success : true,
            message : `The Todo Item With Id ${id} is Removed Successfully`,
            data : removeObj
        })
    }
    catch(err){
        return res.status(500).json({
            success : true,
            message : 'Something Went Wrong'
        })
    }
})

