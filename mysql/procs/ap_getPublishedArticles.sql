DELIMITER //
drop PROCEDURE if exists ap_getPublishedArticles //
CREATE PROCEDURE ap_getPublishedArticles(in _pageNumber int, in _pagesize int)
BEGIN

	declare _offset int default 0; 

	set _offset := (_pageNumber - 1) * _pagesize; 

	 
	select SQL_CALC_FOUND_ROWS
		id, 
		headline, 
		body,
		isApproved,
		publishDate,
		createdAt,
		updatedAt,
		addLink1, 
		addLink2,
		addLink3,
		s3Key
	from article
	where isApproved
	limit _pagesize offset _offset;


	select found_rows() as 'rows';
	
 	
END //
DELIMITER ;