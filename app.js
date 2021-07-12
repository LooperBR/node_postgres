const express = require('express');
const livro_model = require('./livro_model')

const app = express();

app.use(express.json());

// Livros

app.get('/livros',(req,res)=>{

    livro_model.selectAll()
    .then(
        (ret)=>{
            console.log(ret)
            res.send(ret);
        },
        (err)=>{
            console.log(err);
            res.status(404).send('Falha interna');
        }
    )

})

app.get('/livros/:id', (req, res) => {

    livro_model.select(req.params.id)
        .then(
            (ret) => {
                console.log(ret)
                res.send(ret);
            },
            (err) => {
                console.log(err);
                res.status(404).send('Falha interna');
            }
        )

})

app.post('/livros',(req,res)=>{
    livro_model.insert(req.body)
    .then(
        (ret)=>{
            console.log(ret)
            res.send(ret);
        },
        (err)=>{
            console.log('err');
            console.log(err);
            res.status(400).send(err);
        }
    )
})

app.put('/livros/:id', (req, res) => {
    livro_model.update(req.params.id,req.body)
        .then(
            (ret) => {
                console.log(ret)
                res.send(ret);
            },
            (err) => {
                console.log('err');
                console.log(err);
                res.status(400).send(err);
            }
        )
})

app.delete('/livros/:id', (req, res) => {
    livro_model.deleteLivro(req.params.id)
        .then(
            (ret) => {
                console.log(ret)
                res.send(ret);
            },
            (err) => {
                console.log('err');
                console.log(err);
                res.status(400).send(err);
            }
        )
})

app.listen(3000,()=>{
    console.log('Listening on 3000')
})
