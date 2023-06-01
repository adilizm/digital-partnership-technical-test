<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CategorySeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        # user 1
        DB::table('categories')->insert([
            'name' => 'Furniture',
        ]);

        #user 2 
        DB::table('categories')->insert([
            'name' => 'Lighting',
        ]);
    }
}
