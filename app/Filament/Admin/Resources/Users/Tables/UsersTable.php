<?php

namespace App\Filament\Admin\Resources\Users\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class UsersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('avatar')
                    ->label('Avatar')
                    ->circular()
                    ->size(40)
                    ->defaultImageUrl(fn ($record) => 
                        'https://ui-avatars.com/api/?name=' . urlencode($record?->name ?? 'User') . '&background=0D8F81&color=fff'
                    ),
                    
                TextColumn::make('name')
                    ->label('Name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->copyable()
                    ->copyMessage('Name copied'),
                    
                TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->sortable()
                    ->copyable()
                    ->copyMessage('Email copied')
                    ->icon('heroicon-m-envelope'),
                    
                TextColumn::make('phone')
                    ->label('Phone')
                    ->searchable()
                    ->toggleable()
                    ->icon('heroicon-m-phone')
                    ->placeholder('No phone'),
                    
                BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'success' => 'active',
                        'warning' => 'inactive',
                        'danger' => 'banned',
                    ])
                    ->icons([
                        'heroicon-o-check-circle' => 'active',
                        'heroicon-o-clock' => 'inactive',
                        'heroicon-o-no-symbol' => 'banned',
                    ])
                    ->sortable(),
                    
                BadgeColumn::make('roles.name')
                    ->label('Roles')
                    ->formatStateUsing(fn ($state): string => match ($state) {
                        'super-admin' => 'Super Admin',
                        'admin' => 'Admin',
                        'customer' => 'Customer',
                        default => $state,
                    })
                    ->colors([
                        'danger' => 'super-admin',
                        'warning' => 'admin',
                        'success' => 'customer',
                    ])
                    ->icons([
                        'super-admin' => 'heroicon-o-shield-check',
                        'admin' => 'heroicon-o-user-circle',
                        'customer' => 'heroicon-o-user',
                    ])
                    ->separator(',')
                    ->toggleable(),
                    
                IconColumn::make('email_verified_at')
                    ->label('Verified')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-badge')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('danger')
                    ->sortable(query: function ($query, $direction) {
                        return $query->orderBy('email_verified_at', $direction);
                    }),
                    
                TextColumn::make('provider')
                    ->label('Provider')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->badge()
                    ->formatStateUsing(fn ($state) => $state ? ucfirst($state) : 'Local')
                    ->color(fn (string $state): string => match ($state) {
                        'google' => 'danger',
                        'facebook' => 'info',
                        'github' => 'gray',
                        default => 'secondary',
                    }),
                    
                TextColumn::make('last_login_at')
                    ->label('Last Login')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable()
                    ->placeholder('Never'),
                    
                TextColumn::make('created_at')
                    ->label('Joined')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(),
                    
                TextColumn::make('email_verified_at')
                    ->label('Verified At')
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
                SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'active' => 'Active',
                        'inactive' => 'Inactive',
                        'banned' => 'Banned',
                    ])
                    ->multiple()
                    ->searchable()
                    ->preload(),
                    
                SelectFilter::make('roles')
                    ->label('Roles')
                    ->relationship('roles', 'name')
                    ->multiple()
                    ->searchable()
                    ->preload()
                    ->options([
                        'super-admin' => 'Super Admin',
                        'admin' => 'Admin',
                        'customer' => 'Customer',
                    ]),
                    
                // Perbaikan untuk filter provider
                SelectFilter::make('provider')
                    ->label('Provider')
                    ->options([
                        'google' => 'Google',
                        'facebook' => 'Facebook',
                        'github' => 'GitHub',
                        'local' => 'Local',
                    ])
                    ->query(function (Builder $query, array $data) {
                        // Untuk single select (tidak multiple)
                        $value = $data['value'] ?? null;
                        
                        if ($value === 'local') {
                            $query->whereNull('provider');
                        } elseif ($value) {
                            $query->where('provider', $value);
                        }
                    })
                    ->searchable()
                    ->preload(),
                    
                // Atau alternatif untuk multiple select
                /*
                SelectFilter::make('provider')
                    ->label('Provider')
                    ->options([
                        'google' => 'Google',
                        'facebook' => 'Facebook',
                        'github' => 'GitHub',
                        'local' => 'Local',
                    ])
                    ->query(function (Builder $query, array $data) {
                        // Untuk multiple select
                        $values = $data['values'] ?? [];
                        
                        if (in_array('local', $values)) {
                            $query->where(function ($q) use ($values) {
                                $q->whereNull('provider');
                                $providers = array_filter($values, fn($v) => $v !== 'local');
                                if (!empty($providers)) {
                                    $q->orWhereIn('provider', $providers);
                                }
                            });
                        } elseif (!empty($values)) {
                            $query->whereIn('provider', $values);
                        }
                    })
                    ->multiple()
                    ->searchable()
                    ->preload(),
                */
                
                // Perbaikan untuk filter email verified
                SelectFilter::make('email_verified')
                    ->label('Email Verified')
                    ->options([
                        'verified' => 'Verified',
                        'unverified' => 'Unverified',
                    ])
                    ->query(function (Builder $query, array $data) {
                        $value = $data['value'] ?? null;
                        
                        if ($value === 'verified') {
                            $query->whereNotNull('email_verified_at');
                        } elseif ($value === 'unverified') {
                            $query->whereNull('email_verified_at');
                        }
                    }),
            ])
            ->recordActions([
                EditAction::make()
                    ->label('Edit')
                    ->icon('heroicon-m-pencil-square')
                    ->color('warning'),
                    
                DeleteAction::make()
                    ->label('Delete')
                    ->icon('heroicon-m-trash')
                    ->color('danger')
                    ->modalHeading('Delete User')
                    ->modalDescription('Are you sure you want to delete this user? This action cannot be undone.'),
                    
                RestoreAction::make()
                    ->label('Restore')
                    ->icon('heroicon-m-arrow-uturn-left')
                    ->color('success'),
                    
                ForceDeleteAction::make()
                    ->label('Force Delete')
                    ->icon('heroicon-m-x-circle')
                    ->color('danger')
                    ->modalHeading('Force Delete User'),
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