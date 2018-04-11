DELIMITER //
drop PROCEDURE if exists ap_getArticlesToApprove //
CREATE PROCEDURE ap_getArticlesToApprove(in _userId int, in _pageNumber int, in _pagesize int)
BEGIN

	declare _offset int default 0; 

	set _offset := (_pageNumber - 1) * _pagesize; 

	if fn_isUserAdmin(_userId) then 
		select SQL_CALC_FOUND_ROWS
			id, 
			headline, 
			body,
			isApproved,
			publishDate,
			createdAt,
			updatedAt
		from article
		where not isApproved
		limit _pagesize offset _offset;


		select found_rows() as 'rows';
	else 
		select "Only Admins can approve articles" as 'message', 
				-1 as 'errorCode'; 

	end if; 
	
 	
END //
DELIMITER ;