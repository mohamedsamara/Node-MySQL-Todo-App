$(document).ready(function() {
  $("input[name='is_completed']").change(function() {
    var id = $(this).attr('id');
    var is_completed;

    if ($(this).is(':checked')) {
      is_completed = 1;
    } else {
      is_completed = 0;
    }

    $.ajax({
      type: 'POST',
      url: '/todos/complete/' + id,
      data: {
        is_completed: is_completed
      },
      success: function(response) {
        alert('Todo status changed!');
      },
      error: function(err) {
        console.log(err);
      }
    });
  });
});
