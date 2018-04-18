DELIMITER //
drop PROCEDURE if exists upgrade_script //
CREATE PROCEDURE upgrade_script()
main: BEGIN
  declare _scriptName varchar(255) default "20180417_1";

  if _scriptName = lower("SCRIPT_TEMPLATE") or exists(select * from database_version where scriptName = _scriptName) then 
  	leave main; -- Make sure no script runs more than once
  end if; 

  /*
  Making a table
	 CREATE TABLE if not exists table 
	(
		id integer NOT NULL AUTO_INCREMENT, 		
        createdAt datetime,
        PRIMARY KEY (id)
	)
 ENGINE=InnoDB;

  */


  /* Do Script work HERE    */
  alter table article add column views integer unsigned not null default 0;

  /* End Script work */


  insert into database_version(scriptName, createdAt)
  values(_scriptName, now()); -- log it

END main //
DELIMITER ;

call upgrade_script();