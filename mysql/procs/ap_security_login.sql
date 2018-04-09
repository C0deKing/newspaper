DELIMITER //
drop PROCEDURE if exists ap_security_login //
CREATE PROCEDURE ap_security_login (in _username varchar(255), in _password varchar(255))
main: BEGIN
  declare _message varchar(255) default ""; 
  declare _errorCode int default 0;
  declare _userId int default 0;
  declare _checksum varchar(255) default "";
  declare _isAdmin bit default 0; 
  declare _isEditor bit default 0; 
  declare _firstName varchar(255) default ""; 
  declare _lastName varchar(255) default ""; 


  if exists(select * from st_user where username like _username) then 
  	 select password, id, firstName, lastName, isEditor, isAdmin
     into _checksum, _userId, _firstName, _lastName, _isEditor, _isAdmin
     from st_user
     where username = _username
     limit 1; 

     if MD5(_password) = _checksum then 
        set _message = "Success";
        set _errorCode := 1;       
     else 
        set _message := "Incorrect Password";
        set _errorCode := -2;
        set _userId := 0;
     end if; 

  else
  	set _message := "User does not exist";
    set _errorCode := -1;
  end if; 

  select _message as 'message', _errorCode as 'code',
         _userId as 'userId', _isAdmin as 'isAdmin', 
         _isEditor as 'isEditor', _firstName as 'firstName', 
         _lastName as 'lastName'; 

END main //
DELIMITER ;