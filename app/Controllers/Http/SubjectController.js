'use strict'
const Database = use('Database')
const Hash = use('Hash')
function numberTypeParamValidator(number) {
    if(Number.isNaN(parseInt(number))) 
        return { error:  `param: ${number} is not support, Pleasr use number type param instead. ` }
    return {}
}
class SubjectController {
    async index(){
        const data = await Database.table('subjects')
        return { status : 200 , error : undefined, data : subject}
    }
    async show({request}){
        const { id } = request.params
        const validatedValue = numberTypeParamValidator(id)
        if(validatedValue.error) return {status: 500, error : validatedValue.error, data : undefined}
        const student = await Database
        .select('*')
        .from('subjects,teachers.teacher_id')
        .where("subject_id",id)
        .first()
        return{ status: 200, error : undefined, data : subject ||{} }
    }
    async store ({request}){
        const {title,teacher_id} = request.body
        const missingKeys=[]
        if(!title) missingKeys.push('title')
        if(!teacher_id) missingKeys.push('title')
       
        if(missingKeys.length)
            return {status: 422, error:`${missingKeys} is missing.`, data:undefined}

        
        const hashedPassword = await Hash.make(password)
        const title = await Database
        .table('subjects')
        .insert({title,teacher_id})
        return {status : 200,error : undefined , data : {title,teacher_id} }
    }
}

module.exports = SubjectController
