<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Athlete;
use App\Models\Assessment;
use App\Models\DailyMetric;
use App\Models\Alert;

class AssessmentController extends Controller
{
    public function create()
    {
        return Inertia::render('Atleta/Assessment');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'q_sleep' => 'required|integer|min:1|max:5',
            'q_stress' => 'required|integer|min:1|max:5',
            'q_energy' => 'required|integer|min:1|max:5',
            'q_focus' => 'required|integer|min:1|max:5',
            'notes' => 'nullable|string',
        ]);

        $user = Auth::user();
        if (!$user || $user->role !== 'atleta') {
            return redirect()->route('admin.dashboard');
        }

        $athlete = Athlete::where('user_id', $user->id)->firstOrFail();

        // Save Raw Assessment
        Assessment::create([
            'athlete_id' => $athlete->id,
            'date' => now()->toDateString(),
            'q_sleep' => $validated['q_sleep'],
            'q_stress' => $validated['q_stress'],
            'q_energy' => $validated['q_energy'],
            'q_focus' => $validated['q_focus'],
            'notes' => $validated['notes'],
        ]);

        // Convert 1-5 scale to percentages
        $sleep_quality = ($validated['q_sleep'] / 5) * 100;
        $stress_level = ($validated['q_stress'] / 5) * 100;
        $energy_level = ($validated['q_energy'] / 5) * 100;
        $focus_level = ($validated['q_focus'] / 5) * 100;

        // Save Daily Metric
        DailyMetric::create([
            'athlete_id' => $athlete->id,
            'date' => now()->toDateString(),
            'energy_level' => $energy_level,
            'focus_level' => $focus_level,
            'stress_level' => $stress_level,
            'sleep_quality' => $sleep_quality,
        ]);

        // Trigger Alerts if thresholds met
        if ($validated['q_stress'] >= 4) {
            Alert::create([
                'athlete_id' => $athlete->id,
                'type' => 'Pico de Estresse Detectado',
                'severity' => $validated['q_stress'] == 5 ? 'critical' : 'medium',
                'description' => 'O atleta manifestou alto nível de estresse no assessment diário.',
                'is_resolved' => false,
            ]);
            
            $athlete->update(['status' => 'critical']);
        }

        if ($validated['q_sleep'] <= 2) {
            Alert::create([
                'athlete_id' => $athlete->id,
                'type' => 'Privação de Sono',
                'severity' => 'medium',
                'description' => 'Atleta registrou qualidade de sono ruim na noite anterior.',
                'is_resolved' => false,
            ]);
        }

        return redirect()->route('atleta.dashboard')->with('success', 'Assessment enviado com sucesso! MindScore atualizado.');
    }
}
