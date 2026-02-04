# Guia de Migracion - MyLife Project

## Resumen Ejecutivo

Este proyecto tiene **6 vulnerabilidades de seguridad** (1 critica, 1 alta, 1 moderada, 3 bajas) que requieren actualizacion inmediata. La mas critica es Next.js con **12 CVEs** incluyendo RCE (Remote Code Execution) y SSRF.

---

## 1. Vulnerabilidades de Seguridad Detectadas

| Paquete | Severidad | Vulnerabilidad | CVE/Advisory |
|---------|-----------|----------------|--------------|
| **next** | CRITICA | RCE, SSRF, DoS, Authorization Bypass, Cache Poisoning | Multiple (12 CVEs) |
| **glob** | ALTA | Command injection via CLI | GHSA-5j98-mcp5-4vw2 |
| **js-yaml** | MODERADA | Prototype pollution | GHSA-mh29-5h37-fv8m |
| **@eslint/plugin-kit** | BAJA | ReDoS | GHSA-xffm-g5w8-qvg7 |
| **brace-expansion** | BAJA | ReDoS (2 CVEs) | GHSA-v6h2-p8h4-qcjw |

---

## 2. Actualizaciones de Dependencias

### Versiones Actuales vs Recomendadas

| Paquete | Version Actual | Version Recomendada | Tipo de Cambio |
|---------|----------------|---------------------|----------------|
| next | 15.1.6 | 16.1.6 | MAJOR |
| react | 19.0.0 | 19.2.4 | MINOR |
| react-dom | 19.0.0 | 19.2.4 | MINOR |
| lucide-react | 0.474.0 | 0.563.0 | MINOR |
| eslint | ^9 | 9.39.2 | MINOR |
| eslint-config-next | 15.1.6 | 16.1.6 | MAJOR |
| postcss | 8.5.1 | 8.5.6 | PATCH |
| autoprefixer | 10.4.20 | 10.4.24 | PATCH |
| tailwindcss | 3.4.17 | 4.1.18* | MAJOR |

> *Tailwind CSS v4 tiene cambios arquitectonicos significativos. Ver seccion 4 para opcion conservadora.

---

## 3. Cambios de Codigo Requeridos

### 3.1 layout.js - Separar viewport de metadata

**Problema**: En Next.js 14+, `viewport` debe exportarse por separado, no dentro de `metadata`.

**Archivo**: `src/app/layout.js`

**Antes (lineas 49-55)**:
```javascript
export const metadata = {
  // ... otros campos
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
  },
  // ...
};
```

**Despues**:
```javascript
// Agregar ANTES de export const metadata
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export const metadata = {
  // ... (sin la propiedad viewport)
};
```

---

### 3.2 hero.js - Reemplazar onLoadingComplete

**Problema**: `onLoadingComplete` esta deprecado desde Next.js 14, usar `onLoad`.

**Archivo**: `src/Components/hero.js`

**Antes (linea 85)**:
```javascript
onLoadingComplete={() => setIsImageLoaded(true)}
```

**Despues**:
```javascript
onLoad={() => setIsImageLoaded(true)}
```

---

## 4. Migracion de Tailwind CSS

### Opcion A: Actualizacion Conservadora (Recomendada)

Mantener Tailwind v3.x para evitar cambios mayores en la configuracion:

```json
{
  "tailwindcss": "^3.4.17"
}
```

Solo ejecutar:
```bash
npm audit fix
```

### Opcion B: Migracion Completa a Tailwind v4

> **Nota**: Tailwind v4 requiere Safari 16.4+, Chrome 111+, Firefox 128+

#### Paso 1: Ejecutar herramienta de migracion
```bash
npx @tailwindcss/upgrade
```

#### Paso 2: Cambios en globals.css

**Antes**:
```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

**Despues**:
```css
@import "tailwindcss";

