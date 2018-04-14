module.exports = {
  host: "smp-dev.czlhf4fdxrw2.us-east-1.rds.amazonaws.com",
  port: '3306',
  user: "newspaper",
  password: "F7UL42z4fkrp3YNw",
  database: "newspaper",
  typeCast: function castField( field, useDefaultTypeCasting ) {       
  	if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {
    	var bytes = field.buffer();            
        return( bytes[ 0 ] === 1 );
    }
    return( useDefaultTypeCasting() );

  },
  jwt_secret: "keyboardcat",
  acquireTimeout: 1000000000
};