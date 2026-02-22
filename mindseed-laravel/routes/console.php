<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule; // Add this line

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Sync Oura data for all athletes every morning at 08:00 AM
Schedule::job(new \App\Jobs\SyncDailyOuraData)->dailyAt('08:00');
