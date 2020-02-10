$(function(){
  var reloadMessages = function() {
    last_message_id = $('.chat-main__message-list__a-message:last').data("message-id");
    
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(_i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      console.log('error');
    });
  };
  function buildHTML(message){
    if ( message.content && message.image ){
      var html = `<div class="chat-main__message-list__a-message" data-message-id=` + message.id + `>` +
          `<div class="chat-main__message-list__a-message__user-info">` +
            `<div class="chat-main__message-list__a-message__user-info__user-name">` +
              message.user_name +
            `</div>` +
            `<div class="chat-main__message-list__a-message__user-info__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="chat-main__message-list__a-message__message">` +
            `<p class="chat-main__message-list__a-message__message__content">` +
              message.content +
            `</p>` +
            `<img src="` + message.image + `" class="chat-main__message-list__a-message__message__image" >` +
          `</div>` +
        `</div>`
    } else if (message.content){
      var html = `<div class="chat-main__message-list__a-message" data-message-id=` + message.id + `>` +
          `<div class="chat-main__message-list__a-message__user-info">` +
            `<div class="chat-main__message-list__a-message__user-info__user-name">` +
              message.user_name +
            `</div>` +
            `<div class="chat-main__message-list__a-message__user-info__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="chat-main__message-list__a-message__message">` +
            `<p class="chat-main__message-list__a-message__message__content">` +
              message.content +
            `</p>` +
          `</div>` +
        `</div>`
    } else if (message.image){
      var html = `<div class="chat-main__message-list__a-message" data-message-id=` + message.id + `>` +
          `<div class="chat-main__message-list__a-message__user-info">` +
            `<div class="chat-main__message-list__a-message__user-info__user-name">` +
              message.user_name +
            `</div>` +
            `<div class="chat-main__message-list__a-message__user-info__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="chat-main__message-list__a-message__message">` +
            `<img src="` + message.image + `" class="chat-main__message-list__a-message__message__image" >` +
          `</div>` +
        `</div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('#new_message')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function() {
      $('.chat-main__message-form__send-btn').prop('disabled', false);
    });
  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});