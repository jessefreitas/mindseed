<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Athlete;

class AtletaController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();
        if ($user && $user->role !== 'atleta') {
            return redirect(route('admin.dashboard'));
        }

        $athlete = Athlete::with('metrics')->where('user_id', $user->id ?? 0)->first();

        return Inertia::render('Atleta/Index', [
            'athlete' => $athlete
        ]);
    }

    public function testes()
    {
        return Inertia::render('Atleta/Testes');
    }

    public function conteudo()
    {
        return Inertia::render('Atleta/Conteudo');
    }

    public function perfil()
    {
        $athlete = Athlete::with('metrics')->where('user_id', Auth::id() ?? 0)->first();
        return Inertia::render('Atleta/Perfil', [
            'athlete' => $athlete
        ]);
    }
}
