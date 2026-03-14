
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Achievement
 * 
 */
export type Achievement = $Result.DefaultSelection<Prisma.$AchievementPayload>
/**
 * Model UserAchievement
 * 
 */
export type UserAchievement = $Result.DefaultSelection<Prisma.$UserAchievementPayload>
/**
 * Model AddictionTest
 * 
 */
export type AddictionTest = $Result.DefaultSelection<Prisma.$AddictionTestPayload>
/**
 * Model ChallengeProgress
 * 
 */
export type ChallengeProgress = $Result.DefaultSelection<Prisma.$ChallengeProgressPayload>
/**
 * Model FeatureUsage
 * 
 */
export type FeatureUsage = $Result.DefaultSelection<Prisma.$FeatureUsagePayload>
/**
 * Model GameSession
 * 
 */
export type GameSession = $Result.DefaultSelection<Prisma.$GameSessionPayload>
/**
 * Model SecurityLog
 * 
 */
export type SecurityLog = $Result.DefaultSelection<Prisma.$SecurityLogPayload>
/**
 * Model DailyCheckIn
 * 
 */
export type DailyCheckIn = $Result.DefaultSelection<Prisma.$DailyCheckInPayload>
/**
 * Model Article
 * 
 */
export type Article = $Result.DefaultSelection<Prisma.$ArticlePayload>
/**
 * Model ArticleCompletion
 * 
 */
export type ArticleCompletion = $Result.DefaultSelection<Prisma.$ArticleCompletionPayload>
/**
 * Model SystemSetting
 * 
 */
export type SystemSetting = $Result.DefaultSelection<Prisma.$SystemSettingPayload>
/**
 * Model GameThreshold
 * 
 */
export type GameThreshold = $Result.DefaultSelection<Prisma.$GameThresholdPayload>
/**
 * Model LandingPageContent
 * 
 */
export type LandingPageContent = $Result.DefaultSelection<Prisma.$LandingPageContentPayload>
/**
 * Model GamblingReport
 * 
 */
export type GamblingReport = $Result.DefaultSelection<Prisma.$GamblingReportPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.achievement`: Exposes CRUD operations for the **Achievement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Achievements
    * const achievements = await prisma.achievement.findMany()
    * ```
    */
  get achievement(): Prisma.AchievementDelegate<ExtArgs>;

  /**
   * `prisma.userAchievement`: Exposes CRUD operations for the **UserAchievement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserAchievements
    * const userAchievements = await prisma.userAchievement.findMany()
    * ```
    */
  get userAchievement(): Prisma.UserAchievementDelegate<ExtArgs>;

  /**
   * `prisma.addictionTest`: Exposes CRUD operations for the **AddictionTest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AddictionTests
    * const addictionTests = await prisma.addictionTest.findMany()
    * ```
    */
  get addictionTest(): Prisma.AddictionTestDelegate<ExtArgs>;

  /**
   * `prisma.challengeProgress`: Exposes CRUD operations for the **ChallengeProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChallengeProgresses
    * const challengeProgresses = await prisma.challengeProgress.findMany()
    * ```
    */
  get challengeProgress(): Prisma.ChallengeProgressDelegate<ExtArgs>;

  /**
   * `prisma.featureUsage`: Exposes CRUD operations for the **FeatureUsage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FeatureUsages
    * const featureUsages = await prisma.featureUsage.findMany()
    * ```
    */
  get featureUsage(): Prisma.FeatureUsageDelegate<ExtArgs>;

  /**
   * `prisma.gameSession`: Exposes CRUD operations for the **GameSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameSessions
    * const gameSessions = await prisma.gameSession.findMany()
    * ```
    */
  get gameSession(): Prisma.GameSessionDelegate<ExtArgs>;

  /**
   * `prisma.securityLog`: Exposes CRUD operations for the **SecurityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SecurityLogs
    * const securityLogs = await prisma.securityLog.findMany()
    * ```
    */
  get securityLog(): Prisma.SecurityLogDelegate<ExtArgs>;

  /**
   * `prisma.dailyCheckIn`: Exposes CRUD operations for the **DailyCheckIn** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyCheckIns
    * const dailyCheckIns = await prisma.dailyCheckIn.findMany()
    * ```
    */
  get dailyCheckIn(): Prisma.DailyCheckInDelegate<ExtArgs>;

  /**
   * `prisma.article`: Exposes CRUD operations for the **Article** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Articles
    * const articles = await prisma.article.findMany()
    * ```
    */
  get article(): Prisma.ArticleDelegate<ExtArgs>;

  /**
   * `prisma.articleCompletion`: Exposes CRUD operations for the **ArticleCompletion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArticleCompletions
    * const articleCompletions = await prisma.articleCompletion.findMany()
    * ```
    */
  get articleCompletion(): Prisma.ArticleCompletionDelegate<ExtArgs>;

  /**
   * `prisma.systemSetting`: Exposes CRUD operations for the **SystemSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemSettings
    * const systemSettings = await prisma.systemSetting.findMany()
    * ```
    */
  get systemSetting(): Prisma.SystemSettingDelegate<ExtArgs>;

  /**
   * `prisma.gameThreshold`: Exposes CRUD operations for the **GameThreshold** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameThresholds
    * const gameThresholds = await prisma.gameThreshold.findMany()
    * ```
    */
  get gameThreshold(): Prisma.GameThresholdDelegate<ExtArgs>;

  /**
   * `prisma.landingPageContent`: Exposes CRUD operations for the **LandingPageContent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LandingPageContents
    * const landingPageContents = await prisma.landingPageContent.findMany()
    * ```
    */
  get landingPageContent(): Prisma.LandingPageContentDelegate<ExtArgs>;

  /**
   * `prisma.gamblingReport`: Exposes CRUD operations for the **GamblingReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GamblingReports
    * const gamblingReports = await prisma.gamblingReport.findMany()
    * ```
    */
  get gamblingReport(): Prisma.GamblingReportDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.10.0
   * Query Engine version: 5a9203d0590c951969e85a7d07215503f4672eb9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'user' | 'achievement' | 'userAchievement' | 'addictionTest' | 'challengeProgress' | 'featureUsage' | 'gameSession' | 'securityLog' | 'dailyCheckIn' | 'article' | 'articleCompletion' | 'systemSetting' | 'gameThreshold' | 'landingPageContent' | 'gamblingReport'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Achievement: {
        payload: Prisma.$AchievementPayload<ExtArgs>
        fields: Prisma.AchievementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AchievementFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AchievementFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          findFirst: {
            args: Prisma.AchievementFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AchievementFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          findMany: {
            args: Prisma.AchievementFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[]
          }
          create: {
            args: Prisma.AchievementCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          delete: {
            args: Prisma.AchievementDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          update: {
            args: Prisma.AchievementUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          deleteMany: {
            args: Prisma.AchievementDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.AchievementUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.AchievementUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          aggregate: {
            args: Prisma.AchievementAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateAchievement>
          }
          groupBy: {
            args: Prisma.AchievementGroupByArgs<ExtArgs>,
            result: $Utils.Optional<AchievementGroupByOutputType>[]
          }
          count: {
            args: Prisma.AchievementCountArgs<ExtArgs>,
            result: $Utils.Optional<AchievementCountAggregateOutputType> | number
          }
        }
      }
      UserAchievement: {
        payload: Prisma.$UserAchievementPayload<ExtArgs>
        fields: Prisma.UserAchievementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserAchievementFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserAchievementFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          findFirst: {
            args: Prisma.UserAchievementFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserAchievementFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          findMany: {
            args: Prisma.UserAchievementFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>[]
          }
          create: {
            args: Prisma.UserAchievementCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          delete: {
            args: Prisma.UserAchievementDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          update: {
            args: Prisma.UserAchievementUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          deleteMany: {
            args: Prisma.UserAchievementDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserAchievementUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserAchievementUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          aggregate: {
            args: Prisma.UserAchievementAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUserAchievement>
          }
          groupBy: {
            args: Prisma.UserAchievementGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserAchievementGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserAchievementCountArgs<ExtArgs>,
            result: $Utils.Optional<UserAchievementCountAggregateOutputType> | number
          }
        }
      }
      AddictionTest: {
        payload: Prisma.$AddictionTestPayload<ExtArgs>
        fields: Prisma.AddictionTestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddictionTestFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AddictionTestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddictionTestFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AddictionTestPayload>
          }
          findFirst: {
            args: Prisma.AddictionTestFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AddictionTestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddictionTestFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AddictionTestPayload>
          }
          findMany: {
            args: Prisma.AddictionTestFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AddictionTestPayload>[]
          }
          create: {
            args: Prisma.AddictionTestCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AddictionTestPayload>
          }
          delete: {
            args: Prisma.AddictionTestDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AddictionTestPayload>
          }
          update: {
            args: Prisma.AddictionTestUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AddictionTestPayload>
          }
          deleteMany: {
            args: Prisma.AddictionTestDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.AddictionTestUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.AddictionTestUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$AddictionTestPayload>
          }
          aggregate: {
            args: Prisma.AddictionTestAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateAddictionTest>
          }
          groupBy: {
            args: Prisma.AddictionTestGroupByArgs<ExtArgs>,
            result: $Utils.Optional<AddictionTestGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddictionTestCountArgs<ExtArgs>,
            result: $Utils.Optional<AddictionTestCountAggregateOutputType> | number
          }
        }
      }
      ChallengeProgress: {
        payload: Prisma.$ChallengeProgressPayload<ExtArgs>
        fields: Prisma.ChallengeProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChallengeProgressFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengeProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChallengeProgressFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengeProgressPayload>
          }
          findFirst: {
            args: Prisma.ChallengeProgressFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengeProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChallengeProgressFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengeProgressPayload>
          }
          findMany: {
            args: Prisma.ChallengeProgressFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengeProgressPayload>[]
          }
          create: {
            args: Prisma.ChallengeProgressCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengeProgressPayload>
          }
          delete: {
            args: Prisma.ChallengeProgressDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengeProgressPayload>
          }
          update: {
            args: Prisma.ChallengeProgressUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengeProgressPayload>
          }
          deleteMany: {
            args: Prisma.ChallengeProgressDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ChallengeProgressUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ChallengeProgressUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChallengeProgressPayload>
          }
          aggregate: {
            args: Prisma.ChallengeProgressAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateChallengeProgress>
          }
          groupBy: {
            args: Prisma.ChallengeProgressGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ChallengeProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChallengeProgressCountArgs<ExtArgs>,
            result: $Utils.Optional<ChallengeProgressCountAggregateOutputType> | number
          }
        }
      }
      FeatureUsage: {
        payload: Prisma.$FeatureUsagePayload<ExtArgs>
        fields: Prisma.FeatureUsageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeatureUsageFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FeatureUsagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeatureUsageFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FeatureUsagePayload>
          }
          findFirst: {
            args: Prisma.FeatureUsageFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FeatureUsagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeatureUsageFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FeatureUsagePayload>
          }
          findMany: {
            args: Prisma.FeatureUsageFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FeatureUsagePayload>[]
          }
          create: {
            args: Prisma.FeatureUsageCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FeatureUsagePayload>
          }
          delete: {
            args: Prisma.FeatureUsageDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FeatureUsagePayload>
          }
          update: {
            args: Prisma.FeatureUsageUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FeatureUsagePayload>
          }
          deleteMany: {
            args: Prisma.FeatureUsageDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.FeatureUsageUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.FeatureUsageUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FeatureUsagePayload>
          }
          aggregate: {
            args: Prisma.FeatureUsageAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateFeatureUsage>
          }
          groupBy: {
            args: Prisma.FeatureUsageGroupByArgs<ExtArgs>,
            result: $Utils.Optional<FeatureUsageGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeatureUsageCountArgs<ExtArgs>,
            result: $Utils.Optional<FeatureUsageCountAggregateOutputType> | number
          }
        }
      }
      GameSession: {
        payload: Prisma.$GameSessionPayload<ExtArgs>
        fields: Prisma.GameSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameSessionFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameSessionFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload>
          }
          findFirst: {
            args: Prisma.GameSessionFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameSessionFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload>
          }
          findMany: {
            args: Prisma.GameSessionFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload>[]
          }
          create: {
            args: Prisma.GameSessionCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload>
          }
          delete: {
            args: Prisma.GameSessionDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload>
          }
          update: {
            args: Prisma.GameSessionUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload>
          }
          deleteMany: {
            args: Prisma.GameSessionDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.GameSessionUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.GameSessionUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload>
          }
          aggregate: {
            args: Prisma.GameSessionAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateGameSession>
          }
          groupBy: {
            args: Prisma.GameSessionGroupByArgs<ExtArgs>,
            result: $Utils.Optional<GameSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameSessionCountArgs<ExtArgs>,
            result: $Utils.Optional<GameSessionCountAggregateOutputType> | number
          }
        }
      }
      SecurityLog: {
        payload: Prisma.$SecurityLogPayload<ExtArgs>
        fields: Prisma.SecurityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SecurityLogFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SecurityLogFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>
          }
          findFirst: {
            args: Prisma.SecurityLogFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SecurityLogFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>
          }
          findMany: {
            args: Prisma.SecurityLogFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>[]
          }
          create: {
            args: Prisma.SecurityLogCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>
          }
          delete: {
            args: Prisma.SecurityLogDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>
          }
          update: {
            args: Prisma.SecurityLogUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>
          }
          deleteMany: {
            args: Prisma.SecurityLogDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.SecurityLogUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.SecurityLogUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>
          }
          aggregate: {
            args: Prisma.SecurityLogAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSecurityLog>
          }
          groupBy: {
            args: Prisma.SecurityLogGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SecurityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SecurityLogCountArgs<ExtArgs>,
            result: $Utils.Optional<SecurityLogCountAggregateOutputType> | number
          }
        }
      }
      DailyCheckIn: {
        payload: Prisma.$DailyCheckInPayload<ExtArgs>
        fields: Prisma.DailyCheckInFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyCheckInFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DailyCheckInPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyCheckInFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DailyCheckInPayload>
          }
          findFirst: {
            args: Prisma.DailyCheckInFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DailyCheckInPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyCheckInFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DailyCheckInPayload>
          }
          findMany: {
            args: Prisma.DailyCheckInFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DailyCheckInPayload>[]
          }
          create: {
            args: Prisma.DailyCheckInCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DailyCheckInPayload>
          }
          delete: {
            args: Prisma.DailyCheckInDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DailyCheckInPayload>
          }
          update: {
            args: Prisma.DailyCheckInUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DailyCheckInPayload>
          }
          deleteMany: {
            args: Prisma.DailyCheckInDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.DailyCheckInUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.DailyCheckInUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DailyCheckInPayload>
          }
          aggregate: {
            args: Prisma.DailyCheckInAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateDailyCheckIn>
          }
          groupBy: {
            args: Prisma.DailyCheckInGroupByArgs<ExtArgs>,
            result: $Utils.Optional<DailyCheckInGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyCheckInCountArgs<ExtArgs>,
            result: $Utils.Optional<DailyCheckInCountAggregateOutputType> | number
          }
        }
      }
      Article: {
        payload: Prisma.$ArticlePayload<ExtArgs>
        fields: Prisma.ArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findFirst: {
            args: Prisma.ArticleFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findMany: {
            args: Prisma.ArticleFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          create: {
            args: Prisma.ArticleCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          delete: {
            args: Prisma.ArticleDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          update: {
            args: Prisma.ArticleUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          deleteMany: {
            args: Prisma.ArticleDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ArticleUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          aggregate: {
            args: Prisma.ArticleAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateArticle>
          }
          groupBy: {
            args: Prisma.ArticleGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleCountArgs<ExtArgs>,
            result: $Utils.Optional<ArticleCountAggregateOutputType> | number
          }
        }
      }
      ArticleCompletion: {
        payload: Prisma.$ArticleCompletionPayload<ExtArgs>
        fields: Prisma.ArticleCompletionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleCompletionFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArticleCompletionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleCompletionFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArticleCompletionPayload>
          }
          findFirst: {
            args: Prisma.ArticleCompletionFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArticleCompletionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleCompletionFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArticleCompletionPayload>
          }
          findMany: {
            args: Prisma.ArticleCompletionFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArticleCompletionPayload>[]
          }
          create: {
            args: Prisma.ArticleCompletionCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArticleCompletionPayload>
          }
          delete: {
            args: Prisma.ArticleCompletionDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArticleCompletionPayload>
          }
          update: {
            args: Prisma.ArticleCompletionUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArticleCompletionPayload>
          }
          deleteMany: {
            args: Prisma.ArticleCompletionDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleCompletionUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ArticleCompletionUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ArticleCompletionPayload>
          }
          aggregate: {
            args: Prisma.ArticleCompletionAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateArticleCompletion>
          }
          groupBy: {
            args: Prisma.ArticleCompletionGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ArticleCompletionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleCompletionCountArgs<ExtArgs>,
            result: $Utils.Optional<ArticleCompletionCountAggregateOutputType> | number
          }
        }
      }
      SystemSetting: {
        payload: Prisma.$SystemSettingPayload<ExtArgs>
        fields: Prisma.SystemSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemSettingFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemSettingFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          findFirst: {
            args: Prisma.SystemSettingFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemSettingFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          findMany: {
            args: Prisma.SystemSettingFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>[]
          }
          create: {
            args: Prisma.SystemSettingCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          delete: {
            args: Prisma.SystemSettingDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          update: {
            args: Prisma.SystemSettingUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          deleteMany: {
            args: Prisma.SystemSettingDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.SystemSettingUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.SystemSettingUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          aggregate: {
            args: Prisma.SystemSettingAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSystemSetting>
          }
          groupBy: {
            args: Prisma.SystemSettingGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SystemSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemSettingCountArgs<ExtArgs>,
            result: $Utils.Optional<SystemSettingCountAggregateOutputType> | number
          }
        }
      }
      GameThreshold: {
        payload: Prisma.$GameThresholdPayload<ExtArgs>
        fields: Prisma.GameThresholdFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameThresholdFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GameThresholdPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameThresholdFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GameThresholdPayload>
          }
          findFirst: {
            args: Prisma.GameThresholdFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GameThresholdPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameThresholdFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GameThresholdPayload>
          }
          findMany: {
            args: Prisma.GameThresholdFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GameThresholdPayload>[]
          }
          create: {
            args: Prisma.GameThresholdCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GameThresholdPayload>
          }
          delete: {
            args: Prisma.GameThresholdDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GameThresholdPayload>
          }
          update: {
            args: Prisma.GameThresholdUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GameThresholdPayload>
          }
          deleteMany: {
            args: Prisma.GameThresholdDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.GameThresholdUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.GameThresholdUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GameThresholdPayload>
          }
          aggregate: {
            args: Prisma.GameThresholdAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateGameThreshold>
          }
          groupBy: {
            args: Prisma.GameThresholdGroupByArgs<ExtArgs>,
            result: $Utils.Optional<GameThresholdGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameThresholdCountArgs<ExtArgs>,
            result: $Utils.Optional<GameThresholdCountAggregateOutputType> | number
          }
        }
      }
      LandingPageContent: {
        payload: Prisma.$LandingPageContentPayload<ExtArgs>
        fields: Prisma.LandingPageContentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LandingPageContentFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LandingPageContentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LandingPageContentFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LandingPageContentPayload>
          }
          findFirst: {
            args: Prisma.LandingPageContentFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LandingPageContentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LandingPageContentFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LandingPageContentPayload>
          }
          findMany: {
            args: Prisma.LandingPageContentFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LandingPageContentPayload>[]
          }
          create: {
            args: Prisma.LandingPageContentCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LandingPageContentPayload>
          }
          delete: {
            args: Prisma.LandingPageContentDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LandingPageContentPayload>
          }
          update: {
            args: Prisma.LandingPageContentUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LandingPageContentPayload>
          }
          deleteMany: {
            args: Prisma.LandingPageContentDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.LandingPageContentUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.LandingPageContentUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LandingPageContentPayload>
          }
          aggregate: {
            args: Prisma.LandingPageContentAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateLandingPageContent>
          }
          groupBy: {
            args: Prisma.LandingPageContentGroupByArgs<ExtArgs>,
            result: $Utils.Optional<LandingPageContentGroupByOutputType>[]
          }
          count: {
            args: Prisma.LandingPageContentCountArgs<ExtArgs>,
            result: $Utils.Optional<LandingPageContentCountAggregateOutputType> | number
          }
        }
      }
      GamblingReport: {
        payload: Prisma.$GamblingReportPayload<ExtArgs>
        fields: Prisma.GamblingReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GamblingReportFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GamblingReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GamblingReportFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GamblingReportPayload>
          }
          findFirst: {
            args: Prisma.GamblingReportFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GamblingReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GamblingReportFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GamblingReportPayload>
          }
          findMany: {
            args: Prisma.GamblingReportFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GamblingReportPayload>[]
          }
          create: {
            args: Prisma.GamblingReportCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GamblingReportPayload>
          }
          delete: {
            args: Prisma.GamblingReportDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GamblingReportPayload>
          }
          update: {
            args: Prisma.GamblingReportUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GamblingReportPayload>
          }
          deleteMany: {
            args: Prisma.GamblingReportDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.GamblingReportUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.GamblingReportUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$GamblingReportPayload>
          }
          aggregate: {
            args: Prisma.GamblingReportAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateGamblingReport>
          }
          groupBy: {
            args: Prisma.GamblingReportGroupByArgs<ExtArgs>,
            result: $Utils.Optional<GamblingReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.GamblingReportCountArgs<ExtArgs>,
            result: $Utils.Optional<GamblingReportCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    addictionTests: number
    completions: number
    challengeProgress: number
    dailyCheckIns: number
    featureUsages: number
    gameSessions: number
    achievements: number
    gamblingReports: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    addictionTests?: boolean | UserCountOutputTypeCountAddictionTestsArgs
    completions?: boolean | UserCountOutputTypeCountCompletionsArgs
    challengeProgress?: boolean | UserCountOutputTypeCountChallengeProgressArgs
    dailyCheckIns?: boolean | UserCountOutputTypeCountDailyCheckInsArgs
    featureUsages?: boolean | UserCountOutputTypeCountFeatureUsagesArgs
    gameSessions?: boolean | UserCountOutputTypeCountGameSessionsArgs
    achievements?: boolean | UserCountOutputTypeCountAchievementsArgs
    gamblingReports?: boolean | UserCountOutputTypeCountGamblingReportsArgs
  }

  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAddictionTestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddictionTestWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCompletionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleCompletionWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChallengeProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChallengeProgressWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDailyCheckInsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyCheckInWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFeatureUsagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeatureUsageWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGameSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameSessionWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAchievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAchievementWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGamblingReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GamblingReportWhereInput
  }



  /**
   * Count Type AchievementCountOutputType
   */

  export type AchievementCountOutputType = {
    userRel: number
  }

  export type AchievementCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userRel?: boolean | AchievementCountOutputTypeCountUserRelArgs
  }

  // Custom InputTypes

  /**
   * AchievementCountOutputType without action
   */
  export type AchievementCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AchievementCountOutputType
     */
    select?: AchievementCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * AchievementCountOutputType without action
   */
  export type AchievementCountOutputTypeCountUserRelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAchievementWhereInput
  }



  /**
   * Count Type ArticleCountOutputType
   */

  export type ArticleCountOutputType = {
    completions: number
  }

  export type ArticleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    completions?: boolean | ArticleCountOutputTypeCountCompletionsArgs
  }

  // Custom InputTypes

  /**
   * ArticleCountOutputType without action
   */
  export type ArticleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCountOutputType
     */
    select?: ArticleCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * ArticleCountOutputType without action
   */
  export type ArticleCountOutputTypeCountCompletionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleCompletionWhereInput
  }



  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    xp: number | null
    level: number | null
    failedLoginAttempts: number | null
    streak: number | null
    longestStreak: number | null
  }

  export type UserSumAggregateOutputType = {
    xp: number | null
    level: number | null
    failedLoginAttempts: number | null
    streak: number | null
    longestStreak: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    phone: string | null
    role: string | null
    status: string | null
    xp: number | null
    level: number | null
    title: string | null
    lastActivity: string | null
    createdAt: Date | null
    updatedAt: Date | null
    failedLoginAttempts: number | null
    lockedUntil: Date | null
    streak: number | null
    longestStreak: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    phone: string | null
    role: string | null
    status: string | null
    xp: number | null
    level: number | null
    title: string | null
    lastActivity: string | null
    createdAt: Date | null
    updatedAt: Date | null
    failedLoginAttempts: number | null
    lockedUntil: Date | null
    streak: number | null
    longestStreak: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    phone: number
    role: number
    status: number
    xp: number
    level: number
    title: number
    lastActivity: number
    createdAt: number
    updatedAt: number
    failedLoginAttempts: number
    lockedUntil: number
    streak: number
    longestStreak: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    xp?: true
    level?: true
    failedLoginAttempts?: true
    streak?: true
    longestStreak?: true
  }

  export type UserSumAggregateInputType = {
    xp?: true
    level?: true
    failedLoginAttempts?: true
    streak?: true
    longestStreak?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    phone?: true
    role?: true
    status?: true
    xp?: true
    level?: true
    title?: true
    lastActivity?: true
    createdAt?: true
    updatedAt?: true
    failedLoginAttempts?: true
    lockedUntil?: true
    streak?: true
    longestStreak?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    phone?: true
    role?: true
    status?: true
    xp?: true
    level?: true
    title?: true
    lastActivity?: true
    createdAt?: true
    updatedAt?: true
    failedLoginAttempts?: true
    lockedUntil?: true
    streak?: true
    longestStreak?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    phone?: true
    role?: true
    status?: true
    xp?: true
    level?: true
    title?: true
    lastActivity?: true
    createdAt?: true
    updatedAt?: true
    failedLoginAttempts?: true
    lockedUntil?: true
    streak?: true
    longestStreak?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    email: string
    password: string
    phone: string | null
    role: string
    status: string
    xp: number
    level: number
    title: string | null
    lastActivity: string | null
    createdAt: Date
    updatedAt: Date
    failedLoginAttempts: number
    lockedUntil: Date | null
    streak: number
    longestStreak: number
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    role?: boolean
    status?: boolean
    xp?: boolean
    level?: boolean
    title?: boolean
    lastActivity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    failedLoginAttempts?: boolean
    lockedUntil?: boolean
    streak?: boolean
    longestStreak?: boolean
    addictionTests?: boolean | User$addictionTestsArgs<ExtArgs>
    completions?: boolean | User$completionsArgs<ExtArgs>
    challengeProgress?: boolean | User$challengeProgressArgs<ExtArgs>
    dailyCheckIns?: boolean | User$dailyCheckInsArgs<ExtArgs>
    featureUsages?: boolean | User$featureUsagesArgs<ExtArgs>
    gameSessions?: boolean | User$gameSessionsArgs<ExtArgs>
    achievements?: boolean | User$achievementsArgs<ExtArgs>
    gamblingReports?: boolean | User$gamblingReportsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    role?: boolean
    status?: boolean
    xp?: boolean
    level?: boolean
    title?: boolean
    lastActivity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    failedLoginAttempts?: boolean
    lockedUntil?: boolean
    streak?: boolean
    longestStreak?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    addictionTests?: boolean | User$addictionTestsArgs<ExtArgs>
    completions?: boolean | User$completionsArgs<ExtArgs>
    challengeProgress?: boolean | User$challengeProgressArgs<ExtArgs>
    dailyCheckIns?: boolean | User$dailyCheckInsArgs<ExtArgs>
    featureUsages?: boolean | User$featureUsagesArgs<ExtArgs>
    gameSessions?: boolean | User$gameSessionsArgs<ExtArgs>
    achievements?: boolean | User$achievementsArgs<ExtArgs>
    gamblingReports?: boolean | User$gamblingReportsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      addictionTests: Prisma.$AddictionTestPayload<ExtArgs>[]
      completions: Prisma.$ArticleCompletionPayload<ExtArgs>[]
      challengeProgress: Prisma.$ChallengeProgressPayload<ExtArgs>[]
      dailyCheckIns: Prisma.$DailyCheckInPayload<ExtArgs>[]
      featureUsages: Prisma.$FeatureUsagePayload<ExtArgs>[]
      gameSessions: Prisma.$GameSessionPayload<ExtArgs>[]
      achievements: Prisma.$UserAchievementPayload<ExtArgs>[]
      gamblingReports: Prisma.$GamblingReportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      password: string
      phone: string | null
      role: string
      status: string
      xp: number
      level: number
      title: string | null
      lastActivity: string | null
      createdAt: Date
      updatedAt: Date
      failedLoginAttempts: number
      lockedUntil: Date | null
      streak: number
      longestStreak: number
    }, ExtArgs["result"]["user"]>
    composites: {}
  }


  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    addictionTests<T extends User$addictionTestsArgs<ExtArgs> = {}>(args?: Subset<T, User$addictionTestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddictionTestPayload<ExtArgs>, T, 'findMany'> | Null>;

    completions<T extends User$completionsArgs<ExtArgs> = {}>(args?: Subset<T, User$completionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleCompletionPayload<ExtArgs>, T, 'findMany'> | Null>;

    challengeProgress<T extends User$challengeProgressArgs<ExtArgs> = {}>(args?: Subset<T, User$challengeProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengeProgressPayload<ExtArgs>, T, 'findMany'> | Null>;

    dailyCheckIns<T extends User$dailyCheckInsArgs<ExtArgs> = {}>(args?: Subset<T, User$dailyCheckInsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyCheckInPayload<ExtArgs>, T, 'findMany'> | Null>;

    featureUsages<T extends User$featureUsagesArgs<ExtArgs> = {}>(args?: Subset<T, User$featureUsagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeatureUsagePayload<ExtArgs>, T, 'findMany'> | Null>;

    gameSessions<T extends User$gameSessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$gameSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, 'findMany'> | Null>;

    achievements<T extends User$achievementsArgs<ExtArgs> = {}>(args?: Subset<T, User$achievementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, 'findMany'> | Null>;

    gamblingReports<T extends User$gamblingReportsArgs<ExtArgs> = {}>(args?: Subset<T, User$gamblingReportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamblingReportPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'String'>
    readonly xp: FieldRef<"User", 'Int'>
    readonly level: FieldRef<"User", 'Int'>
    readonly title: FieldRef<"User", 'String'>
    readonly lastActivity: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly failedLoginAttempts: FieldRef<"User", 'Int'>
    readonly lockedUntil: FieldRef<"User", 'DateTime'>
    readonly streak: FieldRef<"User", 'Int'>
    readonly longestStreak: FieldRef<"User", 'Int'>
  }
    

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User.addictionTests
   */
  export type User$addictionTestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddictionTest
     */
    select?: AddictionTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddictionTestInclude<ExtArgs> | null
    where?: AddictionTestWhereInput
    orderBy?: AddictionTestOrderByWithRelationInput | AddictionTestOrderByWithRelationInput[]
    cursor?: AddictionTestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddictionTestScalarFieldEnum | AddictionTestScalarFieldEnum[]
  }


  /**
   * User.completions
   */
  export type User$completionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCompletion
     */
    select?: ArticleCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleCompletionInclude<ExtArgs> | null
    where?: ArticleCompletionWhereInput
    orderBy?: ArticleCompletionOrderByWithRelationInput | ArticleCompletionOrderByWithRelationInput[]
    cursor?: ArticleCompletionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleCompletionScalarFieldEnum | ArticleCompletionScalarFieldEnum[]
  }


  /**
   * User.challengeProgress
   */
  export type User$challengeProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeProgress
     */
    select?: ChallengeProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChallengeProgressInclude<ExtArgs> | null
    where?: ChallengeProgressWhereInput
    orderBy?: ChallengeProgressOrderByWithRelationInput | ChallengeProgressOrderByWithRelationInput[]
    cursor?: ChallengeProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChallengeProgressScalarFieldEnum | ChallengeProgressScalarFieldEnum[]
  }


  /**
   * User.dailyCheckIns
   */
  export type User$dailyCheckInsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyCheckIn
     */
    select?: DailyCheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DailyCheckInInclude<ExtArgs> | null
    where?: DailyCheckInWhereInput
    orderBy?: DailyCheckInOrderByWithRelationInput | DailyCheckInOrderByWithRelationInput[]
    cursor?: DailyCheckInWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailyCheckInScalarFieldEnum | DailyCheckInScalarFieldEnum[]
  }


  /**
   * User.featureUsages
   */
  export type User$featureUsagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureUsage
     */
    select?: FeatureUsageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureUsageInclude<ExtArgs> | null
    where?: FeatureUsageWhereInput
    orderBy?: FeatureUsageOrderByWithRelationInput | FeatureUsageOrderByWithRelationInput[]
    cursor?: FeatureUsageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeatureUsageScalarFieldEnum | FeatureUsageScalarFieldEnum[]
  }


  /**
   * User.gameSessions
   */
  export type User$gameSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameSessionInclude<ExtArgs> | null
    where?: GameSessionWhereInput
    orderBy?: GameSessionOrderByWithRelationInput | GameSessionOrderByWithRelationInput[]
    cursor?: GameSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameSessionScalarFieldEnum | GameSessionScalarFieldEnum[]
  }


  /**
   * User.achievements
   */
  export type User$achievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAchievementInclude<ExtArgs> | null
    where?: UserAchievementWhereInput
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    cursor?: UserAchievementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }


  /**
   * User.gamblingReports
   */
  export type User$gamblingReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamblingReport
     */
    select?: GamblingReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GamblingReportInclude<ExtArgs> | null
    where?: GamblingReportWhereInput
    orderBy?: GamblingReportOrderByWithRelationInput | GamblingReportOrderByWithRelationInput[]
    cursor?: GamblingReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GamblingReportScalarFieldEnum | GamblingReportScalarFieldEnum[]
  }


  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
  }



  /**
   * Model Achievement
   */

  export type AggregateAchievement = {
    _count: AchievementCountAggregateOutputType | null
    _avg: AchievementAvgAggregateOutputType | null
    _sum: AchievementSumAggregateOutputType | null
    _min: AchievementMinAggregateOutputType | null
    _max: AchievementMaxAggregateOutputType | null
  }

  export type AchievementAvgAggregateOutputType = {
    targetValue: number | null
  }

  export type AchievementSumAggregateOutputType = {
    targetValue: number | null
  }

  export type AchievementMinAggregateOutputType = {
    id: string | null
    key: string | null
    title: string | null
    description: string | null
    mission: string | null
    category: string | null
    targetValue: number | null
    iconName: string | null
    rewardTitle: string | null
    createdAt: Date | null
  }

  export type AchievementMaxAggregateOutputType = {
    id: string | null
    key: string | null
    title: string | null
    description: string | null
    mission: string | null
    category: string | null
    targetValue: number | null
    iconName: string | null
    rewardTitle: string | null
    createdAt: Date | null
  }

  export type AchievementCountAggregateOutputType = {
    id: number
    key: number
    title: number
    description: number
    mission: number
    category: number
    targetValue: number
    iconName: number
    rewardTitle: number
    createdAt: number
    _all: number
  }


  export type AchievementAvgAggregateInputType = {
    targetValue?: true
  }

  export type AchievementSumAggregateInputType = {
    targetValue?: true
  }

  export type AchievementMinAggregateInputType = {
    id?: true
    key?: true
    title?: true
    description?: true
    mission?: true
    category?: true
    targetValue?: true
    iconName?: true
    rewardTitle?: true
    createdAt?: true
  }

  export type AchievementMaxAggregateInputType = {
    id?: true
    key?: true
    title?: true
    description?: true
    mission?: true
    category?: true
    targetValue?: true
    iconName?: true
    rewardTitle?: true
    createdAt?: true
  }

  export type AchievementCountAggregateInputType = {
    id?: true
    key?: true
    title?: true
    description?: true
    mission?: true
    category?: true
    targetValue?: true
    iconName?: true
    rewardTitle?: true
    createdAt?: true
    _all?: true
  }

  export type AchievementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Achievement to aggregate.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Achievements
    **/
    _count?: true | AchievementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AchievementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AchievementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AchievementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AchievementMaxAggregateInputType
  }

  export type GetAchievementAggregateType<T extends AchievementAggregateArgs> = {
        [P in keyof T & keyof AggregateAchievement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAchievement[P]>
      : GetScalarType<T[P], AggregateAchievement[P]>
  }




  export type AchievementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AchievementWhereInput
    orderBy?: AchievementOrderByWithAggregationInput | AchievementOrderByWithAggregationInput[]
    by: AchievementScalarFieldEnum[] | AchievementScalarFieldEnum
    having?: AchievementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AchievementCountAggregateInputType | true
    _avg?: AchievementAvgAggregateInputType
    _sum?: AchievementSumAggregateInputType
    _min?: AchievementMinAggregateInputType
    _max?: AchievementMaxAggregateInputType
  }

  export type AchievementGroupByOutputType = {
    id: string
    key: string
    title: string
    description: string
    mission: string
    category: string
    targetValue: number
    iconName: string
    rewardTitle: string | null
    createdAt: Date
    _count: AchievementCountAggregateOutputType | null
    _avg: AchievementAvgAggregateOutputType | null
    _sum: AchievementSumAggregateOutputType | null
    _min: AchievementMinAggregateOutputType | null
    _max: AchievementMaxAggregateOutputType | null
  }

  type GetAchievementGroupByPayload<T extends AchievementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AchievementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AchievementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AchievementGroupByOutputType[P]>
            : GetScalarType<T[P], AchievementGroupByOutputType[P]>
        }
      >
    >


  export type AchievementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    title?: boolean
    description?: boolean
    mission?: boolean
    category?: boolean
    targetValue?: boolean
    iconName?: boolean
    rewardTitle?: boolean
    createdAt?: boolean
    userRel?: boolean | Achievement$userRelArgs<ExtArgs>
    _count?: boolean | AchievementCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["achievement"]>

  export type AchievementSelectScalar = {
    id?: boolean
    key?: boolean
    title?: boolean
    description?: boolean
    mission?: boolean
    category?: boolean
    targetValue?: boolean
    iconName?: boolean
    rewardTitle?: boolean
    createdAt?: boolean
  }

  export type AchievementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userRel?: boolean | Achievement$userRelArgs<ExtArgs>
    _count?: boolean | AchievementCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $AchievementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Achievement"
    objects: {
      userRel: Prisma.$UserAchievementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      title: string
      description: string
      mission: string
      category: string
      targetValue: number
      iconName: string
      rewardTitle: string | null
      createdAt: Date
    }, ExtArgs["result"]["achievement"]>
    composites: {}
  }


  type AchievementGetPayload<S extends boolean | null | undefined | AchievementDefaultArgs> = $Result.GetResult<Prisma.$AchievementPayload, S>

  type AchievementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AchievementFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AchievementCountAggregateInputType | true
    }

  export interface AchievementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Achievement'], meta: { name: 'Achievement' } }
    /**
     * Find zero or one Achievement that matches the filter.
     * @param {AchievementFindUniqueArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AchievementFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, AchievementFindUniqueArgs<ExtArgs>>
    ): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Achievement that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AchievementFindUniqueOrThrowArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AchievementFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AchievementFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Achievement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindFirstArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AchievementFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, AchievementFindFirstArgs<ExtArgs>>
    ): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Achievement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindFirstOrThrowArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AchievementFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AchievementFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Achievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Achievements
     * const achievements = await prisma.achievement.findMany()
     * 
     * // Get first 10 Achievements
     * const achievements = await prisma.achievement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const achievementWithIdOnly = await prisma.achievement.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AchievementFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AchievementFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Achievement.
     * @param {AchievementCreateArgs} args - Arguments to create a Achievement.
     * @example
     * // Create one Achievement
     * const Achievement = await prisma.achievement.create({
     *   data: {
     *     // ... data to create a Achievement
     *   }
     * })
     * 
    **/
    create<T extends AchievementCreateArgs<ExtArgs>>(
      args: SelectSubset<T, AchievementCreateArgs<ExtArgs>>
    ): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a Achievement.
     * @param {AchievementDeleteArgs} args - Arguments to delete one Achievement.
     * @example
     * // Delete one Achievement
     * const Achievement = await prisma.achievement.delete({
     *   where: {
     *     // ... filter to delete one Achievement
     *   }
     * })
     * 
    **/
    delete<T extends AchievementDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, AchievementDeleteArgs<ExtArgs>>
    ): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Achievement.
     * @param {AchievementUpdateArgs} args - Arguments to update one Achievement.
     * @example
     * // Update one Achievement
     * const achievement = await prisma.achievement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AchievementUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, AchievementUpdateArgs<ExtArgs>>
    ): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Achievements.
     * @param {AchievementDeleteManyArgs} args - Arguments to filter Achievements to delete.
     * @example
     * // Delete a few Achievements
     * const { count } = await prisma.achievement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AchievementDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AchievementDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Achievements
     * const achievement = await prisma.achievement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AchievementUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, AchievementUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Achievement.
     * @param {AchievementUpsertArgs} args - Arguments to update or create a Achievement.
     * @example
     * // Update or create a Achievement
     * const achievement = await prisma.achievement.upsert({
     *   create: {
     *     // ... data to create a Achievement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Achievement we want to update
     *   }
     * })
    **/
    upsert<T extends AchievementUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, AchievementUpsertArgs<ExtArgs>>
    ): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementCountArgs} args - Arguments to filter Achievements to count.
     * @example
     * // Count the number of Achievements
     * const count = await prisma.achievement.count({
     *   where: {
     *     // ... the filter for the Achievements we want to count
     *   }
     * })
    **/
    count<T extends AchievementCountArgs>(
      args?: Subset<T, AchievementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AchievementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Achievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AchievementAggregateArgs>(args: Subset<T, AchievementAggregateArgs>): Prisma.PrismaPromise<GetAchievementAggregateType<T>>

    /**
     * Group by Achievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AchievementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AchievementGroupByArgs['orderBy'] }
        : { orderBy?: AchievementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AchievementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAchievementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Achievement model
   */
  readonly fields: AchievementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Achievement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AchievementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    userRel<T extends Achievement$userRelArgs<ExtArgs> = {}>(args?: Subset<T, Achievement$userRelArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Achievement model
   */ 
  interface AchievementFieldRefs {
    readonly id: FieldRef<"Achievement", 'String'>
    readonly key: FieldRef<"Achievement", 'String'>
    readonly title: FieldRef<"Achievement", 'String'>
    readonly description: FieldRef<"Achievement", 'String'>
    readonly mission: FieldRef<"Achievement", 'String'>
    readonly category: FieldRef<"Achievement", 'String'>
    readonly targetValue: FieldRef<"Achievement", 'Int'>
    readonly iconName: FieldRef<"Achievement", 'String'>
    readonly rewardTitle: FieldRef<"Achievement", 'String'>
    readonly createdAt: FieldRef<"Achievement", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Achievement findUnique
   */
  export type AchievementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where: AchievementWhereUniqueInput
  }


  /**
   * Achievement findUniqueOrThrow
   */
  export type AchievementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where: AchievementWhereUniqueInput
  }


  /**
   * Achievement findFirst
   */
  export type AchievementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievements.
     */
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }


  /**
   * Achievement findFirstOrThrow
   */
  export type AchievementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievements.
     */
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }


  /**
   * Achievement findMany
   */
  export type AchievementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievements to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }


  /**
   * Achievement create
   */
  export type AchievementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * The data needed to create a Achievement.
     */
    data: XOR<AchievementCreateInput, AchievementUncheckedCreateInput>
  }


  /**
   * Achievement update
   */
  export type AchievementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * The data needed to update a Achievement.
     */
    data: XOR<AchievementUpdateInput, AchievementUncheckedUpdateInput>
    /**
     * Choose, which Achievement to update.
     */
    where: AchievementWhereUniqueInput
  }


  /**
   * Achievement updateMany
   */
  export type AchievementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Achievements.
     */
    data: XOR<AchievementUpdateManyMutationInput, AchievementUncheckedUpdateManyInput>
    /**
     * Filter which Achievements to update
     */
    where?: AchievementWhereInput
  }


  /**
   * Achievement upsert
   */
  export type AchievementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * The filter to search for the Achievement to update in case it exists.
     */
    where: AchievementWhereUniqueInput
    /**
     * In case the Achievement found by the `where` argument doesn't exist, create a new Achievement with this data.
     */
    create: XOR<AchievementCreateInput, AchievementUncheckedCreateInput>
    /**
     * In case the Achievement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AchievementUpdateInput, AchievementUncheckedUpdateInput>
  }


  /**
   * Achievement delete
   */
  export type AchievementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter which Achievement to delete.
     */
    where: AchievementWhereUniqueInput
  }


  /**
   * Achievement deleteMany
   */
  export type AchievementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Achievements to delete
     */
    where?: AchievementWhereInput
  }


  /**
   * Achievement.userRel
   */
  export type Achievement$userRelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAchievementInclude<ExtArgs> | null
    where?: UserAchievementWhereInput
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    cursor?: UserAchievementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }


  /**
   * Achievement without action
   */
  export type AchievementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude<ExtArgs> | null
  }



  /**
   * Model UserAchievement
   */

  export type AggregateUserAchievement = {
    _count: UserAchievementCountAggregateOutputType | null
    _avg: UserAchievementAvgAggregateOutputType | null
    _sum: UserAchievementSumAggregateOutputType | null
    _min: UserAchievementMinAggregateOutputType | null
    _max: UserAchievementMaxAggregateOutputType | null
  }

  export type UserAchievementAvgAggregateOutputType = {
    progress: number | null
  }

  export type UserAchievementSumAggregateOutputType = {
    progress: number | null
  }

  export type UserAchievementMinAggregateOutputType = {
    id: string | null
    userId: string | null
    achievementId: string | null
    progress: number | null
    isUnlocked: boolean | null
    unlockedAt: Date | null
    updatedAt: Date | null
  }

  export type UserAchievementMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    achievementId: string | null
    progress: number | null
    isUnlocked: boolean | null
    unlockedAt: Date | null
    updatedAt: Date | null
  }

  export type UserAchievementCountAggregateOutputType = {
    id: number
    userId: number
    achievementId: number
    progress: number
    isUnlocked: number
    unlockedAt: number
    updatedAt: number
    _all: number
  }


  export type UserAchievementAvgAggregateInputType = {
    progress?: true
  }

  export type UserAchievementSumAggregateInputType = {
    progress?: true
  }

  export type UserAchievementMinAggregateInputType = {
    id?: true
    userId?: true
    achievementId?: true
    progress?: true
    isUnlocked?: true
    unlockedAt?: true
    updatedAt?: true
  }

  export type UserAchievementMaxAggregateInputType = {
    id?: true
    userId?: true
    achievementId?: true
    progress?: true
    isUnlocked?: true
    unlockedAt?: true
    updatedAt?: true
  }

  export type UserAchievementCountAggregateInputType = {
    id?: true
    userId?: true
    achievementId?: true
    progress?: true
    isUnlocked?: true
    unlockedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAchievementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAchievement to aggregate.
     */
    where?: UserAchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserAchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAchievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserAchievements
    **/
    _count?: true | UserAchievementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAchievementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserAchievementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserAchievementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserAchievementMaxAggregateInputType
  }

  export type GetUserAchievementAggregateType<T extends UserAchievementAggregateArgs> = {
        [P in keyof T & keyof AggregateUserAchievement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserAchievement[P]>
      : GetScalarType<T[P], AggregateUserAchievement[P]>
  }




  export type UserAchievementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAchievementWhereInput
    orderBy?: UserAchievementOrderByWithAggregationInput | UserAchievementOrderByWithAggregationInput[]
    by: UserAchievementScalarFieldEnum[] | UserAchievementScalarFieldEnum
    having?: UserAchievementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserAchievementCountAggregateInputType | true
    _avg?: UserAchievementAvgAggregateInputType
    _sum?: UserAchievementSumAggregateInputType
    _min?: UserAchievementMinAggregateInputType
    _max?: UserAchievementMaxAggregateInputType
  }

  export type UserAchievementGroupByOutputType = {
    id: string
    userId: string
    achievementId: string
    progress: number
    isUnlocked: boolean
    unlockedAt: Date | null
    updatedAt: Date
    _count: UserAchievementCountAggregateOutputType | null
    _avg: UserAchievementAvgAggregateOutputType | null
    _sum: UserAchievementSumAggregateOutputType | null
    _min: UserAchievementMinAggregateOutputType | null
    _max: UserAchievementMaxAggregateOutputType | null
  }

  type GetUserAchievementGroupByPayload<T extends UserAchievementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserAchievementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserAchievementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserAchievementGroupByOutputType[P]>
            : GetScalarType<T[P], UserAchievementGroupByOutputType[P]>
        }
      >
    >


  export type UserAchievementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    achievementId?: boolean
    progress?: boolean
    isUnlocked?: boolean
    unlockedAt?: boolean
    updatedAt?: boolean
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAchievement"]>

  export type UserAchievementSelectScalar = {
    id?: boolean
    userId?: boolean
    achievementId?: boolean
    progress?: boolean
    isUnlocked?: boolean
    unlockedAt?: boolean
    updatedAt?: boolean
  }

  export type UserAchievementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $UserAchievementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserAchievement"
    objects: {
      achievement: Prisma.$AchievementPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      achievementId: string
      progress: number
      isUnlocked: boolean
      unlockedAt: Date | null
      updatedAt: Date
    }, ExtArgs["result"]["userAchievement"]>
    composites: {}
  }


  type UserAchievementGetPayload<S extends boolean | null | undefined | UserAchievementDefaultArgs> = $Result.GetResult<Prisma.$UserAchievementPayload, S>

  type UserAchievementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserAchievementFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserAchievementCountAggregateInputType | true
    }

  export interface UserAchievementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserAchievement'], meta: { name: 'UserAchievement' } }
    /**
     * Find zero or one UserAchievement that matches the filter.
     * @param {UserAchievementFindUniqueArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserAchievementFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserAchievementFindUniqueArgs<ExtArgs>>
    ): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one UserAchievement that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserAchievementFindUniqueOrThrowArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserAchievementFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserAchievementFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first UserAchievement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementFindFirstArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserAchievementFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserAchievementFindFirstArgs<ExtArgs>>
    ): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first UserAchievement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementFindFirstOrThrowArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserAchievementFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserAchievementFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more UserAchievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserAchievements
     * const userAchievements = await prisma.userAchievement.findMany()
     * 
     * // Get first 10 UserAchievements
     * const userAchievements = await prisma.userAchievement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userAchievementWithIdOnly = await prisma.userAchievement.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserAchievementFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserAchievementFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a UserAchievement.
     * @param {UserAchievementCreateArgs} args - Arguments to create a UserAchievement.
     * @example
     * // Create one UserAchievement
     * const UserAchievement = await prisma.userAchievement.create({
     *   data: {
     *     // ... data to create a UserAchievement
     *   }
     * })
     * 
    **/
    create<T extends UserAchievementCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserAchievementCreateArgs<ExtArgs>>
    ): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a UserAchievement.
     * @param {UserAchievementDeleteArgs} args - Arguments to delete one UserAchievement.
     * @example
     * // Delete one UserAchievement
     * const UserAchievement = await prisma.userAchievement.delete({
     *   where: {
     *     // ... filter to delete one UserAchievement
     *   }
     * })
     * 
    **/
    delete<T extends UserAchievementDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserAchievementDeleteArgs<ExtArgs>>
    ): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one UserAchievement.
     * @param {UserAchievementUpdateArgs} args - Arguments to update one UserAchievement.
     * @example
     * // Update one UserAchievement
     * const userAchievement = await prisma.userAchievement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserAchievementUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserAchievementUpdateArgs<ExtArgs>>
    ): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more UserAchievements.
     * @param {UserAchievementDeleteManyArgs} args - Arguments to filter UserAchievements to delete.
     * @example
     * // Delete a few UserAchievements
     * const { count } = await prisma.userAchievement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserAchievementDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserAchievementDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAchievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserAchievements
     * const userAchievement = await prisma.userAchievement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserAchievementUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserAchievementUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserAchievement.
     * @param {UserAchievementUpsertArgs} args - Arguments to update or create a UserAchievement.
     * @example
     * // Update or create a UserAchievement
     * const userAchievement = await prisma.userAchievement.upsert({
     *   create: {
     *     // ... data to create a UserAchievement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserAchievement we want to update
     *   }
     * })
    **/
    upsert<T extends UserAchievementUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserAchievementUpsertArgs<ExtArgs>>
    ): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of UserAchievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementCountArgs} args - Arguments to filter UserAchievements to count.
     * @example
     * // Count the number of UserAchievements
     * const count = await prisma.userAchievement.count({
     *   where: {
     *     // ... the filter for the UserAchievements we want to count
     *   }
     * })
    **/
    count<T extends UserAchievementCountArgs>(
      args?: Subset<T, UserAchievementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserAchievementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserAchievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAchievementAggregateArgs>(args: Subset<T, UserAchievementAggregateArgs>): Prisma.PrismaPromise<GetUserAchievementAggregateType<T>>

    /**
     * Group by UserAchievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserAchievementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserAchievementGroupByArgs['orderBy'] }
        : { orderBy?: UserAchievementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserAchievementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAchievementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserAchievement model
   */
  readonly fields: UserAchievementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserAchievement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserAchievementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    achievement<T extends AchievementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AchievementDefaultArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the UserAchievement model
   */ 
  interface UserAchievementFieldRefs {
    readonly id: FieldRef<"UserAchievement", 'String'>
    readonly userId: FieldRef<"UserAchievement", 'String'>
    readonly achievementId: FieldRef<"UserAchievement", 'String'>
    readonly progress: FieldRef<"UserAchievement", 'Int'>
    readonly isUnlocked: FieldRef<"UserAchievement", 'Boolean'>
    readonly unlockedAt: FieldRef<"UserAchievement", 'DateTime'>
    readonly updatedAt: FieldRef<"UserAchievement", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * UserAchievement findUnique
   */
  export type UserAchievementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievement to fetch.
     */
    where: UserAchievementWhereUniqueInput
  }


  /**
   * UserAchievement findUniqueOrThrow
   */
  export type UserAchievementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievement to fetch.
     */
    where: UserAchievementWhereUniqueInput
  }


  /**
   * UserAchievement findFirst
   */
  export type UserAchievementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievement to fetch.
     */
    where?: UserAchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAchievements.
     */
    cursor?: UserAchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAchievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAchievements.
     */
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }


  /**
   * UserAchievement findFirstOrThrow
   */
  export type UserAchievementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievement to fetch.
     */
    where?: UserAchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAchievements.
     */
    cursor?: UserAchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAchievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAchievements.
     */
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }


  /**
   * UserAchievement findMany
   */
  export type UserAchievementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievements to fetch.
     */
    where?: UserAchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserAchievements.
     */
    cursor?: UserAchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAchievements.
     */
    skip?: number
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }


  /**
   * UserAchievement create
   */
  export type UserAchievementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * The data needed to create a UserAchievement.
     */
    data: XOR<UserAchievementCreateInput, UserAchievementUncheckedCreateInput>
  }


  /**
   * UserAchievement update
   */
  export type UserAchievementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * The data needed to update a UserAchievement.
     */
    data: XOR<UserAchievementUpdateInput, UserAchievementUncheckedUpdateInput>
    /**
     * Choose, which UserAchievement to update.
     */
    where: UserAchievementWhereUniqueInput
  }


  /**
   * UserAchievement updateMany
   */
  export type UserAchievementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserAchievements.
     */
    data: XOR<UserAchievementUpdateManyMutationInput, UserAchievementUncheckedUpdateManyInput>
    /**
     * Filter which UserAchievements to update
     */
    where?: UserAchievementWhereInput
  }


  /**
   * UserAchievement upsert
   */
  export type UserAchievementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * The filter to search for the UserAchievement to update in case it exists.
     */
    where: UserAchievementWhereUniqueInput
    /**
     * In case the UserAchievement found by the `where` argument doesn't exist, create a new UserAchievement with this data.
     */
    create: XOR<UserAchievementCreateInput, UserAchievementUncheckedCreateInput>
    /**
     * In case the UserAchievement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserAchievementUpdateInput, UserAchievementUncheckedUpdateInput>
  }


  /**
   * UserAchievement delete
   */
  export type UserAchievementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter which UserAchievement to delete.
     */
    where: UserAchievementWhereUniqueInput
  }


  /**
   * UserAchievement deleteMany
   */
  export type UserAchievementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAchievements to delete
     */
    where?: UserAchievementWhereInput
  }


  /**
   * UserAchievement without action
   */
  export type UserAchievementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserAchievementInclude<ExtArgs> | null
  }



  /**
   * Model AddictionTest
   */

  export type AggregateAddictionTest = {
    _count: AddictionTestCountAggregateOutputType | null
    _avg: AddictionTestAvgAggregateOutputType | null
    _sum: AddictionTestSumAggregateOutputType | null
    _min: AddictionTestMinAggregateOutputType | null
    _max: AddictionTestMaxAggregateOutputType | null
  }

  export type AddictionTestAvgAggregateOutputType = {
    score: number | null
  }

  export type AddictionTestSumAggregateOutputType = {
    score: number | null
  }

  export type AddictionTestMinAggregateOutputType = {
    id: string | null
    userId: string | null
    score: number | null
    category: string | null
    createdAt: Date | null
  }

  export type AddictionTestMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    score: number | null
    category: string | null
    createdAt: Date | null
  }

  export type AddictionTestCountAggregateOutputType = {
    id: number
    userId: number
    score: number
    category: number
    createdAt: number
    _all: number
  }


  export type AddictionTestAvgAggregateInputType = {
    score?: true
  }

  export type AddictionTestSumAggregateInputType = {
    score?: true
  }

  export type AddictionTestMinAggregateInputType = {
    id?: true
    userId?: true
    score?: true
    category?: true
    createdAt?: true
  }

  export type AddictionTestMaxAggregateInputType = {
    id?: true
    userId?: true
    score?: true
    category?: true
    createdAt?: true
  }

  export type AddictionTestCountAggregateInputType = {
    id?: true
    userId?: true
    score?: true
    category?: true
    createdAt?: true
    _all?: true
  }

  export type AddictionTestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AddictionTest to aggregate.
     */
    where?: AddictionTestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddictionTests to fetch.
     */
    orderBy?: AddictionTestOrderByWithRelationInput | AddictionTestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddictionTestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddictionTests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddictionTests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AddictionTests
    **/
    _count?: true | AddictionTestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AddictionTestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AddictionTestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddictionTestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddictionTestMaxAggregateInputType
  }

  export type GetAddictionTestAggregateType<T extends AddictionTestAggregateArgs> = {
        [P in keyof T & keyof AggregateAddictionTest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddictionTest[P]>
      : GetScalarType<T[P], AggregateAddictionTest[P]>
  }




  export type AddictionTestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddictionTestWhereInput
    orderBy?: AddictionTestOrderByWithAggregationInput | AddictionTestOrderByWithAggregationInput[]
    by: AddictionTestScalarFieldEnum[] | AddictionTestScalarFieldEnum
    having?: AddictionTestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddictionTestCountAggregateInputType | true
    _avg?: AddictionTestAvgAggregateInputType
    _sum?: AddictionTestSumAggregateInputType
    _min?: AddictionTestMinAggregateInputType
    _max?: AddictionTestMaxAggregateInputType
  }

  export type AddictionTestGroupByOutputType = {
    id: string
    userId: string
    score: number
    category: string
    createdAt: Date
    _count: AddictionTestCountAggregateOutputType | null
    _avg: AddictionTestAvgAggregateOutputType | null
    _sum: AddictionTestSumAggregateOutputType | null
    _min: AddictionTestMinAggregateOutputType | null
    _max: AddictionTestMaxAggregateOutputType | null
  }

  type GetAddictionTestGroupByPayload<T extends AddictionTestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddictionTestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddictionTestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddictionTestGroupByOutputType[P]>
            : GetScalarType<T[P], AddictionTestGroupByOutputType[P]>
        }
      >
    >


  export type AddictionTestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    score?: boolean
    category?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["addictionTest"]>

  export type AddictionTestSelectScalar = {
    id?: boolean
    userId?: boolean
    score?: boolean
    category?: boolean
    createdAt?: boolean
  }

  export type AddictionTestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $AddictionTestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AddictionTest"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      score: number
      category: string
      createdAt: Date
    }, ExtArgs["result"]["addictionTest"]>
    composites: {}
  }


  type AddictionTestGetPayload<S extends boolean | null | undefined | AddictionTestDefaultArgs> = $Result.GetResult<Prisma.$AddictionTestPayload, S>

  type AddictionTestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AddictionTestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AddictionTestCountAggregateInputType | true
    }

  export interface AddictionTestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AddictionTest'], meta: { name: 'AddictionTest' } }
    /**
     * Find zero or one AddictionTest that matches the filter.
     * @param {AddictionTestFindUniqueArgs} args - Arguments to find a AddictionTest
     * @example
     * // Get one AddictionTest
     * const addictionTest = await prisma.addictionTest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AddictionTestFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, AddictionTestFindUniqueArgs<ExtArgs>>
    ): Prisma__AddictionTestClient<$Result.GetResult<Prisma.$AddictionTestPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one AddictionTest that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AddictionTestFindUniqueOrThrowArgs} args - Arguments to find a AddictionTest
     * @example
     * // Get one AddictionTest
     * const addictionTest = await prisma.addictionTest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AddictionTestFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AddictionTestFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__AddictionTestClient<$Result.GetResult<Prisma.$AddictionTestPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first AddictionTest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddictionTestFindFirstArgs} args - Arguments to find a AddictionTest
     * @example
     * // Get one AddictionTest
     * const addictionTest = await prisma.addictionTest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AddictionTestFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, AddictionTestFindFirstArgs<ExtArgs>>
    ): Prisma__AddictionTestClient<$Result.GetResult<Prisma.$AddictionTestPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first AddictionTest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddictionTestFindFirstOrThrowArgs} args - Arguments to find a AddictionTest
     * @example
     * // Get one AddictionTest
     * const addictionTest = await prisma.addictionTest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AddictionTestFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AddictionTestFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__AddictionTestClient<$Result.GetResult<Prisma.$AddictionTestPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more AddictionTests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddictionTestFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AddictionTests
     * const addictionTests = await prisma.addictionTest.findMany()
     * 
     * // Get first 10 AddictionTests
     * const addictionTests = await prisma.addictionTest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addictionTestWithIdOnly = await prisma.addictionTest.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AddictionTestFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AddictionTestFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddictionTestPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a AddictionTest.
     * @param {AddictionTestCreateArgs} args - Arguments to create a AddictionTest.
     * @example
     * // Create one AddictionTest
     * const AddictionTest = await prisma.addictionTest.create({
     *   data: {
     *     // ... data to create a AddictionTest
     *   }
     * })
     * 
    **/
    create<T extends AddictionTestCreateArgs<ExtArgs>>(
      args: SelectSubset<T, AddictionTestCreateArgs<ExtArgs>>
    ): Prisma__AddictionTestClient<$Result.GetResult<Prisma.$AddictionTestPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a AddictionTest.
     * @param {AddictionTestDeleteArgs} args - Arguments to delete one AddictionTest.
     * @example
     * // Delete one AddictionTest
     * const AddictionTest = await prisma.addictionTest.delete({
     *   where: {
     *     // ... filter to delete one AddictionTest
     *   }
     * })
     * 
    **/
    delete<T extends AddictionTestDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, AddictionTestDeleteArgs<ExtArgs>>
    ): Prisma__AddictionTestClient<$Result.GetResult<Prisma.$AddictionTestPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one AddictionTest.
     * @param {AddictionTestUpdateArgs} args - Arguments to update one AddictionTest.
     * @example
     * // Update one AddictionTest
     * const addictionTest = await prisma.addictionTest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AddictionTestUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, AddictionTestUpdateArgs<ExtArgs>>
    ): Prisma__AddictionTestClient<$Result.GetResult<Prisma.$AddictionTestPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more AddictionTests.
     * @param {AddictionTestDeleteManyArgs} args - Arguments to filter AddictionTests to delete.
     * @example
     * // Delete a few AddictionTests
     * const { count } = await prisma.addictionTest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AddictionTestDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AddictionTestDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AddictionTests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddictionTestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AddictionTests
     * const addictionTest = await prisma.addictionTest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AddictionTestUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, AddictionTestUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AddictionTest.
     * @param {AddictionTestUpsertArgs} args - Arguments to update or create a AddictionTest.
     * @example
     * // Update or create a AddictionTest
     * const addictionTest = await prisma.addictionTest.upsert({
     *   create: {
     *     // ... data to create a AddictionTest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AddictionTest we want to update
     *   }
     * })
    **/
    upsert<T extends AddictionTestUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, AddictionTestUpsertArgs<ExtArgs>>
    ): Prisma__AddictionTestClient<$Result.GetResult<Prisma.$AddictionTestPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of AddictionTests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddictionTestCountArgs} args - Arguments to filter AddictionTests to count.
     * @example
     * // Count the number of AddictionTests
     * const count = await prisma.addictionTest.count({
     *   where: {
     *     // ... the filter for the AddictionTests we want to count
     *   }
     * })
    **/
    count<T extends AddictionTestCountArgs>(
      args?: Subset<T, AddictionTestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddictionTestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AddictionTest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddictionTestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AddictionTestAggregateArgs>(args: Subset<T, AddictionTestAggregateArgs>): Prisma.PrismaPromise<GetAddictionTestAggregateType<T>>

    /**
     * Group by AddictionTest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddictionTestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AddictionTestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddictionTestGroupByArgs['orderBy'] }
        : { orderBy?: AddictionTestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AddictionTestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddictionTestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AddictionTest model
   */
  readonly fields: AddictionTestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AddictionTest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddictionTestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the AddictionTest model
   */ 
  interface AddictionTestFieldRefs {
    readonly id: FieldRef<"AddictionTest", 'String'>
    readonly userId: FieldRef<"AddictionTest", 'String'>
    readonly score: FieldRef<"AddictionTest", 'Int'>
    readonly category: FieldRef<"AddictionTest", 'String'>
    readonly createdAt: FieldRef<"AddictionTest", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * AddictionTest findUnique
   */
  export type AddictionTestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddictionTest
     */
    select?: AddictionTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddictionTestInclude<ExtArgs> | null
    /**
     * Filter, which AddictionTest to fetch.
     */
    where: AddictionTestWhereUniqueInput
  }


  /**
   * AddictionTest findUniqueOrThrow
   */
  export type AddictionTestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddictionTest
     */
    select?: AddictionTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddictionTestInclude<ExtArgs> | null
    /**
     * Filter, which AddictionTest to fetch.
     */
    where: AddictionTestWhereUniqueInput
  }


  /**
   * AddictionTest findFirst
   */
  export type AddictionTestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddictionTest
     */
    select?: AddictionTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddictionTestInclude<ExtArgs> | null
    /**
     * Filter, which AddictionTest to fetch.
     */
    where?: AddictionTestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddictionTests to fetch.
     */
    orderBy?: AddictionTestOrderByWithRelationInput | AddictionTestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AddictionTests.
     */
    cursor?: AddictionTestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddictionTests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddictionTests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AddictionTests.
     */
    distinct?: AddictionTestScalarFieldEnum | AddictionTestScalarFieldEnum[]
  }


  /**
   * AddictionTest findFirstOrThrow
   */
  export type AddictionTestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddictionTest
     */
    select?: AddictionTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddictionTestInclude<ExtArgs> | null
    /**
     * Filter, which AddictionTest to fetch.
     */
    where?: AddictionTestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddictionTests to fetch.
     */
    orderBy?: AddictionTestOrderByWithRelationInput | AddictionTestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AddictionTests.
     */
    cursor?: AddictionTestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddictionTests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddictionTests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AddictionTests.
     */
    distinct?: AddictionTestScalarFieldEnum | AddictionTestScalarFieldEnum[]
  }


  /**
   * AddictionTest findMany
   */
  export type AddictionTestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddictionTest
     */
    select?: AddictionTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddictionTestInclude<ExtArgs> | null
    /**
     * Filter, which AddictionTests to fetch.
     */
    where?: AddictionTestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddictionTests to fetch.
     */
    orderBy?: AddictionTestOrderByWithRelationInput | AddictionTestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AddictionTests.
     */
    cursor?: AddictionTestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddictionTests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddictionTests.
     */
    skip?: number
    distinct?: AddictionTestScalarFieldEnum | AddictionTestScalarFieldEnum[]
  }


  /**
   * AddictionTest create
   */
  export type AddictionTestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddictionTest
     */
    select?: AddictionTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddictionTestInclude<ExtArgs> | null
    /**
     * The data needed to create a AddictionTest.
     */
    data: XOR<AddictionTestCreateInput, AddictionTestUncheckedCreateInput>
  }


  /**
   * AddictionTest update
   */
  export type AddictionTestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddictionTest
     */
    select?: AddictionTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddictionTestInclude<ExtArgs> | null
    /**
     * The data needed to update a AddictionTest.
     */
    data: XOR<AddictionTestUpdateInput, AddictionTestUncheckedUpdateInput>
    /**
     * Choose, which AddictionTest to update.
     */
    where: AddictionTestWhereUniqueInput
  }


  /**
   * AddictionTest updateMany
   */
  export type AddictionTestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AddictionTests.
     */
    data: XOR<AddictionTestUpdateManyMutationInput, AddictionTestUncheckedUpdateManyInput>
    /**
     * Filter which AddictionTests to update
     */
    where?: AddictionTestWhereInput
  }


  /**
   * AddictionTest upsert
   */
  export type AddictionTestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddictionTest
     */
    select?: AddictionTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddictionTestInclude<ExtArgs> | null
    /**
     * The filter to search for the AddictionTest to update in case it exists.
     */
    where: AddictionTestWhereUniqueInput
    /**
     * In case the AddictionTest found by the `where` argument doesn't exist, create a new AddictionTest with this data.
     */
    create: XOR<AddictionTestCreateInput, AddictionTestUncheckedCreateInput>
    /**
     * In case the AddictionTest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddictionTestUpdateInput, AddictionTestUncheckedUpdateInput>
  }


  /**
   * AddictionTest delete
   */
  export type AddictionTestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddictionTest
     */
    select?: AddictionTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddictionTestInclude<ExtArgs> | null
    /**
     * Filter which AddictionTest to delete.
     */
    where: AddictionTestWhereUniqueInput
  }


  /**
   * AddictionTest deleteMany
   */
  export type AddictionTestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AddictionTests to delete
     */
    where?: AddictionTestWhereInput
  }


  /**
   * AddictionTest without action
   */
  export type AddictionTestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddictionTest
     */
    select?: AddictionTestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AddictionTestInclude<ExtArgs> | null
  }



  /**
   * Model ChallengeProgress
   */

  export type AggregateChallengeProgress = {
    _count: ChallengeProgressCountAggregateOutputType | null
    _avg: ChallengeProgressAvgAggregateOutputType | null
    _sum: ChallengeProgressSumAggregateOutputType | null
    _min: ChallengeProgressMinAggregateOutputType | null
    _max: ChallengeProgressMaxAggregateOutputType | null
  }

  export type ChallengeProgressAvgAggregateOutputType = {
    dayCompleted: number | null
  }

  export type ChallengeProgressSumAggregateOutputType = {
    dayCompleted: number | null
  }

  export type ChallengeProgressMinAggregateOutputType = {
    id: string | null
    userId: string | null
    dayCompleted: number | null
    status: string | null
    completedAt: Date | null
  }

  export type ChallengeProgressMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    dayCompleted: number | null
    status: string | null
    completedAt: Date | null
  }

  export type ChallengeProgressCountAggregateOutputType = {
    id: number
    userId: number
    dayCompleted: number
    status: number
    completedAt: number
    _all: number
  }


  export type ChallengeProgressAvgAggregateInputType = {
    dayCompleted?: true
  }

  export type ChallengeProgressSumAggregateInputType = {
    dayCompleted?: true
  }

  export type ChallengeProgressMinAggregateInputType = {
    id?: true
    userId?: true
    dayCompleted?: true
    status?: true
    completedAt?: true
  }

  export type ChallengeProgressMaxAggregateInputType = {
    id?: true
    userId?: true
    dayCompleted?: true
    status?: true
    completedAt?: true
  }

  export type ChallengeProgressCountAggregateInputType = {
    id?: true
    userId?: true
    dayCompleted?: true
    status?: true
    completedAt?: true
    _all?: true
  }

  export type ChallengeProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChallengeProgress to aggregate.
     */
    where?: ChallengeProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChallengeProgresses to fetch.
     */
    orderBy?: ChallengeProgressOrderByWithRelationInput | ChallengeProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChallengeProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChallengeProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChallengeProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChallengeProgresses
    **/
    _count?: true | ChallengeProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChallengeProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChallengeProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChallengeProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChallengeProgressMaxAggregateInputType
  }

  export type GetChallengeProgressAggregateType<T extends ChallengeProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateChallengeProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChallengeProgress[P]>
      : GetScalarType<T[P], AggregateChallengeProgress[P]>
  }




  export type ChallengeProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChallengeProgressWhereInput
    orderBy?: ChallengeProgressOrderByWithAggregationInput | ChallengeProgressOrderByWithAggregationInput[]
    by: ChallengeProgressScalarFieldEnum[] | ChallengeProgressScalarFieldEnum
    having?: ChallengeProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChallengeProgressCountAggregateInputType | true
    _avg?: ChallengeProgressAvgAggregateInputType
    _sum?: ChallengeProgressSumAggregateInputType
    _min?: ChallengeProgressMinAggregateInputType
    _max?: ChallengeProgressMaxAggregateInputType
  }

  export type ChallengeProgressGroupByOutputType = {
    id: string
    userId: string
    dayCompleted: number
    status: string
    completedAt: Date
    _count: ChallengeProgressCountAggregateOutputType | null
    _avg: ChallengeProgressAvgAggregateOutputType | null
    _sum: ChallengeProgressSumAggregateOutputType | null
    _min: ChallengeProgressMinAggregateOutputType | null
    _max: ChallengeProgressMaxAggregateOutputType | null
  }

  type GetChallengeProgressGroupByPayload<T extends ChallengeProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChallengeProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChallengeProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChallengeProgressGroupByOutputType[P]>
            : GetScalarType<T[P], ChallengeProgressGroupByOutputType[P]>
        }
      >
    >


  export type ChallengeProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dayCompleted?: boolean
    status?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["challengeProgress"]>

  export type ChallengeProgressSelectScalar = {
    id?: boolean
    userId?: boolean
    dayCompleted?: boolean
    status?: boolean
    completedAt?: boolean
  }

  export type ChallengeProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $ChallengeProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChallengeProgress"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      dayCompleted: number
      status: string
      completedAt: Date
    }, ExtArgs["result"]["challengeProgress"]>
    composites: {}
  }


  type ChallengeProgressGetPayload<S extends boolean | null | undefined | ChallengeProgressDefaultArgs> = $Result.GetResult<Prisma.$ChallengeProgressPayload, S>

  type ChallengeProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ChallengeProgressFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ChallengeProgressCountAggregateInputType | true
    }

  export interface ChallengeProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChallengeProgress'], meta: { name: 'ChallengeProgress' } }
    /**
     * Find zero or one ChallengeProgress that matches the filter.
     * @param {ChallengeProgressFindUniqueArgs} args - Arguments to find a ChallengeProgress
     * @example
     * // Get one ChallengeProgress
     * const challengeProgress = await prisma.challengeProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ChallengeProgressFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ChallengeProgressFindUniqueArgs<ExtArgs>>
    ): Prisma__ChallengeProgressClient<$Result.GetResult<Prisma.$ChallengeProgressPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ChallengeProgress that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ChallengeProgressFindUniqueOrThrowArgs} args - Arguments to find a ChallengeProgress
     * @example
     * // Get one ChallengeProgress
     * const challengeProgress = await prisma.challengeProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ChallengeProgressFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChallengeProgressFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ChallengeProgressClient<$Result.GetResult<Prisma.$ChallengeProgressPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ChallengeProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeProgressFindFirstArgs} args - Arguments to find a ChallengeProgress
     * @example
     * // Get one ChallengeProgress
     * const challengeProgress = await prisma.challengeProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ChallengeProgressFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ChallengeProgressFindFirstArgs<ExtArgs>>
    ): Prisma__ChallengeProgressClient<$Result.GetResult<Prisma.$ChallengeProgressPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ChallengeProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeProgressFindFirstOrThrowArgs} args - Arguments to find a ChallengeProgress
     * @example
     * // Get one ChallengeProgress
     * const challengeProgress = await prisma.challengeProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ChallengeProgressFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChallengeProgressFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ChallengeProgressClient<$Result.GetResult<Prisma.$ChallengeProgressPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ChallengeProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeProgressFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChallengeProgresses
     * const challengeProgresses = await prisma.challengeProgress.findMany()
     * 
     * // Get first 10 ChallengeProgresses
     * const challengeProgresses = await prisma.challengeProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const challengeProgressWithIdOnly = await prisma.challengeProgress.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ChallengeProgressFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChallengeProgressFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengeProgressPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ChallengeProgress.
     * @param {ChallengeProgressCreateArgs} args - Arguments to create a ChallengeProgress.
     * @example
     * // Create one ChallengeProgress
     * const ChallengeProgress = await prisma.challengeProgress.create({
     *   data: {
     *     // ... data to create a ChallengeProgress
     *   }
     * })
     * 
    **/
    create<T extends ChallengeProgressCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ChallengeProgressCreateArgs<ExtArgs>>
    ): Prisma__ChallengeProgressClient<$Result.GetResult<Prisma.$ChallengeProgressPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a ChallengeProgress.
     * @param {ChallengeProgressDeleteArgs} args - Arguments to delete one ChallengeProgress.
     * @example
     * // Delete one ChallengeProgress
     * const ChallengeProgress = await prisma.challengeProgress.delete({
     *   where: {
     *     // ... filter to delete one ChallengeProgress
     *   }
     * })
     * 
    **/
    delete<T extends ChallengeProgressDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ChallengeProgressDeleteArgs<ExtArgs>>
    ): Prisma__ChallengeProgressClient<$Result.GetResult<Prisma.$ChallengeProgressPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ChallengeProgress.
     * @param {ChallengeProgressUpdateArgs} args - Arguments to update one ChallengeProgress.
     * @example
     * // Update one ChallengeProgress
     * const challengeProgress = await prisma.challengeProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ChallengeProgressUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ChallengeProgressUpdateArgs<ExtArgs>>
    ): Prisma__ChallengeProgressClient<$Result.GetResult<Prisma.$ChallengeProgressPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ChallengeProgresses.
     * @param {ChallengeProgressDeleteManyArgs} args - Arguments to filter ChallengeProgresses to delete.
     * @example
     * // Delete a few ChallengeProgresses
     * const { count } = await prisma.challengeProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ChallengeProgressDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChallengeProgressDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChallengeProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChallengeProgresses
     * const challengeProgress = await prisma.challengeProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ChallengeProgressUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ChallengeProgressUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ChallengeProgress.
     * @param {ChallengeProgressUpsertArgs} args - Arguments to update or create a ChallengeProgress.
     * @example
     * // Update or create a ChallengeProgress
     * const challengeProgress = await prisma.challengeProgress.upsert({
     *   create: {
     *     // ... data to create a ChallengeProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChallengeProgress we want to update
     *   }
     * })
    **/
    upsert<T extends ChallengeProgressUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ChallengeProgressUpsertArgs<ExtArgs>>
    ): Prisma__ChallengeProgressClient<$Result.GetResult<Prisma.$ChallengeProgressPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of ChallengeProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeProgressCountArgs} args - Arguments to filter ChallengeProgresses to count.
     * @example
     * // Count the number of ChallengeProgresses
     * const count = await prisma.challengeProgress.count({
     *   where: {
     *     // ... the filter for the ChallengeProgresses we want to count
     *   }
     * })
    **/
    count<T extends ChallengeProgressCountArgs>(
      args?: Subset<T, ChallengeProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChallengeProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChallengeProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChallengeProgressAggregateArgs>(args: Subset<T, ChallengeProgressAggregateArgs>): Prisma.PrismaPromise<GetChallengeProgressAggregateType<T>>

    /**
     * Group by ChallengeProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChallengeProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChallengeProgressGroupByArgs['orderBy'] }
        : { orderBy?: ChallengeProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChallengeProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChallengeProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChallengeProgress model
   */
  readonly fields: ChallengeProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChallengeProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChallengeProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the ChallengeProgress model
   */ 
  interface ChallengeProgressFieldRefs {
    readonly id: FieldRef<"ChallengeProgress", 'String'>
    readonly userId: FieldRef<"ChallengeProgress", 'String'>
    readonly dayCompleted: FieldRef<"ChallengeProgress", 'Int'>
    readonly status: FieldRef<"ChallengeProgress", 'String'>
    readonly completedAt: FieldRef<"ChallengeProgress", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * ChallengeProgress findUnique
   */
  export type ChallengeProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeProgress
     */
    select?: ChallengeProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChallengeProgressInclude<ExtArgs> | null
    /**
     * Filter, which ChallengeProgress to fetch.
     */
    where: ChallengeProgressWhereUniqueInput
  }


  /**
   * ChallengeProgress findUniqueOrThrow
   */
  export type ChallengeProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeProgress
     */
    select?: ChallengeProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChallengeProgressInclude<ExtArgs> | null
    /**
     * Filter, which ChallengeProgress to fetch.
     */
    where: ChallengeProgressWhereUniqueInput
  }


  /**
   * ChallengeProgress findFirst
   */
  export type ChallengeProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeProgress
     */
    select?: ChallengeProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChallengeProgressInclude<ExtArgs> | null
    /**
     * Filter, which ChallengeProgress to fetch.
     */
    where?: ChallengeProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChallengeProgresses to fetch.
     */
    orderBy?: ChallengeProgressOrderByWithRelationInput | ChallengeProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChallengeProgresses.
     */
    cursor?: ChallengeProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChallengeProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChallengeProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChallengeProgresses.
     */
    distinct?: ChallengeProgressScalarFieldEnum | ChallengeProgressScalarFieldEnum[]
  }


  /**
   * ChallengeProgress findFirstOrThrow
   */
  export type ChallengeProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeProgress
     */
    select?: ChallengeProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChallengeProgressInclude<ExtArgs> | null
    /**
     * Filter, which ChallengeProgress to fetch.
     */
    where?: ChallengeProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChallengeProgresses to fetch.
     */
    orderBy?: ChallengeProgressOrderByWithRelationInput | ChallengeProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChallengeProgresses.
     */
    cursor?: ChallengeProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChallengeProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChallengeProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChallengeProgresses.
     */
    distinct?: ChallengeProgressScalarFieldEnum | ChallengeProgressScalarFieldEnum[]
  }


  /**
   * ChallengeProgress findMany
   */
  export type ChallengeProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeProgress
     */
    select?: ChallengeProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChallengeProgressInclude<ExtArgs> | null
    /**
     * Filter, which ChallengeProgresses to fetch.
     */
    where?: ChallengeProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChallengeProgresses to fetch.
     */
    orderBy?: ChallengeProgressOrderByWithRelationInput | ChallengeProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChallengeProgresses.
     */
    cursor?: ChallengeProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChallengeProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChallengeProgresses.
     */
    skip?: number
    distinct?: ChallengeProgressScalarFieldEnum | ChallengeProgressScalarFieldEnum[]
  }


  /**
   * ChallengeProgress create
   */
  export type ChallengeProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeProgress
     */
    select?: ChallengeProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChallengeProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a ChallengeProgress.
     */
    data: XOR<ChallengeProgressCreateInput, ChallengeProgressUncheckedCreateInput>
  }


  /**
   * ChallengeProgress update
   */
  export type ChallengeProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeProgress
     */
    select?: ChallengeProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChallengeProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a ChallengeProgress.
     */
    data: XOR<ChallengeProgressUpdateInput, ChallengeProgressUncheckedUpdateInput>
    /**
     * Choose, which ChallengeProgress to update.
     */
    where: ChallengeProgressWhereUniqueInput
  }


  /**
   * ChallengeProgress updateMany
   */
  export type ChallengeProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChallengeProgresses.
     */
    data: XOR<ChallengeProgressUpdateManyMutationInput, ChallengeProgressUncheckedUpdateManyInput>
    /**
     * Filter which ChallengeProgresses to update
     */
    where?: ChallengeProgressWhereInput
  }


  /**
   * ChallengeProgress upsert
   */
  export type ChallengeProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeProgress
     */
    select?: ChallengeProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChallengeProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the ChallengeProgress to update in case it exists.
     */
    where: ChallengeProgressWhereUniqueInput
    /**
     * In case the ChallengeProgress found by the `where` argument doesn't exist, create a new ChallengeProgress with this data.
     */
    create: XOR<ChallengeProgressCreateInput, ChallengeProgressUncheckedCreateInput>
    /**
     * In case the ChallengeProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChallengeProgressUpdateInput, ChallengeProgressUncheckedUpdateInput>
  }


  /**
   * ChallengeProgress delete
   */
  export type ChallengeProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeProgress
     */
    select?: ChallengeProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChallengeProgressInclude<ExtArgs> | null
    /**
     * Filter which ChallengeProgress to delete.
     */
    where: ChallengeProgressWhereUniqueInput
  }


  /**
   * ChallengeProgress deleteMany
   */
  export type ChallengeProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChallengeProgresses to delete
     */
    where?: ChallengeProgressWhereInput
  }


  /**
   * ChallengeProgress without action
   */
  export type ChallengeProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeProgress
     */
    select?: ChallengeProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChallengeProgressInclude<ExtArgs> | null
  }



  /**
   * Model FeatureUsage
   */

  export type AggregateFeatureUsage = {
    _count: FeatureUsageCountAggregateOutputType | null
    _min: FeatureUsageMinAggregateOutputType | null
    _max: FeatureUsageMaxAggregateOutputType | null
  }

  export type FeatureUsageMinAggregateOutputType = {
    id: string | null
    userId: string | null
    featureName: string | null
    usedAt: Date | null
  }

  export type FeatureUsageMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    featureName: string | null
    usedAt: Date | null
  }

  export type FeatureUsageCountAggregateOutputType = {
    id: number
    userId: number
    featureName: number
    usedAt: number
    _all: number
  }


  export type FeatureUsageMinAggregateInputType = {
    id?: true
    userId?: true
    featureName?: true
    usedAt?: true
  }

  export type FeatureUsageMaxAggregateInputType = {
    id?: true
    userId?: true
    featureName?: true
    usedAt?: true
  }

  export type FeatureUsageCountAggregateInputType = {
    id?: true
    userId?: true
    featureName?: true
    usedAt?: true
    _all?: true
  }

  export type FeatureUsageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeatureUsage to aggregate.
     */
    where?: FeatureUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureUsages to fetch.
     */
    orderBy?: FeatureUsageOrderByWithRelationInput | FeatureUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeatureUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FeatureUsages
    **/
    _count?: true | FeatureUsageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeatureUsageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeatureUsageMaxAggregateInputType
  }

  export type GetFeatureUsageAggregateType<T extends FeatureUsageAggregateArgs> = {
        [P in keyof T & keyof AggregateFeatureUsage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeatureUsage[P]>
      : GetScalarType<T[P], AggregateFeatureUsage[P]>
  }




  export type FeatureUsageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeatureUsageWhereInput
    orderBy?: FeatureUsageOrderByWithAggregationInput | FeatureUsageOrderByWithAggregationInput[]
    by: FeatureUsageScalarFieldEnum[] | FeatureUsageScalarFieldEnum
    having?: FeatureUsageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeatureUsageCountAggregateInputType | true
    _min?: FeatureUsageMinAggregateInputType
    _max?: FeatureUsageMaxAggregateInputType
  }

  export type FeatureUsageGroupByOutputType = {
    id: string
    userId: string
    featureName: string
    usedAt: Date
    _count: FeatureUsageCountAggregateOutputType | null
    _min: FeatureUsageMinAggregateOutputType | null
    _max: FeatureUsageMaxAggregateOutputType | null
  }

  type GetFeatureUsageGroupByPayload<T extends FeatureUsageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeatureUsageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeatureUsageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeatureUsageGroupByOutputType[P]>
            : GetScalarType<T[P], FeatureUsageGroupByOutputType[P]>
        }
      >
    >


  export type FeatureUsageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    featureName?: boolean
    usedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["featureUsage"]>

  export type FeatureUsageSelectScalar = {
    id?: boolean
    userId?: boolean
    featureName?: boolean
    usedAt?: boolean
  }

  export type FeatureUsageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $FeatureUsagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FeatureUsage"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      featureName: string
      usedAt: Date
    }, ExtArgs["result"]["featureUsage"]>
    composites: {}
  }


  type FeatureUsageGetPayload<S extends boolean | null | undefined | FeatureUsageDefaultArgs> = $Result.GetResult<Prisma.$FeatureUsagePayload, S>

  type FeatureUsageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FeatureUsageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FeatureUsageCountAggregateInputType | true
    }

  export interface FeatureUsageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FeatureUsage'], meta: { name: 'FeatureUsage' } }
    /**
     * Find zero or one FeatureUsage that matches the filter.
     * @param {FeatureUsageFindUniqueArgs} args - Arguments to find a FeatureUsage
     * @example
     * // Get one FeatureUsage
     * const featureUsage = await prisma.featureUsage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FeatureUsageFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, FeatureUsageFindUniqueArgs<ExtArgs>>
    ): Prisma__FeatureUsageClient<$Result.GetResult<Prisma.$FeatureUsagePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one FeatureUsage that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {FeatureUsageFindUniqueOrThrowArgs} args - Arguments to find a FeatureUsage
     * @example
     * // Get one FeatureUsage
     * const featureUsage = await prisma.featureUsage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends FeatureUsageFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, FeatureUsageFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__FeatureUsageClient<$Result.GetResult<Prisma.$FeatureUsagePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first FeatureUsage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureUsageFindFirstArgs} args - Arguments to find a FeatureUsage
     * @example
     * // Get one FeatureUsage
     * const featureUsage = await prisma.featureUsage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FeatureUsageFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, FeatureUsageFindFirstArgs<ExtArgs>>
    ): Prisma__FeatureUsageClient<$Result.GetResult<Prisma.$FeatureUsagePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first FeatureUsage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureUsageFindFirstOrThrowArgs} args - Arguments to find a FeatureUsage
     * @example
     * // Get one FeatureUsage
     * const featureUsage = await prisma.featureUsage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends FeatureUsageFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, FeatureUsageFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__FeatureUsageClient<$Result.GetResult<Prisma.$FeatureUsagePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more FeatureUsages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureUsageFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FeatureUsages
     * const featureUsages = await prisma.featureUsage.findMany()
     * 
     * // Get first 10 FeatureUsages
     * const featureUsages = await prisma.featureUsage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const featureUsageWithIdOnly = await prisma.featureUsage.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FeatureUsageFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, FeatureUsageFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeatureUsagePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a FeatureUsage.
     * @param {FeatureUsageCreateArgs} args - Arguments to create a FeatureUsage.
     * @example
     * // Create one FeatureUsage
     * const FeatureUsage = await prisma.featureUsage.create({
     *   data: {
     *     // ... data to create a FeatureUsage
     *   }
     * })
     * 
    **/
    create<T extends FeatureUsageCreateArgs<ExtArgs>>(
      args: SelectSubset<T, FeatureUsageCreateArgs<ExtArgs>>
    ): Prisma__FeatureUsageClient<$Result.GetResult<Prisma.$FeatureUsagePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a FeatureUsage.
     * @param {FeatureUsageDeleteArgs} args - Arguments to delete one FeatureUsage.
     * @example
     * // Delete one FeatureUsage
     * const FeatureUsage = await prisma.featureUsage.delete({
     *   where: {
     *     // ... filter to delete one FeatureUsage
     *   }
     * })
     * 
    **/
    delete<T extends FeatureUsageDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, FeatureUsageDeleteArgs<ExtArgs>>
    ): Prisma__FeatureUsageClient<$Result.GetResult<Prisma.$FeatureUsagePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one FeatureUsage.
     * @param {FeatureUsageUpdateArgs} args - Arguments to update one FeatureUsage.
     * @example
     * // Update one FeatureUsage
     * const featureUsage = await prisma.featureUsage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends FeatureUsageUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, FeatureUsageUpdateArgs<ExtArgs>>
    ): Prisma__FeatureUsageClient<$Result.GetResult<Prisma.$FeatureUsagePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more FeatureUsages.
     * @param {FeatureUsageDeleteManyArgs} args - Arguments to filter FeatureUsages to delete.
     * @example
     * // Delete a few FeatureUsages
     * const { count } = await prisma.featureUsage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends FeatureUsageDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, FeatureUsageDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeatureUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureUsageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FeatureUsages
     * const featureUsage = await prisma.featureUsage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends FeatureUsageUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, FeatureUsageUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FeatureUsage.
     * @param {FeatureUsageUpsertArgs} args - Arguments to update or create a FeatureUsage.
     * @example
     * // Update or create a FeatureUsage
     * const featureUsage = await prisma.featureUsage.upsert({
     *   create: {
     *     // ... data to create a FeatureUsage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FeatureUsage we want to update
     *   }
     * })
    **/
    upsert<T extends FeatureUsageUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, FeatureUsageUpsertArgs<ExtArgs>>
    ): Prisma__FeatureUsageClient<$Result.GetResult<Prisma.$FeatureUsagePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of FeatureUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureUsageCountArgs} args - Arguments to filter FeatureUsages to count.
     * @example
     * // Count the number of FeatureUsages
     * const count = await prisma.featureUsage.count({
     *   where: {
     *     // ... the filter for the FeatureUsages we want to count
     *   }
     * })
    **/
    count<T extends FeatureUsageCountArgs>(
      args?: Subset<T, FeatureUsageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeatureUsageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FeatureUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureUsageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeatureUsageAggregateArgs>(args: Subset<T, FeatureUsageAggregateArgs>): Prisma.PrismaPromise<GetFeatureUsageAggregateType<T>>

    /**
     * Group by FeatureUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureUsageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeatureUsageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeatureUsageGroupByArgs['orderBy'] }
        : { orderBy?: FeatureUsageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeatureUsageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeatureUsageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FeatureUsage model
   */
  readonly fields: FeatureUsageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FeatureUsage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeatureUsageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the FeatureUsage model
   */ 
  interface FeatureUsageFieldRefs {
    readonly id: FieldRef<"FeatureUsage", 'String'>
    readonly userId: FieldRef<"FeatureUsage", 'String'>
    readonly featureName: FieldRef<"FeatureUsage", 'String'>
    readonly usedAt: FieldRef<"FeatureUsage", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * FeatureUsage findUnique
   */
  export type FeatureUsageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureUsage
     */
    select?: FeatureUsageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureUsageInclude<ExtArgs> | null
    /**
     * Filter, which FeatureUsage to fetch.
     */
    where: FeatureUsageWhereUniqueInput
  }


  /**
   * FeatureUsage findUniqueOrThrow
   */
  export type FeatureUsageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureUsage
     */
    select?: FeatureUsageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureUsageInclude<ExtArgs> | null
    /**
     * Filter, which FeatureUsage to fetch.
     */
    where: FeatureUsageWhereUniqueInput
  }


  /**
   * FeatureUsage findFirst
   */
  export type FeatureUsageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureUsage
     */
    select?: FeatureUsageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureUsageInclude<ExtArgs> | null
    /**
     * Filter, which FeatureUsage to fetch.
     */
    where?: FeatureUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureUsages to fetch.
     */
    orderBy?: FeatureUsageOrderByWithRelationInput | FeatureUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeatureUsages.
     */
    cursor?: FeatureUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeatureUsages.
     */
    distinct?: FeatureUsageScalarFieldEnum | FeatureUsageScalarFieldEnum[]
  }


  /**
   * FeatureUsage findFirstOrThrow
   */
  export type FeatureUsageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureUsage
     */
    select?: FeatureUsageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureUsageInclude<ExtArgs> | null
    /**
     * Filter, which FeatureUsage to fetch.
     */
    where?: FeatureUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureUsages to fetch.
     */
    orderBy?: FeatureUsageOrderByWithRelationInput | FeatureUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeatureUsages.
     */
    cursor?: FeatureUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeatureUsages.
     */
    distinct?: FeatureUsageScalarFieldEnum | FeatureUsageScalarFieldEnum[]
  }


  /**
   * FeatureUsage findMany
   */
  export type FeatureUsageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureUsage
     */
    select?: FeatureUsageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureUsageInclude<ExtArgs> | null
    /**
     * Filter, which FeatureUsages to fetch.
     */
    where?: FeatureUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureUsages to fetch.
     */
    orderBy?: FeatureUsageOrderByWithRelationInput | FeatureUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FeatureUsages.
     */
    cursor?: FeatureUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureUsages.
     */
    skip?: number
    distinct?: FeatureUsageScalarFieldEnum | FeatureUsageScalarFieldEnum[]
  }


  /**
   * FeatureUsage create
   */
  export type FeatureUsageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureUsage
     */
    select?: FeatureUsageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureUsageInclude<ExtArgs> | null
    /**
     * The data needed to create a FeatureUsage.
     */
    data: XOR<FeatureUsageCreateInput, FeatureUsageUncheckedCreateInput>
  }


  /**
   * FeatureUsage update
   */
  export type FeatureUsageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureUsage
     */
    select?: FeatureUsageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureUsageInclude<ExtArgs> | null
    /**
     * The data needed to update a FeatureUsage.
     */
    data: XOR<FeatureUsageUpdateInput, FeatureUsageUncheckedUpdateInput>
    /**
     * Choose, which FeatureUsage to update.
     */
    where: FeatureUsageWhereUniqueInput
  }


  /**
   * FeatureUsage updateMany
   */
  export type FeatureUsageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FeatureUsages.
     */
    data: XOR<FeatureUsageUpdateManyMutationInput, FeatureUsageUncheckedUpdateManyInput>
    /**
     * Filter which FeatureUsages to update
     */
    where?: FeatureUsageWhereInput
  }


  /**
   * FeatureUsage upsert
   */
  export type FeatureUsageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureUsage
     */
    select?: FeatureUsageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureUsageInclude<ExtArgs> | null
    /**
     * The filter to search for the FeatureUsage to update in case it exists.
     */
    where: FeatureUsageWhereUniqueInput
    /**
     * In case the FeatureUsage found by the `where` argument doesn't exist, create a new FeatureUsage with this data.
     */
    create: XOR<FeatureUsageCreateInput, FeatureUsageUncheckedCreateInput>
    /**
     * In case the FeatureUsage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeatureUsageUpdateInput, FeatureUsageUncheckedUpdateInput>
  }


  /**
   * FeatureUsage delete
   */
  export type FeatureUsageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureUsage
     */
    select?: FeatureUsageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureUsageInclude<ExtArgs> | null
    /**
     * Filter which FeatureUsage to delete.
     */
    where: FeatureUsageWhereUniqueInput
  }


  /**
   * FeatureUsage deleteMany
   */
  export type FeatureUsageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeatureUsages to delete
     */
    where?: FeatureUsageWhereInput
  }


  /**
   * FeatureUsage without action
   */
  export type FeatureUsageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureUsage
     */
    select?: FeatureUsageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureUsageInclude<ExtArgs> | null
  }



  /**
   * Model GameSession
   */

  export type AggregateGameSession = {
    _count: GameSessionCountAggregateOutputType | null
    _avg: GameSessionAvgAggregateOutputType | null
    _sum: GameSessionSumAggregateOutputType | null
    _min: GameSessionMinAggregateOutputType | null
    _max: GameSessionMaxAggregateOutputType | null
  }

  export type GameSessionAvgAggregateOutputType = {
    xpEarned: number | null
    level: number | null
    score: number | null
  }

  export type GameSessionSumAggregateOutputType = {
    xpEarned: number | null
    level: number | null
    score: number | null
  }

  export type GameSessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    game: string | null
    xpEarned: number | null
    level: number | null
    score: number | null
    playedAt: Date | null
  }

  export type GameSessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    game: string | null
    xpEarned: number | null
    level: number | null
    score: number | null
    playedAt: Date | null
  }

  export type GameSessionCountAggregateOutputType = {
    id: number
    userId: number
    game: number
    xpEarned: number
    level: number
    score: number
    playedAt: number
    _all: number
  }


  export type GameSessionAvgAggregateInputType = {
    xpEarned?: true
    level?: true
    score?: true
  }

  export type GameSessionSumAggregateInputType = {
    xpEarned?: true
    level?: true
    score?: true
  }

  export type GameSessionMinAggregateInputType = {
    id?: true
    userId?: true
    game?: true
    xpEarned?: true
    level?: true
    score?: true
    playedAt?: true
  }

  export type GameSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    game?: true
    xpEarned?: true
    level?: true
    score?: true
    playedAt?: true
  }

  export type GameSessionCountAggregateInputType = {
    id?: true
    userId?: true
    game?: true
    xpEarned?: true
    level?: true
    score?: true
    playedAt?: true
    _all?: true
  }

  export type GameSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameSession to aggregate.
     */
    where?: GameSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameSessions to fetch.
     */
    orderBy?: GameSessionOrderByWithRelationInput | GameSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameSessions
    **/
    _count?: true | GameSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameSessionMaxAggregateInputType
  }

  export type GetGameSessionAggregateType<T extends GameSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateGameSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameSession[P]>
      : GetScalarType<T[P], AggregateGameSession[P]>
  }




  export type GameSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameSessionWhereInput
    orderBy?: GameSessionOrderByWithAggregationInput | GameSessionOrderByWithAggregationInput[]
    by: GameSessionScalarFieldEnum[] | GameSessionScalarFieldEnum
    having?: GameSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameSessionCountAggregateInputType | true
    _avg?: GameSessionAvgAggregateInputType
    _sum?: GameSessionSumAggregateInputType
    _min?: GameSessionMinAggregateInputType
    _max?: GameSessionMaxAggregateInputType
  }

  export type GameSessionGroupByOutputType = {
    id: string
    userId: string
    game: string
    xpEarned: number
    level: number | null
    score: number | null
    playedAt: Date
    _count: GameSessionCountAggregateOutputType | null
    _avg: GameSessionAvgAggregateOutputType | null
    _sum: GameSessionSumAggregateOutputType | null
    _min: GameSessionMinAggregateOutputType | null
    _max: GameSessionMaxAggregateOutputType | null
  }

  type GetGameSessionGroupByPayload<T extends GameSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameSessionGroupByOutputType[P]>
            : GetScalarType<T[P], GameSessionGroupByOutputType[P]>
        }
      >
    >


  export type GameSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    game?: boolean
    xpEarned?: boolean
    level?: boolean
    score?: boolean
    playedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameSession"]>

  export type GameSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    game?: boolean
    xpEarned?: boolean
    level?: boolean
    score?: boolean
    playedAt?: boolean
  }

  export type GameSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $GameSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      game: string
      xpEarned: number
      level: number | null
      score: number | null
      playedAt: Date
    }, ExtArgs["result"]["gameSession"]>
    composites: {}
  }


  type GameSessionGetPayload<S extends boolean | null | undefined | GameSessionDefaultArgs> = $Result.GetResult<Prisma.$GameSessionPayload, S>

  type GameSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GameSessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GameSessionCountAggregateInputType | true
    }

  export interface GameSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameSession'], meta: { name: 'GameSession' } }
    /**
     * Find zero or one GameSession that matches the filter.
     * @param {GameSessionFindUniqueArgs} args - Arguments to find a GameSession
     * @example
     * // Get one GameSession
     * const gameSession = await prisma.gameSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends GameSessionFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, GameSessionFindUniqueArgs<ExtArgs>>
    ): Prisma__GameSessionClient<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one GameSession that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {GameSessionFindUniqueOrThrowArgs} args - Arguments to find a GameSession
     * @example
     * // Get one GameSession
     * const gameSession = await prisma.gameSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends GameSessionFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, GameSessionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__GameSessionClient<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first GameSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSessionFindFirstArgs} args - Arguments to find a GameSession
     * @example
     * // Get one GameSession
     * const gameSession = await prisma.gameSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends GameSessionFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, GameSessionFindFirstArgs<ExtArgs>>
    ): Prisma__GameSessionClient<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first GameSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSessionFindFirstOrThrowArgs} args - Arguments to find a GameSession
     * @example
     * // Get one GameSession
     * const gameSession = await prisma.gameSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends GameSessionFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, GameSessionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__GameSessionClient<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more GameSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSessionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameSessions
     * const gameSessions = await prisma.gameSession.findMany()
     * 
     * // Get first 10 GameSessions
     * const gameSessions = await prisma.gameSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameSessionWithIdOnly = await prisma.gameSession.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends GameSessionFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, GameSessionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a GameSession.
     * @param {GameSessionCreateArgs} args - Arguments to create a GameSession.
     * @example
     * // Create one GameSession
     * const GameSession = await prisma.gameSession.create({
     *   data: {
     *     // ... data to create a GameSession
     *   }
     * })
     * 
    **/
    create<T extends GameSessionCreateArgs<ExtArgs>>(
      args: SelectSubset<T, GameSessionCreateArgs<ExtArgs>>
    ): Prisma__GameSessionClient<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a GameSession.
     * @param {GameSessionDeleteArgs} args - Arguments to delete one GameSession.
     * @example
     * // Delete one GameSession
     * const GameSession = await prisma.gameSession.delete({
     *   where: {
     *     // ... filter to delete one GameSession
     *   }
     * })
     * 
    **/
    delete<T extends GameSessionDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, GameSessionDeleteArgs<ExtArgs>>
    ): Prisma__GameSessionClient<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one GameSession.
     * @param {GameSessionUpdateArgs} args - Arguments to update one GameSession.
     * @example
     * // Update one GameSession
     * const gameSession = await prisma.gameSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends GameSessionUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, GameSessionUpdateArgs<ExtArgs>>
    ): Prisma__GameSessionClient<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more GameSessions.
     * @param {GameSessionDeleteManyArgs} args - Arguments to filter GameSessions to delete.
     * @example
     * // Delete a few GameSessions
     * const { count } = await prisma.gameSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends GameSessionDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, GameSessionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameSessions
     * const gameSession = await prisma.gameSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends GameSessionUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, GameSessionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GameSession.
     * @param {GameSessionUpsertArgs} args - Arguments to update or create a GameSession.
     * @example
     * // Update or create a GameSession
     * const gameSession = await prisma.gameSession.upsert({
     *   create: {
     *     // ... data to create a GameSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameSession we want to update
     *   }
     * })
    **/
    upsert<T extends GameSessionUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, GameSessionUpsertArgs<ExtArgs>>
    ): Prisma__GameSessionClient<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of GameSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSessionCountArgs} args - Arguments to filter GameSessions to count.
     * @example
     * // Count the number of GameSessions
     * const count = await prisma.gameSession.count({
     *   where: {
     *     // ... the filter for the GameSessions we want to count
     *   }
     * })
    **/
    count<T extends GameSessionCountArgs>(
      args?: Subset<T, GameSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameSessionAggregateArgs>(args: Subset<T, GameSessionAggregateArgs>): Prisma.PrismaPromise<GetGameSessionAggregateType<T>>

    /**
     * Group by GameSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameSessionGroupByArgs['orderBy'] }
        : { orderBy?: GameSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameSession model
   */
  readonly fields: GameSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the GameSession model
   */ 
  interface GameSessionFieldRefs {
    readonly id: FieldRef<"GameSession", 'String'>
    readonly userId: FieldRef<"GameSession", 'String'>
    readonly game: FieldRef<"GameSession", 'String'>
    readonly xpEarned: FieldRef<"GameSession", 'Int'>
    readonly level: FieldRef<"GameSession", 'Int'>
    readonly score: FieldRef<"GameSession", 'Int'>
    readonly playedAt: FieldRef<"GameSession", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * GameSession findUnique
   */
  export type GameSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameSessionInclude<ExtArgs> | null
    /**
     * Filter, which GameSession to fetch.
     */
    where: GameSessionWhereUniqueInput
  }


  /**
   * GameSession findUniqueOrThrow
   */
  export type GameSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameSessionInclude<ExtArgs> | null
    /**
     * Filter, which GameSession to fetch.
     */
    where: GameSessionWhereUniqueInput
  }


  /**
   * GameSession findFirst
   */
  export type GameSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameSessionInclude<ExtArgs> | null
    /**
     * Filter, which GameSession to fetch.
     */
    where?: GameSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameSessions to fetch.
     */
    orderBy?: GameSessionOrderByWithRelationInput | GameSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameSessions.
     */
    cursor?: GameSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameSessions.
     */
    distinct?: GameSessionScalarFieldEnum | GameSessionScalarFieldEnum[]
  }


  /**
   * GameSession findFirstOrThrow
   */
  export type GameSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameSessionInclude<ExtArgs> | null
    /**
     * Filter, which GameSession to fetch.
     */
    where?: GameSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameSessions to fetch.
     */
    orderBy?: GameSessionOrderByWithRelationInput | GameSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameSessions.
     */
    cursor?: GameSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameSessions.
     */
    distinct?: GameSessionScalarFieldEnum | GameSessionScalarFieldEnum[]
  }


  /**
   * GameSession findMany
   */
  export type GameSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameSessionInclude<ExtArgs> | null
    /**
     * Filter, which GameSessions to fetch.
     */
    where?: GameSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameSessions to fetch.
     */
    orderBy?: GameSessionOrderByWithRelationInput | GameSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameSessions.
     */
    cursor?: GameSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameSessions.
     */
    skip?: number
    distinct?: GameSessionScalarFieldEnum | GameSessionScalarFieldEnum[]
  }


  /**
   * GameSession create
   */
  export type GameSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a GameSession.
     */
    data: XOR<GameSessionCreateInput, GameSessionUncheckedCreateInput>
  }


  /**
   * GameSession update
   */
  export type GameSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a GameSession.
     */
    data: XOR<GameSessionUpdateInput, GameSessionUncheckedUpdateInput>
    /**
     * Choose, which GameSession to update.
     */
    where: GameSessionWhereUniqueInput
  }


  /**
   * GameSession updateMany
   */
  export type GameSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameSessions.
     */
    data: XOR<GameSessionUpdateManyMutationInput, GameSessionUncheckedUpdateManyInput>
    /**
     * Filter which GameSessions to update
     */
    where?: GameSessionWhereInput
  }


  /**
   * GameSession upsert
   */
  export type GameSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the GameSession to update in case it exists.
     */
    where: GameSessionWhereUniqueInput
    /**
     * In case the GameSession found by the `where` argument doesn't exist, create a new GameSession with this data.
     */
    create: XOR<GameSessionCreateInput, GameSessionUncheckedCreateInput>
    /**
     * In case the GameSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameSessionUpdateInput, GameSessionUncheckedUpdateInput>
  }


  /**
   * GameSession delete
   */
  export type GameSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameSessionInclude<ExtArgs> | null
    /**
     * Filter which GameSession to delete.
     */
    where: GameSessionWhereUniqueInput
  }


  /**
   * GameSession deleteMany
   */
  export type GameSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameSessions to delete
     */
    where?: GameSessionWhereInput
  }


  /**
   * GameSession without action
   */
  export type GameSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameSessionInclude<ExtArgs> | null
  }



  /**
   * Model SecurityLog
   */

  export type AggregateSecurityLog = {
    _count: SecurityLogCountAggregateOutputType | null
    _min: SecurityLogMinAggregateOutputType | null
    _max: SecurityLogMaxAggregateOutputType | null
  }

  export type SecurityLogMinAggregateOutputType = {
    id: string | null
    type: string | null
    details: string | null
    ipAddress: string | null
    timestamp: Date | null
  }

  export type SecurityLogMaxAggregateOutputType = {
    id: string | null
    type: string | null
    details: string | null
    ipAddress: string | null
    timestamp: Date | null
  }

  export type SecurityLogCountAggregateOutputType = {
    id: number
    type: number
    details: number
    ipAddress: number
    timestamp: number
    _all: number
  }


  export type SecurityLogMinAggregateInputType = {
    id?: true
    type?: true
    details?: true
    ipAddress?: true
    timestamp?: true
  }

  export type SecurityLogMaxAggregateInputType = {
    id?: true
    type?: true
    details?: true
    ipAddress?: true
    timestamp?: true
  }

  export type SecurityLogCountAggregateInputType = {
    id?: true
    type?: true
    details?: true
    ipAddress?: true
    timestamp?: true
    _all?: true
  }

  export type SecurityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SecurityLog to aggregate.
     */
    where?: SecurityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityLogs to fetch.
     */
    orderBy?: SecurityLogOrderByWithRelationInput | SecurityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SecurityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SecurityLogs
    **/
    _count?: true | SecurityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SecurityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SecurityLogMaxAggregateInputType
  }

  export type GetSecurityLogAggregateType<T extends SecurityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSecurityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSecurityLog[P]>
      : GetScalarType<T[P], AggregateSecurityLog[P]>
  }




  export type SecurityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SecurityLogWhereInput
    orderBy?: SecurityLogOrderByWithAggregationInput | SecurityLogOrderByWithAggregationInput[]
    by: SecurityLogScalarFieldEnum[] | SecurityLogScalarFieldEnum
    having?: SecurityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SecurityLogCountAggregateInputType | true
    _min?: SecurityLogMinAggregateInputType
    _max?: SecurityLogMaxAggregateInputType
  }

  export type SecurityLogGroupByOutputType = {
    id: string
    type: string
    details: string
    ipAddress: string
    timestamp: Date
    _count: SecurityLogCountAggregateOutputType | null
    _min: SecurityLogMinAggregateOutputType | null
    _max: SecurityLogMaxAggregateOutputType | null
  }

  type GetSecurityLogGroupByPayload<T extends SecurityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SecurityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SecurityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SecurityLogGroupByOutputType[P]>
            : GetScalarType<T[P], SecurityLogGroupByOutputType[P]>
        }
      >
    >


  export type SecurityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    details?: boolean
    ipAddress?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["securityLog"]>

  export type SecurityLogSelectScalar = {
    id?: boolean
    type?: boolean
    details?: boolean
    ipAddress?: boolean
    timestamp?: boolean
  }


  export type $SecurityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SecurityLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      details: string
      ipAddress: string
      timestamp: Date
    }, ExtArgs["result"]["securityLog"]>
    composites: {}
  }


  type SecurityLogGetPayload<S extends boolean | null | undefined | SecurityLogDefaultArgs> = $Result.GetResult<Prisma.$SecurityLogPayload, S>

  type SecurityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SecurityLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SecurityLogCountAggregateInputType | true
    }

  export interface SecurityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SecurityLog'], meta: { name: 'SecurityLog' } }
    /**
     * Find zero or one SecurityLog that matches the filter.
     * @param {SecurityLogFindUniqueArgs} args - Arguments to find a SecurityLog
     * @example
     * // Get one SecurityLog
     * const securityLog = await prisma.securityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SecurityLogFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, SecurityLogFindUniqueArgs<ExtArgs>>
    ): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one SecurityLog that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {SecurityLogFindUniqueOrThrowArgs} args - Arguments to find a SecurityLog
     * @example
     * // Get one SecurityLog
     * const securityLog = await prisma.securityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SecurityLogFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SecurityLogFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first SecurityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogFindFirstArgs} args - Arguments to find a SecurityLog
     * @example
     * // Get one SecurityLog
     * const securityLog = await prisma.securityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SecurityLogFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, SecurityLogFindFirstArgs<ExtArgs>>
    ): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first SecurityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogFindFirstOrThrowArgs} args - Arguments to find a SecurityLog
     * @example
     * // Get one SecurityLog
     * const securityLog = await prisma.securityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SecurityLogFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SecurityLogFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more SecurityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SecurityLogs
     * const securityLogs = await prisma.securityLog.findMany()
     * 
     * // Get first 10 SecurityLogs
     * const securityLogs = await prisma.securityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const securityLogWithIdOnly = await prisma.securityLog.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SecurityLogFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SecurityLogFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a SecurityLog.
     * @param {SecurityLogCreateArgs} args - Arguments to create a SecurityLog.
     * @example
     * // Create one SecurityLog
     * const SecurityLog = await prisma.securityLog.create({
     *   data: {
     *     // ... data to create a SecurityLog
     *   }
     * })
     * 
    **/
    create<T extends SecurityLogCreateArgs<ExtArgs>>(
      args: SelectSubset<T, SecurityLogCreateArgs<ExtArgs>>
    ): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a SecurityLog.
     * @param {SecurityLogDeleteArgs} args - Arguments to delete one SecurityLog.
     * @example
     * // Delete one SecurityLog
     * const SecurityLog = await prisma.securityLog.delete({
     *   where: {
     *     // ... filter to delete one SecurityLog
     *   }
     * })
     * 
    **/
    delete<T extends SecurityLogDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, SecurityLogDeleteArgs<ExtArgs>>
    ): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one SecurityLog.
     * @param {SecurityLogUpdateArgs} args - Arguments to update one SecurityLog.
     * @example
     * // Update one SecurityLog
     * const securityLog = await prisma.securityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SecurityLogUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, SecurityLogUpdateArgs<ExtArgs>>
    ): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more SecurityLogs.
     * @param {SecurityLogDeleteManyArgs} args - Arguments to filter SecurityLogs to delete.
     * @example
     * // Delete a few SecurityLogs
     * const { count } = await prisma.securityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SecurityLogDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SecurityLogDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SecurityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SecurityLogs
     * const securityLog = await prisma.securityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SecurityLogUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, SecurityLogUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SecurityLog.
     * @param {SecurityLogUpsertArgs} args - Arguments to update or create a SecurityLog.
     * @example
     * // Update or create a SecurityLog
     * const securityLog = await prisma.securityLog.upsert({
     *   create: {
     *     // ... data to create a SecurityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SecurityLog we want to update
     *   }
     * })
    **/
    upsert<T extends SecurityLogUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, SecurityLogUpsertArgs<ExtArgs>>
    ): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of SecurityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogCountArgs} args - Arguments to filter SecurityLogs to count.
     * @example
     * // Count the number of SecurityLogs
     * const count = await prisma.securityLog.count({
     *   where: {
     *     // ... the filter for the SecurityLogs we want to count
     *   }
     * })
    **/
    count<T extends SecurityLogCountArgs>(
      args?: Subset<T, SecurityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SecurityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SecurityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SecurityLogAggregateArgs>(args: Subset<T, SecurityLogAggregateArgs>): Prisma.PrismaPromise<GetSecurityLogAggregateType<T>>

    /**
     * Group by SecurityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SecurityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SecurityLogGroupByArgs['orderBy'] }
        : { orderBy?: SecurityLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SecurityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSecurityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SecurityLog model
   */
  readonly fields: SecurityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SecurityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SecurityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the SecurityLog model
   */ 
  interface SecurityLogFieldRefs {
    readonly id: FieldRef<"SecurityLog", 'String'>
    readonly type: FieldRef<"SecurityLog", 'String'>
    readonly details: FieldRef<"SecurityLog", 'String'>
    readonly ipAddress: FieldRef<"SecurityLog", 'String'>
    readonly timestamp: FieldRef<"SecurityLog", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * SecurityLog findUnique
   */
  export type SecurityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Filter, which SecurityLog to fetch.
     */
    where: SecurityLogWhereUniqueInput
  }


  /**
   * SecurityLog findUniqueOrThrow
   */
  export type SecurityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Filter, which SecurityLog to fetch.
     */
    where: SecurityLogWhereUniqueInput
  }


  /**
   * SecurityLog findFirst
   */
  export type SecurityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Filter, which SecurityLog to fetch.
     */
    where?: SecurityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityLogs to fetch.
     */
    orderBy?: SecurityLogOrderByWithRelationInput | SecurityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SecurityLogs.
     */
    cursor?: SecurityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecurityLogs.
     */
    distinct?: SecurityLogScalarFieldEnum | SecurityLogScalarFieldEnum[]
  }


  /**
   * SecurityLog findFirstOrThrow
   */
  export type SecurityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Filter, which SecurityLog to fetch.
     */
    where?: SecurityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityLogs to fetch.
     */
    orderBy?: SecurityLogOrderByWithRelationInput | SecurityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SecurityLogs.
     */
    cursor?: SecurityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecurityLogs.
     */
    distinct?: SecurityLogScalarFieldEnum | SecurityLogScalarFieldEnum[]
  }


  /**
   * SecurityLog findMany
   */
  export type SecurityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Filter, which SecurityLogs to fetch.
     */
    where?: SecurityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityLogs to fetch.
     */
    orderBy?: SecurityLogOrderByWithRelationInput | SecurityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SecurityLogs.
     */
    cursor?: SecurityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityLogs.
     */
    skip?: number
    distinct?: SecurityLogScalarFieldEnum | SecurityLogScalarFieldEnum[]
  }


  /**
   * SecurityLog create
   */
  export type SecurityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * The data needed to create a SecurityLog.
     */
    data: XOR<SecurityLogCreateInput, SecurityLogUncheckedCreateInput>
  }


  /**
   * SecurityLog update
   */
  export type SecurityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * The data needed to update a SecurityLog.
     */
    data: XOR<SecurityLogUpdateInput, SecurityLogUncheckedUpdateInput>
    /**
     * Choose, which SecurityLog to update.
     */
    where: SecurityLogWhereUniqueInput
  }


  /**
   * SecurityLog updateMany
   */
  export type SecurityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SecurityLogs.
     */
    data: XOR<SecurityLogUpdateManyMutationInput, SecurityLogUncheckedUpdateManyInput>
    /**
     * Filter which SecurityLogs to update
     */
    where?: SecurityLogWhereInput
  }


  /**
   * SecurityLog upsert
   */
  export type SecurityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * The filter to search for the SecurityLog to update in case it exists.
     */
    where: SecurityLogWhereUniqueInput
    /**
     * In case the SecurityLog found by the `where` argument doesn't exist, create a new SecurityLog with this data.
     */
    create: XOR<SecurityLogCreateInput, SecurityLogUncheckedCreateInput>
    /**
     * In case the SecurityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SecurityLogUpdateInput, SecurityLogUncheckedUpdateInput>
  }


  /**
   * SecurityLog delete
   */
  export type SecurityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Filter which SecurityLog to delete.
     */
    where: SecurityLogWhereUniqueInput
  }


  /**
   * SecurityLog deleteMany
   */
  export type SecurityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SecurityLogs to delete
     */
    where?: SecurityLogWhereInput
  }


  /**
   * SecurityLog without action
   */
  export type SecurityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
  }



  /**
   * Model DailyCheckIn
   */

  export type AggregateDailyCheckIn = {
    _count: DailyCheckInCountAggregateOutputType | null
    _min: DailyCheckInMinAggregateOutputType | null
    _max: DailyCheckInMaxAggregateOutputType | null
  }

  export type DailyCheckInMinAggregateOutputType = {
    id: string | null
    userId: string | null
    checkedAt: Date | null
    didGamble: boolean | null
    feltLikeDepositing: boolean | null
    openedGamblingSite: boolean | null
    note: string | null
  }

  export type DailyCheckInMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    checkedAt: Date | null
    didGamble: boolean | null
    feltLikeDepositing: boolean | null
    openedGamblingSite: boolean | null
    note: string | null
  }

  export type DailyCheckInCountAggregateOutputType = {
    id: number
    userId: number
    checkedAt: number
    didGamble: number
    feltLikeDepositing: number
    openedGamblingSite: number
    note: number
    _all: number
  }


  export type DailyCheckInMinAggregateInputType = {
    id?: true
    userId?: true
    checkedAt?: true
    didGamble?: true
    feltLikeDepositing?: true
    openedGamblingSite?: true
    note?: true
  }

  export type DailyCheckInMaxAggregateInputType = {
    id?: true
    userId?: true
    checkedAt?: true
    didGamble?: true
    feltLikeDepositing?: true
    openedGamblingSite?: true
    note?: true
  }

  export type DailyCheckInCountAggregateInputType = {
    id?: true
    userId?: true
    checkedAt?: true
    didGamble?: true
    feltLikeDepositing?: true
    openedGamblingSite?: true
    note?: true
    _all?: true
  }

  export type DailyCheckInAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyCheckIn to aggregate.
     */
    where?: DailyCheckInWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyCheckIns to fetch.
     */
    orderBy?: DailyCheckInOrderByWithRelationInput | DailyCheckInOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyCheckInWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyCheckIns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyCheckIns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyCheckIns
    **/
    _count?: true | DailyCheckInCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyCheckInMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyCheckInMaxAggregateInputType
  }

  export type GetDailyCheckInAggregateType<T extends DailyCheckInAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyCheckIn]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyCheckIn[P]>
      : GetScalarType<T[P], AggregateDailyCheckIn[P]>
  }




  export type DailyCheckInGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyCheckInWhereInput
    orderBy?: DailyCheckInOrderByWithAggregationInput | DailyCheckInOrderByWithAggregationInput[]
    by: DailyCheckInScalarFieldEnum[] | DailyCheckInScalarFieldEnum
    having?: DailyCheckInScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyCheckInCountAggregateInputType | true
    _min?: DailyCheckInMinAggregateInputType
    _max?: DailyCheckInMaxAggregateInputType
  }

  export type DailyCheckInGroupByOutputType = {
    id: string
    userId: string
    checkedAt: Date
    didGamble: boolean
    feltLikeDepositing: boolean
    openedGamblingSite: boolean
    note: string | null
    _count: DailyCheckInCountAggregateOutputType | null
    _min: DailyCheckInMinAggregateOutputType | null
    _max: DailyCheckInMaxAggregateOutputType | null
  }

  type GetDailyCheckInGroupByPayload<T extends DailyCheckInGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyCheckInGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyCheckInGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyCheckInGroupByOutputType[P]>
            : GetScalarType<T[P], DailyCheckInGroupByOutputType[P]>
        }
      >
    >


  export type DailyCheckInSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    checkedAt?: boolean
    didGamble?: boolean
    feltLikeDepositing?: boolean
    openedGamblingSite?: boolean
    note?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyCheckIn"]>

  export type DailyCheckInSelectScalar = {
    id?: boolean
    userId?: boolean
    checkedAt?: boolean
    didGamble?: boolean
    feltLikeDepositing?: boolean
    openedGamblingSite?: boolean
    note?: boolean
  }

  export type DailyCheckInInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $DailyCheckInPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyCheckIn"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      checkedAt: Date
      didGamble: boolean
      feltLikeDepositing: boolean
      openedGamblingSite: boolean
      note: string | null
    }, ExtArgs["result"]["dailyCheckIn"]>
    composites: {}
  }


  type DailyCheckInGetPayload<S extends boolean | null | undefined | DailyCheckInDefaultArgs> = $Result.GetResult<Prisma.$DailyCheckInPayload, S>

  type DailyCheckInCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DailyCheckInFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DailyCheckInCountAggregateInputType | true
    }

  export interface DailyCheckInDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyCheckIn'], meta: { name: 'DailyCheckIn' } }
    /**
     * Find zero or one DailyCheckIn that matches the filter.
     * @param {DailyCheckInFindUniqueArgs} args - Arguments to find a DailyCheckIn
     * @example
     * // Get one DailyCheckIn
     * const dailyCheckIn = await prisma.dailyCheckIn.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DailyCheckInFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, DailyCheckInFindUniqueArgs<ExtArgs>>
    ): Prisma__DailyCheckInClient<$Result.GetResult<Prisma.$DailyCheckInPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one DailyCheckIn that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {DailyCheckInFindUniqueOrThrowArgs} args - Arguments to find a DailyCheckIn
     * @example
     * // Get one DailyCheckIn
     * const dailyCheckIn = await prisma.dailyCheckIn.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DailyCheckInFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, DailyCheckInFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__DailyCheckInClient<$Result.GetResult<Prisma.$DailyCheckInPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first DailyCheckIn that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyCheckInFindFirstArgs} args - Arguments to find a DailyCheckIn
     * @example
     * // Get one DailyCheckIn
     * const dailyCheckIn = await prisma.dailyCheckIn.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DailyCheckInFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, DailyCheckInFindFirstArgs<ExtArgs>>
    ): Prisma__DailyCheckInClient<$Result.GetResult<Prisma.$DailyCheckInPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first DailyCheckIn that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyCheckInFindFirstOrThrowArgs} args - Arguments to find a DailyCheckIn
     * @example
     * // Get one DailyCheckIn
     * const dailyCheckIn = await prisma.dailyCheckIn.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DailyCheckInFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, DailyCheckInFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__DailyCheckInClient<$Result.GetResult<Prisma.$DailyCheckInPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more DailyCheckIns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyCheckInFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyCheckIns
     * const dailyCheckIns = await prisma.dailyCheckIn.findMany()
     * 
     * // Get first 10 DailyCheckIns
     * const dailyCheckIns = await prisma.dailyCheckIn.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyCheckInWithIdOnly = await prisma.dailyCheckIn.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DailyCheckInFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DailyCheckInFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyCheckInPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a DailyCheckIn.
     * @param {DailyCheckInCreateArgs} args - Arguments to create a DailyCheckIn.
     * @example
     * // Create one DailyCheckIn
     * const DailyCheckIn = await prisma.dailyCheckIn.create({
     *   data: {
     *     // ... data to create a DailyCheckIn
     *   }
     * })
     * 
    **/
    create<T extends DailyCheckInCreateArgs<ExtArgs>>(
      args: SelectSubset<T, DailyCheckInCreateArgs<ExtArgs>>
    ): Prisma__DailyCheckInClient<$Result.GetResult<Prisma.$DailyCheckInPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a DailyCheckIn.
     * @param {DailyCheckInDeleteArgs} args - Arguments to delete one DailyCheckIn.
     * @example
     * // Delete one DailyCheckIn
     * const DailyCheckIn = await prisma.dailyCheckIn.delete({
     *   where: {
     *     // ... filter to delete one DailyCheckIn
     *   }
     * })
     * 
    **/
    delete<T extends DailyCheckInDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, DailyCheckInDeleteArgs<ExtArgs>>
    ): Prisma__DailyCheckInClient<$Result.GetResult<Prisma.$DailyCheckInPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one DailyCheckIn.
     * @param {DailyCheckInUpdateArgs} args - Arguments to update one DailyCheckIn.
     * @example
     * // Update one DailyCheckIn
     * const dailyCheckIn = await prisma.dailyCheckIn.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DailyCheckInUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, DailyCheckInUpdateArgs<ExtArgs>>
    ): Prisma__DailyCheckInClient<$Result.GetResult<Prisma.$DailyCheckInPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more DailyCheckIns.
     * @param {DailyCheckInDeleteManyArgs} args - Arguments to filter DailyCheckIns to delete.
     * @example
     * // Delete a few DailyCheckIns
     * const { count } = await prisma.dailyCheckIn.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DailyCheckInDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DailyCheckInDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyCheckIns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyCheckInUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyCheckIns
     * const dailyCheckIn = await prisma.dailyCheckIn.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DailyCheckInUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, DailyCheckInUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DailyCheckIn.
     * @param {DailyCheckInUpsertArgs} args - Arguments to update or create a DailyCheckIn.
     * @example
     * // Update or create a DailyCheckIn
     * const dailyCheckIn = await prisma.dailyCheckIn.upsert({
     *   create: {
     *     // ... data to create a DailyCheckIn
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyCheckIn we want to update
     *   }
     * })
    **/
    upsert<T extends DailyCheckInUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, DailyCheckInUpsertArgs<ExtArgs>>
    ): Prisma__DailyCheckInClient<$Result.GetResult<Prisma.$DailyCheckInPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of DailyCheckIns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyCheckInCountArgs} args - Arguments to filter DailyCheckIns to count.
     * @example
     * // Count the number of DailyCheckIns
     * const count = await prisma.dailyCheckIn.count({
     *   where: {
     *     // ... the filter for the DailyCheckIns we want to count
     *   }
     * })
    **/
    count<T extends DailyCheckInCountArgs>(
      args?: Subset<T, DailyCheckInCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyCheckInCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyCheckIn.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyCheckInAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DailyCheckInAggregateArgs>(args: Subset<T, DailyCheckInAggregateArgs>): Prisma.PrismaPromise<GetDailyCheckInAggregateType<T>>

    /**
     * Group by DailyCheckIn.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyCheckInGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DailyCheckInGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyCheckInGroupByArgs['orderBy'] }
        : { orderBy?: DailyCheckInGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailyCheckInGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyCheckInGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyCheckIn model
   */
  readonly fields: DailyCheckInFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyCheckIn.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyCheckInClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the DailyCheckIn model
   */ 
  interface DailyCheckInFieldRefs {
    readonly id: FieldRef<"DailyCheckIn", 'String'>
    readonly userId: FieldRef<"DailyCheckIn", 'String'>
    readonly checkedAt: FieldRef<"DailyCheckIn", 'DateTime'>
    readonly didGamble: FieldRef<"DailyCheckIn", 'Boolean'>
    readonly feltLikeDepositing: FieldRef<"DailyCheckIn", 'Boolean'>
    readonly openedGamblingSite: FieldRef<"DailyCheckIn", 'Boolean'>
    readonly note: FieldRef<"DailyCheckIn", 'String'>
  }
    

  // Custom InputTypes

  /**
   * DailyCheckIn findUnique
   */
  export type DailyCheckInFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyCheckIn
     */
    select?: DailyCheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DailyCheckInInclude<ExtArgs> | null
    /**
     * Filter, which DailyCheckIn to fetch.
     */
    where: DailyCheckInWhereUniqueInput
  }


  /**
   * DailyCheckIn findUniqueOrThrow
   */
  export type DailyCheckInFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyCheckIn
     */
    select?: DailyCheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DailyCheckInInclude<ExtArgs> | null
    /**
     * Filter, which DailyCheckIn to fetch.
     */
    where: DailyCheckInWhereUniqueInput
  }


  /**
   * DailyCheckIn findFirst
   */
  export type DailyCheckInFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyCheckIn
     */
    select?: DailyCheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DailyCheckInInclude<ExtArgs> | null
    /**
     * Filter, which DailyCheckIn to fetch.
     */
    where?: DailyCheckInWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyCheckIns to fetch.
     */
    orderBy?: DailyCheckInOrderByWithRelationInput | DailyCheckInOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyCheckIns.
     */
    cursor?: DailyCheckInWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyCheckIns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyCheckIns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyCheckIns.
     */
    distinct?: DailyCheckInScalarFieldEnum | DailyCheckInScalarFieldEnum[]
  }


  /**
   * DailyCheckIn findFirstOrThrow
   */
  export type DailyCheckInFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyCheckIn
     */
    select?: DailyCheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DailyCheckInInclude<ExtArgs> | null
    /**
     * Filter, which DailyCheckIn to fetch.
     */
    where?: DailyCheckInWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyCheckIns to fetch.
     */
    orderBy?: DailyCheckInOrderByWithRelationInput | DailyCheckInOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyCheckIns.
     */
    cursor?: DailyCheckInWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyCheckIns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyCheckIns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyCheckIns.
     */
    distinct?: DailyCheckInScalarFieldEnum | DailyCheckInScalarFieldEnum[]
  }


  /**
   * DailyCheckIn findMany
   */
  export type DailyCheckInFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyCheckIn
     */
    select?: DailyCheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DailyCheckInInclude<ExtArgs> | null
    /**
     * Filter, which DailyCheckIns to fetch.
     */
    where?: DailyCheckInWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyCheckIns to fetch.
     */
    orderBy?: DailyCheckInOrderByWithRelationInput | DailyCheckInOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyCheckIns.
     */
    cursor?: DailyCheckInWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyCheckIns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyCheckIns.
     */
    skip?: number
    distinct?: DailyCheckInScalarFieldEnum | DailyCheckInScalarFieldEnum[]
  }


  /**
   * DailyCheckIn create
   */
  export type DailyCheckInCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyCheckIn
     */
    select?: DailyCheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DailyCheckInInclude<ExtArgs> | null
    /**
     * The data needed to create a DailyCheckIn.
     */
    data: XOR<DailyCheckInCreateInput, DailyCheckInUncheckedCreateInput>
  }


  /**
   * DailyCheckIn update
   */
  export type DailyCheckInUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyCheckIn
     */
    select?: DailyCheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DailyCheckInInclude<ExtArgs> | null
    /**
     * The data needed to update a DailyCheckIn.
     */
    data: XOR<DailyCheckInUpdateInput, DailyCheckInUncheckedUpdateInput>
    /**
     * Choose, which DailyCheckIn to update.
     */
    where: DailyCheckInWhereUniqueInput
  }


  /**
   * DailyCheckIn updateMany
   */
  export type DailyCheckInUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyCheckIns.
     */
    data: XOR<DailyCheckInUpdateManyMutationInput, DailyCheckInUncheckedUpdateManyInput>
    /**
     * Filter which DailyCheckIns to update
     */
    where?: DailyCheckInWhereInput
  }


  /**
   * DailyCheckIn upsert
   */
  export type DailyCheckInUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyCheckIn
     */
    select?: DailyCheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DailyCheckInInclude<ExtArgs> | null
    /**
     * The filter to search for the DailyCheckIn to update in case it exists.
     */
    where: DailyCheckInWhereUniqueInput
    /**
     * In case the DailyCheckIn found by the `where` argument doesn't exist, create a new DailyCheckIn with this data.
     */
    create: XOR<DailyCheckInCreateInput, DailyCheckInUncheckedCreateInput>
    /**
     * In case the DailyCheckIn was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyCheckInUpdateInput, DailyCheckInUncheckedUpdateInput>
  }


  /**
   * DailyCheckIn delete
   */
  export type DailyCheckInDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyCheckIn
     */
    select?: DailyCheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DailyCheckInInclude<ExtArgs> | null
    /**
     * Filter which DailyCheckIn to delete.
     */
    where: DailyCheckInWhereUniqueInput
  }


  /**
   * DailyCheckIn deleteMany
   */
  export type DailyCheckInDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyCheckIns to delete
     */
    where?: DailyCheckInWhereInput
  }


  /**
   * DailyCheckIn without action
   */
  export type DailyCheckInDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyCheckIn
     */
    select?: DailyCheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DailyCheckInInclude<ExtArgs> | null
  }



  /**
   * Model Article
   */

  export type AggregateArticle = {
    _count: ArticleCountAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  export type ArticleMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    category: string | null
    thumbnail: string | null
    createdBy: string | null
    createdAt: Date | null
  }

  export type ArticleMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    category: string | null
    thumbnail: string | null
    createdBy: string | null
    createdAt: Date | null
  }

  export type ArticleCountAggregateOutputType = {
    id: number
    title: number
    content: number
    category: number
    thumbnail: number
    createdBy: number
    createdAt: number
    _all: number
  }


  export type ArticleMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    category?: true
    thumbnail?: true
    createdBy?: true
    createdAt?: true
  }

  export type ArticleMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    category?: true
    thumbnail?: true
    createdBy?: true
    createdAt?: true
  }

  export type ArticleCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    category?: true
    thumbnail?: true
    createdBy?: true
    createdAt?: true
    _all?: true
  }

  export type ArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Article to aggregate.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Articles
    **/
    _count?: true | ArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleMaxAggregateInputType
  }

  export type GetArticleAggregateType<T extends ArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticle[P]>
      : GetScalarType<T[P], AggregateArticle[P]>
  }




  export type ArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithAggregationInput | ArticleOrderByWithAggregationInput[]
    by: ArticleScalarFieldEnum[] | ArticleScalarFieldEnum
    having?: ArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleCountAggregateInputType | true
    _min?: ArticleMinAggregateInputType
    _max?: ArticleMaxAggregateInputType
  }

  export type ArticleGroupByOutputType = {
    id: string
    title: string
    content: string
    category: string
    thumbnail: string | null
    createdBy: string
    createdAt: Date
    _count: ArticleCountAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  type GetArticleGroupByPayload<T extends ArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleGroupByOutputType[P]>
        }
      >
    >


  export type ArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    category?: boolean
    thumbnail?: boolean
    createdBy?: boolean
    createdAt?: boolean
    completions?: boolean | Article$completionsArgs<ExtArgs>
    _count?: boolean | ArticleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    category?: boolean
    thumbnail?: boolean
    createdBy?: boolean
    createdAt?: boolean
  }

  export type ArticleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    completions?: boolean | Article$completionsArgs<ExtArgs>
    _count?: boolean | ArticleCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $ArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Article"
    objects: {
      completions: Prisma.$ArticleCompletionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      category: string
      thumbnail: string | null
      createdBy: string
      createdAt: Date
    }, ExtArgs["result"]["article"]>
    composites: {}
  }


  type ArticleGetPayload<S extends boolean | null | undefined | ArticleDefaultArgs> = $Result.GetResult<Prisma.$ArticlePayload, S>

  type ArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ArticleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ArticleCountAggregateInputType | true
    }

  export interface ArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Article'], meta: { name: 'Article' } }
    /**
     * Find zero or one Article that matches the filter.
     * @param {ArticleFindUniqueArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ArticleFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ArticleFindUniqueArgs<ExtArgs>>
    ): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Article that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ArticleFindUniqueOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ArticleFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ArticleFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Article that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ArticleFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ArticleFindFirstArgs<ExtArgs>>
    ): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Article that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ArticleFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ArticleFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Articles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Articles
     * const articles = await prisma.article.findMany()
     * 
     * // Get first 10 Articles
     * const articles = await prisma.article.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleWithIdOnly = await prisma.article.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ArticleFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ArticleFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Article.
     * @param {ArticleCreateArgs} args - Arguments to create a Article.
     * @example
     * // Create one Article
     * const Article = await prisma.article.create({
     *   data: {
     *     // ... data to create a Article
     *   }
     * })
     * 
    **/
    create<T extends ArticleCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ArticleCreateArgs<ExtArgs>>
    ): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a Article.
     * @param {ArticleDeleteArgs} args - Arguments to delete one Article.
     * @example
     * // Delete one Article
     * const Article = await prisma.article.delete({
     *   where: {
     *     // ... filter to delete one Article
     *   }
     * })
     * 
    **/
    delete<T extends ArticleDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ArticleDeleteArgs<ExtArgs>>
    ): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Article.
     * @param {ArticleUpdateArgs} args - Arguments to update one Article.
     * @example
     * // Update one Article
     * const article = await prisma.article.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ArticleUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ArticleUpdateArgs<ExtArgs>>
    ): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Articles.
     * @param {ArticleDeleteManyArgs} args - Arguments to filter Articles to delete.
     * @example
     * // Delete a few Articles
     * const { count } = await prisma.article.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ArticleDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ArticleDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ArticleUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ArticleUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Article.
     * @param {ArticleUpsertArgs} args - Arguments to update or create a Article.
     * @example
     * // Update or create a Article
     * const article = await prisma.article.upsert({
     *   create: {
     *     // ... data to create a Article
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Article we want to update
     *   }
     * })
    **/
    upsert<T extends ArticleUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ArticleUpsertArgs<ExtArgs>>
    ): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCountArgs} args - Arguments to filter Articles to count.
     * @example
     * // Count the number of Articles
     * const count = await prisma.article.count({
     *   where: {
     *     // ... the filter for the Articles we want to count
     *   }
     * })
    **/
    count<T extends ArticleCountArgs>(
      args?: Subset<T, ArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArticleAggregateArgs>(args: Subset<T, ArticleAggregateArgs>): Prisma.PrismaPromise<GetArticleAggregateType<T>>

    /**
     * Group by Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleGroupByArgs['orderBy'] }
        : { orderBy?: ArticleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Article model
   */
  readonly fields: ArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Article.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    completions<T extends Article$completionsArgs<ExtArgs> = {}>(args?: Subset<T, Article$completionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleCompletionPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Article model
   */ 
  interface ArticleFieldRefs {
    readonly id: FieldRef<"Article", 'String'>
    readonly title: FieldRef<"Article", 'String'>
    readonly content: FieldRef<"Article", 'String'>
    readonly category: FieldRef<"Article", 'String'>
    readonly thumbnail: FieldRef<"Article", 'String'>
    readonly createdBy: FieldRef<"Article", 'String'>
    readonly createdAt: FieldRef<"Article", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Article findUnique
   */
  export type ArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }


  /**
   * Article findUniqueOrThrow
   */
  export type ArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }


  /**
   * Article findFirst
   */
  export type ArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }


  /**
   * Article findFirstOrThrow
   */
  export type ArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }


  /**
   * Article findMany
   */
  export type ArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Articles to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }


  /**
   * Article create
   */
  export type ArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to create a Article.
     */
    data: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
  }


  /**
   * Article update
   */
  export type ArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to update a Article.
     */
    data: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
    /**
     * Choose, which Article to update.
     */
    where: ArticleWhereUniqueInput
  }


  /**
   * Article updateMany
   */
  export type ArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
  }


  /**
   * Article upsert
   */
  export type ArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The filter to search for the Article to update in case it exists.
     */
    where: ArticleWhereUniqueInput
    /**
     * In case the Article found by the `where` argument doesn't exist, create a new Article with this data.
     */
    create: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
    /**
     * In case the Article was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
  }


  /**
   * Article delete
   */
  export type ArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter which Article to delete.
     */
    where: ArticleWhereUniqueInput
  }


  /**
   * Article deleteMany
   */
  export type ArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Articles to delete
     */
    where?: ArticleWhereInput
  }


  /**
   * Article.completions
   */
  export type Article$completionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCompletion
     */
    select?: ArticleCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleCompletionInclude<ExtArgs> | null
    where?: ArticleCompletionWhereInput
    orderBy?: ArticleCompletionOrderByWithRelationInput | ArticleCompletionOrderByWithRelationInput[]
    cursor?: ArticleCompletionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleCompletionScalarFieldEnum | ArticleCompletionScalarFieldEnum[]
  }


  /**
   * Article without action
   */
  export type ArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleInclude<ExtArgs> | null
  }



  /**
   * Model ArticleCompletion
   */

  export type AggregateArticleCompletion = {
    _count: ArticleCompletionCountAggregateOutputType | null
    _min: ArticleCompletionMinAggregateOutputType | null
    _max: ArticleCompletionMaxAggregateOutputType | null
  }

  export type ArticleCompletionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    articleId: string | null
    createdAt: Date | null
  }

  export type ArticleCompletionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    articleId: string | null
    createdAt: Date | null
  }

  export type ArticleCompletionCountAggregateOutputType = {
    id: number
    userId: number
    articleId: number
    createdAt: number
    _all: number
  }


  export type ArticleCompletionMinAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
    createdAt?: true
  }

  export type ArticleCompletionMaxAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
    createdAt?: true
  }

  export type ArticleCompletionCountAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
    createdAt?: true
    _all?: true
  }

  export type ArticleCompletionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleCompletion to aggregate.
     */
    where?: ArticleCompletionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleCompletions to fetch.
     */
    orderBy?: ArticleCompletionOrderByWithRelationInput | ArticleCompletionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleCompletionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleCompletions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleCompletions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArticleCompletions
    **/
    _count?: true | ArticleCompletionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleCompletionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleCompletionMaxAggregateInputType
  }

  export type GetArticleCompletionAggregateType<T extends ArticleCompletionAggregateArgs> = {
        [P in keyof T & keyof AggregateArticleCompletion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticleCompletion[P]>
      : GetScalarType<T[P], AggregateArticleCompletion[P]>
  }




  export type ArticleCompletionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleCompletionWhereInput
    orderBy?: ArticleCompletionOrderByWithAggregationInput | ArticleCompletionOrderByWithAggregationInput[]
    by: ArticleCompletionScalarFieldEnum[] | ArticleCompletionScalarFieldEnum
    having?: ArticleCompletionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleCompletionCountAggregateInputType | true
    _min?: ArticleCompletionMinAggregateInputType
    _max?: ArticleCompletionMaxAggregateInputType
  }

  export type ArticleCompletionGroupByOutputType = {
    id: string
    userId: string
    articleId: string
    createdAt: Date
    _count: ArticleCompletionCountAggregateOutputType | null
    _min: ArticleCompletionMinAggregateOutputType | null
    _max: ArticleCompletionMaxAggregateOutputType | null
  }

  type GetArticleCompletionGroupByPayload<T extends ArticleCompletionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleCompletionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleCompletionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleCompletionGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleCompletionGroupByOutputType[P]>
        }
      >
    >


  export type ArticleCompletionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    articleId?: boolean
    createdAt?: boolean
    article?: boolean | ArticleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleCompletion"]>

  export type ArticleCompletionSelectScalar = {
    id?: boolean
    userId?: boolean
    articleId?: boolean
    createdAt?: boolean
  }

  export type ArticleCompletionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    article?: boolean | ArticleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $ArticleCompletionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArticleCompletion"
    objects: {
      article: Prisma.$ArticlePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      articleId: string
      createdAt: Date
    }, ExtArgs["result"]["articleCompletion"]>
    composites: {}
  }


  type ArticleCompletionGetPayload<S extends boolean | null | undefined | ArticleCompletionDefaultArgs> = $Result.GetResult<Prisma.$ArticleCompletionPayload, S>

  type ArticleCompletionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ArticleCompletionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ArticleCompletionCountAggregateInputType | true
    }

  export interface ArticleCompletionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArticleCompletion'], meta: { name: 'ArticleCompletion' } }
    /**
     * Find zero or one ArticleCompletion that matches the filter.
     * @param {ArticleCompletionFindUniqueArgs} args - Arguments to find a ArticleCompletion
     * @example
     * // Get one ArticleCompletion
     * const articleCompletion = await prisma.articleCompletion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ArticleCompletionFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ArticleCompletionFindUniqueArgs<ExtArgs>>
    ): Prisma__ArticleCompletionClient<$Result.GetResult<Prisma.$ArticleCompletionPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ArticleCompletion that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ArticleCompletionFindUniqueOrThrowArgs} args - Arguments to find a ArticleCompletion
     * @example
     * // Get one ArticleCompletion
     * const articleCompletion = await prisma.articleCompletion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ArticleCompletionFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ArticleCompletionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ArticleCompletionClient<$Result.GetResult<Prisma.$ArticleCompletionPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ArticleCompletion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCompletionFindFirstArgs} args - Arguments to find a ArticleCompletion
     * @example
     * // Get one ArticleCompletion
     * const articleCompletion = await prisma.articleCompletion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ArticleCompletionFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ArticleCompletionFindFirstArgs<ExtArgs>>
    ): Prisma__ArticleCompletionClient<$Result.GetResult<Prisma.$ArticleCompletionPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ArticleCompletion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCompletionFindFirstOrThrowArgs} args - Arguments to find a ArticleCompletion
     * @example
     * // Get one ArticleCompletion
     * const articleCompletion = await prisma.articleCompletion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ArticleCompletionFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ArticleCompletionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ArticleCompletionClient<$Result.GetResult<Prisma.$ArticleCompletionPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ArticleCompletions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCompletionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArticleCompletions
     * const articleCompletions = await prisma.articleCompletion.findMany()
     * 
     * // Get first 10 ArticleCompletions
     * const articleCompletions = await prisma.articleCompletion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleCompletionWithIdOnly = await prisma.articleCompletion.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ArticleCompletionFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ArticleCompletionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleCompletionPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ArticleCompletion.
     * @param {ArticleCompletionCreateArgs} args - Arguments to create a ArticleCompletion.
     * @example
     * // Create one ArticleCompletion
     * const ArticleCompletion = await prisma.articleCompletion.create({
     *   data: {
     *     // ... data to create a ArticleCompletion
     *   }
     * })
     * 
    **/
    create<T extends ArticleCompletionCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ArticleCompletionCreateArgs<ExtArgs>>
    ): Prisma__ArticleCompletionClient<$Result.GetResult<Prisma.$ArticleCompletionPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a ArticleCompletion.
     * @param {ArticleCompletionDeleteArgs} args - Arguments to delete one ArticleCompletion.
     * @example
     * // Delete one ArticleCompletion
     * const ArticleCompletion = await prisma.articleCompletion.delete({
     *   where: {
     *     // ... filter to delete one ArticleCompletion
     *   }
     * })
     * 
    **/
    delete<T extends ArticleCompletionDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ArticleCompletionDeleteArgs<ExtArgs>>
    ): Prisma__ArticleCompletionClient<$Result.GetResult<Prisma.$ArticleCompletionPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ArticleCompletion.
     * @param {ArticleCompletionUpdateArgs} args - Arguments to update one ArticleCompletion.
     * @example
     * // Update one ArticleCompletion
     * const articleCompletion = await prisma.articleCompletion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ArticleCompletionUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ArticleCompletionUpdateArgs<ExtArgs>>
    ): Prisma__ArticleCompletionClient<$Result.GetResult<Prisma.$ArticleCompletionPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ArticleCompletions.
     * @param {ArticleCompletionDeleteManyArgs} args - Arguments to filter ArticleCompletions to delete.
     * @example
     * // Delete a few ArticleCompletions
     * const { count } = await prisma.articleCompletion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ArticleCompletionDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ArticleCompletionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArticleCompletions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCompletionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArticleCompletions
     * const articleCompletion = await prisma.articleCompletion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ArticleCompletionUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ArticleCompletionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ArticleCompletion.
     * @param {ArticleCompletionUpsertArgs} args - Arguments to update or create a ArticleCompletion.
     * @example
     * // Update or create a ArticleCompletion
     * const articleCompletion = await prisma.articleCompletion.upsert({
     *   create: {
     *     // ... data to create a ArticleCompletion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArticleCompletion we want to update
     *   }
     * })
    **/
    upsert<T extends ArticleCompletionUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ArticleCompletionUpsertArgs<ExtArgs>>
    ): Prisma__ArticleCompletionClient<$Result.GetResult<Prisma.$ArticleCompletionPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of ArticleCompletions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCompletionCountArgs} args - Arguments to filter ArticleCompletions to count.
     * @example
     * // Count the number of ArticleCompletions
     * const count = await prisma.articleCompletion.count({
     *   where: {
     *     // ... the filter for the ArticleCompletions we want to count
     *   }
     * })
    **/
    count<T extends ArticleCompletionCountArgs>(
      args?: Subset<T, ArticleCompletionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleCompletionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArticleCompletion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCompletionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArticleCompletionAggregateArgs>(args: Subset<T, ArticleCompletionAggregateArgs>): Prisma.PrismaPromise<GetArticleCompletionAggregateType<T>>

    /**
     * Group by ArticleCompletion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCompletionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArticleCompletionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleCompletionGroupByArgs['orderBy'] }
        : { orderBy?: ArticleCompletionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArticleCompletionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleCompletionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArticleCompletion model
   */
  readonly fields: ArticleCompletionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArticleCompletion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleCompletionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    article<T extends ArticleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArticleDefaultArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the ArticleCompletion model
   */ 
  interface ArticleCompletionFieldRefs {
    readonly id: FieldRef<"ArticleCompletion", 'String'>
    readonly userId: FieldRef<"ArticleCompletion", 'String'>
    readonly articleId: FieldRef<"ArticleCompletion", 'String'>
    readonly createdAt: FieldRef<"ArticleCompletion", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * ArticleCompletion findUnique
   */
  export type ArticleCompletionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCompletion
     */
    select?: ArticleCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleCompletionInclude<ExtArgs> | null
    /**
     * Filter, which ArticleCompletion to fetch.
     */
    where: ArticleCompletionWhereUniqueInput
  }


  /**
   * ArticleCompletion findUniqueOrThrow
   */
  export type ArticleCompletionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCompletion
     */
    select?: ArticleCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleCompletionInclude<ExtArgs> | null
    /**
     * Filter, which ArticleCompletion to fetch.
     */
    where: ArticleCompletionWhereUniqueInput
  }


  /**
   * ArticleCompletion findFirst
   */
  export type ArticleCompletionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCompletion
     */
    select?: ArticleCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleCompletionInclude<ExtArgs> | null
    /**
     * Filter, which ArticleCompletion to fetch.
     */
    where?: ArticleCompletionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleCompletions to fetch.
     */
    orderBy?: ArticleCompletionOrderByWithRelationInput | ArticleCompletionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleCompletions.
     */
    cursor?: ArticleCompletionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleCompletions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleCompletions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleCompletions.
     */
    distinct?: ArticleCompletionScalarFieldEnum | ArticleCompletionScalarFieldEnum[]
  }


  /**
   * ArticleCompletion findFirstOrThrow
   */
  export type ArticleCompletionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCompletion
     */
    select?: ArticleCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleCompletionInclude<ExtArgs> | null
    /**
     * Filter, which ArticleCompletion to fetch.
     */
    where?: ArticleCompletionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleCompletions to fetch.
     */
    orderBy?: ArticleCompletionOrderByWithRelationInput | ArticleCompletionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleCompletions.
     */
    cursor?: ArticleCompletionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleCompletions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleCompletions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleCompletions.
     */
    distinct?: ArticleCompletionScalarFieldEnum | ArticleCompletionScalarFieldEnum[]
  }


  /**
   * ArticleCompletion findMany
   */
  export type ArticleCompletionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCompletion
     */
    select?: ArticleCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleCompletionInclude<ExtArgs> | null
    /**
     * Filter, which ArticleCompletions to fetch.
     */
    where?: ArticleCompletionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleCompletions to fetch.
     */
    orderBy?: ArticleCompletionOrderByWithRelationInput | ArticleCompletionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArticleCompletions.
     */
    cursor?: ArticleCompletionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleCompletions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleCompletions.
     */
    skip?: number
    distinct?: ArticleCompletionScalarFieldEnum | ArticleCompletionScalarFieldEnum[]
  }


  /**
   * ArticleCompletion create
   */
  export type ArticleCompletionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCompletion
     */
    select?: ArticleCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleCompletionInclude<ExtArgs> | null
    /**
     * The data needed to create a ArticleCompletion.
     */
    data: XOR<ArticleCompletionCreateInput, ArticleCompletionUncheckedCreateInput>
  }


  /**
   * ArticleCompletion update
   */
  export type ArticleCompletionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCompletion
     */
    select?: ArticleCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleCompletionInclude<ExtArgs> | null
    /**
     * The data needed to update a ArticleCompletion.
     */
    data: XOR<ArticleCompletionUpdateInput, ArticleCompletionUncheckedUpdateInput>
    /**
     * Choose, which ArticleCompletion to update.
     */
    where: ArticleCompletionWhereUniqueInput
  }


  /**
   * ArticleCompletion updateMany
   */
  export type ArticleCompletionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArticleCompletions.
     */
    data: XOR<ArticleCompletionUpdateManyMutationInput, ArticleCompletionUncheckedUpdateManyInput>
    /**
     * Filter which ArticleCompletions to update
     */
    where?: ArticleCompletionWhereInput
  }


  /**
   * ArticleCompletion upsert
   */
  export type ArticleCompletionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCompletion
     */
    select?: ArticleCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleCompletionInclude<ExtArgs> | null
    /**
     * The filter to search for the ArticleCompletion to update in case it exists.
     */
    where: ArticleCompletionWhereUniqueInput
    /**
     * In case the ArticleCompletion found by the `where` argument doesn't exist, create a new ArticleCompletion with this data.
     */
    create: XOR<ArticleCompletionCreateInput, ArticleCompletionUncheckedCreateInput>
    /**
     * In case the ArticleCompletion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleCompletionUpdateInput, ArticleCompletionUncheckedUpdateInput>
  }


  /**
   * ArticleCompletion delete
   */
  export type ArticleCompletionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCompletion
     */
    select?: ArticleCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleCompletionInclude<ExtArgs> | null
    /**
     * Filter which ArticleCompletion to delete.
     */
    where: ArticleCompletionWhereUniqueInput
  }


  /**
   * ArticleCompletion deleteMany
   */
  export type ArticleCompletionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleCompletions to delete
     */
    where?: ArticleCompletionWhereInput
  }


  /**
   * ArticleCompletion without action
   */
  export type ArticleCompletionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCompletion
     */
    select?: ArticleCompletionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ArticleCompletionInclude<ExtArgs> | null
  }



  /**
   * Model SystemSetting
   */

  export type AggregateSystemSetting = {
    _count: SystemSettingCountAggregateOutputType | null
    _min: SystemSettingMinAggregateOutputType | null
    _max: SystemSettingMaxAggregateOutputType | null
  }

  export type SystemSettingMinAggregateOutputType = {
    key: string | null
    value: string | null
  }

  export type SystemSettingMaxAggregateOutputType = {
    key: string | null
    value: string | null
  }

  export type SystemSettingCountAggregateOutputType = {
    key: number
    value: number
    _all: number
  }


  export type SystemSettingMinAggregateInputType = {
    key?: true
    value?: true
  }

  export type SystemSettingMaxAggregateInputType = {
    key?: true
    value?: true
  }

  export type SystemSettingCountAggregateInputType = {
    key?: true
    value?: true
    _all?: true
  }

  export type SystemSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemSetting to aggregate.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemSettings
    **/
    _count?: true | SystemSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemSettingMaxAggregateInputType
  }

  export type GetSystemSettingAggregateType<T extends SystemSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemSetting[P]>
      : GetScalarType<T[P], AggregateSystemSetting[P]>
  }




  export type SystemSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemSettingWhereInput
    orderBy?: SystemSettingOrderByWithAggregationInput | SystemSettingOrderByWithAggregationInput[]
    by: SystemSettingScalarFieldEnum[] | SystemSettingScalarFieldEnum
    having?: SystemSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemSettingCountAggregateInputType | true
    _min?: SystemSettingMinAggregateInputType
    _max?: SystemSettingMaxAggregateInputType
  }

  export type SystemSettingGroupByOutputType = {
    key: string
    value: string
    _count: SystemSettingCountAggregateOutputType | null
    _min: SystemSettingMinAggregateOutputType | null
    _max: SystemSettingMaxAggregateOutputType | null
  }

  type GetSystemSettingGroupByPayload<T extends SystemSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemSettingGroupByOutputType[P]>
            : GetScalarType<T[P], SystemSettingGroupByOutputType[P]>
        }
      >
    >


  export type SystemSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["systemSetting"]>

  export type SystemSettingSelectScalar = {
    key?: boolean
    value?: boolean
  }


  export type $SystemSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemSetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: string
    }, ExtArgs["result"]["systemSetting"]>
    composites: {}
  }


  type SystemSettingGetPayload<S extends boolean | null | undefined | SystemSettingDefaultArgs> = $Result.GetResult<Prisma.$SystemSettingPayload, S>

  type SystemSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SystemSettingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SystemSettingCountAggregateInputType | true
    }

  export interface SystemSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemSetting'], meta: { name: 'SystemSetting' } }
    /**
     * Find zero or one SystemSetting that matches the filter.
     * @param {SystemSettingFindUniqueArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SystemSettingFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, SystemSettingFindUniqueArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one SystemSetting that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {SystemSettingFindUniqueOrThrowArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SystemSettingFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SystemSettingFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first SystemSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindFirstArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SystemSettingFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, SystemSettingFindFirstArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first SystemSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindFirstOrThrowArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SystemSettingFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SystemSettingFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more SystemSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemSettings
     * const systemSettings = await prisma.systemSetting.findMany()
     * 
     * // Get first 10 SystemSettings
     * const systemSettings = await prisma.systemSetting.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const systemSettingWithKeyOnly = await prisma.systemSetting.findMany({ select: { key: true } })
     * 
    **/
    findMany<T extends SystemSettingFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SystemSettingFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a SystemSetting.
     * @param {SystemSettingCreateArgs} args - Arguments to create a SystemSetting.
     * @example
     * // Create one SystemSetting
     * const SystemSetting = await prisma.systemSetting.create({
     *   data: {
     *     // ... data to create a SystemSetting
     *   }
     * })
     * 
    **/
    create<T extends SystemSettingCreateArgs<ExtArgs>>(
      args: SelectSubset<T, SystemSettingCreateArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a SystemSetting.
     * @param {SystemSettingDeleteArgs} args - Arguments to delete one SystemSetting.
     * @example
     * // Delete one SystemSetting
     * const SystemSetting = await prisma.systemSetting.delete({
     *   where: {
     *     // ... filter to delete one SystemSetting
     *   }
     * })
     * 
    **/
    delete<T extends SystemSettingDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, SystemSettingDeleteArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one SystemSetting.
     * @param {SystemSettingUpdateArgs} args - Arguments to update one SystemSetting.
     * @example
     * // Update one SystemSetting
     * const systemSetting = await prisma.systemSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SystemSettingUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, SystemSettingUpdateArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more SystemSettings.
     * @param {SystemSettingDeleteManyArgs} args - Arguments to filter SystemSettings to delete.
     * @example
     * // Delete a few SystemSettings
     * const { count } = await prisma.systemSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SystemSettingDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SystemSettingDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemSettings
     * const systemSetting = await prisma.systemSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SystemSettingUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, SystemSettingUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SystemSetting.
     * @param {SystemSettingUpsertArgs} args - Arguments to update or create a SystemSetting.
     * @example
     * // Update or create a SystemSetting
     * const systemSetting = await prisma.systemSetting.upsert({
     *   create: {
     *     // ... data to create a SystemSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemSetting we want to update
     *   }
     * })
    **/
    upsert<T extends SystemSettingUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, SystemSettingUpsertArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingCountArgs} args - Arguments to filter SystemSettings to count.
     * @example
     * // Count the number of SystemSettings
     * const count = await prisma.systemSetting.count({
     *   where: {
     *     // ... the filter for the SystemSettings we want to count
     *   }
     * })
    **/
    count<T extends SystemSettingCountArgs>(
      args?: Subset<T, SystemSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemSettingAggregateArgs>(args: Subset<T, SystemSettingAggregateArgs>): Prisma.PrismaPromise<GetSystemSettingAggregateType<T>>

    /**
     * Group by SystemSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemSettingGroupByArgs['orderBy'] }
        : { orderBy?: SystemSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemSetting model
   */
  readonly fields: SystemSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the SystemSetting model
   */ 
  interface SystemSettingFieldRefs {
    readonly key: FieldRef<"SystemSetting", 'String'>
    readonly value: FieldRef<"SystemSetting", 'String'>
  }
    

  // Custom InputTypes

  /**
   * SystemSetting findUnique
   */
  export type SystemSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where: SystemSettingWhereUniqueInput
  }


  /**
   * SystemSetting findUniqueOrThrow
   */
  export type SystemSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where: SystemSettingWhereUniqueInput
  }


  /**
   * SystemSetting findFirst
   */
  export type SystemSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }


  /**
   * SystemSetting findFirstOrThrow
   */
  export type SystemSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }


  /**
   * SystemSetting findMany
   */
  export type SystemSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSettings to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }


  /**
   * SystemSetting create
   */
  export type SystemSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * The data needed to create a SystemSetting.
     */
    data: XOR<SystemSettingCreateInput, SystemSettingUncheckedCreateInput>
  }


  /**
   * SystemSetting update
   */
  export type SystemSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * The data needed to update a SystemSetting.
     */
    data: XOR<SystemSettingUpdateInput, SystemSettingUncheckedUpdateInput>
    /**
     * Choose, which SystemSetting to update.
     */
    where: SystemSettingWhereUniqueInput
  }


  /**
   * SystemSetting updateMany
   */
  export type SystemSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemSettings.
     */
    data: XOR<SystemSettingUpdateManyMutationInput, SystemSettingUncheckedUpdateManyInput>
    /**
     * Filter which SystemSettings to update
     */
    where?: SystemSettingWhereInput
  }


  /**
   * SystemSetting upsert
   */
  export type SystemSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * The filter to search for the SystemSetting to update in case it exists.
     */
    where: SystemSettingWhereUniqueInput
    /**
     * In case the SystemSetting found by the `where` argument doesn't exist, create a new SystemSetting with this data.
     */
    create: XOR<SystemSettingCreateInput, SystemSettingUncheckedCreateInput>
    /**
     * In case the SystemSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemSettingUpdateInput, SystemSettingUncheckedUpdateInput>
  }


  /**
   * SystemSetting delete
   */
  export type SystemSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter which SystemSetting to delete.
     */
    where: SystemSettingWhereUniqueInput
  }


  /**
   * SystemSetting deleteMany
   */
  export type SystemSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemSettings to delete
     */
    where?: SystemSettingWhereInput
  }


  /**
   * SystemSetting without action
   */
  export type SystemSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
  }



  /**
   * Model GameThreshold
   */

  export type AggregateGameThreshold = {
    _count: GameThresholdCountAggregateOutputType | null
    _avg: GameThresholdAvgAggregateOutputType | null
    _sum: GameThresholdSumAggregateOutputType | null
    _min: GameThresholdMinAggregateOutputType | null
    _max: GameThresholdMaxAggregateOutputType | null
  }

  export type GameThresholdAvgAggregateOutputType = {
    minScore: number | null
    xpReward: number | null
    timeLimit: number | null
  }

  export type GameThresholdSumAggregateOutputType = {
    minScore: number | null
    xpReward: number | null
    timeLimit: number | null
  }

  export type GameThresholdMinAggregateOutputType = {
    id: string | null
    gameName: string | null
    minScore: number | null
    xpReward: number | null
    timeLimit: number | null
    updatedAt: Date | null
  }

  export type GameThresholdMaxAggregateOutputType = {
    id: string | null
    gameName: string | null
    minScore: number | null
    xpReward: number | null
    timeLimit: number | null
    updatedAt: Date | null
  }

  export type GameThresholdCountAggregateOutputType = {
    id: number
    gameName: number
    minScore: number
    xpReward: number
    timeLimit: number
    updatedAt: number
    _all: number
  }


  export type GameThresholdAvgAggregateInputType = {
    minScore?: true
    xpReward?: true
    timeLimit?: true
  }

  export type GameThresholdSumAggregateInputType = {
    minScore?: true
    xpReward?: true
    timeLimit?: true
  }

  export type GameThresholdMinAggregateInputType = {
    id?: true
    gameName?: true
    minScore?: true
    xpReward?: true
    timeLimit?: true
    updatedAt?: true
  }

  export type GameThresholdMaxAggregateInputType = {
    id?: true
    gameName?: true
    minScore?: true
    xpReward?: true
    timeLimit?: true
    updatedAt?: true
  }

  export type GameThresholdCountAggregateInputType = {
    id?: true
    gameName?: true
    minScore?: true
    xpReward?: true
    timeLimit?: true
    updatedAt?: true
    _all?: true
  }

  export type GameThresholdAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameThreshold to aggregate.
     */
    where?: GameThresholdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameThresholds to fetch.
     */
    orderBy?: GameThresholdOrderByWithRelationInput | GameThresholdOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameThresholdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameThresholds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameThresholds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameThresholds
    **/
    _count?: true | GameThresholdCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameThresholdAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameThresholdSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameThresholdMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameThresholdMaxAggregateInputType
  }

  export type GetGameThresholdAggregateType<T extends GameThresholdAggregateArgs> = {
        [P in keyof T & keyof AggregateGameThreshold]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameThreshold[P]>
      : GetScalarType<T[P], AggregateGameThreshold[P]>
  }




  export type GameThresholdGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameThresholdWhereInput
    orderBy?: GameThresholdOrderByWithAggregationInput | GameThresholdOrderByWithAggregationInput[]
    by: GameThresholdScalarFieldEnum[] | GameThresholdScalarFieldEnum
    having?: GameThresholdScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameThresholdCountAggregateInputType | true
    _avg?: GameThresholdAvgAggregateInputType
    _sum?: GameThresholdSumAggregateInputType
    _min?: GameThresholdMinAggregateInputType
    _max?: GameThresholdMaxAggregateInputType
  }

  export type GameThresholdGroupByOutputType = {
    id: string
    gameName: string
    minScore: number
    xpReward: number
    timeLimit: number
    updatedAt: Date
    _count: GameThresholdCountAggregateOutputType | null
    _avg: GameThresholdAvgAggregateOutputType | null
    _sum: GameThresholdSumAggregateOutputType | null
    _min: GameThresholdMinAggregateOutputType | null
    _max: GameThresholdMaxAggregateOutputType | null
  }

  type GetGameThresholdGroupByPayload<T extends GameThresholdGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameThresholdGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameThresholdGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameThresholdGroupByOutputType[P]>
            : GetScalarType<T[P], GameThresholdGroupByOutputType[P]>
        }
      >
    >


  export type GameThresholdSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameName?: boolean
    minScore?: boolean
    xpReward?: boolean
    timeLimit?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["gameThreshold"]>

  export type GameThresholdSelectScalar = {
    id?: boolean
    gameName?: boolean
    minScore?: boolean
    xpReward?: boolean
    timeLimit?: boolean
    updatedAt?: boolean
  }


  export type $GameThresholdPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameThreshold"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      gameName: string
      minScore: number
      xpReward: number
      timeLimit: number
      updatedAt: Date
    }, ExtArgs["result"]["gameThreshold"]>
    composites: {}
  }


  type GameThresholdGetPayload<S extends boolean | null | undefined | GameThresholdDefaultArgs> = $Result.GetResult<Prisma.$GameThresholdPayload, S>

  type GameThresholdCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GameThresholdFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GameThresholdCountAggregateInputType | true
    }

  export interface GameThresholdDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameThreshold'], meta: { name: 'GameThreshold' } }
    /**
     * Find zero or one GameThreshold that matches the filter.
     * @param {GameThresholdFindUniqueArgs} args - Arguments to find a GameThreshold
     * @example
     * // Get one GameThreshold
     * const gameThreshold = await prisma.gameThreshold.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends GameThresholdFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, GameThresholdFindUniqueArgs<ExtArgs>>
    ): Prisma__GameThresholdClient<$Result.GetResult<Prisma.$GameThresholdPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one GameThreshold that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {GameThresholdFindUniqueOrThrowArgs} args - Arguments to find a GameThreshold
     * @example
     * // Get one GameThreshold
     * const gameThreshold = await prisma.gameThreshold.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends GameThresholdFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, GameThresholdFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__GameThresholdClient<$Result.GetResult<Prisma.$GameThresholdPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first GameThreshold that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameThresholdFindFirstArgs} args - Arguments to find a GameThreshold
     * @example
     * // Get one GameThreshold
     * const gameThreshold = await prisma.gameThreshold.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends GameThresholdFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, GameThresholdFindFirstArgs<ExtArgs>>
    ): Prisma__GameThresholdClient<$Result.GetResult<Prisma.$GameThresholdPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first GameThreshold that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameThresholdFindFirstOrThrowArgs} args - Arguments to find a GameThreshold
     * @example
     * // Get one GameThreshold
     * const gameThreshold = await prisma.gameThreshold.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends GameThresholdFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, GameThresholdFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__GameThresholdClient<$Result.GetResult<Prisma.$GameThresholdPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more GameThresholds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameThresholdFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameThresholds
     * const gameThresholds = await prisma.gameThreshold.findMany()
     * 
     * // Get first 10 GameThresholds
     * const gameThresholds = await prisma.gameThreshold.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameThresholdWithIdOnly = await prisma.gameThreshold.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends GameThresholdFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, GameThresholdFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameThresholdPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a GameThreshold.
     * @param {GameThresholdCreateArgs} args - Arguments to create a GameThreshold.
     * @example
     * // Create one GameThreshold
     * const GameThreshold = await prisma.gameThreshold.create({
     *   data: {
     *     // ... data to create a GameThreshold
     *   }
     * })
     * 
    **/
    create<T extends GameThresholdCreateArgs<ExtArgs>>(
      args: SelectSubset<T, GameThresholdCreateArgs<ExtArgs>>
    ): Prisma__GameThresholdClient<$Result.GetResult<Prisma.$GameThresholdPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a GameThreshold.
     * @param {GameThresholdDeleteArgs} args - Arguments to delete one GameThreshold.
     * @example
     * // Delete one GameThreshold
     * const GameThreshold = await prisma.gameThreshold.delete({
     *   where: {
     *     // ... filter to delete one GameThreshold
     *   }
     * })
     * 
    **/
    delete<T extends GameThresholdDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, GameThresholdDeleteArgs<ExtArgs>>
    ): Prisma__GameThresholdClient<$Result.GetResult<Prisma.$GameThresholdPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one GameThreshold.
     * @param {GameThresholdUpdateArgs} args - Arguments to update one GameThreshold.
     * @example
     * // Update one GameThreshold
     * const gameThreshold = await prisma.gameThreshold.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends GameThresholdUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, GameThresholdUpdateArgs<ExtArgs>>
    ): Prisma__GameThresholdClient<$Result.GetResult<Prisma.$GameThresholdPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more GameThresholds.
     * @param {GameThresholdDeleteManyArgs} args - Arguments to filter GameThresholds to delete.
     * @example
     * // Delete a few GameThresholds
     * const { count } = await prisma.gameThreshold.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends GameThresholdDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, GameThresholdDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameThresholds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameThresholdUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameThresholds
     * const gameThreshold = await prisma.gameThreshold.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends GameThresholdUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, GameThresholdUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GameThreshold.
     * @param {GameThresholdUpsertArgs} args - Arguments to update or create a GameThreshold.
     * @example
     * // Update or create a GameThreshold
     * const gameThreshold = await prisma.gameThreshold.upsert({
     *   create: {
     *     // ... data to create a GameThreshold
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameThreshold we want to update
     *   }
     * })
    **/
    upsert<T extends GameThresholdUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, GameThresholdUpsertArgs<ExtArgs>>
    ): Prisma__GameThresholdClient<$Result.GetResult<Prisma.$GameThresholdPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of GameThresholds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameThresholdCountArgs} args - Arguments to filter GameThresholds to count.
     * @example
     * // Count the number of GameThresholds
     * const count = await prisma.gameThreshold.count({
     *   where: {
     *     // ... the filter for the GameThresholds we want to count
     *   }
     * })
    **/
    count<T extends GameThresholdCountArgs>(
      args?: Subset<T, GameThresholdCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameThresholdCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameThreshold.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameThresholdAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameThresholdAggregateArgs>(args: Subset<T, GameThresholdAggregateArgs>): Prisma.PrismaPromise<GetGameThresholdAggregateType<T>>

    /**
     * Group by GameThreshold.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameThresholdGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameThresholdGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameThresholdGroupByArgs['orderBy'] }
        : { orderBy?: GameThresholdGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameThresholdGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameThresholdGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameThreshold model
   */
  readonly fields: GameThresholdFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameThreshold.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameThresholdClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the GameThreshold model
   */ 
  interface GameThresholdFieldRefs {
    readonly id: FieldRef<"GameThreshold", 'String'>
    readonly gameName: FieldRef<"GameThreshold", 'String'>
    readonly minScore: FieldRef<"GameThreshold", 'Int'>
    readonly xpReward: FieldRef<"GameThreshold", 'Int'>
    readonly timeLimit: FieldRef<"GameThreshold", 'Int'>
    readonly updatedAt: FieldRef<"GameThreshold", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * GameThreshold findUnique
   */
  export type GameThresholdFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameThreshold
     */
    select?: GameThresholdSelect<ExtArgs> | null
    /**
     * Filter, which GameThreshold to fetch.
     */
    where: GameThresholdWhereUniqueInput
  }


  /**
   * GameThreshold findUniqueOrThrow
   */
  export type GameThresholdFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameThreshold
     */
    select?: GameThresholdSelect<ExtArgs> | null
    /**
     * Filter, which GameThreshold to fetch.
     */
    where: GameThresholdWhereUniqueInput
  }


  /**
   * GameThreshold findFirst
   */
  export type GameThresholdFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameThreshold
     */
    select?: GameThresholdSelect<ExtArgs> | null
    /**
     * Filter, which GameThreshold to fetch.
     */
    where?: GameThresholdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameThresholds to fetch.
     */
    orderBy?: GameThresholdOrderByWithRelationInput | GameThresholdOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameThresholds.
     */
    cursor?: GameThresholdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameThresholds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameThresholds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameThresholds.
     */
    distinct?: GameThresholdScalarFieldEnum | GameThresholdScalarFieldEnum[]
  }


  /**
   * GameThreshold findFirstOrThrow
   */
  export type GameThresholdFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameThreshold
     */
    select?: GameThresholdSelect<ExtArgs> | null
    /**
     * Filter, which GameThreshold to fetch.
     */
    where?: GameThresholdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameThresholds to fetch.
     */
    orderBy?: GameThresholdOrderByWithRelationInput | GameThresholdOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameThresholds.
     */
    cursor?: GameThresholdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameThresholds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameThresholds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameThresholds.
     */
    distinct?: GameThresholdScalarFieldEnum | GameThresholdScalarFieldEnum[]
  }


  /**
   * GameThreshold findMany
   */
  export type GameThresholdFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameThreshold
     */
    select?: GameThresholdSelect<ExtArgs> | null
    /**
     * Filter, which GameThresholds to fetch.
     */
    where?: GameThresholdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameThresholds to fetch.
     */
    orderBy?: GameThresholdOrderByWithRelationInput | GameThresholdOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameThresholds.
     */
    cursor?: GameThresholdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameThresholds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameThresholds.
     */
    skip?: number
    distinct?: GameThresholdScalarFieldEnum | GameThresholdScalarFieldEnum[]
  }


  /**
   * GameThreshold create
   */
  export type GameThresholdCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameThreshold
     */
    select?: GameThresholdSelect<ExtArgs> | null
    /**
     * The data needed to create a GameThreshold.
     */
    data: XOR<GameThresholdCreateInput, GameThresholdUncheckedCreateInput>
  }


  /**
   * GameThreshold update
   */
  export type GameThresholdUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameThreshold
     */
    select?: GameThresholdSelect<ExtArgs> | null
    /**
     * The data needed to update a GameThreshold.
     */
    data: XOR<GameThresholdUpdateInput, GameThresholdUncheckedUpdateInput>
    /**
     * Choose, which GameThreshold to update.
     */
    where: GameThresholdWhereUniqueInput
  }


  /**
   * GameThreshold updateMany
   */
  export type GameThresholdUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameThresholds.
     */
    data: XOR<GameThresholdUpdateManyMutationInput, GameThresholdUncheckedUpdateManyInput>
    /**
     * Filter which GameThresholds to update
     */
    where?: GameThresholdWhereInput
  }


  /**
   * GameThreshold upsert
   */
  export type GameThresholdUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameThreshold
     */
    select?: GameThresholdSelect<ExtArgs> | null
    /**
     * The filter to search for the GameThreshold to update in case it exists.
     */
    where: GameThresholdWhereUniqueInput
    /**
     * In case the GameThreshold found by the `where` argument doesn't exist, create a new GameThreshold with this data.
     */
    create: XOR<GameThresholdCreateInput, GameThresholdUncheckedCreateInput>
    /**
     * In case the GameThreshold was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameThresholdUpdateInput, GameThresholdUncheckedUpdateInput>
  }


  /**
   * GameThreshold delete
   */
  export type GameThresholdDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameThreshold
     */
    select?: GameThresholdSelect<ExtArgs> | null
    /**
     * Filter which GameThreshold to delete.
     */
    where: GameThresholdWhereUniqueInput
  }


  /**
   * GameThreshold deleteMany
   */
  export type GameThresholdDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameThresholds to delete
     */
    where?: GameThresholdWhereInput
  }


  /**
   * GameThreshold without action
   */
  export type GameThresholdDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameThreshold
     */
    select?: GameThresholdSelect<ExtArgs> | null
  }



  /**
   * Model LandingPageContent
   */

  export type AggregateLandingPageContent = {
    _count: LandingPageContentCountAggregateOutputType | null
    _min: LandingPageContentMinAggregateOutputType | null
    _max: LandingPageContentMaxAggregateOutputType | null
  }

  export type LandingPageContentMinAggregateOutputType = {
    id: string | null
    heroTitle: string | null
    heroSub: string | null
    stats_users: string | null
    stats_rate: string | null
    updatedAt: Date | null
  }

  export type LandingPageContentMaxAggregateOutputType = {
    id: string | null
    heroTitle: string | null
    heroSub: string | null
    stats_users: string | null
    stats_rate: string | null
    updatedAt: Date | null
  }

  export type LandingPageContentCountAggregateOutputType = {
    id: number
    heroTitle: number
    heroSub: number
    stats_users: number
    stats_rate: number
    updatedAt: number
    _all: number
  }


  export type LandingPageContentMinAggregateInputType = {
    id?: true
    heroTitle?: true
    heroSub?: true
    stats_users?: true
    stats_rate?: true
    updatedAt?: true
  }

  export type LandingPageContentMaxAggregateInputType = {
    id?: true
    heroTitle?: true
    heroSub?: true
    stats_users?: true
    stats_rate?: true
    updatedAt?: true
  }

  export type LandingPageContentCountAggregateInputType = {
    id?: true
    heroTitle?: true
    heroSub?: true
    stats_users?: true
    stats_rate?: true
    updatedAt?: true
    _all?: true
  }

  export type LandingPageContentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LandingPageContent to aggregate.
     */
    where?: LandingPageContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LandingPageContents to fetch.
     */
    orderBy?: LandingPageContentOrderByWithRelationInput | LandingPageContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LandingPageContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LandingPageContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LandingPageContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LandingPageContents
    **/
    _count?: true | LandingPageContentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LandingPageContentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LandingPageContentMaxAggregateInputType
  }

  export type GetLandingPageContentAggregateType<T extends LandingPageContentAggregateArgs> = {
        [P in keyof T & keyof AggregateLandingPageContent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLandingPageContent[P]>
      : GetScalarType<T[P], AggregateLandingPageContent[P]>
  }




  export type LandingPageContentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LandingPageContentWhereInput
    orderBy?: LandingPageContentOrderByWithAggregationInput | LandingPageContentOrderByWithAggregationInput[]
    by: LandingPageContentScalarFieldEnum[] | LandingPageContentScalarFieldEnum
    having?: LandingPageContentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LandingPageContentCountAggregateInputType | true
    _min?: LandingPageContentMinAggregateInputType
    _max?: LandingPageContentMaxAggregateInputType
  }

  export type LandingPageContentGroupByOutputType = {
    id: string
    heroTitle: string
    heroSub: string
    stats_users: string
    stats_rate: string
    updatedAt: Date
    _count: LandingPageContentCountAggregateOutputType | null
    _min: LandingPageContentMinAggregateOutputType | null
    _max: LandingPageContentMaxAggregateOutputType | null
  }

  type GetLandingPageContentGroupByPayload<T extends LandingPageContentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LandingPageContentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LandingPageContentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LandingPageContentGroupByOutputType[P]>
            : GetScalarType<T[P], LandingPageContentGroupByOutputType[P]>
        }
      >
    >


  export type LandingPageContentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    heroTitle?: boolean
    heroSub?: boolean
    stats_users?: boolean
    stats_rate?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["landingPageContent"]>

  export type LandingPageContentSelectScalar = {
    id?: boolean
    heroTitle?: boolean
    heroSub?: boolean
    stats_users?: boolean
    stats_rate?: boolean
    updatedAt?: boolean
  }


  export type $LandingPageContentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LandingPageContent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      heroTitle: string
      heroSub: string
      stats_users: string
      stats_rate: string
      updatedAt: Date
    }, ExtArgs["result"]["landingPageContent"]>
    composites: {}
  }


  type LandingPageContentGetPayload<S extends boolean | null | undefined | LandingPageContentDefaultArgs> = $Result.GetResult<Prisma.$LandingPageContentPayload, S>

  type LandingPageContentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LandingPageContentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LandingPageContentCountAggregateInputType | true
    }

  export interface LandingPageContentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LandingPageContent'], meta: { name: 'LandingPageContent' } }
    /**
     * Find zero or one LandingPageContent that matches the filter.
     * @param {LandingPageContentFindUniqueArgs} args - Arguments to find a LandingPageContent
     * @example
     * // Get one LandingPageContent
     * const landingPageContent = await prisma.landingPageContent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LandingPageContentFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, LandingPageContentFindUniqueArgs<ExtArgs>>
    ): Prisma__LandingPageContentClient<$Result.GetResult<Prisma.$LandingPageContentPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one LandingPageContent that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {LandingPageContentFindUniqueOrThrowArgs} args - Arguments to find a LandingPageContent
     * @example
     * // Get one LandingPageContent
     * const landingPageContent = await prisma.landingPageContent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends LandingPageContentFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, LandingPageContentFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__LandingPageContentClient<$Result.GetResult<Prisma.$LandingPageContentPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first LandingPageContent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandingPageContentFindFirstArgs} args - Arguments to find a LandingPageContent
     * @example
     * // Get one LandingPageContent
     * const landingPageContent = await prisma.landingPageContent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LandingPageContentFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, LandingPageContentFindFirstArgs<ExtArgs>>
    ): Prisma__LandingPageContentClient<$Result.GetResult<Prisma.$LandingPageContentPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first LandingPageContent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandingPageContentFindFirstOrThrowArgs} args - Arguments to find a LandingPageContent
     * @example
     * // Get one LandingPageContent
     * const landingPageContent = await prisma.landingPageContent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends LandingPageContentFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, LandingPageContentFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__LandingPageContentClient<$Result.GetResult<Prisma.$LandingPageContentPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more LandingPageContents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandingPageContentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LandingPageContents
     * const landingPageContents = await prisma.landingPageContent.findMany()
     * 
     * // Get first 10 LandingPageContents
     * const landingPageContents = await prisma.landingPageContent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const landingPageContentWithIdOnly = await prisma.landingPageContent.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends LandingPageContentFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, LandingPageContentFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LandingPageContentPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a LandingPageContent.
     * @param {LandingPageContentCreateArgs} args - Arguments to create a LandingPageContent.
     * @example
     * // Create one LandingPageContent
     * const LandingPageContent = await prisma.landingPageContent.create({
     *   data: {
     *     // ... data to create a LandingPageContent
     *   }
     * })
     * 
    **/
    create<T extends LandingPageContentCreateArgs<ExtArgs>>(
      args: SelectSubset<T, LandingPageContentCreateArgs<ExtArgs>>
    ): Prisma__LandingPageContentClient<$Result.GetResult<Prisma.$LandingPageContentPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a LandingPageContent.
     * @param {LandingPageContentDeleteArgs} args - Arguments to delete one LandingPageContent.
     * @example
     * // Delete one LandingPageContent
     * const LandingPageContent = await prisma.landingPageContent.delete({
     *   where: {
     *     // ... filter to delete one LandingPageContent
     *   }
     * })
     * 
    **/
    delete<T extends LandingPageContentDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, LandingPageContentDeleteArgs<ExtArgs>>
    ): Prisma__LandingPageContentClient<$Result.GetResult<Prisma.$LandingPageContentPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one LandingPageContent.
     * @param {LandingPageContentUpdateArgs} args - Arguments to update one LandingPageContent.
     * @example
     * // Update one LandingPageContent
     * const landingPageContent = await prisma.landingPageContent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LandingPageContentUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, LandingPageContentUpdateArgs<ExtArgs>>
    ): Prisma__LandingPageContentClient<$Result.GetResult<Prisma.$LandingPageContentPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more LandingPageContents.
     * @param {LandingPageContentDeleteManyArgs} args - Arguments to filter LandingPageContents to delete.
     * @example
     * // Delete a few LandingPageContents
     * const { count } = await prisma.landingPageContent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LandingPageContentDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, LandingPageContentDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LandingPageContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandingPageContentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LandingPageContents
     * const landingPageContent = await prisma.landingPageContent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LandingPageContentUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, LandingPageContentUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LandingPageContent.
     * @param {LandingPageContentUpsertArgs} args - Arguments to update or create a LandingPageContent.
     * @example
     * // Update or create a LandingPageContent
     * const landingPageContent = await prisma.landingPageContent.upsert({
     *   create: {
     *     // ... data to create a LandingPageContent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LandingPageContent we want to update
     *   }
     * })
    **/
    upsert<T extends LandingPageContentUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, LandingPageContentUpsertArgs<ExtArgs>>
    ): Prisma__LandingPageContentClient<$Result.GetResult<Prisma.$LandingPageContentPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of LandingPageContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandingPageContentCountArgs} args - Arguments to filter LandingPageContents to count.
     * @example
     * // Count the number of LandingPageContents
     * const count = await prisma.landingPageContent.count({
     *   where: {
     *     // ... the filter for the LandingPageContents we want to count
     *   }
     * })
    **/
    count<T extends LandingPageContentCountArgs>(
      args?: Subset<T, LandingPageContentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LandingPageContentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LandingPageContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandingPageContentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LandingPageContentAggregateArgs>(args: Subset<T, LandingPageContentAggregateArgs>): Prisma.PrismaPromise<GetLandingPageContentAggregateType<T>>

    /**
     * Group by LandingPageContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandingPageContentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LandingPageContentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LandingPageContentGroupByArgs['orderBy'] }
        : { orderBy?: LandingPageContentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LandingPageContentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLandingPageContentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LandingPageContent model
   */
  readonly fields: LandingPageContentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LandingPageContent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LandingPageContentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the LandingPageContent model
   */ 
  interface LandingPageContentFieldRefs {
    readonly id: FieldRef<"LandingPageContent", 'String'>
    readonly heroTitle: FieldRef<"LandingPageContent", 'String'>
    readonly heroSub: FieldRef<"LandingPageContent", 'String'>
    readonly stats_users: FieldRef<"LandingPageContent", 'String'>
    readonly stats_rate: FieldRef<"LandingPageContent", 'String'>
    readonly updatedAt: FieldRef<"LandingPageContent", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * LandingPageContent findUnique
   */
  export type LandingPageContentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandingPageContent
     */
    select?: LandingPageContentSelect<ExtArgs> | null
    /**
     * Filter, which LandingPageContent to fetch.
     */
    where: LandingPageContentWhereUniqueInput
  }


  /**
   * LandingPageContent findUniqueOrThrow
   */
  export type LandingPageContentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandingPageContent
     */
    select?: LandingPageContentSelect<ExtArgs> | null
    /**
     * Filter, which LandingPageContent to fetch.
     */
    where: LandingPageContentWhereUniqueInput
  }


  /**
   * LandingPageContent findFirst
   */
  export type LandingPageContentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandingPageContent
     */
    select?: LandingPageContentSelect<ExtArgs> | null
    /**
     * Filter, which LandingPageContent to fetch.
     */
    where?: LandingPageContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LandingPageContents to fetch.
     */
    orderBy?: LandingPageContentOrderByWithRelationInput | LandingPageContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LandingPageContents.
     */
    cursor?: LandingPageContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LandingPageContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LandingPageContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LandingPageContents.
     */
    distinct?: LandingPageContentScalarFieldEnum | LandingPageContentScalarFieldEnum[]
  }


  /**
   * LandingPageContent findFirstOrThrow
   */
  export type LandingPageContentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandingPageContent
     */
    select?: LandingPageContentSelect<ExtArgs> | null
    /**
     * Filter, which LandingPageContent to fetch.
     */
    where?: LandingPageContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LandingPageContents to fetch.
     */
    orderBy?: LandingPageContentOrderByWithRelationInput | LandingPageContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LandingPageContents.
     */
    cursor?: LandingPageContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LandingPageContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LandingPageContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LandingPageContents.
     */
    distinct?: LandingPageContentScalarFieldEnum | LandingPageContentScalarFieldEnum[]
  }


  /**
   * LandingPageContent findMany
   */
  export type LandingPageContentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandingPageContent
     */
    select?: LandingPageContentSelect<ExtArgs> | null
    /**
     * Filter, which LandingPageContents to fetch.
     */
    where?: LandingPageContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LandingPageContents to fetch.
     */
    orderBy?: LandingPageContentOrderByWithRelationInput | LandingPageContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LandingPageContents.
     */
    cursor?: LandingPageContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LandingPageContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LandingPageContents.
     */
    skip?: number
    distinct?: LandingPageContentScalarFieldEnum | LandingPageContentScalarFieldEnum[]
  }


  /**
   * LandingPageContent create
   */
  export type LandingPageContentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandingPageContent
     */
    select?: LandingPageContentSelect<ExtArgs> | null
    /**
     * The data needed to create a LandingPageContent.
     */
    data: XOR<LandingPageContentCreateInput, LandingPageContentUncheckedCreateInput>
  }


  /**
   * LandingPageContent update
   */
  export type LandingPageContentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandingPageContent
     */
    select?: LandingPageContentSelect<ExtArgs> | null
    /**
     * The data needed to update a LandingPageContent.
     */
    data: XOR<LandingPageContentUpdateInput, LandingPageContentUncheckedUpdateInput>
    /**
     * Choose, which LandingPageContent to update.
     */
    where: LandingPageContentWhereUniqueInput
  }


  /**
   * LandingPageContent updateMany
   */
  export type LandingPageContentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LandingPageContents.
     */
    data: XOR<LandingPageContentUpdateManyMutationInput, LandingPageContentUncheckedUpdateManyInput>
    /**
     * Filter which LandingPageContents to update
     */
    where?: LandingPageContentWhereInput
  }


  /**
   * LandingPageContent upsert
   */
  export type LandingPageContentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandingPageContent
     */
    select?: LandingPageContentSelect<ExtArgs> | null
    /**
     * The filter to search for the LandingPageContent to update in case it exists.
     */
    where: LandingPageContentWhereUniqueInput
    /**
     * In case the LandingPageContent found by the `where` argument doesn't exist, create a new LandingPageContent with this data.
     */
    create: XOR<LandingPageContentCreateInput, LandingPageContentUncheckedCreateInput>
    /**
     * In case the LandingPageContent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LandingPageContentUpdateInput, LandingPageContentUncheckedUpdateInput>
  }


  /**
   * LandingPageContent delete
   */
  export type LandingPageContentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandingPageContent
     */
    select?: LandingPageContentSelect<ExtArgs> | null
    /**
     * Filter which LandingPageContent to delete.
     */
    where: LandingPageContentWhereUniqueInput
  }


  /**
   * LandingPageContent deleteMany
   */
  export type LandingPageContentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LandingPageContents to delete
     */
    where?: LandingPageContentWhereInput
  }


  /**
   * LandingPageContent without action
   */
  export type LandingPageContentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandingPageContent
     */
    select?: LandingPageContentSelect<ExtArgs> | null
  }



  /**
   * Model GamblingReport
   */

  export type AggregateGamblingReport = {
    _count: GamblingReportCountAggregateOutputType | null
    _min: GamblingReportMinAggregateOutputType | null
    _max: GamblingReportMaxAggregateOutputType | null
  }

  export type GamblingReportMinAggregateOutputType = {
    id: string | null
    userId: string | null
    siteName: string | null
    siteLink: string | null
    hasRegistered: boolean | null
    remarks: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GamblingReportMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    siteName: string | null
    siteLink: string | null
    hasRegistered: boolean | null
    remarks: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GamblingReportCountAggregateOutputType = {
    id: number
    userId: number
    siteName: number
    siteLink: number
    hasRegistered: number
    remarks: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GamblingReportMinAggregateInputType = {
    id?: true
    userId?: true
    siteName?: true
    siteLink?: true
    hasRegistered?: true
    remarks?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GamblingReportMaxAggregateInputType = {
    id?: true
    userId?: true
    siteName?: true
    siteLink?: true
    hasRegistered?: true
    remarks?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GamblingReportCountAggregateInputType = {
    id?: true
    userId?: true
    siteName?: true
    siteLink?: true
    hasRegistered?: true
    remarks?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GamblingReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GamblingReport to aggregate.
     */
    where?: GamblingReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamblingReports to fetch.
     */
    orderBy?: GamblingReportOrderByWithRelationInput | GamblingReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GamblingReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamblingReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamblingReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GamblingReports
    **/
    _count?: true | GamblingReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GamblingReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GamblingReportMaxAggregateInputType
  }

  export type GetGamblingReportAggregateType<T extends GamblingReportAggregateArgs> = {
        [P in keyof T & keyof AggregateGamblingReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGamblingReport[P]>
      : GetScalarType<T[P], AggregateGamblingReport[P]>
  }




  export type GamblingReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GamblingReportWhereInput
    orderBy?: GamblingReportOrderByWithAggregationInput | GamblingReportOrderByWithAggregationInput[]
    by: GamblingReportScalarFieldEnum[] | GamblingReportScalarFieldEnum
    having?: GamblingReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GamblingReportCountAggregateInputType | true
    _min?: GamblingReportMinAggregateInputType
    _max?: GamblingReportMaxAggregateInputType
  }

  export type GamblingReportGroupByOutputType = {
    id: string
    userId: string | null
    siteName: string
    siteLink: string
    hasRegistered: boolean
    remarks: string | null
    createdAt: Date
    updatedAt: Date
    _count: GamblingReportCountAggregateOutputType | null
    _min: GamblingReportMinAggregateOutputType | null
    _max: GamblingReportMaxAggregateOutputType | null
  }

  type GetGamblingReportGroupByPayload<T extends GamblingReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GamblingReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GamblingReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GamblingReportGroupByOutputType[P]>
            : GetScalarType<T[P], GamblingReportGroupByOutputType[P]>
        }
      >
    >


  export type GamblingReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    siteName?: boolean
    siteLink?: boolean
    hasRegistered?: boolean
    remarks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | GamblingReport$userArgs<ExtArgs>
  }, ExtArgs["result"]["gamblingReport"]>

  export type GamblingReportSelectScalar = {
    id?: boolean
    userId?: boolean
    siteName?: boolean
    siteLink?: boolean
    hasRegistered?: boolean
    remarks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GamblingReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | GamblingReport$userArgs<ExtArgs>
  }


  export type $GamblingReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GamblingReport"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      siteName: string
      siteLink: string
      hasRegistered: boolean
      remarks: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["gamblingReport"]>
    composites: {}
  }


  type GamblingReportGetPayload<S extends boolean | null | undefined | GamblingReportDefaultArgs> = $Result.GetResult<Prisma.$GamblingReportPayload, S>

  type GamblingReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GamblingReportFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GamblingReportCountAggregateInputType | true
    }

  export interface GamblingReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GamblingReport'], meta: { name: 'GamblingReport' } }
    /**
     * Find zero or one GamblingReport that matches the filter.
     * @param {GamblingReportFindUniqueArgs} args - Arguments to find a GamblingReport
     * @example
     * // Get one GamblingReport
     * const gamblingReport = await prisma.gamblingReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends GamblingReportFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, GamblingReportFindUniqueArgs<ExtArgs>>
    ): Prisma__GamblingReportClient<$Result.GetResult<Prisma.$GamblingReportPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one GamblingReport that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {GamblingReportFindUniqueOrThrowArgs} args - Arguments to find a GamblingReport
     * @example
     * // Get one GamblingReport
     * const gamblingReport = await prisma.gamblingReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends GamblingReportFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, GamblingReportFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__GamblingReportClient<$Result.GetResult<Prisma.$GamblingReportPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first GamblingReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamblingReportFindFirstArgs} args - Arguments to find a GamblingReport
     * @example
     * // Get one GamblingReport
     * const gamblingReport = await prisma.gamblingReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends GamblingReportFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, GamblingReportFindFirstArgs<ExtArgs>>
    ): Prisma__GamblingReportClient<$Result.GetResult<Prisma.$GamblingReportPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first GamblingReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamblingReportFindFirstOrThrowArgs} args - Arguments to find a GamblingReport
     * @example
     * // Get one GamblingReport
     * const gamblingReport = await prisma.gamblingReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends GamblingReportFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, GamblingReportFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__GamblingReportClient<$Result.GetResult<Prisma.$GamblingReportPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more GamblingReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamblingReportFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GamblingReports
     * const gamblingReports = await prisma.gamblingReport.findMany()
     * 
     * // Get first 10 GamblingReports
     * const gamblingReports = await prisma.gamblingReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gamblingReportWithIdOnly = await prisma.gamblingReport.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends GamblingReportFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, GamblingReportFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamblingReportPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a GamblingReport.
     * @param {GamblingReportCreateArgs} args - Arguments to create a GamblingReport.
     * @example
     * // Create one GamblingReport
     * const GamblingReport = await prisma.gamblingReport.create({
     *   data: {
     *     // ... data to create a GamblingReport
     *   }
     * })
     * 
    **/
    create<T extends GamblingReportCreateArgs<ExtArgs>>(
      args: SelectSubset<T, GamblingReportCreateArgs<ExtArgs>>
    ): Prisma__GamblingReportClient<$Result.GetResult<Prisma.$GamblingReportPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a GamblingReport.
     * @param {GamblingReportDeleteArgs} args - Arguments to delete one GamblingReport.
     * @example
     * // Delete one GamblingReport
     * const GamblingReport = await prisma.gamblingReport.delete({
     *   where: {
     *     // ... filter to delete one GamblingReport
     *   }
     * })
     * 
    **/
    delete<T extends GamblingReportDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, GamblingReportDeleteArgs<ExtArgs>>
    ): Prisma__GamblingReportClient<$Result.GetResult<Prisma.$GamblingReportPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one GamblingReport.
     * @param {GamblingReportUpdateArgs} args - Arguments to update one GamblingReport.
     * @example
     * // Update one GamblingReport
     * const gamblingReport = await prisma.gamblingReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends GamblingReportUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, GamblingReportUpdateArgs<ExtArgs>>
    ): Prisma__GamblingReportClient<$Result.GetResult<Prisma.$GamblingReportPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more GamblingReports.
     * @param {GamblingReportDeleteManyArgs} args - Arguments to filter GamblingReports to delete.
     * @example
     * // Delete a few GamblingReports
     * const { count } = await prisma.gamblingReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends GamblingReportDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, GamblingReportDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GamblingReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamblingReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GamblingReports
     * const gamblingReport = await prisma.gamblingReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends GamblingReportUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, GamblingReportUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GamblingReport.
     * @param {GamblingReportUpsertArgs} args - Arguments to update or create a GamblingReport.
     * @example
     * // Update or create a GamblingReport
     * const gamblingReport = await prisma.gamblingReport.upsert({
     *   create: {
     *     // ... data to create a GamblingReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GamblingReport we want to update
     *   }
     * })
    **/
    upsert<T extends GamblingReportUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, GamblingReportUpsertArgs<ExtArgs>>
    ): Prisma__GamblingReportClient<$Result.GetResult<Prisma.$GamblingReportPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of GamblingReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamblingReportCountArgs} args - Arguments to filter GamblingReports to count.
     * @example
     * // Count the number of GamblingReports
     * const count = await prisma.gamblingReport.count({
     *   where: {
     *     // ... the filter for the GamblingReports we want to count
     *   }
     * })
    **/
    count<T extends GamblingReportCountArgs>(
      args?: Subset<T, GamblingReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GamblingReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GamblingReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamblingReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GamblingReportAggregateArgs>(args: Subset<T, GamblingReportAggregateArgs>): Prisma.PrismaPromise<GetGamblingReportAggregateType<T>>

    /**
     * Group by GamblingReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamblingReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GamblingReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GamblingReportGroupByArgs['orderBy'] }
        : { orderBy?: GamblingReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GamblingReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGamblingReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GamblingReport model
   */
  readonly fields: GamblingReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GamblingReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GamblingReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends GamblingReport$userArgs<ExtArgs> = {}>(args?: Subset<T, GamblingReport$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the GamblingReport model
   */ 
  interface GamblingReportFieldRefs {
    readonly id: FieldRef<"GamblingReport", 'String'>
    readonly userId: FieldRef<"GamblingReport", 'String'>
    readonly siteName: FieldRef<"GamblingReport", 'String'>
    readonly siteLink: FieldRef<"GamblingReport", 'String'>
    readonly hasRegistered: FieldRef<"GamblingReport", 'Boolean'>
    readonly remarks: FieldRef<"GamblingReport", 'String'>
    readonly createdAt: FieldRef<"GamblingReport", 'DateTime'>
    readonly updatedAt: FieldRef<"GamblingReport", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * GamblingReport findUnique
   */
  export type GamblingReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamblingReport
     */
    select?: GamblingReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GamblingReportInclude<ExtArgs> | null
    /**
     * Filter, which GamblingReport to fetch.
     */
    where: GamblingReportWhereUniqueInput
  }


  /**
   * GamblingReport findUniqueOrThrow
   */
  export type GamblingReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamblingReport
     */
    select?: GamblingReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GamblingReportInclude<ExtArgs> | null
    /**
     * Filter, which GamblingReport to fetch.
     */
    where: GamblingReportWhereUniqueInput
  }


  /**
   * GamblingReport findFirst
   */
  export type GamblingReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamblingReport
     */
    select?: GamblingReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GamblingReportInclude<ExtArgs> | null
    /**
     * Filter, which GamblingReport to fetch.
     */
    where?: GamblingReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamblingReports to fetch.
     */
    orderBy?: GamblingReportOrderByWithRelationInput | GamblingReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GamblingReports.
     */
    cursor?: GamblingReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamblingReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamblingReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GamblingReports.
     */
    distinct?: GamblingReportScalarFieldEnum | GamblingReportScalarFieldEnum[]
  }


  /**
   * GamblingReport findFirstOrThrow
   */
  export type GamblingReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamblingReport
     */
    select?: GamblingReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GamblingReportInclude<ExtArgs> | null
    /**
     * Filter, which GamblingReport to fetch.
     */
    where?: GamblingReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamblingReports to fetch.
     */
    orderBy?: GamblingReportOrderByWithRelationInput | GamblingReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GamblingReports.
     */
    cursor?: GamblingReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamblingReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamblingReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GamblingReports.
     */
    distinct?: GamblingReportScalarFieldEnum | GamblingReportScalarFieldEnum[]
  }


  /**
   * GamblingReport findMany
   */
  export type GamblingReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamblingReport
     */
    select?: GamblingReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GamblingReportInclude<ExtArgs> | null
    /**
     * Filter, which GamblingReports to fetch.
     */
    where?: GamblingReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamblingReports to fetch.
     */
    orderBy?: GamblingReportOrderByWithRelationInput | GamblingReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GamblingReports.
     */
    cursor?: GamblingReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamblingReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamblingReports.
     */
    skip?: number
    distinct?: GamblingReportScalarFieldEnum | GamblingReportScalarFieldEnum[]
  }


  /**
   * GamblingReport create
   */
  export type GamblingReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamblingReport
     */
    select?: GamblingReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GamblingReportInclude<ExtArgs> | null
    /**
     * The data needed to create a GamblingReport.
     */
    data: XOR<GamblingReportCreateInput, GamblingReportUncheckedCreateInput>
  }


  /**
   * GamblingReport update
   */
  export type GamblingReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamblingReport
     */
    select?: GamblingReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GamblingReportInclude<ExtArgs> | null
    /**
     * The data needed to update a GamblingReport.
     */
    data: XOR<GamblingReportUpdateInput, GamblingReportUncheckedUpdateInput>
    /**
     * Choose, which GamblingReport to update.
     */
    where: GamblingReportWhereUniqueInput
  }


  /**
   * GamblingReport updateMany
   */
  export type GamblingReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GamblingReports.
     */
    data: XOR<GamblingReportUpdateManyMutationInput, GamblingReportUncheckedUpdateManyInput>
    /**
     * Filter which GamblingReports to update
     */
    where?: GamblingReportWhereInput
  }


  /**
   * GamblingReport upsert
   */
  export type GamblingReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamblingReport
     */
    select?: GamblingReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GamblingReportInclude<ExtArgs> | null
    /**
     * The filter to search for the GamblingReport to update in case it exists.
     */
    where: GamblingReportWhereUniqueInput
    /**
     * In case the GamblingReport found by the `where` argument doesn't exist, create a new GamblingReport with this data.
     */
    create: XOR<GamblingReportCreateInput, GamblingReportUncheckedCreateInput>
    /**
     * In case the GamblingReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GamblingReportUpdateInput, GamblingReportUncheckedUpdateInput>
  }


  /**
   * GamblingReport delete
   */
  export type GamblingReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamblingReport
     */
    select?: GamblingReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GamblingReportInclude<ExtArgs> | null
    /**
     * Filter which GamblingReport to delete.
     */
    where: GamblingReportWhereUniqueInput
  }


  /**
   * GamblingReport deleteMany
   */
  export type GamblingReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GamblingReports to delete
     */
    where?: GamblingReportWhereInput
  }


  /**
   * GamblingReport.user
   */
  export type GamblingReport$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }


  /**
   * GamblingReport without action
   */
  export type GamblingReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamblingReport
     */
    select?: GamblingReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GamblingReportInclude<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AchievementScalarFieldEnum: {
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

  export type AchievementScalarFieldEnum = (typeof AchievementScalarFieldEnum)[keyof typeof AchievementScalarFieldEnum]


  export const UserAchievementScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    achievementId: 'achievementId',
    progress: 'progress',
    isUnlocked: 'isUnlocked',
    unlockedAt: 'unlockedAt',
    updatedAt: 'updatedAt'
  };

  export type UserAchievementScalarFieldEnum = (typeof UserAchievementScalarFieldEnum)[keyof typeof UserAchievementScalarFieldEnum]


  export const AddictionTestScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    score: 'score',
    category: 'category',
    createdAt: 'createdAt'
  };

  export type AddictionTestScalarFieldEnum = (typeof AddictionTestScalarFieldEnum)[keyof typeof AddictionTestScalarFieldEnum]


  export const ChallengeProgressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    dayCompleted: 'dayCompleted',
    status: 'status',
    completedAt: 'completedAt'
  };

  export type ChallengeProgressScalarFieldEnum = (typeof ChallengeProgressScalarFieldEnum)[keyof typeof ChallengeProgressScalarFieldEnum]


  export const FeatureUsageScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    featureName: 'featureName',
    usedAt: 'usedAt'
  };

  export type FeatureUsageScalarFieldEnum = (typeof FeatureUsageScalarFieldEnum)[keyof typeof FeatureUsageScalarFieldEnum]


  export const GameSessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    game: 'game',
    xpEarned: 'xpEarned',
    level: 'level',
    score: 'score',
    playedAt: 'playedAt'
  };

  export type GameSessionScalarFieldEnum = (typeof GameSessionScalarFieldEnum)[keyof typeof GameSessionScalarFieldEnum]


  export const SecurityLogScalarFieldEnum: {
    id: 'id',
    type: 'type',
    details: 'details',
    ipAddress: 'ipAddress',
    timestamp: 'timestamp'
  };

  export type SecurityLogScalarFieldEnum = (typeof SecurityLogScalarFieldEnum)[keyof typeof SecurityLogScalarFieldEnum]


  export const DailyCheckInScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    checkedAt: 'checkedAt',
    didGamble: 'didGamble',
    feltLikeDepositing: 'feltLikeDepositing',
    openedGamblingSite: 'openedGamblingSite',
    note: 'note'
  };

  export type DailyCheckInScalarFieldEnum = (typeof DailyCheckInScalarFieldEnum)[keyof typeof DailyCheckInScalarFieldEnum]


  export const ArticleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    category: 'category',
    thumbnail: 'thumbnail',
    createdBy: 'createdBy',
    createdAt: 'createdAt'
  };

  export type ArticleScalarFieldEnum = (typeof ArticleScalarFieldEnum)[keyof typeof ArticleScalarFieldEnum]


  export const ArticleCompletionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    articleId: 'articleId',
    createdAt: 'createdAt'
  };

  export type ArticleCompletionScalarFieldEnum = (typeof ArticleCompletionScalarFieldEnum)[keyof typeof ArticleCompletionScalarFieldEnum]


  export const SystemSettingScalarFieldEnum: {
    key: 'key',
    value: 'value'
  };

  export type SystemSettingScalarFieldEnum = (typeof SystemSettingScalarFieldEnum)[keyof typeof SystemSettingScalarFieldEnum]


  export const GameThresholdScalarFieldEnum: {
    id: 'id',
    gameName: 'gameName',
    minScore: 'minScore',
    xpReward: 'xpReward',
    timeLimit: 'timeLimit',
    updatedAt: 'updatedAt'
  };

  export type GameThresholdScalarFieldEnum = (typeof GameThresholdScalarFieldEnum)[keyof typeof GameThresholdScalarFieldEnum]


  export const LandingPageContentScalarFieldEnum: {
    id: 'id',
    heroTitle: 'heroTitle',
    heroSub: 'heroSub',
    stats_users: 'stats_users',
    stats_rate: 'stats_rate',
    updatedAt: 'updatedAt'
  };

  export type LandingPageContentScalarFieldEnum = (typeof LandingPageContentScalarFieldEnum)[keyof typeof LandingPageContentScalarFieldEnum]


  export const GamblingReportScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    siteName: 'siteName',
    siteLink: 'siteLink',
    hasRegistered: 'hasRegistered',
    remarks: 'remarks',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GamblingReportScalarFieldEnum = (typeof GamblingReportScalarFieldEnum)[keyof typeof GamblingReportScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    xp?: IntFilter<"User"> | number
    level?: IntFilter<"User"> | number
    title?: StringNullableFilter<"User"> | string | null
    lastActivity?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    failedLoginAttempts?: IntFilter<"User"> | number
    lockedUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    streak?: IntFilter<"User"> | number
    longestStreak?: IntFilter<"User"> | number
    addictionTests?: AddictionTestListRelationFilter
    completions?: ArticleCompletionListRelationFilter
    challengeProgress?: ChallengeProgressListRelationFilter
    dailyCheckIns?: DailyCheckInListRelationFilter
    featureUsages?: FeatureUsageListRelationFilter
    gameSessions?: GameSessionListRelationFilter
    achievements?: UserAchievementListRelationFilter
    gamblingReports?: GamblingReportListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    status?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    title?: SortOrderInput | SortOrder
    lastActivity?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrderInput | SortOrder
    streak?: SortOrder
    longestStreak?: SortOrder
    addictionTests?: AddictionTestOrderByRelationAggregateInput
    completions?: ArticleCompletionOrderByRelationAggregateInput
    challengeProgress?: ChallengeProgressOrderByRelationAggregateInput
    dailyCheckIns?: DailyCheckInOrderByRelationAggregateInput
    featureUsages?: FeatureUsageOrderByRelationAggregateInput
    gameSessions?: GameSessionOrderByRelationAggregateInput
    achievements?: UserAchievementOrderByRelationAggregateInput
    gamblingReports?: GamblingReportOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    xp?: IntFilter<"User"> | number
    level?: IntFilter<"User"> | number
    title?: StringNullableFilter<"User"> | string | null
    lastActivity?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    failedLoginAttempts?: IntFilter<"User"> | number
    lockedUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    streak?: IntFilter<"User"> | number
    longestStreak?: IntFilter<"User"> | number
    addictionTests?: AddictionTestListRelationFilter
    completions?: ArticleCompletionListRelationFilter
    challengeProgress?: ChallengeProgressListRelationFilter
    dailyCheckIns?: DailyCheckInListRelationFilter
    featureUsages?: FeatureUsageListRelationFilter
    gameSessions?: GameSessionListRelationFilter
    achievements?: UserAchievementListRelationFilter
    gamblingReports?: GamblingReportListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    status?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    title?: SortOrderInput | SortOrder
    lastActivity?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrderInput | SortOrder
    streak?: SortOrder
    longestStreak?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    status?: StringWithAggregatesFilter<"User"> | string
    xp?: IntWithAggregatesFilter<"User"> | number
    level?: IntWithAggregatesFilter<"User"> | number
    title?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastActivity?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    failedLoginAttempts?: IntWithAggregatesFilter<"User"> | number
    lockedUntil?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    streak?: IntWithAggregatesFilter<"User"> | number
    longestStreak?: IntWithAggregatesFilter<"User"> | number
  }

  export type AchievementWhereInput = {
    AND?: AchievementWhereInput | AchievementWhereInput[]
    OR?: AchievementWhereInput[]
    NOT?: AchievementWhereInput | AchievementWhereInput[]
    id?: StringFilter<"Achievement"> | string
    key?: StringFilter<"Achievement"> | string
    title?: StringFilter<"Achievement"> | string
    description?: StringFilter<"Achievement"> | string
    mission?: StringFilter<"Achievement"> | string
    category?: StringFilter<"Achievement"> | string
    targetValue?: IntFilter<"Achievement"> | number
    iconName?: StringFilter<"Achievement"> | string
    rewardTitle?: StringNullableFilter<"Achievement"> | string | null
    createdAt?: DateTimeFilter<"Achievement"> | Date | string
    userRel?: UserAchievementListRelationFilter
  }

  export type AchievementOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    title?: SortOrder
    description?: SortOrder
    mission?: SortOrder
    category?: SortOrder
    targetValue?: SortOrder
    iconName?: SortOrder
    rewardTitle?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    userRel?: UserAchievementOrderByRelationAggregateInput
  }

  export type AchievementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: AchievementWhereInput | AchievementWhereInput[]
    OR?: AchievementWhereInput[]
    NOT?: AchievementWhereInput | AchievementWhereInput[]
    title?: StringFilter<"Achievement"> | string
    description?: StringFilter<"Achievement"> | string
    mission?: StringFilter<"Achievement"> | string
    category?: StringFilter<"Achievement"> | string
    targetValue?: IntFilter<"Achievement"> | number
    iconName?: StringFilter<"Achievement"> | string
    rewardTitle?: StringNullableFilter<"Achievement"> | string | null
    createdAt?: DateTimeFilter<"Achievement"> | Date | string
    userRel?: UserAchievementListRelationFilter
  }, "id" | "key">

  export type AchievementOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    title?: SortOrder
    description?: SortOrder
    mission?: SortOrder
    category?: SortOrder
    targetValue?: SortOrder
    iconName?: SortOrder
    rewardTitle?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AchievementCountOrderByAggregateInput
    _avg?: AchievementAvgOrderByAggregateInput
    _max?: AchievementMaxOrderByAggregateInput
    _min?: AchievementMinOrderByAggregateInput
    _sum?: AchievementSumOrderByAggregateInput
  }

  export type AchievementScalarWhereWithAggregatesInput = {
    AND?: AchievementScalarWhereWithAggregatesInput | AchievementScalarWhereWithAggregatesInput[]
    OR?: AchievementScalarWhereWithAggregatesInput[]
    NOT?: AchievementScalarWhereWithAggregatesInput | AchievementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Achievement"> | string
    key?: StringWithAggregatesFilter<"Achievement"> | string
    title?: StringWithAggregatesFilter<"Achievement"> | string
    description?: StringWithAggregatesFilter<"Achievement"> | string
    mission?: StringWithAggregatesFilter<"Achievement"> | string
    category?: StringWithAggregatesFilter<"Achievement"> | string
    targetValue?: IntWithAggregatesFilter<"Achievement"> | number
    iconName?: StringWithAggregatesFilter<"Achievement"> | string
    rewardTitle?: StringNullableWithAggregatesFilter<"Achievement"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Achievement"> | Date | string
  }

  export type UserAchievementWhereInput = {
    AND?: UserAchievementWhereInput | UserAchievementWhereInput[]
    OR?: UserAchievementWhereInput[]
    NOT?: UserAchievementWhereInput | UserAchievementWhereInput[]
    id?: StringFilter<"UserAchievement"> | string
    userId?: StringFilter<"UserAchievement"> | string
    achievementId?: StringFilter<"UserAchievement"> | string
    progress?: IntFilter<"UserAchievement"> | number
    isUnlocked?: BoolFilter<"UserAchievement"> | boolean
    unlockedAt?: DateTimeNullableFilter<"UserAchievement"> | Date | string | null
    updatedAt?: DateTimeFilter<"UserAchievement"> | Date | string
    achievement?: XOR<AchievementRelationFilter, AchievementWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type UserAchievementOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    progress?: SortOrder
    isUnlocked?: SortOrder
    unlockedAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    achievement?: AchievementOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type UserAchievementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_achievementId?: UserAchievementUserIdAchievementIdCompoundUniqueInput
    AND?: UserAchievementWhereInput | UserAchievementWhereInput[]
    OR?: UserAchievementWhereInput[]
    NOT?: UserAchievementWhereInput | UserAchievementWhereInput[]
    userId?: StringFilter<"UserAchievement"> | string
    achievementId?: StringFilter<"UserAchievement"> | string
    progress?: IntFilter<"UserAchievement"> | number
    isUnlocked?: BoolFilter<"UserAchievement"> | boolean
    unlockedAt?: DateTimeNullableFilter<"UserAchievement"> | Date | string | null
    updatedAt?: DateTimeFilter<"UserAchievement"> | Date | string
    achievement?: XOR<AchievementRelationFilter, AchievementWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId_achievementId">

  export type UserAchievementOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    progress?: SortOrder
    isUnlocked?: SortOrder
    unlockedAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: UserAchievementCountOrderByAggregateInput
    _avg?: UserAchievementAvgOrderByAggregateInput
    _max?: UserAchievementMaxOrderByAggregateInput
    _min?: UserAchievementMinOrderByAggregateInput
    _sum?: UserAchievementSumOrderByAggregateInput
  }

  export type UserAchievementScalarWhereWithAggregatesInput = {
    AND?: UserAchievementScalarWhereWithAggregatesInput | UserAchievementScalarWhereWithAggregatesInput[]
    OR?: UserAchievementScalarWhereWithAggregatesInput[]
    NOT?: UserAchievementScalarWhereWithAggregatesInput | UserAchievementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserAchievement"> | string
    userId?: StringWithAggregatesFilter<"UserAchievement"> | string
    achievementId?: StringWithAggregatesFilter<"UserAchievement"> | string
    progress?: IntWithAggregatesFilter<"UserAchievement"> | number
    isUnlocked?: BoolWithAggregatesFilter<"UserAchievement"> | boolean
    unlockedAt?: DateTimeNullableWithAggregatesFilter<"UserAchievement"> | Date | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"UserAchievement"> | Date | string
  }

  export type AddictionTestWhereInput = {
    AND?: AddictionTestWhereInput | AddictionTestWhereInput[]
    OR?: AddictionTestWhereInput[]
    NOT?: AddictionTestWhereInput | AddictionTestWhereInput[]
    id?: StringFilter<"AddictionTest"> | string
    userId?: StringFilter<"AddictionTest"> | string
    score?: IntFilter<"AddictionTest"> | number
    category?: StringFilter<"AddictionTest"> | string
    createdAt?: DateTimeFilter<"AddictionTest"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AddictionTestOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    score?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AddictionTestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AddictionTestWhereInput | AddictionTestWhereInput[]
    OR?: AddictionTestWhereInput[]
    NOT?: AddictionTestWhereInput | AddictionTestWhereInput[]
    userId?: StringFilter<"AddictionTest"> | string
    score?: IntFilter<"AddictionTest"> | number
    category?: StringFilter<"AddictionTest"> | string
    createdAt?: DateTimeFilter<"AddictionTest"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type AddictionTestOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    score?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    _count?: AddictionTestCountOrderByAggregateInput
    _avg?: AddictionTestAvgOrderByAggregateInput
    _max?: AddictionTestMaxOrderByAggregateInput
    _min?: AddictionTestMinOrderByAggregateInput
    _sum?: AddictionTestSumOrderByAggregateInput
  }

  export type AddictionTestScalarWhereWithAggregatesInput = {
    AND?: AddictionTestScalarWhereWithAggregatesInput | AddictionTestScalarWhereWithAggregatesInput[]
    OR?: AddictionTestScalarWhereWithAggregatesInput[]
    NOT?: AddictionTestScalarWhereWithAggregatesInput | AddictionTestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AddictionTest"> | string
    userId?: StringWithAggregatesFilter<"AddictionTest"> | string
    score?: IntWithAggregatesFilter<"AddictionTest"> | number
    category?: StringWithAggregatesFilter<"AddictionTest"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AddictionTest"> | Date | string
  }

  export type ChallengeProgressWhereInput = {
    AND?: ChallengeProgressWhereInput | ChallengeProgressWhereInput[]
    OR?: ChallengeProgressWhereInput[]
    NOT?: ChallengeProgressWhereInput | ChallengeProgressWhereInput[]
    id?: StringFilter<"ChallengeProgress"> | string
    userId?: StringFilter<"ChallengeProgress"> | string
    dayCompleted?: IntFilter<"ChallengeProgress"> | number
    status?: StringFilter<"ChallengeProgress"> | string
    completedAt?: DateTimeFilter<"ChallengeProgress"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ChallengeProgressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    dayCompleted?: SortOrder
    status?: SortOrder
    completedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ChallengeProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChallengeProgressWhereInput | ChallengeProgressWhereInput[]
    OR?: ChallengeProgressWhereInput[]
    NOT?: ChallengeProgressWhereInput | ChallengeProgressWhereInput[]
    userId?: StringFilter<"ChallengeProgress"> | string
    dayCompleted?: IntFilter<"ChallengeProgress"> | number
    status?: StringFilter<"ChallengeProgress"> | string
    completedAt?: DateTimeFilter<"ChallengeProgress"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type ChallengeProgressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    dayCompleted?: SortOrder
    status?: SortOrder
    completedAt?: SortOrder
    _count?: ChallengeProgressCountOrderByAggregateInput
    _avg?: ChallengeProgressAvgOrderByAggregateInput
    _max?: ChallengeProgressMaxOrderByAggregateInput
    _min?: ChallengeProgressMinOrderByAggregateInput
    _sum?: ChallengeProgressSumOrderByAggregateInput
  }

  export type ChallengeProgressScalarWhereWithAggregatesInput = {
    AND?: ChallengeProgressScalarWhereWithAggregatesInput | ChallengeProgressScalarWhereWithAggregatesInput[]
    OR?: ChallengeProgressScalarWhereWithAggregatesInput[]
    NOT?: ChallengeProgressScalarWhereWithAggregatesInput | ChallengeProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChallengeProgress"> | string
    userId?: StringWithAggregatesFilter<"ChallengeProgress"> | string
    dayCompleted?: IntWithAggregatesFilter<"ChallengeProgress"> | number
    status?: StringWithAggregatesFilter<"ChallengeProgress"> | string
    completedAt?: DateTimeWithAggregatesFilter<"ChallengeProgress"> | Date | string
  }

  export type FeatureUsageWhereInput = {
    AND?: FeatureUsageWhereInput | FeatureUsageWhereInput[]
    OR?: FeatureUsageWhereInput[]
    NOT?: FeatureUsageWhereInput | FeatureUsageWhereInput[]
    id?: StringFilter<"FeatureUsage"> | string
    userId?: StringFilter<"FeatureUsage"> | string
    featureName?: StringFilter<"FeatureUsage"> | string
    usedAt?: DateTimeFilter<"FeatureUsage"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type FeatureUsageOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    featureName?: SortOrder
    usedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type FeatureUsageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FeatureUsageWhereInput | FeatureUsageWhereInput[]
    OR?: FeatureUsageWhereInput[]
    NOT?: FeatureUsageWhereInput | FeatureUsageWhereInput[]
    userId?: StringFilter<"FeatureUsage"> | string
    featureName?: StringFilter<"FeatureUsage"> | string
    usedAt?: DateTimeFilter<"FeatureUsage"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type FeatureUsageOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    featureName?: SortOrder
    usedAt?: SortOrder
    _count?: FeatureUsageCountOrderByAggregateInput
    _max?: FeatureUsageMaxOrderByAggregateInput
    _min?: FeatureUsageMinOrderByAggregateInput
  }

  export type FeatureUsageScalarWhereWithAggregatesInput = {
    AND?: FeatureUsageScalarWhereWithAggregatesInput | FeatureUsageScalarWhereWithAggregatesInput[]
    OR?: FeatureUsageScalarWhereWithAggregatesInput[]
    NOT?: FeatureUsageScalarWhereWithAggregatesInput | FeatureUsageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FeatureUsage"> | string
    userId?: StringWithAggregatesFilter<"FeatureUsage"> | string
    featureName?: StringWithAggregatesFilter<"FeatureUsage"> | string
    usedAt?: DateTimeWithAggregatesFilter<"FeatureUsage"> | Date | string
  }

  export type GameSessionWhereInput = {
    AND?: GameSessionWhereInput | GameSessionWhereInput[]
    OR?: GameSessionWhereInput[]
    NOT?: GameSessionWhereInput | GameSessionWhereInput[]
    id?: StringFilter<"GameSession"> | string
    userId?: StringFilter<"GameSession"> | string
    game?: StringFilter<"GameSession"> | string
    xpEarned?: IntFilter<"GameSession"> | number
    level?: IntNullableFilter<"GameSession"> | number | null
    score?: IntNullableFilter<"GameSession"> | number | null
    playedAt?: DateTimeFilter<"GameSession"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type GameSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    game?: SortOrder
    xpEarned?: SortOrder
    level?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    playedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type GameSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GameSessionWhereInput | GameSessionWhereInput[]
    OR?: GameSessionWhereInput[]
    NOT?: GameSessionWhereInput | GameSessionWhereInput[]
    userId?: StringFilter<"GameSession"> | string
    game?: StringFilter<"GameSession"> | string
    xpEarned?: IntFilter<"GameSession"> | number
    level?: IntNullableFilter<"GameSession"> | number | null
    score?: IntNullableFilter<"GameSession"> | number | null
    playedAt?: DateTimeFilter<"GameSession"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type GameSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    game?: SortOrder
    xpEarned?: SortOrder
    level?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    playedAt?: SortOrder
    _count?: GameSessionCountOrderByAggregateInput
    _avg?: GameSessionAvgOrderByAggregateInput
    _max?: GameSessionMaxOrderByAggregateInput
    _min?: GameSessionMinOrderByAggregateInput
    _sum?: GameSessionSumOrderByAggregateInput
  }

  export type GameSessionScalarWhereWithAggregatesInput = {
    AND?: GameSessionScalarWhereWithAggregatesInput | GameSessionScalarWhereWithAggregatesInput[]
    OR?: GameSessionScalarWhereWithAggregatesInput[]
    NOT?: GameSessionScalarWhereWithAggregatesInput | GameSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GameSession"> | string
    userId?: StringWithAggregatesFilter<"GameSession"> | string
    game?: StringWithAggregatesFilter<"GameSession"> | string
    xpEarned?: IntWithAggregatesFilter<"GameSession"> | number
    level?: IntNullableWithAggregatesFilter<"GameSession"> | number | null
    score?: IntNullableWithAggregatesFilter<"GameSession"> | number | null
    playedAt?: DateTimeWithAggregatesFilter<"GameSession"> | Date | string
  }

  export type SecurityLogWhereInput = {
    AND?: SecurityLogWhereInput | SecurityLogWhereInput[]
    OR?: SecurityLogWhereInput[]
    NOT?: SecurityLogWhereInput | SecurityLogWhereInput[]
    id?: StringFilter<"SecurityLog"> | string
    type?: StringFilter<"SecurityLog"> | string
    details?: StringFilter<"SecurityLog"> | string
    ipAddress?: StringFilter<"SecurityLog"> | string
    timestamp?: DateTimeFilter<"SecurityLog"> | Date | string
  }

  export type SecurityLogOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    timestamp?: SortOrder
  }

  export type SecurityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SecurityLogWhereInput | SecurityLogWhereInput[]
    OR?: SecurityLogWhereInput[]
    NOT?: SecurityLogWhereInput | SecurityLogWhereInput[]
    type?: StringFilter<"SecurityLog"> | string
    details?: StringFilter<"SecurityLog"> | string
    ipAddress?: StringFilter<"SecurityLog"> | string
    timestamp?: DateTimeFilter<"SecurityLog"> | Date | string
  }, "id">

  export type SecurityLogOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    timestamp?: SortOrder
    _count?: SecurityLogCountOrderByAggregateInput
    _max?: SecurityLogMaxOrderByAggregateInput
    _min?: SecurityLogMinOrderByAggregateInput
  }

  export type SecurityLogScalarWhereWithAggregatesInput = {
    AND?: SecurityLogScalarWhereWithAggregatesInput | SecurityLogScalarWhereWithAggregatesInput[]
    OR?: SecurityLogScalarWhereWithAggregatesInput[]
    NOT?: SecurityLogScalarWhereWithAggregatesInput | SecurityLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SecurityLog"> | string
    type?: StringWithAggregatesFilter<"SecurityLog"> | string
    details?: StringWithAggregatesFilter<"SecurityLog"> | string
    ipAddress?: StringWithAggregatesFilter<"SecurityLog"> | string
    timestamp?: DateTimeWithAggregatesFilter<"SecurityLog"> | Date | string
  }

  export type DailyCheckInWhereInput = {
    AND?: DailyCheckInWhereInput | DailyCheckInWhereInput[]
    OR?: DailyCheckInWhereInput[]
    NOT?: DailyCheckInWhereInput | DailyCheckInWhereInput[]
    id?: StringFilter<"DailyCheckIn"> | string
    userId?: StringFilter<"DailyCheckIn"> | string
    checkedAt?: DateTimeFilter<"DailyCheckIn"> | Date | string
    didGamble?: BoolFilter<"DailyCheckIn"> | boolean
    feltLikeDepositing?: BoolFilter<"DailyCheckIn"> | boolean
    openedGamblingSite?: BoolFilter<"DailyCheckIn"> | boolean
    note?: StringNullableFilter<"DailyCheckIn"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type DailyCheckInOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    checkedAt?: SortOrder
    didGamble?: SortOrder
    feltLikeDepositing?: SortOrder
    openedGamblingSite?: SortOrder
    note?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type DailyCheckInWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DailyCheckInWhereInput | DailyCheckInWhereInput[]
    OR?: DailyCheckInWhereInput[]
    NOT?: DailyCheckInWhereInput | DailyCheckInWhereInput[]
    userId?: StringFilter<"DailyCheckIn"> | string
    checkedAt?: DateTimeFilter<"DailyCheckIn"> | Date | string
    didGamble?: BoolFilter<"DailyCheckIn"> | boolean
    feltLikeDepositing?: BoolFilter<"DailyCheckIn"> | boolean
    openedGamblingSite?: BoolFilter<"DailyCheckIn"> | boolean
    note?: StringNullableFilter<"DailyCheckIn"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type DailyCheckInOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    checkedAt?: SortOrder
    didGamble?: SortOrder
    feltLikeDepositing?: SortOrder
    openedGamblingSite?: SortOrder
    note?: SortOrderInput | SortOrder
    _count?: DailyCheckInCountOrderByAggregateInput
    _max?: DailyCheckInMaxOrderByAggregateInput
    _min?: DailyCheckInMinOrderByAggregateInput
  }

  export type DailyCheckInScalarWhereWithAggregatesInput = {
    AND?: DailyCheckInScalarWhereWithAggregatesInput | DailyCheckInScalarWhereWithAggregatesInput[]
    OR?: DailyCheckInScalarWhereWithAggregatesInput[]
    NOT?: DailyCheckInScalarWhereWithAggregatesInput | DailyCheckInScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyCheckIn"> | string
    userId?: StringWithAggregatesFilter<"DailyCheckIn"> | string
    checkedAt?: DateTimeWithAggregatesFilter<"DailyCheckIn"> | Date | string
    didGamble?: BoolWithAggregatesFilter<"DailyCheckIn"> | boolean
    feltLikeDepositing?: BoolWithAggregatesFilter<"DailyCheckIn"> | boolean
    openedGamblingSite?: BoolWithAggregatesFilter<"DailyCheckIn"> | boolean
    note?: StringNullableWithAggregatesFilter<"DailyCheckIn"> | string | null
  }

  export type ArticleWhereInput = {
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    id?: StringFilter<"Article"> | string
    title?: StringFilter<"Article"> | string
    content?: StringFilter<"Article"> | string
    category?: StringFilter<"Article"> | string
    thumbnail?: StringNullableFilter<"Article"> | string | null
    createdBy?: StringFilter<"Article"> | string
    createdAt?: DateTimeFilter<"Article"> | Date | string
    completions?: ArticleCompletionListRelationFilter
  }

  export type ArticleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    thumbnail?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    completions?: ArticleCompletionOrderByRelationAggregateInput
  }

  export type ArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    title?: StringFilter<"Article"> | string
    content?: StringFilter<"Article"> | string
    category?: StringFilter<"Article"> | string
    thumbnail?: StringNullableFilter<"Article"> | string | null
    createdBy?: StringFilter<"Article"> | string
    createdAt?: DateTimeFilter<"Article"> | Date | string
    completions?: ArticleCompletionListRelationFilter
  }, "id">

  export type ArticleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    thumbnail?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    _count?: ArticleCountOrderByAggregateInput
    _max?: ArticleMaxOrderByAggregateInput
    _min?: ArticleMinOrderByAggregateInput
  }

  export type ArticleScalarWhereWithAggregatesInput = {
    AND?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    OR?: ArticleScalarWhereWithAggregatesInput[]
    NOT?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Article"> | string
    title?: StringWithAggregatesFilter<"Article"> | string
    content?: StringWithAggregatesFilter<"Article"> | string
    category?: StringWithAggregatesFilter<"Article"> | string
    thumbnail?: StringNullableWithAggregatesFilter<"Article"> | string | null
    createdBy?: StringWithAggregatesFilter<"Article"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
  }

  export type ArticleCompletionWhereInput = {
    AND?: ArticleCompletionWhereInput | ArticleCompletionWhereInput[]
    OR?: ArticleCompletionWhereInput[]
    NOT?: ArticleCompletionWhereInput | ArticleCompletionWhereInput[]
    id?: StringFilter<"ArticleCompletion"> | string
    userId?: StringFilter<"ArticleCompletion"> | string
    articleId?: StringFilter<"ArticleCompletion"> | string
    createdAt?: DateTimeFilter<"ArticleCompletion"> | Date | string
    article?: XOR<ArticleRelationFilter, ArticleWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ArticleCompletionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    createdAt?: SortOrder
    article?: ArticleOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ArticleCompletionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_articleId?: ArticleCompletionUserIdArticleIdCompoundUniqueInput
    AND?: ArticleCompletionWhereInput | ArticleCompletionWhereInput[]
    OR?: ArticleCompletionWhereInput[]
    NOT?: ArticleCompletionWhereInput | ArticleCompletionWhereInput[]
    userId?: StringFilter<"ArticleCompletion"> | string
    articleId?: StringFilter<"ArticleCompletion"> | string
    createdAt?: DateTimeFilter<"ArticleCompletion"> | Date | string
    article?: XOR<ArticleRelationFilter, ArticleWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId_articleId">

  export type ArticleCompletionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    createdAt?: SortOrder
    _count?: ArticleCompletionCountOrderByAggregateInput
    _max?: ArticleCompletionMaxOrderByAggregateInput
    _min?: ArticleCompletionMinOrderByAggregateInput
  }

  export type ArticleCompletionScalarWhereWithAggregatesInput = {
    AND?: ArticleCompletionScalarWhereWithAggregatesInput | ArticleCompletionScalarWhereWithAggregatesInput[]
    OR?: ArticleCompletionScalarWhereWithAggregatesInput[]
    NOT?: ArticleCompletionScalarWhereWithAggregatesInput | ArticleCompletionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ArticleCompletion"> | string
    userId?: StringWithAggregatesFilter<"ArticleCompletion"> | string
    articleId?: StringWithAggregatesFilter<"ArticleCompletion"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ArticleCompletion"> | Date | string
  }

  export type SystemSettingWhereInput = {
    AND?: SystemSettingWhereInput | SystemSettingWhereInput[]
    OR?: SystemSettingWhereInput[]
    NOT?: SystemSettingWhereInput | SystemSettingWhereInput[]
    key?: StringFilter<"SystemSetting"> | string
    value?: StringFilter<"SystemSetting"> | string
  }

  export type SystemSettingOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type SystemSettingWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: SystemSettingWhereInput | SystemSettingWhereInput[]
    OR?: SystemSettingWhereInput[]
    NOT?: SystemSettingWhereInput | SystemSettingWhereInput[]
    value?: StringFilter<"SystemSetting"> | string
  }, "key">

  export type SystemSettingOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    _count?: SystemSettingCountOrderByAggregateInput
    _max?: SystemSettingMaxOrderByAggregateInput
    _min?: SystemSettingMinOrderByAggregateInput
  }

  export type SystemSettingScalarWhereWithAggregatesInput = {
    AND?: SystemSettingScalarWhereWithAggregatesInput | SystemSettingScalarWhereWithAggregatesInput[]
    OR?: SystemSettingScalarWhereWithAggregatesInput[]
    NOT?: SystemSettingScalarWhereWithAggregatesInput | SystemSettingScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"SystemSetting"> | string
    value?: StringWithAggregatesFilter<"SystemSetting"> | string
  }

  export type GameThresholdWhereInput = {
    AND?: GameThresholdWhereInput | GameThresholdWhereInput[]
    OR?: GameThresholdWhereInput[]
    NOT?: GameThresholdWhereInput | GameThresholdWhereInput[]
    id?: StringFilter<"GameThreshold"> | string
    gameName?: StringFilter<"GameThreshold"> | string
    minScore?: IntFilter<"GameThreshold"> | number
    xpReward?: IntFilter<"GameThreshold"> | number
    timeLimit?: IntFilter<"GameThreshold"> | number
    updatedAt?: DateTimeFilter<"GameThreshold"> | Date | string
  }

  export type GameThresholdOrderByWithRelationInput = {
    id?: SortOrder
    gameName?: SortOrder
    minScore?: SortOrder
    xpReward?: SortOrder
    timeLimit?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameThresholdWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    gameName?: string
    AND?: GameThresholdWhereInput | GameThresholdWhereInput[]
    OR?: GameThresholdWhereInput[]
    NOT?: GameThresholdWhereInput | GameThresholdWhereInput[]
    minScore?: IntFilter<"GameThreshold"> | number
    xpReward?: IntFilter<"GameThreshold"> | number
    timeLimit?: IntFilter<"GameThreshold"> | number
    updatedAt?: DateTimeFilter<"GameThreshold"> | Date | string
  }, "id" | "gameName">

  export type GameThresholdOrderByWithAggregationInput = {
    id?: SortOrder
    gameName?: SortOrder
    minScore?: SortOrder
    xpReward?: SortOrder
    timeLimit?: SortOrder
    updatedAt?: SortOrder
    _count?: GameThresholdCountOrderByAggregateInput
    _avg?: GameThresholdAvgOrderByAggregateInput
    _max?: GameThresholdMaxOrderByAggregateInput
    _min?: GameThresholdMinOrderByAggregateInput
    _sum?: GameThresholdSumOrderByAggregateInput
  }

  export type GameThresholdScalarWhereWithAggregatesInput = {
    AND?: GameThresholdScalarWhereWithAggregatesInput | GameThresholdScalarWhereWithAggregatesInput[]
    OR?: GameThresholdScalarWhereWithAggregatesInput[]
    NOT?: GameThresholdScalarWhereWithAggregatesInput | GameThresholdScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GameThreshold"> | string
    gameName?: StringWithAggregatesFilter<"GameThreshold"> | string
    minScore?: IntWithAggregatesFilter<"GameThreshold"> | number
    xpReward?: IntWithAggregatesFilter<"GameThreshold"> | number
    timeLimit?: IntWithAggregatesFilter<"GameThreshold"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"GameThreshold"> | Date | string
  }

  export type LandingPageContentWhereInput = {
    AND?: LandingPageContentWhereInput | LandingPageContentWhereInput[]
    OR?: LandingPageContentWhereInput[]
    NOT?: LandingPageContentWhereInput | LandingPageContentWhereInput[]
    id?: StringFilter<"LandingPageContent"> | string
    heroTitle?: StringFilter<"LandingPageContent"> | string
    heroSub?: StringFilter<"LandingPageContent"> | string
    stats_users?: StringFilter<"LandingPageContent"> | string
    stats_rate?: StringFilter<"LandingPageContent"> | string
    updatedAt?: DateTimeFilter<"LandingPageContent"> | Date | string
  }

  export type LandingPageContentOrderByWithRelationInput = {
    id?: SortOrder
    heroTitle?: SortOrder
    heroSub?: SortOrder
    stats_users?: SortOrder
    stats_rate?: SortOrder
    updatedAt?: SortOrder
  }

  export type LandingPageContentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LandingPageContentWhereInput | LandingPageContentWhereInput[]
    OR?: LandingPageContentWhereInput[]
    NOT?: LandingPageContentWhereInput | LandingPageContentWhereInput[]
    heroTitle?: StringFilter<"LandingPageContent"> | string
    heroSub?: StringFilter<"LandingPageContent"> | string
    stats_users?: StringFilter<"LandingPageContent"> | string
    stats_rate?: StringFilter<"LandingPageContent"> | string
    updatedAt?: DateTimeFilter<"LandingPageContent"> | Date | string
  }, "id">

  export type LandingPageContentOrderByWithAggregationInput = {
    id?: SortOrder
    heroTitle?: SortOrder
    heroSub?: SortOrder
    stats_users?: SortOrder
    stats_rate?: SortOrder
    updatedAt?: SortOrder
    _count?: LandingPageContentCountOrderByAggregateInput
    _max?: LandingPageContentMaxOrderByAggregateInput
    _min?: LandingPageContentMinOrderByAggregateInput
  }

  export type LandingPageContentScalarWhereWithAggregatesInput = {
    AND?: LandingPageContentScalarWhereWithAggregatesInput | LandingPageContentScalarWhereWithAggregatesInput[]
    OR?: LandingPageContentScalarWhereWithAggregatesInput[]
    NOT?: LandingPageContentScalarWhereWithAggregatesInput | LandingPageContentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LandingPageContent"> | string
    heroTitle?: StringWithAggregatesFilter<"LandingPageContent"> | string
    heroSub?: StringWithAggregatesFilter<"LandingPageContent"> | string
    stats_users?: StringWithAggregatesFilter<"LandingPageContent"> | string
    stats_rate?: StringWithAggregatesFilter<"LandingPageContent"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"LandingPageContent"> | Date | string
  }

  export type GamblingReportWhereInput = {
    AND?: GamblingReportWhereInput | GamblingReportWhereInput[]
    OR?: GamblingReportWhereInput[]
    NOT?: GamblingReportWhereInput | GamblingReportWhereInput[]
    id?: StringFilter<"GamblingReport"> | string
    userId?: StringNullableFilter<"GamblingReport"> | string | null
    siteName?: StringFilter<"GamblingReport"> | string
    siteLink?: StringFilter<"GamblingReport"> | string
    hasRegistered?: BoolFilter<"GamblingReport"> | boolean
    remarks?: StringNullableFilter<"GamblingReport"> | string | null
    createdAt?: DateTimeFilter<"GamblingReport"> | Date | string
    updatedAt?: DateTimeFilter<"GamblingReport"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type GamblingReportOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    siteName?: SortOrder
    siteLink?: SortOrder
    hasRegistered?: SortOrder
    remarks?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type GamblingReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GamblingReportWhereInput | GamblingReportWhereInput[]
    OR?: GamblingReportWhereInput[]
    NOT?: GamblingReportWhereInput | GamblingReportWhereInput[]
    userId?: StringNullableFilter<"GamblingReport"> | string | null
    siteName?: StringFilter<"GamblingReport"> | string
    siteLink?: StringFilter<"GamblingReport"> | string
    hasRegistered?: BoolFilter<"GamblingReport"> | boolean
    remarks?: StringNullableFilter<"GamblingReport"> | string | null
    createdAt?: DateTimeFilter<"GamblingReport"> | Date | string
    updatedAt?: DateTimeFilter<"GamblingReport"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type GamblingReportOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    siteName?: SortOrder
    siteLink?: SortOrder
    hasRegistered?: SortOrder
    remarks?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GamblingReportCountOrderByAggregateInput
    _max?: GamblingReportMaxOrderByAggregateInput
    _min?: GamblingReportMinOrderByAggregateInput
  }

  export type GamblingReportScalarWhereWithAggregatesInput = {
    AND?: GamblingReportScalarWhereWithAggregatesInput | GamblingReportScalarWhereWithAggregatesInput[]
    OR?: GamblingReportScalarWhereWithAggregatesInput[]
    NOT?: GamblingReportScalarWhereWithAggregatesInput | GamblingReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GamblingReport"> | string
    userId?: StringNullableWithAggregatesFilter<"GamblingReport"> | string | null
    siteName?: StringWithAggregatesFilter<"GamblingReport"> | string
    siteLink?: StringWithAggregatesFilter<"GamblingReport"> | string
    hasRegistered?: BoolWithAggregatesFilter<"GamblingReport"> | boolean
    remarks?: StringNullableWithAggregatesFilter<"GamblingReport"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GamblingReport"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GamblingReport"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    phone?: string | null
    role?: string
    status?: string
    xp?: number
    level?: number
    title?: string | null
    lastActivity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    streak?: number
    longestStreak?: number
    addictionTests?: AddictionTestCreateNestedManyWithoutUserInput
    completions?: ArticleCompletionCreateNestedManyWithoutUserInput
    challengeProgress?: ChallengeProgressCreateNestedManyWithoutUserInput
    dailyCheckIns?: DailyCheckInCreateNestedManyWithoutUserInput
    featureUsages?: FeatureUsageCreateNestedManyWithoutUserInput
    gameSessions?: GameSessionCreateNestedManyWithoutUserInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
    gamblingReports?: GamblingReportCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    phone?: string | null
    role?: string
    status?: string
    xp?: number
    level?: number
    title?: string | null
    lastActivity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    streak?: number
    longestStreak?: number
    addictionTests?: AddictionTestUncheckedCreateNestedManyWithoutUserInput
    completions?: ArticleCompletionUncheckedCreateNestedManyWithoutUserInput
    challengeProgress?: ChallengeProgressUncheckedCreateNestedManyWithoutUserInput
    dailyCheckIns?: DailyCheckInUncheckedCreateNestedManyWithoutUserInput
    featureUsages?: FeatureUsageUncheckedCreateNestedManyWithoutUserInput
    gameSessions?: GameSessionUncheckedCreateNestedManyWithoutUserInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    gamblingReports?: GamblingReportUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    addictionTests?: AddictionTestUpdateManyWithoutUserNestedInput
    completions?: ArticleCompletionUpdateManyWithoutUserNestedInput
    challengeProgress?: ChallengeProgressUpdateManyWithoutUserNestedInput
    dailyCheckIns?: DailyCheckInUpdateManyWithoutUserNestedInput
    featureUsages?: FeatureUsageUpdateManyWithoutUserNestedInput
    gameSessions?: GameSessionUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
    gamblingReports?: GamblingReportUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    addictionTests?: AddictionTestUncheckedUpdateManyWithoutUserNestedInput
    completions?: ArticleCompletionUncheckedUpdateManyWithoutUserNestedInput
    challengeProgress?: ChallengeProgressUncheckedUpdateManyWithoutUserNestedInput
    dailyCheckIns?: DailyCheckInUncheckedUpdateManyWithoutUserNestedInput
    featureUsages?: FeatureUsageUncheckedUpdateManyWithoutUserNestedInput
    gameSessions?: GameSessionUncheckedUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    gamblingReports?: GamblingReportUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
  }

  export type AchievementCreateInput = {
    id?: string
    key: string
    title: string
    description: string
    mission: string
    category: string
    targetValue: number
    iconName: string
    rewardTitle?: string | null
    createdAt?: Date | string
    userRel?: UserAchievementCreateNestedManyWithoutAchievementInput
  }

  export type AchievementUncheckedCreateInput = {
    id?: string
    key: string
    title: string
    description: string
    mission: string
    category: string
    targetValue: number
    iconName: string
    rewardTitle?: string | null
    createdAt?: Date | string
    userRel?: UserAchievementUncheckedCreateNestedManyWithoutAchievementInput
  }

  export type AchievementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mission?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetValue?: IntFieldUpdateOperationsInput | number
    iconName?: StringFieldUpdateOperationsInput | string
    rewardTitle?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userRel?: UserAchievementUpdateManyWithoutAchievementNestedInput
  }

  export type AchievementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mission?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetValue?: IntFieldUpdateOperationsInput | number
    iconName?: StringFieldUpdateOperationsInput | string
    rewardTitle?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userRel?: UserAchievementUncheckedUpdateManyWithoutAchievementNestedInput
  }

  export type AchievementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mission?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetValue?: IntFieldUpdateOperationsInput | number
    iconName?: StringFieldUpdateOperationsInput | string
    rewardTitle?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mission?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetValue?: IntFieldUpdateOperationsInput | number
    iconName?: StringFieldUpdateOperationsInput | string
    rewardTitle?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementCreateInput = {
    id?: string
    progress?: number
    isUnlocked?: boolean
    unlockedAt?: Date | string | null
    updatedAt?: Date | string
    achievement: AchievementCreateNestedOneWithoutUserRelInput
    user: UserCreateNestedOneWithoutAchievementsInput
  }

  export type UserAchievementUncheckedCreateInput = {
    id?: string
    userId: string
    achievementId: string
    progress?: number
    isUnlocked?: boolean
    unlockedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type UserAchievementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    isUnlocked?: BoolFieldUpdateOperationsInput | boolean
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    achievement?: AchievementUpdateOneRequiredWithoutUserRelNestedInput
    user?: UserUpdateOneRequiredWithoutAchievementsNestedInput
  }

  export type UserAchievementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    achievementId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    isUnlocked?: BoolFieldUpdateOperationsInput | boolean
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    isUnlocked?: BoolFieldUpdateOperationsInput | boolean
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    achievementId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    isUnlocked?: BoolFieldUpdateOperationsInput | boolean
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddictionTestCreateInput = {
    id?: string
    score: number
    category: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAddictionTestsInput
  }

  export type AddictionTestUncheckedCreateInput = {
    id?: string
    userId: string
    score: number
    category: string
    createdAt?: Date | string
  }

  export type AddictionTestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAddictionTestsNestedInput
  }

  export type AddictionTestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddictionTestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddictionTestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChallengeProgressCreateInput = {
    id?: string
    dayCompleted: number
    status: string
    completedAt?: Date | string
    user: UserCreateNestedOneWithoutChallengeProgressInput
  }

  export type ChallengeProgressUncheckedCreateInput = {
    id?: string
    userId: string
    dayCompleted: number
    status: string
    completedAt?: Date | string
  }

  export type ChallengeProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayCompleted?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutChallengeProgressNestedInput
  }

  export type ChallengeProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dayCompleted?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChallengeProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayCompleted?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChallengeProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dayCompleted?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureUsageCreateInput = {
    id?: string
    featureName: string
    usedAt?: Date | string
    user: UserCreateNestedOneWithoutFeatureUsagesInput
  }

  export type FeatureUsageUncheckedCreateInput = {
    id?: string
    userId: string
    featureName: string
    usedAt?: Date | string
  }

  export type FeatureUsageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureName?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFeatureUsagesNestedInput
  }

  export type FeatureUsageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    featureName?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureUsageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureName?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureUsageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    featureName?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameSessionCreateInput = {
    id?: string
    game: string
    xpEarned: number
    level?: number | null
    score?: number | null
    playedAt?: Date | string
    user: UserCreateNestedOneWithoutGameSessionsInput
  }

  export type GameSessionUncheckedCreateInput = {
    id?: string
    userId: string
    game: string
    xpEarned: number
    level?: number | null
    score?: number | null
    playedAt?: Date | string
  }

  export type GameSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    game?: StringFieldUpdateOperationsInput | string
    xpEarned?: IntFieldUpdateOperationsInput | number
    level?: NullableIntFieldUpdateOperationsInput | number | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGameSessionsNestedInput
  }

  export type GameSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    game?: StringFieldUpdateOperationsInput | string
    xpEarned?: IntFieldUpdateOperationsInput | number
    level?: NullableIntFieldUpdateOperationsInput | number | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    game?: StringFieldUpdateOperationsInput | string
    xpEarned?: IntFieldUpdateOperationsInput | number
    level?: NullableIntFieldUpdateOperationsInput | number | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    game?: StringFieldUpdateOperationsInput | string
    xpEarned?: IntFieldUpdateOperationsInput | number
    level?: NullableIntFieldUpdateOperationsInput | number | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityLogCreateInput = {
    id?: string
    type: string
    details: string
    ipAddress: string
    timestamp?: Date | string
  }

  export type SecurityLogUncheckedCreateInput = {
    id?: string
    type: string
    details: string
    ipAddress: string
    timestamp?: Date | string
  }

  export type SecurityLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyCheckInCreateInput = {
    id?: string
    checkedAt?: Date | string
    didGamble: boolean
    feltLikeDepositing: boolean
    openedGamblingSite: boolean
    note?: string | null
    user: UserCreateNestedOneWithoutDailyCheckInsInput
  }

  export type DailyCheckInUncheckedCreateInput = {
    id?: string
    userId: string
    checkedAt?: Date | string
    didGamble: boolean
    feltLikeDepositing: boolean
    openedGamblingSite: boolean
    note?: string | null
  }

  export type DailyCheckInUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    didGamble?: BoolFieldUpdateOperationsInput | boolean
    feltLikeDepositing?: BoolFieldUpdateOperationsInput | boolean
    openedGamblingSite?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutDailyCheckInsNestedInput
  }

  export type DailyCheckInUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    didGamble?: BoolFieldUpdateOperationsInput | boolean
    feltLikeDepositing?: BoolFieldUpdateOperationsInput | boolean
    openedGamblingSite?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DailyCheckInUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    didGamble?: BoolFieldUpdateOperationsInput | boolean
    feltLikeDepositing?: BoolFieldUpdateOperationsInput | boolean
    openedGamblingSite?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DailyCheckInUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    didGamble?: BoolFieldUpdateOperationsInput | boolean
    feltLikeDepositing?: BoolFieldUpdateOperationsInput | boolean
    openedGamblingSite?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArticleCreateInput = {
    id?: string
    title: string
    content: string
    category?: string
    thumbnail?: string | null
    createdBy: string
    createdAt?: Date | string
    completions?: ArticleCompletionCreateNestedManyWithoutArticleInput
  }

  export type ArticleUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    category?: string
    thumbnail?: string | null
    createdBy: string
    createdAt?: Date | string
    completions?: ArticleCompletionUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completions?: ArticleCompletionUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completions?: ArticleCompletionUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCompletionCreateInput = {
    id?: string
    createdAt?: Date | string
    article: ArticleCreateNestedOneWithoutCompletionsInput
    user: UserCreateNestedOneWithoutCompletionsInput
  }

  export type ArticleCompletionUncheckedCreateInput = {
    id?: string
    userId: string
    articleId: string
    createdAt?: Date | string
  }

  export type ArticleCompletionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    article?: ArticleUpdateOneRequiredWithoutCompletionsNestedInput
    user?: UserUpdateOneRequiredWithoutCompletionsNestedInput
  }

  export type ArticleCompletionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    articleId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCompletionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCompletionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    articleId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingCreateInput = {
    key: string
    value: string
  }

  export type SystemSettingUncheckedCreateInput = {
    key: string
    value: string
  }

  export type SystemSettingUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type SystemSettingUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type SystemSettingUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type SystemSettingUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type GameThresholdCreateInput = {
    id?: string
    gameName: string
    minScore?: number
    xpReward?: number
    timeLimit?: number
    updatedAt?: Date | string
  }

  export type GameThresholdUncheckedCreateInput = {
    id?: string
    gameName: string
    minScore?: number
    xpReward?: number
    timeLimit?: number
    updatedAt?: Date | string
  }

  export type GameThresholdUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameName?: StringFieldUpdateOperationsInput | string
    minScore?: IntFieldUpdateOperationsInput | number
    xpReward?: IntFieldUpdateOperationsInput | number
    timeLimit?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameThresholdUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameName?: StringFieldUpdateOperationsInput | string
    minScore?: IntFieldUpdateOperationsInput | number
    xpReward?: IntFieldUpdateOperationsInput | number
    timeLimit?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameThresholdUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameName?: StringFieldUpdateOperationsInput | string
    minScore?: IntFieldUpdateOperationsInput | number
    xpReward?: IntFieldUpdateOperationsInput | number
    timeLimit?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameThresholdUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameName?: StringFieldUpdateOperationsInput | string
    minScore?: IntFieldUpdateOperationsInput | number
    xpReward?: IntFieldUpdateOperationsInput | number
    timeLimit?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LandingPageContentCreateInput = {
    id?: string
    heroTitle: string
    heroSub: string
    stats_users: string
    stats_rate: string
    updatedAt?: Date | string
  }

  export type LandingPageContentUncheckedCreateInput = {
    id?: string
    heroTitle: string
    heroSub: string
    stats_users: string
    stats_rate: string
    updatedAt?: Date | string
  }

  export type LandingPageContentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSub?: StringFieldUpdateOperationsInput | string
    stats_users?: StringFieldUpdateOperationsInput | string
    stats_rate?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LandingPageContentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSub?: StringFieldUpdateOperationsInput | string
    stats_users?: StringFieldUpdateOperationsInput | string
    stats_rate?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LandingPageContentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSub?: StringFieldUpdateOperationsInput | string
    stats_users?: StringFieldUpdateOperationsInput | string
    stats_rate?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LandingPageContentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSub?: StringFieldUpdateOperationsInput | string
    stats_users?: StringFieldUpdateOperationsInput | string
    stats_rate?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GamblingReportCreateInput = {
    id?: string
    siteName: string
    siteLink: string
    hasRegistered?: boolean
    remarks?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutGamblingReportsInput
  }

  export type GamblingReportUncheckedCreateInput = {
    id?: string
    userId?: string | null
    siteName: string
    siteLink: string
    hasRegistered?: boolean
    remarks?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GamblingReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteName?: StringFieldUpdateOperationsInput | string
    siteLink?: StringFieldUpdateOperationsInput | string
    hasRegistered?: BoolFieldUpdateOperationsInput | boolean
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutGamblingReportsNestedInput
  }

  export type GamblingReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    siteName?: StringFieldUpdateOperationsInput | string
    siteLink?: StringFieldUpdateOperationsInput | string
    hasRegistered?: BoolFieldUpdateOperationsInput | boolean
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GamblingReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteName?: StringFieldUpdateOperationsInput | string
    siteLink?: StringFieldUpdateOperationsInput | string
    hasRegistered?: BoolFieldUpdateOperationsInput | boolean
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GamblingReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    siteName?: StringFieldUpdateOperationsInput | string
    siteLink?: StringFieldUpdateOperationsInput | string
    hasRegistered?: BoolFieldUpdateOperationsInput | boolean
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AddictionTestListRelationFilter = {
    every?: AddictionTestWhereInput
    some?: AddictionTestWhereInput
    none?: AddictionTestWhereInput
  }

  export type ArticleCompletionListRelationFilter = {
    every?: ArticleCompletionWhereInput
    some?: ArticleCompletionWhereInput
    none?: ArticleCompletionWhereInput
  }

  export type ChallengeProgressListRelationFilter = {
    every?: ChallengeProgressWhereInput
    some?: ChallengeProgressWhereInput
    none?: ChallengeProgressWhereInput
  }

  export type DailyCheckInListRelationFilter = {
    every?: DailyCheckInWhereInput
    some?: DailyCheckInWhereInput
    none?: DailyCheckInWhereInput
  }

  export type FeatureUsageListRelationFilter = {
    every?: FeatureUsageWhereInput
    some?: FeatureUsageWhereInput
    none?: FeatureUsageWhereInput
  }

  export type GameSessionListRelationFilter = {
    every?: GameSessionWhereInput
    some?: GameSessionWhereInput
    none?: GameSessionWhereInput
  }

  export type UserAchievementListRelationFilter = {
    every?: UserAchievementWhereInput
    some?: UserAchievementWhereInput
    none?: UserAchievementWhereInput
  }

  export type GamblingReportListRelationFilter = {
    every?: GamblingReportWhereInput
    some?: GamblingReportWhereInput
    none?: GamblingReportWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AddictionTestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArticleCompletionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChallengeProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DailyCheckInOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FeatureUsageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserAchievementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GamblingReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    status?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    title?: SortOrder
    lastActivity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrder
    streak?: SortOrder
    longestStreak?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    xp?: SortOrder
    level?: SortOrder
    failedLoginAttempts?: SortOrder
    streak?: SortOrder
    longestStreak?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    status?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    title?: SortOrder
    lastActivity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrder
    streak?: SortOrder
    longestStreak?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    status?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    title?: SortOrder
    lastActivity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrder
    streak?: SortOrder
    longestStreak?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    xp?: SortOrder
    level?: SortOrder
    failedLoginAttempts?: SortOrder
    streak?: SortOrder
    longestStreak?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AchievementCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    title?: SortOrder
    description?: SortOrder
    mission?: SortOrder
    category?: SortOrder
    targetValue?: SortOrder
    iconName?: SortOrder
    rewardTitle?: SortOrder
    createdAt?: SortOrder
  }

  export type AchievementAvgOrderByAggregateInput = {
    targetValue?: SortOrder
  }

  export type AchievementMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    title?: SortOrder
    description?: SortOrder
    mission?: SortOrder
    category?: SortOrder
    targetValue?: SortOrder
    iconName?: SortOrder
    rewardTitle?: SortOrder
    createdAt?: SortOrder
  }

  export type AchievementMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    title?: SortOrder
    description?: SortOrder
    mission?: SortOrder
    category?: SortOrder
    targetValue?: SortOrder
    iconName?: SortOrder
    rewardTitle?: SortOrder
    createdAt?: SortOrder
  }

  export type AchievementSumOrderByAggregateInput = {
    targetValue?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AchievementRelationFilter = {
    is?: AchievementWhereInput
    isNot?: AchievementWhereInput
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserAchievementUserIdAchievementIdCompoundUniqueInput = {
    userId: string
    achievementId: string
  }

  export type UserAchievementCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    progress?: SortOrder
    isUnlocked?: SortOrder
    unlockedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAchievementAvgOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type UserAchievementMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    progress?: SortOrder
    isUnlocked?: SortOrder
    unlockedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAchievementMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    progress?: SortOrder
    isUnlocked?: SortOrder
    unlockedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAchievementSumOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AddictionTestCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    score?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type AddictionTestAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type AddictionTestMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    score?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type AddictionTestMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    score?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type AddictionTestSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type ChallengeProgressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dayCompleted?: SortOrder
    status?: SortOrder
    completedAt?: SortOrder
  }

  export type ChallengeProgressAvgOrderByAggregateInput = {
    dayCompleted?: SortOrder
  }

  export type ChallengeProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dayCompleted?: SortOrder
    status?: SortOrder
    completedAt?: SortOrder
  }

  export type ChallengeProgressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dayCompleted?: SortOrder
    status?: SortOrder
    completedAt?: SortOrder
  }

  export type ChallengeProgressSumOrderByAggregateInput = {
    dayCompleted?: SortOrder
  }

  export type FeatureUsageCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    featureName?: SortOrder
    usedAt?: SortOrder
  }

  export type FeatureUsageMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    featureName?: SortOrder
    usedAt?: SortOrder
  }

  export type FeatureUsageMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    featureName?: SortOrder
    usedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type GameSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    game?: SortOrder
    xpEarned?: SortOrder
    level?: SortOrder
    score?: SortOrder
    playedAt?: SortOrder
  }

  export type GameSessionAvgOrderByAggregateInput = {
    xpEarned?: SortOrder
    level?: SortOrder
    score?: SortOrder
  }

  export type GameSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    game?: SortOrder
    xpEarned?: SortOrder
    level?: SortOrder
    score?: SortOrder
    playedAt?: SortOrder
  }

  export type GameSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    game?: SortOrder
    xpEarned?: SortOrder
    level?: SortOrder
    score?: SortOrder
    playedAt?: SortOrder
  }

  export type GameSessionSumOrderByAggregateInput = {
    xpEarned?: SortOrder
    level?: SortOrder
    score?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SecurityLogCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    timestamp?: SortOrder
  }

  export type SecurityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    timestamp?: SortOrder
  }

  export type SecurityLogMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    timestamp?: SortOrder
  }

  export type DailyCheckInCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    checkedAt?: SortOrder
    didGamble?: SortOrder
    feltLikeDepositing?: SortOrder
    openedGamblingSite?: SortOrder
    note?: SortOrder
  }

  export type DailyCheckInMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    checkedAt?: SortOrder
    didGamble?: SortOrder
    feltLikeDepositing?: SortOrder
    openedGamblingSite?: SortOrder
    note?: SortOrder
  }

  export type DailyCheckInMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    checkedAt?: SortOrder
    didGamble?: SortOrder
    feltLikeDepositing?: SortOrder
    openedGamblingSite?: SortOrder
    note?: SortOrder
  }

  export type ArticleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    thumbnail?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type ArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    thumbnail?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type ArticleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    thumbnail?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type ArticleRelationFilter = {
    is?: ArticleWhereInput
    isNot?: ArticleWhereInput
  }

  export type ArticleCompletionUserIdArticleIdCompoundUniqueInput = {
    userId: string
    articleId: string
  }

  export type ArticleCompletionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    createdAt?: SortOrder
  }

  export type ArticleCompletionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    createdAt?: SortOrder
  }

  export type ArticleCompletionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    createdAt?: SortOrder
  }

  export type SystemSettingCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type SystemSettingMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type SystemSettingMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type GameThresholdCountOrderByAggregateInput = {
    id?: SortOrder
    gameName?: SortOrder
    minScore?: SortOrder
    xpReward?: SortOrder
    timeLimit?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameThresholdAvgOrderByAggregateInput = {
    minScore?: SortOrder
    xpReward?: SortOrder
    timeLimit?: SortOrder
  }

  export type GameThresholdMaxOrderByAggregateInput = {
    id?: SortOrder
    gameName?: SortOrder
    minScore?: SortOrder
    xpReward?: SortOrder
    timeLimit?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameThresholdMinOrderByAggregateInput = {
    id?: SortOrder
    gameName?: SortOrder
    minScore?: SortOrder
    xpReward?: SortOrder
    timeLimit?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameThresholdSumOrderByAggregateInput = {
    minScore?: SortOrder
    xpReward?: SortOrder
    timeLimit?: SortOrder
  }

  export type LandingPageContentCountOrderByAggregateInput = {
    id?: SortOrder
    heroTitle?: SortOrder
    heroSub?: SortOrder
    stats_users?: SortOrder
    stats_rate?: SortOrder
    updatedAt?: SortOrder
  }

  export type LandingPageContentMaxOrderByAggregateInput = {
    id?: SortOrder
    heroTitle?: SortOrder
    heroSub?: SortOrder
    stats_users?: SortOrder
    stats_rate?: SortOrder
    updatedAt?: SortOrder
  }

  export type LandingPageContentMinOrderByAggregateInput = {
    id?: SortOrder
    heroTitle?: SortOrder
    heroSub?: SortOrder
    stats_users?: SortOrder
    stats_rate?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type GamblingReportCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    siteName?: SortOrder
    siteLink?: SortOrder
    hasRegistered?: SortOrder
    remarks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GamblingReportMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    siteName?: SortOrder
    siteLink?: SortOrder
    hasRegistered?: SortOrder
    remarks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GamblingReportMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    siteName?: SortOrder
    siteLink?: SortOrder
    hasRegistered?: SortOrder
    remarks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AddictionTestCreateNestedManyWithoutUserInput = {
    create?: XOR<AddictionTestCreateWithoutUserInput, AddictionTestUncheckedCreateWithoutUserInput> | AddictionTestCreateWithoutUserInput[] | AddictionTestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddictionTestCreateOrConnectWithoutUserInput | AddictionTestCreateOrConnectWithoutUserInput[]
    connect?: AddictionTestWhereUniqueInput | AddictionTestWhereUniqueInput[]
  }

  export type ArticleCompletionCreateNestedManyWithoutUserInput = {
    create?: XOR<ArticleCompletionCreateWithoutUserInput, ArticleCompletionUncheckedCreateWithoutUserInput> | ArticleCompletionCreateWithoutUserInput[] | ArticleCompletionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleCompletionCreateOrConnectWithoutUserInput | ArticleCompletionCreateOrConnectWithoutUserInput[]
    connect?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
  }

  export type ChallengeProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<ChallengeProgressCreateWithoutUserInput, ChallengeProgressUncheckedCreateWithoutUserInput> | ChallengeProgressCreateWithoutUserInput[] | ChallengeProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChallengeProgressCreateOrConnectWithoutUserInput | ChallengeProgressCreateOrConnectWithoutUserInput[]
    connect?: ChallengeProgressWhereUniqueInput | ChallengeProgressWhereUniqueInput[]
  }

  export type DailyCheckInCreateNestedManyWithoutUserInput = {
    create?: XOR<DailyCheckInCreateWithoutUserInput, DailyCheckInUncheckedCreateWithoutUserInput> | DailyCheckInCreateWithoutUserInput[] | DailyCheckInUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DailyCheckInCreateOrConnectWithoutUserInput | DailyCheckInCreateOrConnectWithoutUserInput[]
    connect?: DailyCheckInWhereUniqueInput | DailyCheckInWhereUniqueInput[]
  }

  export type FeatureUsageCreateNestedManyWithoutUserInput = {
    create?: XOR<FeatureUsageCreateWithoutUserInput, FeatureUsageUncheckedCreateWithoutUserInput> | FeatureUsageCreateWithoutUserInput[] | FeatureUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeatureUsageCreateOrConnectWithoutUserInput | FeatureUsageCreateOrConnectWithoutUserInput[]
    connect?: FeatureUsageWhereUniqueInput | FeatureUsageWhereUniqueInput[]
  }

  export type GameSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<GameSessionCreateWithoutUserInput, GameSessionUncheckedCreateWithoutUserInput> | GameSessionCreateWithoutUserInput[] | GameSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GameSessionCreateOrConnectWithoutUserInput | GameSessionCreateOrConnectWithoutUserInput[]
    connect?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
  }

  export type UserAchievementCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput> | UserAchievementCreateWithoutUserInput[] | UserAchievementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutUserInput | UserAchievementCreateOrConnectWithoutUserInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
  }

  export type GamblingReportCreateNestedManyWithoutUserInput = {
    create?: XOR<GamblingReportCreateWithoutUserInput, GamblingReportUncheckedCreateWithoutUserInput> | GamblingReportCreateWithoutUserInput[] | GamblingReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GamblingReportCreateOrConnectWithoutUserInput | GamblingReportCreateOrConnectWithoutUserInput[]
    connect?: GamblingReportWhereUniqueInput | GamblingReportWhereUniqueInput[]
  }

  export type AddictionTestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AddictionTestCreateWithoutUserInput, AddictionTestUncheckedCreateWithoutUserInput> | AddictionTestCreateWithoutUserInput[] | AddictionTestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddictionTestCreateOrConnectWithoutUserInput | AddictionTestCreateOrConnectWithoutUserInput[]
    connect?: AddictionTestWhereUniqueInput | AddictionTestWhereUniqueInput[]
  }

  export type ArticleCompletionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ArticleCompletionCreateWithoutUserInput, ArticleCompletionUncheckedCreateWithoutUserInput> | ArticleCompletionCreateWithoutUserInput[] | ArticleCompletionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleCompletionCreateOrConnectWithoutUserInput | ArticleCompletionCreateOrConnectWithoutUserInput[]
    connect?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
  }

  export type ChallengeProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ChallengeProgressCreateWithoutUserInput, ChallengeProgressUncheckedCreateWithoutUserInput> | ChallengeProgressCreateWithoutUserInput[] | ChallengeProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChallengeProgressCreateOrConnectWithoutUserInput | ChallengeProgressCreateOrConnectWithoutUserInput[]
    connect?: ChallengeProgressWhereUniqueInput | ChallengeProgressWhereUniqueInput[]
  }

  export type DailyCheckInUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DailyCheckInCreateWithoutUserInput, DailyCheckInUncheckedCreateWithoutUserInput> | DailyCheckInCreateWithoutUserInput[] | DailyCheckInUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DailyCheckInCreateOrConnectWithoutUserInput | DailyCheckInCreateOrConnectWithoutUserInput[]
    connect?: DailyCheckInWhereUniqueInput | DailyCheckInWhereUniqueInput[]
  }

  export type FeatureUsageUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FeatureUsageCreateWithoutUserInput, FeatureUsageUncheckedCreateWithoutUserInput> | FeatureUsageCreateWithoutUserInput[] | FeatureUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeatureUsageCreateOrConnectWithoutUserInput | FeatureUsageCreateOrConnectWithoutUserInput[]
    connect?: FeatureUsageWhereUniqueInput | FeatureUsageWhereUniqueInput[]
  }

  export type GameSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GameSessionCreateWithoutUserInput, GameSessionUncheckedCreateWithoutUserInput> | GameSessionCreateWithoutUserInput[] | GameSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GameSessionCreateOrConnectWithoutUserInput | GameSessionCreateOrConnectWithoutUserInput[]
    connect?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
  }

  export type UserAchievementUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput> | UserAchievementCreateWithoutUserInput[] | UserAchievementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutUserInput | UserAchievementCreateOrConnectWithoutUserInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
  }

  export type GamblingReportUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GamblingReportCreateWithoutUserInput, GamblingReportUncheckedCreateWithoutUserInput> | GamblingReportCreateWithoutUserInput[] | GamblingReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GamblingReportCreateOrConnectWithoutUserInput | GamblingReportCreateOrConnectWithoutUserInput[]
    connect?: GamblingReportWhereUniqueInput | GamblingReportWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AddictionTestUpdateManyWithoutUserNestedInput = {
    create?: XOR<AddictionTestCreateWithoutUserInput, AddictionTestUncheckedCreateWithoutUserInput> | AddictionTestCreateWithoutUserInput[] | AddictionTestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddictionTestCreateOrConnectWithoutUserInput | AddictionTestCreateOrConnectWithoutUserInput[]
    upsert?: AddictionTestUpsertWithWhereUniqueWithoutUserInput | AddictionTestUpsertWithWhereUniqueWithoutUserInput[]
    set?: AddictionTestWhereUniqueInput | AddictionTestWhereUniqueInput[]
    disconnect?: AddictionTestWhereUniqueInput | AddictionTestWhereUniqueInput[]
    delete?: AddictionTestWhereUniqueInput | AddictionTestWhereUniqueInput[]
    connect?: AddictionTestWhereUniqueInput | AddictionTestWhereUniqueInput[]
    update?: AddictionTestUpdateWithWhereUniqueWithoutUserInput | AddictionTestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AddictionTestUpdateManyWithWhereWithoutUserInput | AddictionTestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AddictionTestScalarWhereInput | AddictionTestScalarWhereInput[]
  }

  export type ArticleCompletionUpdateManyWithoutUserNestedInput = {
    create?: XOR<ArticleCompletionCreateWithoutUserInput, ArticleCompletionUncheckedCreateWithoutUserInput> | ArticleCompletionCreateWithoutUserInput[] | ArticleCompletionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleCompletionCreateOrConnectWithoutUserInput | ArticleCompletionCreateOrConnectWithoutUserInput[]
    upsert?: ArticleCompletionUpsertWithWhereUniqueWithoutUserInput | ArticleCompletionUpsertWithWhereUniqueWithoutUserInput[]
    set?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
    disconnect?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
    delete?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
    connect?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
    update?: ArticleCompletionUpdateWithWhereUniqueWithoutUserInput | ArticleCompletionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ArticleCompletionUpdateManyWithWhereWithoutUserInput | ArticleCompletionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ArticleCompletionScalarWhereInput | ArticleCompletionScalarWhereInput[]
  }

  export type ChallengeProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChallengeProgressCreateWithoutUserInput, ChallengeProgressUncheckedCreateWithoutUserInput> | ChallengeProgressCreateWithoutUserInput[] | ChallengeProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChallengeProgressCreateOrConnectWithoutUserInput | ChallengeProgressCreateOrConnectWithoutUserInput[]
    upsert?: ChallengeProgressUpsertWithWhereUniqueWithoutUserInput | ChallengeProgressUpsertWithWhereUniqueWithoutUserInput[]
    set?: ChallengeProgressWhereUniqueInput | ChallengeProgressWhereUniqueInput[]
    disconnect?: ChallengeProgressWhereUniqueInput | ChallengeProgressWhereUniqueInput[]
    delete?: ChallengeProgressWhereUniqueInput | ChallengeProgressWhereUniqueInput[]
    connect?: ChallengeProgressWhereUniqueInput | ChallengeProgressWhereUniqueInput[]
    update?: ChallengeProgressUpdateWithWhereUniqueWithoutUserInput | ChallengeProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChallengeProgressUpdateManyWithWhereWithoutUserInput | ChallengeProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChallengeProgressScalarWhereInput | ChallengeProgressScalarWhereInput[]
  }

  export type DailyCheckInUpdateManyWithoutUserNestedInput = {
    create?: XOR<DailyCheckInCreateWithoutUserInput, DailyCheckInUncheckedCreateWithoutUserInput> | DailyCheckInCreateWithoutUserInput[] | DailyCheckInUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DailyCheckInCreateOrConnectWithoutUserInput | DailyCheckInCreateOrConnectWithoutUserInput[]
    upsert?: DailyCheckInUpsertWithWhereUniqueWithoutUserInput | DailyCheckInUpsertWithWhereUniqueWithoutUserInput[]
    set?: DailyCheckInWhereUniqueInput | DailyCheckInWhereUniqueInput[]
    disconnect?: DailyCheckInWhereUniqueInput | DailyCheckInWhereUniqueInput[]
    delete?: DailyCheckInWhereUniqueInput | DailyCheckInWhereUniqueInput[]
    connect?: DailyCheckInWhereUniqueInput | DailyCheckInWhereUniqueInput[]
    update?: DailyCheckInUpdateWithWhereUniqueWithoutUserInput | DailyCheckInUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DailyCheckInUpdateManyWithWhereWithoutUserInput | DailyCheckInUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DailyCheckInScalarWhereInput | DailyCheckInScalarWhereInput[]
  }

  export type FeatureUsageUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeatureUsageCreateWithoutUserInput, FeatureUsageUncheckedCreateWithoutUserInput> | FeatureUsageCreateWithoutUserInput[] | FeatureUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeatureUsageCreateOrConnectWithoutUserInput | FeatureUsageCreateOrConnectWithoutUserInput[]
    upsert?: FeatureUsageUpsertWithWhereUniqueWithoutUserInput | FeatureUsageUpsertWithWhereUniqueWithoutUserInput[]
    set?: FeatureUsageWhereUniqueInput | FeatureUsageWhereUniqueInput[]
    disconnect?: FeatureUsageWhereUniqueInput | FeatureUsageWhereUniqueInput[]
    delete?: FeatureUsageWhereUniqueInput | FeatureUsageWhereUniqueInput[]
    connect?: FeatureUsageWhereUniqueInput | FeatureUsageWhereUniqueInput[]
    update?: FeatureUsageUpdateWithWhereUniqueWithoutUserInput | FeatureUsageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeatureUsageUpdateManyWithWhereWithoutUserInput | FeatureUsageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeatureUsageScalarWhereInput | FeatureUsageScalarWhereInput[]
  }

  export type GameSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<GameSessionCreateWithoutUserInput, GameSessionUncheckedCreateWithoutUserInput> | GameSessionCreateWithoutUserInput[] | GameSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GameSessionCreateOrConnectWithoutUserInput | GameSessionCreateOrConnectWithoutUserInput[]
    upsert?: GameSessionUpsertWithWhereUniqueWithoutUserInput | GameSessionUpsertWithWhereUniqueWithoutUserInput[]
    set?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
    disconnect?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
    delete?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
    connect?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
    update?: GameSessionUpdateWithWhereUniqueWithoutUserInput | GameSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GameSessionUpdateManyWithWhereWithoutUserInput | GameSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GameSessionScalarWhereInput | GameSessionScalarWhereInput[]
  }

  export type UserAchievementUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput> | UserAchievementCreateWithoutUserInput[] | UserAchievementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutUserInput | UserAchievementCreateOrConnectWithoutUserInput[]
    upsert?: UserAchievementUpsertWithWhereUniqueWithoutUserInput | UserAchievementUpsertWithWhereUniqueWithoutUserInput[]
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    disconnect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    delete?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    update?: UserAchievementUpdateWithWhereUniqueWithoutUserInput | UserAchievementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAchievementUpdateManyWithWhereWithoutUserInput | UserAchievementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
  }

  export type GamblingReportUpdateManyWithoutUserNestedInput = {
    create?: XOR<GamblingReportCreateWithoutUserInput, GamblingReportUncheckedCreateWithoutUserInput> | GamblingReportCreateWithoutUserInput[] | GamblingReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GamblingReportCreateOrConnectWithoutUserInput | GamblingReportCreateOrConnectWithoutUserInput[]
    upsert?: GamblingReportUpsertWithWhereUniqueWithoutUserInput | GamblingReportUpsertWithWhereUniqueWithoutUserInput[]
    set?: GamblingReportWhereUniqueInput | GamblingReportWhereUniqueInput[]
    disconnect?: GamblingReportWhereUniqueInput | GamblingReportWhereUniqueInput[]
    delete?: GamblingReportWhereUniqueInput | GamblingReportWhereUniqueInput[]
    connect?: GamblingReportWhereUniqueInput | GamblingReportWhereUniqueInput[]
    update?: GamblingReportUpdateWithWhereUniqueWithoutUserInput | GamblingReportUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GamblingReportUpdateManyWithWhereWithoutUserInput | GamblingReportUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GamblingReportScalarWhereInput | GamblingReportScalarWhereInput[]
  }

  export type AddictionTestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AddictionTestCreateWithoutUserInput, AddictionTestUncheckedCreateWithoutUserInput> | AddictionTestCreateWithoutUserInput[] | AddictionTestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddictionTestCreateOrConnectWithoutUserInput | AddictionTestCreateOrConnectWithoutUserInput[]
    upsert?: AddictionTestUpsertWithWhereUniqueWithoutUserInput | AddictionTestUpsertWithWhereUniqueWithoutUserInput[]
    set?: AddictionTestWhereUniqueInput | AddictionTestWhereUniqueInput[]
    disconnect?: AddictionTestWhereUniqueInput | AddictionTestWhereUniqueInput[]
    delete?: AddictionTestWhereUniqueInput | AddictionTestWhereUniqueInput[]
    connect?: AddictionTestWhereUniqueInput | AddictionTestWhereUniqueInput[]
    update?: AddictionTestUpdateWithWhereUniqueWithoutUserInput | AddictionTestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AddictionTestUpdateManyWithWhereWithoutUserInput | AddictionTestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AddictionTestScalarWhereInput | AddictionTestScalarWhereInput[]
  }

  export type ArticleCompletionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ArticleCompletionCreateWithoutUserInput, ArticleCompletionUncheckedCreateWithoutUserInput> | ArticleCompletionCreateWithoutUserInput[] | ArticleCompletionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleCompletionCreateOrConnectWithoutUserInput | ArticleCompletionCreateOrConnectWithoutUserInput[]
    upsert?: ArticleCompletionUpsertWithWhereUniqueWithoutUserInput | ArticleCompletionUpsertWithWhereUniqueWithoutUserInput[]
    set?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
    disconnect?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
    delete?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
    connect?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
    update?: ArticleCompletionUpdateWithWhereUniqueWithoutUserInput | ArticleCompletionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ArticleCompletionUpdateManyWithWhereWithoutUserInput | ArticleCompletionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ArticleCompletionScalarWhereInput | ArticleCompletionScalarWhereInput[]
  }

  export type ChallengeProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChallengeProgressCreateWithoutUserInput, ChallengeProgressUncheckedCreateWithoutUserInput> | ChallengeProgressCreateWithoutUserInput[] | ChallengeProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChallengeProgressCreateOrConnectWithoutUserInput | ChallengeProgressCreateOrConnectWithoutUserInput[]
    upsert?: ChallengeProgressUpsertWithWhereUniqueWithoutUserInput | ChallengeProgressUpsertWithWhereUniqueWithoutUserInput[]
    set?: ChallengeProgressWhereUniqueInput | ChallengeProgressWhereUniqueInput[]
    disconnect?: ChallengeProgressWhereUniqueInput | ChallengeProgressWhereUniqueInput[]
    delete?: ChallengeProgressWhereUniqueInput | ChallengeProgressWhereUniqueInput[]
    connect?: ChallengeProgressWhereUniqueInput | ChallengeProgressWhereUniqueInput[]
    update?: ChallengeProgressUpdateWithWhereUniqueWithoutUserInput | ChallengeProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChallengeProgressUpdateManyWithWhereWithoutUserInput | ChallengeProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChallengeProgressScalarWhereInput | ChallengeProgressScalarWhereInput[]
  }

  export type DailyCheckInUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DailyCheckInCreateWithoutUserInput, DailyCheckInUncheckedCreateWithoutUserInput> | DailyCheckInCreateWithoutUserInput[] | DailyCheckInUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DailyCheckInCreateOrConnectWithoutUserInput | DailyCheckInCreateOrConnectWithoutUserInput[]
    upsert?: DailyCheckInUpsertWithWhereUniqueWithoutUserInput | DailyCheckInUpsertWithWhereUniqueWithoutUserInput[]
    set?: DailyCheckInWhereUniqueInput | DailyCheckInWhereUniqueInput[]
    disconnect?: DailyCheckInWhereUniqueInput | DailyCheckInWhereUniqueInput[]
    delete?: DailyCheckInWhereUniqueInput | DailyCheckInWhereUniqueInput[]
    connect?: DailyCheckInWhereUniqueInput | DailyCheckInWhereUniqueInput[]
    update?: DailyCheckInUpdateWithWhereUniqueWithoutUserInput | DailyCheckInUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DailyCheckInUpdateManyWithWhereWithoutUserInput | DailyCheckInUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DailyCheckInScalarWhereInput | DailyCheckInScalarWhereInput[]
  }

  export type FeatureUsageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeatureUsageCreateWithoutUserInput, FeatureUsageUncheckedCreateWithoutUserInput> | FeatureUsageCreateWithoutUserInput[] | FeatureUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeatureUsageCreateOrConnectWithoutUserInput | FeatureUsageCreateOrConnectWithoutUserInput[]
    upsert?: FeatureUsageUpsertWithWhereUniqueWithoutUserInput | FeatureUsageUpsertWithWhereUniqueWithoutUserInput[]
    set?: FeatureUsageWhereUniqueInput | FeatureUsageWhereUniqueInput[]
    disconnect?: FeatureUsageWhereUniqueInput | FeatureUsageWhereUniqueInput[]
    delete?: FeatureUsageWhereUniqueInput | FeatureUsageWhereUniqueInput[]
    connect?: FeatureUsageWhereUniqueInput | FeatureUsageWhereUniqueInput[]
    update?: FeatureUsageUpdateWithWhereUniqueWithoutUserInput | FeatureUsageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeatureUsageUpdateManyWithWhereWithoutUserInput | FeatureUsageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeatureUsageScalarWhereInput | FeatureUsageScalarWhereInput[]
  }

  export type GameSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GameSessionCreateWithoutUserInput, GameSessionUncheckedCreateWithoutUserInput> | GameSessionCreateWithoutUserInput[] | GameSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GameSessionCreateOrConnectWithoutUserInput | GameSessionCreateOrConnectWithoutUserInput[]
    upsert?: GameSessionUpsertWithWhereUniqueWithoutUserInput | GameSessionUpsertWithWhereUniqueWithoutUserInput[]
    set?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
    disconnect?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
    delete?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
    connect?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
    update?: GameSessionUpdateWithWhereUniqueWithoutUserInput | GameSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GameSessionUpdateManyWithWhereWithoutUserInput | GameSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GameSessionScalarWhereInput | GameSessionScalarWhereInput[]
  }

  export type UserAchievementUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput> | UserAchievementCreateWithoutUserInput[] | UserAchievementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutUserInput | UserAchievementCreateOrConnectWithoutUserInput[]
    upsert?: UserAchievementUpsertWithWhereUniqueWithoutUserInput | UserAchievementUpsertWithWhereUniqueWithoutUserInput[]
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    disconnect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    delete?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    update?: UserAchievementUpdateWithWhereUniqueWithoutUserInput | UserAchievementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAchievementUpdateManyWithWhereWithoutUserInput | UserAchievementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
  }

  export type GamblingReportUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GamblingReportCreateWithoutUserInput, GamblingReportUncheckedCreateWithoutUserInput> | GamblingReportCreateWithoutUserInput[] | GamblingReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GamblingReportCreateOrConnectWithoutUserInput | GamblingReportCreateOrConnectWithoutUserInput[]
    upsert?: GamblingReportUpsertWithWhereUniqueWithoutUserInput | GamblingReportUpsertWithWhereUniqueWithoutUserInput[]
    set?: GamblingReportWhereUniqueInput | GamblingReportWhereUniqueInput[]
    disconnect?: GamblingReportWhereUniqueInput | GamblingReportWhereUniqueInput[]
    delete?: GamblingReportWhereUniqueInput | GamblingReportWhereUniqueInput[]
    connect?: GamblingReportWhereUniqueInput | GamblingReportWhereUniqueInput[]
    update?: GamblingReportUpdateWithWhereUniqueWithoutUserInput | GamblingReportUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GamblingReportUpdateManyWithWhereWithoutUserInput | GamblingReportUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GamblingReportScalarWhereInput | GamblingReportScalarWhereInput[]
  }

  export type UserAchievementCreateNestedManyWithoutAchievementInput = {
    create?: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput> | UserAchievementCreateWithoutAchievementInput[] | UserAchievementUncheckedCreateWithoutAchievementInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutAchievementInput | UserAchievementCreateOrConnectWithoutAchievementInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
  }

  export type UserAchievementUncheckedCreateNestedManyWithoutAchievementInput = {
    create?: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput> | UserAchievementCreateWithoutAchievementInput[] | UserAchievementUncheckedCreateWithoutAchievementInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutAchievementInput | UserAchievementCreateOrConnectWithoutAchievementInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
  }

  export type UserAchievementUpdateManyWithoutAchievementNestedInput = {
    create?: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput> | UserAchievementCreateWithoutAchievementInput[] | UserAchievementUncheckedCreateWithoutAchievementInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutAchievementInput | UserAchievementCreateOrConnectWithoutAchievementInput[]
    upsert?: UserAchievementUpsertWithWhereUniqueWithoutAchievementInput | UserAchievementUpsertWithWhereUniqueWithoutAchievementInput[]
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    disconnect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    delete?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    update?: UserAchievementUpdateWithWhereUniqueWithoutAchievementInput | UserAchievementUpdateWithWhereUniqueWithoutAchievementInput[]
    updateMany?: UserAchievementUpdateManyWithWhereWithoutAchievementInput | UserAchievementUpdateManyWithWhereWithoutAchievementInput[]
    deleteMany?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
  }

  export type UserAchievementUncheckedUpdateManyWithoutAchievementNestedInput = {
    create?: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput> | UserAchievementCreateWithoutAchievementInput[] | UserAchievementUncheckedCreateWithoutAchievementInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutAchievementInput | UserAchievementCreateOrConnectWithoutAchievementInput[]
    upsert?: UserAchievementUpsertWithWhereUniqueWithoutAchievementInput | UserAchievementUpsertWithWhereUniqueWithoutAchievementInput[]
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    disconnect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    delete?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    update?: UserAchievementUpdateWithWhereUniqueWithoutAchievementInput | UserAchievementUpdateWithWhereUniqueWithoutAchievementInput[]
    updateMany?: UserAchievementUpdateManyWithWhereWithoutAchievementInput | UserAchievementUpdateManyWithWhereWithoutAchievementInput[]
    deleteMany?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
  }

  export type AchievementCreateNestedOneWithoutUserRelInput = {
    create?: XOR<AchievementCreateWithoutUserRelInput, AchievementUncheckedCreateWithoutUserRelInput>
    connectOrCreate?: AchievementCreateOrConnectWithoutUserRelInput
    connect?: AchievementWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAchievementsInput = {
    create?: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAchievementsInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type AchievementUpdateOneRequiredWithoutUserRelNestedInput = {
    create?: XOR<AchievementCreateWithoutUserRelInput, AchievementUncheckedCreateWithoutUserRelInput>
    connectOrCreate?: AchievementCreateOrConnectWithoutUserRelInput
    upsert?: AchievementUpsertWithoutUserRelInput
    connect?: AchievementWhereUniqueInput
    update?: XOR<XOR<AchievementUpdateToOneWithWhereWithoutUserRelInput, AchievementUpdateWithoutUserRelInput>, AchievementUncheckedUpdateWithoutUserRelInput>
  }

  export type UserUpdateOneRequiredWithoutAchievementsNestedInput = {
    create?: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAchievementsInput
    upsert?: UserUpsertWithoutAchievementsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAchievementsInput, UserUpdateWithoutAchievementsInput>, UserUncheckedUpdateWithoutAchievementsInput>
  }

  export type UserCreateNestedOneWithoutAddictionTestsInput = {
    create?: XOR<UserCreateWithoutAddictionTestsInput, UserUncheckedCreateWithoutAddictionTestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAddictionTestsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAddictionTestsNestedInput = {
    create?: XOR<UserCreateWithoutAddictionTestsInput, UserUncheckedCreateWithoutAddictionTestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAddictionTestsInput
    upsert?: UserUpsertWithoutAddictionTestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAddictionTestsInput, UserUpdateWithoutAddictionTestsInput>, UserUncheckedUpdateWithoutAddictionTestsInput>
  }

  export type UserCreateNestedOneWithoutChallengeProgressInput = {
    create?: XOR<UserCreateWithoutChallengeProgressInput, UserUncheckedCreateWithoutChallengeProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutChallengeProgressInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutChallengeProgressNestedInput = {
    create?: XOR<UserCreateWithoutChallengeProgressInput, UserUncheckedCreateWithoutChallengeProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutChallengeProgressInput
    upsert?: UserUpsertWithoutChallengeProgressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChallengeProgressInput, UserUpdateWithoutChallengeProgressInput>, UserUncheckedUpdateWithoutChallengeProgressInput>
  }

  export type UserCreateNestedOneWithoutFeatureUsagesInput = {
    create?: XOR<UserCreateWithoutFeatureUsagesInput, UserUncheckedCreateWithoutFeatureUsagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeatureUsagesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFeatureUsagesNestedInput = {
    create?: XOR<UserCreateWithoutFeatureUsagesInput, UserUncheckedCreateWithoutFeatureUsagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeatureUsagesInput
    upsert?: UserUpsertWithoutFeatureUsagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFeatureUsagesInput, UserUpdateWithoutFeatureUsagesInput>, UserUncheckedUpdateWithoutFeatureUsagesInput>
  }

  export type UserCreateNestedOneWithoutGameSessionsInput = {
    create?: XOR<UserCreateWithoutGameSessionsInput, UserUncheckedCreateWithoutGameSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGameSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutGameSessionsNestedInput = {
    create?: XOR<UserCreateWithoutGameSessionsInput, UserUncheckedCreateWithoutGameSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGameSessionsInput
    upsert?: UserUpsertWithoutGameSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGameSessionsInput, UserUpdateWithoutGameSessionsInput>, UserUncheckedUpdateWithoutGameSessionsInput>
  }

  export type UserCreateNestedOneWithoutDailyCheckInsInput = {
    create?: XOR<UserCreateWithoutDailyCheckInsInput, UserUncheckedCreateWithoutDailyCheckInsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDailyCheckInsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutDailyCheckInsNestedInput = {
    create?: XOR<UserCreateWithoutDailyCheckInsInput, UserUncheckedCreateWithoutDailyCheckInsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDailyCheckInsInput
    upsert?: UserUpsertWithoutDailyCheckInsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDailyCheckInsInput, UserUpdateWithoutDailyCheckInsInput>, UserUncheckedUpdateWithoutDailyCheckInsInput>
  }

  export type ArticleCompletionCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleCompletionCreateWithoutArticleInput, ArticleCompletionUncheckedCreateWithoutArticleInput> | ArticleCompletionCreateWithoutArticleInput[] | ArticleCompletionUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleCompletionCreateOrConnectWithoutArticleInput | ArticleCompletionCreateOrConnectWithoutArticleInput[]
    connect?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
  }

  export type ArticleCompletionUncheckedCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleCompletionCreateWithoutArticleInput, ArticleCompletionUncheckedCreateWithoutArticleInput> | ArticleCompletionCreateWithoutArticleInput[] | ArticleCompletionUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleCompletionCreateOrConnectWithoutArticleInput | ArticleCompletionCreateOrConnectWithoutArticleInput[]
    connect?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
  }

  export type ArticleCompletionUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleCompletionCreateWithoutArticleInput, ArticleCompletionUncheckedCreateWithoutArticleInput> | ArticleCompletionCreateWithoutArticleInput[] | ArticleCompletionUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleCompletionCreateOrConnectWithoutArticleInput | ArticleCompletionCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleCompletionUpsertWithWhereUniqueWithoutArticleInput | ArticleCompletionUpsertWithWhereUniqueWithoutArticleInput[]
    set?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
    disconnect?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
    delete?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
    connect?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
    update?: ArticleCompletionUpdateWithWhereUniqueWithoutArticleInput | ArticleCompletionUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleCompletionUpdateManyWithWhereWithoutArticleInput | ArticleCompletionUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleCompletionScalarWhereInput | ArticleCompletionScalarWhereInput[]
  }

  export type ArticleCompletionUncheckedUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleCompletionCreateWithoutArticleInput, ArticleCompletionUncheckedCreateWithoutArticleInput> | ArticleCompletionCreateWithoutArticleInput[] | ArticleCompletionUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleCompletionCreateOrConnectWithoutArticleInput | ArticleCompletionCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleCompletionUpsertWithWhereUniqueWithoutArticleInput | ArticleCompletionUpsertWithWhereUniqueWithoutArticleInput[]
    set?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
    disconnect?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
    delete?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
    connect?: ArticleCompletionWhereUniqueInput | ArticleCompletionWhereUniqueInput[]
    update?: ArticleCompletionUpdateWithWhereUniqueWithoutArticleInput | ArticleCompletionUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleCompletionUpdateManyWithWhereWithoutArticleInput | ArticleCompletionUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleCompletionScalarWhereInput | ArticleCompletionScalarWhereInput[]
  }

  export type ArticleCreateNestedOneWithoutCompletionsInput = {
    create?: XOR<ArticleCreateWithoutCompletionsInput, ArticleUncheckedCreateWithoutCompletionsInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutCompletionsInput
    connect?: ArticleWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCompletionsInput = {
    create?: XOR<UserCreateWithoutCompletionsInput, UserUncheckedCreateWithoutCompletionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCompletionsInput
    connect?: UserWhereUniqueInput
  }

  export type ArticleUpdateOneRequiredWithoutCompletionsNestedInput = {
    create?: XOR<ArticleCreateWithoutCompletionsInput, ArticleUncheckedCreateWithoutCompletionsInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutCompletionsInput
    upsert?: ArticleUpsertWithoutCompletionsInput
    connect?: ArticleWhereUniqueInput
    update?: XOR<XOR<ArticleUpdateToOneWithWhereWithoutCompletionsInput, ArticleUpdateWithoutCompletionsInput>, ArticleUncheckedUpdateWithoutCompletionsInput>
  }

  export type UserUpdateOneRequiredWithoutCompletionsNestedInput = {
    create?: XOR<UserCreateWithoutCompletionsInput, UserUncheckedCreateWithoutCompletionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCompletionsInput
    upsert?: UserUpsertWithoutCompletionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCompletionsInput, UserUpdateWithoutCompletionsInput>, UserUncheckedUpdateWithoutCompletionsInput>
  }

  export type UserCreateNestedOneWithoutGamblingReportsInput = {
    create?: XOR<UserCreateWithoutGamblingReportsInput, UserUncheckedCreateWithoutGamblingReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGamblingReportsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutGamblingReportsNestedInput = {
    create?: XOR<UserCreateWithoutGamblingReportsInput, UserUncheckedCreateWithoutGamblingReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGamblingReportsInput
    upsert?: UserUpsertWithoutGamblingReportsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGamblingReportsInput, UserUpdateWithoutGamblingReportsInput>, UserUncheckedUpdateWithoutGamblingReportsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type AddictionTestCreateWithoutUserInput = {
    id?: string
    score: number
    category: string
    createdAt?: Date | string
  }

  export type AddictionTestUncheckedCreateWithoutUserInput = {
    id?: string
    score: number
    category: string
    createdAt?: Date | string
  }

  export type AddictionTestCreateOrConnectWithoutUserInput = {
    where: AddictionTestWhereUniqueInput
    create: XOR<AddictionTestCreateWithoutUserInput, AddictionTestUncheckedCreateWithoutUserInput>
  }

  export type ArticleCompletionCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    article: ArticleCreateNestedOneWithoutCompletionsInput
  }

  export type ArticleCompletionUncheckedCreateWithoutUserInput = {
    id?: string
    articleId: string
    createdAt?: Date | string
  }

  export type ArticleCompletionCreateOrConnectWithoutUserInput = {
    where: ArticleCompletionWhereUniqueInput
    create: XOR<ArticleCompletionCreateWithoutUserInput, ArticleCompletionUncheckedCreateWithoutUserInput>
  }

  export type ChallengeProgressCreateWithoutUserInput = {
    id?: string
    dayCompleted: number
    status: string
    completedAt?: Date | string
  }

  export type ChallengeProgressUncheckedCreateWithoutUserInput = {
    id?: string
    dayCompleted: number
    status: string
    completedAt?: Date | string
  }

  export type ChallengeProgressCreateOrConnectWithoutUserInput = {
    where: ChallengeProgressWhereUniqueInput
    create: XOR<ChallengeProgressCreateWithoutUserInput, ChallengeProgressUncheckedCreateWithoutUserInput>
  }

  export type DailyCheckInCreateWithoutUserInput = {
    id?: string
    checkedAt?: Date | string
    didGamble: boolean
    feltLikeDepositing: boolean
    openedGamblingSite: boolean
    note?: string | null
  }

  export type DailyCheckInUncheckedCreateWithoutUserInput = {
    id?: string
    checkedAt?: Date | string
    didGamble: boolean
    feltLikeDepositing: boolean
    openedGamblingSite: boolean
    note?: string | null
  }

  export type DailyCheckInCreateOrConnectWithoutUserInput = {
    where: DailyCheckInWhereUniqueInput
    create: XOR<DailyCheckInCreateWithoutUserInput, DailyCheckInUncheckedCreateWithoutUserInput>
  }

  export type FeatureUsageCreateWithoutUserInput = {
    id?: string
    featureName: string
    usedAt?: Date | string
  }

  export type FeatureUsageUncheckedCreateWithoutUserInput = {
    id?: string
    featureName: string
    usedAt?: Date | string
  }

  export type FeatureUsageCreateOrConnectWithoutUserInput = {
    where: FeatureUsageWhereUniqueInput
    create: XOR<FeatureUsageCreateWithoutUserInput, FeatureUsageUncheckedCreateWithoutUserInput>
  }

  export type GameSessionCreateWithoutUserInput = {
    id?: string
    game: string
    xpEarned: number
    level?: number | null
    score?: number | null
    playedAt?: Date | string
  }

  export type GameSessionUncheckedCreateWithoutUserInput = {
    id?: string
    game: string
    xpEarned: number
    level?: number | null
    score?: number | null
    playedAt?: Date | string
  }

  export type GameSessionCreateOrConnectWithoutUserInput = {
    where: GameSessionWhereUniqueInput
    create: XOR<GameSessionCreateWithoutUserInput, GameSessionUncheckedCreateWithoutUserInput>
  }

  export type UserAchievementCreateWithoutUserInput = {
    id?: string
    progress?: number
    isUnlocked?: boolean
    unlockedAt?: Date | string | null
    updatedAt?: Date | string
    achievement: AchievementCreateNestedOneWithoutUserRelInput
  }

  export type UserAchievementUncheckedCreateWithoutUserInput = {
    id?: string
    achievementId: string
    progress?: number
    isUnlocked?: boolean
    unlockedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type UserAchievementCreateOrConnectWithoutUserInput = {
    where: UserAchievementWhereUniqueInput
    create: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput>
  }

  export type GamblingReportCreateWithoutUserInput = {
    id?: string
    siteName: string
    siteLink: string
    hasRegistered?: boolean
    remarks?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GamblingReportUncheckedCreateWithoutUserInput = {
    id?: string
    siteName: string
    siteLink: string
    hasRegistered?: boolean
    remarks?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GamblingReportCreateOrConnectWithoutUserInput = {
    where: GamblingReportWhereUniqueInput
    create: XOR<GamblingReportCreateWithoutUserInput, GamblingReportUncheckedCreateWithoutUserInput>
  }

  export type AddictionTestUpsertWithWhereUniqueWithoutUserInput = {
    where: AddictionTestWhereUniqueInput
    update: XOR<AddictionTestUpdateWithoutUserInput, AddictionTestUncheckedUpdateWithoutUserInput>
    create: XOR<AddictionTestCreateWithoutUserInput, AddictionTestUncheckedCreateWithoutUserInput>
  }

  export type AddictionTestUpdateWithWhereUniqueWithoutUserInput = {
    where: AddictionTestWhereUniqueInput
    data: XOR<AddictionTestUpdateWithoutUserInput, AddictionTestUncheckedUpdateWithoutUserInput>
  }

  export type AddictionTestUpdateManyWithWhereWithoutUserInput = {
    where: AddictionTestScalarWhereInput
    data: XOR<AddictionTestUpdateManyMutationInput, AddictionTestUncheckedUpdateManyWithoutUserInput>
  }

  export type AddictionTestScalarWhereInput = {
    AND?: AddictionTestScalarWhereInput | AddictionTestScalarWhereInput[]
    OR?: AddictionTestScalarWhereInput[]
    NOT?: AddictionTestScalarWhereInput | AddictionTestScalarWhereInput[]
    id?: StringFilter<"AddictionTest"> | string
    userId?: StringFilter<"AddictionTest"> | string
    score?: IntFilter<"AddictionTest"> | number
    category?: StringFilter<"AddictionTest"> | string
    createdAt?: DateTimeFilter<"AddictionTest"> | Date | string
  }

  export type ArticleCompletionUpsertWithWhereUniqueWithoutUserInput = {
    where: ArticleCompletionWhereUniqueInput
    update: XOR<ArticleCompletionUpdateWithoutUserInput, ArticleCompletionUncheckedUpdateWithoutUserInput>
    create: XOR<ArticleCompletionCreateWithoutUserInput, ArticleCompletionUncheckedCreateWithoutUserInput>
  }

  export type ArticleCompletionUpdateWithWhereUniqueWithoutUserInput = {
    where: ArticleCompletionWhereUniqueInput
    data: XOR<ArticleCompletionUpdateWithoutUserInput, ArticleCompletionUncheckedUpdateWithoutUserInput>
  }

  export type ArticleCompletionUpdateManyWithWhereWithoutUserInput = {
    where: ArticleCompletionScalarWhereInput
    data: XOR<ArticleCompletionUpdateManyMutationInput, ArticleCompletionUncheckedUpdateManyWithoutUserInput>
  }

  export type ArticleCompletionScalarWhereInput = {
    AND?: ArticleCompletionScalarWhereInput | ArticleCompletionScalarWhereInput[]
    OR?: ArticleCompletionScalarWhereInput[]
    NOT?: ArticleCompletionScalarWhereInput | ArticleCompletionScalarWhereInput[]
    id?: StringFilter<"ArticleCompletion"> | string
    userId?: StringFilter<"ArticleCompletion"> | string
    articleId?: StringFilter<"ArticleCompletion"> | string
    createdAt?: DateTimeFilter<"ArticleCompletion"> | Date | string
  }

  export type ChallengeProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: ChallengeProgressWhereUniqueInput
    update: XOR<ChallengeProgressUpdateWithoutUserInput, ChallengeProgressUncheckedUpdateWithoutUserInput>
    create: XOR<ChallengeProgressCreateWithoutUserInput, ChallengeProgressUncheckedCreateWithoutUserInput>
  }

  export type ChallengeProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: ChallengeProgressWhereUniqueInput
    data: XOR<ChallengeProgressUpdateWithoutUserInput, ChallengeProgressUncheckedUpdateWithoutUserInput>
  }

  export type ChallengeProgressUpdateManyWithWhereWithoutUserInput = {
    where: ChallengeProgressScalarWhereInput
    data: XOR<ChallengeProgressUpdateManyMutationInput, ChallengeProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type ChallengeProgressScalarWhereInput = {
    AND?: ChallengeProgressScalarWhereInput | ChallengeProgressScalarWhereInput[]
    OR?: ChallengeProgressScalarWhereInput[]
    NOT?: ChallengeProgressScalarWhereInput | ChallengeProgressScalarWhereInput[]
    id?: StringFilter<"ChallengeProgress"> | string
    userId?: StringFilter<"ChallengeProgress"> | string
    dayCompleted?: IntFilter<"ChallengeProgress"> | number
    status?: StringFilter<"ChallengeProgress"> | string
    completedAt?: DateTimeFilter<"ChallengeProgress"> | Date | string
  }

  export type DailyCheckInUpsertWithWhereUniqueWithoutUserInput = {
    where: DailyCheckInWhereUniqueInput
    update: XOR<DailyCheckInUpdateWithoutUserInput, DailyCheckInUncheckedUpdateWithoutUserInput>
    create: XOR<DailyCheckInCreateWithoutUserInput, DailyCheckInUncheckedCreateWithoutUserInput>
  }

  export type DailyCheckInUpdateWithWhereUniqueWithoutUserInput = {
    where: DailyCheckInWhereUniqueInput
    data: XOR<DailyCheckInUpdateWithoutUserInput, DailyCheckInUncheckedUpdateWithoutUserInput>
  }

  export type DailyCheckInUpdateManyWithWhereWithoutUserInput = {
    where: DailyCheckInScalarWhereInput
    data: XOR<DailyCheckInUpdateManyMutationInput, DailyCheckInUncheckedUpdateManyWithoutUserInput>
  }

  export type DailyCheckInScalarWhereInput = {
    AND?: DailyCheckInScalarWhereInput | DailyCheckInScalarWhereInput[]
    OR?: DailyCheckInScalarWhereInput[]
    NOT?: DailyCheckInScalarWhereInput | DailyCheckInScalarWhereInput[]
    id?: StringFilter<"DailyCheckIn"> | string
    userId?: StringFilter<"DailyCheckIn"> | string
    checkedAt?: DateTimeFilter<"DailyCheckIn"> | Date | string
    didGamble?: BoolFilter<"DailyCheckIn"> | boolean
    feltLikeDepositing?: BoolFilter<"DailyCheckIn"> | boolean
    openedGamblingSite?: BoolFilter<"DailyCheckIn"> | boolean
    note?: StringNullableFilter<"DailyCheckIn"> | string | null
  }

  export type FeatureUsageUpsertWithWhereUniqueWithoutUserInput = {
    where: FeatureUsageWhereUniqueInput
    update: XOR<FeatureUsageUpdateWithoutUserInput, FeatureUsageUncheckedUpdateWithoutUserInput>
    create: XOR<FeatureUsageCreateWithoutUserInput, FeatureUsageUncheckedCreateWithoutUserInput>
  }

  export type FeatureUsageUpdateWithWhereUniqueWithoutUserInput = {
    where: FeatureUsageWhereUniqueInput
    data: XOR<FeatureUsageUpdateWithoutUserInput, FeatureUsageUncheckedUpdateWithoutUserInput>
  }

  export type FeatureUsageUpdateManyWithWhereWithoutUserInput = {
    where: FeatureUsageScalarWhereInput
    data: XOR<FeatureUsageUpdateManyMutationInput, FeatureUsageUncheckedUpdateManyWithoutUserInput>
  }

  export type FeatureUsageScalarWhereInput = {
    AND?: FeatureUsageScalarWhereInput | FeatureUsageScalarWhereInput[]
    OR?: FeatureUsageScalarWhereInput[]
    NOT?: FeatureUsageScalarWhereInput | FeatureUsageScalarWhereInput[]
    id?: StringFilter<"FeatureUsage"> | string
    userId?: StringFilter<"FeatureUsage"> | string
    featureName?: StringFilter<"FeatureUsage"> | string
    usedAt?: DateTimeFilter<"FeatureUsage"> | Date | string
  }

  export type GameSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: GameSessionWhereUniqueInput
    update: XOR<GameSessionUpdateWithoutUserInput, GameSessionUncheckedUpdateWithoutUserInput>
    create: XOR<GameSessionCreateWithoutUserInput, GameSessionUncheckedCreateWithoutUserInput>
  }

  export type GameSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: GameSessionWhereUniqueInput
    data: XOR<GameSessionUpdateWithoutUserInput, GameSessionUncheckedUpdateWithoutUserInput>
  }

  export type GameSessionUpdateManyWithWhereWithoutUserInput = {
    where: GameSessionScalarWhereInput
    data: XOR<GameSessionUpdateManyMutationInput, GameSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type GameSessionScalarWhereInput = {
    AND?: GameSessionScalarWhereInput | GameSessionScalarWhereInput[]
    OR?: GameSessionScalarWhereInput[]
    NOT?: GameSessionScalarWhereInput | GameSessionScalarWhereInput[]
    id?: StringFilter<"GameSession"> | string
    userId?: StringFilter<"GameSession"> | string
    game?: StringFilter<"GameSession"> | string
    xpEarned?: IntFilter<"GameSession"> | number
    level?: IntNullableFilter<"GameSession"> | number | null
    score?: IntNullableFilter<"GameSession"> | number | null
    playedAt?: DateTimeFilter<"GameSession"> | Date | string
  }

  export type UserAchievementUpsertWithWhereUniqueWithoutUserInput = {
    where: UserAchievementWhereUniqueInput
    update: XOR<UserAchievementUpdateWithoutUserInput, UserAchievementUncheckedUpdateWithoutUserInput>
    create: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput>
  }

  export type UserAchievementUpdateWithWhereUniqueWithoutUserInput = {
    where: UserAchievementWhereUniqueInput
    data: XOR<UserAchievementUpdateWithoutUserInput, UserAchievementUncheckedUpdateWithoutUserInput>
  }

  export type UserAchievementUpdateManyWithWhereWithoutUserInput = {
    where: UserAchievementScalarWhereInput
    data: XOR<UserAchievementUpdateManyMutationInput, UserAchievementUncheckedUpdateManyWithoutUserInput>
  }

  export type UserAchievementScalarWhereInput = {
    AND?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
    OR?: UserAchievementScalarWhereInput[]
    NOT?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
    id?: StringFilter<"UserAchievement"> | string
    userId?: StringFilter<"UserAchievement"> | string
    achievementId?: StringFilter<"UserAchievement"> | string
    progress?: IntFilter<"UserAchievement"> | number
    isUnlocked?: BoolFilter<"UserAchievement"> | boolean
    unlockedAt?: DateTimeNullableFilter<"UserAchievement"> | Date | string | null
    updatedAt?: DateTimeFilter<"UserAchievement"> | Date | string
  }

  export type GamblingReportUpsertWithWhereUniqueWithoutUserInput = {
    where: GamblingReportWhereUniqueInput
    update: XOR<GamblingReportUpdateWithoutUserInput, GamblingReportUncheckedUpdateWithoutUserInput>
    create: XOR<GamblingReportCreateWithoutUserInput, GamblingReportUncheckedCreateWithoutUserInput>
  }

  export type GamblingReportUpdateWithWhereUniqueWithoutUserInput = {
    where: GamblingReportWhereUniqueInput
    data: XOR<GamblingReportUpdateWithoutUserInput, GamblingReportUncheckedUpdateWithoutUserInput>
  }

  export type GamblingReportUpdateManyWithWhereWithoutUserInput = {
    where: GamblingReportScalarWhereInput
    data: XOR<GamblingReportUpdateManyMutationInput, GamblingReportUncheckedUpdateManyWithoutUserInput>
  }

  export type GamblingReportScalarWhereInput = {
    AND?: GamblingReportScalarWhereInput | GamblingReportScalarWhereInput[]
    OR?: GamblingReportScalarWhereInput[]
    NOT?: GamblingReportScalarWhereInput | GamblingReportScalarWhereInput[]
    id?: StringFilter<"GamblingReport"> | string
    userId?: StringNullableFilter<"GamblingReport"> | string | null
    siteName?: StringFilter<"GamblingReport"> | string
    siteLink?: StringFilter<"GamblingReport"> | string
    hasRegistered?: BoolFilter<"GamblingReport"> | boolean
    remarks?: StringNullableFilter<"GamblingReport"> | string | null
    createdAt?: DateTimeFilter<"GamblingReport"> | Date | string
    updatedAt?: DateTimeFilter<"GamblingReport"> | Date | string
  }

  export type UserAchievementCreateWithoutAchievementInput = {
    id?: string
    progress?: number
    isUnlocked?: boolean
    unlockedAt?: Date | string | null
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAchievementsInput
  }

  export type UserAchievementUncheckedCreateWithoutAchievementInput = {
    id?: string
    userId: string
    progress?: number
    isUnlocked?: boolean
    unlockedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type UserAchievementCreateOrConnectWithoutAchievementInput = {
    where: UserAchievementWhereUniqueInput
    create: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput>
  }

  export type UserAchievementUpsertWithWhereUniqueWithoutAchievementInput = {
    where: UserAchievementWhereUniqueInput
    update: XOR<UserAchievementUpdateWithoutAchievementInput, UserAchievementUncheckedUpdateWithoutAchievementInput>
    create: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput>
  }

  export type UserAchievementUpdateWithWhereUniqueWithoutAchievementInput = {
    where: UserAchievementWhereUniqueInput
    data: XOR<UserAchievementUpdateWithoutAchievementInput, UserAchievementUncheckedUpdateWithoutAchievementInput>
  }

  export type UserAchievementUpdateManyWithWhereWithoutAchievementInput = {
    where: UserAchievementScalarWhereInput
    data: XOR<UserAchievementUpdateManyMutationInput, UserAchievementUncheckedUpdateManyWithoutAchievementInput>
  }

  export type AchievementCreateWithoutUserRelInput = {
    id?: string
    key: string
    title: string
    description: string
    mission: string
    category: string
    targetValue: number
    iconName: string
    rewardTitle?: string | null
    createdAt?: Date | string
  }

  export type AchievementUncheckedCreateWithoutUserRelInput = {
    id?: string
    key: string
    title: string
    description: string
    mission: string
    category: string
    targetValue: number
    iconName: string
    rewardTitle?: string | null
    createdAt?: Date | string
  }

  export type AchievementCreateOrConnectWithoutUserRelInput = {
    where: AchievementWhereUniqueInput
    create: XOR<AchievementCreateWithoutUserRelInput, AchievementUncheckedCreateWithoutUserRelInput>
  }

  export type UserCreateWithoutAchievementsInput = {
    id?: string
    username: string
    email: string
    password: string
    phone?: string | null
    role?: string
    status?: string
    xp?: number
    level?: number
    title?: string | null
    lastActivity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    streak?: number
    longestStreak?: number
    addictionTests?: AddictionTestCreateNestedManyWithoutUserInput
    completions?: ArticleCompletionCreateNestedManyWithoutUserInput
    challengeProgress?: ChallengeProgressCreateNestedManyWithoutUserInput
    dailyCheckIns?: DailyCheckInCreateNestedManyWithoutUserInput
    featureUsages?: FeatureUsageCreateNestedManyWithoutUserInput
    gameSessions?: GameSessionCreateNestedManyWithoutUserInput
    gamblingReports?: GamblingReportCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAchievementsInput = {
    id?: string
    username: string
    email: string
    password: string
    phone?: string | null
    role?: string
    status?: string
    xp?: number
    level?: number
    title?: string | null
    lastActivity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    streak?: number
    longestStreak?: number
    addictionTests?: AddictionTestUncheckedCreateNestedManyWithoutUserInput
    completions?: ArticleCompletionUncheckedCreateNestedManyWithoutUserInput
    challengeProgress?: ChallengeProgressUncheckedCreateNestedManyWithoutUserInput
    dailyCheckIns?: DailyCheckInUncheckedCreateNestedManyWithoutUserInput
    featureUsages?: FeatureUsageUncheckedCreateNestedManyWithoutUserInput
    gameSessions?: GameSessionUncheckedCreateNestedManyWithoutUserInput
    gamblingReports?: GamblingReportUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAchievementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
  }

  export type AchievementUpsertWithoutUserRelInput = {
    update: XOR<AchievementUpdateWithoutUserRelInput, AchievementUncheckedUpdateWithoutUserRelInput>
    create: XOR<AchievementCreateWithoutUserRelInput, AchievementUncheckedCreateWithoutUserRelInput>
    where?: AchievementWhereInput
  }

  export type AchievementUpdateToOneWithWhereWithoutUserRelInput = {
    where?: AchievementWhereInput
    data: XOR<AchievementUpdateWithoutUserRelInput, AchievementUncheckedUpdateWithoutUserRelInput>
  }

  export type AchievementUpdateWithoutUserRelInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mission?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetValue?: IntFieldUpdateOperationsInput | number
    iconName?: StringFieldUpdateOperationsInput | string
    rewardTitle?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementUncheckedUpdateWithoutUserRelInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mission?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    targetValue?: IntFieldUpdateOperationsInput | number
    iconName?: StringFieldUpdateOperationsInput | string
    rewardTitle?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutAchievementsInput = {
    update: XOR<UserUpdateWithoutAchievementsInput, UserUncheckedUpdateWithoutAchievementsInput>
    create: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAchievementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAchievementsInput, UserUncheckedUpdateWithoutAchievementsInput>
  }

  export type UserUpdateWithoutAchievementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    addictionTests?: AddictionTestUpdateManyWithoutUserNestedInput
    completions?: ArticleCompletionUpdateManyWithoutUserNestedInput
    challengeProgress?: ChallengeProgressUpdateManyWithoutUserNestedInput
    dailyCheckIns?: DailyCheckInUpdateManyWithoutUserNestedInput
    featureUsages?: FeatureUsageUpdateManyWithoutUserNestedInput
    gameSessions?: GameSessionUpdateManyWithoutUserNestedInput
    gamblingReports?: GamblingReportUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAchievementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    addictionTests?: AddictionTestUncheckedUpdateManyWithoutUserNestedInput
    completions?: ArticleCompletionUncheckedUpdateManyWithoutUserNestedInput
    challengeProgress?: ChallengeProgressUncheckedUpdateManyWithoutUserNestedInput
    dailyCheckIns?: DailyCheckInUncheckedUpdateManyWithoutUserNestedInput
    featureUsages?: FeatureUsageUncheckedUpdateManyWithoutUserNestedInput
    gameSessions?: GameSessionUncheckedUpdateManyWithoutUserNestedInput
    gamblingReports?: GamblingReportUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAddictionTestsInput = {
    id?: string
    username: string
    email: string
    password: string
    phone?: string | null
    role?: string
    status?: string
    xp?: number
    level?: number
    title?: string | null
    lastActivity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    streak?: number
    longestStreak?: number
    completions?: ArticleCompletionCreateNestedManyWithoutUserInput
    challengeProgress?: ChallengeProgressCreateNestedManyWithoutUserInput
    dailyCheckIns?: DailyCheckInCreateNestedManyWithoutUserInput
    featureUsages?: FeatureUsageCreateNestedManyWithoutUserInput
    gameSessions?: GameSessionCreateNestedManyWithoutUserInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
    gamblingReports?: GamblingReportCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAddictionTestsInput = {
    id?: string
    username: string
    email: string
    password: string
    phone?: string | null
    role?: string
    status?: string
    xp?: number
    level?: number
    title?: string | null
    lastActivity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    streak?: number
    longestStreak?: number
    completions?: ArticleCompletionUncheckedCreateNestedManyWithoutUserInput
    challengeProgress?: ChallengeProgressUncheckedCreateNestedManyWithoutUserInput
    dailyCheckIns?: DailyCheckInUncheckedCreateNestedManyWithoutUserInput
    featureUsages?: FeatureUsageUncheckedCreateNestedManyWithoutUserInput
    gameSessions?: GameSessionUncheckedCreateNestedManyWithoutUserInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    gamblingReports?: GamblingReportUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAddictionTestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAddictionTestsInput, UserUncheckedCreateWithoutAddictionTestsInput>
  }

  export type UserUpsertWithoutAddictionTestsInput = {
    update: XOR<UserUpdateWithoutAddictionTestsInput, UserUncheckedUpdateWithoutAddictionTestsInput>
    create: XOR<UserCreateWithoutAddictionTestsInput, UserUncheckedCreateWithoutAddictionTestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAddictionTestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAddictionTestsInput, UserUncheckedUpdateWithoutAddictionTestsInput>
  }

  export type UserUpdateWithoutAddictionTestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    completions?: ArticleCompletionUpdateManyWithoutUserNestedInput
    challengeProgress?: ChallengeProgressUpdateManyWithoutUserNestedInput
    dailyCheckIns?: DailyCheckInUpdateManyWithoutUserNestedInput
    featureUsages?: FeatureUsageUpdateManyWithoutUserNestedInput
    gameSessions?: GameSessionUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
    gamblingReports?: GamblingReportUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAddictionTestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    completions?: ArticleCompletionUncheckedUpdateManyWithoutUserNestedInput
    challengeProgress?: ChallengeProgressUncheckedUpdateManyWithoutUserNestedInput
    dailyCheckIns?: DailyCheckInUncheckedUpdateManyWithoutUserNestedInput
    featureUsages?: FeatureUsageUncheckedUpdateManyWithoutUserNestedInput
    gameSessions?: GameSessionUncheckedUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    gamblingReports?: GamblingReportUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutChallengeProgressInput = {
    id?: string
    username: string
    email: string
    password: string
    phone?: string | null
    role?: string
    status?: string
    xp?: number
    level?: number
    title?: string | null
    lastActivity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    streak?: number
    longestStreak?: number
    addictionTests?: AddictionTestCreateNestedManyWithoutUserInput
    completions?: ArticleCompletionCreateNestedManyWithoutUserInput
    dailyCheckIns?: DailyCheckInCreateNestedManyWithoutUserInput
    featureUsages?: FeatureUsageCreateNestedManyWithoutUserInput
    gameSessions?: GameSessionCreateNestedManyWithoutUserInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
    gamblingReports?: GamblingReportCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutChallengeProgressInput = {
    id?: string
    username: string
    email: string
    password: string
    phone?: string | null
    role?: string
    status?: string
    xp?: number
    level?: number
    title?: string | null
    lastActivity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    streak?: number
    longestStreak?: number
    addictionTests?: AddictionTestUncheckedCreateNestedManyWithoutUserInput
    completions?: ArticleCompletionUncheckedCreateNestedManyWithoutUserInput
    dailyCheckIns?: DailyCheckInUncheckedCreateNestedManyWithoutUserInput
    featureUsages?: FeatureUsageUncheckedCreateNestedManyWithoutUserInput
    gameSessions?: GameSessionUncheckedCreateNestedManyWithoutUserInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    gamblingReports?: GamblingReportUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutChallengeProgressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChallengeProgressInput, UserUncheckedCreateWithoutChallengeProgressInput>
  }

  export type UserUpsertWithoutChallengeProgressInput = {
    update: XOR<UserUpdateWithoutChallengeProgressInput, UserUncheckedUpdateWithoutChallengeProgressInput>
    create: XOR<UserCreateWithoutChallengeProgressInput, UserUncheckedCreateWithoutChallengeProgressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChallengeProgressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChallengeProgressInput, UserUncheckedUpdateWithoutChallengeProgressInput>
  }

  export type UserUpdateWithoutChallengeProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    addictionTests?: AddictionTestUpdateManyWithoutUserNestedInput
    completions?: ArticleCompletionUpdateManyWithoutUserNestedInput
    dailyCheckIns?: DailyCheckInUpdateManyWithoutUserNestedInput
    featureUsages?: FeatureUsageUpdateManyWithoutUserNestedInput
    gameSessions?: GameSessionUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
    gamblingReports?: GamblingReportUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutChallengeProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    addictionTests?: AddictionTestUncheckedUpdateManyWithoutUserNestedInput
    completions?: ArticleCompletionUncheckedUpdateManyWithoutUserNestedInput
    dailyCheckIns?: DailyCheckInUncheckedUpdateManyWithoutUserNestedInput
    featureUsages?: FeatureUsageUncheckedUpdateManyWithoutUserNestedInput
    gameSessions?: GameSessionUncheckedUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    gamblingReports?: GamblingReportUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutFeatureUsagesInput = {
    id?: string
    username: string
    email: string
    password: string
    phone?: string | null
    role?: string
    status?: string
    xp?: number
    level?: number
    title?: string | null
    lastActivity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    streak?: number
    longestStreak?: number
    addictionTests?: AddictionTestCreateNestedManyWithoutUserInput
    completions?: ArticleCompletionCreateNestedManyWithoutUserInput
    challengeProgress?: ChallengeProgressCreateNestedManyWithoutUserInput
    dailyCheckIns?: DailyCheckInCreateNestedManyWithoutUserInput
    gameSessions?: GameSessionCreateNestedManyWithoutUserInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
    gamblingReports?: GamblingReportCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFeatureUsagesInput = {
    id?: string
    username: string
    email: string
    password: string
    phone?: string | null
    role?: string
    status?: string
    xp?: number
    level?: number
    title?: string | null
    lastActivity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    streak?: number
    longestStreak?: number
    addictionTests?: AddictionTestUncheckedCreateNestedManyWithoutUserInput
    completions?: ArticleCompletionUncheckedCreateNestedManyWithoutUserInput
    challengeProgress?: ChallengeProgressUncheckedCreateNestedManyWithoutUserInput
    dailyCheckIns?: DailyCheckInUncheckedCreateNestedManyWithoutUserInput
    gameSessions?: GameSessionUncheckedCreateNestedManyWithoutUserInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    gamblingReports?: GamblingReportUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFeatureUsagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFeatureUsagesInput, UserUncheckedCreateWithoutFeatureUsagesInput>
  }

  export type UserUpsertWithoutFeatureUsagesInput = {
    update: XOR<UserUpdateWithoutFeatureUsagesInput, UserUncheckedUpdateWithoutFeatureUsagesInput>
    create: XOR<UserCreateWithoutFeatureUsagesInput, UserUncheckedCreateWithoutFeatureUsagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFeatureUsagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFeatureUsagesInput, UserUncheckedUpdateWithoutFeatureUsagesInput>
  }

  export type UserUpdateWithoutFeatureUsagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    addictionTests?: AddictionTestUpdateManyWithoutUserNestedInput
    completions?: ArticleCompletionUpdateManyWithoutUserNestedInput
    challengeProgress?: ChallengeProgressUpdateManyWithoutUserNestedInput
    dailyCheckIns?: DailyCheckInUpdateManyWithoutUserNestedInput
    gameSessions?: GameSessionUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
    gamblingReports?: GamblingReportUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFeatureUsagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    addictionTests?: AddictionTestUncheckedUpdateManyWithoutUserNestedInput
    completions?: ArticleCompletionUncheckedUpdateManyWithoutUserNestedInput
    challengeProgress?: ChallengeProgressUncheckedUpdateManyWithoutUserNestedInput
    dailyCheckIns?: DailyCheckInUncheckedUpdateManyWithoutUserNestedInput
    gameSessions?: GameSessionUncheckedUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    gamblingReports?: GamblingReportUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutGameSessionsInput = {
    id?: string
    username: string
    email: string
    password: string
    phone?: string | null
    role?: string
    status?: string
    xp?: number
    level?: number
    title?: string | null
    lastActivity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    streak?: number
    longestStreak?: number
    addictionTests?: AddictionTestCreateNestedManyWithoutUserInput
    completions?: ArticleCompletionCreateNestedManyWithoutUserInput
    challengeProgress?: ChallengeProgressCreateNestedManyWithoutUserInput
    dailyCheckIns?: DailyCheckInCreateNestedManyWithoutUserInput
    featureUsages?: FeatureUsageCreateNestedManyWithoutUserInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
    gamblingReports?: GamblingReportCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGameSessionsInput = {
    id?: string
    username: string
    email: string
    password: string
    phone?: string | null
    role?: string
    status?: string
    xp?: number
    level?: number
    title?: string | null
    lastActivity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    streak?: number
    longestStreak?: number
    addictionTests?: AddictionTestUncheckedCreateNestedManyWithoutUserInput
    completions?: ArticleCompletionUncheckedCreateNestedManyWithoutUserInput
    challengeProgress?: ChallengeProgressUncheckedCreateNestedManyWithoutUserInput
    dailyCheckIns?: DailyCheckInUncheckedCreateNestedManyWithoutUserInput
    featureUsages?: FeatureUsageUncheckedCreateNestedManyWithoutUserInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    gamblingReports?: GamblingReportUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGameSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGameSessionsInput, UserUncheckedCreateWithoutGameSessionsInput>
  }

  export type UserUpsertWithoutGameSessionsInput = {
    update: XOR<UserUpdateWithoutGameSessionsInput, UserUncheckedUpdateWithoutGameSessionsInput>
    create: XOR<UserCreateWithoutGameSessionsInput, UserUncheckedCreateWithoutGameSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGameSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGameSessionsInput, UserUncheckedUpdateWithoutGameSessionsInput>
  }

  export type UserUpdateWithoutGameSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    addictionTests?: AddictionTestUpdateManyWithoutUserNestedInput
    completions?: ArticleCompletionUpdateManyWithoutUserNestedInput
    challengeProgress?: ChallengeProgressUpdateManyWithoutUserNestedInput
    dailyCheckIns?: DailyCheckInUpdateManyWithoutUserNestedInput
    featureUsages?: FeatureUsageUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
    gamblingReports?: GamblingReportUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGameSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    addictionTests?: AddictionTestUncheckedUpdateManyWithoutUserNestedInput
    completions?: ArticleCompletionUncheckedUpdateManyWithoutUserNestedInput
    challengeProgress?: ChallengeProgressUncheckedUpdateManyWithoutUserNestedInput
    dailyCheckIns?: DailyCheckInUncheckedUpdateManyWithoutUserNestedInput
    featureUsages?: FeatureUsageUncheckedUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    gamblingReports?: GamblingReportUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutDailyCheckInsInput = {
    id?: string
    username: string
    email: string
    password: string
    phone?: string | null
    role?: string
    status?: string
    xp?: number
    level?: number
    title?: string | null
    lastActivity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    streak?: number
    longestStreak?: number
    addictionTests?: AddictionTestCreateNestedManyWithoutUserInput
    completions?: ArticleCompletionCreateNestedManyWithoutUserInput
    challengeProgress?: ChallengeProgressCreateNestedManyWithoutUserInput
    featureUsages?: FeatureUsageCreateNestedManyWithoutUserInput
    gameSessions?: GameSessionCreateNestedManyWithoutUserInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
    gamblingReports?: GamblingReportCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDailyCheckInsInput = {
    id?: string
    username: string
    email: string
    password: string
    phone?: string | null
    role?: string
    status?: string
    xp?: number
    level?: number
    title?: string | null
    lastActivity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    streak?: number
    longestStreak?: number
    addictionTests?: AddictionTestUncheckedCreateNestedManyWithoutUserInput
    completions?: ArticleCompletionUncheckedCreateNestedManyWithoutUserInput
    challengeProgress?: ChallengeProgressUncheckedCreateNestedManyWithoutUserInput
    featureUsages?: FeatureUsageUncheckedCreateNestedManyWithoutUserInput
    gameSessions?: GameSessionUncheckedCreateNestedManyWithoutUserInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    gamblingReports?: GamblingReportUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDailyCheckInsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDailyCheckInsInput, UserUncheckedCreateWithoutDailyCheckInsInput>
  }

  export type UserUpsertWithoutDailyCheckInsInput = {
    update: XOR<UserUpdateWithoutDailyCheckInsInput, UserUncheckedUpdateWithoutDailyCheckInsInput>
    create: XOR<UserCreateWithoutDailyCheckInsInput, UserUncheckedCreateWithoutDailyCheckInsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDailyCheckInsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDailyCheckInsInput, UserUncheckedUpdateWithoutDailyCheckInsInput>
  }

  export type UserUpdateWithoutDailyCheckInsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    addictionTests?: AddictionTestUpdateManyWithoutUserNestedInput
    completions?: ArticleCompletionUpdateManyWithoutUserNestedInput
    challengeProgress?: ChallengeProgressUpdateManyWithoutUserNestedInput
    featureUsages?: FeatureUsageUpdateManyWithoutUserNestedInput
    gameSessions?: GameSessionUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
    gamblingReports?: GamblingReportUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDailyCheckInsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    addictionTests?: AddictionTestUncheckedUpdateManyWithoutUserNestedInput
    completions?: ArticleCompletionUncheckedUpdateManyWithoutUserNestedInput
    challengeProgress?: ChallengeProgressUncheckedUpdateManyWithoutUserNestedInput
    featureUsages?: FeatureUsageUncheckedUpdateManyWithoutUserNestedInput
    gameSessions?: GameSessionUncheckedUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    gamblingReports?: GamblingReportUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ArticleCompletionCreateWithoutArticleInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCompletionsInput
  }

  export type ArticleCompletionUncheckedCreateWithoutArticleInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type ArticleCompletionCreateOrConnectWithoutArticleInput = {
    where: ArticleCompletionWhereUniqueInput
    create: XOR<ArticleCompletionCreateWithoutArticleInput, ArticleCompletionUncheckedCreateWithoutArticleInput>
  }

  export type ArticleCompletionUpsertWithWhereUniqueWithoutArticleInput = {
    where: ArticleCompletionWhereUniqueInput
    update: XOR<ArticleCompletionUpdateWithoutArticleInput, ArticleCompletionUncheckedUpdateWithoutArticleInput>
    create: XOR<ArticleCompletionCreateWithoutArticleInput, ArticleCompletionUncheckedCreateWithoutArticleInput>
  }

  export type ArticleCompletionUpdateWithWhereUniqueWithoutArticleInput = {
    where: ArticleCompletionWhereUniqueInput
    data: XOR<ArticleCompletionUpdateWithoutArticleInput, ArticleCompletionUncheckedUpdateWithoutArticleInput>
  }

  export type ArticleCompletionUpdateManyWithWhereWithoutArticleInput = {
    where: ArticleCompletionScalarWhereInput
    data: XOR<ArticleCompletionUpdateManyMutationInput, ArticleCompletionUncheckedUpdateManyWithoutArticleInput>
  }

  export type ArticleCreateWithoutCompletionsInput = {
    id?: string
    title: string
    content: string
    category?: string
    thumbnail?: string | null
    createdBy: string
    createdAt?: Date | string
  }

  export type ArticleUncheckedCreateWithoutCompletionsInput = {
    id?: string
    title: string
    content: string
    category?: string
    thumbnail?: string | null
    createdBy: string
    createdAt?: Date | string
  }

  export type ArticleCreateOrConnectWithoutCompletionsInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutCompletionsInput, ArticleUncheckedCreateWithoutCompletionsInput>
  }

  export type UserCreateWithoutCompletionsInput = {
    id?: string
    username: string
    email: string
    password: string
    phone?: string | null
    role?: string
    status?: string
    xp?: number
    level?: number
    title?: string | null
    lastActivity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    streak?: number
    longestStreak?: number
    addictionTests?: AddictionTestCreateNestedManyWithoutUserInput
    challengeProgress?: ChallengeProgressCreateNestedManyWithoutUserInput
    dailyCheckIns?: DailyCheckInCreateNestedManyWithoutUserInput
    featureUsages?: FeatureUsageCreateNestedManyWithoutUserInput
    gameSessions?: GameSessionCreateNestedManyWithoutUserInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
    gamblingReports?: GamblingReportCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCompletionsInput = {
    id?: string
    username: string
    email: string
    password: string
    phone?: string | null
    role?: string
    status?: string
    xp?: number
    level?: number
    title?: string | null
    lastActivity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    streak?: number
    longestStreak?: number
    addictionTests?: AddictionTestUncheckedCreateNestedManyWithoutUserInput
    challengeProgress?: ChallengeProgressUncheckedCreateNestedManyWithoutUserInput
    dailyCheckIns?: DailyCheckInUncheckedCreateNestedManyWithoutUserInput
    featureUsages?: FeatureUsageUncheckedCreateNestedManyWithoutUserInput
    gameSessions?: GameSessionUncheckedCreateNestedManyWithoutUserInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    gamblingReports?: GamblingReportUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCompletionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCompletionsInput, UserUncheckedCreateWithoutCompletionsInput>
  }

  export type ArticleUpsertWithoutCompletionsInput = {
    update: XOR<ArticleUpdateWithoutCompletionsInput, ArticleUncheckedUpdateWithoutCompletionsInput>
    create: XOR<ArticleCreateWithoutCompletionsInput, ArticleUncheckedCreateWithoutCompletionsInput>
    where?: ArticleWhereInput
  }

  export type ArticleUpdateToOneWithWhereWithoutCompletionsInput = {
    where?: ArticleWhereInput
    data: XOR<ArticleUpdateWithoutCompletionsInput, ArticleUncheckedUpdateWithoutCompletionsInput>
  }

  export type ArticleUpdateWithoutCompletionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUncheckedUpdateWithoutCompletionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutCompletionsInput = {
    update: XOR<UserUpdateWithoutCompletionsInput, UserUncheckedUpdateWithoutCompletionsInput>
    create: XOR<UserCreateWithoutCompletionsInput, UserUncheckedCreateWithoutCompletionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCompletionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCompletionsInput, UserUncheckedUpdateWithoutCompletionsInput>
  }

  export type UserUpdateWithoutCompletionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    addictionTests?: AddictionTestUpdateManyWithoutUserNestedInput
    challengeProgress?: ChallengeProgressUpdateManyWithoutUserNestedInput
    dailyCheckIns?: DailyCheckInUpdateManyWithoutUserNestedInput
    featureUsages?: FeatureUsageUpdateManyWithoutUserNestedInput
    gameSessions?: GameSessionUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
    gamblingReports?: GamblingReportUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCompletionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    addictionTests?: AddictionTestUncheckedUpdateManyWithoutUserNestedInput
    challengeProgress?: ChallengeProgressUncheckedUpdateManyWithoutUserNestedInput
    dailyCheckIns?: DailyCheckInUncheckedUpdateManyWithoutUserNestedInput
    featureUsages?: FeatureUsageUncheckedUpdateManyWithoutUserNestedInput
    gameSessions?: GameSessionUncheckedUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    gamblingReports?: GamblingReportUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutGamblingReportsInput = {
    id?: string
    username: string
    email: string
    password: string
    phone?: string | null
    role?: string
    status?: string
    xp?: number
    level?: number
    title?: string | null
    lastActivity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    streak?: number
    longestStreak?: number
    addictionTests?: AddictionTestCreateNestedManyWithoutUserInput
    completions?: ArticleCompletionCreateNestedManyWithoutUserInput
    challengeProgress?: ChallengeProgressCreateNestedManyWithoutUserInput
    dailyCheckIns?: DailyCheckInCreateNestedManyWithoutUserInput
    featureUsages?: FeatureUsageCreateNestedManyWithoutUserInput
    gameSessions?: GameSessionCreateNestedManyWithoutUserInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGamblingReportsInput = {
    id?: string
    username: string
    email: string
    password: string
    phone?: string | null
    role?: string
    status?: string
    xp?: number
    level?: number
    title?: string | null
    lastActivity?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    streak?: number
    longestStreak?: number
    addictionTests?: AddictionTestUncheckedCreateNestedManyWithoutUserInput
    completions?: ArticleCompletionUncheckedCreateNestedManyWithoutUserInput
    challengeProgress?: ChallengeProgressUncheckedCreateNestedManyWithoutUserInput
    dailyCheckIns?: DailyCheckInUncheckedCreateNestedManyWithoutUserInput
    featureUsages?: FeatureUsageUncheckedCreateNestedManyWithoutUserInput
    gameSessions?: GameSessionUncheckedCreateNestedManyWithoutUserInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGamblingReportsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGamblingReportsInput, UserUncheckedCreateWithoutGamblingReportsInput>
  }

  export type UserUpsertWithoutGamblingReportsInput = {
    update: XOR<UserUpdateWithoutGamblingReportsInput, UserUncheckedUpdateWithoutGamblingReportsInput>
    create: XOR<UserCreateWithoutGamblingReportsInput, UserUncheckedCreateWithoutGamblingReportsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGamblingReportsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGamblingReportsInput, UserUncheckedUpdateWithoutGamblingReportsInput>
  }

  export type UserUpdateWithoutGamblingReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    addictionTests?: AddictionTestUpdateManyWithoutUserNestedInput
    completions?: ArticleCompletionUpdateManyWithoutUserNestedInput
    challengeProgress?: ChallengeProgressUpdateManyWithoutUserNestedInput
    dailyCheckIns?: DailyCheckInUpdateManyWithoutUserNestedInput
    featureUsages?: FeatureUsageUpdateManyWithoutUserNestedInput
    gameSessions?: GameSessionUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGamblingReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    streak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    addictionTests?: AddictionTestUncheckedUpdateManyWithoutUserNestedInput
    completions?: ArticleCompletionUncheckedUpdateManyWithoutUserNestedInput
    challengeProgress?: ChallengeProgressUncheckedUpdateManyWithoutUserNestedInput
    dailyCheckIns?: DailyCheckInUncheckedUpdateManyWithoutUserNestedInput
    featureUsages?: FeatureUsageUncheckedUpdateManyWithoutUserNestedInput
    gameSessions?: GameSessionUncheckedUpdateManyWithoutUserNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AddictionTestUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddictionTestUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddictionTestUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCompletionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    article?: ArticleUpdateOneRequiredWithoutCompletionsNestedInput
  }

  export type ArticleCompletionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    articleId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCompletionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    articleId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChallengeProgressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayCompleted?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChallengeProgressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayCompleted?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChallengeProgressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayCompleted?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyCheckInUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    didGamble?: BoolFieldUpdateOperationsInput | boolean
    feltLikeDepositing?: BoolFieldUpdateOperationsInput | boolean
    openedGamblingSite?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DailyCheckInUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    didGamble?: BoolFieldUpdateOperationsInput | boolean
    feltLikeDepositing?: BoolFieldUpdateOperationsInput | boolean
    openedGamblingSite?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DailyCheckInUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    didGamble?: BoolFieldUpdateOperationsInput | boolean
    feltLikeDepositing?: BoolFieldUpdateOperationsInput | boolean
    openedGamblingSite?: BoolFieldUpdateOperationsInput | boolean
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FeatureUsageUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureName?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureUsageUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureName?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureUsageUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureName?: StringFieldUpdateOperationsInput | string
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    game?: StringFieldUpdateOperationsInput | string
    xpEarned?: IntFieldUpdateOperationsInput | number
    level?: NullableIntFieldUpdateOperationsInput | number | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    game?: StringFieldUpdateOperationsInput | string
    xpEarned?: IntFieldUpdateOperationsInput | number
    level?: NullableIntFieldUpdateOperationsInput | number | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    game?: StringFieldUpdateOperationsInput | string
    xpEarned?: IntFieldUpdateOperationsInput | number
    level?: NullableIntFieldUpdateOperationsInput | number | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    isUnlocked?: BoolFieldUpdateOperationsInput | boolean
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    achievement?: AchievementUpdateOneRequiredWithoutUserRelNestedInput
  }

  export type UserAchievementUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    achievementId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    isUnlocked?: BoolFieldUpdateOperationsInput | boolean
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    achievementId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    isUnlocked?: BoolFieldUpdateOperationsInput | boolean
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GamblingReportUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteName?: StringFieldUpdateOperationsInput | string
    siteLink?: StringFieldUpdateOperationsInput | string
    hasRegistered?: BoolFieldUpdateOperationsInput | boolean
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GamblingReportUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteName?: StringFieldUpdateOperationsInput | string
    siteLink?: StringFieldUpdateOperationsInput | string
    hasRegistered?: BoolFieldUpdateOperationsInput | boolean
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GamblingReportUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    siteName?: StringFieldUpdateOperationsInput | string
    siteLink?: StringFieldUpdateOperationsInput | string
    hasRegistered?: BoolFieldUpdateOperationsInput | boolean
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementUpdateWithoutAchievementInput = {
    id?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    isUnlocked?: BoolFieldUpdateOperationsInput | boolean
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAchievementsNestedInput
  }

  export type UserAchievementUncheckedUpdateWithoutAchievementInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    isUnlocked?: BoolFieldUpdateOperationsInput | boolean
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementUncheckedUpdateManyWithoutAchievementInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    isUnlocked?: BoolFieldUpdateOperationsInput | boolean
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCompletionUpdateWithoutArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCompletionsNestedInput
  }

  export type ArticleCompletionUncheckedUpdateWithoutArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCompletionUncheckedUpdateManyWithoutArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AchievementCountOutputTypeDefaultArgs instead
     */
    export type AchievementCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AchievementCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ArticleCountOutputTypeDefaultArgs instead
     */
    export type ArticleCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ArticleCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AchievementDefaultArgs instead
     */
    export type AchievementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AchievementDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserAchievementDefaultArgs instead
     */
    export type UserAchievementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserAchievementDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AddictionTestDefaultArgs instead
     */
    export type AddictionTestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AddictionTestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ChallengeProgressDefaultArgs instead
     */
    export type ChallengeProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ChallengeProgressDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FeatureUsageDefaultArgs instead
     */
    export type FeatureUsageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FeatureUsageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GameSessionDefaultArgs instead
     */
    export type GameSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GameSessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SecurityLogDefaultArgs instead
     */
    export type SecurityLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SecurityLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DailyCheckInDefaultArgs instead
     */
    export type DailyCheckInArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DailyCheckInDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ArticleDefaultArgs instead
     */
    export type ArticleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ArticleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ArticleCompletionDefaultArgs instead
     */
    export type ArticleCompletionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ArticleCompletionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SystemSettingDefaultArgs instead
     */
    export type SystemSettingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SystemSettingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GameThresholdDefaultArgs instead
     */
    export type GameThresholdArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GameThresholdDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LandingPageContentDefaultArgs instead
     */
    export type LandingPageContentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LandingPageContentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GamblingReportDefaultArgs instead
     */
    export type GamblingReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GamblingReportDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}