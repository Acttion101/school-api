'use strict'
const Database = use('Database')
const Hash = use('Hash')
const Validator = use('Validator')
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
        const rules ={
           mark:'required',
            mark_date:'required',
           update:'required',
            
        }
        const hashedPassword = await Hash.make(password)
        const enrollment = await Database
        .table('enrollments')
        .insert({enrollment_id,mark,mark_date,update_at})
        return {status : 200,error : undefined , data : {enrollment_id,mark,mark_date,update_at} }
    }
    async update({request}){
        const {body,params}=request
        const {id}=params
        const {mark,mark_date,update_at,subject_id,student_id} = body 

        const enrollmentId = await Database
        .table('enrollments')
        .where({enrollment_id:id})
        .update({mark,mark_date,update_at,subject_id,student_id})

        const enrollment = await Database 
        .table('enrollments')
        .where({mark,mark_date,update_at,subject_id,student_id:subjectId})
        .first()

        return{status : 200,error : undefined , data : { enrollment } }
    }

    async destroy({request}){
        const{id}=request.params

        await Database
        .table('subjects')
        .where({subject_id,teacher_id:id})
        .delete()

        return {status : 200,error : undefined , data : {massage : 'success'} }
    }
}

module.exports = EnrollmentController

