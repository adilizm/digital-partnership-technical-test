<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ProductSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        #user 1 products  
         DB::table('products')->insert([
            'name' => 'sofa natural',
            'slug' => 'sofa-natural',
            'stock' => 100,
            'category_id' => 1,
            'user_id' => 1,
        ]);

        DB::table('products')->insert([
            'name' => 'lamp 220v ',
            'slug' => 'lamp-220v',
            'stock' => 5,
            'category_id' => 2,
            'user_id' => 1,
        ]);

        DB::table('products')->insert([
            'name' => 'Big lamp rgb',
            'slug' => 'Big-lamp-rgb',
            'stock' => 10,
            'category_id' => 2,
            'user_id' => 1,
        ]);

        #user 2 products  
        DB::table('products')->insert([
            'name' => 'black desk chaire',
            'slug' => 'black-desk-chaire',
            'stock' => 15,
            'category_id' => 1,
            'user_id' => 2,
        ]);

        DB::table('products')->insert([
            'name' => 'usb lighting ',
            'slug' => 'usb lighting',
            'stock' => 44,
            'category_id' => 2,
            'user_id' => 2,
        ]);
    }
}
