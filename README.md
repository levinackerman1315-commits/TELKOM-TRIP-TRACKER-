# Telkom Akses - Business Trip Tracker

Sistem administrasi dan monitoring perjalanan dinas untuk karyawan dan bagian keuangan Telkom Akses.

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Laravel (API)
- **UI Components**: shadcn-ui
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Routing**: React Router DOM

## Prerequisites

- Node.js & npm (untuk frontend)
- PHP 8.1+ & Composer (untuk Laravel backend)
- MySQL/PostgreSQL (database)
- Laragon (recommended untuk development di Windows)

## Installation

### Frontend Setup

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Buat file `.env` di root folder frontend dengan isi:

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Telkom Akses Trip Tracker
```

## Integrasi dengan Laravel

### 1. Setup Laravel Backend

Buat project Laravel di folder terpisah (atau dalam folder `backend/`):

```sh
cd ..
composer create-project laravel/laravel telkom-trip-api
cd telkom-trip-api
```

### 2. Install Laravel Sanctum (untuk Authentication)

```sh
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

### 3. Setup CORS di Laravel

Edit `config/cors.php`:
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:5173'], // URL Vite dev server
'supports_credentials' => true,
```

### 4. API Routes yang Diperlukan

Di `routes/api.php`:
```php
// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Employee routes
    Route::prefix('employee')->group(function () {
        Route::get('/trips', [TripController::class, 'index']);
        Route::post('/trips', [TripController::class, 'store']);
        Route::get('/trips/{id}', [TripController::class, 'show']);
    });
    
    // Finance routes
    Route::prefix('finance')->group(function () {
        Route::get('/trips', [FinanceController::class, 'allTrips']);
        Route::put('/trips/{id}/approve', [FinanceController::class, 'approve']);
        Route::put('/trips/{id}/reject', [FinanceController::class, 'reject']);
    });
});
```

### 5. Database Schema (Migration)

Buat migration untuk tabel trips:
```sh
php artisan make:migration create_trips_table
```

### 6. Jalankan Laravel Server

```sh
php artisan serve
# Server akan berjalan di http://localhost:8000
```

## Project Structure (Frontend)

```
src/
├── api/              # API service functions (untuk koneksi ke Laravel)
├── components/       # Reusable components
│   └── ui/          # shadcn-ui components
├── contexts/        # React contexts (Auth, etc.)
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── pages/           # Page components
│   ├── employee/   # Employee portal pages
│   └── finance/    # Finance portal pages
└── types/          # TypeScript type definitions
```

## Development Workflow

1. Jalankan Laravel backend: `php artisan serve`
2. Jalankan Vite dev server: `npm run dev`
3. Akses aplikasi di: `http://localhost:5173`

## Deployment

### Frontend (Build)
```sh
npm run build
# Output akan ada di folder dist/
```

### Deploy Options
- Frontend: Vercel, Netlify, atau server static hosting
- Backend: Server dengan PHP (VPS, shared hosting dengan Laravel support)
- Bisa juga deploy dalam satu domain dengan Laravel serving React build

## License

Private - Telkom Akses Internal Use Only
