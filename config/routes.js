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

  // Auth
  'POST /api/v1/auth/login': 'AuthController.login',
  'POST /api/v1/auth/verify': 'AuthController.verify',
  'POST /api/v1/auth/verify/resend': 'AuthController.resendToken',
  'POST /api/v1/auth/forget': 'AuthController.forgetPassword',
  'POST /api/v1/auth/forget/verify': 'AuthController.forgetVerify',
  'POST /api/v1/auth/password/renew': 'AuthController.renewPassword',
  'GET /api/v1/auth/logout': 'AuthController.logout',

  // User
  // 'POST /api/v1/user': 'UserController.create',
  'POST /api/v1/user/sendmail': 'UserController.sendEmail',
  'GET /api/v1/user/search/:query': 'UserController.search',
  'GET /api/v1/user/lang/:id': 'UserController.fetchLanguage',

  // Trading Partners
  'GET /api/v1/tradingPartners/type/:type': 'TradingPartnersController.partnersByType',
  'POST /api/v1/tradingPartners': 'TradingPartnersController.create',
  'PATCH /api/v1/tradingPartners/:id': 'TradingPartnersController.update',
  'GET /api/v1/tradingPartners/search/:type/:query': 'TradingPartnersController.search',

  // Contracts
  'POST /api/v1/contracts': 'ContractsController.create',

  // RateSheets
  'POST /api/v1/rateSheets/batch/get': 'RateSheetsController.getBatchRateSheets',
  'POST /api/v1/rateSheets/batch/create': 'RateSheetsController.createBatchRateSheets',
  'GET /api/v1/rateSheets/contract/:id': 'RateSheetsController.getRateSheetsBycontract',

  // Rates
  'POST /api/v1/rates/search/': 'RatesController.searchRates',

  // Attachments
  'POST /api/v1/attachments': 'AttachmentsController.create',
  'DELETE /api/v1/attachments/:id': 'AttachmentsController.delete',

  // Translation Api
  'GET /api/v1/translation': 'TranslationController.index',
  'POST /api/v1/translation': 'TranslationController.create',
  'PATCH /api/v1/translation': 'TranslationController.update',
  'POST /api/v1/translation/delete': 'TranslationController.delete',

  // Dropdowns
  'GET  /api/v1/dropdown': 'DropdownController.index',
  'PATCH  /api/v1/dropdown/:id': 'DropdownController.update',
  'POST  /api/v1/dropdownMapper/position': 'DropdownMapperController.positionSort',
  'POST  /api/v1/dropdownMapper': 'DropdownMapperController.create',
  'GET  /api/v1/dropdownMapper/:id': 'DropdownMapperController.show',
  'DELETE  /api/v1/dropdownMapper/:id': 'DropdownMapperController.delete',
  'PATCH  /api/v1/dropdownMapper/:id': 'DropdownMapperController.update',

  // DropdownMapperChild
  'GET /api/v1/dropdownMapper/search/city/:query': 'DropdownMapperChildController.searchCity',
  'GET /api/v1/dropdownMapper/search/postalCode/:query': 'DropdownMapperChildController.searchPostalCode',

  // Orders
  'GET /api/v1/getOrderByCustomer/:status/:id': 'OrdersController.getOrderByCustomer',
  'GET /api/v1/orders/vendor/:id': 'OrdersController.getVendorOrders',

  // Quotes
  'GET /api/v1/getQuotesByCustomer/:id': 'QuotesController.getQuotesByCustomer',

  // Markup
  'POST /api/v1/markup': 'MarkupController.create',
  'PATCH /api/v1/markup/:id': 'MarkupController.update',

  // Shipment Tracking
  'POST /api/v1/shipmentTracking': 'ShipmentTrackingController.create',
};
