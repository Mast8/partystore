module.exports = function(req, res, next) {
    const { description } = req.body;
    const letersNumbers = /^[a-zA-Z0-9\_\-]{3,100}$/;

    function validField(field) {
      return letersNumbers.test(field);
    }
  
    if (!validField(description)) {
        return res.json("Missing field");
    }

    next();
  };
  