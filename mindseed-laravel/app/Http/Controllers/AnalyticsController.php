<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Athlete;
use App\Models\DailyMetric;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    /**
     * Display the Analytics Data Discovery Dashboard.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        
        // Only Admin, Gestor or Comissao can view analytics
        if (!in_array($user->role, ['admin', 'gestao', 'comissao'])) {
            abort(403, 'Acesso restrito ao módulo de Análise de Dados Avançada.');
        }

        // Filters
        $position = $request->input('position');
        $minAge = $request->input('min_age');
        $maxAge = $request->input('max_age');
        $days = $request->input('days', 30); // Default last 30 days

        $dateFrom = now()->subDays($days)->format('Y-m-d');

        // Base Query for Athletes
        $athletesQuery = Athlete::query();
        if ($position) {
            $athletesQuery->where('position', $position);
        }
        if ($minAge) {
            $athletesQuery->where('age', '>=', $minAge);
        }
        if ($maxAge) {
            $athletesQuery->where('age', '<=', $maxAge);
        }

        $athleteIds = $athletesQuery->pluck('id');

        // 1. Overall Burnout Risk Distribution
        $burnoutStats = DailyMetric::whereIn('athlete_id', $athleteIds)
            ->where('date', '>=', $dateFrom)
            ->selectRaw('SUM(CASE WHEN burnout_risk = 1 THEN 1 ELSE 0 END) as hig_risk_days, COUNT(*) as total_days')
            ->first();
            
        $burnoutPercentage = $burnoutStats->total_days > 0 
            ? round(($burnoutStats->hig_risk_days / $burnoutStats->total_days) * 100) 
            : 0;

        // 2. Trend: Average Impulsivity vs Sleep Quality over time
        $trendData = DailyMetric::whereIn('athlete_id', $athleteIds)
            ->where('date', '>=', $dateFrom)
            ->select(
                'date',
                DB::raw('ROUND(AVG(impulsivity_score), 2) as avg_impulsivity'),
                DB::raw('ROUND(AVG(sleep_quality) * 20, 2) as avg_sleep_score') // Normalize 1-5 to 20-100 scale for visual comparison
            )
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // 3. Position Comparison (Aggregated Status)
        // Group athletes by position and count how many are in 'critical', 'warning', 'stable'
        $positionHealth = Athlete::select('position', 'status', DB::raw('count(*) as total'))
            ->groupBy('position', 'status')
            ->get();

        $formattedPositionHealth = [];
        foreach ($positionHealth as $ph) {
            $formattedPositionHealth[$ph->position][$ph->status] = $ph->total;
        }

        return Inertia::render('Admin/Analytics/Index', [
            'filters' => [
                'position' => $position,
                'min_age' => $minAge,
                'max_age' => $maxAge,
                'days' => $days,
            ],
            'metrics' => [
                'burnout_percentage' => $burnoutPercentage,
                'trendData' => $trendData,
                'positionHealth' => $formattedPositionHealth,
            ],
            'availablePositions' => Athlete::select('position')->distinct()->whereNotNull('position')->pluck('position'),
        ]);
    }
}
