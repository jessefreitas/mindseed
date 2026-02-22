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
    return Inertia::render('Welcome');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/perfil', [AdminController::class, 'perfil'])->name('admin.perfil');
    Route::get('/admin/comparativo', [AdminController::class, 'comparativo'])->name('admin.comparativo');
    Route::get('/admin/alertas', [AdminController::class, 'alertas'])->name('admin.alertas');
    
    Route::get('/atleta', [AtletaController::class, 'dashboard'])->name('atleta.dashboard');
    Route::get('/atleta/assessment', [AssessmentController::class, 'create'])->name('atleta.assessment');
    Route::post('/atleta/assessment', [AssessmentController::class, 'store'])->name('atleta.assessment.store');
    
    // Novas rotas da Fase 6 (Expansão do Atleta)
    Route::get('/atleta/testes', [AtletaController::class, 'testes'])->name('atleta.testes');
    Route::get('/atleta/conteudo', [AtletaController::class, 'conteudo'])->name('atleta.conteudo');
    Route::get('/atleta/perfil', [AtletaController::class, 'perfil'])->name('atleta.perfil');
    
    Route::get('/familia', [FamiliaController::class, 'dashboard'])->name('familia.dashboard');
});

// Família / Staff Pessoal
Route::middleware(['auth', 'verified'])->prefix('familia')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\FamilyController::class, 'dashboard'])->name('familia.dashboard');
});

require __DIR__.'/auth.php';

// MindSeed 360 AI & Integrations API (Stubs for Future Expansion)
Route::prefix('api')->group(function () {
    Route::post('/ai/coach/protocol', [\App\Http\Controllers\Api\AiCoachController::class, 'generateProtocol']);
    Route::post('/wearables/webhook', [\App\Http\Controllers\Api\WearableIngestionController::class, 'receiveWebhook']);
    
    // Admin Analytics Data Discovery
    Route::get('/analytics', [\App\Http\Controllers\AnalyticsController::class, 'index'])->name('admin.analytics');

    // PDF Export Endpoint (DOMPDF)
    Route::get('/reports/export/{athlete_id}', [\App\Http\Controllers\ReportController::class, 'export'])->name('api.reports.export');
});

// Oura OAuth2 Routes (Athlete requires auth to link device)
Route::middleware(['auth', 'verified'])->prefix('wearables')->group(function () {
    Route::get('/oura/redirect', [\App\Http\Controllers\WearableOAuthController::class, 'redirect'])->name('wearables.oura.redirect');
    Route::get('/oura/callback', [\App\Http\Controllers\WearableOAuthController::class, 'callback'])->name('wearables.callback');
});
