# Debug Notları

Öncelikle siteyi açıp deneyerek başladım. Ürün ekledim eklerken stok azalıyor mu baktım. Ardından ürünü sildim ve silme fonksiyonu çalışıyor mu diye baktım. Silme fonksiyonu çalışıyordu fakat 2 ürün de silsem 1 ürün ekliyordu stoğa. Aynı üründen 2 tane eklediğimde total de değişmiyordu ama farklı ürünlerden 1'er tane ekleme yapıldığı takdirde artma oluyordu. Bunları gözlemledikten sonra ilgili yerlere debug attım.

## 1. Hata: Stok Değeri Azalmıyor  
Ürün sepete eklenirken stok azalmıyordu. addItem fonksiyonun içine debugger ekledim ve tüm kod bloğunu nextleyerek kontrol ettiğimde scope kısmında hiç stock değişmediğini fark ettim. Çünkü `product.stock -= quantity;` eksikti.

## 2. Hata: Stokta 1 Ürün Olduğunda Sepete Ekleyememe
Stok problemi çözdükten sonra tekrar kodu kontrol ettiğimde product.stock <= quantity kısmındaki hatayı fark ettim. Bu satıra gelindiğinde scope kısmında hata mesajı gördüm. < kullanılmadığından 1 tane olunca sepete eklenemiyordu.

## 3. Hata: removeItem
Burada ben 2 ürün de sepetten çıkarsam stok 1 artıyordu. removeItem içerisine debugger atıp nextleyerek scope kısmını takip ettim. İlerlediğimde "product.stock += 1;" kısmının scope da çıktısını görünce sorunu bulmuş oldum.

## 4. Hata: Total
Total'de sıkıntı olduğundan nereden kaynaklı olduğunu bulmak için fonksiyonun içine debugger attım. Daha sonra nextlediğimde scopeta ve "return sum + item.price;" kodunun yanında totalin değişmediğini görünce bu kısımdaki  quantity çarpanının eksiklğini fark ettim.