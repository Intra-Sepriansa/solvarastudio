<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\StorePortfolioRequest;
use App\Http\Requests\Api\Admin\UpdatePortfolioRequest;
use App\Http\Resources\PortfolioResource;
use App\Models\Portfolio;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;

class PortfolioController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        Gate::authorize('viewAny', Portfolio::class);

        return PortfolioResource::collection(Portfolio::orderBy('order')->get());
    }

    public function store(StorePortfolioRequest $request): PortfolioResource
    {
        $portfolio = Portfolio::create($request->validated());

        return new PortfolioResource($portfolio);
    }

    public function show(Portfolio $portfolio): PortfolioResource
    {
        Gate::authorize('view', $portfolio);

        return new PortfolioResource($portfolio);
    }

    public function update(UpdatePortfolioRequest $request, Portfolio $portfolio): PortfolioResource
    {
        $portfolio->update($request->validated());

        return new PortfolioResource($portfolio);
    }

    public function destroy(Portfolio $portfolio): JsonResponse
    {
        Gate::authorize('delete', $portfolio);

        $portfolio->delete();

        return response()->json(['message' => 'Deleted.']);
    }
}
