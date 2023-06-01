<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        # user 1
        DB::table('users')->insert([
            'name' => 'adil',
            'telephone' => '0681636654',
            'address' => 'agadir hay Sallam',
            'email' => 'adil@gmail.com',
            'password' => Hash::make('password'), 
        ]);

        #user 2 
        DB::table('users')->insert([
            'name' => 'brahim',
            'telephone' => '0661839041',
            'address' => 'Rabat agdal',
            'email' => 'brahim@gmail.com',
            'password' => Hash::make('password'), 
        ]);
    }
}
