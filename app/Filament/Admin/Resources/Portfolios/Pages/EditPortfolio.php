<?php

namespace App\Filament\Admin\Resources\Portfolios\Pages;

use App\Filament\Admin\Resources\Portfolios\PortfolioResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPortfolio extends EditRecord
{
    protected static string $resource = PortfolioResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
                ->label('Delete')
                ->icon('heroicon-m-trash')
                ->color('danger')
                ->modalHeading('Delete Portfolio')
                ->modalDescription('Are you sure you want to delete this portfolio? This action cannot be undone.'),
                
            Actions\ForceDeleteAction::make()
                ->label('Force Delete')
                ->icon('heroicon-m-x-circle')
                ->color('danger')
                ->modalHeading('Force Delete Portfolio')
                ->modalDescription('Are you sure you want to force delete this portfolio? This action cannot be undone.'),
                
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
        return 'Portfolio updated successfully';
    }
}