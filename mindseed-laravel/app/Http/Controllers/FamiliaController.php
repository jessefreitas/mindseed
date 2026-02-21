<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Family;

class FamiliaController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();

        $family = Family::with(['athlete.metrics'])->where('user_id', $user->id ?? 0)->first();

        return Inertia::render('Familia/Index', [
            'familyData' => $family
        ]);
    }
}
