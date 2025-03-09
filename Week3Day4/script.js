$(document).ready(function () {
  $("body").append(`
        <div id="popup" style="
            display: none; 
            position: fixed; 
            top: 50%; left: 50%; 
            transform: translate(-50%, -50%); 
            background: white; 
            padding: 20px; 
            box-shadow: 0 4px 8px rgba(0,0,0,0.2); 
            border-radius: 8px;
            text-align: center;
            width: 400px;
            z-index: 1000;">
            <span id="closePopup" style="
                position: absolute; 
                top: 10px; right: 15px; 
                font-size: 20px; 
                cursor: pointer;">❌</span>
            <img id="popupImage" src="" style="width: 100%; border-radius: 5px;">
            <h2 id="popupTitle"></h2>
            <p id="popupPrice"></p>
            <p id="popupDetails"></p>
        </div>
        <div id="overlay" style="
            display: none; 
            position: fixed; 
            top: 0; left: 0; 
            width: 100%; height: 100%; 
            background: rgba(0, 0, 0, 0.5); 
            z-index: 999;"></div>
    `);
  $.ajax({
    url: "books.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      let bookList = $("<div>").attr("id", "book-list").appendTo("body");

      $("body").css({
        "background-color": "#FFF5E1",
        "font-family": "Arial, sans-serif",
        margin: "20px",
        padding: "0",
        display: "flex",
        "flex-direction": "column",
        "align-items": "center",
        "justify-content": "center",
        "min-height": "100vh",
      });

      bookList.css({
        display: "grid",
        "grid-template-columns": "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "5rem",
        "justify-content": "center",
        width: "90%",
        "max-width": "1200px",
      });

      $.each(data, function (index, book) {
        let bookItem = $("<div>").addClass("book book-item").appendTo(bookList);

        bookItem.css({
          width: "220px",
          padding: "15px",
          "border-radius": "12px",
          background: "#FFF5E1",
          "box-shadow": "0 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        });

        bookItem.hover(
          function () {
            $(this).css({
              transform: "scale(1.05)",
              "box-shadow": "0 8px 16px rgba(0, 0, 0, 0.3)",
            });
          },
          function () {
            $(this).css({
              transform: "scale(1)",
              "box-shadow": "0 4px 8px rgba(0, 0, 0, 0.2)",
            });
          }
        );

        let bookImage = $("<img>")
          .attr("src", book.img)
          .attr("alt", book.title)
          .appendTo(bookItem);

        bookImage.css({
          width: "100%",
          height: "200px",
          "border-radius": "5px",
          "object-fit": "cover",
        });

        $("<h3>").text(book.title).appendTo(bookItem);
        $("<p>")
          .addClass("price")
          .html("<strong>Fiyat:</strong> " + book.price + "₺")
          .appendTo(bookItem);
        $("<p>")
          .addClass("details")
          .text(book.description)
          .hide()
          .appendTo(bookItem);

        $("h3, p").css({
          color: "#0C1844",
          "text-align": "center",
        });

        let detailsBtn = $("<button>")
          .text("Detayları Gör")
          .addClass("details-btn")
          .attr("data-index", index)
          .appendTo(bookItem);
        let buyBtn = $("<a>")
          .text("Satın Al")
          .attr("href", book.link)
          .attr("target", "_blank")
          .addClass("buy-btn")
          .appendTo(bookItem);

        detailsBtn.css({
          display: "block",
          "margin-top": "10px",
          padding: "10px",
          border: "none",
          "border-radius": "8px",
          background: "linear-gradient(135deg, #FF6969, #C80036)",
          color: "white",
          cursor: "pointer",
          "font-weight": "bold",
          "box-shadow": "0 3px 6px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.2s ease-in-out",
        });

        detailsBtn.hover(
          function () {
            $(this).css("transform", "scale(1.1)");
          },
          function () {
            $(this).css("transform", "scale(1)");
          }
        );

        buyBtn.css({
          display: "block",
          "margin-top": "10px",
          padding: "10px",
          "border-radius": "8px",
          background: "linear-gradient(135deg, #0C1844, #C80036)",
          color: "white",
          "text-align": "center",
          "text-decoration": "none",
          "font-weight": "bold",
          "box-shadow": "0 3px 6px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.2s ease-in-out",
        });

        buyBtn.hover(
          function () {
            $(this).css("transform", "scale(1.1)");
          },
          function () {
            $(this).css("transform", "scale(1)");
          }
        );

        bookItem.hover(
          function () {
            $(this).css("transform", "scale(1.05)");
          },
          function () {
            $(this).css("transform", "scale(1)");
          }
        );
      });
    },
    error: function (xhr, status, error) {
      console.error("Veri çekme hatası:", error);
    },
  });

  $(document).on("click", ".book-item", function () {
    let bookTitle = $(this).find("h3").text();
    let bookPrice = $(this).find(".price").text();
    let bookDetails = $(this).find(".details").text();
    let bookImage = $(this).find("img").attr("src");

    $("#popupTitle").text(bookTitle);
    $("#popupPrice").text(bookPrice);
    $("#popupDetails").text(bookDetails);
    $("#popupImage").attr("src", bookImage);

    $("#overlay").fadeIn();
    $("#popup").fadeIn();
  });
  $("#popup").css({
    background: "#FFF5E1",
    border: "2px solid #C80036",
    color: "#0C1844",
  });

  $("#closePopup, #overlay").on("click", function () {
    $("#popup").fadeOut();
    $("#overlay").fadeOut();
  });
});
