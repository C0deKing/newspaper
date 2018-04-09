DELIMITER //
drop PROCEDURE if exists ap_registerUser //
CREATE PROCEDURE ap_registerUser(in _username varchar(255), in _password varchar(255))
main: BEGIN
  declare _message varchar(255) default ""; 
  declare _errorCode int default 0;
  declare _userId int default 0;
    
  if _username is null or _username = "" or _password is null or _password = "" then 
    set _message := "You Must Provide a username and password";
    set _errorCode := -2;

  elseif exists(select * from st_user where username like _username) then 
  	set _message := "User with this username already exists";
  	set _errorCode := -1;
  else
  	insert into st_user(username, password, isApproved, isAdmin)
  	values(_username, MD5(_password), 1, 0);
    set _errorCode := 1;
  	set _userId := last_insert_id();
    set _message := "Success";
  end if; 

  select _message as 'message', _errorCode as 'code', _userId as 'userId'; 

END main //
DELIMITER ;