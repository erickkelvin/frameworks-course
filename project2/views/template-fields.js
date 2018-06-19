const { capitalize } = require('../utils');

exports.build = function(fieldsConfig, values) {
  let fields = "";

  fieldsConfig.forEach(function(fieldConfig) {
    const newField = `
      <div class='form-field'>
        <label>${capitalize(fieldConfig.label)}</label>
        <input
          name='${fieldConfig.label}'
          class='${fieldConfig.label}'
          type='${fieldConfig.type || 'text'}'
          ${fieldConfig.maxlength ? `maxlength='${fieldConfig.maxlength}'` : ''}
          ${fieldConfig.required ? 'required' : ''}
          value='${values ? values[`${fieldConfig.label}`] : ''}'
        >
      </div>`;
    fields += newField;
  });

  return fields;
};