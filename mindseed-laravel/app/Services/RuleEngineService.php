<?php

namespace App\Services;

use App\Models\Athlete;
use App\Models\Alert;
use App\Models\DailyMetric;

class RuleEngineService
{
    /**
     * Process compound rules and generate alerts based on daily metrics.
     */
    public static function processMetrics(Athlete $athlete, DailyMetric $metrics)
    {
        $newAlerts = [];
        $athleteStatus = 'stable'; // Default status

        // 1. Risco de Burnout (Esgotamento) Simples
        if ($metrics->burnout_risk) {
            $newAlerts[] = [
                'athlete_id' => $athlete->id,
                'type' => 'Sinal de Esgotamento Sistêmico',
                'severity' => 'critical',
                'description' => 'Motor Preditivo detectou fadiga severa cruzada com alto nível de estresse (Burnout).',
                'is_resolved' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ];
            $athleteStatus = 'critical';
        }

        // 2. Risco de Traumas / Impacto Emocional (Luto)
        if ($metrics->grief_indicator) {
            $newAlerts[] = [
                'athlete_id' => $athlete->id,
                'type' => 'Impacto Emocional Severo',
                'severity' => 'critical',
                'description' => 'Baixa drástica de humor, foco e energia sugere impacto emocional forte ou trauma recente.',
                'is_resolved' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ];
            $athleteStatus = 'critical';
        }

        // 3. Gatilho Composto: Risco de Lesão (Impulsividade + Privação de Sono)
        // Alta impulsividade (>70%) associada a baixa qualidade de sono (<40%) reduz o tempo de reação muscular.
        if ($metrics->impulsivity_score >= 70 && $metrics->sleep_quality <= 40) {
            $newAlerts[] = [
                'athlete_id' => $athlete->id,
                'type' => 'Risco Agudo de Lesão Muscular',
                'severity' => 'critical',
                'description' => 'Gatilho Composto: A privação de sono combinada com alta impulsividade reduz o tempo de reação neuromuscular do atleta.',
                'is_resolved' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ];
            $athleteStatus = 'critical';
        }

        // 4. Gatilho Composto: Quebra Sob Pressão (Baixa Pressão + Alto Estresse)
        // Atleta não lida bem com pressão (<40%) e já está com estresse alto (>80%)
        if ($metrics->pressure_score <= 40 && $metrics->stress_level >= 80) {
            $newAlerts[] = [
                'athlete_id' => $athlete->id,
                'type' => 'Alerta de Baixa Resiliência',
                'severity' => 'warning',
                'description' => 'Gatilho Composto: Atleta apresenta pico de estresse e histórico de baixa resiliência sob pressão. Atenção para jogos decisivos.',
                'is_resolved' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ];
            if ($athleteStatus !== 'critical') {
                $athleteStatus = 'warning';
            }
        }

        // 5. Gatilho de Evolução Positiva (Peak Performance)
        // Energia > 80%, Foco > 80%, Maturidade > 80%
        if ($metrics->energy_level >= 80 && $metrics->focus_level >= 80 && $metrics->maturity_score >= 80) {
            $newAlerts[] = [
                'athlete_id' => $athlete->id,
                'type' => 'Janela de Peak Performance',
                'severity' => 'info', // Verde / Estável
                'description' => 'Atleta atingiu zona de altíssima performance cognitiva e física. Momento ideal para titularidade.',
                'is_resolved' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ];
            if ($athleteStatus !== 'critical' && $athleteStatus !== 'warning') {
                $athleteStatus = 'stable';
            }
        }

        // Se houver novos alertas, insere no banco
        if (!empty($newAlerts)) {
            Alert::insert($newAlerts);
        }

        // Atualiza o status geral do atleta com base na pior severidade
        $athlete->update(['status' => $athleteStatus]);
    }
}
