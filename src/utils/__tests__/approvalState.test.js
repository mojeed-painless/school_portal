import { describe, expect, it } from 'vitest';
import {
  APPROVAL_ACTIONS,
  APPROVAL_STATUSES,
  groupApprovalResults,
  transitionApprovalState,
} from '../approvalState';

describe('approvalState', () => {
  it('transitions status values through the valid approval workflow', () => {
    expect(transitionApprovalState('', APPROVAL_ACTIONS.SUBMIT)).toBe(APPROVAL_STATUSES.PENDING);
    expect(transitionApprovalState(APPROVAL_STATUSES.DRAFT, APPROVAL_ACTIONS.SUBMIT)).toBe(APPROVAL_STATUSES.PENDING);
    expect(transitionApprovalState(APPROVAL_STATUSES.PENDING, APPROVAL_ACTIONS.APPROVE)).toBe(APPROVAL_STATUSES.APPROVED);
    expect(transitionApprovalState(APPROVAL_STATUSES.PENDING, APPROVAL_ACTIONS.REJECT)).toBe(APPROVAL_STATUSES.REJECTED);
    expect(transitionApprovalState(APPROVAL_STATUSES.APPROVED, APPROVAL_ACTIONS.REVERSE)).toBe(APPROVAL_STATUSES.DRAFT);
    expect(transitionApprovalState(APPROVAL_STATUSES.REJECTED, APPROVAL_ACTIONS.SUBMIT)).toBe(APPROVAL_STATUSES.PENDING);
  });

  it('ignores unsupported transitions and keeps the current status', () => {
    expect(transitionApprovalState(APPROVAL_STATUSES.APPROVED, APPROVAL_ACTIONS.APPROVE)).toBe(APPROVAL_STATUSES.APPROVED);
    expect(transitionApprovalState(APPROVAL_STATUSES.DRAFT, APPROVAL_ACTIONS.REVERSE)).toBe(APPROVAL_STATUSES.DRAFT);
  });

  it('groups pending and approved results by term and class', () => {
    const results = {
      terms: [
        {
          termName: 'First Term',
          classes: [
            { className: 'JSS 1', approvalStatus: 'pending' },
            { className: 'JSS 2', approvalStatus: 'approved' },
          ],
        },
        {
          termName: 'Second Term',
          classes: [
            { className: 'JSS 3', approvalStatus: 'rejected' },
            { className: 'JSS 4', approvalStatus: 'approved' },
          ],
        },
      ],
    };

    const { pendingApprovals, approvedResults } = groupApprovalResults(results);

    expect(pendingApprovals).toHaveLength(1);
    expect(approvedResults).toHaveLength(2);
    expect(pendingApprovals[0].termName).toBe('First Term');
    expect(approvedResults[0].termName).toBe('First Term');
  });
});
