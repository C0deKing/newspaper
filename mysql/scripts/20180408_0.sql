DELIMITER //
drop PROCEDURE if exists upgrade_script //
CREATE PROCEDURE upgrade_script()
main: BEGIN
  declare _scriptName varchar(255) default "20180408_0";

  if _scriptName = lower("SCRIPT_TEMPLATE") or exists(select * from database_version where scriptName = _scriptName) then 
  	leave main; -- Make sure no script runs more than once
  end if; 

  


  /* Do Script work HERE    */
  CREATE TABLE if not exists st_user 
	(
		id integer NOT NULL AUTO_INCREMENT, 
		username varchar(255) not null default "", 
		password text, 
		firstName varchar(255) not null default "", 
		lastName varchar(255) not null default "",
		isEditor tinyint(1) not null default 0, 
		isAdmin tinyint(1) not null default 0, 
		isApproved tinyint(1) not null default 0,
        createdAt datetime,
        PRIMARY KEY (id)
	)
 ENGINE=InnoDB;

  /* End Script work */


  insert into database_version(scriptName, createdAt)
  values(_scriptName, now()); -- log it

END main //
DELIMITER ;

call upgrade_script();