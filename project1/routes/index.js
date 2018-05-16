var express = require('express');
var router = express.Router();
var state = require('../controllers/state_controller');

router.get('/', function(req, res) {
  var result = state.list();
  result.then((doc) => {
    res.render('pages/home', { title: 'Home', data: doc });
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get('/list', function(req, res) {
  var result = state.list();
  result.then((doc) => {
    res.render('pages/list', { title: 'PIB e População dos Estados Brasileiros', data: doc });
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get('/show/:id', function(req, res) {
  var result = state.read(req.params.id);
  result.then((doc) => {
    res.render('pages/show', { title: 'Detalhes do estado', data: doc });
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get('/new', function(req, res) {
  res.render('pages/new', { title: 'Adicionar estado' });
});

router.get('/edit/:id', function(req, res) {
  var result = state.read(req.params.id);
  result.then((doc) => {
    res.render('pages/edit', { title: 'Editar estado', data: doc });
  })
  .catch((err) => {
    console.log(err);
  });
});

router.post('/create', function(req, res) {
  var result = state.create(req.body || {},
    () => {
      res.redirect('/');
    },
    (err) => {
      console.log(err);
      res.redirect('/');
    }
  );
});

router.post('/update/:id', function(req, res) {
  var result = state.update(req.params.id, req.body || {},
    () => {
      res.redirect('/');
    },
    (err) => {
      console.log(err);
      res.redirect('/');
    }
  );
});

router.get('/delete/:id', function(req, res) {
  var result = state.delete(req.params.id,
    () => {
      res.redirect('/');
    },
    (err) => {
      console.log(err);
      res.redirect('/');
    }
  );
});

module.exports = router;
