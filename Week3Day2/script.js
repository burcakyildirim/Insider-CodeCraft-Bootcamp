$(document).ready(function () {
    $("#fetchProducts").click(function () {
        $.getJSON("products.json", function (data) {
            let container = $("#productContainer");
            container.empty();

            $.each(data, function (index, product) {
                let card = `
                    <div class="product-card">
                        <h3>${product.name}</h3>
                        <p>Fiyat: ${product.price}</p>
                        <a href="${product.link}" target="_blank">Ürüne Git</a>
                    </div>
                `;
                container.append(card);
            });
        }).fail(function () {
            alert("Ürünler yüklenirken bir hata oluştu!");
        });
    });
});
