<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Athlete;
use App\Models\Family;
use App\Models\DailyMetric;
use App\Models\Alert;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Admin User (Gestor Geral / Médico)
        User::create([
            'name' => 'Dr. Costa (Diretoria Médica)',
            'email' => 'admin@mindseed.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'subrole' => 'medico', // Full RBAC Access
        ]);

        // 1.5 Create Secondary Admin (Comissão Técnica - Restricted)
        User::create([
            'name' => 'Treinador Silva',
            'email' => 'tecnico@mindseed.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'subrole' => 'comissao', // Restricted RBAC Access
        ]);

        // 2. Create Athlete User & Athlete Profile
        $athleteUser = User::create([
            'name' => 'Pedro Gomes',
            'email' => 'pedro@mindseed.com',
            'password' => Hash::make('password'),
            'role' => 'atleta',
            'avatar' => 'https://ui-avatars.com/api/?name=Pedro+Gomes&background=10B981&color=fff',
        ]);

        $athlete = Athlete::create([
            'user_id' => $athleteUser->id,
            'name' => 'Pedro Gomes',
            'age' => 17,
            'sport' => 'Futebol',
            'team' => 'Sub-18 (Titular)',
            'status' => 'critical',
        ]);

        // 3. Create Family User & Relation
        $familyUser = User::create([
            'name' => 'Marcos Gomes',
            'email' => 'marcos@mindseed.com',
            'password' => Hash::make('password'),
            'role' => 'familia',
        ]);

        Family::create([
            'user_id' => $familyUser->id,
            'athlete_id' => $athlete->id,
            'relationship_type' => 'Pai',
        ]);

        // 4. Create Daily Metrics for the Athlete
        DailyMetric::create([
            'athlete_id' => $athlete->id,
            'date' => now()->toDateString(),
            'energy_level' => 30, // Low energy (Burnout indication)
            'focus_level' => 45,
            'stress_level' => 85, // High stress
            'sleep_quality' => 40, // Poor sleep
            'impulsivity_score' => 60,
            'maturity_score' => 40,
            'pressure_score' => 30, // Bad under pressure
            'burnout_risk' => true,
            'grief_indicator' => false,
        ]);
        
        // 5. Create Alerts for the Athlete
        Alert::create([
            'athlete_id' => $athlete->id,
            'type' => 'Estresse Elevado',
            'severity' => 'critical',
            'description' => 'Pedro apresentou um pico de estresse nas últimas 48h (Risco Moderado de Burnout).',
        ]);

        Alert::create([
            'athlete_id' => $athlete->id,
            'type' => 'Qualidade do Sono',
            'severity' => 'medium',
            'description' => 'A qualidade do sono caiu 30% em relação à semana passada.',
        ]);

        // --- Create a secondary athlete for comparison purpose ---
        $athleteUser2 = User::create([
            'name' => 'João Silva',
            'email' => 'joao@mindseed.com',
            'password' => Hash::make('password'),
            'role' => 'atleta',
        ]);

        Athlete::create([
            'user_id' => $athleteUser2->id,
            'name' => 'João Silva',
            'age' => 18,
            'sport' => 'Futebol',
            'team' => 'Sub-18 (Reserva)',
            'status' => 'stable',
        ]);
    }
}
