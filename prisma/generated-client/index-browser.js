
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  detectRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.10.0
 * Query Engine version: 5a9203d0590c951969e85a7d07215503f4672eb9
 */
Prisma.prismaVersion = {
  client: "5.10.0",
  engine: "5a9203d0590c951969e85a7d07215503f4672eb9"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  username: 'username',
  email: 'email',
  password: 'password',
  phone: 'phone',
  role: 'role',
  status: 'status',
  xp: 'xp',
  level: 'level',
  title: 'title',
  lastActivity: 'lastActivity',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  failedLoginAttempts: 'failedLoginAttempts',
  lockedUntil: 'lockedUntil',
  streak: 'streak',
  longestStreak: 'longestStreak'
};

exports.Prisma.AchievementScalarFieldEnum = {
  id: 'id',
  key: 'key',
  title: 'title',
  description: 'description',
  mission: 'mission',
  category: 'category',
  targetValue: 'targetValue',
  iconName: 'iconName',
  rewardTitle: 'rewardTitle',
  createdAt: 'createdAt'
};

exports.Prisma.UserAchievementScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  achievementId: 'achievementId',
  progress: 'progress',
  isUnlocked: 'isUnlocked',
  unlockedAt: 'unlockedAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AddictionTestScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  score: 'score',
  category: 'category',
  createdAt: 'createdAt'
};

exports.Prisma.ChallengeProgressScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  dayCompleted: 'dayCompleted',
  status: 'status',
  completedAt: 'completedAt'
};

exports.Prisma.FeatureUsageScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  featureName: 'featureName',
  usedAt: 'usedAt'
};

exports.Prisma.GameSessionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  game: 'game',
  xpEarned: 'xpEarned',
  level: 'level',
  score: 'score',
  playedAt: 'playedAt'
};

exports.Prisma.SecurityLogScalarFieldEnum = {
  id: 'id',
  type: 'type',
  details: 'details',
  ipAddress: 'ipAddress',
  timestamp: 'timestamp'
};

exports.Prisma.DailyCheckInScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  checkedAt: 'checkedAt',
  didGamble: 'didGamble',
  feltLikeDepositing: 'feltLikeDepositing',
  openedGamblingSite: 'openedGamblingSite',
  note: 'note'
};

exports.Prisma.ArticleScalarFieldEnum = {
  id: 'id',
  title: 'title',
  content: 'content',
  category: 'category',
  thumbnail: 'thumbnail',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.ArticleCompletionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  articleId: 'articleId',
  createdAt: 'createdAt'
};

exports.Prisma.SystemSettingScalarFieldEnum = {
  key: 'key',
  value: 'value'
};

exports.Prisma.GameThresholdScalarFieldEnum = {
  id: 'id',
  gameName: 'gameName',
  minScore: 'minScore',
  xpReward: 'xpReward',
  timeLimit: 'timeLimit',
  updatedAt: 'updatedAt'
};

exports.Prisma.LandingPageContentScalarFieldEnum = {
  id: 'id',
  heroTitle: 'heroTitle',
  heroSub: 'heroSub',
  stats_users: 'stats_users',
  stats_rate: 'stats_rate',
  updatedAt: 'updatedAt'
};

exports.Prisma.GamblingReportScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  siteName: 'siteName',
  siteLink: 'siteLink',
  hasRegistered: 'hasRegistered',
  remarks: 'remarks',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  Achievement: 'Achievement',
  UserAchievement: 'UserAchievement',
  AddictionTest: 'AddictionTest',
  ChallengeProgress: 'ChallengeProgress',
  FeatureUsage: 'FeatureUsage',
  GameSession: 'GameSession',
  SecurityLog: 'SecurityLog',
  DailyCheckIn: 'DailyCheckIn',
  Article: 'Article',
  ArticleCompletion: 'ArticleCompletion',
  SystemSetting: 'SystemSetting',
  GameThreshold: 'GameThreshold',
  LandingPageContent: 'LandingPageContent',
  GamblingReport: 'GamblingReport'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        const runtime = detectRuntime()
        const edgeRuntimeName = {
          'workerd': 'Cloudflare Workers',
          'deno': 'Deno and Deno Deploy',
          'netlify': 'Netlify Edge Functions',
          'edge-light': 'Vercel Edge Functions or Edge Middleware',
        }[runtime]

        let message = 'PrismaClient is unable to run in '
        if (edgeRuntimeName !== undefined) {
          message += edgeRuntimeName + '. As an alternative, try Accelerate: https://pris.ly/d/accelerate.'
        } else {
          message += 'this browser environment, or has been bundled for the browser (running in `' + runtime + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
