<?php

namespace App\Filament\Admin\Resources\Settings\Pages;

use App\Filament\Admin\Resources\Settings\SettingResource;
use Filament\Resources\Pages\CreateRecord;

class CreateSetting extends CreateRecord
{
    protected static string $resource = SettingResource::class;
    
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
    
    protected function getCreatedNotificationTitle(): ?string
    {
        return 'Setting created successfully';
    }
    
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        // Handle JSON value from repeater
        if (isset($data['type']) && $data['type'] === 'json' && isset($data['json_value'])) {
            if (is_array($data['json_value'])) {
                // Convert key-value pairs from repeater to associative array
                $jsonData = [];
                foreach ($data['json_value'] as $item) {
                    if (isset($item['key']) && isset($item['value'])) {
                        $jsonData[$item['key']] = $item['value'];
                    }
                }
                $data['value'] = json_encode($jsonData);
            }
            unset($data['json_value']);
        }
        
        // Handle boolean value
        if (isset($data['type']) && $data['type'] === 'boolean') {
            $data['value'] = $data['value'] ? 'true' : 'false';
        }
        
        return $data;
    }
}