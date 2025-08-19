<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\RawMaterial;
use App\Models\Customer;
use App\Models\ProductionBatch;
use App\Models\ProductionLog;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
\tpublic function overview()
\t{
\t\t$totals = [
\t\t\t'total_orders' => Order::count(),
\t\t\t'active_orders' => Order::whereIn('status', ['pending','approved','in_production','shipped'])->count(),
\t\t\t'inventory_items' => Product::count(),
\t\t\t'customers' => Customer::count(),
\t\t];

\t\t$recentOrders = Order::with('customer.user')
\t\t\t->orderBy('created_at','desc')
\t\t\t->take(5)
\t\t\t->get();

\t\t$lowStock = [
\t\t\t'raw_materials' => RawMaterial::lowStock()->take(5)->get(),
\t\t\t'products' => Product::lowStock()->take(5)->get(),
\t\t];

\t\t// Sales trend for last 12 months
\t\t$salesTrend = [];
\t\tfor ($i = 11; $i >= 0; $i--) {
\t\t\t$month = now()->subMonths($i)->format('Y-m');
\t\t\t$salesTrend[$month] = Order::whereBetween('order_date', [now()->subMonths($i)->startOfMonth(), now()->subMonths($i)->endOfMonth()])->sum('total_amount');
\t\t}

\t\t// Monthly production output: sum of quantity_completed per month (last 6 months)
\t\t$productionOutput = [];
\t\tfor ($i = 5; $i >= 0; $i--) {
\t\t\t$month = now()->subMonths($i)->format('Y-m');
\t\t\t$productionOutput[$month] = ProductionLog::whereBetween('log_date', [now()->subMonths($i)->startOfMonth(), now()->subMonths($i)->endOfMonth()])->sum('quantity_completed');
\t\t}

\t\t// Top selling products overall
\t\t$topSelling = \DB::table('order_items')
\t\t\t->join('products','order_items.product_id','=','products.id')
\t\t\t->select('products.name as product_name', \DB::raw('SUM(order_items.quantity) as total_quantity'))
\t\t\t->groupBy('products.id','products.name')
\t\t\t->orderByDesc('total_quantity')
\t\t\t->limit(5)
\t\t\t->get();

\t\treturn response()->json([
\t\t\t'totals' => $totals,
\t\t\t'recent_orders' => $recentOrders,
\t\t\t'low_stock' => $lowStock,
\t\t\t'charts' => [
\t\t\t\t'sales_trend' => $salesTrend,
\t\t\t\t'monthly_production_output' => $productionOutput,
\t\t\t\t'top_selling_products' => $topSelling,
\t\t\t]
\t\t]);
\t}
}

