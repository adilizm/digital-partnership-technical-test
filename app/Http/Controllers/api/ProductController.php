<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
         return ProductResource::collection(Product::where('user_id',Auth::user()->id)->with('Category')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::user()->id;
        $data['slug'] = $this->CreateSlug($data['name']);
        $product = Product::create($data);
        return response(new ProductResource($product), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $product = Product::where('slug',$slug)->first();
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, $slug)
    {
        $product = Product::where('slug',$slug)->first();
        $data = $request->validated();
        $data['slug'] = $this->CreateSlug($data['name']);
        $product->update($data);
        return response(new ProductResource($product), 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response(['deleted'=> true], 201);
    }

    public function CreateSlug($slug)
    {
        if (Product::where('slug',Str::slug($slug,'-'))->exists()) {

            $max = Product::where('slug',$slug)->latest('id')->skip(1)->value('slug');

            if (is_numeric($max[-1])) {
                return preg_replace_callback('/(\d+)$/', function ($mathces) {
                    return $mathces[1] + 1;
                }, $max);
            }

            return Str::slug($slug,'-') .'-2';
        }

        return Str::slug($slug,'-');
    }
    
}
