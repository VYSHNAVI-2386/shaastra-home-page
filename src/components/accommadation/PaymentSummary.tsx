import React from "react";

type PaymentSummaryProps = {
  totalPeople: number;
  termsAccepted: boolean;
  onAttemptPay?: () => boolean | void;
  paymentError?: string | null;
};

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  totalPeople,
  termsAccepted,
  onAttemptPay,
  paymentError,
}) => {
  const costPerPerson = 850;
  const platformFee = 22;
  const totalCost = totalPeople * costPerPerson;
  const amountPayable = totalCost + platformFee;

  const handlePayment = () => {
    // delegate validation/payment to parent
    onAttemptPay && onAttemptPay();
  };

  return (
    <div className="bg-pink/10 backdrop-blur-[10px] border border-white/30  p-6 space-y-4">
      <h3 className="text-white text-2xl md:text-4xl  mb-4">Payment Summary</h3>

      <div className="space-y-3 text-white text-lg md:text-xl">
        <div className="flex justify-between">
          <span className="">Total People:</span>
          <span className="">{totalPeople}</span>
        </div>
        <div className="flex justify-between">
          <span>Cost per Person:</span>
          <span className="">₹{costPerPerson}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Cost:</span>
          <span className="">₹{totalCost}</span>
        </div>
        <div className="flex justify-between ">
          <span>Platform Fee:</span>
          <span className="">₹{platformFee}</span>
        </div>
        <div className="border-t border-white/30 pt-3 flex justify-between text-xl md:text-2xl">
          <span className="">Amount Payable:</span>
          <span className=" text-green-300">₹{amountPayable}</span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={!termsAccepted}
        className={`w-full py-3  font-bold text-white text-lg md:text-xl transition ${
          termsAccepted
            ? "bg-amber-600 hover:bg-amber-700 cursor-pointer"
            : "bg-amber-900 cursor-not-allowed opacity-50"
        }`}
      >
        Pay Now
      </button>

      {paymentError && (
        <p className="text-red-300 text-base md:text-lg text-center">
          {paymentError}
        </p>
      )}
    </div>
  );
};
export default PaymentSummary;
