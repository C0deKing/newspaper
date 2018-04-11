DELIMITER //
drop PROCEDURE if exists ap_getUser //
CREATE PROCEDURE ap_getUser(in _userId int)
BEGIN

	
	select id, username, firstName, lastName, isEditor, isAdmin, isApproved
	from st_user
	where id = _userId
	limit 1;

	

 	
END //
DELIMITER ;