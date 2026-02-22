<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use App\Models\WearableToken;
use Inertia\Inertia;

class WearableOAuthController extends Controller
{
    /**
     * Redirects the user to the Oura OAuth2 authorization page.
     */
    public function redirect()
    {
        $athlete = Auth::user()->athlete;
        if (!$athlete) {
            return redirect()->back()->with('error', 'Acesso negado. Apenas atletas podem vincular dispositivos.');
        }

        $clientId = env('OURA_CLIENT_ID');
        $redirectUri = urlencode(env('OURA_REDIRECT_URI', route('wearables.callback')));
        $state = csrf_token();

        // Oura OAuth2 Authorization URL
        $url = "https://cloud.ouraring.com/oauth/authorize?response_type=code&client_id={$clientId}&redirect_uri={$redirectUri}&state={$state}";

        return Inertia::location($url);
    }

    /**
     * Handles the callback from Oura, exchanges the code for a token, and saves it.
     */
    public function callback(Request $request)
    {
        $athlete = Auth::user()->athlete;

        if ($request->has('error')) {
            return redirect()->route('atleta.perfil')->with('error', 'Autorização do Oura foi negada.');
        }

        $code = $request->input('code');

        // Exchange code for Access Token via Oura API
        $response = Http::asForm()->post('https://api.ouraring.com/oauth/token', [
            'grant_type' => 'authorization_code',
            'code' => $code,
            'client_id' => env('OURA_CLIENT_ID'),
            'client_secret' => env('OURA_CLIENT_SECRET'),
            'redirect_uri' => env('OURA_REDIRECT_URI', route('wearables.callback')),
        ]);

        if ($response->successful()) {
            $data = $response->json();

            // Save or Update Token
            WearableToken::updateOrCreate(
                ['athlete_id' => $athlete->id, 'provider' => 'oura'],
                [
                    'access_token' => $data['access_token'],
                    'refresh_token' => $data['refresh_token'] ?? null,
                    'expires_at' => now()->addSeconds($data['expires_in']),
                ]
            );

            return redirect()->route('atleta.perfil')->with('success', 'Oura Ring vinculado com sucesso! O MindSeed sincronizará seus dados de recuperação diariamente.');
        }

        // Return error if exchange failed
        return redirect()->route('atleta.perfil')->with('error', 'Falha ao autenticar com a API Oficial do Oura.');
    }
}
