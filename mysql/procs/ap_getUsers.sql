DELIMITER //
drop PROCEDURE if exists ap_getUsers //
CREATE PROCEDURE ap_getUsers(in _userId int, in _pageNumber int, 
						in _pagesize int)
BEGIN

	declare _offset int default 0; 

	set _offset := (_pageNumber - 1) * _pagesize; 

	if fn_isUserAdmin(_userId) then 
		select SQL_CALC_FOUND_ROWS
			id, 
			username, 
			firstName, 
			lastName, 
			isAdmin,
			isEditor
		from st_user
		limit _pagesize offset _offset;


		select found_rows() as 'rows';
	else 
		select "Only Admins can view other users" as 'message', 
				-1 as 'errorCode'; 

	end if; 

	

 	
END //
DELIMITER ;