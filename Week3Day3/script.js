$(document).ready(function () {
  $("#showForm").click(function () {
    $("#applicationForm").fadeIn();
    $(this).fadeOut();
  });

  $("#closeForm").click(function () {
    $("#applicationForm").fadeOut();
  });

  $("#datepicker").datepicker({
    dateFormat: "dd/mm/yy",
  });

  $("input[name='phone']").mask("(999) 999-9999");

  $("#jobApplication").validate({
    rules: {
      firstName: "required",
      lastName: "required",
      email: {
        required: true,
        email: true,
      },
      phone: {
        required: true,
        minlength: 14,
      },
      date: "required",
    },
    messages: {
      firstName: "Adınızı girin",
      lastName: "Soyadınızı girin",
      email: "Geçerli bir e-posta girin",
      phone: "Geçerli bir telefon numarası girin",
      date: "Lütfen bir tarih seçin",
    },
    submitHandler: function (form) {
      $("#applicationForm").fadeOut();
      $("#successMessage").fadeIn().delay(3000).fadeOut();
      form.reset();
    },
  });
});
