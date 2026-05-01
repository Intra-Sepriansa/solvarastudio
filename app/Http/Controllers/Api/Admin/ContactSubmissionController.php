<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactSubmissionResource;
use App\Models\ContactSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;

class ContactSubmissionController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        Gate::authorize('viewAny', ContactSubmission::class);

        return ContactSubmissionResource::collection(
            ContactSubmission::latest()->paginate(20),
        );
    }

    public function show(ContactSubmission $contactSubmission): ContactSubmissionResource
    {
        Gate::authorize('view', $contactSubmission);

        return new ContactSubmissionResource($contactSubmission);
    }

    public function destroy(ContactSubmission $contactSubmission): JsonResponse
    {
        Gate::authorize('delete', $contactSubmission);

        $contactSubmission->delete();

        return response()->json(['message' => 'Deleted.']);
    }
}
