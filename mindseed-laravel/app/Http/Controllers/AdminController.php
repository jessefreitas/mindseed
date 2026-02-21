<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Athlete;
use App\Models\Alert;

class AdminController extends Controller
{
    public function dashboard()
    {
        $athletesCount = Athlete::count();
        $criticalAlerts = Alert::where('severity', 'critical')->where('is_resolved', false)->count();

        return Inertia::render('Admin/Index', [
            'stats' => [
                'totalAthletes' => $athletesCount,
                'criticalAlerts' => $criticalAlerts
            ]
        ]);
    }

    public function perfil()
    {
        // For testing, grab the first real athlete showing critical
        $athlete = Athlete::with(['user', 'metrics', 'alerts'])->where('status', 'critical')->first();

        return Inertia::render('Admin/perfil/Index', [
            'athlete' => $athlete
        ]);
    }

    public function comparativo()
    {
        $athletes = Athlete::with('metrics')->take(2)->get();
        return Inertia::render('Admin/comparativo/Index', [
            'athletes' => $athletes
        ]);
    }

    public function alertas()
    {
        $alerts = Alert::with('athlete')->orderByDesc('created_at')->get();
        return Inertia::render('Admin/alertas/Index', [
            'alerts' => $alerts
        ]);
    }
}
