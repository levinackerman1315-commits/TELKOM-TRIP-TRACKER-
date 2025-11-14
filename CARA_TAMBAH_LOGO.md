# Cara Menambahkan Logo Telkom Akses

## 1. Download Logo Telkom Akses

Ada beberapa cara untuk mendapatkan logo:

### Opsi A: Download dari website resmi
- Kunjungi website Telkom Indonesia atau Telkom Akses
- Cari halaman "Media" atau "Brand Assets"
- Download logo dalam format PNG atau SVG

### Opsi B: Cari di Google Images
- Search: "logo telkom akses png transparent"
- Download versi yang beresolusi tinggi dan background transparan

### Opsi C: Request dari tim internal
- Minta file logo resmi dari tim Marketing/Corporate Communication Telkom Akses

## 2. Simpan Logo ke Project

Setelah mendapatkan file logo, simpan ke folder `public/`:

```
c:\laragon\www\telkom-trip-tracker-main\public\
├── logo-telkom-akses.png         (Logo untuk light background)
├── logo-telkom-akses-white.png   (Logo putih untuk dark background)
└── logo-telkom-akses.svg         (Format SVG jika ada)
```

**Rekomendasi format:**
- SVG: Terbaik untuk kualitas di semua ukuran
- PNG: Minimal resolusi 512x512px dengan background transparan

## 3. Cara Menggunakan Logo di Kode

### A. Di Header/Navbar (Login Page)

Edit file `src/pages/Login.tsx`:

```tsx
// Ganti bagian icon Plane dengan logo
<div className="text-center mb-8">
  <div className="inline-flex items-center justify-center mb-4">
    <img 
      src="/logo-telkom-akses.png" 
      alt="Telkom Akses Logo" 
      className="h-16 w-auto"
    />
  </div>
  <h1 className="text-3xl font-bold text-foreground mb-2">Telkom Akses</h1>
  <p className="text-muted-foreground">Business Trip Administration System</p>
</div>
```

### B. Di Dashboard Header (Employee/Finance)

Edit file `src/pages/employee/Dashboard.tsx`:

```tsx
// Di header section
<header className="bg-gradient-primary border-b shadow-soft">
  <div className="container mx-auto px-4 py-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <img 
        src="/logo-telkom-akses-white.png" 
        alt="Telkom Akses" 
        className="h-10 w-auto"
      />
      <div>
        <h1 className="text-xl font-bold text-white">Employee Portal</h1>
        <p className="text-sm text-white/80">Telkom Akses Travel System</p>
      </div>
    </div>
    {/* ... rest of code */}
  </div>
</header>
```

### C. Buat Component Logo yang Reusable

Buat file `src/components/TelkomLogo.tsx`:

```tsx
interface TelkomLogoProps {
  variant?: 'color' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
  xl: 'h-16',
};

export const TelkomLogo = ({ 
  variant = 'color', 
  size = 'md',
  className = '' 
}: TelkomLogoProps) => {
  const logoSrc = variant === 'white' 
    ? '/logo-telkom-akses-white.png' 
    : '/logo-telkom-akses.png';
  
  return (
    <img 
      src={logoSrc}
      alt="Telkom Akses" 
      className={`w-auto ${sizeClasses[size]} ${className}`}
    />
  );
};
```

Cara pakai:
```tsx
import { TelkomLogo } from '@/components/TelkomLogo';

// Di header merah
<TelkomLogo variant="white" size="lg" />

// Di card putih
<TelkomLogo variant="color" size="md" />
```

## 4. Update Favicon dengan Logo Telkom

Ganti file `public/favicon.svg` dengan logo Telkom Akses atau buat versi favicon:

```tsx
// Jika punya file logo SVG
// Rename jadi favicon.svg atau buat icon khusus
```

Atau gunakan tool online untuk convert:
- https://favicon.io/favicon-converter/
- Upload logo PNG → Download sebagai favicon.ico

## 5. Posisi Logo yang Disarankan

### Header/Navbar
```
┌─────────────────────────────────────────┐
│ [LOGO] Telkom Akses          [Logout]  │
└─────────────────────────────────────────┘
```

### Login Page
```
        ┌─────────┐
        │  LOGO   │
        └─────────┘
       Telkom Akses
   Business Trip System
       [Login Form]
```

### Sidebar (jika ada)
```
┌──────────┐
│   LOGO   │
│          │
│ Menu 1   │
│ Menu 2   │
└──────────┘
```

## 6. Contoh Lengkap: Update Login Page

```tsx
import { TelkomLogo } from "@/components/TelkomLogo";

const Login = () => {
  // ... existing code

  return (
    <div className="min-h-screen flex items-center justify-center bg-telkom-gray p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <TelkomLogo variant="color" size="xl" />
          </div>
          <h1 className="text-3xl font-bold text-telkom-dark mb-2">
            Telkom Akses
          </h1>
          <p className="text-muted-foreground">
            Business Trip Administration System
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-medium">
          {/* ... rest of form */}
        </Card>
      </div>
    </div>
  );
};
```

## 7. Tips Desain

✅ **DO:**
- Gunakan logo putih di background merah (#E60000)
- Gunakan logo warna di background putih/abu muda
- Pastikan logo tidak terlalu besar (max height: 64px di desktop)
- Beri spacing yang cukup di sekitar logo

❌ **DON'T:**
- Jangan stretch/distort logo
- Jangan gunakan logo dengan resolusi rendah
- Jangan letakkan logo di background yang kontrasnya rendah

## 8. Format Logo yang Ideal

**Untuk Web:**
- Format: SVG (vector) atau PNG (transparent background)
- Ukuran PNG: 512x512px atau lebih
- Ratio: Sesuai dengan logo asli (biasanya landscape)

**Untuk Favicon:**
- Format: ICO atau SVG
- Ukuran: 32x32px atau 16x16px
- Simplified version dari logo utama
