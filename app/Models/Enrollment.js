'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Enrollment extends Model {
    static get primaryKey(){
        return 'enrollment'
    }
    static get createdAtColumn(){
        return null ;
    }
    static get updatedAtColumn(){
        return null ;
    }
    student(){
        return this.belongsTo('App/Models/Student')
    }
    subject(){
        return this.belongsTo('App/Models/Ssubject')
    }
}

module.exports = Enrollment
