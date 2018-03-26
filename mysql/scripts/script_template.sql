DELIMITER //
drop PROCEDURE if exists upgrade_script //
CREATE PROCEDURE upgrade_script()
main: BEGIN
  declare _scriptName varchar(255) default "script_template";

  if _scriptName = lower("SCRIPT_TEMPLATE") or exists(select * from database_version where scriptName = _scriptName) then 
  	leave main; -- Make sure no script runs more than once
  end if; 

  


  /* Do Script work HERE    */


  /* End Script work */


  insert into database_version(scriptName, createdAt)
  values(_scriptName, now()); -- log it

END main //
DELIMITER ;

call upgrade_script();