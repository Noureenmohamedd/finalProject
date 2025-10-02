"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Order } from '@/types/order.t';
import { toast } from 'sonner';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
  
    if (status === 'loading') return;
    
    if (status === 'unauthenticated') {
      toast.error('Please login to view your orders', {
        position: 'top-center',
        duration: 2000
      });
      router.push('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        
        const ordersData = response.data?.data || response.data || [];
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (error: any) {
        console.error('Error fetching orders:', error);
        if (error?.response?.status === 401) {
          toast.error('Please login to view your orders', {
            position: 'top-center',
            duration: 2000
          });
          router.push('/login');
        } else {
          toast.error(error?.response?.data?.error || 'Failed to load orders', {
            position: 'top-center',
            duration: 2000
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchOrders();
    }
  }, [status, router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (order: Order) => {
    if (order.isDelivered) return 'text-green-600 bg-green-100';
    if (order.isPaid) return 'text-blue-600 bg-blue-100';
    return 'text-orange-600 bg-orange-100';
  };

  const getStatusText = (order: Order) => {
    if (order.isDelivered) return 'Delivered';
    if (order.isPaid) return 'Shipped - On the way';
    return 'Processing';
  };

  const getPaymentMethodIcon = (method: string) => {
    return method.toLowerCase() === 'cash' ? 
      '💵' : '💳';
  };

  const getPaymentMethodText = (method: string) => {
    return method.toLowerCase() === 'cash' ? 
      'Cash on Delivery' : 'Online Payment';
  };

  
  if (status === 'loading') {
    return (
      <div className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 text-center">
        <div className="animate-pulse">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

 
  if (isLoading) {
    return (
      <div className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <div className="space-y-4">
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 text-center">
        <div className="bg-gray-50 rounded-lg p-12">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">No Orders Yet</h2>
          <p className="text-gray-500 mb-6">You haven't placed any orders yet. Start shopping to see your orders here!</p>
          <Link href="/products">
            <Button className="bg-green-700 hover:bg-green-800 text-white px-8 py-3">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
        
      </div>

      <div className="space-y-6">
        {orders.filter(order => order && order._id).map((order) => (
          <Card key={order._id} className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    Order #{order.id}
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order)}`}>
                    {getStatusText(order)}
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border">
                    <span className="text-lg">{getPaymentMethodIcon(order.paymentMethodType)}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {getPaymentMethodText(order.paymentMethodType)}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Items Ordered:</h3>
                {(order.cartItems || []).map((item) => (
                  <div key={item._id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 line-clamp-1">
                        {item.product?.title || 'Product'}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {item.product?.category?.name || 'Category'} • {item.product?.brand?.name || 'Brand'}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-600">Qty: {item.count || 0}</span>
                        <span className="text-sm font-medium text-green-600">
                          {item.price || 0} EGP each
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        {(item.price || 0) * (item.count || 0)} EGP
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span>{(order.totalOrderPrice || 0) - (order.taxPrice || 0) - (order.shippingPrice || 0)} EGP</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax:</span>
                      <span>{order.taxPrice || 0} EGP</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping:</span>
                      <span>{order.shippingPrice || 0} EGP</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-1">
                      <span>Total:</span>
                      <span className="text-green-600">{order.totalOrderPrice || 0} EGP</span>
                    </div>
                  </div>

                  
                </div>
              </div>

            
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
