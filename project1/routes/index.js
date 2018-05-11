var express = require('express');
var router = express.Router();
var state = require('../controllers/state_controller');

router.get('/', function(req, res) {
  var result = state.list();
  result.then( function(doc) {
    res.render('pages/list', { title: 'PIB e População dos Estados Brasileiros', data: doc });
  })
  .catch( (err) => {
    console.log(err);
  });
});

router.get('/new', function(req, res) {
  var result = state.list();
  result.then( function(data) {
    res.render('pages/new', { title: 'Adicionar estado', data: data });
  })
  .catch( (err) => {
    console.log(err);
  });
});

router.post('/create', function(req, res) {
  var error = state.create(req.body || {});
  res.redirect('/');
});

router.get('/show/:id', function(req, res) {
  var result = state.read(req.params.id);
  result.then( function(doc) {
    res.render('pages/show', { title: 'Detalhes do estado', data: doc });
  });
});

router.get('/delete/:id', function(req, res) {
  var error = state.delete(req.params.id);
  res.redirect('/');
});

router.get('/edit/:id', function(req, res) {
  var result = state.read(req.params.id);
  result.then( function(doc) {
    res.render('pages/edit',
      { title: 'Editar estado', data: doc }
    );
  });
});

router.post('/update/:id', function(req, res) {
  var error = state.update(req.params.id, req.body || {});
  res.redirect('/');
});

module.exports = router;
