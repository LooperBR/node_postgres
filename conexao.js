const { Pool, Client } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'biblioteca',
    password: 'bcard',
    port: 5432,
})

const conexao = (query)=>{
    return new Promise((resolve,reject)=>{
        pool.query(query, (err, res) => {
            if(err){
                return reject(err)
            }

            return resolve(res)
        })
    })
}

module.exports = conexao