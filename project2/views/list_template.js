const { capitalize } = require('../utils');

exports.build = function(data, fieldsConfig, activeSort) {
  if (data.length) {
    let tableContent = '';

    fieldsConfig.forEach(field => {
      let order = 1;
      let arrow = '';
      if (activeSort && activeSort.sortBy == field.label) {
        order = activeSort.order - (activeSort.order * 2);
        arrow = activeSort.order == 1 ? '&#xf107;' : '&#xf106;';
      }
      else {
        order = activeSort.order;
      }
      tableContent += `<th><a href='/?sortBy=${field.label}&order=${order || 1}'>${capitalize(field.label)} ${field.currency ? `(${field.currency})` : ''}</a> ${arrow}</th>`;
    });
    tableContent += '<th></th>';

    data.forEach(item => {
      let row = '';
      fieldsConfig.forEach(field => {
        row += `<td>${item[field.label]}</td>`;
      });
      tableContent +=  `<tr>
                          ${row}
                          <td>
                            <a class='action-list' href='/show/${item['_id']}'> &#xf06e;</a>
                            <a class='action-list' href='/edit/${item['_id']}'> &#xf044;</a>
                            <a class='action-list' href='/delete/${item['_id']}'> &#xf1f8;</a>
                          </td>
                        </tr>`;
    });

    return `<table>${tableContent}</table>`;
  }
  else {
    return `<p>No items found!</p>`
  }

};