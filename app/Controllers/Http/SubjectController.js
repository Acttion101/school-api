'use strict'
const Database = use('Database')
const Hash = use('Hash')
const Subject = use('App/Models/Subject')

function numberTypeParamValidator(number) {
    if(Number.isNaN(parseInt(number))) 
        return { error:  `param: ${number} is not support, Pleasr use number type param instead. ` }
    return {}
}
class SubjectController {
    async index(){
        const {references}=request.qs
       const extractReferences = references.split(",")

        const subject = await Subject
       .query()
       if(references && extractReferences.length)
       subject.witch(extractReferences)
       
        return { status : 200 , error : undefined, data: await subject.fetch()}
    }
    async show({request}){
        const { id } = request.body
        const subject =await Subject.find(id)

        const validatedValue = numberTypeParamValidator(id)
        if(validatedValue.error) return {status: 500, error : validatedValue.error, data : undefined}

        return{ status: 200, error : undefined, data : subject ||{} }
    }
    async showTeacher({request}){
        const{ id } =request.params
        const subject = await Database
        .table('subjects')
        .where("subject_id",id)
        .innerJoin('teachers','subject.teacher_id','teachers.teacher_id')
        .first()
        return{ status: 200, error : undefined, data : subject ||{} }
    }
    
    async store ({request}){
        const {title,teacher_id} = request.body
        
        // const subject =new Subject()
        // subject.title = title
        // subject.teacher_id= teacher_id
        // await subject.save()
        const subject = await Subject.create({title,teacher_id})
       
        return {status : 200,error : undefined , data : {subject} }
    }
    async update({request}){
        const {body,params}=request
        const {id}=params
        const {subject_id,teacher_id} = body 

        const subjectId = await Database
        .table('groups')
        .where({subject_id:id})
        .update({subject_id,teacher_id})

        const subject = await Database 
        .table('subjects')
        .where({subject_id,teacher_id:subjectId})
        .first()

        return{status : 200,error : undefined , data : { subject } }
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

module.exports = SubjectController
