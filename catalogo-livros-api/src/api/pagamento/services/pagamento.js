'use strict';

/**
 * pagamento service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pagamento.pagamento');
