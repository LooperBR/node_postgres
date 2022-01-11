import express, { json } from 'express';
import { selectAll, select, insert, update, deleteLivro } from './livro_model';
import { selectAll as _selectAll, select as _select, insert as _insert, update as _update, deleteGenero } from './genero_model';

const app = express();

app.use(json());

// Livros

app.get('/livros',(req,res)=>{

    selectAll()
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

    select(req.params.id)
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
    insert(req.body)
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
    update(req.params.id,req.body)
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
    deleteLivro(req.params.id)
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

app.get('/generos', (req, res) => {

    _selectAll()
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

app.get('/generos/:id', (req, res) => {

    _select(req.params.id)
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

app.post('/generos', (req, res) => {
    _insert(req.body)
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

app.put('/generos/:id', (req, res) => {
    _update(req.params.id, req.body)
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

app.delete('/generos/:id', (req, res) => {
    deleteGenero(req.params.id)
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
