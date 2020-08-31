'use strict'
const Database = use('Database')
const Hash = use('Hash')
class EnrollmentController {
    async index(){
        const data = await Database.table('enrollments')
        return { status : 200 , error : undefined, data : Enrollment}
    }
    async show({request}){
        const { id } = request.params
        const validatedValue = numberTypeParamValidator(id)
        if(validatedValue.error) return {status: 500, error : validatedValue.error, data : undefined}
        const enrollment = await Database
        .select('*')
        .from('enrollments')
        .where("enrollment_id",id)
        .first()
        return{ status: 200, error : undefined, data : Enrollment ||{} }
    }
    async store ({request}){
        const {enrollment_id,mark,mark_date,update_at} = request.body
        const missingKeys=[]
        if(!enrollment_id) missingKeys.push('mark')
        if(!mark) missingKeys.push('mark')
        if(mark_date) missingKeys.push('mark')
        if(update_at) missingKeys.push('mark')
       
        if(missingKeys.length)
            return {status: 422, error:`${missingKeys} is missing.`, data:undefined}

        
        const hashedPassword = await Hash.make(password)
        const enrollment = await Database
        .table('enrollments')
        .insert({enrollment_id,mark,mark_date,update_at})
        return {status : 200,error : undefined , data : {enrollment_id,mark,mark_date,update_at} }
    }
}

module.exports = EnrollmentController

