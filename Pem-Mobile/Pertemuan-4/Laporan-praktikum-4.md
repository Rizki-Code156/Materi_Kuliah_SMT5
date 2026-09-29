# MODUL PRAKTIKUM 4: Navigasi di React Native

Langkah 1 = Menginstall Dependesi dan Library yang dibutuhkan untuk membuat Navigasi
1. Install (npm install @react-navigation/native)
![alt text](image.png)
2. Install (npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated)
![alt text](image-1.png)

Langkah 2 = Membuat Stack Navigation
1. Instalasi Pustaka Stack (npm install @react-navigation/native-stack)
![alt text](image-2.png)
2. Tambahkan Parameter navigation didalam app.js
3. Buat folder baru bernama screens di dalam root project untuk menyimpan file-file antarmuka.
4. Buat dua file baru di dalam folder screens Login.js dan Signup.js
5. Isi file screens/Login.js dengan kode dari modul.
![alt text](image-3.png)
6. Isi file screens/Signup.js dengan kode dari modul.
![alt text](image-4.png)
7. Konfigurasi Stack Navigator di App.js
![alt text](image-5.png)
8. Bukti Stack Navigator
![alt text](image-6.png)
![alt text](image-7.png)
![alt text](stack.gif)

Langkah 3 = Membuat Bottom Tab Navigation
1. Instalasi Pustaka Bottom Tabs (npm install @react-navigation/bottom-tabs)
![alt text](image-8.png)
2. Isi file screens/HomeScreen.js dengan kode dari modul.
![alt text](image-9.png)
3. Isi file screens/ProfileScreen.js dengan kode dari modul.
![alt text](image-10.png)
4. Konfigurasi Tab Navigator di App.js
![alt text](image-11.png)
5. Bukti Tab Navigator
![alt text](image-12.png)
![alt text](image-13.png)
![alt text](tab.gif)

Langkah 4 = Membuat Drawer Navigation
1. Instalasi Pustaka Drawer (npm install @react-navigation/drawer)
![alt text](image-14.png)
2. Konfigurasi Drawer Navigator di App.js
![alt text](image-15.png)
3. Bukti Drawer Navigator
![alt text](image-17.png)
![alt text](image-16.png)
![alt text](image-18.png)
![alt text](drawer.gif)