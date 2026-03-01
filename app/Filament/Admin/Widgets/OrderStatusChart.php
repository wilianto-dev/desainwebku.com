<?php

namespace App\Filament\Admin\Widgets;

use App\Models\Order;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\Concerns\InteractsWithPageFilters;

class OrderStatusChart extends ChartWidget
{
    use InteractsWithPageFilters;
    
    protected static ?int $sort = 3;

    protected function getData(): array
    {
        $pending = Order::where('status', 'pending')->count();
        $paid = Order::where('status', 'paid')->count();
        $inProgress = Order::where('status', 'in_progress')->count();
        $completed = Order::where('status', 'completed')->count();
        $cancelled = Order::where('status', 'cancelled')->count();

        return [
            'datasets' => [
                [
                    'label' => 'Orders',
                    'data' => [$pending, $paid, $inProgress, $completed, $cancelled],
                    'backgroundColor' => [
                        '#F59E0B',
                        '#3B82F6',
                        '#8B5CF6',
                        '#10B981',
                        '#EF4444',
                    ],
                    'borderColor' => '#FFFFFF',
                ],
            ],
            'labels' => ['Pending', 'Paid', 'In Progress', 'Completed', 'Cancelled'],
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'position' => 'bottom',
                ],
            ],
        ];
    }

    public function getHeading(): string
    {
        return 'Order Status Distribution';
    }
}