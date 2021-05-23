const { Sequelize, DataTypes } = require('sequelize')

const db = new Sequelize({
    dialect: 'postgres',
    database: 'urlshortener',
    username: 'urlshortener',
    password: 'urlshortener'
})

const URLs = db.define('urls',{

    id:{
        primaryKey: true,
        type: DataTypes.BIGINT
    },
    code:{
        type: DataTypes.STRING(7),
        unique:true
    },
    link:{
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = {
    db,
    URLs
}