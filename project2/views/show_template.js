const { capitalize } = require('../utils');

exports.build = function(itemData, fieldsConfig) {
  let items = '';

  fieldsConfig.forEach(field => {
    items += `<div class='show-title'>${capitalize(field.label)}:</div><div class='show-value'>${itemData[field.label]}</div>`;
  });

  return items;
};