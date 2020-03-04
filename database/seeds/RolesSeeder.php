<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create(['name' => 'Admin']);
        Role::create(['name' => 'Host']);
        Role::create(['name' => 'President']);
        Role::create(['name' => 'Chancellor']);
        Role::create(['name' => 'Hitler']);
        Role::create(['name' => 'Fascist']);
        Role::create(['name' => 'Liberal']);
    }
}
