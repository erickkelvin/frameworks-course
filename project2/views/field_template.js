const { capitalize } = require('../utils');

exports.build = function(fieldConfig, values) {
  return `
    <div class='form-field'>
      <label>${capitalize(fieldConfig.label)} ${fieldConfig.type == 'money' ? (`(${fieldConfig.currency})` || '($)') : ''}</label>
      <input
        name='${fieldConfig.label}'
        class='${fieldConfig.label}'
        type='${fieldConfig.type == 'money' ? 'number' : (fieldConfig.type || 'text')}'
        ${fieldConfig.maxlength ? `maxlength='${fieldConfig.maxlength}'` : ''}
        ${fieldConfig.type == 'money' ? 'step=0.01' : ''}
        ${fieldConfig.type == 'money' ? 'min=0' : ''}
        ${fieldConfig.required ? 'required' : ''}
        value='${values ? values[`${fieldConfig.label}`] : ''}'
      >
    </div>`;
};