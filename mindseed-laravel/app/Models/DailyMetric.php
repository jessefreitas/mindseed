<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyMetric extends Model
{
    protected $fillable = [
        'athlete_id',
        'date',
        'energy_level',
        'focus_level',
        'stress_level',
        'sleep_quality',
    ];

    public function athlete()
    {
        return $this->belongsTo(Athlete::class);
    }
}
