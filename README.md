## Deskripsi Aplikasi

### Aplikasi ini adalah sebuah implemntasi dari referensi [game](https://neal.fun/password-game/) dimana game tersebut mengharuskan penggunanya untuk membuat sebuah password yang sesuai dengan rules rules yang ada. Setiap rules akan bermunculan secara sekuensial apabila rules sebelumnya sudah terpenuhi. Total terdapat 20 rules yang unik dan menarik, ayo coba mainkan!

<<<<<<< Updated upstream
``Teknologi, Bahasa, dan Framework yang Digunakan``

```Bahasa Pemrograman: JavaScript, HTML,CSS```
=======
## Teknologi, Bahasa, dan Framework yang Digunakan

 ```bash
Bahasa Pemrograman: JavaScript, HTML,CSS
>>>>>>> Stashed changes
Framework Frontend: React.js
Framework Backend: Express.js
Database: MongoDB
Alat Pengelolaan Paket: npm
<<<<<<< Updated upstream
=======
```
>>>>>>> Stashed changes

## Struktur Program
```bash
/backend: Direktori utama untuk kode sumber backend aplikasi yang mengatur data dari database.
/src: Direktori utama untuk kode sumber frontend aplikasi.
/src/components: Komponen React untuk UI pengguna berupa tampilan untuk pemilihan mode game, rules, dan pemilihan huruf terlarang.
/src/pages: Halaman utama dari game dan juga halaman untuk result dari permainan, algoritma dari permainan secara kesuluruhan berada di homepage.
/utils: Fungsi utilitas berupa algoritma identifikasi password sesuai rules yang ada.
/public: Berisi file statis seperti index.html dan aset lainnya.
```


## Algoritma Regex (Regular Expression)
```bash
Regex (Regular Expression) adalah algoritma yang digunakan untuk pencocokan dan manipulasi string berdasarkan pola tertentu. Dalam konteks aplikasi ini, regex digunakan untuk menemukan dan mengganti substring dalam string berdasarkan pola tertentu.
Alasan Penggunaan:
Efisiensi: Regex adalah alat yang sangat efisien untuk pencocokan pola dan manipulasi string, terutama ketika pola yang dicari memiliki struktur tetap dan bisa diatur dinamis.
Fleksibilitas: Dengan menggunakan regex, kamu dapat dengan mudah menyesuaikan pola pencarian dan penggantian sesuai kebutuhan aplikasi. Regex memungkinkan pencarian dan penggantian yang kompleks dalam satu baris kode.
```

## Cara menjalankan program
```bash
1. Clone Repository ini
```
```bash
2. npm install
```
```bash
3. npm run start
```

## Screenshot
![StartGame](image-2.png)
![WINNING](image-1.png)
![GAME OVER](image.png)


## Study References
[MongoDB](https://www.mongodb.com/docs/)
[Image Saving in Database](https://www.mongodb.com/community/forums/t/how-to-save-an-image-in-mongodb-and-use-it-later-in-my-html/243643/2)
[MUI](https://mui.com)
[PostMan](https://learning.postman.com/docs/introduction/overview/)
