<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdmin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $adminEmails = collect(config('auth.admin_emails', []))
            ->map(fn ($email) => mb_strtolower(trim((string) $email)))
            ->filter()
            ->values();

        // Keep behavior backward compatible in environments without admin allowlist.
        if ($adminEmails->isEmpty()) {
            return $next($request);
        }

        $email = mb_strtolower((string) $request->user()?->email);

        abort_unless($email !== '' && $adminEmails->contains($email), 403);

        return $next($request);
    }
}
