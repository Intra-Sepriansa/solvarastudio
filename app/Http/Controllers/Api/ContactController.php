<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreContactSubmissionRequest;
use App\Http\Resources\ContactSubmissionResource;
use App\Models\ContactSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(StoreContactSubmissionRequest $request): JsonResponse
    {
        try {
            $submission = ContactSubmission::create([
                ...$request->validatedData(),
                'ip_address' => $request->ip(),
                'user_agent' => substr((string) $request->userAgent(), 0, 255),
            ]);
        } catch (\Throwable $e) {
            Log::error('Failed to store contact submission.', [
                'error' => $e->getMessage(),
                'ip' => $request->ip(),
            ]);

            return response()->json([
                'message' => 'Gagal menyimpan pesan. Coba beberapa saat lagi.',
            ], 500);
        }

        return response()->json([
            'message' => 'Terima kasih. Detail awal project sudah terkirim. Kami akan meninjau scope-nya dulu sebelum memberi estimasi.',
            'data' => new ContactSubmissionResource($submission),
        ], 201);
    }
}
