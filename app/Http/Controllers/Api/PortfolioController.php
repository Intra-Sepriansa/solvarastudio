<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PortfolioResource;
use App\Models\Portfolio;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PortfolioController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return PortfolioResource::collection(Portfolio::published()->get());
    }

    public function show(Portfolio $portfolio): PortfolioResource
    {
        abort_unless($portfolio->is_published, 404);

        return new PortfolioResource($portfolio);
    }
}
