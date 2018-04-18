DELIMITER //
drop PROCEDURE if exists ap_getPublishedArticle //
CREATE PROCEDURE ap_getPublishedArticle(in _id int)
BEGIN
	 
	update article
		set views = views + 1
	where id = _id
	limit 1;

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
		s3Key,
		featured
	from article
	where isApproved
	and id = _id
	order by featured desc, sequence asc, publishDate desc
	limit 1;	
 	
END //
DELIMITER ;