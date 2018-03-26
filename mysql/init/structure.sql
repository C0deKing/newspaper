CREATE TABLE if not exists database_version 
	(
		id integer NOT NULL AUTO_INCREMENT, 
		scriptName varchar(255) not null default "", 
        createdAt datetime,
        PRIMARY KEY (id)
	)
 ENGINE=InnoDB;


CREATE TABLE if not exists log 
	(
		id integer NOT NULL AUTO_INCREMENT, 
		message longtext, 
        createdAt datetime,
        PRIMARY KEY (id)
	)
 ENGINE=InnoDB;


 