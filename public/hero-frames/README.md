# Hero animation frames

Ponés acá las imágenes que se usan en el `<HeroAnimation>` del landing.

## Nombres exactos esperados

```
01-earth.jpg              ← Tierra desde el espacio (Sudamérica)
02-patagonia.jpg          ← Sur de Chile / Patagonia oblicua
03-central-chile.jpg      ← OPCIONAL — Centro-sur con volcanes y lagos
04-santiago-metro.jpg     ← Santiago metropolitano top-down
05-santiago-close.jpg     ← Santiago centro close top-down (donde van los dots)
```

Los nombres tienen que matchear EXACTO (case-sensitive). Si una imagen
no está, el componente la saltea y sigue con las demás.

## Recomendaciones técnicas

- **Formato:** JPG (no PNG — pesa más).
- **Calidad:** 85% (balance calidad/peso).
- **Resolución:** 1920×1080 es suficiente. No necesitás 4K para hero.
- **Peso por imagen:** menos de 500 KB.
- **Total de las 4-5 imágenes:** menos de 2 MB.

## Cómo comprimir si están muy pesadas

Online y gratis: <https://squoosh.app/> — drag-and-drop, elegís MozJPEG
calidad 85, descargás.

Por terminal con ImageMagick (si lo tenés instalado):

```powershell
magick imagen-original.png -quality 85 -resize 1920x1080 01-earth.jpg
```

## Ajustes opcionales en el componente

Si querés cambiar el orden, los tiempos, los dots verdes o los nombres
de archivo, todo está en `components/HeroAnimation.tsx`.
