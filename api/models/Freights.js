/**
 * Freights.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    frId: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    pieces: {
      type: 'number'
    },
    weight: {
      type: 'number'
    },
    length: {
      type: 'number'
    },
    width: {
      type: 'number'
    },
    height: {
      type: 'number'
    },
    cube: {
      type: 'number'
    },
    density: {
      type: 'string'
    },
    hazmatUN: {
      type: 'string'
    },
    nmfc: {
      type: 'string'
    },
    handlingUnit: {
      type: 'string'
    },
    classType: {
      type: 'string'
    },
    huCount: {
      type: 'string'
    },
    contactPhone: {
      type: 'string'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    cubeUnit: {
      model: 'dropdownMapper',
    },
    weightUnit: {
      model: 'dropdownMapper',
    },
    lengthUnit: {
      model: 'dropdownMapper',
    },
    hazClass: {
      model: 'dropdownMapper',
    },
    packingGroup: {
      model: 'dropdownMapper',
    },
    product: {
      model: 'products'
    },
    quote: {
      model: 'quotes'
    },
    order: {
      model: 'orders'
    }

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

