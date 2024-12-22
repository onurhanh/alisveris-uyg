const urunler = [
    {
        id: 1,
        urunAdi: "Kulaklık",
        urunFiyat: 1500,
        urunStok: 200
    },
    {
        id: 2,
        urunAdi: "Klavye",
        urunFiyat: 3000,
        urunStok: 200
    },
    {
        id: 3,
        urunAdi: "Mikrofon",
        urunFiyat: 1250,
        urunStok: 150
    }
];

let bakiye = 10000;
let sepet = [];
function isAccepted(msg, ...keys) {
    const value = prompt(msg);
    if (keys.includes(value)) {
        return value;
    } else {
        alert("Hatalı tuşlama yaptınız");
        return isAccepted(msg, ...keys);
    }
}
function urunlerListesi() {
    const urunlerListesi = urunler.map(urun => `ID:${urun.id} - ${urun.urunAdi}, Fiyat: ${urun.urunFiyat}₺, Stok: ${urun.urunStok}`).join("\n");
    alert(urunlerListesi);
    return nextAction();
}
function sepetDurumu() {
    if (sepet.length === 0) {
        alert("Sepetiniz boş.");
    } else {
        const sepetListesi = sepet.map(item => `${item.urunAdi} - Fiyat: ${item.urunFiyat}₺, Miktar: ${item.miktar}`).join("\n");
        alert(sepetListesi);
    }
    return nextAction();
}
function urunSatinAl() {
    const urunlerListesi = urunler.map(urun => `ID:${urun.id} - ${urun.urunAdi}, Fiyat: ${urun.urunFiyat}₺, Stok: ${urun.urunStok}`).join("\n");
    const value = prompt(`Satın almak istediğiniz ürünün ID'sini giriniz:\nVazgeçmek istiyorsanız x yazınız\n${urunlerListesi}`);
    if (value.toLowerCase() === "x") {
        return mainMenu();
    }
    const productIndex = urunler.findIndex(urun => urun.id == value);
    if (productIndex === -1) {
        alert("Yanlış bir ID değeri girdiniz");
        return urunSatinAl();
    }
    const urun = urunler[productIndex];
    const miktar = parseInt(prompt(`Kaç adet ${urun.urunAdi} almak istiyorsunuz?`), 10);
    if (isNaN(miktar) || miktar <= 0) {
        alert("Geçersiz miktar.");
        return urunSatinAl();
    }
    if (miktar > urun.urunStok) {
        alert("Yeterli stok bulunmamaktadır.");
        return urunSatinAl();
    }
    const totalPrice = urun.urunFiyat * miktar;
    if (totalPrice > bakiye) {
        alert("Yeterli bakiyeniz bulunmamaktadır.");
        return urunSatinAl();
    }
    urun.urunStok -= miktar;
    bakiye -= totalPrice;
    const cartItem = sepet.find(item => item.id === urun.id);
    if (cartItem) {
        cartItem.miktar += miktar;
    } else {
        sepet.push({ id: urun.id, urunAdi: urun.urunAdi, urunFiyat: urun.urunFiyat, miktar });
    }
    alert("Ürün sepete eklendi.");
    return nextAction();
}
function bakiyeEkle() {
    const amount = parseFloat(prompt("Eklemek istediğiniz bakiye miktarını giriniz:"));
    if (isNaN(amount) || amount <= 0) {
        alert("Geçersiz tutar.");
        return bakiyeEkle();
    }
    bakiye += amount;
    alert(`Yeni bakiyeniz: ${bakiye}₺`);
    return nextAction();
}
function bakiyeGoster() {
    alert(`Mevcut bakiyeniz: ${bakiye}₺`);
    return nextAction();
}
function mainMenu() {
    const value = isAccepted(
        "Yapmak istediğiniz işlemi seçiniz:\n1-Ürünleri Listele\n2-Sepeti Göster\n3-Ürün Satın Al\n4-Bakiye Ekle\n5-Bakiyeyi Göster\n6-Çıkış Yap",
        "1", "2", "3", "4", "5", "6"
    );
    if (value == "1") {
        return urunlerListesi();
    } else if (value == "2") {
        return sepetDurumu();
    } else if (value == "3") {
        return urunSatinAl();
    } else if (value == "4") {
        return bakiyeEkle();
    } else if (value == "5") {
        return bakiyeGoster();
    } else if (value == "6") {
        alert("Güle güle...");
        return;
    }
}
function nextAction() {
    const value = isAccepted("Başka bir işlem yapmak ister misiniz? (e/h)", "e", "h", "E", "H");
    if (value.toLowerCase() === "e") {
        return mainMenu();
    }
    else {
        alert("Tekrar Bekleriz.");
        return;
    }
}
mainMenu();