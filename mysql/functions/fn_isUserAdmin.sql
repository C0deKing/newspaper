DELIMITER //
drop function if exists fn_isUserAdmin //
CREATE function fn_isUserAdmin( _userId int) returns tinyint(1)  deterministic 
BEGIN
	declare _returnValue tinyint(1) default 0; 

	select isAdmin
	into _returnValue
	from st_user 
	where id = _userId
	limit 1; 

	return ifnull(_returnValue, 0);

END //
DELIMITER ;