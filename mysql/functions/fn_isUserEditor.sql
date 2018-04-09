DELIMITER //
drop function if exists fn_isUserEditor //
CREATE function fn_isUserEditor( _userId int) returns tinyint(1)  deterministic 
BEGIN
	declare _returnValue tinyint(1) default 0; 

	select (isAdmin or isEditor)
	into _returnValue
	from st_user 
	where id = _userId
	limit 1; 

	return ifnull(_returnValue, 0);

END //
DELIMITER ;