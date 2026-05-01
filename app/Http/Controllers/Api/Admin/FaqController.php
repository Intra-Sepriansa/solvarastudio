<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\StoreFaqRequest;
use App\Http\Requests\Api\Admin\UpdateFaqRequest;
use App\Http\Resources\FaqResource;
use App\Models\Faq;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;

class FaqController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        Gate::authorize('viewAny', Faq::class);

        return FaqResource::collection(Faq::orderBy('order')->get());
    }

    public function store(StoreFaqRequest $request): FaqResource
    {
        $faq = Faq::create($request->validated());

        return new FaqResource($faq);
    }

    public function show(Faq $faq): FaqResource
    {
        Gate::authorize('view', $faq);

        return new FaqResource($faq);
    }

    public function update(UpdateFaqRequest $request, Faq $faq): FaqResource
    {
        $faq->update($request->validated());

        return new FaqResource($faq);
    }

    public function destroy(Faq $faq): JsonResponse
    {
        Gate::authorize('delete', $faq);

        $faq->delete();

        return response()->json(['message' => 'Deleted.']);
    }
}
