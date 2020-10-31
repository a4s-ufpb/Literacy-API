import Sequelize from 'sequelize'

export let sequelize = new Sequelize(process.env.DB_DATABASE || 'literacy', process.env.DB_USER || 'postgres', process.env.DB_PASSWORD || 'postgres', {
    host: process.env.DB_HOST || 'db',
    port: '5432',
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false
})
