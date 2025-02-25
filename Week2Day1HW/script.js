let userName = prompt("Adınız nedir?");
let age = Number(prompt("Yaşınız kaç?")); 
let job = prompt("Mesleğiniz nedir?");

let userInfo = { userName, age, job };

console.log("Kullanıcı Bilgileri:", JSON.stringify(userInfo, null, 2));

let cart = [];

function addToCart() {
    while (true) {
        let productName = prompt("Sepete eklemek istediğiniz ürünü yazın:");
        
        if (!productName || productName.length <= 1) {
            console.log("Geçersiz ürün adı! Sepete ekleme işlemi tamamlandı.");
            break;
        }

        let price = Number(prompt("Ürün fiyatı:"));
        if (!isNaN(price) && price > 0) {
            cart.push({ productName, price });
            console.log(`${productName} ürünü sepete eklendi. Fiyat: ${price}₺`);
        } else {
            console.log("Geçersiz fiyat! Lütfen tekrar deneyin.");
        }
    }
}

function showCart() {
    if (cart.length === 0) {
        console.log("Sepetiniz boş.");
        return;
    }

    console.log("Sepetiniz: ", JSON.stringify(cart, null, 2));

    let total = cart.reduce((sum, item) => sum + item.price, 0);
    console.log(`Toplam Fiyat: ${total}₺`);
}

function removeFromCart() {
    if (cart.length === 0) {
        console.log("Sepetinizde ürün bulunmamaktadır.");
        return;
    }

    showCart();

    while (true) {
        let input = prompt("Silmek istediğiniz ürünün adını girin (Çıkmak için boş bırakın):");

        if (!input) {
            console.log("Silme işlemi sona erdi.");
            break; 
        }

        let index = cart.findIndex(item => item.productName.toLowerCase() === input.toLowerCase());

        if (index !== -1) {
            let removedItem = cart.splice(index, 1);
            console.log(`${removedItem[0].productName} sepetten çıkarıldı.`);
            showCart();
        } else {
            console.log("Ürün bulunamadı! Lütfen ismi doğru girdiğinizden emin olun.");
        }

        if (cart.length === 0) {
            console.log("Sepetiniz boş. Silme işlemi sona erdi.");
            break;
        }
    }
}

addToCart();
removeFromCart();
showCart();