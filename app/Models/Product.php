<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'stock',
        'category_id',
        'user_id'
    ];

    public function Category()
    {
        return $this->belongsTo(Category::class);
    }

   
}
