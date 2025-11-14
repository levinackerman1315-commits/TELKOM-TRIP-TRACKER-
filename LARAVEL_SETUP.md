# Setup Laravel Backend untuk Telkom Trip Tracker

## 1. Buat Project Laravel

Di folder `c:\laragon\www\`, buat project Laravel baru:

```bash
cd c:\laragon\www
composer create-project laravel/laravel telkom-trip-api
cd telkom-trip-api
```

## 2. Setup Database

Edit file `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=telkom_trip
DB_USERNAME=root
DB_PASSWORD=
```

Buat database di phpMyAdmin atau MySQL CLI:
```sql
CREATE DATABASE telkom_trip;
```

## 3. Install Laravel Sanctum

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

## 4. Setup CORS

Edit `config/cors.php`:

```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'], // Vite dev server
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

## 5. Buat Migration untuk Users Table

Edit file `database/migrations/xxxx_xx_xx_create_users_table.php`:

```php
public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email')->unique();
        $table->timestamp('email_verified_at')->nullable();
        $table->string('password');
        $table->enum('role', ['employee', 'finance'])->default('employee');
        $table->rememberToken();
        $table->timestamps();
    });
}
```

## 6. Buat Migration untuk Trips Table

```bash
php artisan make:migration create_trips_table
```

Edit file migration yang baru dibuat:

```php
public function up()
{
    Schema::create('trips', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->string('destination');
        $table->text('purpose');
        $table->date('start_date');
        $table->date('end_date');
        $table->decimal('advance', 15, 2)->default(0);
        $table->enum('status', ['pending', 'approved', 'rejected', 'completed'])->default('pending');
        $table->text('rejection_reason')->nullable();
        $table->timestamps();
    });
}
```

Jalankan migration:
```bash
php artisan migrate
```

## 7. Buat Models

### User Model
Edit `app/Models/User.php`:

```php
<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function trips()
    {
        return $this->hasMany(Trip::class);
    }

    public function isEmployee()
    {
        return $this->role === 'employee';
    }

    public function isFinance()
    {
        return $this->role === 'finance';
    }
}
```

### Trip Model

```bash
php artisan make:model Trip
```

Edit `app/Models/Trip.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    protected $fillable = [
        'user_id',
        'destination',
        'purpose',
        'start_date',
        'end_date',
        'advance',
        'status',
        'rejection_reason',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'advance' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

## 8. Buat Controllers

### AuthController

```bash
php artisan make:controller Api/AuthController
```

Edit `app/Http/Controllers/Api/AuthController.php`:

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'role' => 'required|in:employee,finance',
        ]);

        $user = User::where('email', $request->email)
                    ->where('role', $request->role)
                    ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email, password, atau role tidak valid.'],
            ]);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
```

### TripController (Employee)

```bash
php artisan make:controller Api/TripController
```

Edit `app/Http/Controllers/Api/TripController.php`:

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Trip;
use Illuminate\Http\Request;

class TripController extends Controller
{
    public function index(Request $request)
    {
        $trips = $request->user()->trips()
                         ->orderBy('created_at', 'desc')
                         ->get();

        return response()->json($trips);
    }

    public function show($id, Request $request)
    {
        $trip = $request->user()->trips()->findOrFail($id);

        return response()->json($trip);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'destination' => 'required|string|max:255',
            'purpose' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'advance' => 'required|numeric|min:0',
        ]);

        $trip = $request->user()->trips()->create($validated);

        return response()->json($trip, 201);
    }
}
```

### FinanceController

```bash
php artisan make:controller Api/FinanceController
```

Edit `app/Http/Controllers/Api/FinanceController.php`:

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Trip;
use Illuminate\Http\Request;

class FinanceController extends Controller
{
    public function allTrips()
    {
        $trips = Trip::with('user')
                     ->orderBy('created_at', 'desc')
                     ->get();

        return response()->json($trips);
    }

    public function approve($id)
    {
        $trip = Trip::findOrFail($id);
        $trip->status = 'approved';
        $trip->save();

        return response()->json($trip);
    }

    public function reject($id, Request $request)
    {
        $request->validate([
            'reason' => 'nullable|string',
        ]);

        $trip = Trip::findOrFail($id);
        $trip->status = 'rejected';
        $trip->rejection_reason = $request->reason;
        $trip->save();

        return response()->json($trip);
    }
}
```

## 9. Setup Routes

Edit `routes/api.php`:

```php
<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TripController;
use App\Http\Controllers\Api\FinanceController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Employee routes
    Route::prefix('employee')->middleware('role:employee')->group(function () {
        Route::get('/trips', [TripController::class, 'index']);
        Route::post('/trips', [TripController::class, 'store']);
        Route::get('/trips/{id}', [TripController::class, 'show']);
    });

    // Finance routes
    Route::prefix('finance')->middleware('role:finance')->group(function () {
        Route::get('/trips', [FinanceController::class, 'allTrips']);
        Route::put('/trips/{id}/approve', [FinanceController::class, 'approve']);
        Route::put('/trips/{id}/reject', [FinanceController::class, 'reject']);
    });
});
```

## 10. Buat Middleware untuk Role

```bash
php artisan make:middleware CheckRole
```

Edit `app/Http/Middleware/CheckRole.php`:

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    public function handle(Request $request, Closure $next, string $role)
    {
        if (!$request->user() || $request->user()->role !== $role) {
            return response()->json([
                'message' => 'Unauthorized. You do not have access to this resource.'
            ], 403);
        }

        return $next($request);
    }
}
```

Register middleware di `bootstrap/app.php`:

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->alias([
        'role' => \App\Http\Middleware\CheckRole::class,
    ]);
})
```

## 11. Buat Seeder untuk Testing

```bash
php artisan make:seeder UserSeeder
```

Edit `database/seeders/UserSeeder.php`:

```php
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Employee user
        User::create([
            'name' => 'John Employee',
            'email' => 'employee@telkomakses.co.id',
            'password' => Hash::make('password'),
            'role' => 'employee',
        ]);

        // Finance user
        User::create([
            'name' => 'Jane Finance',
            'email' => 'finance@telkomakses.co.id',
            'password' => Hash::make('password'),
            'role' => 'finance',
        ]);
    }
}
```

Jalankan seeder:
```bash
php artisan db:seed --class=UserSeeder
```

## 12. Jalankan Server

```bash
php artisan serve
```

Server akan berjalan di `http://localhost:8000`

## 13. Test API dengan Postman/Thunder Client

### Login as Employee
POST `http://localhost:8000/api/login`
```json
{
    "email": "employee@telkomakses.co.id",
    "password": "password",
    "role": "employee"
}
```

### Create Trip (dengan token dari login)
POST `http://localhost:8000/api/employee/trips`
Headers: `Authorization: Bearer {token}`
```json
{
    "destination": "Jakarta",
    "purpose": "Client Meeting",
    "start_date": "2024-02-15",
    "end_date": "2024-02-17",
    "advance": 5000000
}
```

## Credential untuk Testing

**Employee:**
- Email: employee@telkomakses.co.id
- Password: password
- Role: employee

**Finance:**
- Email: finance@telkomakses.co.id
- Password: password
- Role: finance
