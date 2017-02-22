var request = require('request')

var CART_ITEMS_URL = 'https://rentoys.xyz/index.php/rest/V1/carts/mine/items'
var CART_DETAILS = "https://rentoys.xyz/index.php/rest/V1/carts/mine/"

exports.cart_items = function (access_token, callback) {
  options = {
    url: CART_ITEMS_URL,
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json'
    }
  }
  request(options, function (err, response, body) {
    if (!err){
      callback(body)
    }
  })
}
exports.retrieve_product_sku = function (data, callback) {
  var product_sku = []
  for (var i in data){
    var data_frame = data[i]
    product_sku.push(data_frame.sku)
  }
  callback(product_sku)
}

exports.cart_info_items = function (cart_details, cart_items, cart_items_mini, callback) {
  console.log(cart_items_mini)
  cart_details = JSON.parse(cart_details)
  console.log(cart_details)
  var total_price = 0
  var total_items = 0
  for (var i in cart_items.records){
    var item = cart_items.records[i]
    item.quantity = cart_items_mini[i].qty
    item.total_item_price = item.price * item.quantity
    item.total_item_price_formatted = '$' + item.total_item_price
    total_price += item.total_item_price
    total_items += item.quantity
  }
  console.log(cart_details.id)
  var json_obj = {
    id: cart_details.id,
    product_count: total_items,
    total_price: total_price,
    total_price_formatted: '$' + total_price,
    currency: 'USD',
    items: cart_items.records,
    shipping: null,
    discounts: []

  }
  callback(json_obj)
}

exports.cart_details = function (access_token, callback) {
  options = {
    url: CART_DETAILS,
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json'
    }
  }
  request(options, function (err, response, body) {
    if(!err){
      callback(body)
    }
    else{
      callback({status: 500})
    }
  })
}