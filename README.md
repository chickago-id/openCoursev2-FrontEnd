# openCourse-FrontEnd
Frontend for openCourse v2.0


## Build Setup


```bash

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

## Demo

![demo](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/demo.gif)

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT](https://github.com/chickago-id/openCoursev2-FrontEnd/blob/Development/LICENSE) license.


## Fitur-Fitur

1. Manage Akademik
    - Nilai Siswa
    - Presensi
        - Siswa
        - Pengajar
        - Frontdesk
        - Administrasi
    - Penilaian Pengajar
    - Sertifikat (berisi data pengambil sertifikat)
    - Data Pengajar (diambil dari User Collection dengan level==pengajar)
    - Data Peserta (diambil dari User Collection dengan level==peserta)
    - List kelas
        - Peserta kelas
    - Jadwal

2. Management Master Data
    - Nilai Siswa
    - Sesi
    - Ruang
    - Materi
    - Tahun Akademik
    - Master Kelas Name
    - Master Batch
    - Paket Materi
    - Materi (Pelajaran)
    - Kurikulum
    - Jenis Kelas
        - Profesi
        - Intensive #1
        - Intensive #2
    - Nama Institusi
    
3. Parameter
    - Kategori Nilai
    - Nilai huruf
    
4. News and Event
    - Kategori Berita : Beasiswa, Event, Info

5. Management User
    - User List
    - Level
    - Role

6. Reporting
    - Report Siswa
    - Report Kelas
    - Report Nilai
    - Report presesni
    - Report penilaian pengajar
    - dll

Powered by CHICKAGI-ID TEAM 2019