module.exports = function(req, res, next) {
    const { product_name } = req.body;
    const letersNumbers = /^[A-Za-z ][A-Za-z0-9!@#$%^&* ]*$/;
    // const letersNumbers = /^[a-zA-Z0-9\_\-]{3,100}$/;
    

    // function validField(field) {
    //   return letersNumbers.test(field);
    // }

    
    function isEmpty(field) {
      return !field.trim().length;
    }

    if (isEmpty(product_name)) {
        return res.json("Missing field");
    }

    next();
  };
  