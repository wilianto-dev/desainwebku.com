<?php

namespace App\Filament\Admin\Resources\Portfolios\Pages;

use App\Filament\Admin\Resources\Portfolios\PortfolioResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPortfolios extends ListRecords
{
    protected static string $resource = PortfolioResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->label('New Portfolio')
                ->icon('heroicon-m-plus')
                ->color('success'),
        ];
    }
}