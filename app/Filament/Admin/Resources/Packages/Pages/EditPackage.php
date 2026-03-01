<?php

namespace App\Filament\Admin\Resources\Packages\Pages;

use App\Filament\Admin\Resources\Packages\PackageResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPackage extends EditRecord
{
    protected static string $resource = PackageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
                ->label('Delete')
                ->icon('heroicon-m-trash')
                ->color('danger')
                ->modalHeading('Delete Package')
                ->modalDescription('Are you sure you want to delete this package? This action cannot be undone.'),
                
            Actions\ForceDeleteAction::make()
                ->label('Force Delete')
                ->icon('heroicon-m-x-circle')
                ->color('danger')
                ->modalHeading('Force Delete Package')
                ->modalDescription('Are you sure you want to force delete this package? This action cannot be undone.'),
                
            Actions\RestoreAction::make()
                ->label('Restore')
                ->icon('heroicon-m-arrow-uturn-left')
                ->color('success'),
        ];
    }
    
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
    
    protected function getSavedNotificationTitle(): ?string
    {
        return 'Package updated successfully';
    }
    
    protected function mutateFormDataBeforeSave(array $data): array
    {
        // Generate slug if not provided
        if (!isset($data['slug']) && isset($data['name'])) {
            $data['slug'] = str()->slug($data['name']);
        }
        
        return $data;
    }
}