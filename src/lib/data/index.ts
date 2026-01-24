/**
 * Central export file for all data access functions
 *
 * Import data functions from this file to ensure consistency:
 *
 * @example
 * ```typescript
 * import { getAllPosts, getActiveStaff, getPublicWorks } from '@/lib/data';
 * ```
 */

// Post data access
export {
  getAllPosts,
  getPostBySlug,
  getPostById,
  getPublishedPosts,
  getPostsByStatus,
  getPostsByCategory,
  getPostsByTag,
  getPostsByAuthor,
  getAllCategories,
  getAllTags,
  getRecentPosts,
} from './posts';

// Work data access
export {
  getAllWorks,
  getWorkBySlug,
  getWorkById,
  getPublicWorks,
  getWorksByStatus,
  getWorksByTag,
  getWorksByClient,
  getAllWorkTags,
  getRecentWorks,
  getFeaturedWorks,
} from './works';

// Staff data access
export {
  getAllStaff,
  getStaffBySlug,
  getStaffById,
  getActiveStaff,
  getStaffByState,
  getStaffByTeam,
  getStaffByRole,
  getAllTeams,
  getAllRoles,
  getStaffCountByState,
} from './staff';

// Page data access
export {
  getAllPages,
  getPageBySlug,
  getPublishedPages,
  getPagesByStatus,
  getPagesByTemplate,
  getAllTemplates,
} from './pages';

// Inbox data access
export {
  getAllInboxMessages,
  getInboxMessageById,
  getInboxMessagesByCategory,
  getInboxMessagesBySeverity,
  getInboxMessagesByStatus,
  getOpenInboxMessages,
  getPendingInboxMessages,
  getResolvedInboxMessages,
  getHighSeverityMessages,
  getRecentInboxMessages,
  getInboxMessageCountByStatus,
  getInboxMessageCountByCategory,
} from './inbox';
