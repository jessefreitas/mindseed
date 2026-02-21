<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('assessments', function (Blueprint $table) {
            $table->integer('q_impulsivity')->nullable()->after('q_focus');
            $table->integer('q_pressure')->nullable()->after('q_impulsivity');
            $table->integer('q_mood')->nullable()->after('q_pressure');
        });

        Schema::table('daily_metrics', function (Blueprint $table) {
            $table->integer('impulsivity_score')->nullable()->after('sleep_quality');
            $table->integer('maturity_score')->nullable()->after('impulsivity_score');
            $table->integer('pressure_score')->nullable()->after('maturity_score');
            $table->boolean('burnout_risk')->default(false)->after('pressure_score');
            $table->boolean('grief_indicator')->default(false)->after('burnout_risk');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assessments', function (Blueprint $table) {
            $table->dropColumn(['q_impulsivity', 'q_pressure', 'q_mood']);
        });

        Schema::table('daily_metrics', function (Blueprint $table) {
            $table->dropColumn(['impulsivity_score', 'maturity_score', 'pressure_score', 'burnout_risk', 'grief_indicator']);
        });
    }
};
