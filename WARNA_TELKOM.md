# Skema Warna Telkom Akses - Quick Reference

## Warna Utama (CSS Variables)

```css
/* Telkom Red - Warna utama untuk button, header, aksi penting */
--primary: #E60000
bg-primary, text-primary, border-primary

/* Abu Gelap - Teks dan sidebar */
--foreground: #2E2E2E
bg-telkom-dark, text-foreground

/* Abu Muda - Background halaman */
--background: #F5F5F5
bg-telkom-gray, bg-background

/* Putih - Card dan konten */
--card: #FFFFFF
bg-card, bg-white

/* Kuning Aksen - Highlight, ikon */
--accent: #FFD100
bg-accent, text-accent, bg-telkom-yellow

/* Biru Digital - Aksen tambahan */
--accent-blue: #007BFF
bg-accent-blue, text-accent-blue, bg-telkom-blue
```

## Status Colors

```css
/* Approved - Hijau */
--success: #4CAF50
bg-success, text-success

/* Rejected - Merah Tua */
--destructive: #D32F2F
bg-destructive, text-destructive

/* Pending - Kuning */
--warning: #FFD100
bg-warning, text-warning
```

## Penggunaan di Tailwind

### Background
```tsx
// Background halaman
<div className="bg-background">
<div className="bg-telkom-gray">

// Card putih
<div className="bg-card">
<div className="bg-white">

// Header merah
<div className="bg-primary">
<div className="bg-telkom-red">

// Sidebar gelap
<div className="bg-sidebar">
<div className="bg-telkom-dark">
```

### Text
```tsx
// Teks utama
<p className="text-foreground">
<p className="text-telkom-dark">

// Teks di background merah
<span className="text-primary-foreground">
<span className="text-white">

// Teks highlight
<span className="text-accent">
<span className="text-telkom-yellow">
```

### Button
```tsx
// Primary button (merah)
<Button className="bg-primary hover:bg-primary/90">

// Secondary button (abu)
<Button variant="secondary">

// Success button (hijau)
<Button className="bg-success hover:bg-success/90">

// Destructive button (merah tua)
<Button variant="destructive">
```

### Gradient
```tsx
// Gradient merah untuk header
<div className="bg-gradient-primary">

// Gradient kuning untuk accent
<div className="bg-gradient-accent">
```

### Badge Status
```tsx
// Approved
<Badge className="bg-success text-success-foreground">

// Pending
<Badge className="bg-warning text-warning-foreground">

// Rejected
<Badge variant="destructive">
```

## Contoh Layout Telkom Akses

### Header
```tsx
<header className="bg-gradient-primary shadow-medium">
  <div className="flex items-center gap-3">
    <img src="/logo-telkom-akses-white.png" className="h-10" />
    <h1 className="text-white font-bold">Portal Name</h1>
  </div>
</header>
```

### Content Area
```tsx
<main className="bg-background min-h-screen p-6">
  <Card className="bg-card shadow-soft">
    <CardHeader>
      <CardTitle className="text-foreground">Title</CardTitle>
    </CardHeader>
    <CardContent>
      {/* Content */}
    </CardContent>
  </Card>
</main>
```

### Sidebar (jika ada)
```tsx
<aside className="bg-sidebar text-sidebar-foreground w-64">
  <nav className="p-4">
    <a className="text-white hover:text-accent">Menu Item</a>
  </nav>
</aside>
```

## Proporsi Warna yang Disarankan

```
70% - Putih/Abu muda (#F5F5F5, #FFFFFF) - Background & Card
20% - Abu gelap (#2E2E2E) - Teks & Sidebar
10% - Telkom Red (#E60000) - Button, Header, Aksi
```

## Shadow & Border

```tsx
// Shadow lembut untuk card
<Card className="shadow-soft">

// Shadow medium untuk modal
<Dialog className="shadow-medium">

// Border abu muda
<div className="border border-border">
```

## Font Recommendation

Tambahkan di `index.html` atau `tailwind.config.ts`:

```tsx
font-family: 'Poppins', 'Roboto', 'Lato', 'Open Sans', sans-serif;
```

## Quick Tips

✅ **Gunakan:**
- `bg-primary` untuk tombol aksi utama (Submit, Approve)
- `bg-success` untuk status approved
- `bg-warning` untuk status pending
- `bg-destructive` untuk reject/delete

✅ **Background:**
- Halaman: `bg-background` atau `bg-telkom-gray`
- Card: `bg-card` atau `bg-white`
- Header: `bg-gradient-primary`
- Sidebar: `bg-sidebar` atau `bg-telkom-dark`

✅ **Text:**
- Primary text: `text-foreground`
- Muted text: `text-muted-foreground`
- On red background: `text-white`
- On dark background: `text-white`
