<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\User;
use App\Models\Package;
use Carbon\Carbon;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers = User::role('customer')->get();
        $packages = Package::where('status', 'active')->get();

        if ($customers->isEmpty() || $packages->isEmpty()) {
            $this->command->info('No customers or packages found. Skipping OrderSeeder.');
            return;
        }

        $statuses = ['pending', 'paid', 'in_progress', 'completed', 'cancelled'];
        $now = Carbon::now();

        $orders = [];

        // Create orders for each customer
        foreach ($customers as $index => $customer) {
            // Each customer gets 1-3 orders
            $numOrders = rand(1, 3);

            for ($i = 0; $i < $numOrders; $i++) {
                $package = $packages->random();
                $status = $statuses[array_rand($statuses)];
                $createdAt = Carbon::now()->subDays(rand(1, 60));

                $orderData = [
                    'user_id' => $customer->id,
                    'package_id' => $package->id,
                    'order_number' => 'ORD-' . strtoupper(uniqid()),
                    'status' => $status,
                    'total_price' => $package->price,
                    'notes' => rand(0, 1) ? 'Customer notes: ' . fake()->sentence() : null,
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ];

                // Set timestamps based on status
                switch ($status) {
                    case 'paid':
                        $orderData['paid_at'] = $createdAt->copy()->addHours(rand(1, 24));
                        $orderData['updated_at'] = $orderData['paid_at'];
                        break;
                    case 'in_progress':
                        $orderData['paid_at'] = $createdAt->copy()->addHours(rand(1, 24));
                        $orderData['started_at'] = $orderData['paid_at']->copy()->addDays(rand(1, 3));
                        $orderData['updated_at'] = $orderData['started_at'];
                        break;
                    case 'completed':
                        $orderData['paid_at'] = $createdAt->copy()->addHours(rand(1, 24));
                        $orderData['started_at'] = $orderData['paid_at']->copy()->addDays(rand(1, 3));
                        $orderData['completed_at'] = $orderData['started_at']->copy()->addDays($package->duration ?? rand(10, 30));
                        $orderData['updated_at'] = $orderData['completed_at'];
                        break;
                    case 'cancelled':
                        $orderData['paid_at'] = rand(0, 1) ? $createdAt->copy()->addHours(rand(1, 24)) : null;
                        $orderData['updated_at'] = $createdAt->copy()->addDays(rand(1, 10));
                        break;
                    // pending - no additional timestamps
                }

                $orders[] = $orderData;
            }
        }

        // Create specific orders for demonstration
        if (isset($customers[0])) {
            // Order with notes
            $orders[] = [
                'user_id' => $customers[0]->id,
                'package_id' => $packages->first()->id,
                'order_number' => 'ORD-DEMO-001',
                'status' => 'in_progress',
                'total_price' => $packages->first()->price,
                'notes' => 'Please prioritize this order. Need it for an important client presentation.',
                'paid_at' => $now->copy()->subDays(5),
                'started_at' => $now->copy()->subDays(3),
                'created_at' => $now->copy()->subDays(7),
                'updated_at' => $now->copy()->subDays(3),
            ];
        }

        if (isset($customers[1])) {
            // Recently completed order
            $orders[] = [
                'user_id' => $customers[1]->id,
                'package_id' => $packages->last()->id,
                'order_number' => 'ORD-DEMO-002',
                'status' => 'completed',
                'total_price' => $packages->last()->price,
                'notes' => null,
                'paid_at' => $now->copy()->subDays(30),
                'started_at' => $now->copy()->subDays(28),
                'completed_at' => $now->copy()->subDays(2),
                'created_at' => $now->copy()->subDays(35),
                'updated_at' => $now->copy()->subDays(2),
            ];
        }

        // Insert orders
        foreach ($orders as $orderData) {
            Order::create($orderData);
        }

        $this->command->info('Created ' . count($orders) . ' orders.');
    }
}