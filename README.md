# Hiruko Yuki Store

Laman web statik ini dibina menggunakan `index.html`, `styles.css`, dan `script.js`.
Ia sesuai untuk dihoskan di perkhidmatan hosting statik seperti GitHub Pages, Netlify, Vercel, atau Exabytes.

## Siap untuk hosting

### Pilihan 1: GitHub Pages (cara paling mudah)
1. Buat repositori baru di GitHub.
2. Upload fail berikut ke repositori:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `CNAME` (jika anda mahu sambungkan ke `hirukoyuki.my`)
3. Pergi ke `Settings` > `Pages`.
4. Pilih branch `main` dan folder `/root`.
5. Tekan `Save`.
6. Jika menggunakan custom domain, pastikan `hirukoyuki.my` naik sebagai domain di GitHub Pages.

### Pilihan 2: Netlify
1. Pergi ke https://app.netlify.com/
2. Create a new site from Git.
3. Sambungkan repo GitHub anda.
4. Deploy site.
5. Jika mahu gunakan custom domain, tambah domain `hirukoyuki.my` di Netlify dan ikut arahan DNS.

### Pilihan 3: Vercel
1. Pergi ke https://vercel.com/
2. Create a new project dan sambungkan repo GitHub.
3. Deploy site.
4. Tambah `hirukoyuki.my` sebagai custom domain di Vercel jika mahu.

## Exabytes DNS untuk GitHub Pages
Jika anda gunakan GitHub Pages dan domain `hirukoyuki.my`, tambah record DNS berikut di Exabytes:

- `A` record untuk `@` ke:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- `CNAME` record untuk `www` ke:
  - `USERNAME.github.io`

Gantikan `USERNAME` dengan nama pengguna GitHub anda.

## Catatan penting
- `index.html` menggunakan Google Sign-In. Anda perlu ganti `YOUR_GOOGLE_CLIENT_ID` dengan Client ID sebenar dari Google Cloud Console jika mahu fungsi Google sign-in bekerja.
- Semua jalan fail adalah relatif, jadi ia sudah sesuai untuk hosting statik.
