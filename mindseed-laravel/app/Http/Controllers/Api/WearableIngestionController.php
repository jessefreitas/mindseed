<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Athlete;
use App\Models\Alert;

class WearableIngestionController extends Controller
{
    /**
     * Webhook endpoint to receive automated biometric telemetry from Oura / Apple Health / Garmin
     * Expected Payload: { athlete_id: int, heart_rate_variability: float, sleep_score: int }
     */
    public function receiveWebhook(Request $request)
    {
        // 1. Validate payload
        $validated = $request->validate([
            'athlete_id' => 'required|exists:athletes,id',
            'heart_rate_variability' => 'required|numeric',
            'sleep_score' => 'required|numeric',
            'device_type' => 'nullable|string',
        ]);

        $athlete = Athlete::findOrFail($validated['athlete_id']);

        // 2. Normalize Biometrics (Mock Engine)
        // If HRV is drastically low or Sleep Score from the Watch is conflicting with self-reported data.
        if ($validated['heart_rate_variability'] < 30 || $validated['sleep_score'] < 50) {
            
            // 3. Trigger Compound System Alert
            Alert::create([
                'athlete_id' => $athlete->id,
                'type' => 'Divergência Biométrica (Wearable)',
                'severity' => 'critical',
                'description' => "O dispositivo " . ($validated['device_type'] ?? 'Smartwatch') . " registrou parâmetros críticos (HRV baixo ou Sono ruim) de forma passiva. Risco somático detectado.",
                'is_resolved' => false,
            ]);

            $athlete->update(['status' => 'critical']);

            return response()->json([
                'status' => 'success',
                'message' => 'Telemetry ingested. Critical systemic alert triggered.',
                'action_taken' => 'alert_created'
            ], 201);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Telemetry ingested. Biometrics in stable thresholds.',
            'action_taken' => 'none'
        ], 200);
    }
}
