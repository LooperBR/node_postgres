const Joi = require('joi')
const conexao = require('./conexao')

function validateGenero(genero) {
    return new Promise(async(resolve,reject)=>{

        const schema = Joi.object({

            genero: Joi.string().required(),

        });

        return resolve(schema.validate(genero))
    })
    
}

var selectAll = ()=>{
    return new Promise(async(resolve,reject)=>{
        const query = {
            text: 'SELECT * FROM genero'
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
            text : 'SELECT * FROM genero WHERE id_genero = $1',
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

var insert = (genero) => {
    return new Promise(async (resolve, reject) => {
        try {
            const validate = await validateGenero(genero)
        
            if (validate.error) {
                console.log(validate)
                return reject(validate.error.details[0].message)
            }

            var text = [] //'nome,id_genero) VALUES($1,$2)'
            var text2 = []
            var values = []
            var i = 1

            for (var key in genero) {
                if (genero.hasOwnProperty(key)) {
                    text.push(key)
                    text2.push('$' + i)
                    values.push(genero[key])
                    i++
                }
            }
            const query = {
                text: 'INSERT INTO genero(' + text.join() + ') VALUES (' + text2.join() + ') RETURNING *',
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

var update = (id, genero) => {
    return new Promise( async (resolve, reject) => {
        try {
            const validate = await validateGenero(genero)
        
            if (validate.error) {
                console.log(validate)
                return reject(validate.error.details[0].message)
            }


            const query2 = {
                text: 'SELECT * FROM genero WHERE id_genero = $1',
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

            for (var key in genero) {
                if (genero.hasOwnProperty(key)) {
                    text.push(key + '= $' + i)
                    values.push(genero[key])
                    i++
                }
            }

            values.push(id)

            const query = {
                text: 'UPDATE genero SET ' + text.join() + ' WHERE ID_genero = $' + i + ' RETURNING *',
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

var deleteGenero = (id) => {
    return new Promise(async(resolve, reject) => {

        const query2 = {
            text: 'SELECT * FROM genero WHERE id_genero = $1',
            values: [id]
        }
        try{
            const retorno2 = await conexao(query2)
            if (retorno2.rows.length <= 0) {
                console.log("nao achou");
                return reject("id não encontrado")
            }

            const query3 = {
                text: 'SELECT * FROM livro WHERE id_genero = $1',
                values: [id]
            }

            const retorno3 = await conexao(query3)
            if (retorno3.rows.length > 0) {
                console.log("livro atrelados");
                return reject("existem livros com esse genero - não foi deletado")
            }

            const query = {
                text: 'DELETE FROM genero WHERE id_genero = $1 RETURNING *',
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

var deleteAllGenero = (id) => {
    return new Promise(async (resolve, reject) => {

        const query2 = {
            text: 'SELECT * FROM genero WHERE id_genero = $1',
            values: [id]
        }
        try {
            const retorno2 = await conexao(query2)
            if (retorno2.rows.length <= 0) {
                console.log("nao achou");
                return reject("genero não encontrado")
            }


            const query = {
                text: 'DELETE FROM genero WHERE id_genero = $1 RETURNING *',
                values: [id]
            }

            const retorno = await conexao(query)
            console.log(JSON.stringify(retorno.rows))
            return resolve(JSON.stringify(retorno.rows))
        }
        catch (e) {
            console.log(e);
            return reject(Error(e))
        }

    })
}

module.exports.selectAll = selectAll;
module.exports.select = select;
module.exports.insert = insert;
module.exports.update = update;
module.exports.deleteGenero = deleteGenero;
module.exports.deleteAllGenero = deleteAllGenero;