@theme {
  --color-sage: #2F3B35;
  --color-copper: #B87B4B;
  --color-cream: #F5F4F2;
  --color-dark: #1A1A1A;

  --font-serif: var(--font-cormorant);
  --font-sans: var(--font-inter);
  --font-script: var(--font-dancing);
}
```

#### Paso 3: Actualizar utilidades renombradas

| v3 | v4 |
|----|-----|
| shadow-sm | shadow-xs |
| shadow | shadow-sm |
| rounded-sm | rounded-xs |
| rounded | rounded-sm |
| blur-sm | blur-xs |
| blur | blur-sm |

---

## 5. Mejoras de SEO Recomendadas

### 5.1 Agregar robots.txt

Crear `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://mylife-itsgenki.vercel.app/sitemap.xml
```

### 5.2 Agregar sitemap.xml dinamico

Crear `src/app/sitemap.js`:
```javascript
export default function sitemap() {
  return [
    {
      url: 'https://mylife-itsgenki.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

### 5.3 Mejorar accesibilidad de imagenes

En `galery.js`, mejorar los alt texts:
```javascript
const ITEMS = [
  { id: 1, image: "/images/1.jpg", alt: "Momento especial de G&G - Foto 1" },
  // ...
];
```

---

## 6. Mejoras de Seguridad Recomendadas

### 6.1 Agregar Security Headers en next.config.mjs

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ],
};

export default nextConfig;
```

### 6.2 Habilitar Strict Mode de React

En `layout.js`, envolver con StrictMode (ya habilitado por defecto en Next.js 13+).

---

## 7. Comandos de Migracion

### Paso 1: Crear backup
```bash
git checkout -b migration/security-update
```

### Paso 2: Actualizar dependencias (opcion conservadora)
```bash
npm install next@16.1.6 react@19.2.4 react-dom@19.2.4 lucide-react@latest
npm install -D eslint@latest eslint-config-next@16.1.6 postcss@latest autoprefixer@latest
npm audit fix
```

### Paso 3: Verificar build
```bash
npm run build
npm run lint
```

### Paso 4: Probar localmente
```bash
npm run dev
```

---

## 8. Checklist de Validacion Post-Migracion

- [ ] `npm run build` completa sin errores
- [ ] `npm run lint` sin errores criticos
- [ ] `npm audit` sin vulnerabilidades criticas/altas
- [ ] Navegacion responsive funciona (mobile/desktop)
- [ ] Galeria con scroll infinito funciona
- [ ] Contador de tiempo se actualiza
- [ ] Imagenes cargan correctamente con skeleton
- [ ] Smooth scroll entre secciones funciona
- [ ] Colores personalizados (sage, copper, cream, dark) visibles
- [ ] Fuentes (Inter, Cormorant, Dancing Script) cargan

---

## 9. Archivos Modificados

| Archivo | Cambio |
|---------|--------|
| `package.json` | Actualizar versiones de dependencias |
| `src/app/layout.js` | Separar viewport de metadata |
| `src/Components/hero.js` | Cambiar onLoadingComplete por onLoad |
| `next.config.mjs` | Agregar security headers |
| `public/robots.txt` | Crear (nuevo) |
| `src/app/sitemap.js` | Crear (nuevo) |

---

## 10. Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigacion |
|--------|--------------|---------|------------|
| Breaking changes en Next.js 16 | Media | Alto | Probar en rama separada |
| Incompatibilidad Tailwind v4 | Alta | Medio | Mantener v3.x |
| Cambios en API de Image | Baja | Bajo | Solo cambiar onLoadingComplete |

---

## Notas Finales

- **Prioridad 1**: Actualizar Next.js a 16.x por vulnerabilidades criticas
- **Prioridad 2**: Corregir viewport en layout.js
- **Prioridad 3**: Actualizar onLoadingComplete en hero.js
- **Opcional**: Migrar a Tailwind v4 (cambios esteticos minimos)

La UX/UI no se vera afectada si se siguen los pasos descritos. Los cambios son principalmente de configuracion y no alteran el comportamiento visual.
