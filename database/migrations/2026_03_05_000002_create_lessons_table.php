<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('thumbnail_path')->nullable();
            $table->string('video_type')->default('youtube'); // youtube, vimeo, upload
            $table->string('video_url')->nullable();
            $table->string('video_path')->nullable();
            $table->string('author_name')->nullable();
            $table->text('author_bio')->nullable();
            $table->string('author_photo_path')->nullable();
            $table->longText('activity_content')->nullable();
            $table->boolean('is_published')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
