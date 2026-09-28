export const APPROVAL_ACTIONS = {
  SUBMIT: 'submit',
  APPROVE: 'approve',
  REJECT: 'reject',
  REVERSE: 'reverse',
};

export const APPROVAL_STATUSES = {
  DRAFT: 'draft',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const transitionApprovalState = (currentStatus, action) => {
  const normalizedStatus = String(currentStatus ?? '').toLowerCase();
  const normalizedAction = String(action ?? '').toLowerCase();

  if (!normalizedStatus && normalizedAction === APPROVAL_ACTIONS.SUBMIT) {
    return APPROVAL_STATUSES.PENDING;
  }

  if (normalizedStatus === APPROVAL_STATUSES.DRAFT && normalizedAction === APPROVAL_ACTIONS.SUBMIT) {
    return APPROVAL_STATUSES.PENDING;
  }

  if (normalizedStatus === APPROVAL_STATUSES.PENDING && normalizedAction === APPROVAL_ACTIONS.APPROVE) {
    return APPROVAL_STATUSES.APPROVED;
  }

  if (normalizedStatus === APPROVAL_STATUSES.PENDING && normalizedAction === APPROVAL_ACTIONS.REJECT) {
    return APPROVAL_STATUSES.REJECTED;
  }

  if (normalizedStatus === APPROVAL_STATUSES.APPROVED && normalizedAction === APPROVAL_ACTIONS.REVERSE) {
    return APPROVAL_STATUSES.DRAFT;
  }

  if (normalizedStatus === APPROVAL_STATUSES.REJECTED && normalizedAction === APPROVAL_ACTIONS.SUBMIT) {
    return APPROVAL_STATUSES.PENDING;
  }

  return normalizedStatus || APPROVAL_STATUSES.DRAFT;
};

export const groupApprovalResults = (results = []) => {
  const pendingApprovals = [];
  const approvedResults = [];

  const terms = Array.isArray(results?.terms) ? results.terms : [];

  terms.forEach((term) => {
    const classes = Array.isArray(term?.classes) ? term.classes : [];

    classes.forEach((cls) => {
      const withTerm = { ...cls, termName: term.termName };

      if (cls.approvalStatus === APPROVAL_STATUSES.PENDING) {
        pendingApprovals.push(withTerm);
      } else if (cls.approvalStatus === APPROVAL_STATUSES.APPROVED) {
        approvedResults.push(withTerm);
      }
    });
  });

  return { pendingApprovals, approvedResults };
};
