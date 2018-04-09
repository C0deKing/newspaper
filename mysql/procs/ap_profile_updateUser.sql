DELIMITER //
drop PROCEDURE if exists ap_profile_updateUser //
CREATE PROCEDURE ap_profile_updateUser(in _userId int, in _selectedUserId int, in _firstName varchar(255), 
                    in _lastName varchar(255), in _isApproved tinyint(1), in _isEditor tinyint(1), 
                    in _isAdmin tinyint(1))
main: BEGIN
  declare _message varchar(255) default ""; 
  declare _errorCode int default 0;

  if _userId <> _selectedUserId and not fn_isUserAdmin(_userId) then 
    set _message := "You Must be an admin to change someone else's profile";
    set _errorCode := -1;


  else
    update st_user
      set firstName = ifnull(_firstName, firstName), 
        lastName = ifnull(_lastName, lastName), 
        isApproved = _isApproved, 
        isEditor = _isEditor,
        isAdmin = _isAdmin
    where id = _selectedUserId
    limit 1; 

    set _message := "User Updated"; 
    set _errorCode := 1;

  end if; 

  select _message as 'message', _errorCode as 'errorcode';


END main //
DELIMITER ;