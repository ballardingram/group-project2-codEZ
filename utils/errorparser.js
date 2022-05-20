const errorParser = (error)=> {
return error.errors[0].message;
}

module.exports = errorParser;

