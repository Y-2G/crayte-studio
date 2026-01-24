/**
 * Type validation tests
 *
 * These tests verify that type guards work correctly
 * Run with: npm test (once Jest is configured)
 */

import {
  isPost,
  isWork,
  isStaff,
  isInboxMessage,
  type Post,
  type Work,
  type Staff,
  type InboxMessage,
} from '../entities';

import {
  isSealedContent,
  isAnomalyEvent,
  isHorrorMeta,
  isMoreSevere,
  getNextAnomalyLevel,
  hasHorrorMeta,
  type SealedContent,
  type AnomalyEvent,
  type HorrorMeta,
} from '../horror';

import { isNavItem, isFormField, type NavItem, type FormField } from '../ui';

describe('Entity Type Guards', () => {
  describe('isPost', () => {
    it('should return true for valid Post object', () => {
      const validPost: Post = {
        id: 'post-1',
        slug: 'test-post',
        title: 'Test Post',
        content: 'Content',
        excerpt: 'Excerpt',
        status: 'publish',
        visibility: 'public',
        category: 'news',
        tags: ['tag1'],
        author: 'author-1',
        reviewComments: [],
        meta: {},
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };
      expect(isPost(validPost)).toBe(true);
    });

    it('should return false for invalid object', () => {
      expect(isPost(null)).toBe(false);
      expect(isPost(undefined)).toBe(false);
      expect(isPost({})).toBe(false);
      expect(isPost({ id: 'test' })).toBe(false);
    });
  });

  describe('isWork', () => {
    it('should return true for valid Work object', () => {
      const validWork: Work = {
        id: 'work-1',
        slug: 'test-work',
        title: 'Test Work',
        description: 'Description',
        client: 'Client',
        venue: 'Venue',
        date: '2024-01-01',
        status: 'live',
        images: [],
        tags: [],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };
      expect(isWork(validWork)).toBe(true);
    });
  });

  describe('isStaff', () => {
    it('should return true for valid Staff object', () => {
      const validStaff: Staff = {
        id: 'staff-1',
        slug: 'john-doe',
        name: 'John Doe',
        role: 'Designer',
        team: 'Creative',
        bio: 'Bio',
        photo: '/photo.jpg',
        visibility: 'public',
        state: 'active',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };
      expect(isStaff(validStaff)).toBe(true);
    });
  });

  describe('isInboxMessage', () => {
    it('should return true for valid InboxMessage object', () => {
      const validMessage: InboxMessage = {
        id: 'msg-1',
        name: 'User',
        email: 'user@example.com',
        subject: 'Subject',
        message: 'Message',
        category: 'general',
        severity: 'low',
        status: 'open',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };
      expect(isInboxMessage(validMessage)).toBe(true);
    });
  });
});

describe('Horror Type Guards', () => {
  describe('isSealedContent', () => {
    it('should return true for valid SealedContent object', () => {
      const validSealed: SealedContent = {
        id: 'sealed-1',
        type: 'post',
        reason: 'Confidential',
        sealedAt: '2024-01-01T00:00:00Z',
        sealedBy: 'system',
      };
      expect(isSealedContent(validSealed)).toBe(true);
    });
  });

  describe('isAnomalyEvent', () => {
    it('should return true for valid AnomalyEvent object', () => {
      const validEvent: AnomalyEvent = {
        id: 'event-1',
        type: 'glitch',
        level: 'subtle',
        targetId: 'post-1',
        targetType: 'post',
        description: 'Text glitch',
        metadata: {},
        occurredAt: '2024-01-01T00:00:00Z',
        isObserved: false,
      };
      expect(isAnomalyEvent(validEvent)).toBe(true);
    });
  });

  describe('isHorrorMeta', () => {
    it('should return true for valid HorrorMeta object', () => {
      const validMeta: HorrorMeta = {
        anomalyLevel: 'subtle',
        isSealed: false,
        isRewritten: false,
        observationNotes: ['Note 1'],
      };
      expect(isHorrorMeta(validMeta)).toBe(true);
    });

    it('should return false for invalid anomalyLevel', () => {
      const invalidMeta = {
        anomalyLevel: 'invalid',
      };
      expect(isHorrorMeta(invalidMeta)).toBe(false);
    });
  });

  describe('isMoreSevere', () => {
    it('should correctly compare anomaly levels', () => {
      expect(isMoreSevere('severe', 'subtle')).toBe(true);
      expect(isMoreSevere('noticeable', 'none')).toBe(true);
      expect(isMoreSevere('subtle', 'severe')).toBe(false);
      expect(isMoreSevere('none', 'none')).toBe(false);
    });
  });

  describe('getNextAnomalyLevel', () => {
    it('should return correct next level', () => {
      expect(getNextAnomalyLevel('none')).toBe('subtle');
      expect(getNextAnomalyLevel('subtle')).toBe('noticeable');
      expect(getNextAnomalyLevel('noticeable')).toBe('severe');
      expect(getNextAnomalyLevel('severe')).toBeNull();
    });
  });

  describe('hasHorrorMeta', () => {
    it('should detect horror metadata', () => {
      expect(hasHorrorMeta({ anomalyLevel: 'subtle' })).toBe(true);
      expect(hasHorrorMeta({ isSealed: true })).toBe(true);
      expect(hasHorrorMeta({ normalField: 'value' })).toBe(false);
      expect(hasHorrorMeta({})).toBe(false);
    });
  });
});

describe('UI Type Guards', () => {
  describe('isNavItem', () => {
    it('should return true for valid NavItem object', () => {
      const validNav: NavItem = {
        label: 'Home',
        href: '/',
      };
      expect(isNavItem(validNav)).toBe(true);
    });

    it('should return false for invalid object', () => {
      expect(isNavItem({})).toBe(false);
      expect(isNavItem({ label: 'Test' })).toBe(false);
      expect(isNavItem({ href: '/' })).toBe(false);
    });
  });

  describe('isFormField', () => {
    it('should return true for valid FormField object', () => {
      const validField: FormField = {
        name: 'email',
        label: 'Email',
        type: 'email',
      };
      expect(isFormField(validField)).toBe(true);
    });
  });
});
