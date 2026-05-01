<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\StoreTestimonialRequest;
use App\Http\Requests\Api\Admin\UpdateTestimonialRequest;
use App\Http\Resources\TestimonialResource;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;

class TestimonialController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        Gate::authorize('viewAny', Testimonial::class);

        return TestimonialResource::collection(Testimonial::orderBy('order')->get());
    }

    public function store(StoreTestimonialRequest $request): TestimonialResource
    {
        $testimonial = Testimonial::create($request->validated());

        return new TestimonialResource($testimonial);
    }

    public function show(Testimonial $testimonial): TestimonialResource
    {
        Gate::authorize('view', $testimonial);

        return new TestimonialResource($testimonial);
    }

    public function update(UpdateTestimonialRequest $request, Testimonial $testimonial): TestimonialResource
    {
        $testimonial->update($request->validated());

        return new TestimonialResource($testimonial);
    }

    public function destroy(Testimonial $testimonial): JsonResponse
    {
        Gate::authorize('delete', $testimonial);

        $testimonial->delete();

        return response()->json(['message' => 'Deleted.']);
    }
}
