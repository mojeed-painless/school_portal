/**
 * Calculates net student tuition fees including discounts and outstanding balances.
 * @param {Object} feeDetails
 * @param {number} feeDetails.baseTuition - Base tuition fee
 * @param {number} [feeDetails.discountPercent=0] - Percentage discount (0-100)
 * @param {number} [feeDetails.outstandingBalance=0] - Unpaid balance from prior term
 * @returns {Object} Computed fee breakdown
 */
export function calculateNetTuition({ baseTuition, discountPercent = 0, outstandingBalance = 0 }) {
  const safeBase = Math.max(0, Number(baseTuition) || 0);
  const safeDiscountPercent = Math.min(100, Math.max(0, Number(discountPercent) || 0));
  const safeOutstanding = Math.max(0, Number(outstandingBalance) || 0);

  const discountAmount = Number(((safeBase * safeDiscountPercent) / 100).toFixed(2));
  const discountedBase = safeBase - discountAmount;
  const netTotal = Number((discountedBase + safeOutstanding).toFixed(2));

  return {
    baseTuition: safeBase,
    discountAmount,
    outstandingBalance: safeOutstanding,
    netTotal,
  };
}
