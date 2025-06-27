'use client';

import axios from 'axios';
import { Button } from '../ui/button';
import { showToast } from '@/hooks/filtered-toast';
import { useEffect, useState } from 'react';

interface Session {
  email: string;
}

const TestUrl = () => {

    const email = "metreshekhar249@gmail.com"
    const totalPrice = 1

  const handleContinue = async () => {
    try {
      // Dummy placeholders for now — you should replace them with real data
      const items = [{ name: 'Product D', qty: 1 }];
      const amountToPay = 500;

      const response = await axios.post(
        '/api/bun/user/auth/dummy/payment',
        {
          items,
          totalPrice,
          email,
        },
        { withCredentials: true }
      );

      if (response.data.error || !response.data.data) {
        showToast({
          title: 'Payment Error',
          description: response.data.error || 'Something went wrong.',
        });
        return;
      }

      // ✅ Submit PayU form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://secure.payu.in/_payment'; // live PayU endpoint

      Object.entries(response.data.data.paymentParams).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err: any) {
      console.error('Payment error:', err);

      showToast({
        title: 'Error',
        description: err?.response?.data?.message || 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div>
      <Button onClick={handleContinue}>Click To Pay</Button>
    </div>
  );
};

export default TestUrl;
