const Validator = use('Validator')
module.exports = async function teacherValidator(firat_name , last_name,email,password){
    const rules ={
        first_name:'required',
        last_name:'required',
        email:'required|email|unique:teachers,email',
        password:'required|min:8'
    }
        const validation = await Validator.validateAll({firat_name , last_name,email,password},rules)
return {
    error: validation.messages()
}
}
