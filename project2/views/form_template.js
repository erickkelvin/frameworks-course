const fieldTemplate = require('../views/field_template');

exports.build = function(id, fieldsConfig, values) {
  console.log(values);
  let fields = '';
  fieldsConfig.forEach(function(fieldConfig) {
    fields += fieldTemplate.build(fieldConfig, values);
  });

  return `<div class='form-page'>
            <form method='post' action='${id ? `/update/${id}` : '/create'}'>
              ${fields}
              <div class='form-actions'>
                <input type='reset' value='Clear'>
                <input type='submit' value='Save'>
              </div>
            </form>
          </div>`;
};