<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laudo MindSeed</title>
    <style>
        body { font-family: 'Helvetica', sans-serif; color: #333; font-size: 14px; }
        .header { text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 10px; margin-bottom: 20px; }
        .logo { font-size: 28px; font-weight: bold; color: #1E293B; }
        .gold { color: #D4AF37; }
        .footer { position: fixed; bottom: -20px; left: 0; right: 0; border-top: 1px solid #ddd; padding-top: 10px; font-size: 10px; color: #666; text-align: center; line-height: 1.4; }
        .section { margin-bottom: 25px; }
        .title { font-size: 16px; font-weight: bold; background-color: #f8fafc; border-left: 4px solid #D4AF37; padding: 8px 12px; margin-bottom: 15px; color: #0f172a; text-transform: uppercase; letter-spacing: 1px;}
        .data-row { margin-bottom: 8px; }
        .data-label { font-weight: bold; color: #475569; display: inline-block; width: 220px; }
        .data-value { display: inline-block; font-weight: bold; }
        .alert-box { border-left: 4px solid #ef4444; background-color: #fef2f2; padding: 10px; margin-bottom: 5px; font-size: 13px; }
        .alert-warning { border-left: 4px solid #f59e0b; background-color: #fffbeb; }
        .alert-title { font-weight: bold; margin-bottom: 5px; }
        .restricted { color: #ef4444; font-size: 11px; margin-left: 10px; font-style: italic; }
        .doc-meta { text-align: right; font-size: 12px; color: #64748b; margin-top: -10px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">Mind<span class="gold">Seed</span> 360</div>
        <h3>Laudo Preditivo Confidencial</h3>
    </div>

    <div class="doc-meta">
        <div>Atleta ID: #{{ str_pad($athlete->id, 5, '0', STR_PAD_LEFT) }}</div>
        <div>Data de Emissão: {{ explode(' ', $generated_at)[0] }}</div>
    </div>

    <div class="section">
        <div class="title">I. Dados Biográficos do Atleta</div>
        <div class="data-row"><span class="data-label">Nome Completo:</span> <span class="data-value">{{ $athlete->name }}</span></div>
        <div class="data-row"><span class="data-label">Idade / Categoria:</span> <span class="data-value">{{ $athlete->age ?? 'N/A' }} anos</span></div>
        <div class="data-row"><span class="data-label">Modalidade / Equipe:</span> <span class="data-value">{{ $athlete->sport }} - {{ $athlete->team }}</span></div>
        <div class="data-row"><span class="data-label">Status Sistêmico (IA):</span> <span class="data-value" style="color: {{ $athlete->status === 'critical' ? '#ef4444' : ($athlete->status === 'warning' ? '#f59e0b' : '#10b981') }}">{{ strtoupper($athlete->status) }}</span></div>
    </div>

    @if(isset($athlete->metrics) && $athlete->metrics->count() > 0)
    <div class="section">
        <div class="title">II. Quadro de Análise Preditiva (Últimos 15 dias)</div>
        @php $latest = $athlete->metrics->last(); @endphp
        <div class="data-row"><span class="data-label">Estabilidade Emocional:</span> <span class="data-value">{{ 100 - ($latest->stress_level ?? 0) }}%</span></div>
        <div class="data-row"><span class="data-label">Foco Cognitivo / Volitivo:</span> <span class="data-value">{{ $latest->focus_level ?? 0 }}%</span></div>
        <div class="data-row"><span class="data-label">Consistência sob Pressão:</span> <span class="data-value">{{ $latest->pressure_score ?? 0 }}%</span></div>
        
        @if(in_array($generated_role, ['medico', 'admin']))
            <br/>
            <strong style="color: #D4AF37;">Métricas Clínicas de Acesso Restrito:</strong><br/>
            <div class="data-row" style="margin-top: 10px;"><span class="data-label">Taxa de Maturidade Positiva:</span> <span class="data-value">{{ $latest->maturity_score ?? 0 }}%</span></div>
            <div class="data-row"><span class="data-label">Impulsividade Crônica:</span> <span class="data-value" style="color:#ef4444;">{{ $latest->impulsivity_score ?? 0 }}%</span> <span class="restricted">*Sigilo Médico Preservado</span></div>
            <div class="data-row"><span class="data-label">Risco de Esgotamento (Burnout):</span> <span class="data-value" style="color:#ef4444;">{{ $latest->burnout_risk ? 'ALTO' : 'BAIXO' }}</span></div>
        @else
            <br/>
            <div style="background-color: #f1f5f9; padding: 15px; text-align: center; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12px;">
                <strong><span style="font-size: 16px;">&#128274;</span> BLOQUEIO DE SIGILO MÉDICO (LGPD)</strong><br/><br/>
                Os indicadores psicométricos brutos de Impulsividade e Esgotamento foram <strong>ocultados</strong> neste documento, pois o seu perfil atual de acesso institucional (<strong>{{ strtoupper($generated_role) }}</strong>) não possui os diretos do Departamento Médico.<br/>
                Para a versão integral deste laudo, acione o staff de Saúde e Performance do clube.
            </div>
        @endif
    </div>
    @endif

    <div class="section">
        <div class="title">III. Alertas Ativos (Semáforo)</div>
        @if(isset($athlete->alerts) && $athlete->alerts->where('is_resolved', false)->count() > 0)
            @foreach($athlete->alerts->where('is_resolved', false) as $alert)
                <div class="alert-box {{ $alert->severity === 'warning' ? 'alert-warning' : '' }}">
                    <div class="alert-title">Sinalização: {{ strtoupper($alert->type) }}</div>
                    <div>{{ $alert->description }}</div>
                </div>
            @endforeach
        @else
            <p>Nenhuma sinalização sistêmica crítica ativa no momento para este atleta.</p>
        @endif
    </div>

    <div class="footer">
        <strong>AUDITORIA E GOVERNANÇA (RASTREAMENTO DE DADOS - LGPD)</strong><br>
        Relatório solicitado e expedido por: <strong>{{ $generated_by }}</strong> (Cargo sistêmico: {{ strtoupper($generated_role) }})<br>
        Data da requisição: <strong>{{ $generated_at }}</strong> | IP Tracker: <strong>{{ $ip_address }}</strong><br>
        <em style="color:#ef4444;">* AVISO LEGAL: Este apontamento algorítmico NÃO constitui diagnóstico clínico psiquiátrico ou avaliação médica finalizadora. Trata-se exclusivamente de uma leitura preditiva focada em tomada de decisão esportiva.</em>
    </div>
</body>
</html>
