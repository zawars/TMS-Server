/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },


  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/

  'POST /api/v1/auth/login': 'AuthController.login',
  'POST /api/v1/auth/verify': 'AuthController.verify',
  'POST /api/v1/auth/verify/resend': 'AuthController.resendToken',
  'POST /api/v1/auth/forget': 'AuthController.forgetPassword',
  'POST /api/v1/auth/forget/verify': 'AuthController.forgetVerify',
  'POST /api/v1/auth/password/renew': 'AuthController.renewPassword',
  'GET /api/v1/auth/logout': 'AuthController.logout',

  'POST /api/v1/user': 'UserController.create',
  'POST /api/v1/user/sendmail': 'UserController.sendEmail',
  'GET /api/v1/user/search/:query': 'UserController.search',
  'GET /api/v1/user/lang/:id': 'UserController.fetchLanguage',

  'GET /api/v1/tradingPartners/:type': 'TradingPartnersController.partnersByType',

  'POST /api/v1/contracts': 'ContractsController.create',

  'POST /api/v1/attachments': 'AttachmentsController.create',
  'DELETE /api/v1/attachments/:id': 'AttachmentsController.delete',
};
