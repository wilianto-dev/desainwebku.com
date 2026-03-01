<?php

namespace App\Filament\Admin\Resources\Users\Schemas;

use Filament\Forms;
use Filament\Resources\Pages\EditRecord;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Illuminate\Validation\Rules\Password;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('User Management')
                    ->tabs([
                        Tab::make('User Details')
                            ->icon('heroicon-m-user')
                            ->schema([
                                Section::make('Basic Information')
                                    ->description('Enter the basic user details')
                                    ->icon('heroicon-m-information-circle')
                                    ->schema([
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\TextInput::make('name')
                                                    ->label('Full Name')
                                                    ->required()
                                                    ->maxLength(255)
                                                    ->placeholder('Enter full name')
                                                    ->helperText('User\'s full name'),
                                                    
                                                Forms\Components\TextInput::make('email')
                                                    ->label('Email Address')
                                                    ->email()
                                                    ->required()
                                                    ->maxLength(255)
                                                    ->unique(ignoreRecord: true)
                                                    ->placeholder('user@example.com')
                                                    ->helperText('Must be a valid email address')
                                                    ->prefixIcon('heroicon-m-envelope'),
                                            ]),
                                            
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\TextInput::make('phone')
                                                    ->label('Phone Number')
                                                    ->tel()
                                                    ->maxLength(20)
                                                    ->placeholder('+6281234567890')
                                                    ->helperText('Optional: Contact number')
                                                    ->prefixIcon('heroicon-m-phone'),
                                                    
                                                Forms\Components\Select::make('status')
                                                    ->label('Status')
                                                    ->options([
                                                        'active' => 'Active',
                                                        'inactive' => 'Inactive',
                                                        'banned' => 'Banned',
                                                    ])
                                                    ->default('active')
                                                    ->required()
                                                    ->native(false)
                                                    ->helperText('Set user account status'),
                                            ]),
                                            
                                        // Role selection - Perbaikan untuk mengatasi error invalid
                                        Grid::make(1)
                                            ->schema([
                                                Forms\Components\Select::make('roles')
                                                    ->label('Roles')
                                                    ->relationship('roles', 'name')
                                                    ->multiple()
                                                    ->preload()
                                                    ->searchable()
                                                    ->options(function () {
                                                        $user = auth()->user();
                                                        
                                                        // Default options untuk admin dan customer
                                                        $options = [
                                                            'admin' => 'Admin',
                                                            'customer' => 'Customer',
                                                        ];
                                                        
                                                        // Hanya super-admin yang bisa membuat/mengedit super-admin lain
                                                        if ($user && $user->hasRole('super-admin')) {
                                                            $options = ['super-admin' => 'Super Admin'] + $options;
                                                        }
                                                        
                                                        return $options;
                                                    })
                                                    ->required()
                                                    ->helperText('Assign one or more roles to the user')
                                                    ->default(['customer']),
                                            ]),
                                    ]),
                                    
                                Section::make('Authentication')
                                    ->description('User login credentials')
                                    ->icon('heroicon-m-lock-closed')
                                    ->schema([
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\TextInput::make('password')
                                                    ->label('Password')
                                                    ->password()
                                                    ->revealable()
                                                    ->required(fn (string $operation): bool => $operation === 'create')
                                                    ->rule(Password::default())
                                                    ->same('password_confirmation')
                                                    ->validationAttribute('password')
                                                    ->helperText(fn (string $operation): string => 
                                                        $operation === 'create' 
                                                            ? 'Minimum 8 characters' 
                                                            : 'Leave empty to keep current password'
                                                    ),
                                                    
                                                Forms\Components\TextInput::make('password_confirmation')
                                                    ->label('Confirm Password')
                                                    ->password()
                                                    ->revealable()
                                                    ->required(fn (string $operation): bool => $operation === 'create')
                                                    ->dehydrated(false),
                                            ]),
                                    ])
                                    ->collapsible()
                                    ->collapsed(fn (string $operation): bool => $operation === 'edit'),
                            ]),
                            
                        Tab::make('Profile')
                            ->icon('heroicon-m-user-circle')
                            ->schema([
                                Section::make('Profile Information')
                                    ->description('User profile and social login details')
                                    ->icon('heroicon-m-identification')
                                    ->schema([
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\TextInput::make('provider')
                                                    ->label('Auth Provider')
                                                    ->placeholder('google, facebook, github')
                                                    ->helperText('OAuth provider if applicable')
                                                    ->disabled()
                                                    ->dehydrated(false)
                                                    ->visibleOn('edit'),
                                                    
                                                Forms\Components\TextInput::make('provider_id')
                                                    ->label('Provider ID')
                                                    ->placeholder('Provider user ID')
                                                    ->helperText('ID from OAuth provider')
                                                    ->disabled()
                                                    ->dehydrated(false)
                                                    ->visibleOn('edit'),
                                            ]),
                                            
                                        Forms\Components\FileUpload::make('avatar')
                                            ->label('Avatar')
                                            ->image()
                                            ->directory('avatars')
                                            ->imageEditor()
                                            ->imageEditorAspectRatios([
                                                '1:1',
                                            ])
                                            ->circleCropper()
                                            ->maxSize(2048)
                                            ->helperText('Upload profile picture (max 2MB)')
                                            ->columnSpanFull(),
                                    ]),
                                    
                                Section::make('Timestamps')
                                    ->description('System timestamps')
                                    ->icon('heroicon-m-clock')
                                    ->schema([
                                        Grid::make(3)
                                            ->schema([
                                                Forms\Components\DateTimePicker::make('email_verified_at')
                                                    ->label('Email Verified At')
                                                    ->native(false)
                                                    ->displayFormat('d M Y H:i')
                                                    ->placeholder('Not verified')
                                                    ->helperText('When email was verified'),
                                                    
                                                Forms\Components\DateTimePicker::make('last_login_at')
                                                    ->label('Last Login')
                                                    ->native(false)
                                                    ->displayFormat('d M Y H:i')
                                                    ->placeholder('Never logged in')
                                                    ->helperText('Last login timestamp')
                                                    ->disabled()
                                                    ->dehydrated(false)
                                                    ->visibleOn('edit'),
                                            ]),
                                    ])
                                    ->visibleOn('edit')
                                    ->collapsible()
                                    ->collapsed(),
                            ]),
                            
                        Tab::make('Additional Info')
                            ->icon('heroicon-m-paper-clip')
                            ->schema([
                                Section::make('System Information')
                                    ->description('Auto-generated system data')
                                    ->icon('heroicon-m-cpu-chip')
                                    ->schema([
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\Placeholder::make('created_at')
                                                    ->label('Created At')
                                                    ->content(fn ($record): string => $record?->created_at?->format('d M Y H:i') ?? '-'),
                                                    
                                                Forms\Components\Placeholder::make('updated_at')
                                                    ->label('Last Updated')
                                                    ->content(fn ($record): string => $record?->updated_at?->format('d M Y H:i') ?? '-'),
                                            ]),
                                            
                                        Grid::make(2)
                                            ->schema([
                                                Forms\Components\Placeholder::make('orders_count')
                                                    ->label('Total Orders')
                                                    ->content(fn ($record): string => $record?->orders()->count() ?? '0'),
                                            ]),
                                    ])
                                    ->visibleOn('edit'),
                            ]),
                    ])
                    ->columnSpanFull()
                    ->persistTabInQueryString(),
            ]);
    }
}