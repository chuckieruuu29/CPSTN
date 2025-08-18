<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
	public function index(Request $request)
	{
		$customers = Customer::with('user')->orderBy('id','desc')->paginate($request->get('per_page', 15));
		return response()->json($customers);
	}

	public function show(Customer $customer)
	{
		return response()->json($customer->load('user'));
	}

	public function store(Request $request)
	{
		$request->validate([
			'name' => 'required|string',
			'email' => 'required|email|unique:users,email',
			'phone' => 'nullable|string',
			'address' => 'nullable|string',
			'company_name' => 'nullable|string',
			'tax_id' => 'nullable|string',
			'billing_address' => 'nullable|string',
			'shipping_address' => 'nullable|string'
		]);

		$user = User::create([
			'name' => $request->name,
			'email' => $request->email,
			'password' => bcrypt(str()->random(12)),
			'role' => 'customer',
			'phone' => $request->phone,
			'address' => $request->address,
		]);

		$customer = Customer::create([
			'user_id' => $user->id,
			'company_name' => $request->company_name,
			'tax_id' => $request->tax_id,
			'billing_address' => $request->billing_address,
			'shipping_address' => $request->shipping_address,
		]);

		return response()->json($customer->load('user'), 201);
	}

	public function update(Request $request, Customer $customer)
	{
		$request->validate([
			'company_name' => 'nullable|string',
			'tax_id' => 'nullable|string',
			'billing_address' => 'nullable|string',
			'shipping_address' => 'nullable|string'
		]);

		$customer->update($request->only(['company_name','tax_id','billing_address','shipping_address']));
		if ($request->hasAny(['name','email','phone','address'])) {
			$customer->user->update($request->only(['name','email','phone','address']));
		}
		return response()->json($customer->load('user'));
	}

	public function destroy(Customer $customer)
	{
		$customer->delete();
		return response()->json(['message' => 'Deleted']);
	}
}

