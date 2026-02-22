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
            'q_impulsivity' => 'required|integer|min:1|max:5',
            'q_pressure' => 'required|integer|min:1|max:5',
            'q_mood' => 'required|integer|min:1|max:5',
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
            'q_impulsivity' => $validated['q_impulsivity'],
            'q_pressure' => $validated['q_pressure'],
            'q_mood' => $validated['q_mood'],
            'notes' => $validated['notes'],
        ]);

        $sleep_quality = ($validated['q_sleep'] / 5) * 100;
        $stress_level = ($validated['q_stress'] / 5) * 100;
        $energy_level = ($validated['q_energy'] / 5) * 100;
        $focus_level = ($validated['q_focus'] / 5) * 100;
        
        // PsychoAnalytics Deep Engine
        $impulsivity_score = ($validated['q_impulsivity'] / 5) * 100;
        $pressure_score = ($validated['q_pressure'] / 5) * 100;
        $mood_score = ($validated['q_mood'] / 5) * 100;

        // Positive Maturity Composite Score (High Focus + High Pressure + Low Impulsivity)
        $maturity_score = (($validated['q_focus'] + $validated['q_pressure'] + (6 - $validated['q_impulsivity'])) / 15) * 100;

        // Clinical Triggers
        $burnout_risk = ($validated['q_stress'] >= 4 && $validated['q_energy'] <= 2 && $validated['q_sleep'] <= 2);
        $grief_indicator = ($validated['q_mood'] <= 2 && $validated['q_energy'] <= 2 && $validated['q_focus'] <= 2);

        // Save Daily Metric
        $dailyMetric = DailyMetric::create([
            'athlete_id' => $athlete->id,
            'date' => now()->toDateString(),
            'energy_level' => $energy_level,
            'focus_level' => $focus_level,
            'stress_level' => $stress_level,
            'sleep_quality' => $sleep_quality,
            'impulsivity_score' => $impulsivity_score,
            'maturity_score' => $maturity_score,
            'pressure_score' => $pressure_score,
            'burnout_risk' => $burnout_risk,
            'grief_indicator' => $grief_indicator,
        ]);

        // Process Compound Rules and Generate Alerts via the Advanced Engine
        \App\Services\RuleEngineService::processMetrics($athlete, $dailyMetric);

        return redirect()->route('atleta.dashboard')->with('success', 'Assessment enviado com sucesso! MindScore atualizado.');
    }
}
