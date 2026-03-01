<?php

namespace App\Filament\Admin\Resources\Orders\Pages;

use App\Filament\Admin\Resources\Orders\OrderResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListOrders extends ListRecords
{
    protected static string $resource = OrderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->label('New Order')
                ->icon('heroicon-m-plus')
                ->color('success')
                ->mutateFormDataUsing(function (array $data): array {
                    if (!isset($data['order_number'])) {
                        $data['order_number'] = 'ORD-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -4));
                    }
                    
                    return $data;
                }),
        ];
    }
    
    protected function getHeaderWidgets(): array
    {
        return [
            // Tambahkan widget stats jika diperlukan
        ];
    }
}