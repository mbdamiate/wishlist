
module.exports = (route, controller, validator, validation) => {

  /**
   * @apiDefine UserCreated
   *
   * @apiSuccess (201) {UUID} id User id
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 201 Created
   *     {
   *         "id": "00000000-0000-0000-0000-000000000000"
   *     }
   */

  /**
   * @apiDefine UserUpdated
   *
   * @apiSuccess (201) {UUID} id New user id
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 201 Created
   *     {
   *         "id": "00000000-0000-0000-0000-000000000000"
   *     }
   */

  /**
  * @apiDefine UserDeleted
  *
  * @apiSuccess (201) {UUID} id Removed user id
  *
  * @apiSuccessExample {json} Success-Response:
  *     HTTP/1.1 201 Created
  *     {
  *         "id": "00000000-0000-0000-0000-000000000000"
  *     }
  */

  /**
   * @apiDefine UserFound
   *
   * @apiSuccess (200) {UUID}   id       User id
   * @apiSuccess (200) {String} email    User email
   * @apiSuccess (200) {String} fullName User full name
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *         "id": "00000000-0000-0000-0000-000000000000",
   *         "email": "user@mail.nom",
   *         "full_name": "User"
   *     }
   */

  /**
   * @apiDefine UsersFound
   *
   * @apiSuccess (200) {Object[]} users           Users list
   * @apiSuccess (200) {UUID}     users.id        User id
   * @apiSuccess (200) {String}   users.email     User email
   * @apiSuccess (200) {String}   users.fullName  User full name
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *         "users": [
   *             "id": "00000000-0000-0000-0000-000000000000",
   *             "email": "user@mail.nom",
   *             "full_name": "User"
   *         ]
   *     }
   */

  /**
   * @apiDefine UsersNotFound
   * 
   * @apiError UsersNotFound Users was not found
   * 
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 404 Not Found
   */

  /**
   * @apiDefine UserNotFound
   * 
   * @apiError UserNotFound The <code>id</code> of the User was not found
   * 
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 404 Not Found
   */

  /**
   * @apiDefine UserConflict
   * 
   * @apiError UserConflict The <code> email </code> is already in use
   * 
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 409 Conflict
   */

  /**
   * @api {get} /api/users UsersList
   * @apiDescription Returns users list
   * 
   * @apiVersion 1.0.0
   * @apiGroup User
   * 
   * @apiExample Example usage:
   * curl -i http://localhost/api/users
   * 
   * @apiUse UsersFound
   * @apiUse UsersNotFound
   */
  route.get('/',
    validation.queryValidEmail,
    validator,
    controller.find
  )

  /**
   * @api {post} /api/users UserCreate
   * @apiDescription Create user
   * 
   * @apiVersion 1.0.0
   * @apiGroup User
   * 
   * @apiExample Example usage (application/x-www-form-urlencoded):
   * curl -d "email=user@mail.nom&fullName=User" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost/api/users
   * @apiExample Example usage (application/json):
   * curl -d "{\"email\":\"user@mail.nom\",\"fullName\":\"User\"}" -H "Content-Type: application/json" -X POST http://localhost/api/users
   * 
   * @apiUse UserCreated
   * @apiUse UserConflict
   */
  route.post('/',
    validation.bodyValidEmail,
    validation.bodyValidFullName,
    validator,
    controller.create
  )

  /**
   * @api {get} /api/users/:id UserById
   * @apiDescription Returns user by id
   * 
   * @apiParam {UUID} id Users id
   * 
   * @apiVersion 1.0.0
   * @apiGroup User
   * 
   * @apiExample Example usage:
   * curl -i http://localhost/api/users/00000000-0000-0000-0000-000000000000
   * 
   * @apiUse UserFound
   * @apiUse UserNotFound
   */
  route.get('/:id',
    validation.paramValidId,
    validator,
    controller.findById
  )

  /**
   * @api {put} /api/users/:id UserUpdate
   * @apiDescription Update user
   * 
   * @apiParam {UUID} id Users id
   * 
   * @apiVersion 1.0.0
   * @apiGroup User
   * 
   * @apiExample Example usage (application/x-www-form-urlencoded):
   * curl -d "fullName=User" -H "Content-Type: application/x-www-form-urlencoded" -X PUT http://localhost/api/users/00000000-0000-0000-0000-000000000000
   * @apiExample Example usage (application/json):
   * curl -d "{\"fullName\":\"Update User\"}" -H "Content-Type: application/json" -X PUT http://localhost/api/users/00000000-0000-0000-0000-000000000000
   * 
   * @apiUse UserUpdated
   * @apiUse UserNotFound
   */
  route.put('/:id',
    validation.paramValidId,
    validator,
    controller.update
  )

  /**
   * @api {delete} /api/users/:id UserRemove
   * @apiDescription Remove user
   * 
   * @apiParam {UUID} id Users id
   * 
   * @apiVersion 1.0.0
   * @apiGroup User
   * 
   * @apiExample Example usage (application/x-www-form-urlencoded):
   * curl -d "fullName=User" -H "Content-Type: application/x-www-form-urlencoded" -X DELETE http://localhost/api/users/00000000-0000-0000-0000-000000000000
   * @apiExample Example usage (application/json):
   * curl -H "Content-Type: application/json" -X DELETE http://localhost/api/users/00000000-0000-0000-0000-000000000000
   * 
   * @apiUse UserDeleted
   * @apiUse UserNotFound
   */
  route.delete('/:id',
    validation.paramValidId,
    validator,
    controller.remove
  )

  return route

}
