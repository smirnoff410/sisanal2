$(function(){
  $('.named').hide();
  $('a.name_group').click(function(){
    $(this).next().slideToggle('slow');
  });
});
