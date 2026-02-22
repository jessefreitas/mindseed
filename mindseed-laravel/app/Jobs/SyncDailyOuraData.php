<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\WearableToken;
use App\Models\DailyMetric;
use App\Services\RuleEngineService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SyncDailyOuraData implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Execute the job.
     * Fetches Sleep Score and Readiness from Oura for all linked athletes.
     */
    public function handle(): void
    {
        $tokens = WearableToken::where('provider', 'oura')->with('athlete')->get();
        $yesterday = now()->subDay()->format('Y-m-d');

        foreach ($tokens as $token) {
            $athlete = $token->athlete;

            // Optional: Token Refresh Logic here if token is expired

            // Fetch Daily Sleep from Oura V2 API
            $response = Http::withToken($token->access_token)
                ->get("https://api.ouraring.com/v2/usercollection/daily_sleep", [
                    'start_date' => $yesterday,
                    'end_date' => $yesterday
                ]);

            if ($response->successful()) {
                $data = $response->json();
                
                // Parse Oura Score (1-100)
                $sleepScore = $data['data'][0]['score'] ?? 85; 

                // Map Oura's 1-100 scale to MindSeed's 1-5 scale to respect our DB structure
                // Oura > 80 = 5, 70-80 = 4, 60-70 = 3, 50-60 = 2, < 50 = 1
                $mappedSleep = 5;
                if ($sleepScore < 50) $mappedSleep = 1;
                elseif ($sleepScore < 60) $mappedSleep = 2;
                elseif ($sleepScore < 70) $mappedSleep = 3;
                elseif ($sleepScore < 80) $mappedSleep = 4;

                // Create a silent DailyMetric based strictly on the Wearable pulse
                $metric = DailyMetric::create([
                    'athlete_id' => $athlete->id,
                    'date' => now()->toDateString(),
                    'sleep_quality' => $mappedSleep,
                    'energy_level' => $mappedSleep, // Reusing sleep score as baseline energy for passive read
                    // Dummy defaults for forms not filled natively via wearable
                    'focus_level' => 3,
                    'stress_level' => 3, 
                    'impulsivity_score' => 50,
                    'maturity_score' => 50,
                    'pressure_score' => 50,
                    'burnout_risk' => false,
                    'grief_indicator' => false,
                    'is_wearable_sync' => true, // Optional flag if added to DB
                ]);

                // Run the Engine
                RuleEngineService::processMetrics($athlete, $metric);
                
                Log::info("Synced Oura Ring data for Athlete {$athlete->id} with Score {$sleepScore}.");
            } else {
                Log::error("Failed to sync Oura Ring data for Athlete {$athlete->id}: " . $response->body());
            }
        }
    }
}
