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

        // 2. Create Base Athlete User (Lucas Moura)
        $athleteUser = User::create([
            'name' => 'Lucas Moura',
            'email' => 'pedro@mindseed.com', // keep old email login for ease
            'password' => Hash::make('password'),
            'role' => 'atleta',
            'subrole' => null,
            'avatar' => 'https://ui-avatars.com/api/?name=Lucas+Moura&background=D4AF37&color=000',
        ]);

        $athlete = Athlete::create([
            'user_id' => $athleteUser->id,
            'name' => 'Lucas Moura',
            'age' => 20,
            'sport' => 'Futebol',
            'team' => 'Profissional',
            'status' => 'warning',
            'position' => 'Atacante',
        ]);

        // 2.5 Create Family Member linked to Athlete
        User::create([
            'name' => 'Mariana Moura (Esposa)',
            'email' => 'familia@mindseed.com',
            'password' => Hash::make('password'),
            'role' => 'familia',
            'subrole' => null,
            'linked_athlete_id' => $athlete->id,
            'avatar' => 'https://ui-avatars.com/api/?name=Mariana+M&background=F472B6&color=fff',
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
