<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    protected $fillable = [
        'athlete_id',
        'date',
        'q_sleep',
        'q_stress',
        'q_energy',
        'q_focus',
        'q_impulsivity',
        'q_pressure',
        'q_mood',
        'notes',
    ];

    public function athlete()
    {
        return $this->belongsTo(Athlete::class);
    }
}
