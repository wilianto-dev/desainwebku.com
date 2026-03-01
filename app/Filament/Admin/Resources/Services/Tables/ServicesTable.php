<?php

namespace App\Filament\Admin\Resources\Services\Tables;

use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Filters\SelectFilter;

// Actions dari Filament\Actions di v5
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreBulkAction;

class ServicesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Title')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->copyable()
                    ->copyMessage('Title copied'),
                    
                TextColumn::make('slug')
                    ->label('Slug')
                    ->searchable()
                    ->sortable()
                    ->copyable()
                    ->copyMessage('Slug copied')
                    ->toggleable(isToggledHiddenByDefault: true),
                    
                TextColumn::make('icon')
                    ->label('Icon')
                    ->searchable()
                    ->toggleable()
                    ->formatStateUsing(function ($state) {
                        if (!$state) return '-';
                        
                        // Map icon to emoji for better display
                        $iconMap = [
                            // Font Awesome
                            'fas fa-building' => '🏢',
                            'fas fa-shopping-cart' => '🛒',
                            'fas fa-laptop-code' => '💻',
                            'fas fa-mobile-alt' => '📱',
                            'fas fa-paint-brush' => '🎨',
                            'fas fa-tools' => '🔧',
                            'fas fa-globe' => '🌐',
                            'fas fa-chart-line' => '📈',
                            'fas fa-cogs' => '⚙️',
                            'fas fa-database' => '🗄️',
                            'fas fa-cloud' => '☁️',
                            'fas fa-shield-alt' => '🛡️',
                            'fas fa-rocket' => '🚀',
                            'fas fa-star' => '⭐',
                            'fas fa-heart' => '❤️',
                            'fas fa-users' => '👥',
                            'fas fa-user-tie' => '👔',
                            'fas fa-clock' => '⏰',
                            'fas fa-phone' => '📞',
                            'fas fa-envelope' => '📧',
                            'fas fa-map-marker-alt' => '📍',
                            'fas fa-file-alt' => '📄',
                            'fas fa-image' => '🖼️',
                            'fas fa-video' => '🎥',
                            'fas fa-camera' => '📷',
                            'fas fa-search' => '🔍',
                            'fas fa-chart-pie' => '🥧',
                            'fas fa-chart-bar' => '📊',
                            'fas fa-wallet' => '👛',
                            'fas fa-credit-card' => '💳',
                            'fas fa-money-bill' => '💰',
                            'fas fa-truck' => '🚚',
                            'fas fa-box' => '📦',
                            'fas fa-tag' => '🏷️',
                            'fas fa-percent' => '💯',
                            'fas fa-bolt' => '⚡',
                            'fas fa-fire' => '🔥',
                            'fas fa-bell' => '🔔',
                            'fas fa-calendar' => '📅',
                            'fas fa-paper-plane' => '✈️',
                            'fas fa-thumbs-up' => '👍',
                            'fas fa-thumbs-down' => '👎',
                            'fas fa-check-circle' => '✅',
                            'fas fa-times-circle' => '❌',
                            'fas fa-exclamation-circle' => '⚠️',
                            'fas fa-info-circle' => 'ℹ️',
                            'fas fa-question-circle' => '❓',
                            
                            // Heroicons
                            'BuildingOfficeIcon' => '🏢',
                            'ShoppingCartIcon' => '🛒',
                            'CodeBracketIcon' => '💻',
                            'DevicePhoneMobileIcon' => '📱',
                            'PaintBrushIcon' => '🎨',
                            'WrenchScrewdriverIcon' => '🔧',
                            'CpuChipIcon' => '⚡',
                            'ServerIcon' => '🖥️',
                            'GlobeAltIcon' => '🌐',
                            'ChartBarSquareIcon' => '📊',
                            'MagnifyingGlassIcon' => '🔍',
                            'ShieldCheckIcon' => '🛡️',
                            'LockClosedIcon' => '🔒',
                            'RocketLaunchIcon' => '🚀',
                            'SparklesIcon' => '✨',
                            'BoltIcon' => '⚡',
                            'UsersIcon' => '👥',
                            'TrophyIcon' => '🏆',
                            'ClockIcon' => '⏰',
                            'CurrencyDollarIcon' => '💰',
                            'ChatBubbleLeftRightIcon' => '💬',
                            'PhoneIcon' => '📞',
                            'BriefcaseIcon' => '💼',
                            'UserCircleIcon' => '👤',
                            'EnvelopeIcon' => '📧',
                            'MapPinIcon' => '📍',
                            'DocumentTextIcon' => '📄',
                            'StarIcon' => '⭐',
                            
                            // React Icons
                            'SiLaravel' => '🔥',
                            'SiReact' => '⚛️',
                            'SiTailwindcss' => '🎨',
                            'SiInertia' => '⚡',
                            'SiVuedotjs' => '🟢',
                            'SiMysql' => '🐬',
                            'SiPostgresql' => '🐘',
                            'SiDocker' => '🐳',
                            'SiAmazonwebservices' => '☁️',
                            'SiPhp' => '🐘',
                            'SiJavascript' => '📜',
                            'SiTypescript' => '🔷',
                            'SiHtml5' => '🌐',
                            'SiCss3' => '🎨',
                            'SiNodejs' => '🟢',
                            'SiPython' => '🐍',
                            'SiJava' => '☕',
                            'SiKotlin' => '📱',
                            'SiSwift' => '🐦',
                            'SiFlutter' => '🦋',
                            'SiAndroid' => '🤖',
                            'SiApple' => '🍎',
                            'SiWindows' => '🪟',
                            'SiLinux' => '🐧',
                            'SiGithub' => '🐙',
                            'SiGitlab' => '🦊',
                            'SiJira' => '📊',
                            'SiTrello' => '📋',
                            'SiSlack' => '💬',
                            'SiDiscord' => '💬',
                            'SiFigma' => '🎨',
                            'SiAdobe' => '🎭',
                            'SiCanva' => '🎨',
                        ];
                        
                        $emoji = $iconMap[$state] ?? '🔹';
                        $iconType = '';
                        
                        if (str_starts_with($state, 'fas ')) {
                            $iconType = 'FA';
                        } elseif (str_starts_with($state, 'Si')) {
                            $iconType = 'React';
                        } else {
                            $iconType = 'Heroicon';
                        }
                        
                        return "<span class=\"text-xl\">{$emoji}</span> <span class=\"text-xs text-gray-500 ml-1\">({$iconType})</span>";
                    })
                    ->html(),
                    
                BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'success' => 'active',
                        'danger' => 'inactive',
                    ])
                    ->icons([
                        'heroicon-o-check-circle' => 'active',
                        'heroicon-o-x-circle' => 'inactive',
                    ])
                    ->sortable(),
                    
                IconColumn::make('is_featured')
                    ->label('Featured')
                    ->boolean()
                    ->trueIcon('heroicon-o-star')
                    ->falseIcon('heroicon-o-star')
                    ->trueColor('warning')
                    ->falseColor('gray')
                    ->sortable(),
                    
                TextColumn::make('sort_order')
                    ->label('Sort Order')
                    ->numeric()
                    ->sortable()
                    ->alignRight()
                    ->toggleable(),
                    
                TextColumn::make('packages_count')
                    ->label('Packages')
                    ->counts('packages')
                    ->sortable()
                    ->alignRight()
                    ->toggleable(),
                    
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
                        'active' => 'Active',
                        'inactive' => 'Inactive',
                    ])
                    ->multiple()
                    ->searchable()
                    ->preload(),
                    
                SelectFilter::make('is_featured')
                    ->label('Featured')
                    ->options([
                        '1' => 'Featured',
                        '0' => 'Not Featured',
                    ]),
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
                    ->modalHeading('Force Delete Service'),
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
            ->defaultSort('sort_order', 'asc')
            ->poll('60s')
            ->striped()
            ->paginated([10, 25, 50, 100])
            ->defaultPaginationPageOption(25)
            ->reorderable('sort_order');
    }
}