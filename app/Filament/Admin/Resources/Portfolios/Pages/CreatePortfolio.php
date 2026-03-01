<?php

namespace App\Filament\Admin\Resources\Portfolios\Pages;

use App\Filament\Admin\Resources\Portfolios\PortfolioResource;
use Filament\Resources\Pages\CreateRecord;

class CreatePortfolio extends CreateRecord
{
    protected static string $resource = PortfolioResource::class;
    
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
    
    protected function getCreatedNotificationTitle(): ?string
    {
        return 'Portfolio created successfully';
    }
    
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        // Generate slug if not provided
        if (!isset($data['slug']) && isset($data['title'])) {
            $data['slug'] = str()->slug($data['title']);
        }
        
        // Handle technologies as JSON
        if (isset($data['technologies_list']) && is_array($data['technologies_list'])) {
            $technologies = [];
            foreach ($data['technologies_list'] as $item) {
                if (isset($item['technology'])) {
                    $technologies[] = $item['technology'];
                }
            }
            $data['technologies'] = json_encode($technologies);
            unset($data['technologies_list']);
        }
        
        // Handle results as JSON
        if (isset($data['results_list']) && is_array($data['results_list'])) {
            $results = [];
            foreach ($data['results_list'] as $item) {
                if (isset($item['result'])) {
                    $results[] = $item['result'];
                }
            }
            $data['results'] = json_encode($results);
            unset($data['results_list']);
        }
        
        // Set published_at null if status is draft
        if (isset($data['status']) && $data['status'] === 'draft') {
            $data['published_at'] = null;
        }
        
        return $data;
    }
}