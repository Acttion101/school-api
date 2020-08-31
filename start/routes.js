'use strict'
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.group(()=>{
  // api start here
  Route.get('/teachers','TeacherController.index')
  Route.get('/teachers/:id','TeacherController.show')
  Route.post('teachers','TeacherController.store')

  Route.get('/students','StudentController.index')
  Route.get('/students/:id','StuentController.show')
  Route.post('tstudents','StuentController.store')

  Route.get('/subjects','subjectController.index')
  Route.get('/subjects/:id','subjectController.show')
  Route.post('subjects','subjectController.store')

  Route.get('/groups','GroupController.index')
  Route.get('/groups/:id','GroupController.show')
  Route.post('groups','GroupController.store')

  Route.get('/Enrollments','EnrollmentController.index')
  Route.get('/Enrollments/:id','EnrollmentController.show')
  Route.post('Enrollments','EnrollmentController.store')

}).prefix('api/v1')