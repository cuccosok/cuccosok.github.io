# Jóska Bazárja

Cyberpunk hangulatú, adatvezérelt React/Vite bemutatóoldal gamer felszerelésekhez.

## Fejlesztés

Telepítés és helyi futtatás:

```sh
npm install
npm run dev
```

Ellenőrzések:

```sh
npm run lint
npm run test
npm run build
```

## Tartalom szerkesztése

Az oldal tartalma a `public/data` mappából töltődik be:

- `public/data/intro.json`: nyitóoldal feliratai és színei
- `public/data/categories.json`: kategóriák
- `public/data/items/<kategoria>/items.json`: kategórián belüli elemek
- `public/data/items/<kategoria>/<elem>/description.md`: elemleírások

Egy elemhez jelenleg `main.jpg`, `pic1.jpg`, `pic2.jpg`, `pic3.jpg` és `description.md` fájlokat vár az oldal.
