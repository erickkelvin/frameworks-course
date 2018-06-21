const fieldsTemplate = require('../views/template-fields');

exports.build = function(id, config, values) {
  return `<div class='form-page'>
            <form method='post' action='${id ? `/update/${id}` : '/create'}'>
              ${fieldsTemplate.build(config, values)}
              <div class='form-actions'>
                <input type='reset' value='Clear'>
                <input type='submit' value='Save'>
              </div>
            </form>
          </div>`
};