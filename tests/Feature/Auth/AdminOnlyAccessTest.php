<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminOnlyAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_admin_user_cannot_authenticate_when_admin_allowlist_is_enabled(): void
    {
        config(['auth.admin_emails' => ['admin@hpie.org']]);
        $user = User::factory()->create(['email' => 'client@example.com']);

        $this->post(route('login.store'), [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->assertGuest();
    }

    public function test_admin_user_can_authenticate_when_admin_allowlist_is_enabled(): void
    {
        config(['auth.admin_emails' => ['admin@hpie.org']]);
        $user = User::factory()->create(['email' => 'admin@hpie.org']);

        $response = $this->post(route('login.store'), [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticatedAs($user);
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_non_admin_user_cannot_access_admin_routes(): void
    {
        config(['auth.admin_emails' => ['admin@hpie.org']]);
        $user = User::factory()->create(['email' => 'client@example.com']);

        $response = $this->actingAs($user)->get(route('admin.partners.index'));

        $response->assertForbidden();
    }

    public function test_non_admin_user_cannot_access_dashboard(): void
    {
        config(['auth.admin_emails' => ['admin@hpie.org']]);
        $user = User::factory()->create(['email' => 'client@example.com']);

        $response = $this->actingAs($user)->get(route('dashboard'));

        $response->assertForbidden();
    }
}
