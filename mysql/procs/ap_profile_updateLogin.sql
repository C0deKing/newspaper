DELIMITER //
drop PROCEDURE if exists ap_profile_updateLogin //
CREATE PROCEDURE ap_profile_updateLogin(in _userId int, in _selectedUserId int, in _username varchar(255), 
                    in _password text)
main: BEGIN
  declare _message varchar(255) default ""; 
  declare _errorCode int default 0;

  if _userId <> _selectedUserId or not fn_isUserAdmin(_userId) then 
    set _message := "You Must be an admin to change someone else's profile";
    set _errorCode := -1;

  elseif _password is null or _password = "" or _username is null or _username = "" then 
    set _message := "Please provide a valid username and password"; 
    set _errorCode := -2;
  elseif exists(select * from st_user where username like _username) then 
    set _message := "User with this username already exists";
    set _errorCode := -3;
  else
    update st_user
      set username = _username, 
        password = MD5(_password)
    where id = _selectedUserId
    limit 1; 

    set _message := "User Updated"; 
    set _errorCode := 1;

  end if; 

  select _message as 'message', _errorCode as 'errorcode';


END main //
DELIMITER ;