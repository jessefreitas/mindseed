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
    return redirect()->route('login');
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

require __DIR__.'/auth.php';

// MindSeed 360 AI & Integrations API (Stubs for Future Expansion)
Route::prefix('api')->group(function () {
    Route::post('/ai/coach/protocol', [\App\Http\Controllers\Api\AiCoachController::class, 'generateProtocol']);
    Route::post('/wearables/webhook', [\App\Http\Controllers\Api\WearableIngestionController::class, 'receiveWebhook']);
    
    // PDF Export Endpoint (Requires DOMPDF on VPS)
    Route::get('/reports/export/{athlete_id}', function ($athlete_id) {
        return response()->json([
            'status' => 'success',
            'message' => 'Executive Report PDF generation triggered (Stub).'
        ]);
    })->name('api.reports.export');
});
