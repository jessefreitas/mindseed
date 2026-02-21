<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AtletaController;
use App\Http\Controllers\FamiliaController;
use App\Http\Controllers\AssessmentController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => app()->version(),
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/perfil', [AdminController::class, 'perfil'])->name('admin.perfil');
    Route::get('/admin/comparativo', [AdminController::class, 'comparativo'])->name('admin.comparativo');
    Route::get('/admin/alertas', [AdminController::class, 'alertas'])->name('admin.alertas');
    
    Route::get('/atleta', [AtletaController::class, 'dashboard'])->name('atleta.dashboard');
    Route::get('/atleta/assessment', [AssessmentController::class, 'create'])->name('atleta.assessment');
    Route::post('/atleta/assessment', [AssessmentController::class, 'store'])->name('atleta.assessment.store');
    
    Route::get('/familia', [FamiliaController::class, 'dashboard'])->name('familia.dashboard');
});

require __DIR__.'/auth.php';
