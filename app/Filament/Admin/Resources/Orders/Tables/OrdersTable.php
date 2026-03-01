<?php

namespace App\Filament\Admin\Resources\Orders\Tables;

use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Filters\SelectFilter;

// Actions sudah di Filament\Actions di v5
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreBulkAction;

class OrdersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('order_number')
                    ->label('Order Number')
                    ->searchable()
                    ->sortable()
                    ->copyable()
                    ->copyMessage('Order number copied')
                    ->weight('bold'),

                TextColumn::make('user.name')
                    ->label('Customer')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('package.name')
                    ->label('Package')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'danger' => 'cancelled',
                        'warning' => 'pending',
                        'info' => 'paid',
                        'primary' => 'in_progress',
                        'success' => 'completed',
                    ])
                    ->icons([
                        'heroicon-o-x-circle' => 'cancelled',
                        'heroicon-o-clock' => 'pending',
                        'heroicon-o-check-circle' => 'paid',
                        'heroicon-o-arrow-path' => 'in_progress',
                        'heroicon-o-check-badge' => 'completed',
                    ])
                    ->sortable(),

                TextColumn::make('total_price')
                    ->label('Total Price')
                    ->money('IDR')
                    ->sortable()
                    ->weight('bold')
                    ->alignRight(),

                TextColumn::make('paid_at')
                    ->label('Paid At')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('started_at')
                    ->label('Started At')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('completed_at')
                    ->label('Completed At')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('created_at')
                    ->label('Created At')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('updated_at')
                    ->label('Updated At')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('deleted_at')
                    ->label('Deleted At')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                TrashedFilter::make(),
                SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Pending',
                        'paid' => 'Paid',
                        'in_progress' => 'In Progress',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ])
                    ->multiple()
                    ->searchable()
                    ->preload(),
            ])
            ->recordActions([
                EditAction::make()
                    ->label('Edit')
                    ->icon('heroicon-m-pencil-square')
                    ->color('warning'),

                DeleteAction::make()
                    ->label('Delete')
                    ->icon('heroicon-m-trash')
                    ->color('danger'),

                RestoreAction::make()
                    ->label('Restore')
                    ->icon('heroicon-m-arrow-uturn-left')
                    ->color('success'),

                ForceDeleteAction::make()
                    ->label('Force Delete')
                    ->icon('heroicon-m-x-circle')
                    ->color('danger')
                    ->modalHeading('Force Delete Order'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->label('Delete Selected')
                        ->icon('heroicon-m-trash'),
                    ForceDeleteBulkAction::make()
                        ->label('Force Delete Selected')
                        ->icon('heroicon-m-x-circle'),
                    RestoreBulkAction::make()
                        ->label('Restore Selected')
                        ->icon('heroicon-m-arrow-uturn-left'),
                ])
                ->label('Bulk Actions')
                ->icon('heroicon-m-ellipsis-horizontal'),
            ])
            ->defaultSort('created_at', 'desc')
            ->poll('60s')
            ->striped()
            ->paginated([10, 25, 50, 100])
            ->defaultPaginationPageOption(25);
    }
}