<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Athlete extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'age',
        'sport',
        'team',
        'status',
        'position',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function metrics()
    {
        return $this->hasMany(DailyMetric::class);
    }

    public function alerts()
    {
        return $this->hasMany(Alert::class);
    }

    public function families()
    {
        return $this->hasMany(Family::class);
    }
}
