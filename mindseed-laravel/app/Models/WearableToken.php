<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WearableToken extends Model
{
    use HasFactory;

    protected $fillable = [
        'athlete_id',
        'provider',
        'access_token',
        'refresh_token',
        'expires_at',
    ];

    /**
     * Get the athlete that owns the wearable token.
     */
    public function athlete()
    {
        return $this->belongsTo(Athlete::class);
    }
}
