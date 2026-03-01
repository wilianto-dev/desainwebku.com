<?php

namespace App\Filament\Admin\Resources\Packages\Pages;

use App\Filament\Admin\Resources\Packages\PackageResource;
use Filament\Resources\Pages\CreateRecord;

class CreatePackage extends CreateRecord
{
    protected static string $resource = PackageResource::class;
    
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
    
    protected function getCreatedNotificationTitle(): ?string
    {
        return 'Package created successfully';
    }
    
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        // Generate slug if not provided
        if (!isset($data['slug']) && isset($data['name'])) {
            $data['slug'] = str()->slug($data['name']);
        }
        
        // Jika tidak ada short_description, gunakan name sebagai default
        if (!isset($data['short_description']) && isset($data['name'])) {
            $data['short_description'] = $data['name'];
        }
        
        // Jika tidak ada description, buat default
        if (!isset($data['description']) && isset($data['name'])) {
            $data['description'] = 'Detail layanan untuk ' . $data['name'];
        }
        
        // Features sudah dalam format array dari Repeater, 
        // tidak perlu di-encode karena model sudah casts 'array'
        
        return $data;
    }
}