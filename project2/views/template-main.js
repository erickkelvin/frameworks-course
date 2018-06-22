const { capitalize } = require('../utils');

exports.build = function(title, content, link) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>${capitalize(title)}</title>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/solid.css" integrity="sha384-Rw5qeepMFvJVEZdSo1nDQD5B6wX0m7c5Z/pLNvjkB14W6Yki1hKbSEQaX9ffUbWe" crossorigin="anonymous">
        <link rel="stylesheet" href="/assets/style.css" />
      </head>
      <body>
        <div class="title">
          <h1>${capitalize(title)}</h1>
          ${link ? `<a href='${link[1]}'>${link[0]}</a>` : ''}
        </div>
        <div id="content">
          ${content}
        </div>
      </body>
    </html>`;
};