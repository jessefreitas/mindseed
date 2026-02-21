// js/main.js

document.addEventListener('DOMContentLoaded', function () {

    // Configurações globais do Chart.js para o tema escuro/dourado
    Chart.defaults.color = '#F5F3EE';
    Chart.defaults.font.family = "'Montserrat', sans-serif";

    // 1. Minigráfico de Estabilidade (Pizza/Doghnut)
    const ctxEstabilidade = document.getElementById('chart-estabilidade').getContext('2d');
    new Chart(ctxEstabilidade, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [82, 18],
                backgroundColor: ['#2E7D32', '#1A1A1D'], // Verde para o preenchimento, fundo escuro para o resto
                borderWidth: 0,
                cutout: '75%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });

    // 2. Sparkline de Consistência (Linha)
    const ctxConsistencia = document.getElementById('chart-consistencia').getContext('2d');
    new Chart(ctxConsistencia, {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7'],
            datasets: [{
                data: [65, 70, 68, 80, 75, 85, 76],
                borderColor: '#E0A800',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: { display: false },
                y: { display: false, min: 50, max: 100 }
            }
        }
    });

    // 3. Gráfico Principal: Mapeamento do Elenco (Polar Area ou Pizza)
    const ctxMapeamento = document.getElementById('chart-mapeamento').getContext('2d');
    new Chart(ctxMapeamento, {
        type: 'doughnut',
        data: {
            labels: ['Estabilidade Alta (Verde)', 'Oscilação Moderada (Amarelo)', 'Risco Iminente (Vermelho)'],
            datasets: [{
                data: [18, 9, 3], // Exemplo de dados: 18 bem, 9 oscilando, 3 mal
                backgroundColor: [
                    '#2E7D32', // Verde
                    '#E0A800', // Amarelo
                    '#C62828'  // Vermelho
                ],
                borderColor: '#0B0B0D',
                borderWidth: 4,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: 20
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 26, 29, 0.9)',
                    titleColor: '#C6A75E',
                    bodyColor: '#F5F3EE',
                    borderColor: 'rgba(198, 167, 94, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function (context) {
                            return ' ' + context.label + ': ' + context.parsed + ' atletas';
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
    // 4. Gráfico Evolução Mental (Linha do Tempo - Tela Perfil)
    const chartEvolucaoEl = document.getElementById('chart-evolucao');
    if (chartEvolucaoEl) {
        const ctxEvolucao = chartEvolucaoEl.getContext('2d');
        new Chart(ctxEvolucao, {
            type: 'line',
            data: {
                labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [{
                    label: 'Estabilidade',
                    data: [85, 87, 82, 90, 88, 70],
                    borderColor: '#C6A75E', // Dourado
                    backgroundColor: 'rgba(198, 167, 94, 0.1)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: function (context) {
                        var index = context.dataIndex;
                        var value = context.dataset.data[index];
                        return value < 75 ? '#C62828' : '#C6A75E'; // Vermelho se < 75
                    },
                    pointBorderColor: '#0B0B0D',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(26, 26, 29, 0.9)',
                        titleColor: '#F5F3EE',
                        bodyColor: '#A0A0A0',
                        borderColor: 'rgba(198, 167, 94, 0.3)',
                        borderWidth: 1,
                        padding: 12,
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y + '%';
                                }
                                if (context.parsed.y < 75) {
                                    label += ' (Alerta: Queda Aguda)';
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        min: 50,
                        max: 100,
                        grid: {
                            color: 'rgba(245, 243, 238, 0.05)',
                            drawBorder: false,
                        },
                        ticks: {
                            color: '#A0A0A0'
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false,
                        },
                        ticks: {
                            color: '#A0A0A0'
                        }
                    }
                }
            }
        });
        // 5. Gráfico Radar (Aranha) Comparativo (Tela Comparativo)
        const chartRadarEl = document.getElementById('chart-radar-comparativo');
        if (chartRadarEl) {
            const ctxRadar = chartRadarEl.getContext('2d');
            new Chart(ctxRadar, {
                type: 'radar',
                data: {
                    labels: [
                        'Estabilidade',
                        'Foco Pós-Erro',
                        'Decisão sob Pressão',
                        'Maturidade',
                        'Controle Reflexo'
                    ],
                    datasets: [
                        {
                            label: 'Pedro Gomes',
                            data: [85, 92, 88, 80, 75],
                            backgroundColor: 'rgba(198, 167, 94, 0.2)', // Fundo Dourado Translúcido
                            borderColor: '#C6A75E', // Dourado Sólido
                            pointBackgroundColor: '#C6A75E',
                            pointBorderColor: '#0B0B0D',
                            borderWidth: 2,
                            pointRadius: 4
                        },
                        {
                            label: 'João Silva',
                            data: [62, 74, 65, 50, 85],
                            backgroundColor: 'rgba(255, 255, 255, 0.05)', // Fundo Cinza Claro Translúcido
                            borderColor: '#A0A0A0', // Cinza Claro Sólido
                            pointBackgroundColor: '#A0A0A0',
                            pointBorderColor: '#0B0B0D',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            pointRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                            pointLabels: {
                                color: '#F5F3EE',
                                font: { size: 11, family: "'Montserrat', sans-serif" }
                            },
                            ticks: {
                                display: false,
                                min: 0,
                                max: 100
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: { color: '#F5F3EE', usePointStyle: true, padding: 20 }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(26, 26, 29, 0.9)',
                            titleColor: '#C6A75E',
                            bodyColor: '#A0A0A0',
                            borderColor: 'rgba(198, 167, 94, 0.3)',
                            borderWidth: 1,
                            padding: 12
                        }
                    }
                }
            });
        }
    }
});
