<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ServiceController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return ServiceResource::collection(Service::active()->get());
    }

    public function show(Service $service): ServiceResource
    {
        abort_unless($service->is_active, 404);

        return new ServiceResource($service);
    }
}
