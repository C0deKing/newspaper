DELIMITER //
drop PROCEDURE if exists ap_getPublishedArticle //
CREATE PROCEDURE ap_getPublishedArticle(in _id int)
BEGIN
	 
	select
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
	and id = _id
	limit 1;	
 	
END //
DELIMITER ;