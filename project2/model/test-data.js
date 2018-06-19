exports.config = function() {  
  return {
    "name": "products",
    "name_single": "product",
    "fields": [
      {
        "label": "name",
        "type": "text",
        "required": "true",
        "maxlength": "30"
      },
      {
        "label": "description",
        "type": "text",
        "required": "true",
        "maxlength": "50"
      },
      {
        "label": "price",
        "type": "number",
        "required": "true",
        "maxlength": "30"
      }
    ]
  };
}();