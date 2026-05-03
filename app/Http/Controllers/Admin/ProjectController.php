<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProjectRequest;
use App\Http\Requests\Admin\UpdateProjectRequest;
use App\Models\Portfolio;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Portfolio::query()
            ->orderBy('order')
            ->latest('updated_at')
            ->get();

        return Inertia::render('admin/projects/index', [
            'projects' => $projects->map(fn (Portfolio $project): array => $this->projectPayload($project))->values(),
            'projectTypes' => Portfolio::TYPES,
            'metrics' => [
                'total' => $projects->count(),
                'published' => $projects->where('is_published', true)->count(),
                'draft' => $projects->where('is_published', false)->count(),
                'featured' => $projects->where('is_featured', true)->count(),
                'web' => $projects->where('type', 'web')->count(),
                'mobile' => $projects->where('type', 'mobile')->count(),
                'network' => $projects->where('type', 'network')->count(),
            ],
        ]);
    }

    public function store(StoreProjectRequest $request): RedirectResponse
    {
        $project = Portfolio::create($this->projectAttributes($request));

        $this->storeUploadedMedia($request, $project);

        return to_route('admin.projects.index')
            ->with('status', 'Project berhasil ditambahkan.');
    }

    public function update(UpdateProjectRequest $request, Portfolio $project): RedirectResponse
    {
        $project->update($this->projectAttributes($request, $project));

        if ($request->boolean('remove_cover_image') || $request->hasFile('cover_image')) {
            $this->deleteMedia($project->cover_image_path);
            $project->forceFill(['cover_image_path' => null])->save();
        }

        if ($request->boolean('remove_video_file') || $request->hasFile('video_file')) {
            $this->deleteMedia($project->video_path);
            $project->forceFill(['video_path' => null])->save();
        }

        $this->storeUploadedMedia($request, $project);

        return to_route('admin.projects.index')
            ->with('status', 'Project berhasil diperbarui.');
    }

    public function destroy(Portfolio $project): RedirectResponse
    {
        $this->deleteMedia($project->cover_image_path);
        $this->deleteMedia($project->video_path);

        $project->delete();

        return to_route('admin.projects.index')
            ->with('status', 'Project berhasil dihapus.');
    }

    /**
     * @return array<string, mixed>
     */
    private function projectAttributes(StoreProjectRequest|UpdateProjectRequest $request, ?Portfolio $project = null): array
    {
        $validated = $request->validated();
        $slugSource = (string) ($validated['slug'] ?? $validated['name']);

        return [
            ...Arr::only($validated, [
                'name',
                'client_name',
                'category',
                'type',
                'summary',
                'challenge',
                'result',
                'live_url',
                'video_url',
            ]),
            'slug' => $this->uniqueSlug($slugSource, $project),
            'stack' => $this->stackFromText((string) ($validated['stack_text'] ?? '')),
            'order' => (int) ($validated['order'] ?? 0),
            'is_published' => $request->boolean('is_published'),
            'is_featured' => $request->boolean('is_featured'),
        ];
    }

    private function storeUploadedMedia(StoreProjectRequest|UpdateProjectRequest $request, Portfolio $project): void
    {
        $attributes = [];

        if ($request->hasFile('cover_image')) {
            $attributes['cover_image_path'] = $request->file('cover_image')->store('portfolio/covers', 'public');
        }

        if ($request->hasFile('video_file')) {
            $attributes['video_path'] = $request->file('video_file')->store('portfolio/videos', 'public');
        }

        if ($attributes !== []) {
            $project->forceFill($attributes)->save();
        }
    }

    /**
     * @return array<int, string>
     */
    private function stackFromText(string $value): array
    {
        return Str::of($value)
            ->replace(["\r\n", "\r", "\n"], ',')
            ->explode(',')
            ->map(fn (string $item): string => trim($item))
            ->filter()
            ->unique()
            ->values()
            ->all();
    }

    private function uniqueSlug(string $value, ?Portfolio $project = null): string
    {
        $base = Str::slug($value) ?: 'project';
        $slug = $base;
        $counter = 2;

        while (
            Portfolio::query()
                ->where('slug', $slug)
                ->when($project, fn ($query) => $query->where('id', '!=', $project->getKey()))
                ->exists()
        ) {
            $slug = $base.'-'.$counter;
            $counter++;
        }

        return $slug;
    }

    private function deleteMedia(?string $path): void
    {
        if ($path) {
            Storage::disk('public')->delete($path);
        }
    }

    /**
     * @return array<string, mixed>
     */
    private function projectPayload(Portfolio $project): array
    {
        return [
            'id' => $project->id,
            'slug' => $project->slug,
            'name' => $project->name,
            'client_name' => $project->client_name,
            'type' => $project->type,
            'type_label' => Portfolio::TYPES[$project->type] ?? $project->type,
            'category' => $project->category,
            'summary' => $project->summary,
            'challenge' => $project->challenge,
            'result' => $project->result,
            'live_url' => $project->live_url,
            'video_url' => $project->video_url,
            'video_file_url' => $project->video_path ? Storage::url($project->video_path) : null,
            'cover_image_url' => $project->cover_image_path ? Storage::url($project->cover_image_path) : null,
            'stack' => $project->stack ?? [],
            'order' => $project->order,
            'is_published' => $project->is_published,
            'is_featured' => $project->is_featured,
            'updated_at' => $project->updated_at?->toIso8601String(),
        ];
    }
}
