DELIMITER //
drop PROCEDURE if exists ap_updateArticle //
CREATE PROCEDURE ap_updateArticle(in _userId int, in _articleId int, in _headline text, 
                    in _body text, in _addLink1 text, in _addLink2 text, in _addLink3 text, 
                    in _s3Key text, in _sequence int)
main: BEGIN
  declare _message varchar(255) default ""; 
  declare _errorCode int default 0;


  if fn_isUserEditor(_userId) then
    if _articleId <= 0 then 
      insert into article(userId, headline, body, createdAt, updatedAt, addLink1, addLink2, addLink3, s3Key, sequence)
      values(_userId, _headline, _body, now(), now(), _addLink1, _addLink2, _addLink3, _s3Key, _sequence); 

      set _errorCode := 1;
      set _message := "Article Created";
    else
      update article
        set headline = _headline, 
            body = _body,
            addLink1 = _addLink1, 
            addLink2 = _addLink2, 
            addLink3 = _addLink3,
            updatedAt = now(), 
            s3Key = _s3Key, 
            sequence = if(_sequence = 0, sequence, _sequence)
      where id = _articleId
      limit 1; 

      set _errorCode := 2; 
      set _message := "Article Updated";
    end if; 
  else
    set _message := "Only editors and admins can edit articles";
    set _errorCode := -1;
  end if; 


  select _errorCode as 'errorCode', _message as 'message';

END main //
DELIMITER ;