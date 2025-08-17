<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	public function up(): void
	{
		Schema::create('product_materials', function (Blueprint $table) {
			$table->id();
			$table->foreignId('product_id')->constrained()->cascadeOnDelete();
			$table->foreignId('raw_material_id')->constrained()->cascadeOnDelete();
			$table->decimal('quantity_required', 12, 2)->default(0);
			$table->timestamps();
			$table->unique(['product_id', 'raw_material_id']);
		});
	}

	public function down(): void
	{
		Schema::dropIfExists('product_materials');
	}
};