<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Athlete;
use Illuminate\Support\Facades\Auth;

class FamilyController extends Controller
{
    /**
     * View the Family Dashboard.
     */
    public function dashboard()
    {
        $user = Auth::user();
        
        // Ensure the user has the 'familia' role
        if ($user->role !== 'familia') {
            abort(403, 'Acesso restrito ao Módulo Família.');
        }

        // Fetch the linked athlete
        $athlete = $user->linkedAthlete;
        
        if (!$athlete) {
            return Inertia::render('Family/Dashboard', [
                'athlete' => null,
                'tips' => []
            ]);
        }

        // Generate gentle psychoeducational tips based on Athlete status
        $tips = $this->generateTips($athlete->status);

        return Inertia::render('Family/Dashboard', [
            'athlete' => [
                'id' => $athlete->id,
                'name' => $athlete->user->name,
                'status' => $athlete->status, // Only exposing broad status: stable, warning, critical
                'avatar' => $athlete->user->avatar,
            ],
            'tips' => $tips
        ]);
    }

    /**
     * Generate psychoeducational tips (Soft Alerts)
     */
    private function generateTips($status)
    {
        $tips = [];
        
        if ($status === 'stable') {
            $tips[] = [
                'icon' => 'fa-leaf',
                'color' => 'text-green-500',
                'title' => 'Rotina Saudável',
                'description' => 'O atleta encontra-se em ótimo estado de prontidão. Ajude a manter o ambiente em casa tranquilo e foque no descanso.'
            ];
        } elseif ($status === 'warning') {
            $tips[] = [
                'icon' => 'fa-battery-half',
                'color' => 'text-yellow-500',
                'title' => 'Atenção ao Cansaço',
                'description' => 'Detectamos sinais moderados de desgaste físico ou mental. Recomendamos evitar discutir problemas complexos hoje e priorizar uma alimentação leve à noite.'
            ];
        } elseif ($status === 'critical') {
            $tips[] = [
                'icon' => 'fa-moon',
                'color' => 'text-red-500',
                'title' => 'Necessidade de Repouso Absoluto',
                'description' => 'A carga sistêmica do atleta está alta. É crucial garantir pelo menos 8 horas de sono contínuas. Evite compromissos sociais desgastantes nas próximas 48h.'
            ];
            $tips[] = [
                'icon' => 'fa-heart',
                'color' => 'text-blue-400',
                'title' => 'Apoio Emocional',
                'description' => 'Pequenos atos de acolhimento fazem grande diferença. Ofereça um momento de escuta sem julgamentos caso o atleta queira conversar.'
            ];
        }

        return $tips;
    }
}
