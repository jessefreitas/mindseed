<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alert extends Model
{
    protected $fillable = [
        'athlete_id',
        'type',
        'severity',
        'description',
        'is_resolved',
    ];

    public function athlete()
    {
        return $this->belongsTo(Athlete::class);
    }
}
