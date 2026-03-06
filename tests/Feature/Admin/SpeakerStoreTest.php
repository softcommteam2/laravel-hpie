<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SpeakerStoreTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_persists_event_date(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('admin.speakers.store'), [
            'name' => 'Dr. Jane Speaker',
            'event_date' => '2026-04-15',
            'event_time' => '14:30',
            'is_active' => true,
        ]);

        $response->assertRedirect(route('admin.speakers.index'));

        $this->assertDatabaseHas('speakers', [
            'name' => 'Dr. Jane Speaker',
            'event_date' => '2026-04-15',
        ]);
    }
}
