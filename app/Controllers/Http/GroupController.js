'use strict'
const Database = use('Database')
const Hash = use('Hash')
const Validator = use('Validator')
function numberTypeParamValidator(number) {
    if(Number.isNaN(parseInt(number))) 
        return { error:  `param: ${number} is not support, Pleasr use number type param instead. ` }
    return {}
}
class GroupController {
    async index(){
        const data = await Database.table('groups')
        return { status : 200 , error : undefined, data : group}
    }
    async show({request}){
        const { id } = request.params
        const validatedValue = numberTypeParamValidator(id)
        if(validatedValue.error) return {status: 500, error : validatedValue.error, data : undefined}
        const student = await Database
        .select('*')
        .from('groups')
        .where("group_id",id)
        .first()
        return{ status: 200, error : undefined, data : group ||{} }
    }
    async store ({request}){
        const {group_id,name} = request.body

        const rules ={
            name:'required',
            
        }
        const missingKeys=[]
        if(!group_id) missingKeys.push('name')
        if(!name) missingKeys.push('name')
       
        if(missingKeys.length)
            return {status: 422, error:`${missingKeys} is missing.`, data:undefined}

        
        const hashedPassword = await Hash.make(password)
        const group = await Database
        .table('groups')
        .insert({group_id,name})
        return {status : 200,error : undefined , data : {group_id,name} }
    }
    async update({request}){
        const {body,params}=request
        const {id}=params
        const {group_id,name} = body 

        const groupId = await Database
        .table('groups')
        .where({group_id:id})
        .update({name})

        const group = await Database 
        .table('groups')
        .where({group_id:groupId})
        .first()

        return{status : 200,error : undefined , data : { group} }
    }

    async destroy({request}){
        const{id}=request.params

        await Database
        .table('sgroups')
        .where({group_id:id})
        .delete()

        return {status : 200,error : undefined , data : {massage : 'success'} }
    }
}

module.exports = GroupController
