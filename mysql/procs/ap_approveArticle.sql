DELIMITER //
drop PROCEDURE if exists ap_approveArticle //
CREATE PROCEDURE ap_approveArticle(in _userId int, in _articleId int, in _isApproved tinyint(1))
main: BEGIN
  declare _message varchar(255) default ""; 
  declare _errorCode int default 0;

  if not fn_isUserAdmin(_userId) then 
    set _message := "You Must be an admin to approve an article";
    set _errorCode := -1;


  else
    update article
      set isApproved = _isApproved, 
          publishDate = if(_isApproved, now(), null)
    where id = _articleId limit 1;

    set _message := "Article Approved"; 
    set _errorCode := 1;

  end if; 

  select _message as 'message', _errorCode as 'errorcode';


END main //
DELIMITER ;