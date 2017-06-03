$(function(){
  $('.named').hide();
  $('a.name_group').click(function(){
    $(this).next().slideToggle('slow');
  });
});


//$(window).resize(function() {
//  if($(window).width() <= 400 )
//      {
//          alert("ok");
//          $('.avatar').after('<br>')
//      }
//});