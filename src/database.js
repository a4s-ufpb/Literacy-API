import Sequelize from 'sequelize'

// export let sequelize = new Sequelize('literacy_db', null, null, {
//     host: 'localhost',
//     dialect: 'sqlite',
//     storage: './data.sqlite'
// })

export let sequelize = new Sequelize('literacy', process.env.DB_USER || 'postgres', process.env.DB_PASSWORD || '8HdQy7vkai6B34', {
    host: 'db',
    port: '5432',
    dialect: 'postgres',
    operatorsAliases: false
});
