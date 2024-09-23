import type { Schema, Attribute } from '@strapi/strapi';

export interface CartaoCartao extends Schema.Component {
  collectionName: 'components_cartao_cartaos';
  info: {
    displayName: 'cartao';
  };
  attributes: {
    number: Attribute.String;
    cvv: Attribute.String;
    valid: Attribute.String;
    name: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'cartao.cartao': CartaoCartao;
    }
  }
}
