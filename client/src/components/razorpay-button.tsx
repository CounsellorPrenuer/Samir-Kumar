import { useEffect, useRef } from 'react';

interface RazorpayButtonProps {
  paymentButtonId: string;
}

export default function RazorpayButton({ paymentButtonId }: RazorpayButtonProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!formRef.current) return;

    // Check if script is already added to avoid duplicates if re-rendering
    if (formRef.current.querySelector('script')) return;

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.dataset.payment_button_id = paymentButtonId;
    script.async = true;

    formRef.current.appendChild(script);

    return () => {
      // Cleanup might be tricky as the script modifies the DOM, but usually simply clearing innerHTML works
      if (formRef.current) {
        formRef.current.innerHTML = '';
      }
    };
  }, [paymentButtonId]);

  return <form ref={formRef} className="flex justify-center" />;
}
