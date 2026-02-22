<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Athlete;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    public function export($athlete_id)
    {
        $athlete = Athlete::with(['metrics', 'alerts'])->findOrFail($athlete_id);
        $user = Auth::user();

        // Se o usuário não estiver logado (ex. teste de rota), coloca 'Sistema'
        $generatedBy = $user ? $user->name : 'Sistema Auto';
        $generatedRole = $user ? ($user->subrole ?? $user->role) : 'N/A';

        // Security / Audit Log
        $data = [
            'athlete' => $athlete,
            'generated_by' => $generatedBy,
            'generated_role' => $generatedRole,
            'generated_at' => now()->format('d/m/Y H:i:s'),
            'ip_address' => request()->ip(),
        ];

        // Load the view and pass data
        $pdf = Pdf::loadView('pdf.executive_report', $data);

        // Download the PDF
        return $pdf->download("laudo_mindseed_{$athlete->id}.pdf");
    }
}
