'use strict'
const Database = use('Database')
const Hash = use('Hash')
const Subject = use('App/Models/Subject')
const Validator = use('Validator')

function numberTypeParamValidator(number) {
    if(Number.isNaN(parseInt(number))) 
        return { error:  `param: ${number} is not support, Pleasr use number type param instead. ` }
    return {}
}
class SubjectController {
    async index({ request }) {
        const { references = undefined } = request.qs
    
        const subjects = Subject.query()
    
        if (references) {
          const extractedReferences = references.split(",")
          subjects.with(extractedReferences)
        }
    
        return { status: 200, error: undefined, data: await subjects.fetch() }
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
        const { title, teacher_id } = request.body
         const subject = await Subject.create({ title, teacher_id })
        const rules ={
            title:'required',
        }
        const validattion = await Validator.validateAll(request.body,rules)
        if(validattion.fails())
            return { status: 422 ,error:validattion.messages(),data:undefined}
            const subject = await Database
            .table('subjects')
            .insert({title,teacher_id})
       
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
