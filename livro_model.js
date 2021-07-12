const Joi = require('joi')
const conexao = require('./conexao')

function validateLivro(livro) {
    return new Promise(async(resolve,reject)=>{
        const query = {
            text: 'SELECT DISTINCT id_genero FROM genero ORDER BY id_genero'
        }
        try{
            const retorno = await conexao(query)
            // console.log(JSON.stringify(res.rows))
            // return resolve(JSON.stringify(res.rows))
            const generos = []
            console.log(retorno.rows)
            retorno.rows.forEach(element => {
                generos.push(element.id_genero)
            });

            const schema = Joi.object({

                nome: Joi.string().required(),

                id_genero: Joi.number().valid(...generos).required()

            });

            return resolve(schema.validate(livro))
        }catch(e){
            console.log(e);
            return reject(Error(e))
        }
    })
    
}

var selectAll = ()=>{
    return new Promise(async(resolve,reject)=>{
        const query = {
            text: 'SELECT * FROM livro'
        }
        try{
            const retorno = await conexao(query)
            console.log(JSON.stringify(retorno.rows))
            return resolve(JSON.stringify(retorno.rows))
        }
        catch(e){
            return reject(Error(e))
        }

        

    })
}

var select = (id) => {
    return new Promise(async(resolve, reject) => {
        const query = {
            text : 'SELECT * FROM livro WHERE id_livro = $1',
            values :[id]
        }
        try{
            const retorno = await conexao(query)
            console.log(JSON.stringify(retorno.rows))
            return resolve(JSON.stringify(retorno.rows))
        }catch(e){
            return reject(Error(e))
        }
    })
}

var insert = (livro) => {
    return new Promise(async (resolve, reject) => {
        try {
            const validate = await validateLivro(livro)
        
            if (validate.error) {
                console.log(validate)
                return reject(validate.error.details[0].message)
            }

            var text = [] //'nome,id_genero) VALUES($1,$2)'
            var text2 = []
            var values = []
            var i = 1

            for (var key in livro) {
                if (livro.hasOwnProperty(key)) {
                    text.push(key)
                    text2.push('$' + i)
                    values.push(livro[key])
                    i++
                }
            }
            const query = {
                text: 'INSERT INTO livro(' + text.join() + ') VALUES (' + text2.join() + ') RETURNING *',
                values: values
            }

            const retorno = await conexao(query)
            console.log(JSON.stringify(retorno.rows))
            return resolve(JSON.stringify(retorno.rows))
            
        }
        catch(e){
            return reject(e)
        }

        
    })
}

var update = (id,livro) => {
    return new Promise( async (resolve, reject) => {
        try {
            const validate = await validateLivro(livro)
        
            if (validate.error) {
                console.log(validate)
                return reject(validate.error.details[0].message)
            }


            const query2 = {
                text: 'SELECT * FROM livro WHERE id_livro = $1',
                values: [id]
            }

            const retorno2 = await conexao(query2)
            if (retorno2.rows.length <= 0) {
                console.log("nao achou");
                return reject("id não encontrado")
            }
            var text = []
            var values = []
            var i = 1

            for (var key in livro) {
                if (livro.hasOwnProperty(key)) {
                    text.push(key + '= $' + i)
                    values.push(livro[key])
                    i++
                }
            }

            values.push(id)

            const query = {
                text: 'UPDATE LIVRO SET ' + text.join() + ' WHERE ID_LIVRO = $' + i + ' RETURNING *',
                values: values
            }

            const retorno = await conexao(query)
            console.log(JSON.stringify(retorno.rows))
            return resolve(JSON.stringify(retorno.rows))
            
        }
        catch(err){
            return reject(err)
        }

        

    })
}

var deleteLivro = (id) => {
    return new Promise(async(resolve, reject) => {

        const query2 = {
            text: 'SELECT * FROM livro WHERE id_livro = $1',
            values: [id]
        }
        try{
            const retorno2 = await conexao(query2)
            if (retorno2.rows.length <= 0) {
                console.log("nao achou");
                return reject("id não encontrado")
            }

            const query = {
                text: 'DELETE FROM LIVRO WHERE id_livro = $1 RETURNING *',
                values: [id]
            }

            const retorno = await conexao(query)
            console.log(JSON.stringify(retorno.rows))
            return resolve(JSON.stringify(retorno.rows))
        }
        catch(e){
            console.log(e);
            return reject(Error(e))
        }

    })
}


//UPDATE LIVRO SET NOME = 'TESTEUPDATE' WHERE ID_LIVRO = 6 RETURNING *

module.exports.selectAll = selectAll;
module.exports.select = select;
module.exports.insert = insert;
module.exports.update = update;
module.exports.deleteLivro = deleteLivro;