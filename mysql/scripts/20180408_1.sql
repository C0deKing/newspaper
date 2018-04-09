DELIMITER //
drop PROCEDURE if exists upgrade_script //
CREATE PROCEDURE upgrade_script()
main: BEGIN
  declare _scriptName varchar(255) default "20180408_1";

  if _scriptName = lower("SCRIPT_TEMPLATE") or exists(select * from database_version where scriptName = _scriptName) then 
  	leave main; -- Make sure no script runs more than once
  end if; 

  


  /* Do Script work HERE    */

   CREATE TABLE if not exists article 
	(
		id integer unsigned NOT NULL AUTO_INCREMENT, 	
		userId integer unsigned not null default 0,
		headline text, 
		body longtext,  
		isApproved tinyint(1) not null default 0,
		isDeleted tinyint(1) not null default 0, 
		publishDate date, 
		updatedAt datetime, 
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