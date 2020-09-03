'use strict'

const { test } = use('Test/Suite')('Teacher Validator')
const teacherValidator = require('../../service/TeacherValidator')
  
test('should return error when pass incorrec Data' , async({assert} )=> {
 const  ValidatedData = await teacherValidator("john","doe",'jonds email',"12345")
assert.isArray( ValidatedData.error)
})

test('should return  more than error if multpule incorrect dataa is passed',async({assert})=> {
 const ValidatedData = await teacherValidator("john","doe",'jonds@gamil.com',"12345")
 assert.isAbove(ValidatedData.error.length,1)
})

test('should return undefind when pass correact data',async({assert})=>{
const  validatedData = await teacherValidator({
    first_name:"john",
        last_name:"doe",
        email:"jonds@gamil.com",
        password:"12345678"
}) 
assert.equal(validatedData.error , undefined)
})
