<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Family extends Model
{
    protected $fillable = [
        'user_id',
        'athlete_id',
        'relationship_type',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function athlete()
    {
        return $this->belongsTo(Athlete::class);
    }
}
