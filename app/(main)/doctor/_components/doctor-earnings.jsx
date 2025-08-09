"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TrendingUp,
  Calendar,
  BarChart3,
  CreditCard,
  Loader2,
  AlertCircle,
  Coins,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { requestPayout } from "@/actions/payout";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

export function DoctorEarnings({ earnings, payouts = [] }) {
  const [showPayoutDialog, setShowPayoutDialog] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState("");

  const {
    thisMonthEarnings = 0,
    completedAppointments = 0,
    averageEarningsPerMonth = 0,
    availableCredits = 0,
    availablePayout = 0,
  } = earnings;

  // Custom hook for payout request
  const { loading, data, fn: submitPayoutRequest } = useFetch(requestPayout);

  // Check if there's any pending payout
  const pendingPayout = payouts.find(
    (payout) => payout.status === "PROCESSING"
  );

  const handlePayoutRequest = async (e) => {
    e.preventDefault();

    if (!paypalEmail) {
      toast.error("PayPal email is required");
      return;
    }

    const formData = new FormData();
    formData.append("paypalEmail", paypalEmail);

    await submitPayoutRequest(formData);
  };

  useEffect(() => {
    if (data?.success) {
      setShowPayoutDialog(false);
      setPaypalEmail("");
      toast.success("Payout request submitted successfully!");
    }
  }, [data]);

  const platformFee = availableCredits * 2; // $2 per credit




  {/* Reusable InfoBox Component */}
const InfoBox = ({ label, value, small = false }) => (
  <div>
    <p className="text-muted-foreground">{label}</p>
    <p className={`text-white font-medium ${small ? 'text-xs' : ''}`}>{value}</p>
  </div>
);



const InfoRow = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-white font-medium">{value}</span>
  </div>
);


  return (
    <div className="space-y-6">
      {/* Earnings Overview */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {[
    {
      label: "Available Credits",
      value: availableCredits,
      subText: `$${availablePayout.toFixed(2)} available for payout`,
      icon: <Coins className="h-6 w-6 text-emerald-400" />,
    },
    {
      label: "This Month",
      value: `$${thisMonthEarnings.toFixed(2)}`,
      icon: <TrendingUp className="h-6 w-6 text-emerald-400" />,
    },
    {
      label: "Total Appointments",
      value: completedAppointments,
      subText: "completed",
      icon: <Calendar className="h-6 w-6 text-emerald-400" />,
    },
    {
      label: "Avg/Month",
      value: `$${averageEarningsPerMonth.toFixed(2)}`,
      icon: <BarChart3 className="h-6 w-6 text-emerald-400" />,
    },
  ].map((card, index) => (
    <Card
      key={index}
      className="bg-gradient-to-br from-emerald-900/30 to-black/80 border border-emerald-900/25 rounded-2xl shadow-md hover:shadow-emerald-600/40 hover:scale-[1.03] transform transition-all duration-300"
    >
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{card.label}</p>
          <p className="text-4xl font-bold text-white">{card.value}</p>
          {card.subText && (
            <p className="text-xs text-muted-foreground mt-1">
              {card.subText}
            </p>
          )}
        </div>
        <div className="bg-emerald-800/20 p-4 rounded-full shadow-inner shadow-emerald-800/30">
          {card.icon}
        </div>
      </CardContent>
    </Card>
  ))}
</div>
















     <Card className="border border-emerald-900/25 bg-gradient-to-br from-emerald-900/20 to-black/80 rounded-2xl shadow-md hover:shadow-emerald-600/30 hover:scale-[1.01] transition-transform duration-300">
  <CardHeader>
    <CardTitle className="text-xl font-bold text-white flex items-center">
      <CreditCard className="h-5 w-5 mr-2 text-emerald-400" />
      Payout Management
    </CardTitle>
  </CardHeader>
  <CardContent className="space-y-6">
    {/* Current Payout Status */}
    <div className="bg-gradient-to-br from-black/40 to-emerald-950/30 p-5 rounded-xl border border-emerald-800/25 backdrop-blur-md shadow-inner shadow-emerald-900/20 transition duration-300">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">Available for Payout</h3>
        {pendingPayout ? (
          <Badge className="bg-amber-900/20 border-amber-900/30 text-amber-400">
            PROCESSING
          </Badge>
        ) : (
          <Badge className="bg-emerald-900/20 border-emerald-900/30 text-emerald-400">
            Available
          </Badge>
        )}
      </div>

      {pendingPayout ? (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <InfoBox label="Pending Credits" value={pendingPayout.credits} />
            <InfoBox label="Pending Amount" value={`$${pendingPayout.netAmount.toFixed(2)}`} />
            <InfoBox label="PayPal Email" value={pendingPayout.paypalEmail} small />
          </div>
          <Alert className="bg-amber-900/10 border-amber-900/30 text-amber-400 text-sm mt-2">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              Your payout request is being processed. You'll receive the payment once approved.
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <InfoBox label="Available Credits" value={availableCredits} />
          <InfoBox label="Payout Amount" value={`$${availablePayout.toFixed(2)}`} />
          <InfoBox label="Platform Fee" value={`$${platformFee.toFixed(2)}`} />
        </div>
      )}

      {!pendingPayout && availableCredits > 0 && (
        <Button
          onClick={() => setShowPayoutDialog(true)}
          className="w-full mt-5 bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/30 transition-all"
        >
          Request Payout for All Credits
        </Button>
      )}

      {availableCredits === 0 && !pendingPayout && (
        <div className="text-center py-4">
          <p className="text-muted-foreground">
            No credits available for payout. Complete more appointments to earn credits.
          </p>
        </div>
      )}
    </div>

    {/* Payout Structure Info */}
    <Alert className="bg-emerald-900/10 border-emerald-900/30 text-emerald-400 text-sm">
      <AlertCircle className="h-4 w-4 mr-2" />
      <AlertDescription>
        <strong>Payout Structure:</strong> You earn $8 per credit. Platform fee is $2 per credit. Payouts are processed via PayPal.
      </AlertDescription>
    </Alert>

    {/* Payout History */}
    {payouts.length > 0 && (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Payout History</h3>
        <div className="space-y-2">
          {payouts.slice(0, 5).map((payout) => (
            <div
              key={payout.id}
              className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-black/40 to-emerald-950/20 border border-emerald-900/15 backdrop-blur-md hover:scale-[1.02] hover:shadow-md transition duration-300"
            >
              <div>
                <p className="text-white font-medium">
                  {format(new Date(payout.createdAt), "MMM d, yyyy")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {payout.credits} credits • ${payout.netAmount.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">{payout.paypalEmail}</p>
              </div>
              <Badge
                className={`${
                  payout.status === "PROCESSED"
                    ? "bg-emerald-900/20 border-emerald-900/30 text-emerald-400"
                    : "bg-amber-900/20 border-amber-900/30 text-amber-400"
                }`}
              >
                {payout.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    )}
  </CardContent>
</Card>

















      <Dialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
  <DialogContent className="bg-gradient-to-br from-emerald-950/40 to-black/80 border border-emerald-900/25 backdrop-blur-xl shadow-lg rounded-2xl">
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-emerald-400" />
        Request Payout
      </DialogTitle>
      <DialogDescription className="text-sm text-muted-foreground">
        You can request payout for all your available credits.
      </DialogDescription>
    </DialogHeader>

    <form onSubmit={handlePayoutRequest} className="space-y-6 mt-4">
      {/* Earnings Breakdown */}
      <div className="bg-gradient-to-br from-black/50 to-emerald-950/30 p-5 rounded-xl border border-emerald-900/20 shadow-inner space-y-3">
        <InfoRow label="Available Credits:" value={availableCredits} />
        <InfoRow label="Gross Amount:" value={`$${(availableCredits * 10).toFixed(2)}`} />
        <InfoRow label="Platform Fee (20%):" value={`-$${platformFee.toFixed(2)}`} />
        <div className="border-t border-emerald-800/30 pt-3 flex justify-between font-semibold">
          <span className="text-white">Net Payout:</span>
          <span className="text-emerald-400">${availablePayout.toFixed(2)}</span>
        </div>
      </div>

      {/* PayPal Email Input */}
      <div className="space-y-2">
        <Label htmlFor="paypalEmail" className="text-sm text-muted-foreground">
          PayPal Email
        </Label>
        <Input
          id="paypalEmail"
          type="email"
          placeholder="your-email@paypal.com"
          value={paypalEmail}
          onChange={(e) => setPaypalEmail(e.target.value)}
          className="bg-black/40 text-white border-emerald-900/25 focus:border-emerald-600 focus:ring-emerald-500 placeholder:text-muted-foreground transition"
          required
        />
        <p className="text-xs text-muted-foreground">
          Enter the PayPal email to receive your payout.
        </p>
      </div>

      {/* Payout Info Alert */}
      <Alert className="bg-emerald-900/10 border-emerald-900/30 text-emerald-400 text-sm">
        <AlertCircle className="h-4 w-4 mr-2" />
        <AlertDescription>
          {availableCredits} credits will be deducted after admin approval and ${availablePayout.toFixed(2)} will be transferred to your PayPal.
        </AlertDescription>
      </Alert>

      <DialogFooter className="flex justify-end gap-2 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowPayoutDialog(false)}
          disabled={loading}
          className="border-emerald-900/30 hover:border-emerald-600 hover:bg-emerald-900/20 transition"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/30 transition"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Requesting...
            </>
          ) : (
            "Request Payout"
          )}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>

    </div>
  );
}