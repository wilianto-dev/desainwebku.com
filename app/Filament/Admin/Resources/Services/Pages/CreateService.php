<?php

namespace App\Filament\Admin\Resources\Services\Pages;

use App\Filament\Admin\Resources\Services\ServiceResource;
use Filament\Resources\Pages\CreateRecord;

class CreateService extends CreateRecord
{
    protected static string $resource = ServiceResource::class;
    
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
    
    protected function getCreatedNotificationTitle(): ?string
    {
        return 'Service created successfully';
    }
    
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        // Generate slug if not provided
        if (!isset($data['slug']) && isset($data['title'])) {
            $data['slug'] = str()->slug($data['title']);
        }
        
        // Set default values sesuai seeder
        if (!isset($data['is_featured'])) {
            $data['is_featured'] = true;
        }
        
        if (!isset($data['short_description']) && isset($data['title'])) {
            $data['short_description'] = $data['title'];
        }
        
        return $data;
    }
}