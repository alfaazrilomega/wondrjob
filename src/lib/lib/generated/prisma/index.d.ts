
/**
 * Client
**/

import * as runtime from "./runtime/library.js";
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
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model Society
 * 
 */
export type Society = $Result.DefaultSelection<Prisma.$SocietyPayload>
/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model AvailablePosition
 * 
 */
export type AvailablePosition = $Result.DefaultSelection<Prisma.$AvailablePositionPayload>
/**
 * Model Portofolio
 * 
 */
export type Portofolio = $Result.DefaultSelection<Prisma.$PortofolioPayload>
/**
 * Model PositionApplied
 * 
 */
export type PositionApplied = $Result.DefaultSelection<Prisma.$PositionAppliedPayload>
/**
 * Model JobEmbedding
 * 
 */
export type JobEmbedding = $Result.DefaultSelection<Prisma.$JobEmbeddingPayload>
/**
 * Model PortfolioEmbedding
 * 
 */
export type PortfolioEmbedding = $Result.DefaultSelection<Prisma.$PortfolioEmbeddingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  SOCIETY: 'SOCIETY',
  COMPANY: 'COMPANY',
  HRD: 'HRD'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const PositionStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
};

export type PositionStatus = (typeof PositionStatus)[keyof typeof PositionStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type PositionStatus = $Enums.PositionStatus

export const PositionStatus: typeof $Enums.PositionStatus

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
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.society`: Exposes CRUD operations for the **Society** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Societies
    * const societies = await prisma.society.findMany()
    * ```
    */
  get society(): Prisma.SocietyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.availablePosition`: Exposes CRUD operations for the **AvailablePosition** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AvailablePositions
    * const availablePositions = await prisma.availablePosition.findMany()
    * ```
    */
  get availablePosition(): Prisma.AvailablePositionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.portofolio`: Exposes CRUD operations for the **Portofolio** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Portofolios
    * const portofolios = await prisma.portofolio.findMany()
    * ```
    */
  get portofolio(): Prisma.PortofolioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.positionApplied`: Exposes CRUD operations for the **PositionApplied** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PositionApplieds
    * const positionApplieds = await prisma.positionApplied.findMany()
    * ```
    */
  get positionApplied(): Prisma.PositionAppliedDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobEmbedding`: Exposes CRUD operations for the **JobEmbedding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobEmbeddings
    * const jobEmbeddings = await prisma.jobEmbedding.findMany()
    * ```
    */
  get jobEmbedding(): Prisma.JobEmbeddingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.portfolioEmbedding`: Exposes CRUD operations for the **PortfolioEmbedding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PortfolioEmbeddings
    * const portfolioEmbeddings = await prisma.portfolioEmbedding.findMany()
    * ```
    */
  get portfolioEmbedding(): Prisma.PortfolioEmbeddingDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    Admin: 'Admin',
    Society: 'Society',
    Company: 'Company',
    AvailablePosition: 'AvailablePosition',
    Portofolio: 'Portofolio',
    PositionApplied: 'PositionApplied',
    JobEmbedding: 'JobEmbedding',
    PortfolioEmbedding: 'PortfolioEmbedding'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "admin" | "society" | "company" | "availablePosition" | "portofolio" | "positionApplied" | "jobEmbedding" | "portfolioEmbedding"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      Society: {
        payload: Prisma.$SocietyPayload<ExtArgs>
        fields: Prisma.SocietyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SocietyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SocietyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietyPayload>
          }
          findFirst: {
            args: Prisma.SocietyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SocietyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietyPayload>
          }
          findMany: {
            args: Prisma.SocietyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietyPayload>[]
          }
          create: {
            args: Prisma.SocietyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietyPayload>
          }
          createMany: {
            args: Prisma.SocietyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SocietyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietyPayload>[]
          }
          delete: {
            args: Prisma.SocietyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietyPayload>
          }
          update: {
            args: Prisma.SocietyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietyPayload>
          }
          deleteMany: {
            args: Prisma.SocietyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SocietyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SocietyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietyPayload>[]
          }
          upsert: {
            args: Prisma.SocietyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocietyPayload>
          }
          aggregate: {
            args: Prisma.SocietyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSociety>
          }
          groupBy: {
            args: Prisma.SocietyGroupByArgs<ExtArgs>
            result: $Utils.Optional<SocietyGroupByOutputType>[]
          }
          count: {
            args: Prisma.SocietyCountArgs<ExtArgs>
            result: $Utils.Optional<SocietyCountAggregateOutputType> | number
          }
        }
      }
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      AvailablePosition: {
        payload: Prisma.$AvailablePositionPayload<ExtArgs>
        fields: Prisma.AvailablePositionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AvailablePositionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePositionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AvailablePositionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePositionPayload>
          }
          findFirst: {
            args: Prisma.AvailablePositionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePositionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AvailablePositionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePositionPayload>
          }
          findMany: {
            args: Prisma.AvailablePositionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePositionPayload>[]
          }
          create: {
            args: Prisma.AvailablePositionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePositionPayload>
          }
          createMany: {
            args: Prisma.AvailablePositionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AvailablePositionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePositionPayload>[]
          }
          delete: {
            args: Prisma.AvailablePositionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePositionPayload>
          }
          update: {
            args: Prisma.AvailablePositionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePositionPayload>
          }
          deleteMany: {
            args: Prisma.AvailablePositionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AvailablePositionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AvailablePositionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePositionPayload>[]
          }
          upsert: {
            args: Prisma.AvailablePositionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePositionPayload>
          }
          aggregate: {
            args: Prisma.AvailablePositionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAvailablePosition>
          }
          groupBy: {
            args: Prisma.AvailablePositionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AvailablePositionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AvailablePositionCountArgs<ExtArgs>
            result: $Utils.Optional<AvailablePositionCountAggregateOutputType> | number
          }
        }
      }
      Portofolio: {
        payload: Prisma.$PortofolioPayload<ExtArgs>
        fields: Prisma.PortofolioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortofolioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortofolioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortofolioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortofolioPayload>
          }
          findFirst: {
            args: Prisma.PortofolioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortofolioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortofolioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortofolioPayload>
          }
          findMany: {
            args: Prisma.PortofolioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortofolioPayload>[]
          }
          create: {
            args: Prisma.PortofolioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortofolioPayload>
          }
          createMany: {
            args: Prisma.PortofolioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PortofolioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortofolioPayload>[]
          }
          delete: {
            args: Prisma.PortofolioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortofolioPayload>
          }
          update: {
            args: Prisma.PortofolioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortofolioPayload>
          }
          deleteMany: {
            args: Prisma.PortofolioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortofolioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PortofolioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortofolioPayload>[]
          }
          upsert: {
            args: Prisma.PortofolioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortofolioPayload>
          }
          aggregate: {
            args: Prisma.PortofolioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortofolio>
          }
          groupBy: {
            args: Prisma.PortofolioGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortofolioGroupByOutputType>[]
          }
          count: {
            args: Prisma.PortofolioCountArgs<ExtArgs>
            result: $Utils.Optional<PortofolioCountAggregateOutputType> | number
          }
        }
      }
      PositionApplied: {
        payload: Prisma.$PositionAppliedPayload<ExtArgs>
        fields: Prisma.PositionAppliedFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PositionAppliedFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionAppliedPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PositionAppliedFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionAppliedPayload>
          }
          findFirst: {
            args: Prisma.PositionAppliedFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionAppliedPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PositionAppliedFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionAppliedPayload>
          }
          findMany: {
            args: Prisma.PositionAppliedFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionAppliedPayload>[]
          }
          create: {
            args: Prisma.PositionAppliedCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionAppliedPayload>
          }
          createMany: {
            args: Prisma.PositionAppliedCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PositionAppliedCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionAppliedPayload>[]
          }
          delete: {
            args: Prisma.PositionAppliedDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionAppliedPayload>
          }
          update: {
            args: Prisma.PositionAppliedUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionAppliedPayload>
          }
          deleteMany: {
            args: Prisma.PositionAppliedDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PositionAppliedUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PositionAppliedUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionAppliedPayload>[]
          }
          upsert: {
            args: Prisma.PositionAppliedUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PositionAppliedPayload>
          }
          aggregate: {
            args: Prisma.PositionAppliedAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePositionApplied>
          }
          groupBy: {
            args: Prisma.PositionAppliedGroupByArgs<ExtArgs>
            result: $Utils.Optional<PositionAppliedGroupByOutputType>[]
          }
          count: {
            args: Prisma.PositionAppliedCountArgs<ExtArgs>
            result: $Utils.Optional<PositionAppliedCountAggregateOutputType> | number
          }
        }
      }
      JobEmbedding: {
        payload: Prisma.$JobEmbeddingPayload<ExtArgs>
        fields: Prisma.JobEmbeddingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobEmbeddingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEmbeddingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobEmbeddingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEmbeddingPayload>
          }
          findFirst: {
            args: Prisma.JobEmbeddingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEmbeddingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobEmbeddingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEmbeddingPayload>
          }
          findMany: {
            args: Prisma.JobEmbeddingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEmbeddingPayload>[]
          }
          create: {
            args: Prisma.JobEmbeddingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEmbeddingPayload>
          }
          createMany: {
            args: Prisma.JobEmbeddingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobEmbeddingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEmbeddingPayload>[]
          }
          delete: {
            args: Prisma.JobEmbeddingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEmbeddingPayload>
          }
          update: {
            args: Prisma.JobEmbeddingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEmbeddingPayload>
          }
          deleteMany: {
            args: Prisma.JobEmbeddingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobEmbeddingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobEmbeddingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEmbeddingPayload>[]
          }
          upsert: {
            args: Prisma.JobEmbeddingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobEmbeddingPayload>
          }
          aggregate: {
            args: Prisma.JobEmbeddingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobEmbedding>
          }
          groupBy: {
            args: Prisma.JobEmbeddingGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobEmbeddingGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobEmbeddingCountArgs<ExtArgs>
            result: $Utils.Optional<JobEmbeddingCountAggregateOutputType> | number
          }
        }
      }
      PortfolioEmbedding: {
        payload: Prisma.$PortfolioEmbeddingPayload<ExtArgs>
        fields: Prisma.PortfolioEmbeddingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortfolioEmbeddingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioEmbeddingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortfolioEmbeddingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioEmbeddingPayload>
          }
          findFirst: {
            args: Prisma.PortfolioEmbeddingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioEmbeddingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortfolioEmbeddingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioEmbeddingPayload>
          }
          findMany: {
            args: Prisma.PortfolioEmbeddingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioEmbeddingPayload>[]
          }
          create: {
            args: Prisma.PortfolioEmbeddingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioEmbeddingPayload>
          }
          createMany: {
            args: Prisma.PortfolioEmbeddingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PortfolioEmbeddingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioEmbeddingPayload>[]
          }
          delete: {
            args: Prisma.PortfolioEmbeddingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioEmbeddingPayload>
          }
          update: {
            args: Prisma.PortfolioEmbeddingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioEmbeddingPayload>
          }
          deleteMany: {
            args: Prisma.PortfolioEmbeddingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortfolioEmbeddingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PortfolioEmbeddingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioEmbeddingPayload>[]
          }
          upsert: {
            args: Prisma.PortfolioEmbeddingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioEmbeddingPayload>
          }
          aggregate: {
            args: Prisma.PortfolioEmbeddingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortfolioEmbedding>
          }
          groupBy: {
            args: Prisma.PortfolioEmbeddingGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortfolioEmbeddingGroupByOutputType>[]
          }
          count: {
            args: Prisma.PortfolioEmbeddingCountArgs<ExtArgs>
            result: $Utils.Optional<PortfolioEmbeddingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    admin?: AdminOmit
    society?: SocietyOmit
    company?: CompanyOmit
    availablePosition?: AvailablePositionOmit
    portofolio?: PortofolioOmit
    positionApplied?: PositionAppliedOmit
    jobEmbedding?: JobEmbeddingOmit
    portfolioEmbedding?: PortfolioEmbeddingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
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
    Admin: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Admin?: boolean | UserCountOutputTypeCountAdminArgs
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
  export type UserCountOutputTypeCountAdminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
  }


  /**
   * Count Type SocietyCountOutputType
   */

  export type SocietyCountOutputType = {
    portofolio: number
    applied_jobs: number
  }

  export type SocietyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portofolio?: boolean | SocietyCountOutputTypeCountPortofolioArgs
    applied_jobs?: boolean | SocietyCountOutputTypeCountApplied_jobsArgs
  }

  // Custom InputTypes
  /**
   * SocietyCountOutputType without action
   */
  export type SocietyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocietyCountOutputType
     */
    select?: SocietyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SocietyCountOutputType without action
   */
  export type SocietyCountOutputTypeCountPortofolioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortofolioWhereInput
  }

  /**
   * SocietyCountOutputType without action
   */
  export type SocietyCountOutputTypeCountApplied_jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionAppliedWhereInput
  }


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    jobs: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobs?: boolean | CompanyCountOutputTypeCountJobsArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvailablePositionWhereInput
  }


  /**
   * Count Type AvailablePositionCountOutputType
   */

  export type AvailablePositionCountOutputType = {
    applicants: number
  }

  export type AvailablePositionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applicants?: boolean | AvailablePositionCountOutputTypeCountApplicantsArgs
  }

  // Custom InputTypes
  /**
   * AvailablePositionCountOutputType without action
   */
  export type AvailablePositionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePositionCountOutputType
     */
    select?: AvailablePositionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AvailablePositionCountOutputType without action
   */
  export type AvailablePositionCountOutputTypeCountApplicantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionAppliedWhereInput
  }


  /**
   * Count Type PortofolioCountOutputType
   */

  export type PortofolioCountOutputType = {
    PortfolioEmbedding: number
  }

  export type PortofolioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    PortfolioEmbedding?: boolean | PortofolioCountOutputTypeCountPortfolioEmbeddingArgs
  }

  // Custom InputTypes
  /**
   * PortofolioCountOutputType without action
   */
  export type PortofolioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortofolioCountOutputType
     */
    select?: PortofolioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PortofolioCountOutputType without action
   */
  export type PortofolioCountOutputTypeCountPortfolioEmbeddingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioEmbeddingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    role: $Enums.UserRole | null
    phone: string | null
    address: string | null
    date_of_birth: Date | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    role: $Enums.UserRole | null
    phone: string | null
    address: string | null
    date_of_birth: Date | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    role: number
    phone: number
    address: number
    date_of_birth: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    role?: true
    phone?: true
    address?: true
    date_of_birth?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    role?: true
    phone?: true
    address?: true
    date_of_birth?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    role?: true
    phone?: true
    address?: true
    date_of_birth?: true
    createdAt?: true
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
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    role: $Enums.UserRole
    phone: string | null
    address: string | null
    date_of_birth: Date | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
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
    name?: boolean
    email?: boolean
    role?: boolean
    phone?: boolean
    address?: boolean
    date_of_birth?: boolean
    createdAt?: boolean
    society?: boolean | User$societyArgs<ExtArgs>
    company?: boolean | User$companyArgs<ExtArgs>
    Admin?: boolean | User$AdminArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    phone?: boolean
    address?: boolean
    date_of_birth?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    phone?: boolean
    address?: boolean
    date_of_birth?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    phone?: boolean
    address?: boolean
    date_of_birth?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "role" | "phone" | "address" | "date_of_birth" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    society?: boolean | User$societyArgs<ExtArgs>
    company?: boolean | User$companyArgs<ExtArgs>
    Admin?: boolean | User$AdminArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      society: Prisma.$SocietyPayload<ExtArgs> | null
      company: Prisma.$CompanyPayload<ExtArgs> | null
      Admin: Prisma.$AdminPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      role: $Enums.UserRole
      phone: string | null
      address: string | null
      date_of_birth: Date | null
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
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
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    society<T extends User$societyArgs<ExtArgs> = {}>(args?: Subset<T, User$societyArgs<ExtArgs>>): Prisma__SocietyClient<$Result.GetResult<Prisma.$SocietyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    company<T extends User$companyArgs<ExtArgs> = {}>(args?: Subset<T, User$companyArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    Admin<T extends User$AdminArgs<ExtArgs> = {}>(args?: Subset<T, User$AdminArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly phone: FieldRef<"User", 'String'>
    readonly address: FieldRef<"User", 'String'>
    readonly date_of_birth: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.society
   */
  export type User$societyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Society
     */
    select?: SocietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Society
     */
    omit?: SocietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocietyInclude<ExtArgs> | null
    where?: SocietyWhereInput
  }

  /**
   * User.company
   */
  export type User$companyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    where?: CompanyWhereInput
  }

  /**
   * User.Admin
   */
  export type User$AdminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    cursor?: AdminWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminAvgAggregateOutputType = {
    id: number | null
  }

  export type AdminSumAggregateOutputType = {
    id: number | null
  }

  export type AdminMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    phone: string | null
    address: string | null
    date_of_birth: Date | null
    user_id: string | null
  }

  export type AdminMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    phone: string | null
    address: string | null
    date_of_birth: Date | null
    user_id: string | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    phone: number
    address: number
    date_of_birth: number
    user_id: number
    _all: number
  }


  export type AdminAvgAggregateInputType = {
    id?: true
  }

  export type AdminSumAggregateInputType = {
    id?: true
  }

  export type AdminMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    phone?: true
    address?: true
    date_of_birth?: true
    user_id?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    phone?: true
    address?: true
    date_of_birth?: true
    user_id?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    phone?: true
    address?: true
    date_of_birth?: true
    user_id?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _avg?: AdminAvgAggregateInputType
    _sum?: AdminSumAggregateInputType
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: number
    name: string
    email: string
    password: string
    phone: string | null
    address: string | null
    date_of_birth: Date | null
    user_id: string
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    address?: boolean
    date_of_birth?: boolean
    user_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    address?: boolean
    date_of_birth?: boolean
    user_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    address?: boolean
    date_of_birth?: boolean
    user_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    address?: boolean
    date_of_birth?: boolean
    user_id?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "phone" | "address" | "date_of_birth" | "user_id", ExtArgs["result"]["admin"]>
  export type AdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AdminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AdminIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      password: string
      phone: string | null
      address: string | null
      date_of_birth: Date | null
      user_id: string
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {AdminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
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
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'Int'>
    readonly name: FieldRef<"Admin", 'String'>
    readonly email: FieldRef<"Admin", 'String'>
    readonly password: FieldRef<"Admin", 'String'>
    readonly phone: FieldRef<"Admin", 'String'>
    readonly address: FieldRef<"Admin", 'String'>
    readonly date_of_birth: FieldRef<"Admin", 'DateTime'>
    readonly user_id: FieldRef<"Admin", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin updateManyAndReturn
   */
  export type AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
  }


  /**
   * Model Society
   */

  export type AggregateSociety = {
    _count: SocietyCountAggregateOutputType | null
    _avg: SocietyAvgAggregateOutputType | null
    _sum: SocietySumAggregateOutputType | null
    _min: SocietyMinAggregateOutputType | null
    _max: SocietyMaxAggregateOutputType | null
  }

  export type SocietyAvgAggregateOutputType = {
    id: number | null
  }

  export type SocietySumAggregateOutputType = {
    id: number | null
  }

  export type SocietyMinAggregateOutputType = {
    id: number | null
    name: string | null
    address: string | null
    phone: string | null
    date_of_birth: Date | null
    gender: string | null
    user_id: string | null
  }

  export type SocietyMaxAggregateOutputType = {
    id: number | null
    name: string | null
    address: string | null
    phone: string | null
    date_of_birth: Date | null
    gender: string | null
    user_id: string | null
  }

  export type SocietyCountAggregateOutputType = {
    id: number
    name: number
    address: number
    phone: number
    date_of_birth: number
    gender: number
    user_id: number
    _all: number
  }


  export type SocietyAvgAggregateInputType = {
    id?: true
  }

  export type SocietySumAggregateInputType = {
    id?: true
  }

  export type SocietyMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    date_of_birth?: true
    gender?: true
    user_id?: true
  }

  export type SocietyMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    date_of_birth?: true
    gender?: true
    user_id?: true
  }

  export type SocietyCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    date_of_birth?: true
    gender?: true
    user_id?: true
    _all?: true
  }

  export type SocietyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Society to aggregate.
     */
    where?: SocietyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Societies to fetch.
     */
    orderBy?: SocietyOrderByWithRelationInput | SocietyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SocietyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Societies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Societies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Societies
    **/
    _count?: true | SocietyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SocietyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SocietySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SocietyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SocietyMaxAggregateInputType
  }

  export type GetSocietyAggregateType<T extends SocietyAggregateArgs> = {
        [P in keyof T & keyof AggregateSociety]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSociety[P]>
      : GetScalarType<T[P], AggregateSociety[P]>
  }




  export type SocietyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SocietyWhereInput
    orderBy?: SocietyOrderByWithAggregationInput | SocietyOrderByWithAggregationInput[]
    by: SocietyScalarFieldEnum[] | SocietyScalarFieldEnum
    having?: SocietyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SocietyCountAggregateInputType | true
    _avg?: SocietyAvgAggregateInputType
    _sum?: SocietySumAggregateInputType
    _min?: SocietyMinAggregateInputType
    _max?: SocietyMaxAggregateInputType
  }

  export type SocietyGroupByOutputType = {
    id: number
    name: string
    address: string
    phone: string
    date_of_birth: Date
    gender: string
    user_id: string
    _count: SocietyCountAggregateOutputType | null
    _avg: SocietyAvgAggregateOutputType | null
    _sum: SocietySumAggregateOutputType | null
    _min: SocietyMinAggregateOutputType | null
    _max: SocietyMaxAggregateOutputType | null
  }

  type GetSocietyGroupByPayload<T extends SocietyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SocietyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SocietyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SocietyGroupByOutputType[P]>
            : GetScalarType<T[P], SocietyGroupByOutputType[P]>
        }
      >
    >


  export type SocietySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    date_of_birth?: boolean
    gender?: boolean
    user_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    portofolio?: boolean | Society$portofolioArgs<ExtArgs>
    applied_jobs?: boolean | Society$applied_jobsArgs<ExtArgs>
    _count?: boolean | SocietyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["society"]>

  export type SocietySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    date_of_birth?: boolean
    gender?: boolean
    user_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["society"]>

  export type SocietySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    date_of_birth?: boolean
    gender?: boolean
    user_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["society"]>

  export type SocietySelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    date_of_birth?: boolean
    gender?: boolean
    user_id?: boolean
  }

  export type SocietyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "phone" | "date_of_birth" | "gender" | "user_id", ExtArgs["result"]["society"]>
  export type SocietyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    portofolio?: boolean | Society$portofolioArgs<ExtArgs>
    applied_jobs?: boolean | Society$applied_jobsArgs<ExtArgs>
    _count?: boolean | SocietyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SocietyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SocietyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SocietyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Society"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      portofolio: Prisma.$PortofolioPayload<ExtArgs>[]
      applied_jobs: Prisma.$PositionAppliedPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      address: string
      phone: string
      date_of_birth: Date
      gender: string
      user_id: string
    }, ExtArgs["result"]["society"]>
    composites: {}
  }

  type SocietyGetPayload<S extends boolean | null | undefined | SocietyDefaultArgs> = $Result.GetResult<Prisma.$SocietyPayload, S>

  type SocietyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SocietyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SocietyCountAggregateInputType | true
    }

  export interface SocietyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Society'], meta: { name: 'Society' } }
    /**
     * Find zero or one Society that matches the filter.
     * @param {SocietyFindUniqueArgs} args - Arguments to find a Society
     * @example
     * // Get one Society
     * const society = await prisma.society.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SocietyFindUniqueArgs>(args: SelectSubset<T, SocietyFindUniqueArgs<ExtArgs>>): Prisma__SocietyClient<$Result.GetResult<Prisma.$SocietyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Society that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SocietyFindUniqueOrThrowArgs} args - Arguments to find a Society
     * @example
     * // Get one Society
     * const society = await prisma.society.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SocietyFindUniqueOrThrowArgs>(args: SelectSubset<T, SocietyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SocietyClient<$Result.GetResult<Prisma.$SocietyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Society that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocietyFindFirstArgs} args - Arguments to find a Society
     * @example
     * // Get one Society
     * const society = await prisma.society.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SocietyFindFirstArgs>(args?: SelectSubset<T, SocietyFindFirstArgs<ExtArgs>>): Prisma__SocietyClient<$Result.GetResult<Prisma.$SocietyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Society that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocietyFindFirstOrThrowArgs} args - Arguments to find a Society
     * @example
     * // Get one Society
     * const society = await prisma.society.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SocietyFindFirstOrThrowArgs>(args?: SelectSubset<T, SocietyFindFirstOrThrowArgs<ExtArgs>>): Prisma__SocietyClient<$Result.GetResult<Prisma.$SocietyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Societies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocietyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Societies
     * const societies = await prisma.society.findMany()
     * 
     * // Get first 10 Societies
     * const societies = await prisma.society.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const societyWithIdOnly = await prisma.society.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SocietyFindManyArgs>(args?: SelectSubset<T, SocietyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocietyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Society.
     * @param {SocietyCreateArgs} args - Arguments to create a Society.
     * @example
     * // Create one Society
     * const Society = await prisma.society.create({
     *   data: {
     *     // ... data to create a Society
     *   }
     * })
     * 
     */
    create<T extends SocietyCreateArgs>(args: SelectSubset<T, SocietyCreateArgs<ExtArgs>>): Prisma__SocietyClient<$Result.GetResult<Prisma.$SocietyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Societies.
     * @param {SocietyCreateManyArgs} args - Arguments to create many Societies.
     * @example
     * // Create many Societies
     * const society = await prisma.society.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SocietyCreateManyArgs>(args?: SelectSubset<T, SocietyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Societies and returns the data saved in the database.
     * @param {SocietyCreateManyAndReturnArgs} args - Arguments to create many Societies.
     * @example
     * // Create many Societies
     * const society = await prisma.society.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Societies and only return the `id`
     * const societyWithIdOnly = await prisma.society.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SocietyCreateManyAndReturnArgs>(args?: SelectSubset<T, SocietyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocietyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Society.
     * @param {SocietyDeleteArgs} args - Arguments to delete one Society.
     * @example
     * // Delete one Society
     * const Society = await prisma.society.delete({
     *   where: {
     *     // ... filter to delete one Society
     *   }
     * })
     * 
     */
    delete<T extends SocietyDeleteArgs>(args: SelectSubset<T, SocietyDeleteArgs<ExtArgs>>): Prisma__SocietyClient<$Result.GetResult<Prisma.$SocietyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Society.
     * @param {SocietyUpdateArgs} args - Arguments to update one Society.
     * @example
     * // Update one Society
     * const society = await prisma.society.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SocietyUpdateArgs>(args: SelectSubset<T, SocietyUpdateArgs<ExtArgs>>): Prisma__SocietyClient<$Result.GetResult<Prisma.$SocietyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Societies.
     * @param {SocietyDeleteManyArgs} args - Arguments to filter Societies to delete.
     * @example
     * // Delete a few Societies
     * const { count } = await prisma.society.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SocietyDeleteManyArgs>(args?: SelectSubset<T, SocietyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Societies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocietyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Societies
     * const society = await prisma.society.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SocietyUpdateManyArgs>(args: SelectSubset<T, SocietyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Societies and returns the data updated in the database.
     * @param {SocietyUpdateManyAndReturnArgs} args - Arguments to update many Societies.
     * @example
     * // Update many Societies
     * const society = await prisma.society.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Societies and only return the `id`
     * const societyWithIdOnly = await prisma.society.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SocietyUpdateManyAndReturnArgs>(args: SelectSubset<T, SocietyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocietyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Society.
     * @param {SocietyUpsertArgs} args - Arguments to update or create a Society.
     * @example
     * // Update or create a Society
     * const society = await prisma.society.upsert({
     *   create: {
     *     // ... data to create a Society
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Society we want to update
     *   }
     * })
     */
    upsert<T extends SocietyUpsertArgs>(args: SelectSubset<T, SocietyUpsertArgs<ExtArgs>>): Prisma__SocietyClient<$Result.GetResult<Prisma.$SocietyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Societies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocietyCountArgs} args - Arguments to filter Societies to count.
     * @example
     * // Count the number of Societies
     * const count = await prisma.society.count({
     *   where: {
     *     // ... the filter for the Societies we want to count
     *   }
     * })
    **/
    count<T extends SocietyCountArgs>(
      args?: Subset<T, SocietyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SocietyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Society.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocietyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SocietyAggregateArgs>(args: Subset<T, SocietyAggregateArgs>): Prisma.PrismaPromise<GetSocietyAggregateType<T>>

    /**
     * Group by Society.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocietyGroupByArgs} args - Group by arguments.
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
      T extends SocietyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SocietyGroupByArgs['orderBy'] }
        : { orderBy?: SocietyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SocietyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSocietyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Society model
   */
  readonly fields: SocietyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Society.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SocietyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    portofolio<T extends Society$portofolioArgs<ExtArgs> = {}>(args?: Subset<T, Society$portofolioArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortofolioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    applied_jobs<T extends Society$applied_jobsArgs<ExtArgs> = {}>(args?: Subset<T, Society$applied_jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionAppliedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Society model
   */
  interface SocietyFieldRefs {
    readonly id: FieldRef<"Society", 'Int'>
    readonly name: FieldRef<"Society", 'String'>
    readonly address: FieldRef<"Society", 'String'>
    readonly phone: FieldRef<"Society", 'String'>
    readonly date_of_birth: FieldRef<"Society", 'DateTime'>
    readonly gender: FieldRef<"Society", 'String'>
    readonly user_id: FieldRef<"Society", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Society findUnique
   */
  export type SocietyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Society
     */
    select?: SocietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Society
     */
    omit?: SocietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocietyInclude<ExtArgs> | null
    /**
     * Filter, which Society to fetch.
     */
    where: SocietyWhereUniqueInput
  }

  /**
   * Society findUniqueOrThrow
   */
  export type SocietyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Society
     */
    select?: SocietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Society
     */
    omit?: SocietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocietyInclude<ExtArgs> | null
    /**
     * Filter, which Society to fetch.
     */
    where: SocietyWhereUniqueInput
  }

  /**
   * Society findFirst
   */
  export type SocietyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Society
     */
    select?: SocietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Society
     */
    omit?: SocietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocietyInclude<ExtArgs> | null
    /**
     * Filter, which Society to fetch.
     */
    where?: SocietyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Societies to fetch.
     */
    orderBy?: SocietyOrderByWithRelationInput | SocietyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Societies.
     */
    cursor?: SocietyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Societies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Societies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Societies.
     */
    distinct?: SocietyScalarFieldEnum | SocietyScalarFieldEnum[]
  }

  /**
   * Society findFirstOrThrow
   */
  export type SocietyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Society
     */
    select?: SocietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Society
     */
    omit?: SocietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocietyInclude<ExtArgs> | null
    /**
     * Filter, which Society to fetch.
     */
    where?: SocietyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Societies to fetch.
     */
    orderBy?: SocietyOrderByWithRelationInput | SocietyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Societies.
     */
    cursor?: SocietyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Societies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Societies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Societies.
     */
    distinct?: SocietyScalarFieldEnum | SocietyScalarFieldEnum[]
  }

  /**
   * Society findMany
   */
  export type SocietyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Society
     */
    select?: SocietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Society
     */
    omit?: SocietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocietyInclude<ExtArgs> | null
    /**
     * Filter, which Societies to fetch.
     */
    where?: SocietyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Societies to fetch.
     */
    orderBy?: SocietyOrderByWithRelationInput | SocietyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Societies.
     */
    cursor?: SocietyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Societies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Societies.
     */
    skip?: number
    distinct?: SocietyScalarFieldEnum | SocietyScalarFieldEnum[]
  }

  /**
   * Society create
   */
  export type SocietyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Society
     */
    select?: SocietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Society
     */
    omit?: SocietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocietyInclude<ExtArgs> | null
    /**
     * The data needed to create a Society.
     */
    data: XOR<SocietyCreateInput, SocietyUncheckedCreateInput>
  }

  /**
   * Society createMany
   */
  export type SocietyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Societies.
     */
    data: SocietyCreateManyInput | SocietyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Society createManyAndReturn
   */
  export type SocietyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Society
     */
    select?: SocietySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Society
     */
    omit?: SocietyOmit<ExtArgs> | null
    /**
     * The data used to create many Societies.
     */
    data: SocietyCreateManyInput | SocietyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocietyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Society update
   */
  export type SocietyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Society
     */
    select?: SocietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Society
     */
    omit?: SocietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocietyInclude<ExtArgs> | null
    /**
     * The data needed to update a Society.
     */
    data: XOR<SocietyUpdateInput, SocietyUncheckedUpdateInput>
    /**
     * Choose, which Society to update.
     */
    where: SocietyWhereUniqueInput
  }

  /**
   * Society updateMany
   */
  export type SocietyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Societies.
     */
    data: XOR<SocietyUpdateManyMutationInput, SocietyUncheckedUpdateManyInput>
    /**
     * Filter which Societies to update
     */
    where?: SocietyWhereInput
    /**
     * Limit how many Societies to update.
     */
    limit?: number
  }

  /**
   * Society updateManyAndReturn
   */
  export type SocietyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Society
     */
    select?: SocietySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Society
     */
    omit?: SocietyOmit<ExtArgs> | null
    /**
     * The data used to update Societies.
     */
    data: XOR<SocietyUpdateManyMutationInput, SocietyUncheckedUpdateManyInput>
    /**
     * Filter which Societies to update
     */
    where?: SocietyWhereInput
    /**
     * Limit how many Societies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocietyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Society upsert
   */
  export type SocietyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Society
     */
    select?: SocietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Society
     */
    omit?: SocietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocietyInclude<ExtArgs> | null
    /**
     * The filter to search for the Society to update in case it exists.
     */
    where: SocietyWhereUniqueInput
    /**
     * In case the Society found by the `where` argument doesn't exist, create a new Society with this data.
     */
    create: XOR<SocietyCreateInput, SocietyUncheckedCreateInput>
    /**
     * In case the Society was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SocietyUpdateInput, SocietyUncheckedUpdateInput>
  }

  /**
   * Society delete
   */
  export type SocietyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Society
     */
    select?: SocietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Society
     */
    omit?: SocietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocietyInclude<ExtArgs> | null
    /**
     * Filter which Society to delete.
     */
    where: SocietyWhereUniqueInput
  }

  /**
   * Society deleteMany
   */
  export type SocietyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Societies to delete
     */
    where?: SocietyWhereInput
    /**
     * Limit how many Societies to delete.
     */
    limit?: number
  }

  /**
   * Society.portofolio
   */
  export type Society$portofolioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portofolio
     */
    select?: PortofolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portofolio
     */
    omit?: PortofolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortofolioInclude<ExtArgs> | null
    where?: PortofolioWhereInput
    orderBy?: PortofolioOrderByWithRelationInput | PortofolioOrderByWithRelationInput[]
    cursor?: PortofolioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PortofolioScalarFieldEnum | PortofolioScalarFieldEnum[]
  }

  /**
   * Society.applied_jobs
   */
  export type Society$applied_jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionApplied
     */
    select?: PositionAppliedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionApplied
     */
    omit?: PositionAppliedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionAppliedInclude<ExtArgs> | null
    where?: PositionAppliedWhereInput
    orderBy?: PositionAppliedOrderByWithRelationInput | PositionAppliedOrderByWithRelationInput[]
    cursor?: PositionAppliedWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PositionAppliedScalarFieldEnum | PositionAppliedScalarFieldEnum[]
  }

  /**
   * Society without action
   */
  export type SocietyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Society
     */
    select?: SocietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Society
     */
    omit?: SocietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocietyInclude<ExtArgs> | null
  }


  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _avg: CompanyAvgAggregateOutputType | null
    _sum: CompanySumAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyAvgAggregateOutputType = {
    id: number | null
  }

  export type CompanySumAggregateOutputType = {
    id: number | null
  }

  export type CompanyMinAggregateOutputType = {
    id: number | null
    name: string | null
    address: string | null
    phone: string | null
    description: string | null
    user_id: string | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: number | null
    name: string | null
    address: string | null
    phone: string | null
    description: string | null
    user_id: string | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    name: number
    address: number
    phone: number
    description: number
    user_id: number
    _all: number
  }


  export type CompanyAvgAggregateInputType = {
    id?: true
  }

  export type CompanySumAggregateInputType = {
    id?: true
  }

  export type CompanyMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    description?: true
    user_id?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    description?: true
    user_id?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    description?: true
    user_id?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _avg?: CompanyAvgAggregateInputType
    _sum?: CompanySumAggregateInputType
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: number
    name: string
    address: string
    phone: string
    description: string
    user_id: string
    _count: CompanyCountAggregateOutputType | null
    _avg: CompanyAvgAggregateOutputType | null
    _sum: CompanySumAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    description?: boolean
    user_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    jobs?: boolean | Company$jobsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    description?: boolean
    user_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    description?: boolean
    user_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    description?: boolean
    user_id?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "phone" | "description" | "user_id", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    jobs?: boolean | Company$jobsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      jobs: Prisma.$AvailablePositionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      address: string
      phone: string
      description: string
      user_id: string
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {CompanyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
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
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    jobs<T extends Company$jobsArgs<ExtArgs> = {}>(args?: Subset<T, Company$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailablePositionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'Int'>
    readonly name: FieldRef<"Company", 'String'>
    readonly address: FieldRef<"Company", 'String'>
    readonly phone: FieldRef<"Company", 'String'>
    readonly description: FieldRef<"Company", 'String'>
    readonly user_id: FieldRef<"Company", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company updateManyAndReturn
   */
  export type CompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.jobs
   */
  export type Company$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePosition
     */
    select?: AvailablePositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePosition
     */
    omit?: AvailablePositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePositionInclude<ExtArgs> | null
    where?: AvailablePositionWhereInput
    orderBy?: AvailablePositionOrderByWithRelationInput | AvailablePositionOrderByWithRelationInput[]
    cursor?: AvailablePositionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvailablePositionScalarFieldEnum | AvailablePositionScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model AvailablePosition
   */

  export type AggregateAvailablePosition = {
    _count: AvailablePositionCountAggregateOutputType | null
    _avg: AvailablePositionAvgAggregateOutputType | null
    _sum: AvailablePositionSumAggregateOutputType | null
    _min: AvailablePositionMinAggregateOutputType | null
    _max: AvailablePositionMaxAggregateOutputType | null
  }

  export type AvailablePositionAvgAggregateOutputType = {
    id: number | null
    capacity: number | null
    company_id: number | null
  }

  export type AvailablePositionSumAggregateOutputType = {
    id: number | null
    capacity: number | null
    company_id: number | null
  }

  export type AvailablePositionMinAggregateOutputType = {
    id: number | null
    position_name: string | null
    capacity: number | null
    description: string | null
    submission_start_date: Date | null
    submission_end_date: Date | null
    company_id: number | null
  }

  export type AvailablePositionMaxAggregateOutputType = {
    id: number | null
    position_name: string | null
    capacity: number | null
    description: string | null
    submission_start_date: Date | null
    submission_end_date: Date | null
    company_id: number | null
  }

  export type AvailablePositionCountAggregateOutputType = {
    id: number
    position_name: number
    capacity: number
    description: number
    submission_start_date: number
    submission_end_date: number
    company_id: number
    _all: number
  }


  export type AvailablePositionAvgAggregateInputType = {
    id?: true
    capacity?: true
    company_id?: true
  }

  export type AvailablePositionSumAggregateInputType = {
    id?: true
    capacity?: true
    company_id?: true
  }

  export type AvailablePositionMinAggregateInputType = {
    id?: true
    position_name?: true
    capacity?: true
    description?: true
    submission_start_date?: true
    submission_end_date?: true
    company_id?: true
  }

  export type AvailablePositionMaxAggregateInputType = {
    id?: true
    position_name?: true
    capacity?: true
    description?: true
    submission_start_date?: true
    submission_end_date?: true
    company_id?: true
  }

  export type AvailablePositionCountAggregateInputType = {
    id?: true
    position_name?: true
    capacity?: true
    description?: true
    submission_start_date?: true
    submission_end_date?: true
    company_id?: true
    _all?: true
  }

  export type AvailablePositionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvailablePosition to aggregate.
     */
    where?: AvailablePositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailablePositions to fetch.
     */
    orderBy?: AvailablePositionOrderByWithRelationInput | AvailablePositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AvailablePositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailablePositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailablePositions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AvailablePositions
    **/
    _count?: true | AvailablePositionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AvailablePositionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AvailablePositionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AvailablePositionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AvailablePositionMaxAggregateInputType
  }

  export type GetAvailablePositionAggregateType<T extends AvailablePositionAggregateArgs> = {
        [P in keyof T & keyof AggregateAvailablePosition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAvailablePosition[P]>
      : GetScalarType<T[P], AggregateAvailablePosition[P]>
  }




  export type AvailablePositionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvailablePositionWhereInput
    orderBy?: AvailablePositionOrderByWithAggregationInput | AvailablePositionOrderByWithAggregationInput[]
    by: AvailablePositionScalarFieldEnum[] | AvailablePositionScalarFieldEnum
    having?: AvailablePositionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AvailablePositionCountAggregateInputType | true
    _avg?: AvailablePositionAvgAggregateInputType
    _sum?: AvailablePositionSumAggregateInputType
    _min?: AvailablePositionMinAggregateInputType
    _max?: AvailablePositionMaxAggregateInputType
  }

  export type AvailablePositionGroupByOutputType = {
    id: number
    position_name: string
    capacity: number
    description: string
    submission_start_date: Date
    submission_end_date: Date
    company_id: number
    _count: AvailablePositionCountAggregateOutputType | null
    _avg: AvailablePositionAvgAggregateOutputType | null
    _sum: AvailablePositionSumAggregateOutputType | null
    _min: AvailablePositionMinAggregateOutputType | null
    _max: AvailablePositionMaxAggregateOutputType | null
  }

  type GetAvailablePositionGroupByPayload<T extends AvailablePositionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AvailablePositionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AvailablePositionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AvailablePositionGroupByOutputType[P]>
            : GetScalarType<T[P], AvailablePositionGroupByOutputType[P]>
        }
      >
    >


  export type AvailablePositionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    position_name?: boolean
    capacity?: boolean
    description?: boolean
    submission_start_date?: boolean
    submission_end_date?: boolean
    company_id?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    applicants?: boolean | AvailablePosition$applicantsArgs<ExtArgs>
    embedding?: boolean | AvailablePosition$embeddingArgs<ExtArgs>
    _count?: boolean | AvailablePositionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["availablePosition"]>

  export type AvailablePositionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    position_name?: boolean
    capacity?: boolean
    description?: boolean
    submission_start_date?: boolean
    submission_end_date?: boolean
    company_id?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["availablePosition"]>

  export type AvailablePositionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    position_name?: boolean
    capacity?: boolean
    description?: boolean
    submission_start_date?: boolean
    submission_end_date?: boolean
    company_id?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["availablePosition"]>

  export type AvailablePositionSelectScalar = {
    id?: boolean
    position_name?: boolean
    capacity?: boolean
    description?: boolean
    submission_start_date?: boolean
    submission_end_date?: boolean
    company_id?: boolean
  }

  export type AvailablePositionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "position_name" | "capacity" | "description" | "submission_start_date" | "submission_end_date" | "company_id", ExtArgs["result"]["availablePosition"]>
  export type AvailablePositionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    applicants?: boolean | AvailablePosition$applicantsArgs<ExtArgs>
    embedding?: boolean | AvailablePosition$embeddingArgs<ExtArgs>
    _count?: boolean | AvailablePositionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AvailablePositionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type AvailablePositionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $AvailablePositionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AvailablePosition"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      applicants: Prisma.$PositionAppliedPayload<ExtArgs>[]
      embedding: Prisma.$JobEmbeddingPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      position_name: string
      capacity: number
      description: string
      submission_start_date: Date
      submission_end_date: Date
      company_id: number
    }, ExtArgs["result"]["availablePosition"]>
    composites: {}
  }

  type AvailablePositionGetPayload<S extends boolean | null | undefined | AvailablePositionDefaultArgs> = $Result.GetResult<Prisma.$AvailablePositionPayload, S>

  type AvailablePositionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AvailablePositionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AvailablePositionCountAggregateInputType | true
    }

  export interface AvailablePositionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AvailablePosition'], meta: { name: 'AvailablePosition' } }
    /**
     * Find zero or one AvailablePosition that matches the filter.
     * @param {AvailablePositionFindUniqueArgs} args - Arguments to find a AvailablePosition
     * @example
     * // Get one AvailablePosition
     * const availablePosition = await prisma.availablePosition.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AvailablePositionFindUniqueArgs>(args: SelectSubset<T, AvailablePositionFindUniqueArgs<ExtArgs>>): Prisma__AvailablePositionClient<$Result.GetResult<Prisma.$AvailablePositionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AvailablePosition that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AvailablePositionFindUniqueOrThrowArgs} args - Arguments to find a AvailablePosition
     * @example
     * // Get one AvailablePosition
     * const availablePosition = await prisma.availablePosition.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AvailablePositionFindUniqueOrThrowArgs>(args: SelectSubset<T, AvailablePositionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AvailablePositionClient<$Result.GetResult<Prisma.$AvailablePositionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AvailablePosition that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailablePositionFindFirstArgs} args - Arguments to find a AvailablePosition
     * @example
     * // Get one AvailablePosition
     * const availablePosition = await prisma.availablePosition.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AvailablePositionFindFirstArgs>(args?: SelectSubset<T, AvailablePositionFindFirstArgs<ExtArgs>>): Prisma__AvailablePositionClient<$Result.GetResult<Prisma.$AvailablePositionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AvailablePosition that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailablePositionFindFirstOrThrowArgs} args - Arguments to find a AvailablePosition
     * @example
     * // Get one AvailablePosition
     * const availablePosition = await prisma.availablePosition.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AvailablePositionFindFirstOrThrowArgs>(args?: SelectSubset<T, AvailablePositionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AvailablePositionClient<$Result.GetResult<Prisma.$AvailablePositionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AvailablePositions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailablePositionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AvailablePositions
     * const availablePositions = await prisma.availablePosition.findMany()
     * 
     * // Get first 10 AvailablePositions
     * const availablePositions = await prisma.availablePosition.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const availablePositionWithIdOnly = await prisma.availablePosition.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AvailablePositionFindManyArgs>(args?: SelectSubset<T, AvailablePositionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailablePositionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AvailablePosition.
     * @param {AvailablePositionCreateArgs} args - Arguments to create a AvailablePosition.
     * @example
     * // Create one AvailablePosition
     * const AvailablePosition = await prisma.availablePosition.create({
     *   data: {
     *     // ... data to create a AvailablePosition
     *   }
     * })
     * 
     */
    create<T extends AvailablePositionCreateArgs>(args: SelectSubset<T, AvailablePositionCreateArgs<ExtArgs>>): Prisma__AvailablePositionClient<$Result.GetResult<Prisma.$AvailablePositionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AvailablePositions.
     * @param {AvailablePositionCreateManyArgs} args - Arguments to create many AvailablePositions.
     * @example
     * // Create many AvailablePositions
     * const availablePosition = await prisma.availablePosition.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AvailablePositionCreateManyArgs>(args?: SelectSubset<T, AvailablePositionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AvailablePositions and returns the data saved in the database.
     * @param {AvailablePositionCreateManyAndReturnArgs} args - Arguments to create many AvailablePositions.
     * @example
     * // Create many AvailablePositions
     * const availablePosition = await prisma.availablePosition.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AvailablePositions and only return the `id`
     * const availablePositionWithIdOnly = await prisma.availablePosition.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AvailablePositionCreateManyAndReturnArgs>(args?: SelectSubset<T, AvailablePositionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailablePositionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AvailablePosition.
     * @param {AvailablePositionDeleteArgs} args - Arguments to delete one AvailablePosition.
     * @example
     * // Delete one AvailablePosition
     * const AvailablePosition = await prisma.availablePosition.delete({
     *   where: {
     *     // ... filter to delete one AvailablePosition
     *   }
     * })
     * 
     */
    delete<T extends AvailablePositionDeleteArgs>(args: SelectSubset<T, AvailablePositionDeleteArgs<ExtArgs>>): Prisma__AvailablePositionClient<$Result.GetResult<Prisma.$AvailablePositionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AvailablePosition.
     * @param {AvailablePositionUpdateArgs} args - Arguments to update one AvailablePosition.
     * @example
     * // Update one AvailablePosition
     * const availablePosition = await prisma.availablePosition.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AvailablePositionUpdateArgs>(args: SelectSubset<T, AvailablePositionUpdateArgs<ExtArgs>>): Prisma__AvailablePositionClient<$Result.GetResult<Prisma.$AvailablePositionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AvailablePositions.
     * @param {AvailablePositionDeleteManyArgs} args - Arguments to filter AvailablePositions to delete.
     * @example
     * // Delete a few AvailablePositions
     * const { count } = await prisma.availablePosition.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AvailablePositionDeleteManyArgs>(args?: SelectSubset<T, AvailablePositionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvailablePositions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailablePositionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AvailablePositions
     * const availablePosition = await prisma.availablePosition.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AvailablePositionUpdateManyArgs>(args: SelectSubset<T, AvailablePositionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvailablePositions and returns the data updated in the database.
     * @param {AvailablePositionUpdateManyAndReturnArgs} args - Arguments to update many AvailablePositions.
     * @example
     * // Update many AvailablePositions
     * const availablePosition = await prisma.availablePosition.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AvailablePositions and only return the `id`
     * const availablePositionWithIdOnly = await prisma.availablePosition.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AvailablePositionUpdateManyAndReturnArgs>(args: SelectSubset<T, AvailablePositionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailablePositionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AvailablePosition.
     * @param {AvailablePositionUpsertArgs} args - Arguments to update or create a AvailablePosition.
     * @example
     * // Update or create a AvailablePosition
     * const availablePosition = await prisma.availablePosition.upsert({
     *   create: {
     *     // ... data to create a AvailablePosition
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AvailablePosition we want to update
     *   }
     * })
     */
    upsert<T extends AvailablePositionUpsertArgs>(args: SelectSubset<T, AvailablePositionUpsertArgs<ExtArgs>>): Prisma__AvailablePositionClient<$Result.GetResult<Prisma.$AvailablePositionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AvailablePositions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailablePositionCountArgs} args - Arguments to filter AvailablePositions to count.
     * @example
     * // Count the number of AvailablePositions
     * const count = await prisma.availablePosition.count({
     *   where: {
     *     // ... the filter for the AvailablePositions we want to count
     *   }
     * })
    **/
    count<T extends AvailablePositionCountArgs>(
      args?: Subset<T, AvailablePositionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AvailablePositionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AvailablePosition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailablePositionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AvailablePositionAggregateArgs>(args: Subset<T, AvailablePositionAggregateArgs>): Prisma.PrismaPromise<GetAvailablePositionAggregateType<T>>

    /**
     * Group by AvailablePosition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailablePositionGroupByArgs} args - Group by arguments.
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
      T extends AvailablePositionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AvailablePositionGroupByArgs['orderBy'] }
        : { orderBy?: AvailablePositionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AvailablePositionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvailablePositionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AvailablePosition model
   */
  readonly fields: AvailablePositionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AvailablePosition.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AvailablePositionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    applicants<T extends AvailablePosition$applicantsArgs<ExtArgs> = {}>(args?: Subset<T, AvailablePosition$applicantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionAppliedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    embedding<T extends AvailablePosition$embeddingArgs<ExtArgs> = {}>(args?: Subset<T, AvailablePosition$embeddingArgs<ExtArgs>>): Prisma__JobEmbeddingClient<$Result.GetResult<Prisma.$JobEmbeddingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AvailablePosition model
   */
  interface AvailablePositionFieldRefs {
    readonly id: FieldRef<"AvailablePosition", 'Int'>
    readonly position_name: FieldRef<"AvailablePosition", 'String'>
    readonly capacity: FieldRef<"AvailablePosition", 'Int'>
    readonly description: FieldRef<"AvailablePosition", 'String'>
    readonly submission_start_date: FieldRef<"AvailablePosition", 'DateTime'>
    readonly submission_end_date: FieldRef<"AvailablePosition", 'DateTime'>
    readonly company_id: FieldRef<"AvailablePosition", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AvailablePosition findUnique
   */
  export type AvailablePositionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePosition
     */
    select?: AvailablePositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePosition
     */
    omit?: AvailablePositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePositionInclude<ExtArgs> | null
    /**
     * Filter, which AvailablePosition to fetch.
     */
    where: AvailablePositionWhereUniqueInput
  }

  /**
   * AvailablePosition findUniqueOrThrow
   */
  export type AvailablePositionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePosition
     */
    select?: AvailablePositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePosition
     */
    omit?: AvailablePositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePositionInclude<ExtArgs> | null
    /**
     * Filter, which AvailablePosition to fetch.
     */
    where: AvailablePositionWhereUniqueInput
  }

  /**
   * AvailablePosition findFirst
   */
  export type AvailablePositionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePosition
     */
    select?: AvailablePositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePosition
     */
    omit?: AvailablePositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePositionInclude<ExtArgs> | null
    /**
     * Filter, which AvailablePosition to fetch.
     */
    where?: AvailablePositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailablePositions to fetch.
     */
    orderBy?: AvailablePositionOrderByWithRelationInput | AvailablePositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvailablePositions.
     */
    cursor?: AvailablePositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailablePositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailablePositions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailablePositions.
     */
    distinct?: AvailablePositionScalarFieldEnum | AvailablePositionScalarFieldEnum[]
  }

  /**
   * AvailablePosition findFirstOrThrow
   */
  export type AvailablePositionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePosition
     */
    select?: AvailablePositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePosition
     */
    omit?: AvailablePositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePositionInclude<ExtArgs> | null
    /**
     * Filter, which AvailablePosition to fetch.
     */
    where?: AvailablePositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailablePositions to fetch.
     */
    orderBy?: AvailablePositionOrderByWithRelationInput | AvailablePositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvailablePositions.
     */
    cursor?: AvailablePositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailablePositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailablePositions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailablePositions.
     */
    distinct?: AvailablePositionScalarFieldEnum | AvailablePositionScalarFieldEnum[]
  }

  /**
   * AvailablePosition findMany
   */
  export type AvailablePositionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePosition
     */
    select?: AvailablePositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePosition
     */
    omit?: AvailablePositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePositionInclude<ExtArgs> | null
    /**
     * Filter, which AvailablePositions to fetch.
     */
    where?: AvailablePositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailablePositions to fetch.
     */
    orderBy?: AvailablePositionOrderByWithRelationInput | AvailablePositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AvailablePositions.
     */
    cursor?: AvailablePositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailablePositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailablePositions.
     */
    skip?: number
    distinct?: AvailablePositionScalarFieldEnum | AvailablePositionScalarFieldEnum[]
  }

  /**
   * AvailablePosition create
   */
  export type AvailablePositionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePosition
     */
    select?: AvailablePositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePosition
     */
    omit?: AvailablePositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePositionInclude<ExtArgs> | null
    /**
     * The data needed to create a AvailablePosition.
     */
    data: XOR<AvailablePositionCreateInput, AvailablePositionUncheckedCreateInput>
  }

  /**
   * AvailablePosition createMany
   */
  export type AvailablePositionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AvailablePositions.
     */
    data: AvailablePositionCreateManyInput | AvailablePositionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AvailablePosition createManyAndReturn
   */
  export type AvailablePositionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePosition
     */
    select?: AvailablePositionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePosition
     */
    omit?: AvailablePositionOmit<ExtArgs> | null
    /**
     * The data used to create many AvailablePositions.
     */
    data: AvailablePositionCreateManyInput | AvailablePositionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePositionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AvailablePosition update
   */
  export type AvailablePositionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePosition
     */
    select?: AvailablePositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePosition
     */
    omit?: AvailablePositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePositionInclude<ExtArgs> | null
    /**
     * The data needed to update a AvailablePosition.
     */
    data: XOR<AvailablePositionUpdateInput, AvailablePositionUncheckedUpdateInput>
    /**
     * Choose, which AvailablePosition to update.
     */
    where: AvailablePositionWhereUniqueInput
  }

  /**
   * AvailablePosition updateMany
   */
  export type AvailablePositionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AvailablePositions.
     */
    data: XOR<AvailablePositionUpdateManyMutationInput, AvailablePositionUncheckedUpdateManyInput>
    /**
     * Filter which AvailablePositions to update
     */
    where?: AvailablePositionWhereInput
    /**
     * Limit how many AvailablePositions to update.
     */
    limit?: number
  }

  /**
   * AvailablePosition updateManyAndReturn
   */
  export type AvailablePositionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePosition
     */
    select?: AvailablePositionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePosition
     */
    omit?: AvailablePositionOmit<ExtArgs> | null
    /**
     * The data used to update AvailablePositions.
     */
    data: XOR<AvailablePositionUpdateManyMutationInput, AvailablePositionUncheckedUpdateManyInput>
    /**
     * Filter which AvailablePositions to update
     */
    where?: AvailablePositionWhereInput
    /**
     * Limit how many AvailablePositions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePositionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AvailablePosition upsert
   */
  export type AvailablePositionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePosition
     */
    select?: AvailablePositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePosition
     */
    omit?: AvailablePositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePositionInclude<ExtArgs> | null
    /**
     * The filter to search for the AvailablePosition to update in case it exists.
     */
    where: AvailablePositionWhereUniqueInput
    /**
     * In case the AvailablePosition found by the `where` argument doesn't exist, create a new AvailablePosition with this data.
     */
    create: XOR<AvailablePositionCreateInput, AvailablePositionUncheckedCreateInput>
    /**
     * In case the AvailablePosition was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AvailablePositionUpdateInput, AvailablePositionUncheckedUpdateInput>
  }

  /**
   * AvailablePosition delete
   */
  export type AvailablePositionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePosition
     */
    select?: AvailablePositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePosition
     */
    omit?: AvailablePositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePositionInclude<ExtArgs> | null
    /**
     * Filter which AvailablePosition to delete.
     */
    where: AvailablePositionWhereUniqueInput
  }

  /**
   * AvailablePosition deleteMany
   */
  export type AvailablePositionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvailablePositions to delete
     */
    where?: AvailablePositionWhereInput
    /**
     * Limit how many AvailablePositions to delete.
     */
    limit?: number
  }

  /**
   * AvailablePosition.applicants
   */
  export type AvailablePosition$applicantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionApplied
     */
    select?: PositionAppliedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionApplied
     */
    omit?: PositionAppliedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionAppliedInclude<ExtArgs> | null
    where?: PositionAppliedWhereInput
    orderBy?: PositionAppliedOrderByWithRelationInput | PositionAppliedOrderByWithRelationInput[]
    cursor?: PositionAppliedWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PositionAppliedScalarFieldEnum | PositionAppliedScalarFieldEnum[]
  }

  /**
   * AvailablePosition.embedding
   */
  export type AvailablePosition$embeddingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEmbedding
     */
    select?: JobEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEmbedding
     */
    omit?: JobEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEmbeddingInclude<ExtArgs> | null
    where?: JobEmbeddingWhereInput
  }

  /**
   * AvailablePosition without action
   */
  export type AvailablePositionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePosition
     */
    select?: AvailablePositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePosition
     */
    omit?: AvailablePositionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePositionInclude<ExtArgs> | null
  }


  /**
   * Model Portofolio
   */

  export type AggregatePortofolio = {
    _count: PortofolioCountAggregateOutputType | null
    _avg: PortofolioAvgAggregateOutputType | null
    _sum: PortofolioSumAggregateOutputType | null
    _min: PortofolioMinAggregateOutputType | null
    _max: PortofolioMaxAggregateOutputType | null
  }

  export type PortofolioAvgAggregateOutputType = {
    id: number | null
    society_id: number | null
  }

  export type PortofolioSumAggregateOutputType = {
    id: number | null
    society_id: number | null
  }

  export type PortofolioMinAggregateOutputType = {
    id: number | null
    skill: string | null
    description: string | null
    file: string | null
    society_id: number | null
  }

  export type PortofolioMaxAggregateOutputType = {
    id: number | null
    skill: string | null
    description: string | null
    file: string | null
    society_id: number | null
  }

  export type PortofolioCountAggregateOutputType = {
    id: number
    skill: number
    description: number
    file: number
    society_id: number
    _all: number
  }


  export type PortofolioAvgAggregateInputType = {
    id?: true
    society_id?: true
  }

  export type PortofolioSumAggregateInputType = {
    id?: true
    society_id?: true
  }

  export type PortofolioMinAggregateInputType = {
    id?: true
    skill?: true
    description?: true
    file?: true
    society_id?: true
  }

  export type PortofolioMaxAggregateInputType = {
    id?: true
    skill?: true
    description?: true
    file?: true
    society_id?: true
  }

  export type PortofolioCountAggregateInputType = {
    id?: true
    skill?: true
    description?: true
    file?: true
    society_id?: true
    _all?: true
  }

  export type PortofolioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portofolio to aggregate.
     */
    where?: PortofolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portofolios to fetch.
     */
    orderBy?: PortofolioOrderByWithRelationInput | PortofolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortofolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portofolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portofolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Portofolios
    **/
    _count?: true | PortofolioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PortofolioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PortofolioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortofolioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortofolioMaxAggregateInputType
  }

  export type GetPortofolioAggregateType<T extends PortofolioAggregateArgs> = {
        [P in keyof T & keyof AggregatePortofolio]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortofolio[P]>
      : GetScalarType<T[P], AggregatePortofolio[P]>
  }




  export type PortofolioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortofolioWhereInput
    orderBy?: PortofolioOrderByWithAggregationInput | PortofolioOrderByWithAggregationInput[]
    by: PortofolioScalarFieldEnum[] | PortofolioScalarFieldEnum
    having?: PortofolioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortofolioCountAggregateInputType | true
    _avg?: PortofolioAvgAggregateInputType
    _sum?: PortofolioSumAggregateInputType
    _min?: PortofolioMinAggregateInputType
    _max?: PortofolioMaxAggregateInputType
  }

  export type PortofolioGroupByOutputType = {
    id: number
    skill: string
    description: string
    file: string
    society_id: number
    _count: PortofolioCountAggregateOutputType | null
    _avg: PortofolioAvgAggregateOutputType | null
    _sum: PortofolioSumAggregateOutputType | null
    _min: PortofolioMinAggregateOutputType | null
    _max: PortofolioMaxAggregateOutputType | null
  }

  type GetPortofolioGroupByPayload<T extends PortofolioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortofolioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortofolioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortofolioGroupByOutputType[P]>
            : GetScalarType<T[P], PortofolioGroupByOutputType[P]>
        }
      >
    >


  export type PortofolioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    skill?: boolean
    description?: boolean
    file?: boolean
    society_id?: boolean
    society?: boolean | SocietyDefaultArgs<ExtArgs>
    PortfolioEmbedding?: boolean | Portofolio$PortfolioEmbeddingArgs<ExtArgs>
    _count?: boolean | PortofolioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portofolio"]>

  export type PortofolioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    skill?: boolean
    description?: boolean
    file?: boolean
    society_id?: boolean
    society?: boolean | SocietyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portofolio"]>

  export type PortofolioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    skill?: boolean
    description?: boolean
    file?: boolean
    society_id?: boolean
    society?: boolean | SocietyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portofolio"]>

  export type PortofolioSelectScalar = {
    id?: boolean
    skill?: boolean
    description?: boolean
    file?: boolean
    society_id?: boolean
  }

  export type PortofolioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "skill" | "description" | "file" | "society_id", ExtArgs["result"]["portofolio"]>
  export type PortofolioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    society?: boolean | SocietyDefaultArgs<ExtArgs>
    PortfolioEmbedding?: boolean | Portofolio$PortfolioEmbeddingArgs<ExtArgs>
    _count?: boolean | PortofolioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PortofolioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    society?: boolean | SocietyDefaultArgs<ExtArgs>
  }
  export type PortofolioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    society?: boolean | SocietyDefaultArgs<ExtArgs>
  }

  export type $PortofolioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Portofolio"
    objects: {
      society: Prisma.$SocietyPayload<ExtArgs>
      PortfolioEmbedding: Prisma.$PortfolioEmbeddingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      skill: string
      description: string
      file: string
      society_id: number
    }, ExtArgs["result"]["portofolio"]>
    composites: {}
  }

  type PortofolioGetPayload<S extends boolean | null | undefined | PortofolioDefaultArgs> = $Result.GetResult<Prisma.$PortofolioPayload, S>

  type PortofolioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PortofolioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PortofolioCountAggregateInputType | true
    }

  export interface PortofolioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Portofolio'], meta: { name: 'Portofolio' } }
    /**
     * Find zero or one Portofolio that matches the filter.
     * @param {PortofolioFindUniqueArgs} args - Arguments to find a Portofolio
     * @example
     * // Get one Portofolio
     * const portofolio = await prisma.portofolio.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortofolioFindUniqueArgs>(args: SelectSubset<T, PortofolioFindUniqueArgs<ExtArgs>>): Prisma__PortofolioClient<$Result.GetResult<Prisma.$PortofolioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Portofolio that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PortofolioFindUniqueOrThrowArgs} args - Arguments to find a Portofolio
     * @example
     * // Get one Portofolio
     * const portofolio = await prisma.portofolio.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortofolioFindUniqueOrThrowArgs>(args: SelectSubset<T, PortofolioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortofolioClient<$Result.GetResult<Prisma.$PortofolioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Portofolio that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortofolioFindFirstArgs} args - Arguments to find a Portofolio
     * @example
     * // Get one Portofolio
     * const portofolio = await prisma.portofolio.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortofolioFindFirstArgs>(args?: SelectSubset<T, PortofolioFindFirstArgs<ExtArgs>>): Prisma__PortofolioClient<$Result.GetResult<Prisma.$PortofolioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Portofolio that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortofolioFindFirstOrThrowArgs} args - Arguments to find a Portofolio
     * @example
     * // Get one Portofolio
     * const portofolio = await prisma.portofolio.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortofolioFindFirstOrThrowArgs>(args?: SelectSubset<T, PortofolioFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortofolioClient<$Result.GetResult<Prisma.$PortofolioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Portofolios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortofolioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Portofolios
     * const portofolios = await prisma.portofolio.findMany()
     * 
     * // Get first 10 Portofolios
     * const portofolios = await prisma.portofolio.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portofolioWithIdOnly = await prisma.portofolio.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortofolioFindManyArgs>(args?: SelectSubset<T, PortofolioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortofolioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Portofolio.
     * @param {PortofolioCreateArgs} args - Arguments to create a Portofolio.
     * @example
     * // Create one Portofolio
     * const Portofolio = await prisma.portofolio.create({
     *   data: {
     *     // ... data to create a Portofolio
     *   }
     * })
     * 
     */
    create<T extends PortofolioCreateArgs>(args: SelectSubset<T, PortofolioCreateArgs<ExtArgs>>): Prisma__PortofolioClient<$Result.GetResult<Prisma.$PortofolioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Portofolios.
     * @param {PortofolioCreateManyArgs} args - Arguments to create many Portofolios.
     * @example
     * // Create many Portofolios
     * const portofolio = await prisma.portofolio.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortofolioCreateManyArgs>(args?: SelectSubset<T, PortofolioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Portofolios and returns the data saved in the database.
     * @param {PortofolioCreateManyAndReturnArgs} args - Arguments to create many Portofolios.
     * @example
     * // Create many Portofolios
     * const portofolio = await prisma.portofolio.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Portofolios and only return the `id`
     * const portofolioWithIdOnly = await prisma.portofolio.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PortofolioCreateManyAndReturnArgs>(args?: SelectSubset<T, PortofolioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortofolioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Portofolio.
     * @param {PortofolioDeleteArgs} args - Arguments to delete one Portofolio.
     * @example
     * // Delete one Portofolio
     * const Portofolio = await prisma.portofolio.delete({
     *   where: {
     *     // ... filter to delete one Portofolio
     *   }
     * })
     * 
     */
    delete<T extends PortofolioDeleteArgs>(args: SelectSubset<T, PortofolioDeleteArgs<ExtArgs>>): Prisma__PortofolioClient<$Result.GetResult<Prisma.$PortofolioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Portofolio.
     * @param {PortofolioUpdateArgs} args - Arguments to update one Portofolio.
     * @example
     * // Update one Portofolio
     * const portofolio = await prisma.portofolio.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortofolioUpdateArgs>(args: SelectSubset<T, PortofolioUpdateArgs<ExtArgs>>): Prisma__PortofolioClient<$Result.GetResult<Prisma.$PortofolioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Portofolios.
     * @param {PortofolioDeleteManyArgs} args - Arguments to filter Portofolios to delete.
     * @example
     * // Delete a few Portofolios
     * const { count } = await prisma.portofolio.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortofolioDeleteManyArgs>(args?: SelectSubset<T, PortofolioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Portofolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortofolioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Portofolios
     * const portofolio = await prisma.portofolio.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortofolioUpdateManyArgs>(args: SelectSubset<T, PortofolioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Portofolios and returns the data updated in the database.
     * @param {PortofolioUpdateManyAndReturnArgs} args - Arguments to update many Portofolios.
     * @example
     * // Update many Portofolios
     * const portofolio = await prisma.portofolio.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Portofolios and only return the `id`
     * const portofolioWithIdOnly = await prisma.portofolio.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PortofolioUpdateManyAndReturnArgs>(args: SelectSubset<T, PortofolioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortofolioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Portofolio.
     * @param {PortofolioUpsertArgs} args - Arguments to update or create a Portofolio.
     * @example
     * // Update or create a Portofolio
     * const portofolio = await prisma.portofolio.upsert({
     *   create: {
     *     // ... data to create a Portofolio
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Portofolio we want to update
     *   }
     * })
     */
    upsert<T extends PortofolioUpsertArgs>(args: SelectSubset<T, PortofolioUpsertArgs<ExtArgs>>): Prisma__PortofolioClient<$Result.GetResult<Prisma.$PortofolioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Portofolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortofolioCountArgs} args - Arguments to filter Portofolios to count.
     * @example
     * // Count the number of Portofolios
     * const count = await prisma.portofolio.count({
     *   where: {
     *     // ... the filter for the Portofolios we want to count
     *   }
     * })
    **/
    count<T extends PortofolioCountArgs>(
      args?: Subset<T, PortofolioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortofolioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Portofolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortofolioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PortofolioAggregateArgs>(args: Subset<T, PortofolioAggregateArgs>): Prisma.PrismaPromise<GetPortofolioAggregateType<T>>

    /**
     * Group by Portofolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortofolioGroupByArgs} args - Group by arguments.
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
      T extends PortofolioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortofolioGroupByArgs['orderBy'] }
        : { orderBy?: PortofolioGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PortofolioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortofolioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Portofolio model
   */
  readonly fields: PortofolioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Portofolio.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortofolioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    society<T extends SocietyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SocietyDefaultArgs<ExtArgs>>): Prisma__SocietyClient<$Result.GetResult<Prisma.$SocietyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    PortfolioEmbedding<T extends Portofolio$PortfolioEmbeddingArgs<ExtArgs> = {}>(args?: Subset<T, Portofolio$PortfolioEmbeddingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioEmbeddingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Portofolio model
   */
  interface PortofolioFieldRefs {
    readonly id: FieldRef<"Portofolio", 'Int'>
    readonly skill: FieldRef<"Portofolio", 'String'>
    readonly description: FieldRef<"Portofolio", 'String'>
    readonly file: FieldRef<"Portofolio", 'String'>
    readonly society_id: FieldRef<"Portofolio", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Portofolio findUnique
   */
  export type PortofolioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portofolio
     */
    select?: PortofolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portofolio
     */
    omit?: PortofolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortofolioInclude<ExtArgs> | null
    /**
     * Filter, which Portofolio to fetch.
     */
    where: PortofolioWhereUniqueInput
  }

  /**
   * Portofolio findUniqueOrThrow
   */
  export type PortofolioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portofolio
     */
    select?: PortofolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portofolio
     */
    omit?: PortofolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortofolioInclude<ExtArgs> | null
    /**
     * Filter, which Portofolio to fetch.
     */
    where: PortofolioWhereUniqueInput
  }

  /**
   * Portofolio findFirst
   */
  export type PortofolioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portofolio
     */
    select?: PortofolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portofolio
     */
    omit?: PortofolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortofolioInclude<ExtArgs> | null
    /**
     * Filter, which Portofolio to fetch.
     */
    where?: PortofolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portofolios to fetch.
     */
    orderBy?: PortofolioOrderByWithRelationInput | PortofolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portofolios.
     */
    cursor?: PortofolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portofolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portofolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portofolios.
     */
    distinct?: PortofolioScalarFieldEnum | PortofolioScalarFieldEnum[]
  }

  /**
   * Portofolio findFirstOrThrow
   */
  export type PortofolioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portofolio
     */
    select?: PortofolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portofolio
     */
    omit?: PortofolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortofolioInclude<ExtArgs> | null
    /**
     * Filter, which Portofolio to fetch.
     */
    where?: PortofolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portofolios to fetch.
     */
    orderBy?: PortofolioOrderByWithRelationInput | PortofolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portofolios.
     */
    cursor?: PortofolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portofolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portofolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portofolios.
     */
    distinct?: PortofolioScalarFieldEnum | PortofolioScalarFieldEnum[]
  }

  /**
   * Portofolio findMany
   */
  export type PortofolioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portofolio
     */
    select?: PortofolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portofolio
     */
    omit?: PortofolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortofolioInclude<ExtArgs> | null
    /**
     * Filter, which Portofolios to fetch.
     */
    where?: PortofolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portofolios to fetch.
     */
    orderBy?: PortofolioOrderByWithRelationInput | PortofolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Portofolios.
     */
    cursor?: PortofolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portofolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portofolios.
     */
    skip?: number
    distinct?: PortofolioScalarFieldEnum | PortofolioScalarFieldEnum[]
  }

  /**
   * Portofolio create
   */
  export type PortofolioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portofolio
     */
    select?: PortofolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portofolio
     */
    omit?: PortofolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortofolioInclude<ExtArgs> | null
    /**
     * The data needed to create a Portofolio.
     */
    data: XOR<PortofolioCreateInput, PortofolioUncheckedCreateInput>
  }

  /**
   * Portofolio createMany
   */
  export type PortofolioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Portofolios.
     */
    data: PortofolioCreateManyInput | PortofolioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Portofolio createManyAndReturn
   */
  export type PortofolioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portofolio
     */
    select?: PortofolioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Portofolio
     */
    omit?: PortofolioOmit<ExtArgs> | null
    /**
     * The data used to create many Portofolios.
     */
    data: PortofolioCreateManyInput | PortofolioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortofolioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Portofolio update
   */
  export type PortofolioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portofolio
     */
    select?: PortofolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portofolio
     */
    omit?: PortofolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortofolioInclude<ExtArgs> | null
    /**
     * The data needed to update a Portofolio.
     */
    data: XOR<PortofolioUpdateInput, PortofolioUncheckedUpdateInput>
    /**
     * Choose, which Portofolio to update.
     */
    where: PortofolioWhereUniqueInput
  }

  /**
   * Portofolio updateMany
   */
  export type PortofolioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Portofolios.
     */
    data: XOR<PortofolioUpdateManyMutationInput, PortofolioUncheckedUpdateManyInput>
    /**
     * Filter which Portofolios to update
     */
    where?: PortofolioWhereInput
    /**
     * Limit how many Portofolios to update.
     */
    limit?: number
  }

  /**
   * Portofolio updateManyAndReturn
   */
  export type PortofolioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portofolio
     */
    select?: PortofolioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Portofolio
     */
    omit?: PortofolioOmit<ExtArgs> | null
    /**
     * The data used to update Portofolios.
     */
    data: XOR<PortofolioUpdateManyMutationInput, PortofolioUncheckedUpdateManyInput>
    /**
     * Filter which Portofolios to update
     */
    where?: PortofolioWhereInput
    /**
     * Limit how many Portofolios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortofolioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Portofolio upsert
   */
  export type PortofolioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portofolio
     */
    select?: PortofolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portofolio
     */
    omit?: PortofolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortofolioInclude<ExtArgs> | null
    /**
     * The filter to search for the Portofolio to update in case it exists.
     */
    where: PortofolioWhereUniqueInput
    /**
     * In case the Portofolio found by the `where` argument doesn't exist, create a new Portofolio with this data.
     */
    create: XOR<PortofolioCreateInput, PortofolioUncheckedCreateInput>
    /**
     * In case the Portofolio was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortofolioUpdateInput, PortofolioUncheckedUpdateInput>
  }

  /**
   * Portofolio delete
   */
  export type PortofolioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portofolio
     */
    select?: PortofolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portofolio
     */
    omit?: PortofolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortofolioInclude<ExtArgs> | null
    /**
     * Filter which Portofolio to delete.
     */
    where: PortofolioWhereUniqueInput
  }

  /**
   * Portofolio deleteMany
   */
  export type PortofolioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portofolios to delete
     */
    where?: PortofolioWhereInput
    /**
     * Limit how many Portofolios to delete.
     */
    limit?: number
  }

  /**
   * Portofolio.PortfolioEmbedding
   */
  export type Portofolio$PortfolioEmbeddingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioEmbedding
     */
    select?: PortfolioEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioEmbedding
     */
    omit?: PortfolioEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioEmbeddingInclude<ExtArgs> | null
    where?: PortfolioEmbeddingWhereInput
    orderBy?: PortfolioEmbeddingOrderByWithRelationInput | PortfolioEmbeddingOrderByWithRelationInput[]
    cursor?: PortfolioEmbeddingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PortfolioEmbeddingScalarFieldEnum | PortfolioEmbeddingScalarFieldEnum[]
  }

  /**
   * Portofolio without action
   */
  export type PortofolioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portofolio
     */
    select?: PortofolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portofolio
     */
    omit?: PortofolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortofolioInclude<ExtArgs> | null
  }


  /**
   * Model PositionApplied
   */

  export type AggregatePositionApplied = {
    _count: PositionAppliedCountAggregateOutputType | null
    _avg: PositionAppliedAvgAggregateOutputType | null
    _sum: PositionAppliedSumAggregateOutputType | null
    _min: PositionAppliedMinAggregateOutputType | null
    _max: PositionAppliedMaxAggregateOutputType | null
  }

  export type PositionAppliedAvgAggregateOutputType = {
    id: number | null
    available_position_id: number | null
    society_id: number | null
  }

  export type PositionAppliedSumAggregateOutputType = {
    id: number | null
    available_position_id: number | null
    society_id: number | null
  }

  export type PositionAppliedMinAggregateOutputType = {
    id: number | null
    available_position_id: number | null
    society_id: number | null
    apply_date: Date | null
    status: $Enums.PositionStatus | null
  }

  export type PositionAppliedMaxAggregateOutputType = {
    id: number | null
    available_position_id: number | null
    society_id: number | null
    apply_date: Date | null
    status: $Enums.PositionStatus | null
  }

  export type PositionAppliedCountAggregateOutputType = {
    id: number
    available_position_id: number
    society_id: number
    apply_date: number
    status: number
    _all: number
  }


  export type PositionAppliedAvgAggregateInputType = {
    id?: true
    available_position_id?: true
    society_id?: true
  }

  export type PositionAppliedSumAggregateInputType = {
    id?: true
    available_position_id?: true
    society_id?: true
  }

  export type PositionAppliedMinAggregateInputType = {
    id?: true
    available_position_id?: true
    society_id?: true
    apply_date?: true
    status?: true
  }

  export type PositionAppliedMaxAggregateInputType = {
    id?: true
    available_position_id?: true
    society_id?: true
    apply_date?: true
    status?: true
  }

  export type PositionAppliedCountAggregateInputType = {
    id?: true
    available_position_id?: true
    society_id?: true
    apply_date?: true
    status?: true
    _all?: true
  }

  export type PositionAppliedAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PositionApplied to aggregate.
     */
    where?: PositionAppliedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PositionApplieds to fetch.
     */
    orderBy?: PositionAppliedOrderByWithRelationInput | PositionAppliedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PositionAppliedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PositionApplieds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PositionApplieds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PositionApplieds
    **/
    _count?: true | PositionAppliedCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PositionAppliedAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PositionAppliedSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PositionAppliedMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PositionAppliedMaxAggregateInputType
  }

  export type GetPositionAppliedAggregateType<T extends PositionAppliedAggregateArgs> = {
        [P in keyof T & keyof AggregatePositionApplied]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePositionApplied[P]>
      : GetScalarType<T[P], AggregatePositionApplied[P]>
  }




  export type PositionAppliedGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PositionAppliedWhereInput
    orderBy?: PositionAppliedOrderByWithAggregationInput | PositionAppliedOrderByWithAggregationInput[]
    by: PositionAppliedScalarFieldEnum[] | PositionAppliedScalarFieldEnum
    having?: PositionAppliedScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PositionAppliedCountAggregateInputType | true
    _avg?: PositionAppliedAvgAggregateInputType
    _sum?: PositionAppliedSumAggregateInputType
    _min?: PositionAppliedMinAggregateInputType
    _max?: PositionAppliedMaxAggregateInputType
  }

  export type PositionAppliedGroupByOutputType = {
    id: number
    available_position_id: number
    society_id: number
    apply_date: Date
    status: $Enums.PositionStatus
    _count: PositionAppliedCountAggregateOutputType | null
    _avg: PositionAppliedAvgAggregateOutputType | null
    _sum: PositionAppliedSumAggregateOutputType | null
    _min: PositionAppliedMinAggregateOutputType | null
    _max: PositionAppliedMaxAggregateOutputType | null
  }

  type GetPositionAppliedGroupByPayload<T extends PositionAppliedGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PositionAppliedGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PositionAppliedGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PositionAppliedGroupByOutputType[P]>
            : GetScalarType<T[P], PositionAppliedGroupByOutputType[P]>
        }
      >
    >


  export type PositionAppliedSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    available_position_id?: boolean
    society_id?: boolean
    apply_date?: boolean
    status?: boolean
    position?: boolean | AvailablePositionDefaultArgs<ExtArgs>
    society?: boolean | SocietyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["positionApplied"]>

  export type PositionAppliedSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    available_position_id?: boolean
    society_id?: boolean
    apply_date?: boolean
    status?: boolean
    position?: boolean | AvailablePositionDefaultArgs<ExtArgs>
    society?: boolean | SocietyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["positionApplied"]>

  export type PositionAppliedSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    available_position_id?: boolean
    society_id?: boolean
    apply_date?: boolean
    status?: boolean
    position?: boolean | AvailablePositionDefaultArgs<ExtArgs>
    society?: boolean | SocietyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["positionApplied"]>

  export type PositionAppliedSelectScalar = {
    id?: boolean
    available_position_id?: boolean
    society_id?: boolean
    apply_date?: boolean
    status?: boolean
  }

  export type PositionAppliedOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "available_position_id" | "society_id" | "apply_date" | "status", ExtArgs["result"]["positionApplied"]>
  export type PositionAppliedInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    position?: boolean | AvailablePositionDefaultArgs<ExtArgs>
    society?: boolean | SocietyDefaultArgs<ExtArgs>
  }
  export type PositionAppliedIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    position?: boolean | AvailablePositionDefaultArgs<ExtArgs>
    society?: boolean | SocietyDefaultArgs<ExtArgs>
  }
  export type PositionAppliedIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    position?: boolean | AvailablePositionDefaultArgs<ExtArgs>
    society?: boolean | SocietyDefaultArgs<ExtArgs>
  }

  export type $PositionAppliedPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PositionApplied"
    objects: {
      position: Prisma.$AvailablePositionPayload<ExtArgs>
      society: Prisma.$SocietyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      available_position_id: number
      society_id: number
      apply_date: Date
      status: $Enums.PositionStatus
    }, ExtArgs["result"]["positionApplied"]>
    composites: {}
  }

  type PositionAppliedGetPayload<S extends boolean | null | undefined | PositionAppliedDefaultArgs> = $Result.GetResult<Prisma.$PositionAppliedPayload, S>

  type PositionAppliedCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PositionAppliedFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PositionAppliedCountAggregateInputType | true
    }

  export interface PositionAppliedDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PositionApplied'], meta: { name: 'PositionApplied' } }
    /**
     * Find zero or one PositionApplied that matches the filter.
     * @param {PositionAppliedFindUniqueArgs} args - Arguments to find a PositionApplied
     * @example
     * // Get one PositionApplied
     * const positionApplied = await prisma.positionApplied.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PositionAppliedFindUniqueArgs>(args: SelectSubset<T, PositionAppliedFindUniqueArgs<ExtArgs>>): Prisma__PositionAppliedClient<$Result.GetResult<Prisma.$PositionAppliedPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PositionApplied that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PositionAppliedFindUniqueOrThrowArgs} args - Arguments to find a PositionApplied
     * @example
     * // Get one PositionApplied
     * const positionApplied = await prisma.positionApplied.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PositionAppliedFindUniqueOrThrowArgs>(args: SelectSubset<T, PositionAppliedFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PositionAppliedClient<$Result.GetResult<Prisma.$PositionAppliedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PositionApplied that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionAppliedFindFirstArgs} args - Arguments to find a PositionApplied
     * @example
     * // Get one PositionApplied
     * const positionApplied = await prisma.positionApplied.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PositionAppliedFindFirstArgs>(args?: SelectSubset<T, PositionAppliedFindFirstArgs<ExtArgs>>): Prisma__PositionAppliedClient<$Result.GetResult<Prisma.$PositionAppliedPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PositionApplied that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionAppliedFindFirstOrThrowArgs} args - Arguments to find a PositionApplied
     * @example
     * // Get one PositionApplied
     * const positionApplied = await prisma.positionApplied.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PositionAppliedFindFirstOrThrowArgs>(args?: SelectSubset<T, PositionAppliedFindFirstOrThrowArgs<ExtArgs>>): Prisma__PositionAppliedClient<$Result.GetResult<Prisma.$PositionAppliedPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PositionApplieds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionAppliedFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PositionApplieds
     * const positionApplieds = await prisma.positionApplied.findMany()
     * 
     * // Get first 10 PositionApplieds
     * const positionApplieds = await prisma.positionApplied.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const positionAppliedWithIdOnly = await prisma.positionApplied.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PositionAppliedFindManyArgs>(args?: SelectSubset<T, PositionAppliedFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionAppliedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PositionApplied.
     * @param {PositionAppliedCreateArgs} args - Arguments to create a PositionApplied.
     * @example
     * // Create one PositionApplied
     * const PositionApplied = await prisma.positionApplied.create({
     *   data: {
     *     // ... data to create a PositionApplied
     *   }
     * })
     * 
     */
    create<T extends PositionAppliedCreateArgs>(args: SelectSubset<T, PositionAppliedCreateArgs<ExtArgs>>): Prisma__PositionAppliedClient<$Result.GetResult<Prisma.$PositionAppliedPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PositionApplieds.
     * @param {PositionAppliedCreateManyArgs} args - Arguments to create many PositionApplieds.
     * @example
     * // Create many PositionApplieds
     * const positionApplied = await prisma.positionApplied.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PositionAppliedCreateManyArgs>(args?: SelectSubset<T, PositionAppliedCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PositionApplieds and returns the data saved in the database.
     * @param {PositionAppliedCreateManyAndReturnArgs} args - Arguments to create many PositionApplieds.
     * @example
     * // Create many PositionApplieds
     * const positionApplied = await prisma.positionApplied.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PositionApplieds and only return the `id`
     * const positionAppliedWithIdOnly = await prisma.positionApplied.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PositionAppliedCreateManyAndReturnArgs>(args?: SelectSubset<T, PositionAppliedCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionAppliedPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PositionApplied.
     * @param {PositionAppliedDeleteArgs} args - Arguments to delete one PositionApplied.
     * @example
     * // Delete one PositionApplied
     * const PositionApplied = await prisma.positionApplied.delete({
     *   where: {
     *     // ... filter to delete one PositionApplied
     *   }
     * })
     * 
     */
    delete<T extends PositionAppliedDeleteArgs>(args: SelectSubset<T, PositionAppliedDeleteArgs<ExtArgs>>): Prisma__PositionAppliedClient<$Result.GetResult<Prisma.$PositionAppliedPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PositionApplied.
     * @param {PositionAppliedUpdateArgs} args - Arguments to update one PositionApplied.
     * @example
     * // Update one PositionApplied
     * const positionApplied = await prisma.positionApplied.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PositionAppliedUpdateArgs>(args: SelectSubset<T, PositionAppliedUpdateArgs<ExtArgs>>): Prisma__PositionAppliedClient<$Result.GetResult<Prisma.$PositionAppliedPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PositionApplieds.
     * @param {PositionAppliedDeleteManyArgs} args - Arguments to filter PositionApplieds to delete.
     * @example
     * // Delete a few PositionApplieds
     * const { count } = await prisma.positionApplied.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PositionAppliedDeleteManyArgs>(args?: SelectSubset<T, PositionAppliedDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PositionApplieds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionAppliedUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PositionApplieds
     * const positionApplied = await prisma.positionApplied.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PositionAppliedUpdateManyArgs>(args: SelectSubset<T, PositionAppliedUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PositionApplieds and returns the data updated in the database.
     * @param {PositionAppliedUpdateManyAndReturnArgs} args - Arguments to update many PositionApplieds.
     * @example
     * // Update many PositionApplieds
     * const positionApplied = await prisma.positionApplied.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PositionApplieds and only return the `id`
     * const positionAppliedWithIdOnly = await prisma.positionApplied.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PositionAppliedUpdateManyAndReturnArgs>(args: SelectSubset<T, PositionAppliedUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PositionAppliedPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PositionApplied.
     * @param {PositionAppliedUpsertArgs} args - Arguments to update or create a PositionApplied.
     * @example
     * // Update or create a PositionApplied
     * const positionApplied = await prisma.positionApplied.upsert({
     *   create: {
     *     // ... data to create a PositionApplied
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PositionApplied we want to update
     *   }
     * })
     */
    upsert<T extends PositionAppliedUpsertArgs>(args: SelectSubset<T, PositionAppliedUpsertArgs<ExtArgs>>): Prisma__PositionAppliedClient<$Result.GetResult<Prisma.$PositionAppliedPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PositionApplieds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionAppliedCountArgs} args - Arguments to filter PositionApplieds to count.
     * @example
     * // Count the number of PositionApplieds
     * const count = await prisma.positionApplied.count({
     *   where: {
     *     // ... the filter for the PositionApplieds we want to count
     *   }
     * })
    **/
    count<T extends PositionAppliedCountArgs>(
      args?: Subset<T, PositionAppliedCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PositionAppliedCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PositionApplied.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionAppliedAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PositionAppliedAggregateArgs>(args: Subset<T, PositionAppliedAggregateArgs>): Prisma.PrismaPromise<GetPositionAppliedAggregateType<T>>

    /**
     * Group by PositionApplied.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionAppliedGroupByArgs} args - Group by arguments.
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
      T extends PositionAppliedGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PositionAppliedGroupByArgs['orderBy'] }
        : { orderBy?: PositionAppliedGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PositionAppliedGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPositionAppliedGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PositionApplied model
   */
  readonly fields: PositionAppliedFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PositionApplied.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PositionAppliedClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    position<T extends AvailablePositionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AvailablePositionDefaultArgs<ExtArgs>>): Prisma__AvailablePositionClient<$Result.GetResult<Prisma.$AvailablePositionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    society<T extends SocietyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SocietyDefaultArgs<ExtArgs>>): Prisma__SocietyClient<$Result.GetResult<Prisma.$SocietyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PositionApplied model
   */
  interface PositionAppliedFieldRefs {
    readonly id: FieldRef<"PositionApplied", 'Int'>
    readonly available_position_id: FieldRef<"PositionApplied", 'Int'>
    readonly society_id: FieldRef<"PositionApplied", 'Int'>
    readonly apply_date: FieldRef<"PositionApplied", 'DateTime'>
    readonly status: FieldRef<"PositionApplied", 'PositionStatus'>
  }
    

  // Custom InputTypes
  /**
   * PositionApplied findUnique
   */
  export type PositionAppliedFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionApplied
     */
    select?: PositionAppliedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionApplied
     */
    omit?: PositionAppliedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionAppliedInclude<ExtArgs> | null
    /**
     * Filter, which PositionApplied to fetch.
     */
    where: PositionAppliedWhereUniqueInput
  }

  /**
   * PositionApplied findUniqueOrThrow
   */
  export type PositionAppliedFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionApplied
     */
    select?: PositionAppliedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionApplied
     */
    omit?: PositionAppliedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionAppliedInclude<ExtArgs> | null
    /**
     * Filter, which PositionApplied to fetch.
     */
    where: PositionAppliedWhereUniqueInput
  }

  /**
   * PositionApplied findFirst
   */
  export type PositionAppliedFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionApplied
     */
    select?: PositionAppliedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionApplied
     */
    omit?: PositionAppliedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionAppliedInclude<ExtArgs> | null
    /**
     * Filter, which PositionApplied to fetch.
     */
    where?: PositionAppliedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PositionApplieds to fetch.
     */
    orderBy?: PositionAppliedOrderByWithRelationInput | PositionAppliedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PositionApplieds.
     */
    cursor?: PositionAppliedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PositionApplieds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PositionApplieds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PositionApplieds.
     */
    distinct?: PositionAppliedScalarFieldEnum | PositionAppliedScalarFieldEnum[]
  }

  /**
   * PositionApplied findFirstOrThrow
   */
  export type PositionAppliedFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionApplied
     */
    select?: PositionAppliedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionApplied
     */
    omit?: PositionAppliedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionAppliedInclude<ExtArgs> | null
    /**
     * Filter, which PositionApplied to fetch.
     */
    where?: PositionAppliedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PositionApplieds to fetch.
     */
    orderBy?: PositionAppliedOrderByWithRelationInput | PositionAppliedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PositionApplieds.
     */
    cursor?: PositionAppliedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PositionApplieds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PositionApplieds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PositionApplieds.
     */
    distinct?: PositionAppliedScalarFieldEnum | PositionAppliedScalarFieldEnum[]
  }

  /**
   * PositionApplied findMany
   */
  export type PositionAppliedFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionApplied
     */
    select?: PositionAppliedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionApplied
     */
    omit?: PositionAppliedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionAppliedInclude<ExtArgs> | null
    /**
     * Filter, which PositionApplieds to fetch.
     */
    where?: PositionAppliedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PositionApplieds to fetch.
     */
    orderBy?: PositionAppliedOrderByWithRelationInput | PositionAppliedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PositionApplieds.
     */
    cursor?: PositionAppliedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PositionApplieds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PositionApplieds.
     */
    skip?: number
    distinct?: PositionAppliedScalarFieldEnum | PositionAppliedScalarFieldEnum[]
  }

  /**
   * PositionApplied create
   */
  export type PositionAppliedCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionApplied
     */
    select?: PositionAppliedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionApplied
     */
    omit?: PositionAppliedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionAppliedInclude<ExtArgs> | null
    /**
     * The data needed to create a PositionApplied.
     */
    data: XOR<PositionAppliedCreateInput, PositionAppliedUncheckedCreateInput>
  }

  /**
   * PositionApplied createMany
   */
  export type PositionAppliedCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PositionApplieds.
     */
    data: PositionAppliedCreateManyInput | PositionAppliedCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PositionApplied createManyAndReturn
   */
  export type PositionAppliedCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionApplied
     */
    select?: PositionAppliedSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PositionApplied
     */
    omit?: PositionAppliedOmit<ExtArgs> | null
    /**
     * The data used to create many PositionApplieds.
     */
    data: PositionAppliedCreateManyInput | PositionAppliedCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionAppliedIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PositionApplied update
   */
  export type PositionAppliedUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionApplied
     */
    select?: PositionAppliedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionApplied
     */
    omit?: PositionAppliedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionAppliedInclude<ExtArgs> | null
    /**
     * The data needed to update a PositionApplied.
     */
    data: XOR<PositionAppliedUpdateInput, PositionAppliedUncheckedUpdateInput>
    /**
     * Choose, which PositionApplied to update.
     */
    where: PositionAppliedWhereUniqueInput
  }

  /**
   * PositionApplied updateMany
   */
  export type PositionAppliedUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PositionApplieds.
     */
    data: XOR<PositionAppliedUpdateManyMutationInput, PositionAppliedUncheckedUpdateManyInput>
    /**
     * Filter which PositionApplieds to update
     */
    where?: PositionAppliedWhereInput
    /**
     * Limit how many PositionApplieds to update.
     */
    limit?: number
  }

  /**
   * PositionApplied updateManyAndReturn
   */
  export type PositionAppliedUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionApplied
     */
    select?: PositionAppliedSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PositionApplied
     */
    omit?: PositionAppliedOmit<ExtArgs> | null
    /**
     * The data used to update PositionApplieds.
     */
    data: XOR<PositionAppliedUpdateManyMutationInput, PositionAppliedUncheckedUpdateManyInput>
    /**
     * Filter which PositionApplieds to update
     */
    where?: PositionAppliedWhereInput
    /**
     * Limit how many PositionApplieds to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionAppliedIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PositionApplied upsert
   */
  export type PositionAppliedUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionApplied
     */
    select?: PositionAppliedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionApplied
     */
    omit?: PositionAppliedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionAppliedInclude<ExtArgs> | null
    /**
     * The filter to search for the PositionApplied to update in case it exists.
     */
    where: PositionAppliedWhereUniqueInput
    /**
     * In case the PositionApplied found by the `where` argument doesn't exist, create a new PositionApplied with this data.
     */
    create: XOR<PositionAppliedCreateInput, PositionAppliedUncheckedCreateInput>
    /**
     * In case the PositionApplied was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PositionAppliedUpdateInput, PositionAppliedUncheckedUpdateInput>
  }

  /**
   * PositionApplied delete
   */
  export type PositionAppliedDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionApplied
     */
    select?: PositionAppliedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionApplied
     */
    omit?: PositionAppliedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionAppliedInclude<ExtArgs> | null
    /**
     * Filter which PositionApplied to delete.
     */
    where: PositionAppliedWhereUniqueInput
  }

  /**
   * PositionApplied deleteMany
   */
  export type PositionAppliedDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PositionApplieds to delete
     */
    where?: PositionAppliedWhereInput
    /**
     * Limit how many PositionApplieds to delete.
     */
    limit?: number
  }

  /**
   * PositionApplied without action
   */
  export type PositionAppliedDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionApplied
     */
    select?: PositionAppliedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PositionApplied
     */
    omit?: PositionAppliedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PositionAppliedInclude<ExtArgs> | null
  }


  /**
   * Model JobEmbedding
   */

  export type AggregateJobEmbedding = {
    _count: JobEmbeddingCountAggregateOutputType | null
    _avg: JobEmbeddingAvgAggregateOutputType | null
    _sum: JobEmbeddingSumAggregateOutputType | null
    _min: JobEmbeddingMinAggregateOutputType | null
    _max: JobEmbeddingMaxAggregateOutputType | null
  }

  export type JobEmbeddingAvgAggregateOutputType = {
    jobId: number | null
  }

  export type JobEmbeddingSumAggregateOutputType = {
    jobId: number | null
  }

  export type JobEmbeddingMinAggregateOutputType = {
    id: string | null
    jobId: number | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobEmbeddingMaxAggregateOutputType = {
    id: string | null
    jobId: number | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobEmbeddingCountAggregateOutputType = {
    id: number
    jobId: number
    embedding: number
    skills: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JobEmbeddingAvgAggregateInputType = {
    jobId?: true
  }

  export type JobEmbeddingSumAggregateInputType = {
    jobId?: true
  }

  export type JobEmbeddingMinAggregateInputType = {
    id?: true
    jobId?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobEmbeddingMaxAggregateInputType = {
    id?: true
    jobId?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobEmbeddingCountAggregateInputType = {
    id?: true
    jobId?: true
    embedding?: true
    skills?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JobEmbeddingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobEmbedding to aggregate.
     */
    where?: JobEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobEmbeddings to fetch.
     */
    orderBy?: JobEmbeddingOrderByWithRelationInput | JobEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobEmbeddings
    **/
    _count?: true | JobEmbeddingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobEmbeddingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobEmbeddingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobEmbeddingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobEmbeddingMaxAggregateInputType
  }

  export type GetJobEmbeddingAggregateType<T extends JobEmbeddingAggregateArgs> = {
        [P in keyof T & keyof AggregateJobEmbedding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobEmbedding[P]>
      : GetScalarType<T[P], AggregateJobEmbedding[P]>
  }




  export type JobEmbeddingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobEmbeddingWhereInput
    orderBy?: JobEmbeddingOrderByWithAggregationInput | JobEmbeddingOrderByWithAggregationInput[]
    by: JobEmbeddingScalarFieldEnum[] | JobEmbeddingScalarFieldEnum
    having?: JobEmbeddingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobEmbeddingCountAggregateInputType | true
    _avg?: JobEmbeddingAvgAggregateInputType
    _sum?: JobEmbeddingSumAggregateInputType
    _min?: JobEmbeddingMinAggregateInputType
    _max?: JobEmbeddingMaxAggregateInputType
  }

  export type JobEmbeddingGroupByOutputType = {
    id: string
    jobId: number
    embedding: JsonValue
    skills: string[]
    description: string
    createdAt: Date
    updatedAt: Date
    _count: JobEmbeddingCountAggregateOutputType | null
    _avg: JobEmbeddingAvgAggregateOutputType | null
    _sum: JobEmbeddingSumAggregateOutputType | null
    _min: JobEmbeddingMinAggregateOutputType | null
    _max: JobEmbeddingMaxAggregateOutputType | null
  }

  type GetJobEmbeddingGroupByPayload<T extends JobEmbeddingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobEmbeddingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobEmbeddingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobEmbeddingGroupByOutputType[P]>
            : GetScalarType<T[P], JobEmbeddingGroupByOutputType[P]>
        }
      >
    >


  export type JobEmbeddingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    embedding?: boolean
    skills?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    job?: boolean | AvailablePositionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobEmbedding"]>

  export type JobEmbeddingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    embedding?: boolean
    skills?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    job?: boolean | AvailablePositionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobEmbedding"]>

  export type JobEmbeddingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    embedding?: boolean
    skills?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    job?: boolean | AvailablePositionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobEmbedding"]>

  export type JobEmbeddingSelectScalar = {
    id?: boolean
    jobId?: boolean
    embedding?: boolean
    skills?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JobEmbeddingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "jobId" | "embedding" | "skills" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["jobEmbedding"]>
  export type JobEmbeddingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | AvailablePositionDefaultArgs<ExtArgs>
  }
  export type JobEmbeddingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | AvailablePositionDefaultArgs<ExtArgs>
  }
  export type JobEmbeddingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | AvailablePositionDefaultArgs<ExtArgs>
  }

  export type $JobEmbeddingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobEmbedding"
    objects: {
      job: Prisma.$AvailablePositionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jobId: number
      embedding: Prisma.JsonValue
      skills: string[]
      description: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["jobEmbedding"]>
    composites: {}
  }

  type JobEmbeddingGetPayload<S extends boolean | null | undefined | JobEmbeddingDefaultArgs> = $Result.GetResult<Prisma.$JobEmbeddingPayload, S>

  type JobEmbeddingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobEmbeddingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobEmbeddingCountAggregateInputType | true
    }

  export interface JobEmbeddingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobEmbedding'], meta: { name: 'JobEmbedding' } }
    /**
     * Find zero or one JobEmbedding that matches the filter.
     * @param {JobEmbeddingFindUniqueArgs} args - Arguments to find a JobEmbedding
     * @example
     * // Get one JobEmbedding
     * const jobEmbedding = await prisma.jobEmbedding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobEmbeddingFindUniqueArgs>(args: SelectSubset<T, JobEmbeddingFindUniqueArgs<ExtArgs>>): Prisma__JobEmbeddingClient<$Result.GetResult<Prisma.$JobEmbeddingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobEmbedding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobEmbeddingFindUniqueOrThrowArgs} args - Arguments to find a JobEmbedding
     * @example
     * // Get one JobEmbedding
     * const jobEmbedding = await prisma.jobEmbedding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobEmbeddingFindUniqueOrThrowArgs>(args: SelectSubset<T, JobEmbeddingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobEmbeddingClient<$Result.GetResult<Prisma.$JobEmbeddingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobEmbedding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobEmbeddingFindFirstArgs} args - Arguments to find a JobEmbedding
     * @example
     * // Get one JobEmbedding
     * const jobEmbedding = await prisma.jobEmbedding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobEmbeddingFindFirstArgs>(args?: SelectSubset<T, JobEmbeddingFindFirstArgs<ExtArgs>>): Prisma__JobEmbeddingClient<$Result.GetResult<Prisma.$JobEmbeddingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobEmbedding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobEmbeddingFindFirstOrThrowArgs} args - Arguments to find a JobEmbedding
     * @example
     * // Get one JobEmbedding
     * const jobEmbedding = await prisma.jobEmbedding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobEmbeddingFindFirstOrThrowArgs>(args?: SelectSubset<T, JobEmbeddingFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobEmbeddingClient<$Result.GetResult<Prisma.$JobEmbeddingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobEmbeddings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobEmbeddingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobEmbeddings
     * const jobEmbeddings = await prisma.jobEmbedding.findMany()
     * 
     * // Get first 10 JobEmbeddings
     * const jobEmbeddings = await prisma.jobEmbedding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobEmbeddingWithIdOnly = await prisma.jobEmbedding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobEmbeddingFindManyArgs>(args?: SelectSubset<T, JobEmbeddingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobEmbeddingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobEmbedding.
     * @param {JobEmbeddingCreateArgs} args - Arguments to create a JobEmbedding.
     * @example
     * // Create one JobEmbedding
     * const JobEmbedding = await prisma.jobEmbedding.create({
     *   data: {
     *     // ... data to create a JobEmbedding
     *   }
     * })
     * 
     */
    create<T extends JobEmbeddingCreateArgs>(args: SelectSubset<T, JobEmbeddingCreateArgs<ExtArgs>>): Prisma__JobEmbeddingClient<$Result.GetResult<Prisma.$JobEmbeddingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobEmbeddings.
     * @param {JobEmbeddingCreateManyArgs} args - Arguments to create many JobEmbeddings.
     * @example
     * // Create many JobEmbeddings
     * const jobEmbedding = await prisma.jobEmbedding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobEmbeddingCreateManyArgs>(args?: SelectSubset<T, JobEmbeddingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobEmbeddings and returns the data saved in the database.
     * @param {JobEmbeddingCreateManyAndReturnArgs} args - Arguments to create many JobEmbeddings.
     * @example
     * // Create many JobEmbeddings
     * const jobEmbedding = await prisma.jobEmbedding.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobEmbeddings and only return the `id`
     * const jobEmbeddingWithIdOnly = await prisma.jobEmbedding.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobEmbeddingCreateManyAndReturnArgs>(args?: SelectSubset<T, JobEmbeddingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobEmbeddingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JobEmbedding.
     * @param {JobEmbeddingDeleteArgs} args - Arguments to delete one JobEmbedding.
     * @example
     * // Delete one JobEmbedding
     * const JobEmbedding = await prisma.jobEmbedding.delete({
     *   where: {
     *     // ... filter to delete one JobEmbedding
     *   }
     * })
     * 
     */
    delete<T extends JobEmbeddingDeleteArgs>(args: SelectSubset<T, JobEmbeddingDeleteArgs<ExtArgs>>): Prisma__JobEmbeddingClient<$Result.GetResult<Prisma.$JobEmbeddingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobEmbedding.
     * @param {JobEmbeddingUpdateArgs} args - Arguments to update one JobEmbedding.
     * @example
     * // Update one JobEmbedding
     * const jobEmbedding = await prisma.jobEmbedding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobEmbeddingUpdateArgs>(args: SelectSubset<T, JobEmbeddingUpdateArgs<ExtArgs>>): Prisma__JobEmbeddingClient<$Result.GetResult<Prisma.$JobEmbeddingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobEmbeddings.
     * @param {JobEmbeddingDeleteManyArgs} args - Arguments to filter JobEmbeddings to delete.
     * @example
     * // Delete a few JobEmbeddings
     * const { count } = await prisma.jobEmbedding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobEmbeddingDeleteManyArgs>(args?: SelectSubset<T, JobEmbeddingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobEmbeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobEmbeddingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobEmbeddings
     * const jobEmbedding = await prisma.jobEmbedding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobEmbeddingUpdateManyArgs>(args: SelectSubset<T, JobEmbeddingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobEmbeddings and returns the data updated in the database.
     * @param {JobEmbeddingUpdateManyAndReturnArgs} args - Arguments to update many JobEmbeddings.
     * @example
     * // Update many JobEmbeddings
     * const jobEmbedding = await prisma.jobEmbedding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JobEmbeddings and only return the `id`
     * const jobEmbeddingWithIdOnly = await prisma.jobEmbedding.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JobEmbeddingUpdateManyAndReturnArgs>(args: SelectSubset<T, JobEmbeddingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobEmbeddingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JobEmbedding.
     * @param {JobEmbeddingUpsertArgs} args - Arguments to update or create a JobEmbedding.
     * @example
     * // Update or create a JobEmbedding
     * const jobEmbedding = await prisma.jobEmbedding.upsert({
     *   create: {
     *     // ... data to create a JobEmbedding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobEmbedding we want to update
     *   }
     * })
     */
    upsert<T extends JobEmbeddingUpsertArgs>(args: SelectSubset<T, JobEmbeddingUpsertArgs<ExtArgs>>): Prisma__JobEmbeddingClient<$Result.GetResult<Prisma.$JobEmbeddingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobEmbeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobEmbeddingCountArgs} args - Arguments to filter JobEmbeddings to count.
     * @example
     * // Count the number of JobEmbeddings
     * const count = await prisma.jobEmbedding.count({
     *   where: {
     *     // ... the filter for the JobEmbeddings we want to count
     *   }
     * })
    **/
    count<T extends JobEmbeddingCountArgs>(
      args?: Subset<T, JobEmbeddingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobEmbeddingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobEmbedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobEmbeddingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JobEmbeddingAggregateArgs>(args: Subset<T, JobEmbeddingAggregateArgs>): Prisma.PrismaPromise<GetJobEmbeddingAggregateType<T>>

    /**
     * Group by JobEmbedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobEmbeddingGroupByArgs} args - Group by arguments.
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
      T extends JobEmbeddingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobEmbeddingGroupByArgs['orderBy'] }
        : { orderBy?: JobEmbeddingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JobEmbeddingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobEmbeddingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobEmbedding model
   */
  readonly fields: JobEmbeddingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobEmbedding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobEmbeddingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job<T extends AvailablePositionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AvailablePositionDefaultArgs<ExtArgs>>): Prisma__AvailablePositionClient<$Result.GetResult<Prisma.$AvailablePositionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobEmbedding model
   */
  interface JobEmbeddingFieldRefs {
    readonly id: FieldRef<"JobEmbedding", 'String'>
    readonly jobId: FieldRef<"JobEmbedding", 'Int'>
    readonly embedding: FieldRef<"JobEmbedding", 'Json'>
    readonly skills: FieldRef<"JobEmbedding", 'String[]'>
    readonly description: FieldRef<"JobEmbedding", 'String'>
    readonly createdAt: FieldRef<"JobEmbedding", 'DateTime'>
    readonly updatedAt: FieldRef<"JobEmbedding", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JobEmbedding findUnique
   */
  export type JobEmbeddingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEmbedding
     */
    select?: JobEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEmbedding
     */
    omit?: JobEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which JobEmbedding to fetch.
     */
    where: JobEmbeddingWhereUniqueInput
  }

  /**
   * JobEmbedding findUniqueOrThrow
   */
  export type JobEmbeddingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEmbedding
     */
    select?: JobEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEmbedding
     */
    omit?: JobEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which JobEmbedding to fetch.
     */
    where: JobEmbeddingWhereUniqueInput
  }

  /**
   * JobEmbedding findFirst
   */
  export type JobEmbeddingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEmbedding
     */
    select?: JobEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEmbedding
     */
    omit?: JobEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which JobEmbedding to fetch.
     */
    where?: JobEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobEmbeddings to fetch.
     */
    orderBy?: JobEmbeddingOrderByWithRelationInput | JobEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobEmbeddings.
     */
    cursor?: JobEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobEmbeddings.
     */
    distinct?: JobEmbeddingScalarFieldEnum | JobEmbeddingScalarFieldEnum[]
  }

  /**
   * JobEmbedding findFirstOrThrow
   */
  export type JobEmbeddingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEmbedding
     */
    select?: JobEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEmbedding
     */
    omit?: JobEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which JobEmbedding to fetch.
     */
    where?: JobEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobEmbeddings to fetch.
     */
    orderBy?: JobEmbeddingOrderByWithRelationInput | JobEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobEmbeddings.
     */
    cursor?: JobEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobEmbeddings.
     */
    distinct?: JobEmbeddingScalarFieldEnum | JobEmbeddingScalarFieldEnum[]
  }

  /**
   * JobEmbedding findMany
   */
  export type JobEmbeddingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEmbedding
     */
    select?: JobEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEmbedding
     */
    omit?: JobEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which JobEmbeddings to fetch.
     */
    where?: JobEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobEmbeddings to fetch.
     */
    orderBy?: JobEmbeddingOrderByWithRelationInput | JobEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobEmbeddings.
     */
    cursor?: JobEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobEmbeddings.
     */
    skip?: number
    distinct?: JobEmbeddingScalarFieldEnum | JobEmbeddingScalarFieldEnum[]
  }

  /**
   * JobEmbedding create
   */
  export type JobEmbeddingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEmbedding
     */
    select?: JobEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEmbedding
     */
    omit?: JobEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEmbeddingInclude<ExtArgs> | null
    /**
     * The data needed to create a JobEmbedding.
     */
    data: XOR<JobEmbeddingCreateInput, JobEmbeddingUncheckedCreateInput>
  }

  /**
   * JobEmbedding createMany
   */
  export type JobEmbeddingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobEmbeddings.
     */
    data: JobEmbeddingCreateManyInput | JobEmbeddingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobEmbedding createManyAndReturn
   */
  export type JobEmbeddingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEmbedding
     */
    select?: JobEmbeddingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobEmbedding
     */
    omit?: JobEmbeddingOmit<ExtArgs> | null
    /**
     * The data used to create many JobEmbeddings.
     */
    data: JobEmbeddingCreateManyInput | JobEmbeddingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEmbeddingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobEmbedding update
   */
  export type JobEmbeddingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEmbedding
     */
    select?: JobEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEmbedding
     */
    omit?: JobEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEmbeddingInclude<ExtArgs> | null
    /**
     * The data needed to update a JobEmbedding.
     */
    data: XOR<JobEmbeddingUpdateInput, JobEmbeddingUncheckedUpdateInput>
    /**
     * Choose, which JobEmbedding to update.
     */
    where: JobEmbeddingWhereUniqueInput
  }

  /**
   * JobEmbedding updateMany
   */
  export type JobEmbeddingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobEmbeddings.
     */
    data: XOR<JobEmbeddingUpdateManyMutationInput, JobEmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which JobEmbeddings to update
     */
    where?: JobEmbeddingWhereInput
    /**
     * Limit how many JobEmbeddings to update.
     */
    limit?: number
  }

  /**
   * JobEmbedding updateManyAndReturn
   */
  export type JobEmbeddingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEmbedding
     */
    select?: JobEmbeddingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobEmbedding
     */
    omit?: JobEmbeddingOmit<ExtArgs> | null
    /**
     * The data used to update JobEmbeddings.
     */
    data: XOR<JobEmbeddingUpdateManyMutationInput, JobEmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which JobEmbeddings to update
     */
    where?: JobEmbeddingWhereInput
    /**
     * Limit how many JobEmbeddings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEmbeddingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobEmbedding upsert
   */
  export type JobEmbeddingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEmbedding
     */
    select?: JobEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEmbedding
     */
    omit?: JobEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEmbeddingInclude<ExtArgs> | null
    /**
     * The filter to search for the JobEmbedding to update in case it exists.
     */
    where: JobEmbeddingWhereUniqueInput
    /**
     * In case the JobEmbedding found by the `where` argument doesn't exist, create a new JobEmbedding with this data.
     */
    create: XOR<JobEmbeddingCreateInput, JobEmbeddingUncheckedCreateInput>
    /**
     * In case the JobEmbedding was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobEmbeddingUpdateInput, JobEmbeddingUncheckedUpdateInput>
  }

  /**
   * JobEmbedding delete
   */
  export type JobEmbeddingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEmbedding
     */
    select?: JobEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEmbedding
     */
    omit?: JobEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEmbeddingInclude<ExtArgs> | null
    /**
     * Filter which JobEmbedding to delete.
     */
    where: JobEmbeddingWhereUniqueInput
  }

  /**
   * JobEmbedding deleteMany
   */
  export type JobEmbeddingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobEmbeddings to delete
     */
    where?: JobEmbeddingWhereInput
    /**
     * Limit how many JobEmbeddings to delete.
     */
    limit?: number
  }

  /**
   * JobEmbedding without action
   */
  export type JobEmbeddingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobEmbedding
     */
    select?: JobEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobEmbedding
     */
    omit?: JobEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobEmbeddingInclude<ExtArgs> | null
  }


  /**
   * Model PortfolioEmbedding
   */

  export type AggregatePortfolioEmbedding = {
    _count: PortfolioEmbeddingCountAggregateOutputType | null
    _avg: PortfolioEmbeddingAvgAggregateOutputType | null
    _sum: PortfolioEmbeddingSumAggregateOutputType | null
    _min: PortfolioEmbeddingMinAggregateOutputType | null
    _max: PortfolioEmbeddingMaxAggregateOutputType | null
  }

  export type PortfolioEmbeddingAvgAggregateOutputType = {
    portfolioId: number | null
  }

  export type PortfolioEmbeddingSumAggregateOutputType = {
    portfolioId: number | null
  }

  export type PortfolioEmbeddingMinAggregateOutputType = {
    id: string | null
    portfolioId: number | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortfolioEmbeddingMaxAggregateOutputType = {
    id: string | null
    portfolioId: number | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortfolioEmbeddingCountAggregateOutputType = {
    id: number
    portfolioId: number
    embedding: number
    skills: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PortfolioEmbeddingAvgAggregateInputType = {
    portfolioId?: true
  }

  export type PortfolioEmbeddingSumAggregateInputType = {
    portfolioId?: true
  }

  export type PortfolioEmbeddingMinAggregateInputType = {
    id?: true
    portfolioId?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortfolioEmbeddingMaxAggregateInputType = {
    id?: true
    portfolioId?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortfolioEmbeddingCountAggregateInputType = {
    id?: true
    portfolioId?: true
    embedding?: true
    skills?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PortfolioEmbeddingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortfolioEmbedding to aggregate.
     */
    where?: PortfolioEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioEmbeddings to fetch.
     */
    orderBy?: PortfolioEmbeddingOrderByWithRelationInput | PortfolioEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortfolioEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PortfolioEmbeddings
    **/
    _count?: true | PortfolioEmbeddingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PortfolioEmbeddingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PortfolioEmbeddingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortfolioEmbeddingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortfolioEmbeddingMaxAggregateInputType
  }

  export type GetPortfolioEmbeddingAggregateType<T extends PortfolioEmbeddingAggregateArgs> = {
        [P in keyof T & keyof AggregatePortfolioEmbedding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortfolioEmbedding[P]>
      : GetScalarType<T[P], AggregatePortfolioEmbedding[P]>
  }




  export type PortfolioEmbeddingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioEmbeddingWhereInput
    orderBy?: PortfolioEmbeddingOrderByWithAggregationInput | PortfolioEmbeddingOrderByWithAggregationInput[]
    by: PortfolioEmbeddingScalarFieldEnum[] | PortfolioEmbeddingScalarFieldEnum
    having?: PortfolioEmbeddingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortfolioEmbeddingCountAggregateInputType | true
    _avg?: PortfolioEmbeddingAvgAggregateInputType
    _sum?: PortfolioEmbeddingSumAggregateInputType
    _min?: PortfolioEmbeddingMinAggregateInputType
    _max?: PortfolioEmbeddingMaxAggregateInputType
  }

  export type PortfolioEmbeddingGroupByOutputType = {
    id: string
    portfolioId: number
    embedding: JsonValue
    skills: string[]
    description: string
    createdAt: Date
    updatedAt: Date
    _count: PortfolioEmbeddingCountAggregateOutputType | null
    _avg: PortfolioEmbeddingAvgAggregateOutputType | null
    _sum: PortfolioEmbeddingSumAggregateOutputType | null
    _min: PortfolioEmbeddingMinAggregateOutputType | null
    _max: PortfolioEmbeddingMaxAggregateOutputType | null
  }

  type GetPortfolioEmbeddingGroupByPayload<T extends PortfolioEmbeddingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortfolioEmbeddingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortfolioEmbeddingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortfolioEmbeddingGroupByOutputType[P]>
            : GetScalarType<T[P], PortfolioEmbeddingGroupByOutputType[P]>
        }
      >
    >


  export type PortfolioEmbeddingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolioId?: boolean
    embedding?: boolean
    skills?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    portfolio?: boolean | PortofolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolioEmbedding"]>

  export type PortfolioEmbeddingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolioId?: boolean
    embedding?: boolean
    skills?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    portfolio?: boolean | PortofolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolioEmbedding"]>

  export type PortfolioEmbeddingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolioId?: boolean
    embedding?: boolean
    skills?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    portfolio?: boolean | PortofolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolioEmbedding"]>

  export type PortfolioEmbeddingSelectScalar = {
    id?: boolean
    portfolioId?: boolean
    embedding?: boolean
    skills?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PortfolioEmbeddingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "portfolioId" | "embedding" | "skills" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["portfolioEmbedding"]>
  export type PortfolioEmbeddingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortofolioDefaultArgs<ExtArgs>
  }
  export type PortfolioEmbeddingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortofolioDefaultArgs<ExtArgs>
  }
  export type PortfolioEmbeddingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortofolioDefaultArgs<ExtArgs>
  }

  export type $PortfolioEmbeddingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PortfolioEmbedding"
    objects: {
      portfolio: Prisma.$PortofolioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      portfolioId: number
      embedding: Prisma.JsonValue
      skills: string[]
      description: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["portfolioEmbedding"]>
    composites: {}
  }

  type PortfolioEmbeddingGetPayload<S extends boolean | null | undefined | PortfolioEmbeddingDefaultArgs> = $Result.GetResult<Prisma.$PortfolioEmbeddingPayload, S>

  type PortfolioEmbeddingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PortfolioEmbeddingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PortfolioEmbeddingCountAggregateInputType | true
    }

  export interface PortfolioEmbeddingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PortfolioEmbedding'], meta: { name: 'PortfolioEmbedding' } }
    /**
     * Find zero or one PortfolioEmbedding that matches the filter.
     * @param {PortfolioEmbeddingFindUniqueArgs} args - Arguments to find a PortfolioEmbedding
     * @example
     * // Get one PortfolioEmbedding
     * const portfolioEmbedding = await prisma.portfolioEmbedding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortfolioEmbeddingFindUniqueArgs>(args: SelectSubset<T, PortfolioEmbeddingFindUniqueArgs<ExtArgs>>): Prisma__PortfolioEmbeddingClient<$Result.GetResult<Prisma.$PortfolioEmbeddingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PortfolioEmbedding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PortfolioEmbeddingFindUniqueOrThrowArgs} args - Arguments to find a PortfolioEmbedding
     * @example
     * // Get one PortfolioEmbedding
     * const portfolioEmbedding = await prisma.portfolioEmbedding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortfolioEmbeddingFindUniqueOrThrowArgs>(args: SelectSubset<T, PortfolioEmbeddingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortfolioEmbeddingClient<$Result.GetResult<Prisma.$PortfolioEmbeddingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PortfolioEmbedding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioEmbeddingFindFirstArgs} args - Arguments to find a PortfolioEmbedding
     * @example
     * // Get one PortfolioEmbedding
     * const portfolioEmbedding = await prisma.portfolioEmbedding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortfolioEmbeddingFindFirstArgs>(args?: SelectSubset<T, PortfolioEmbeddingFindFirstArgs<ExtArgs>>): Prisma__PortfolioEmbeddingClient<$Result.GetResult<Prisma.$PortfolioEmbeddingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PortfolioEmbedding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioEmbeddingFindFirstOrThrowArgs} args - Arguments to find a PortfolioEmbedding
     * @example
     * // Get one PortfolioEmbedding
     * const portfolioEmbedding = await prisma.portfolioEmbedding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortfolioEmbeddingFindFirstOrThrowArgs>(args?: SelectSubset<T, PortfolioEmbeddingFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortfolioEmbeddingClient<$Result.GetResult<Prisma.$PortfolioEmbeddingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PortfolioEmbeddings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioEmbeddingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PortfolioEmbeddings
     * const portfolioEmbeddings = await prisma.portfolioEmbedding.findMany()
     * 
     * // Get first 10 PortfolioEmbeddings
     * const portfolioEmbeddings = await prisma.portfolioEmbedding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portfolioEmbeddingWithIdOnly = await prisma.portfolioEmbedding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortfolioEmbeddingFindManyArgs>(args?: SelectSubset<T, PortfolioEmbeddingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioEmbeddingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PortfolioEmbedding.
     * @param {PortfolioEmbeddingCreateArgs} args - Arguments to create a PortfolioEmbedding.
     * @example
     * // Create one PortfolioEmbedding
     * const PortfolioEmbedding = await prisma.portfolioEmbedding.create({
     *   data: {
     *     // ... data to create a PortfolioEmbedding
     *   }
     * })
     * 
     */
    create<T extends PortfolioEmbeddingCreateArgs>(args: SelectSubset<T, PortfolioEmbeddingCreateArgs<ExtArgs>>): Prisma__PortfolioEmbeddingClient<$Result.GetResult<Prisma.$PortfolioEmbeddingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PortfolioEmbeddings.
     * @param {PortfolioEmbeddingCreateManyArgs} args - Arguments to create many PortfolioEmbeddings.
     * @example
     * // Create many PortfolioEmbeddings
     * const portfolioEmbedding = await prisma.portfolioEmbedding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortfolioEmbeddingCreateManyArgs>(args?: SelectSubset<T, PortfolioEmbeddingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PortfolioEmbeddings and returns the data saved in the database.
     * @param {PortfolioEmbeddingCreateManyAndReturnArgs} args - Arguments to create many PortfolioEmbeddings.
     * @example
     * // Create many PortfolioEmbeddings
     * const portfolioEmbedding = await prisma.portfolioEmbedding.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PortfolioEmbeddings and only return the `id`
     * const portfolioEmbeddingWithIdOnly = await prisma.portfolioEmbedding.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PortfolioEmbeddingCreateManyAndReturnArgs>(args?: SelectSubset<T, PortfolioEmbeddingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioEmbeddingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PortfolioEmbedding.
     * @param {PortfolioEmbeddingDeleteArgs} args - Arguments to delete one PortfolioEmbedding.
     * @example
     * // Delete one PortfolioEmbedding
     * const PortfolioEmbedding = await prisma.portfolioEmbedding.delete({
     *   where: {
     *     // ... filter to delete one PortfolioEmbedding
     *   }
     * })
     * 
     */
    delete<T extends PortfolioEmbeddingDeleteArgs>(args: SelectSubset<T, PortfolioEmbeddingDeleteArgs<ExtArgs>>): Prisma__PortfolioEmbeddingClient<$Result.GetResult<Prisma.$PortfolioEmbeddingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PortfolioEmbedding.
     * @param {PortfolioEmbeddingUpdateArgs} args - Arguments to update one PortfolioEmbedding.
     * @example
     * // Update one PortfolioEmbedding
     * const portfolioEmbedding = await prisma.portfolioEmbedding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortfolioEmbeddingUpdateArgs>(args: SelectSubset<T, PortfolioEmbeddingUpdateArgs<ExtArgs>>): Prisma__PortfolioEmbeddingClient<$Result.GetResult<Prisma.$PortfolioEmbeddingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PortfolioEmbeddings.
     * @param {PortfolioEmbeddingDeleteManyArgs} args - Arguments to filter PortfolioEmbeddings to delete.
     * @example
     * // Delete a few PortfolioEmbeddings
     * const { count } = await prisma.portfolioEmbedding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortfolioEmbeddingDeleteManyArgs>(args?: SelectSubset<T, PortfolioEmbeddingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PortfolioEmbeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioEmbeddingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PortfolioEmbeddings
     * const portfolioEmbedding = await prisma.portfolioEmbedding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortfolioEmbeddingUpdateManyArgs>(args: SelectSubset<T, PortfolioEmbeddingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PortfolioEmbeddings and returns the data updated in the database.
     * @param {PortfolioEmbeddingUpdateManyAndReturnArgs} args - Arguments to update many PortfolioEmbeddings.
     * @example
     * // Update many PortfolioEmbeddings
     * const portfolioEmbedding = await prisma.portfolioEmbedding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PortfolioEmbeddings and only return the `id`
     * const portfolioEmbeddingWithIdOnly = await prisma.portfolioEmbedding.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PortfolioEmbeddingUpdateManyAndReturnArgs>(args: SelectSubset<T, PortfolioEmbeddingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioEmbeddingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PortfolioEmbedding.
     * @param {PortfolioEmbeddingUpsertArgs} args - Arguments to update or create a PortfolioEmbedding.
     * @example
     * // Update or create a PortfolioEmbedding
     * const portfolioEmbedding = await prisma.portfolioEmbedding.upsert({
     *   create: {
     *     // ... data to create a PortfolioEmbedding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PortfolioEmbedding we want to update
     *   }
     * })
     */
    upsert<T extends PortfolioEmbeddingUpsertArgs>(args: SelectSubset<T, PortfolioEmbeddingUpsertArgs<ExtArgs>>): Prisma__PortfolioEmbeddingClient<$Result.GetResult<Prisma.$PortfolioEmbeddingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PortfolioEmbeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioEmbeddingCountArgs} args - Arguments to filter PortfolioEmbeddings to count.
     * @example
     * // Count the number of PortfolioEmbeddings
     * const count = await prisma.portfolioEmbedding.count({
     *   where: {
     *     // ... the filter for the PortfolioEmbeddings we want to count
     *   }
     * })
    **/
    count<T extends PortfolioEmbeddingCountArgs>(
      args?: Subset<T, PortfolioEmbeddingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortfolioEmbeddingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PortfolioEmbedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioEmbeddingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PortfolioEmbeddingAggregateArgs>(args: Subset<T, PortfolioEmbeddingAggregateArgs>): Prisma.PrismaPromise<GetPortfolioEmbeddingAggregateType<T>>

    /**
     * Group by PortfolioEmbedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioEmbeddingGroupByArgs} args - Group by arguments.
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
      T extends PortfolioEmbeddingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortfolioEmbeddingGroupByArgs['orderBy'] }
        : { orderBy?: PortfolioEmbeddingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PortfolioEmbeddingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortfolioEmbeddingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PortfolioEmbedding model
   */
  readonly fields: PortfolioEmbeddingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PortfolioEmbedding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortfolioEmbeddingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    portfolio<T extends PortofolioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PortofolioDefaultArgs<ExtArgs>>): Prisma__PortofolioClient<$Result.GetResult<Prisma.$PortofolioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PortfolioEmbedding model
   */
  interface PortfolioEmbeddingFieldRefs {
    readonly id: FieldRef<"PortfolioEmbedding", 'String'>
    readonly portfolioId: FieldRef<"PortfolioEmbedding", 'Int'>
    readonly embedding: FieldRef<"PortfolioEmbedding", 'Json'>
    readonly skills: FieldRef<"PortfolioEmbedding", 'String[]'>
    readonly description: FieldRef<"PortfolioEmbedding", 'String'>
    readonly createdAt: FieldRef<"PortfolioEmbedding", 'DateTime'>
    readonly updatedAt: FieldRef<"PortfolioEmbedding", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PortfolioEmbedding findUnique
   */
  export type PortfolioEmbeddingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioEmbedding
     */
    select?: PortfolioEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioEmbedding
     */
    omit?: PortfolioEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which PortfolioEmbedding to fetch.
     */
    where: PortfolioEmbeddingWhereUniqueInput
  }

  /**
   * PortfolioEmbedding findUniqueOrThrow
   */
  export type PortfolioEmbeddingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioEmbedding
     */
    select?: PortfolioEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioEmbedding
     */
    omit?: PortfolioEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which PortfolioEmbedding to fetch.
     */
    where: PortfolioEmbeddingWhereUniqueInput
  }

  /**
   * PortfolioEmbedding findFirst
   */
  export type PortfolioEmbeddingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioEmbedding
     */
    select?: PortfolioEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioEmbedding
     */
    omit?: PortfolioEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which PortfolioEmbedding to fetch.
     */
    where?: PortfolioEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioEmbeddings to fetch.
     */
    orderBy?: PortfolioEmbeddingOrderByWithRelationInput | PortfolioEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortfolioEmbeddings.
     */
    cursor?: PortfolioEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortfolioEmbeddings.
     */
    distinct?: PortfolioEmbeddingScalarFieldEnum | PortfolioEmbeddingScalarFieldEnum[]
  }

  /**
   * PortfolioEmbedding findFirstOrThrow
   */
  export type PortfolioEmbeddingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioEmbedding
     */
    select?: PortfolioEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioEmbedding
     */
    omit?: PortfolioEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which PortfolioEmbedding to fetch.
     */
    where?: PortfolioEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioEmbeddings to fetch.
     */
    orderBy?: PortfolioEmbeddingOrderByWithRelationInput | PortfolioEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortfolioEmbeddings.
     */
    cursor?: PortfolioEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortfolioEmbeddings.
     */
    distinct?: PortfolioEmbeddingScalarFieldEnum | PortfolioEmbeddingScalarFieldEnum[]
  }

  /**
   * PortfolioEmbedding findMany
   */
  export type PortfolioEmbeddingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioEmbedding
     */
    select?: PortfolioEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioEmbedding
     */
    omit?: PortfolioEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which PortfolioEmbeddings to fetch.
     */
    where?: PortfolioEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioEmbeddings to fetch.
     */
    orderBy?: PortfolioEmbeddingOrderByWithRelationInput | PortfolioEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PortfolioEmbeddings.
     */
    cursor?: PortfolioEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioEmbeddings.
     */
    skip?: number
    distinct?: PortfolioEmbeddingScalarFieldEnum | PortfolioEmbeddingScalarFieldEnum[]
  }

  /**
   * PortfolioEmbedding create
   */
  export type PortfolioEmbeddingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioEmbedding
     */
    select?: PortfolioEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioEmbedding
     */
    omit?: PortfolioEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioEmbeddingInclude<ExtArgs> | null
    /**
     * The data needed to create a PortfolioEmbedding.
     */
    data: XOR<PortfolioEmbeddingCreateInput, PortfolioEmbeddingUncheckedCreateInput>
  }

  /**
   * PortfolioEmbedding createMany
   */
  export type PortfolioEmbeddingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PortfolioEmbeddings.
     */
    data: PortfolioEmbeddingCreateManyInput | PortfolioEmbeddingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PortfolioEmbedding createManyAndReturn
   */
  export type PortfolioEmbeddingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioEmbedding
     */
    select?: PortfolioEmbeddingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioEmbedding
     */
    omit?: PortfolioEmbeddingOmit<ExtArgs> | null
    /**
     * The data used to create many PortfolioEmbeddings.
     */
    data: PortfolioEmbeddingCreateManyInput | PortfolioEmbeddingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioEmbeddingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PortfolioEmbedding update
   */
  export type PortfolioEmbeddingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioEmbedding
     */
    select?: PortfolioEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioEmbedding
     */
    omit?: PortfolioEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioEmbeddingInclude<ExtArgs> | null
    /**
     * The data needed to update a PortfolioEmbedding.
     */
    data: XOR<PortfolioEmbeddingUpdateInput, PortfolioEmbeddingUncheckedUpdateInput>
    /**
     * Choose, which PortfolioEmbedding to update.
     */
    where: PortfolioEmbeddingWhereUniqueInput
  }

  /**
   * PortfolioEmbedding updateMany
   */
  export type PortfolioEmbeddingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PortfolioEmbeddings.
     */
    data: XOR<PortfolioEmbeddingUpdateManyMutationInput, PortfolioEmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which PortfolioEmbeddings to update
     */
    where?: PortfolioEmbeddingWhereInput
    /**
     * Limit how many PortfolioEmbeddings to update.
     */
    limit?: number
  }

  /**
   * PortfolioEmbedding updateManyAndReturn
   */
  export type PortfolioEmbeddingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioEmbedding
     */
    select?: PortfolioEmbeddingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioEmbedding
     */
    omit?: PortfolioEmbeddingOmit<ExtArgs> | null
    /**
     * The data used to update PortfolioEmbeddings.
     */
    data: XOR<PortfolioEmbeddingUpdateManyMutationInput, PortfolioEmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which PortfolioEmbeddings to update
     */
    where?: PortfolioEmbeddingWhereInput
    /**
     * Limit how many PortfolioEmbeddings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioEmbeddingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PortfolioEmbedding upsert
   */
  export type PortfolioEmbeddingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioEmbedding
     */
    select?: PortfolioEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioEmbedding
     */
    omit?: PortfolioEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioEmbeddingInclude<ExtArgs> | null
    /**
     * The filter to search for the PortfolioEmbedding to update in case it exists.
     */
    where: PortfolioEmbeddingWhereUniqueInput
    /**
     * In case the PortfolioEmbedding found by the `where` argument doesn't exist, create a new PortfolioEmbedding with this data.
     */
    create: XOR<PortfolioEmbeddingCreateInput, PortfolioEmbeddingUncheckedCreateInput>
    /**
     * In case the PortfolioEmbedding was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortfolioEmbeddingUpdateInput, PortfolioEmbeddingUncheckedUpdateInput>
  }

  /**
   * PortfolioEmbedding delete
   */
  export type PortfolioEmbeddingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioEmbedding
     */
    select?: PortfolioEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioEmbedding
     */
    omit?: PortfolioEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioEmbeddingInclude<ExtArgs> | null
    /**
     * Filter which PortfolioEmbedding to delete.
     */
    where: PortfolioEmbeddingWhereUniqueInput
  }

  /**
   * PortfolioEmbedding deleteMany
   */
  export type PortfolioEmbeddingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortfolioEmbeddings to delete
     */
    where?: PortfolioEmbeddingWhereInput
    /**
     * Limit how many PortfolioEmbeddings to delete.
     */
    limit?: number
  }

  /**
   * PortfolioEmbedding without action
   */
  export type PortfolioEmbeddingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioEmbedding
     */
    select?: PortfolioEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioEmbedding
     */
    omit?: PortfolioEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioEmbeddingInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    role: 'role',
    phone: 'phone',
    address: 'address',
    date_of_birth: 'date_of_birth',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    phone: 'phone',
    address: 'address',
    date_of_birth: 'date_of_birth',
    user_id: 'user_id'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const SocietyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    phone: 'phone',
    date_of_birth: 'date_of_birth',
    gender: 'gender',
    user_id: 'user_id'
  };

  export type SocietyScalarFieldEnum = (typeof SocietyScalarFieldEnum)[keyof typeof SocietyScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    phone: 'phone',
    description: 'description',
    user_id: 'user_id'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const AvailablePositionScalarFieldEnum: {
    id: 'id',
    position_name: 'position_name',
    capacity: 'capacity',
    description: 'description',
    submission_start_date: 'submission_start_date',
    submission_end_date: 'submission_end_date',
    company_id: 'company_id'
  };

  export type AvailablePositionScalarFieldEnum = (typeof AvailablePositionScalarFieldEnum)[keyof typeof AvailablePositionScalarFieldEnum]


  export const PortofolioScalarFieldEnum: {
    id: 'id',
    skill: 'skill',
    description: 'description',
    file: 'file',
    society_id: 'society_id'
  };

  export type PortofolioScalarFieldEnum = (typeof PortofolioScalarFieldEnum)[keyof typeof PortofolioScalarFieldEnum]


  export const PositionAppliedScalarFieldEnum: {
    id: 'id',
    available_position_id: 'available_position_id',
    society_id: 'society_id',
    apply_date: 'apply_date',
    status: 'status'
  };

  export type PositionAppliedScalarFieldEnum = (typeof PositionAppliedScalarFieldEnum)[keyof typeof PositionAppliedScalarFieldEnum]


  export const JobEmbeddingScalarFieldEnum: {
    id: 'id',
    jobId: 'jobId',
    embedding: 'embedding',
    skills: 'skills',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JobEmbeddingScalarFieldEnum = (typeof JobEmbeddingScalarFieldEnum)[keyof typeof JobEmbeddingScalarFieldEnum]


  export const PortfolioEmbeddingScalarFieldEnum: {
    id: 'id',
    portfolioId: 'portfolioId',
    embedding: 'embedding',
    skills: 'skills',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PortfolioEmbeddingScalarFieldEnum = (typeof PortfolioEmbeddingScalarFieldEnum)[keyof typeof PortfolioEmbeddingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'PositionStatus'
   */
  export type EnumPositionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PositionStatus'>
    


  /**
   * Reference to a field of type 'PositionStatus[]'
   */
  export type ListEnumPositionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PositionStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    phone?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    date_of_birth?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    society?: XOR<SocietyNullableScalarRelationFilter, SocietyWhereInput> | null
    company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
    Admin?: AdminListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    date_of_birth?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    society?: SocietyOrderByWithRelationInput
    company?: CompanyOrderByWithRelationInput
    Admin?: AdminOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    phone?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    date_of_birth?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    society?: XOR<SocietyNullableScalarRelationFilter, SocietyWhereInput> | null
    company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
    Admin?: AdminListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    date_of_birth?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    address?: StringNullableWithAggregatesFilter<"User"> | string | null
    date_of_birth?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: IntFilter<"Admin"> | number
    name?: StringFilter<"Admin"> | string
    email?: StringFilter<"Admin"> | string
    password?: StringFilter<"Admin"> | string
    phone?: StringNullableFilter<"Admin"> | string | null
    address?: StringNullableFilter<"Admin"> | string | null
    date_of_birth?: DateTimeNullableFilter<"Admin"> | Date | string | null
    user_id?: StringFilter<"Admin"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    date_of_birth?: SortOrderInput | SortOrder
    user_id?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    user_id?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    name?: StringFilter<"Admin"> | string
    password?: StringFilter<"Admin"> | string
    phone?: StringNullableFilter<"Admin"> | string | null
    address?: StringNullableFilter<"Admin"> | string | null
    date_of_birth?: DateTimeNullableFilter<"Admin"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "email" | "user_id">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    date_of_birth?: SortOrderInput | SortOrder
    user_id?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _avg?: AdminAvgOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
    _sum?: AdminSumOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Admin"> | number
    name?: StringWithAggregatesFilter<"Admin"> | string
    email?: StringWithAggregatesFilter<"Admin"> | string
    password?: StringWithAggregatesFilter<"Admin"> | string
    phone?: StringNullableWithAggregatesFilter<"Admin"> | string | null
    address?: StringNullableWithAggregatesFilter<"Admin"> | string | null
    date_of_birth?: DateTimeNullableWithAggregatesFilter<"Admin"> | Date | string | null
    user_id?: StringWithAggregatesFilter<"Admin"> | string
  }

  export type SocietyWhereInput = {
    AND?: SocietyWhereInput | SocietyWhereInput[]
    OR?: SocietyWhereInput[]
    NOT?: SocietyWhereInput | SocietyWhereInput[]
    id?: IntFilter<"Society"> | number
    name?: StringFilter<"Society"> | string
    address?: StringFilter<"Society"> | string
    phone?: StringFilter<"Society"> | string
    date_of_birth?: DateTimeFilter<"Society"> | Date | string
    gender?: StringFilter<"Society"> | string
    user_id?: StringFilter<"Society"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    portofolio?: PortofolioListRelationFilter
    applied_jobs?: PositionAppliedListRelationFilter
  }

  export type SocietyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    date_of_birth?: SortOrder
    gender?: SortOrder
    user_id?: SortOrder
    user?: UserOrderByWithRelationInput
    portofolio?: PortofolioOrderByRelationAggregateInput
    applied_jobs?: PositionAppliedOrderByRelationAggregateInput
  }

  export type SocietyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    user_id?: string
    AND?: SocietyWhereInput | SocietyWhereInput[]
    OR?: SocietyWhereInput[]
    NOT?: SocietyWhereInput | SocietyWhereInput[]
    name?: StringFilter<"Society"> | string
    address?: StringFilter<"Society"> | string
    phone?: StringFilter<"Society"> | string
    date_of_birth?: DateTimeFilter<"Society"> | Date | string
    gender?: StringFilter<"Society"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    portofolio?: PortofolioListRelationFilter
    applied_jobs?: PositionAppliedListRelationFilter
  }, "id" | "user_id">

  export type SocietyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    date_of_birth?: SortOrder
    gender?: SortOrder
    user_id?: SortOrder
    _count?: SocietyCountOrderByAggregateInput
    _avg?: SocietyAvgOrderByAggregateInput
    _max?: SocietyMaxOrderByAggregateInput
    _min?: SocietyMinOrderByAggregateInput
    _sum?: SocietySumOrderByAggregateInput
  }

  export type SocietyScalarWhereWithAggregatesInput = {
    AND?: SocietyScalarWhereWithAggregatesInput | SocietyScalarWhereWithAggregatesInput[]
    OR?: SocietyScalarWhereWithAggregatesInput[]
    NOT?: SocietyScalarWhereWithAggregatesInput | SocietyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Society"> | number
    name?: StringWithAggregatesFilter<"Society"> | string
    address?: StringWithAggregatesFilter<"Society"> | string
    phone?: StringWithAggregatesFilter<"Society"> | string
    date_of_birth?: DateTimeWithAggregatesFilter<"Society"> | Date | string
    gender?: StringWithAggregatesFilter<"Society"> | string
    user_id?: StringWithAggregatesFilter<"Society"> | string
  }

  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: IntFilter<"Company"> | number
    name?: StringFilter<"Company"> | string
    address?: StringFilter<"Company"> | string
    phone?: StringFilter<"Company"> | string
    description?: StringFilter<"Company"> | string
    user_id?: StringFilter<"Company"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    jobs?: AvailablePositionListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    description?: SortOrder
    user_id?: SortOrder
    user?: UserOrderByWithRelationInput
    jobs?: AvailablePositionOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    user_id?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    name?: StringFilter<"Company"> | string
    address?: StringFilter<"Company"> | string
    phone?: StringFilter<"Company"> | string
    description?: StringFilter<"Company"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    jobs?: AvailablePositionListRelationFilter
  }, "id" | "user_id">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    description?: SortOrder
    user_id?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _avg?: CompanyAvgOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
    _sum?: CompanySumOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Company"> | number
    name?: StringWithAggregatesFilter<"Company"> | string
    address?: StringWithAggregatesFilter<"Company"> | string
    phone?: StringWithAggregatesFilter<"Company"> | string
    description?: StringWithAggregatesFilter<"Company"> | string
    user_id?: StringWithAggregatesFilter<"Company"> | string
  }

  export type AvailablePositionWhereInput = {
    AND?: AvailablePositionWhereInput | AvailablePositionWhereInput[]
    OR?: AvailablePositionWhereInput[]
    NOT?: AvailablePositionWhereInput | AvailablePositionWhereInput[]
    id?: IntFilter<"AvailablePosition"> | number
    position_name?: StringFilter<"AvailablePosition"> | string
    capacity?: IntFilter<"AvailablePosition"> | number
    description?: StringFilter<"AvailablePosition"> | string
    submission_start_date?: DateTimeFilter<"AvailablePosition"> | Date | string
    submission_end_date?: DateTimeFilter<"AvailablePosition"> | Date | string
    company_id?: IntFilter<"AvailablePosition"> | number
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    applicants?: PositionAppliedListRelationFilter
    embedding?: XOR<JobEmbeddingNullableScalarRelationFilter, JobEmbeddingWhereInput> | null
  }

  export type AvailablePositionOrderByWithRelationInput = {
    id?: SortOrder
    position_name?: SortOrder
    capacity?: SortOrder
    description?: SortOrder
    submission_start_date?: SortOrder
    submission_end_date?: SortOrder
    company_id?: SortOrder
    company?: CompanyOrderByWithRelationInput
    applicants?: PositionAppliedOrderByRelationAggregateInput
    embedding?: JobEmbeddingOrderByWithRelationInput
  }

  export type AvailablePositionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AvailablePositionWhereInput | AvailablePositionWhereInput[]
    OR?: AvailablePositionWhereInput[]
    NOT?: AvailablePositionWhereInput | AvailablePositionWhereInput[]
    position_name?: StringFilter<"AvailablePosition"> | string
    capacity?: IntFilter<"AvailablePosition"> | number
    description?: StringFilter<"AvailablePosition"> | string
    submission_start_date?: DateTimeFilter<"AvailablePosition"> | Date | string
    submission_end_date?: DateTimeFilter<"AvailablePosition"> | Date | string
    company_id?: IntFilter<"AvailablePosition"> | number
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    applicants?: PositionAppliedListRelationFilter
    embedding?: XOR<JobEmbeddingNullableScalarRelationFilter, JobEmbeddingWhereInput> | null
  }, "id">

  export type AvailablePositionOrderByWithAggregationInput = {
    id?: SortOrder
    position_name?: SortOrder
    capacity?: SortOrder
    description?: SortOrder
    submission_start_date?: SortOrder
    submission_end_date?: SortOrder
    company_id?: SortOrder
    _count?: AvailablePositionCountOrderByAggregateInput
    _avg?: AvailablePositionAvgOrderByAggregateInput
    _max?: AvailablePositionMaxOrderByAggregateInput
    _min?: AvailablePositionMinOrderByAggregateInput
    _sum?: AvailablePositionSumOrderByAggregateInput
  }

  export type AvailablePositionScalarWhereWithAggregatesInput = {
    AND?: AvailablePositionScalarWhereWithAggregatesInput | AvailablePositionScalarWhereWithAggregatesInput[]
    OR?: AvailablePositionScalarWhereWithAggregatesInput[]
    NOT?: AvailablePositionScalarWhereWithAggregatesInput | AvailablePositionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AvailablePosition"> | number
    position_name?: StringWithAggregatesFilter<"AvailablePosition"> | string
    capacity?: IntWithAggregatesFilter<"AvailablePosition"> | number
    description?: StringWithAggregatesFilter<"AvailablePosition"> | string
    submission_start_date?: DateTimeWithAggregatesFilter<"AvailablePosition"> | Date | string
    submission_end_date?: DateTimeWithAggregatesFilter<"AvailablePosition"> | Date | string
    company_id?: IntWithAggregatesFilter<"AvailablePosition"> | number
  }

  export type PortofolioWhereInput = {
    AND?: PortofolioWhereInput | PortofolioWhereInput[]
    OR?: PortofolioWhereInput[]
    NOT?: PortofolioWhereInput | PortofolioWhereInput[]
    id?: IntFilter<"Portofolio"> | number
    skill?: StringFilter<"Portofolio"> | string
    description?: StringFilter<"Portofolio"> | string
    file?: StringFilter<"Portofolio"> | string
    society_id?: IntFilter<"Portofolio"> | number
    society?: XOR<SocietyScalarRelationFilter, SocietyWhereInput>
    PortfolioEmbedding?: PortfolioEmbeddingListRelationFilter
  }

  export type PortofolioOrderByWithRelationInput = {
    id?: SortOrder
    skill?: SortOrder
    description?: SortOrder
    file?: SortOrder
    society_id?: SortOrder
    society?: SocietyOrderByWithRelationInput
    PortfolioEmbedding?: PortfolioEmbeddingOrderByRelationAggregateInput
  }

  export type PortofolioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PortofolioWhereInput | PortofolioWhereInput[]
    OR?: PortofolioWhereInput[]
    NOT?: PortofolioWhereInput | PortofolioWhereInput[]
    skill?: StringFilter<"Portofolio"> | string
    description?: StringFilter<"Portofolio"> | string
    file?: StringFilter<"Portofolio"> | string
    society_id?: IntFilter<"Portofolio"> | number
    society?: XOR<SocietyScalarRelationFilter, SocietyWhereInput>
    PortfolioEmbedding?: PortfolioEmbeddingListRelationFilter
  }, "id">

  export type PortofolioOrderByWithAggregationInput = {
    id?: SortOrder
    skill?: SortOrder
    description?: SortOrder
    file?: SortOrder
    society_id?: SortOrder
    _count?: PortofolioCountOrderByAggregateInput
    _avg?: PortofolioAvgOrderByAggregateInput
    _max?: PortofolioMaxOrderByAggregateInput
    _min?: PortofolioMinOrderByAggregateInput
    _sum?: PortofolioSumOrderByAggregateInput
  }

  export type PortofolioScalarWhereWithAggregatesInput = {
    AND?: PortofolioScalarWhereWithAggregatesInput | PortofolioScalarWhereWithAggregatesInput[]
    OR?: PortofolioScalarWhereWithAggregatesInput[]
    NOT?: PortofolioScalarWhereWithAggregatesInput | PortofolioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Portofolio"> | number
    skill?: StringWithAggregatesFilter<"Portofolio"> | string
    description?: StringWithAggregatesFilter<"Portofolio"> | string
    file?: StringWithAggregatesFilter<"Portofolio"> | string
    society_id?: IntWithAggregatesFilter<"Portofolio"> | number
  }

  export type PositionAppliedWhereInput = {
    AND?: PositionAppliedWhereInput | PositionAppliedWhereInput[]
    OR?: PositionAppliedWhereInput[]
    NOT?: PositionAppliedWhereInput | PositionAppliedWhereInput[]
    id?: IntFilter<"PositionApplied"> | number
    available_position_id?: IntFilter<"PositionApplied"> | number
    society_id?: IntFilter<"PositionApplied"> | number
    apply_date?: DateTimeFilter<"PositionApplied"> | Date | string
    status?: EnumPositionStatusFilter<"PositionApplied"> | $Enums.PositionStatus
    position?: XOR<AvailablePositionScalarRelationFilter, AvailablePositionWhereInput>
    society?: XOR<SocietyScalarRelationFilter, SocietyWhereInput>
  }

  export type PositionAppliedOrderByWithRelationInput = {
    id?: SortOrder
    available_position_id?: SortOrder
    society_id?: SortOrder
    apply_date?: SortOrder
    status?: SortOrder
    position?: AvailablePositionOrderByWithRelationInput
    society?: SocietyOrderByWithRelationInput
  }

  export type PositionAppliedWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PositionAppliedWhereInput | PositionAppliedWhereInput[]
    OR?: PositionAppliedWhereInput[]
    NOT?: PositionAppliedWhereInput | PositionAppliedWhereInput[]
    available_position_id?: IntFilter<"PositionApplied"> | number
    society_id?: IntFilter<"PositionApplied"> | number
    apply_date?: DateTimeFilter<"PositionApplied"> | Date | string
    status?: EnumPositionStatusFilter<"PositionApplied"> | $Enums.PositionStatus
    position?: XOR<AvailablePositionScalarRelationFilter, AvailablePositionWhereInput>
    society?: XOR<SocietyScalarRelationFilter, SocietyWhereInput>
  }, "id">

  export type PositionAppliedOrderByWithAggregationInput = {
    id?: SortOrder
    available_position_id?: SortOrder
    society_id?: SortOrder
    apply_date?: SortOrder
    status?: SortOrder
    _count?: PositionAppliedCountOrderByAggregateInput
    _avg?: PositionAppliedAvgOrderByAggregateInput
    _max?: PositionAppliedMaxOrderByAggregateInput
    _min?: PositionAppliedMinOrderByAggregateInput
    _sum?: PositionAppliedSumOrderByAggregateInput
  }

  export type PositionAppliedScalarWhereWithAggregatesInput = {
    AND?: PositionAppliedScalarWhereWithAggregatesInput | PositionAppliedScalarWhereWithAggregatesInput[]
    OR?: PositionAppliedScalarWhereWithAggregatesInput[]
    NOT?: PositionAppliedScalarWhereWithAggregatesInput | PositionAppliedScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PositionApplied"> | number
    available_position_id?: IntWithAggregatesFilter<"PositionApplied"> | number
    society_id?: IntWithAggregatesFilter<"PositionApplied"> | number
    apply_date?: DateTimeWithAggregatesFilter<"PositionApplied"> | Date | string
    status?: EnumPositionStatusWithAggregatesFilter<"PositionApplied"> | $Enums.PositionStatus
  }

  export type JobEmbeddingWhereInput = {
    AND?: JobEmbeddingWhereInput | JobEmbeddingWhereInput[]
    OR?: JobEmbeddingWhereInput[]
    NOT?: JobEmbeddingWhereInput | JobEmbeddingWhereInput[]
    id?: StringFilter<"JobEmbedding"> | string
    jobId?: IntFilter<"JobEmbedding"> | number
    embedding?: JsonFilter<"JobEmbedding">
    skills?: StringNullableListFilter<"JobEmbedding">
    description?: StringFilter<"JobEmbedding"> | string
    createdAt?: DateTimeFilter<"JobEmbedding"> | Date | string
    updatedAt?: DateTimeFilter<"JobEmbedding"> | Date | string
    job?: XOR<AvailablePositionScalarRelationFilter, AvailablePositionWhereInput>
  }

  export type JobEmbeddingOrderByWithRelationInput = {
    id?: SortOrder
    jobId?: SortOrder
    embedding?: SortOrder
    skills?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    job?: AvailablePositionOrderByWithRelationInput
  }

  export type JobEmbeddingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    jobId?: number
    AND?: JobEmbeddingWhereInput | JobEmbeddingWhereInput[]
    OR?: JobEmbeddingWhereInput[]
    NOT?: JobEmbeddingWhereInput | JobEmbeddingWhereInput[]
    embedding?: JsonFilter<"JobEmbedding">
    skills?: StringNullableListFilter<"JobEmbedding">
    description?: StringFilter<"JobEmbedding"> | string
    createdAt?: DateTimeFilter<"JobEmbedding"> | Date | string
    updatedAt?: DateTimeFilter<"JobEmbedding"> | Date | string
    job?: XOR<AvailablePositionScalarRelationFilter, AvailablePositionWhereInput>
  }, "id" | "jobId">

  export type JobEmbeddingOrderByWithAggregationInput = {
    id?: SortOrder
    jobId?: SortOrder
    embedding?: SortOrder
    skills?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JobEmbeddingCountOrderByAggregateInput
    _avg?: JobEmbeddingAvgOrderByAggregateInput
    _max?: JobEmbeddingMaxOrderByAggregateInput
    _min?: JobEmbeddingMinOrderByAggregateInput
    _sum?: JobEmbeddingSumOrderByAggregateInput
  }

  export type JobEmbeddingScalarWhereWithAggregatesInput = {
    AND?: JobEmbeddingScalarWhereWithAggregatesInput | JobEmbeddingScalarWhereWithAggregatesInput[]
    OR?: JobEmbeddingScalarWhereWithAggregatesInput[]
    NOT?: JobEmbeddingScalarWhereWithAggregatesInput | JobEmbeddingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JobEmbedding"> | string
    jobId?: IntWithAggregatesFilter<"JobEmbedding"> | number
    embedding?: JsonWithAggregatesFilter<"JobEmbedding">
    skills?: StringNullableListFilter<"JobEmbedding">
    description?: StringWithAggregatesFilter<"JobEmbedding"> | string
    createdAt?: DateTimeWithAggregatesFilter<"JobEmbedding"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"JobEmbedding"> | Date | string
  }

  export type PortfolioEmbeddingWhereInput = {
    AND?: PortfolioEmbeddingWhereInput | PortfolioEmbeddingWhereInput[]
    OR?: PortfolioEmbeddingWhereInput[]
    NOT?: PortfolioEmbeddingWhereInput | PortfolioEmbeddingWhereInput[]
    id?: StringFilter<"PortfolioEmbedding"> | string
    portfolioId?: IntFilter<"PortfolioEmbedding"> | number
    embedding?: JsonFilter<"PortfolioEmbedding">
    skills?: StringNullableListFilter<"PortfolioEmbedding">
    description?: StringFilter<"PortfolioEmbedding"> | string
    createdAt?: DateTimeFilter<"PortfolioEmbedding"> | Date | string
    updatedAt?: DateTimeFilter<"PortfolioEmbedding"> | Date | string
    portfolio?: XOR<PortofolioScalarRelationFilter, PortofolioWhereInput>
  }

  export type PortfolioEmbeddingOrderByWithRelationInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    embedding?: SortOrder
    skills?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    portfolio?: PortofolioOrderByWithRelationInput
  }

  export type PortfolioEmbeddingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    portfolioId?: number
    AND?: PortfolioEmbeddingWhereInput | PortfolioEmbeddingWhereInput[]
    OR?: PortfolioEmbeddingWhereInput[]
    NOT?: PortfolioEmbeddingWhereInput | PortfolioEmbeddingWhereInput[]
    embedding?: JsonFilter<"PortfolioEmbedding">
    skills?: StringNullableListFilter<"PortfolioEmbedding">
    description?: StringFilter<"PortfolioEmbedding"> | string
    createdAt?: DateTimeFilter<"PortfolioEmbedding"> | Date | string
    updatedAt?: DateTimeFilter<"PortfolioEmbedding"> | Date | string
    portfolio?: XOR<PortofolioScalarRelationFilter, PortofolioWhereInput>
  }, "id" | "portfolioId">

  export type PortfolioEmbeddingOrderByWithAggregationInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    embedding?: SortOrder
    skills?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PortfolioEmbeddingCountOrderByAggregateInput
    _avg?: PortfolioEmbeddingAvgOrderByAggregateInput
    _max?: PortfolioEmbeddingMaxOrderByAggregateInput
    _min?: PortfolioEmbeddingMinOrderByAggregateInput
    _sum?: PortfolioEmbeddingSumOrderByAggregateInput
  }

  export type PortfolioEmbeddingScalarWhereWithAggregatesInput = {
    AND?: PortfolioEmbeddingScalarWhereWithAggregatesInput | PortfolioEmbeddingScalarWhereWithAggregatesInput[]
    OR?: PortfolioEmbeddingScalarWhereWithAggregatesInput[]
    NOT?: PortfolioEmbeddingScalarWhereWithAggregatesInput | PortfolioEmbeddingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PortfolioEmbedding"> | string
    portfolioId?: IntWithAggregatesFilter<"PortfolioEmbedding"> | number
    embedding?: JsonWithAggregatesFilter<"PortfolioEmbedding">
    skills?: StringNullableListFilter<"PortfolioEmbedding">
    description?: StringWithAggregatesFilter<"PortfolioEmbedding"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PortfolioEmbedding"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PortfolioEmbedding"> | Date | string
  }

  export type UserCreateInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    phone?: string | null
    address?: string | null
    date_of_birth?: Date | string | null
    createdAt?: Date | string
    society?: SocietyCreateNestedOneWithoutUserInput
    company?: CompanyCreateNestedOneWithoutUserInput
    Admin?: AdminCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    phone?: string | null
    address?: string | null
    date_of_birth?: Date | string | null
    createdAt?: Date | string
    society?: SocietyUncheckedCreateNestedOneWithoutUserInput
    company?: CompanyUncheckedCreateNestedOneWithoutUserInput
    Admin?: AdminUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    society?: SocietyUpdateOneWithoutUserNestedInput
    company?: CompanyUpdateOneWithoutUserNestedInput
    Admin?: AdminUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    society?: SocietyUncheckedUpdateOneWithoutUserNestedInput
    company?: CompanyUncheckedUpdateOneWithoutUserNestedInput
    Admin?: AdminUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    phone?: string | null
    address?: string | null
    date_of_birth?: Date | string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminCreateInput = {
    name: string
    email: string
    password: string
    phone?: string | null
    address?: string | null
    date_of_birth?: Date | string | null
    user: UserCreateNestedOneWithoutAdminInput
  }

  export type AdminUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password: string
    phone?: string | null
    address?: string | null
    date_of_birth?: Date | string | null
    user_id: string
  }

  export type AdminUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutAdminNestedInput
  }

  export type AdminUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type AdminCreateManyInput = {
    id?: number
    name: string
    email: string
    password: string
    phone?: string | null
    address?: string | null
    date_of_birth?: Date | string | null
    user_id: string
  }

  export type AdminUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type SocietyCreateInput = {
    name: string
    address: string
    phone: string
    date_of_birth: Date | string
    gender: string
    user: UserCreateNestedOneWithoutSocietyInput
    portofolio?: PortofolioCreateNestedManyWithoutSocietyInput
    applied_jobs?: PositionAppliedCreateNestedManyWithoutSocietyInput
  }

  export type SocietyUncheckedCreateInput = {
    id?: number
    name: string
    address: string
    phone: string
    date_of_birth: Date | string
    gender: string
    user_id: string
    portofolio?: PortofolioUncheckedCreateNestedManyWithoutSocietyInput
    applied_jobs?: PositionAppliedUncheckedCreateNestedManyWithoutSocietyInput
  }

  export type SocietyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutSocietyNestedInput
    portofolio?: PortofolioUpdateManyWithoutSocietyNestedInput
    applied_jobs?: PositionAppliedUpdateManyWithoutSocietyNestedInput
  }

  export type SocietyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    portofolio?: PortofolioUncheckedUpdateManyWithoutSocietyNestedInput
    applied_jobs?: PositionAppliedUncheckedUpdateManyWithoutSocietyNestedInput
  }

  export type SocietyCreateManyInput = {
    id?: number
    name: string
    address: string
    phone: string
    date_of_birth: Date | string
    gender: string
    user_id: string
  }

  export type SocietyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
  }

  export type SocietyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyCreateInput = {
    name: string
    address: string
    phone: string
    description: string
    user: UserCreateNestedOneWithoutCompanyInput
    jobs?: AvailablePositionCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: number
    name: string
    address: string
    phone: string
    description: string
    user_id: string
    jobs?: AvailablePositionUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutCompanyNestedInput
    jobs?: AvailablePositionUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    jobs?: AvailablePositionUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: number
    name: string
    address: string
    phone: string
    description: string
    user_id: string
  }

  export type CompanyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type AvailablePositionCreateInput = {
    position_name: string
    capacity: number
    description: string
    submission_start_date: Date | string
    submission_end_date: Date | string
    company: CompanyCreateNestedOneWithoutJobsInput
    applicants?: PositionAppliedCreateNestedManyWithoutPositionInput
    embedding?: JobEmbeddingCreateNestedOneWithoutJobInput
  }

  export type AvailablePositionUncheckedCreateInput = {
    id?: number
    position_name: string
    capacity: number
    description: string
    submission_start_date: Date | string
    submission_end_date: Date | string
    company_id: number
    applicants?: PositionAppliedUncheckedCreateNestedManyWithoutPositionInput
    embedding?: JobEmbeddingUncheckedCreateNestedOneWithoutJobInput
  }

  export type AvailablePositionUpdateInput = {
    position_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    submission_start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    submission_end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobsNestedInput
    applicants?: PositionAppliedUpdateManyWithoutPositionNestedInput
    embedding?: JobEmbeddingUpdateOneWithoutJobNestedInput
  }

  export type AvailablePositionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    position_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    submission_start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    submission_end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    company_id?: IntFieldUpdateOperationsInput | number
    applicants?: PositionAppliedUncheckedUpdateManyWithoutPositionNestedInput
    embedding?: JobEmbeddingUncheckedUpdateOneWithoutJobNestedInput
  }

  export type AvailablePositionCreateManyInput = {
    id?: number
    position_name: string
    capacity: number
    description: string
    submission_start_date: Date | string
    submission_end_date: Date | string
    company_id: number
  }

  export type AvailablePositionUpdateManyMutationInput = {
    position_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    submission_start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    submission_end_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailablePositionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    position_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    submission_start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    submission_end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    company_id?: IntFieldUpdateOperationsInput | number
  }

  export type PortofolioCreateInput = {
    skill: string
    description: string
    file: string
    society: SocietyCreateNestedOneWithoutPortofolioInput
    PortfolioEmbedding?: PortfolioEmbeddingCreateNestedManyWithoutPortfolioInput
  }

  export type PortofolioUncheckedCreateInput = {
    id?: number
    skill: string
    description: string
    file: string
    society_id: number
    PortfolioEmbedding?: PortfolioEmbeddingUncheckedCreateNestedManyWithoutPortfolioInput
  }

  export type PortofolioUpdateInput = {
    skill?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
    society?: SocietyUpdateOneRequiredWithoutPortofolioNestedInput
    PortfolioEmbedding?: PortfolioEmbeddingUpdateManyWithoutPortfolioNestedInput
  }

  export type PortofolioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    skill?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
    society_id?: IntFieldUpdateOperationsInput | number
    PortfolioEmbedding?: PortfolioEmbeddingUncheckedUpdateManyWithoutPortfolioNestedInput
  }

  export type PortofolioCreateManyInput = {
    id?: number
    skill: string
    description: string
    file: string
    society_id: number
  }

  export type PortofolioUpdateManyMutationInput = {
    skill?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
  }

  export type PortofolioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    skill?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
    society_id?: IntFieldUpdateOperationsInput | number
  }

  export type PositionAppliedCreateInput = {
    apply_date?: Date | string
    status?: $Enums.PositionStatus
    position: AvailablePositionCreateNestedOneWithoutApplicantsInput
    society: SocietyCreateNestedOneWithoutApplied_jobsInput
  }

  export type PositionAppliedUncheckedCreateInput = {
    id?: number
    available_position_id: number
    society_id: number
    apply_date?: Date | string
    status?: $Enums.PositionStatus
  }

  export type PositionAppliedUpdateInput = {
    apply_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPositionStatusFieldUpdateOperationsInput | $Enums.PositionStatus
    position?: AvailablePositionUpdateOneRequiredWithoutApplicantsNestedInput
    society?: SocietyUpdateOneRequiredWithoutApplied_jobsNestedInput
  }

  export type PositionAppliedUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    available_position_id?: IntFieldUpdateOperationsInput | number
    society_id?: IntFieldUpdateOperationsInput | number
    apply_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPositionStatusFieldUpdateOperationsInput | $Enums.PositionStatus
  }

  export type PositionAppliedCreateManyInput = {
    id?: number
    available_position_id: number
    society_id: number
    apply_date?: Date | string
    status?: $Enums.PositionStatus
  }

  export type PositionAppliedUpdateManyMutationInput = {
    apply_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPositionStatusFieldUpdateOperationsInput | $Enums.PositionStatus
  }

  export type PositionAppliedUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    available_position_id?: IntFieldUpdateOperationsInput | number
    society_id?: IntFieldUpdateOperationsInput | number
    apply_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPositionStatusFieldUpdateOperationsInput | $Enums.PositionStatus
  }

  export type JobEmbeddingCreateInput = {
    id?: string
    embedding: JsonNullValueInput | InputJsonValue
    skills?: JobEmbeddingCreateskillsInput | string[]
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    job: AvailablePositionCreateNestedOneWithoutEmbeddingInput
  }

  export type JobEmbeddingUncheckedCreateInput = {
    id?: string
    jobId: number
    embedding: JsonNullValueInput | InputJsonValue
    skills?: JobEmbeddingCreateskillsInput | string[]
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobEmbeddingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    embedding?: JsonNullValueInput | InputJsonValue
    skills?: JobEmbeddingUpdateskillsInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: AvailablePositionUpdateOneRequiredWithoutEmbeddingNestedInput
  }

  export type JobEmbeddingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: IntFieldUpdateOperationsInput | number
    embedding?: JsonNullValueInput | InputJsonValue
    skills?: JobEmbeddingUpdateskillsInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobEmbeddingCreateManyInput = {
    id?: string
    jobId: number
    embedding: JsonNullValueInput | InputJsonValue
    skills?: JobEmbeddingCreateskillsInput | string[]
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobEmbeddingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    embedding?: JsonNullValueInput | InputJsonValue
    skills?: JobEmbeddingUpdateskillsInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobEmbeddingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: IntFieldUpdateOperationsInput | number
    embedding?: JsonNullValueInput | InputJsonValue
    skills?: JobEmbeddingUpdateskillsInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioEmbeddingCreateInput = {
    id?: string
    embedding: JsonNullValueInput | InputJsonValue
    skills?: PortfolioEmbeddingCreateskillsInput | string[]
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolio: PortofolioCreateNestedOneWithoutPortfolioEmbeddingInput
  }

  export type PortfolioEmbeddingUncheckedCreateInput = {
    id?: string
    portfolioId: number
    embedding: JsonNullValueInput | InputJsonValue
    skills?: PortfolioEmbeddingCreateskillsInput | string[]
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioEmbeddingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    embedding?: JsonNullValueInput | InputJsonValue
    skills?: PortfolioEmbeddingUpdateskillsInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortofolioUpdateOneRequiredWithoutPortfolioEmbeddingNestedInput
  }

  export type PortfolioEmbeddingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolioId?: IntFieldUpdateOperationsInput | number
    embedding?: JsonNullValueInput | InputJsonValue
    skills?: PortfolioEmbeddingUpdateskillsInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioEmbeddingCreateManyInput = {
    id?: string
    portfolioId: number
    embedding: JsonNullValueInput | InputJsonValue
    skills?: PortfolioEmbeddingCreateskillsInput | string[]
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioEmbeddingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    embedding?: JsonNullValueInput | InputJsonValue
    skills?: PortfolioEmbeddingUpdateskillsInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioEmbeddingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolioId?: IntFieldUpdateOperationsInput | number
    embedding?: JsonNullValueInput | InputJsonValue
    skills?: PortfolioEmbeddingUpdateskillsInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SocietyNullableScalarRelationFilter = {
    is?: SocietyWhereInput | null
    isNot?: SocietyWhereInput | null
  }

  export type CompanyNullableScalarRelationFilter = {
    is?: CompanyWhereInput | null
    isNot?: CompanyWhereInput | null
  }

  export type AdminListRelationFilter = {
    every?: AdminWhereInput
    some?: AdminWhereInput
    none?: AdminWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AdminOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    date_of_birth?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    date_of_birth?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    date_of_birth?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    date_of_birth?: SortOrder
    user_id?: SortOrder
  }

  export type AdminAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    date_of_birth?: SortOrder
    user_id?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    date_of_birth?: SortOrder
    user_id?: SortOrder
  }

  export type AdminSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type PortofolioListRelationFilter = {
    every?: PortofolioWhereInput
    some?: PortofolioWhereInput
    none?: PortofolioWhereInput
  }

  export type PositionAppliedListRelationFilter = {
    every?: PositionAppliedWhereInput
    some?: PositionAppliedWhereInput
    none?: PositionAppliedWhereInput
  }

  export type PortofolioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PositionAppliedOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SocietyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    date_of_birth?: SortOrder
    gender?: SortOrder
    user_id?: SortOrder
  }

  export type SocietyAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SocietyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    date_of_birth?: SortOrder
    gender?: SortOrder
    user_id?: SortOrder
  }

  export type SocietyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    date_of_birth?: SortOrder
    gender?: SortOrder
    user_id?: SortOrder
  }

  export type SocietySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AvailablePositionListRelationFilter = {
    every?: AvailablePositionWhereInput
    some?: AvailablePositionWhereInput
    none?: AvailablePositionWhereInput
  }

  export type AvailablePositionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    description?: SortOrder
    user_id?: SortOrder
  }

  export type CompanyAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    description?: SortOrder
    user_id?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    description?: SortOrder
    user_id?: SortOrder
  }

  export type CompanySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CompanyScalarRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type JobEmbeddingNullableScalarRelationFilter = {
    is?: JobEmbeddingWhereInput | null
    isNot?: JobEmbeddingWhereInput | null
  }

  export type AvailablePositionCountOrderByAggregateInput = {
    id?: SortOrder
    position_name?: SortOrder
    capacity?: SortOrder
    description?: SortOrder
    submission_start_date?: SortOrder
    submission_end_date?: SortOrder
    company_id?: SortOrder
  }

  export type AvailablePositionAvgOrderByAggregateInput = {
    id?: SortOrder
    capacity?: SortOrder
    company_id?: SortOrder
  }

  export type AvailablePositionMaxOrderByAggregateInput = {
    id?: SortOrder
    position_name?: SortOrder
    capacity?: SortOrder
    description?: SortOrder
    submission_start_date?: SortOrder
    submission_end_date?: SortOrder
    company_id?: SortOrder
  }

  export type AvailablePositionMinOrderByAggregateInput = {
    id?: SortOrder
    position_name?: SortOrder
    capacity?: SortOrder
    description?: SortOrder
    submission_start_date?: SortOrder
    submission_end_date?: SortOrder
    company_id?: SortOrder
  }

  export type AvailablePositionSumOrderByAggregateInput = {
    id?: SortOrder
    capacity?: SortOrder
    company_id?: SortOrder
  }

  export type SocietyScalarRelationFilter = {
    is?: SocietyWhereInput
    isNot?: SocietyWhereInput
  }

  export type PortfolioEmbeddingListRelationFilter = {
    every?: PortfolioEmbeddingWhereInput
    some?: PortfolioEmbeddingWhereInput
    none?: PortfolioEmbeddingWhereInput
  }

  export type PortfolioEmbeddingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PortofolioCountOrderByAggregateInput = {
    id?: SortOrder
    skill?: SortOrder
    description?: SortOrder
    file?: SortOrder
    society_id?: SortOrder
  }

  export type PortofolioAvgOrderByAggregateInput = {
    id?: SortOrder
    society_id?: SortOrder
  }

  export type PortofolioMaxOrderByAggregateInput = {
    id?: SortOrder
    skill?: SortOrder
    description?: SortOrder
    file?: SortOrder
    society_id?: SortOrder
  }

  export type PortofolioMinOrderByAggregateInput = {
    id?: SortOrder
    skill?: SortOrder
    description?: SortOrder
    file?: SortOrder
    society_id?: SortOrder
  }

  export type PortofolioSumOrderByAggregateInput = {
    id?: SortOrder
    society_id?: SortOrder
  }

  export type EnumPositionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PositionStatus | EnumPositionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PositionStatus[] | ListEnumPositionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PositionStatus[] | ListEnumPositionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPositionStatusFilter<$PrismaModel> | $Enums.PositionStatus
  }

  export type AvailablePositionScalarRelationFilter = {
    is?: AvailablePositionWhereInput
    isNot?: AvailablePositionWhereInput
  }

  export type PositionAppliedCountOrderByAggregateInput = {
    id?: SortOrder
    available_position_id?: SortOrder
    society_id?: SortOrder
    apply_date?: SortOrder
    status?: SortOrder
  }

  export type PositionAppliedAvgOrderByAggregateInput = {
    id?: SortOrder
    available_position_id?: SortOrder
    society_id?: SortOrder
  }

  export type PositionAppliedMaxOrderByAggregateInput = {
    id?: SortOrder
    available_position_id?: SortOrder
    society_id?: SortOrder
    apply_date?: SortOrder
    status?: SortOrder
  }

  export type PositionAppliedMinOrderByAggregateInput = {
    id?: SortOrder
    available_position_id?: SortOrder
    society_id?: SortOrder
    apply_date?: SortOrder
    status?: SortOrder
  }

  export type PositionAppliedSumOrderByAggregateInput = {
    id?: SortOrder
    available_position_id?: SortOrder
    society_id?: SortOrder
  }

  export type EnumPositionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PositionStatus | EnumPositionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PositionStatus[] | ListEnumPositionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PositionStatus[] | ListEnumPositionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPositionStatusWithAggregatesFilter<$PrismaModel> | $Enums.PositionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPositionStatusFilter<$PrismaModel>
    _max?: NestedEnumPositionStatusFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type JobEmbeddingCountOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    embedding?: SortOrder
    skills?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobEmbeddingAvgOrderByAggregateInput = {
    jobId?: SortOrder
  }

  export type JobEmbeddingMaxOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobEmbeddingMinOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobEmbeddingSumOrderByAggregateInput = {
    jobId?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type PortofolioScalarRelationFilter = {
    is?: PortofolioWhereInput
    isNot?: PortofolioWhereInput
  }

  export type PortfolioEmbeddingCountOrderByAggregateInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    embedding?: SortOrder
    skills?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioEmbeddingAvgOrderByAggregateInput = {
    portfolioId?: SortOrder
  }

  export type PortfolioEmbeddingMaxOrderByAggregateInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioEmbeddingMinOrderByAggregateInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioEmbeddingSumOrderByAggregateInput = {
    portfolioId?: SortOrder
  }

  export type SocietyCreateNestedOneWithoutUserInput = {
    create?: XOR<SocietyCreateWithoutUserInput, SocietyUncheckedCreateWithoutUserInput>
    connectOrCreate?: SocietyCreateOrConnectWithoutUserInput
    connect?: SocietyWhereUniqueInput
  }

  export type CompanyCreateNestedOneWithoutUserInput = {
    create?: XOR<CompanyCreateWithoutUserInput, CompanyUncheckedCreateWithoutUserInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUserInput
    connect?: CompanyWhereUniqueInput
  }

  export type AdminCreateNestedManyWithoutUserInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput> | AdminCreateWithoutUserInput[] | AdminUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput | AdminCreateOrConnectWithoutUserInput[]
    createMany?: AdminCreateManyUserInputEnvelope
    connect?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
  }

  export type SocietyUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<SocietyCreateWithoutUserInput, SocietyUncheckedCreateWithoutUserInput>
    connectOrCreate?: SocietyCreateOrConnectWithoutUserInput
    connect?: SocietyWhereUniqueInput
  }

  export type CompanyUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<CompanyCreateWithoutUserInput, CompanyUncheckedCreateWithoutUserInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUserInput
    connect?: CompanyWhereUniqueInput
  }

  export type AdminUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput> | AdminCreateWithoutUserInput[] | AdminUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput | AdminCreateOrConnectWithoutUserInput[]
    createMany?: AdminCreateManyUserInputEnvelope
    connect?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SocietyUpdateOneWithoutUserNestedInput = {
    create?: XOR<SocietyCreateWithoutUserInput, SocietyUncheckedCreateWithoutUserInput>
    connectOrCreate?: SocietyCreateOrConnectWithoutUserInput
    upsert?: SocietyUpsertWithoutUserInput
    disconnect?: SocietyWhereInput | boolean
    delete?: SocietyWhereInput | boolean
    connect?: SocietyWhereUniqueInput
    update?: XOR<XOR<SocietyUpdateToOneWithWhereWithoutUserInput, SocietyUpdateWithoutUserInput>, SocietyUncheckedUpdateWithoutUserInput>
  }

  export type CompanyUpdateOneWithoutUserNestedInput = {
    create?: XOR<CompanyCreateWithoutUserInput, CompanyUncheckedCreateWithoutUserInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUserInput
    upsert?: CompanyUpsertWithoutUserInput
    disconnect?: CompanyWhereInput | boolean
    delete?: CompanyWhereInput | boolean
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutUserInput, CompanyUpdateWithoutUserInput>, CompanyUncheckedUpdateWithoutUserInput>
  }

  export type AdminUpdateManyWithoutUserNestedInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput> | AdminCreateWithoutUserInput[] | AdminUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput | AdminCreateOrConnectWithoutUserInput[]
    upsert?: AdminUpsertWithWhereUniqueWithoutUserInput | AdminUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AdminCreateManyUserInputEnvelope
    set?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
    disconnect?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
    delete?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
    connect?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
    update?: AdminUpdateWithWhereUniqueWithoutUserInput | AdminUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AdminUpdateManyWithWhereWithoutUserInput | AdminUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AdminScalarWhereInput | AdminScalarWhereInput[]
  }

  export type SocietyUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<SocietyCreateWithoutUserInput, SocietyUncheckedCreateWithoutUserInput>
    connectOrCreate?: SocietyCreateOrConnectWithoutUserInput
    upsert?: SocietyUpsertWithoutUserInput
    disconnect?: SocietyWhereInput | boolean
    delete?: SocietyWhereInput | boolean
    connect?: SocietyWhereUniqueInput
    update?: XOR<XOR<SocietyUpdateToOneWithWhereWithoutUserInput, SocietyUpdateWithoutUserInput>, SocietyUncheckedUpdateWithoutUserInput>
  }

  export type CompanyUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<CompanyCreateWithoutUserInput, CompanyUncheckedCreateWithoutUserInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUserInput
    upsert?: CompanyUpsertWithoutUserInput
    disconnect?: CompanyWhereInput | boolean
    delete?: CompanyWhereInput | boolean
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutUserInput, CompanyUpdateWithoutUserInput>, CompanyUncheckedUpdateWithoutUserInput>
  }

  export type AdminUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput> | AdminCreateWithoutUserInput[] | AdminUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput | AdminCreateOrConnectWithoutUserInput[]
    upsert?: AdminUpsertWithWhereUniqueWithoutUserInput | AdminUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AdminCreateManyUserInputEnvelope
    set?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
    disconnect?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
    delete?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
    connect?: AdminWhereUniqueInput | AdminWhereUniqueInput[]
    update?: AdminUpdateWithWhereUniqueWithoutUserInput | AdminUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AdminUpdateManyWithWhereWithoutUserInput | AdminUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AdminScalarWhereInput | AdminScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAdminInput = {
    create?: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAdminNestedInput = {
    create?: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminInput
    upsert?: UserUpsertWithoutAdminInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAdminInput, UserUpdateWithoutAdminInput>, UserUncheckedUpdateWithoutAdminInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutSocietyInput = {
    create?: XOR<UserCreateWithoutSocietyInput, UserUncheckedCreateWithoutSocietyInput>
    connectOrCreate?: UserCreateOrConnectWithoutSocietyInput
    connect?: UserWhereUniqueInput
  }

  export type PortofolioCreateNestedManyWithoutSocietyInput = {
    create?: XOR<PortofolioCreateWithoutSocietyInput, PortofolioUncheckedCreateWithoutSocietyInput> | PortofolioCreateWithoutSocietyInput[] | PortofolioUncheckedCreateWithoutSocietyInput[]
    connectOrCreate?: PortofolioCreateOrConnectWithoutSocietyInput | PortofolioCreateOrConnectWithoutSocietyInput[]
    createMany?: PortofolioCreateManySocietyInputEnvelope
    connect?: PortofolioWhereUniqueInput | PortofolioWhereUniqueInput[]
  }

  export type PositionAppliedCreateNestedManyWithoutSocietyInput = {
    create?: XOR<PositionAppliedCreateWithoutSocietyInput, PositionAppliedUncheckedCreateWithoutSocietyInput> | PositionAppliedCreateWithoutSocietyInput[] | PositionAppliedUncheckedCreateWithoutSocietyInput[]
    connectOrCreate?: PositionAppliedCreateOrConnectWithoutSocietyInput | PositionAppliedCreateOrConnectWithoutSocietyInput[]
    createMany?: PositionAppliedCreateManySocietyInputEnvelope
    connect?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
  }

  export type PortofolioUncheckedCreateNestedManyWithoutSocietyInput = {
    create?: XOR<PortofolioCreateWithoutSocietyInput, PortofolioUncheckedCreateWithoutSocietyInput> | PortofolioCreateWithoutSocietyInput[] | PortofolioUncheckedCreateWithoutSocietyInput[]
    connectOrCreate?: PortofolioCreateOrConnectWithoutSocietyInput | PortofolioCreateOrConnectWithoutSocietyInput[]
    createMany?: PortofolioCreateManySocietyInputEnvelope
    connect?: PortofolioWhereUniqueInput | PortofolioWhereUniqueInput[]
  }

  export type PositionAppliedUncheckedCreateNestedManyWithoutSocietyInput = {
    create?: XOR<PositionAppliedCreateWithoutSocietyInput, PositionAppliedUncheckedCreateWithoutSocietyInput> | PositionAppliedCreateWithoutSocietyInput[] | PositionAppliedUncheckedCreateWithoutSocietyInput[]
    connectOrCreate?: PositionAppliedCreateOrConnectWithoutSocietyInput | PositionAppliedCreateOrConnectWithoutSocietyInput[]
    createMany?: PositionAppliedCreateManySocietyInputEnvelope
    connect?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutSocietyNestedInput = {
    create?: XOR<UserCreateWithoutSocietyInput, UserUncheckedCreateWithoutSocietyInput>
    connectOrCreate?: UserCreateOrConnectWithoutSocietyInput
    upsert?: UserUpsertWithoutSocietyInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSocietyInput, UserUpdateWithoutSocietyInput>, UserUncheckedUpdateWithoutSocietyInput>
  }

  export type PortofolioUpdateManyWithoutSocietyNestedInput = {
    create?: XOR<PortofolioCreateWithoutSocietyInput, PortofolioUncheckedCreateWithoutSocietyInput> | PortofolioCreateWithoutSocietyInput[] | PortofolioUncheckedCreateWithoutSocietyInput[]
    connectOrCreate?: PortofolioCreateOrConnectWithoutSocietyInput | PortofolioCreateOrConnectWithoutSocietyInput[]
    upsert?: PortofolioUpsertWithWhereUniqueWithoutSocietyInput | PortofolioUpsertWithWhereUniqueWithoutSocietyInput[]
    createMany?: PortofolioCreateManySocietyInputEnvelope
    set?: PortofolioWhereUniqueInput | PortofolioWhereUniqueInput[]
    disconnect?: PortofolioWhereUniqueInput | PortofolioWhereUniqueInput[]
    delete?: PortofolioWhereUniqueInput | PortofolioWhereUniqueInput[]
    connect?: PortofolioWhereUniqueInput | PortofolioWhereUniqueInput[]
    update?: PortofolioUpdateWithWhereUniqueWithoutSocietyInput | PortofolioUpdateWithWhereUniqueWithoutSocietyInput[]
    updateMany?: PortofolioUpdateManyWithWhereWithoutSocietyInput | PortofolioUpdateManyWithWhereWithoutSocietyInput[]
    deleteMany?: PortofolioScalarWhereInput | PortofolioScalarWhereInput[]
  }

  export type PositionAppliedUpdateManyWithoutSocietyNestedInput = {
    create?: XOR<PositionAppliedCreateWithoutSocietyInput, PositionAppliedUncheckedCreateWithoutSocietyInput> | PositionAppliedCreateWithoutSocietyInput[] | PositionAppliedUncheckedCreateWithoutSocietyInput[]
    connectOrCreate?: PositionAppliedCreateOrConnectWithoutSocietyInput | PositionAppliedCreateOrConnectWithoutSocietyInput[]
    upsert?: PositionAppliedUpsertWithWhereUniqueWithoutSocietyInput | PositionAppliedUpsertWithWhereUniqueWithoutSocietyInput[]
    createMany?: PositionAppliedCreateManySocietyInputEnvelope
    set?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
    disconnect?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
    delete?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
    connect?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
    update?: PositionAppliedUpdateWithWhereUniqueWithoutSocietyInput | PositionAppliedUpdateWithWhereUniqueWithoutSocietyInput[]
    updateMany?: PositionAppliedUpdateManyWithWhereWithoutSocietyInput | PositionAppliedUpdateManyWithWhereWithoutSocietyInput[]
    deleteMany?: PositionAppliedScalarWhereInput | PositionAppliedScalarWhereInput[]
  }

  export type PortofolioUncheckedUpdateManyWithoutSocietyNestedInput = {
    create?: XOR<PortofolioCreateWithoutSocietyInput, PortofolioUncheckedCreateWithoutSocietyInput> | PortofolioCreateWithoutSocietyInput[] | PortofolioUncheckedCreateWithoutSocietyInput[]
    connectOrCreate?: PortofolioCreateOrConnectWithoutSocietyInput | PortofolioCreateOrConnectWithoutSocietyInput[]
    upsert?: PortofolioUpsertWithWhereUniqueWithoutSocietyInput | PortofolioUpsertWithWhereUniqueWithoutSocietyInput[]
    createMany?: PortofolioCreateManySocietyInputEnvelope
    set?: PortofolioWhereUniqueInput | PortofolioWhereUniqueInput[]
    disconnect?: PortofolioWhereUniqueInput | PortofolioWhereUniqueInput[]
    delete?: PortofolioWhereUniqueInput | PortofolioWhereUniqueInput[]
    connect?: PortofolioWhereUniqueInput | PortofolioWhereUniqueInput[]
    update?: PortofolioUpdateWithWhereUniqueWithoutSocietyInput | PortofolioUpdateWithWhereUniqueWithoutSocietyInput[]
    updateMany?: PortofolioUpdateManyWithWhereWithoutSocietyInput | PortofolioUpdateManyWithWhereWithoutSocietyInput[]
    deleteMany?: PortofolioScalarWhereInput | PortofolioScalarWhereInput[]
  }

  export type PositionAppliedUncheckedUpdateManyWithoutSocietyNestedInput = {
    create?: XOR<PositionAppliedCreateWithoutSocietyInput, PositionAppliedUncheckedCreateWithoutSocietyInput> | PositionAppliedCreateWithoutSocietyInput[] | PositionAppliedUncheckedCreateWithoutSocietyInput[]
    connectOrCreate?: PositionAppliedCreateOrConnectWithoutSocietyInput | PositionAppliedCreateOrConnectWithoutSocietyInput[]
    upsert?: PositionAppliedUpsertWithWhereUniqueWithoutSocietyInput | PositionAppliedUpsertWithWhereUniqueWithoutSocietyInput[]
    createMany?: PositionAppliedCreateManySocietyInputEnvelope
    set?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
    disconnect?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
    delete?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
    connect?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
    update?: PositionAppliedUpdateWithWhereUniqueWithoutSocietyInput | PositionAppliedUpdateWithWhereUniqueWithoutSocietyInput[]
    updateMany?: PositionAppliedUpdateManyWithWhereWithoutSocietyInput | PositionAppliedUpdateManyWithWhereWithoutSocietyInput[]
    deleteMany?: PositionAppliedScalarWhereInput | PositionAppliedScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput
    connect?: UserWhereUniqueInput
  }

  export type AvailablePositionCreateNestedManyWithoutCompanyInput = {
    create?: XOR<AvailablePositionCreateWithoutCompanyInput, AvailablePositionUncheckedCreateWithoutCompanyInput> | AvailablePositionCreateWithoutCompanyInput[] | AvailablePositionUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AvailablePositionCreateOrConnectWithoutCompanyInput | AvailablePositionCreateOrConnectWithoutCompanyInput[]
    createMany?: AvailablePositionCreateManyCompanyInputEnvelope
    connect?: AvailablePositionWhereUniqueInput | AvailablePositionWhereUniqueInput[]
  }

  export type AvailablePositionUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<AvailablePositionCreateWithoutCompanyInput, AvailablePositionUncheckedCreateWithoutCompanyInput> | AvailablePositionCreateWithoutCompanyInput[] | AvailablePositionUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AvailablePositionCreateOrConnectWithoutCompanyInput | AvailablePositionCreateOrConnectWithoutCompanyInput[]
    createMany?: AvailablePositionCreateManyCompanyInputEnvelope
    connect?: AvailablePositionWhereUniqueInput | AvailablePositionWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput
    upsert?: UserUpsertWithoutCompanyInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCompanyInput, UserUpdateWithoutCompanyInput>, UserUncheckedUpdateWithoutCompanyInput>
  }

  export type AvailablePositionUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<AvailablePositionCreateWithoutCompanyInput, AvailablePositionUncheckedCreateWithoutCompanyInput> | AvailablePositionCreateWithoutCompanyInput[] | AvailablePositionUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AvailablePositionCreateOrConnectWithoutCompanyInput | AvailablePositionCreateOrConnectWithoutCompanyInput[]
    upsert?: AvailablePositionUpsertWithWhereUniqueWithoutCompanyInput | AvailablePositionUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: AvailablePositionCreateManyCompanyInputEnvelope
    set?: AvailablePositionWhereUniqueInput | AvailablePositionWhereUniqueInput[]
    disconnect?: AvailablePositionWhereUniqueInput | AvailablePositionWhereUniqueInput[]
    delete?: AvailablePositionWhereUniqueInput | AvailablePositionWhereUniqueInput[]
    connect?: AvailablePositionWhereUniqueInput | AvailablePositionWhereUniqueInput[]
    update?: AvailablePositionUpdateWithWhereUniqueWithoutCompanyInput | AvailablePositionUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: AvailablePositionUpdateManyWithWhereWithoutCompanyInput | AvailablePositionUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: AvailablePositionScalarWhereInput | AvailablePositionScalarWhereInput[]
  }

  export type AvailablePositionUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<AvailablePositionCreateWithoutCompanyInput, AvailablePositionUncheckedCreateWithoutCompanyInput> | AvailablePositionCreateWithoutCompanyInput[] | AvailablePositionUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AvailablePositionCreateOrConnectWithoutCompanyInput | AvailablePositionCreateOrConnectWithoutCompanyInput[]
    upsert?: AvailablePositionUpsertWithWhereUniqueWithoutCompanyInput | AvailablePositionUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: AvailablePositionCreateManyCompanyInputEnvelope
    set?: AvailablePositionWhereUniqueInput | AvailablePositionWhereUniqueInput[]
    disconnect?: AvailablePositionWhereUniqueInput | AvailablePositionWhereUniqueInput[]
    delete?: AvailablePositionWhereUniqueInput | AvailablePositionWhereUniqueInput[]
    connect?: AvailablePositionWhereUniqueInput | AvailablePositionWhereUniqueInput[]
    update?: AvailablePositionUpdateWithWhereUniqueWithoutCompanyInput | AvailablePositionUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: AvailablePositionUpdateManyWithWhereWithoutCompanyInput | AvailablePositionUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: AvailablePositionScalarWhereInput | AvailablePositionScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutJobsInput = {
    create?: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutJobsInput
    connect?: CompanyWhereUniqueInput
  }

  export type PositionAppliedCreateNestedManyWithoutPositionInput = {
    create?: XOR<PositionAppliedCreateWithoutPositionInput, PositionAppliedUncheckedCreateWithoutPositionInput> | PositionAppliedCreateWithoutPositionInput[] | PositionAppliedUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: PositionAppliedCreateOrConnectWithoutPositionInput | PositionAppliedCreateOrConnectWithoutPositionInput[]
    createMany?: PositionAppliedCreateManyPositionInputEnvelope
    connect?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
  }

  export type JobEmbeddingCreateNestedOneWithoutJobInput = {
    create?: XOR<JobEmbeddingCreateWithoutJobInput, JobEmbeddingUncheckedCreateWithoutJobInput>
    connectOrCreate?: JobEmbeddingCreateOrConnectWithoutJobInput
    connect?: JobEmbeddingWhereUniqueInput
  }

  export type PositionAppliedUncheckedCreateNestedManyWithoutPositionInput = {
    create?: XOR<PositionAppliedCreateWithoutPositionInput, PositionAppliedUncheckedCreateWithoutPositionInput> | PositionAppliedCreateWithoutPositionInput[] | PositionAppliedUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: PositionAppliedCreateOrConnectWithoutPositionInput | PositionAppliedCreateOrConnectWithoutPositionInput[]
    createMany?: PositionAppliedCreateManyPositionInputEnvelope
    connect?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
  }

  export type JobEmbeddingUncheckedCreateNestedOneWithoutJobInput = {
    create?: XOR<JobEmbeddingCreateWithoutJobInput, JobEmbeddingUncheckedCreateWithoutJobInput>
    connectOrCreate?: JobEmbeddingCreateOrConnectWithoutJobInput
    connect?: JobEmbeddingWhereUniqueInput
  }

  export type CompanyUpdateOneRequiredWithoutJobsNestedInput = {
    create?: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutJobsInput
    upsert?: CompanyUpsertWithoutJobsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutJobsInput, CompanyUpdateWithoutJobsInput>, CompanyUncheckedUpdateWithoutJobsInput>
  }

  export type PositionAppliedUpdateManyWithoutPositionNestedInput = {
    create?: XOR<PositionAppliedCreateWithoutPositionInput, PositionAppliedUncheckedCreateWithoutPositionInput> | PositionAppliedCreateWithoutPositionInput[] | PositionAppliedUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: PositionAppliedCreateOrConnectWithoutPositionInput | PositionAppliedCreateOrConnectWithoutPositionInput[]
    upsert?: PositionAppliedUpsertWithWhereUniqueWithoutPositionInput | PositionAppliedUpsertWithWhereUniqueWithoutPositionInput[]
    createMany?: PositionAppliedCreateManyPositionInputEnvelope
    set?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
    disconnect?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
    delete?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
    connect?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
    update?: PositionAppliedUpdateWithWhereUniqueWithoutPositionInput | PositionAppliedUpdateWithWhereUniqueWithoutPositionInput[]
    updateMany?: PositionAppliedUpdateManyWithWhereWithoutPositionInput | PositionAppliedUpdateManyWithWhereWithoutPositionInput[]
    deleteMany?: PositionAppliedScalarWhereInput | PositionAppliedScalarWhereInput[]
  }

  export type JobEmbeddingUpdateOneWithoutJobNestedInput = {
    create?: XOR<JobEmbeddingCreateWithoutJobInput, JobEmbeddingUncheckedCreateWithoutJobInput>
    connectOrCreate?: JobEmbeddingCreateOrConnectWithoutJobInput
    upsert?: JobEmbeddingUpsertWithoutJobInput
    disconnect?: JobEmbeddingWhereInput | boolean
    delete?: JobEmbeddingWhereInput | boolean
    connect?: JobEmbeddingWhereUniqueInput
    update?: XOR<XOR<JobEmbeddingUpdateToOneWithWhereWithoutJobInput, JobEmbeddingUpdateWithoutJobInput>, JobEmbeddingUncheckedUpdateWithoutJobInput>
  }

  export type PositionAppliedUncheckedUpdateManyWithoutPositionNestedInput = {
    create?: XOR<PositionAppliedCreateWithoutPositionInput, PositionAppliedUncheckedCreateWithoutPositionInput> | PositionAppliedCreateWithoutPositionInput[] | PositionAppliedUncheckedCreateWithoutPositionInput[]
    connectOrCreate?: PositionAppliedCreateOrConnectWithoutPositionInput | PositionAppliedCreateOrConnectWithoutPositionInput[]
    upsert?: PositionAppliedUpsertWithWhereUniqueWithoutPositionInput | PositionAppliedUpsertWithWhereUniqueWithoutPositionInput[]
    createMany?: PositionAppliedCreateManyPositionInputEnvelope
    set?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
    disconnect?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
    delete?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
    connect?: PositionAppliedWhereUniqueInput | PositionAppliedWhereUniqueInput[]
    update?: PositionAppliedUpdateWithWhereUniqueWithoutPositionInput | PositionAppliedUpdateWithWhereUniqueWithoutPositionInput[]
    updateMany?: PositionAppliedUpdateManyWithWhereWithoutPositionInput | PositionAppliedUpdateManyWithWhereWithoutPositionInput[]
    deleteMany?: PositionAppliedScalarWhereInput | PositionAppliedScalarWhereInput[]
  }

  export type JobEmbeddingUncheckedUpdateOneWithoutJobNestedInput = {
    create?: XOR<JobEmbeddingCreateWithoutJobInput, JobEmbeddingUncheckedCreateWithoutJobInput>
    connectOrCreate?: JobEmbeddingCreateOrConnectWithoutJobInput
    upsert?: JobEmbeddingUpsertWithoutJobInput
    disconnect?: JobEmbeddingWhereInput | boolean
    delete?: JobEmbeddingWhereInput | boolean
    connect?: JobEmbeddingWhereUniqueInput
    update?: XOR<XOR<JobEmbeddingUpdateToOneWithWhereWithoutJobInput, JobEmbeddingUpdateWithoutJobInput>, JobEmbeddingUncheckedUpdateWithoutJobInput>
  }

  export type SocietyCreateNestedOneWithoutPortofolioInput = {
    create?: XOR<SocietyCreateWithoutPortofolioInput, SocietyUncheckedCreateWithoutPortofolioInput>
    connectOrCreate?: SocietyCreateOrConnectWithoutPortofolioInput
    connect?: SocietyWhereUniqueInput
  }

  export type PortfolioEmbeddingCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<PortfolioEmbeddingCreateWithoutPortfolioInput, PortfolioEmbeddingUncheckedCreateWithoutPortfolioInput> | PortfolioEmbeddingCreateWithoutPortfolioInput[] | PortfolioEmbeddingUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: PortfolioEmbeddingCreateOrConnectWithoutPortfolioInput | PortfolioEmbeddingCreateOrConnectWithoutPortfolioInput[]
    createMany?: PortfolioEmbeddingCreateManyPortfolioInputEnvelope
    connect?: PortfolioEmbeddingWhereUniqueInput | PortfolioEmbeddingWhereUniqueInput[]
  }

  export type PortfolioEmbeddingUncheckedCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<PortfolioEmbeddingCreateWithoutPortfolioInput, PortfolioEmbeddingUncheckedCreateWithoutPortfolioInput> | PortfolioEmbeddingCreateWithoutPortfolioInput[] | PortfolioEmbeddingUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: PortfolioEmbeddingCreateOrConnectWithoutPortfolioInput | PortfolioEmbeddingCreateOrConnectWithoutPortfolioInput[]
    createMany?: PortfolioEmbeddingCreateManyPortfolioInputEnvelope
    connect?: PortfolioEmbeddingWhereUniqueInput | PortfolioEmbeddingWhereUniqueInput[]
  }

  export type SocietyUpdateOneRequiredWithoutPortofolioNestedInput = {
    create?: XOR<SocietyCreateWithoutPortofolioInput, SocietyUncheckedCreateWithoutPortofolioInput>
    connectOrCreate?: SocietyCreateOrConnectWithoutPortofolioInput
    upsert?: SocietyUpsertWithoutPortofolioInput
    connect?: SocietyWhereUniqueInput
    update?: XOR<XOR<SocietyUpdateToOneWithWhereWithoutPortofolioInput, SocietyUpdateWithoutPortofolioInput>, SocietyUncheckedUpdateWithoutPortofolioInput>
  }

  export type PortfolioEmbeddingUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<PortfolioEmbeddingCreateWithoutPortfolioInput, PortfolioEmbeddingUncheckedCreateWithoutPortfolioInput> | PortfolioEmbeddingCreateWithoutPortfolioInput[] | PortfolioEmbeddingUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: PortfolioEmbeddingCreateOrConnectWithoutPortfolioInput | PortfolioEmbeddingCreateOrConnectWithoutPortfolioInput[]
    upsert?: PortfolioEmbeddingUpsertWithWhereUniqueWithoutPortfolioInput | PortfolioEmbeddingUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: PortfolioEmbeddingCreateManyPortfolioInputEnvelope
    set?: PortfolioEmbeddingWhereUniqueInput | PortfolioEmbeddingWhereUniqueInput[]
    disconnect?: PortfolioEmbeddingWhereUniqueInput | PortfolioEmbeddingWhereUniqueInput[]
    delete?: PortfolioEmbeddingWhereUniqueInput | PortfolioEmbeddingWhereUniqueInput[]
    connect?: PortfolioEmbeddingWhereUniqueInput | PortfolioEmbeddingWhereUniqueInput[]
    update?: PortfolioEmbeddingUpdateWithWhereUniqueWithoutPortfolioInput | PortfolioEmbeddingUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: PortfolioEmbeddingUpdateManyWithWhereWithoutPortfolioInput | PortfolioEmbeddingUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: PortfolioEmbeddingScalarWhereInput | PortfolioEmbeddingScalarWhereInput[]
  }

  export type PortfolioEmbeddingUncheckedUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<PortfolioEmbeddingCreateWithoutPortfolioInput, PortfolioEmbeddingUncheckedCreateWithoutPortfolioInput> | PortfolioEmbeddingCreateWithoutPortfolioInput[] | PortfolioEmbeddingUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: PortfolioEmbeddingCreateOrConnectWithoutPortfolioInput | PortfolioEmbeddingCreateOrConnectWithoutPortfolioInput[]
    upsert?: PortfolioEmbeddingUpsertWithWhereUniqueWithoutPortfolioInput | PortfolioEmbeddingUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: PortfolioEmbeddingCreateManyPortfolioInputEnvelope
    set?: PortfolioEmbeddingWhereUniqueInput | PortfolioEmbeddingWhereUniqueInput[]
    disconnect?: PortfolioEmbeddingWhereUniqueInput | PortfolioEmbeddingWhereUniqueInput[]
    delete?: PortfolioEmbeddingWhereUniqueInput | PortfolioEmbeddingWhereUniqueInput[]
    connect?: PortfolioEmbeddingWhereUniqueInput | PortfolioEmbeddingWhereUniqueInput[]
    update?: PortfolioEmbeddingUpdateWithWhereUniqueWithoutPortfolioInput | PortfolioEmbeddingUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: PortfolioEmbeddingUpdateManyWithWhereWithoutPortfolioInput | PortfolioEmbeddingUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: PortfolioEmbeddingScalarWhereInput | PortfolioEmbeddingScalarWhereInput[]
  }

  export type AvailablePositionCreateNestedOneWithoutApplicantsInput = {
    create?: XOR<AvailablePositionCreateWithoutApplicantsInput, AvailablePositionUncheckedCreateWithoutApplicantsInput>
    connectOrCreate?: AvailablePositionCreateOrConnectWithoutApplicantsInput
    connect?: AvailablePositionWhereUniqueInput
  }

  export type SocietyCreateNestedOneWithoutApplied_jobsInput = {
    create?: XOR<SocietyCreateWithoutApplied_jobsInput, SocietyUncheckedCreateWithoutApplied_jobsInput>
    connectOrCreate?: SocietyCreateOrConnectWithoutApplied_jobsInput
    connect?: SocietyWhereUniqueInput
  }

  export type EnumPositionStatusFieldUpdateOperationsInput = {
    set?: $Enums.PositionStatus
  }

  export type AvailablePositionUpdateOneRequiredWithoutApplicantsNestedInput = {
    create?: XOR<AvailablePositionCreateWithoutApplicantsInput, AvailablePositionUncheckedCreateWithoutApplicantsInput>
    connectOrCreate?: AvailablePositionCreateOrConnectWithoutApplicantsInput
    upsert?: AvailablePositionUpsertWithoutApplicantsInput
    connect?: AvailablePositionWhereUniqueInput
    update?: XOR<XOR<AvailablePositionUpdateToOneWithWhereWithoutApplicantsInput, AvailablePositionUpdateWithoutApplicantsInput>, AvailablePositionUncheckedUpdateWithoutApplicantsInput>
  }

  export type SocietyUpdateOneRequiredWithoutApplied_jobsNestedInput = {
    create?: XOR<SocietyCreateWithoutApplied_jobsInput, SocietyUncheckedCreateWithoutApplied_jobsInput>
    connectOrCreate?: SocietyCreateOrConnectWithoutApplied_jobsInput
    upsert?: SocietyUpsertWithoutApplied_jobsInput
    connect?: SocietyWhereUniqueInput
    update?: XOR<XOR<SocietyUpdateToOneWithWhereWithoutApplied_jobsInput, SocietyUpdateWithoutApplied_jobsInput>, SocietyUncheckedUpdateWithoutApplied_jobsInput>
  }

  export type JobEmbeddingCreateskillsInput = {
    set: string[]
  }

  export type AvailablePositionCreateNestedOneWithoutEmbeddingInput = {
    create?: XOR<AvailablePositionCreateWithoutEmbeddingInput, AvailablePositionUncheckedCreateWithoutEmbeddingInput>
    connectOrCreate?: AvailablePositionCreateOrConnectWithoutEmbeddingInput
    connect?: AvailablePositionWhereUniqueInput
  }

  export type JobEmbeddingUpdateskillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type AvailablePositionUpdateOneRequiredWithoutEmbeddingNestedInput = {
    create?: XOR<AvailablePositionCreateWithoutEmbeddingInput, AvailablePositionUncheckedCreateWithoutEmbeddingInput>
    connectOrCreate?: AvailablePositionCreateOrConnectWithoutEmbeddingInput
    upsert?: AvailablePositionUpsertWithoutEmbeddingInput
    connect?: AvailablePositionWhereUniqueInput
    update?: XOR<XOR<AvailablePositionUpdateToOneWithWhereWithoutEmbeddingInput, AvailablePositionUpdateWithoutEmbeddingInput>, AvailablePositionUncheckedUpdateWithoutEmbeddingInput>
  }

  export type PortfolioEmbeddingCreateskillsInput = {
    set: string[]
  }

  export type PortofolioCreateNestedOneWithoutPortfolioEmbeddingInput = {
    create?: XOR<PortofolioCreateWithoutPortfolioEmbeddingInput, PortofolioUncheckedCreateWithoutPortfolioEmbeddingInput>
    connectOrCreate?: PortofolioCreateOrConnectWithoutPortfolioEmbeddingInput
    connect?: PortofolioWhereUniqueInput
  }

  export type PortfolioEmbeddingUpdateskillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PortofolioUpdateOneRequiredWithoutPortfolioEmbeddingNestedInput = {
    create?: XOR<PortofolioCreateWithoutPortfolioEmbeddingInput, PortofolioUncheckedCreateWithoutPortfolioEmbeddingInput>
    connectOrCreate?: PortofolioCreateOrConnectWithoutPortfolioEmbeddingInput
    upsert?: PortofolioUpsertWithoutPortfolioEmbeddingInput
    connect?: PortofolioWhereUniqueInput
    update?: XOR<XOR<PortofolioUpdateToOneWithWhereWithoutPortfolioEmbeddingInput, PortofolioUpdateWithoutPortfolioEmbeddingInput>, PortofolioUncheckedUpdateWithoutPortfolioEmbeddingInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumPositionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PositionStatus | EnumPositionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PositionStatus[] | ListEnumPositionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PositionStatus[] | ListEnumPositionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPositionStatusFilter<$PrismaModel> | $Enums.PositionStatus
  }

  export type NestedEnumPositionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PositionStatus | EnumPositionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PositionStatus[] | ListEnumPositionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PositionStatus[] | ListEnumPositionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPositionStatusWithAggregatesFilter<$PrismaModel> | $Enums.PositionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPositionStatusFilter<$PrismaModel>
    _max?: NestedEnumPositionStatusFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SocietyCreateWithoutUserInput = {
    name: string
    address: string
    phone: string
    date_of_birth: Date | string
    gender: string
    portofolio?: PortofolioCreateNestedManyWithoutSocietyInput
    applied_jobs?: PositionAppliedCreateNestedManyWithoutSocietyInput
  }

  export type SocietyUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    address: string
    phone: string
    date_of_birth: Date | string
    gender: string
    portofolio?: PortofolioUncheckedCreateNestedManyWithoutSocietyInput
    applied_jobs?: PositionAppliedUncheckedCreateNestedManyWithoutSocietyInput
  }

  export type SocietyCreateOrConnectWithoutUserInput = {
    where: SocietyWhereUniqueInput
    create: XOR<SocietyCreateWithoutUserInput, SocietyUncheckedCreateWithoutUserInput>
  }

  export type CompanyCreateWithoutUserInput = {
    name: string
    address: string
    phone: string
    description: string
    jobs?: AvailablePositionCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    address: string
    phone: string
    description: string
    jobs?: AvailablePositionUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutUserInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutUserInput, CompanyUncheckedCreateWithoutUserInput>
  }

  export type AdminCreateWithoutUserInput = {
    name: string
    email: string
    password: string
    phone?: string | null
    address?: string | null
    date_of_birth?: Date | string | null
  }

  export type AdminUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    email: string
    password: string
    phone?: string | null
    address?: string | null
    date_of_birth?: Date | string | null
  }

  export type AdminCreateOrConnectWithoutUserInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
  }

  export type AdminCreateManyUserInputEnvelope = {
    data: AdminCreateManyUserInput | AdminCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SocietyUpsertWithoutUserInput = {
    update: XOR<SocietyUpdateWithoutUserInput, SocietyUncheckedUpdateWithoutUserInput>
    create: XOR<SocietyCreateWithoutUserInput, SocietyUncheckedCreateWithoutUserInput>
    where?: SocietyWhereInput
  }

  export type SocietyUpdateToOneWithWhereWithoutUserInput = {
    where?: SocietyWhereInput
    data: XOR<SocietyUpdateWithoutUserInput, SocietyUncheckedUpdateWithoutUserInput>
  }

  export type SocietyUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    portofolio?: PortofolioUpdateManyWithoutSocietyNestedInput
    applied_jobs?: PositionAppliedUpdateManyWithoutSocietyNestedInput
  }

  export type SocietyUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    portofolio?: PortofolioUncheckedUpdateManyWithoutSocietyNestedInput
    applied_jobs?: PositionAppliedUncheckedUpdateManyWithoutSocietyNestedInput
  }

  export type CompanyUpsertWithoutUserInput = {
    update: XOR<CompanyUpdateWithoutUserInput, CompanyUncheckedUpdateWithoutUserInput>
    create: XOR<CompanyCreateWithoutUserInput, CompanyUncheckedCreateWithoutUserInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutUserInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutUserInput, CompanyUncheckedUpdateWithoutUserInput>
  }

  export type CompanyUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    jobs?: AvailablePositionUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    jobs?: AvailablePositionUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type AdminUpsertWithWhereUniqueWithoutUserInput = {
    where: AdminWhereUniqueInput
    update: XOR<AdminUpdateWithoutUserInput, AdminUncheckedUpdateWithoutUserInput>
    create: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
  }

  export type AdminUpdateWithWhereUniqueWithoutUserInput = {
    where: AdminWhereUniqueInput
    data: XOR<AdminUpdateWithoutUserInput, AdminUncheckedUpdateWithoutUserInput>
  }

  export type AdminUpdateManyWithWhereWithoutUserInput = {
    where: AdminScalarWhereInput
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyWithoutUserInput>
  }

  export type AdminScalarWhereInput = {
    AND?: AdminScalarWhereInput | AdminScalarWhereInput[]
    OR?: AdminScalarWhereInput[]
    NOT?: AdminScalarWhereInput | AdminScalarWhereInput[]
    id?: IntFilter<"Admin"> | number
    name?: StringFilter<"Admin"> | string
    email?: StringFilter<"Admin"> | string
    password?: StringFilter<"Admin"> | string
    phone?: StringNullableFilter<"Admin"> | string | null
    address?: StringNullableFilter<"Admin"> | string | null
    date_of_birth?: DateTimeNullableFilter<"Admin"> | Date | string | null
    user_id?: StringFilter<"Admin"> | string
  }

  export type UserCreateWithoutAdminInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    phone?: string | null
    address?: string | null
    date_of_birth?: Date | string | null
    createdAt?: Date | string
    society?: SocietyCreateNestedOneWithoutUserInput
    company?: CompanyCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAdminInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    phone?: string | null
    address?: string | null
    date_of_birth?: Date | string | null
    createdAt?: Date | string
    society?: SocietyUncheckedCreateNestedOneWithoutUserInput
    company?: CompanyUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAdminInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
  }

  export type UserUpsertWithoutAdminInput = {
    update: XOR<UserUpdateWithoutAdminInput, UserUncheckedUpdateWithoutAdminInput>
    create: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAdminInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAdminInput, UserUncheckedUpdateWithoutAdminInput>
  }

  export type UserUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    society?: SocietyUpdateOneWithoutUserNestedInput
    company?: CompanyUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    society?: SocietyUncheckedUpdateOneWithoutUserNestedInput
    company?: CompanyUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutSocietyInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    phone?: string | null
    address?: string | null
    date_of_birth?: Date | string | null
    createdAt?: Date | string
    company?: CompanyCreateNestedOneWithoutUserInput
    Admin?: AdminCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSocietyInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    phone?: string | null
    address?: string | null
    date_of_birth?: Date | string | null
    createdAt?: Date | string
    company?: CompanyUncheckedCreateNestedOneWithoutUserInput
    Admin?: AdminUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSocietyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSocietyInput, UserUncheckedCreateWithoutSocietyInput>
  }

  export type PortofolioCreateWithoutSocietyInput = {
    skill: string
    description: string
    file: string
    PortfolioEmbedding?: PortfolioEmbeddingCreateNestedManyWithoutPortfolioInput
  }

  export type PortofolioUncheckedCreateWithoutSocietyInput = {
    id?: number
    skill: string
    description: string
    file: string
    PortfolioEmbedding?: PortfolioEmbeddingUncheckedCreateNestedManyWithoutPortfolioInput
  }

  export type PortofolioCreateOrConnectWithoutSocietyInput = {
    where: PortofolioWhereUniqueInput
    create: XOR<PortofolioCreateWithoutSocietyInput, PortofolioUncheckedCreateWithoutSocietyInput>
  }

  export type PortofolioCreateManySocietyInputEnvelope = {
    data: PortofolioCreateManySocietyInput | PortofolioCreateManySocietyInput[]
    skipDuplicates?: boolean
  }

  export type PositionAppliedCreateWithoutSocietyInput = {
    apply_date?: Date | string
    status?: $Enums.PositionStatus
    position: AvailablePositionCreateNestedOneWithoutApplicantsInput
  }

  export type PositionAppliedUncheckedCreateWithoutSocietyInput = {
    id?: number
    available_position_id: number
    apply_date?: Date | string
    status?: $Enums.PositionStatus
  }

  export type PositionAppliedCreateOrConnectWithoutSocietyInput = {
    where: PositionAppliedWhereUniqueInput
    create: XOR<PositionAppliedCreateWithoutSocietyInput, PositionAppliedUncheckedCreateWithoutSocietyInput>
  }

  export type PositionAppliedCreateManySocietyInputEnvelope = {
    data: PositionAppliedCreateManySocietyInput | PositionAppliedCreateManySocietyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutSocietyInput = {
    update: XOR<UserUpdateWithoutSocietyInput, UserUncheckedUpdateWithoutSocietyInput>
    create: XOR<UserCreateWithoutSocietyInput, UserUncheckedCreateWithoutSocietyInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSocietyInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSocietyInput, UserUncheckedUpdateWithoutSocietyInput>
  }

  export type UserUpdateWithoutSocietyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneWithoutUserNestedInput
    Admin?: AdminUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSocietyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUncheckedUpdateOneWithoutUserNestedInput
    Admin?: AdminUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PortofolioUpsertWithWhereUniqueWithoutSocietyInput = {
    where: PortofolioWhereUniqueInput
    update: XOR<PortofolioUpdateWithoutSocietyInput, PortofolioUncheckedUpdateWithoutSocietyInput>
    create: XOR<PortofolioCreateWithoutSocietyInput, PortofolioUncheckedCreateWithoutSocietyInput>
  }

  export type PortofolioUpdateWithWhereUniqueWithoutSocietyInput = {
    where: PortofolioWhereUniqueInput
    data: XOR<PortofolioUpdateWithoutSocietyInput, PortofolioUncheckedUpdateWithoutSocietyInput>
  }

  export type PortofolioUpdateManyWithWhereWithoutSocietyInput = {
    where: PortofolioScalarWhereInput
    data: XOR<PortofolioUpdateManyMutationInput, PortofolioUncheckedUpdateManyWithoutSocietyInput>
  }

  export type PortofolioScalarWhereInput = {
    AND?: PortofolioScalarWhereInput | PortofolioScalarWhereInput[]
    OR?: PortofolioScalarWhereInput[]
    NOT?: PortofolioScalarWhereInput | PortofolioScalarWhereInput[]
    id?: IntFilter<"Portofolio"> | number
    skill?: StringFilter<"Portofolio"> | string
    description?: StringFilter<"Portofolio"> | string
    file?: StringFilter<"Portofolio"> | string
    society_id?: IntFilter<"Portofolio"> | number
  }

  export type PositionAppliedUpsertWithWhereUniqueWithoutSocietyInput = {
    where: PositionAppliedWhereUniqueInput
    update: XOR<PositionAppliedUpdateWithoutSocietyInput, PositionAppliedUncheckedUpdateWithoutSocietyInput>
    create: XOR<PositionAppliedCreateWithoutSocietyInput, PositionAppliedUncheckedCreateWithoutSocietyInput>
  }

  export type PositionAppliedUpdateWithWhereUniqueWithoutSocietyInput = {
    where: PositionAppliedWhereUniqueInput
    data: XOR<PositionAppliedUpdateWithoutSocietyInput, PositionAppliedUncheckedUpdateWithoutSocietyInput>
  }

  export type PositionAppliedUpdateManyWithWhereWithoutSocietyInput = {
    where: PositionAppliedScalarWhereInput
    data: XOR<PositionAppliedUpdateManyMutationInput, PositionAppliedUncheckedUpdateManyWithoutSocietyInput>
  }

  export type PositionAppliedScalarWhereInput = {
    AND?: PositionAppliedScalarWhereInput | PositionAppliedScalarWhereInput[]
    OR?: PositionAppliedScalarWhereInput[]
    NOT?: PositionAppliedScalarWhereInput | PositionAppliedScalarWhereInput[]
    id?: IntFilter<"PositionApplied"> | number
    available_position_id?: IntFilter<"PositionApplied"> | number
    society_id?: IntFilter<"PositionApplied"> | number
    apply_date?: DateTimeFilter<"PositionApplied"> | Date | string
    status?: EnumPositionStatusFilter<"PositionApplied"> | $Enums.PositionStatus
  }

  export type UserCreateWithoutCompanyInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    phone?: string | null
    address?: string | null
    date_of_birth?: Date | string | null
    createdAt?: Date | string
    society?: SocietyCreateNestedOneWithoutUserInput
    Admin?: AdminCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCompanyInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    phone?: string | null
    address?: string | null
    date_of_birth?: Date | string | null
    createdAt?: Date | string
    society?: SocietyUncheckedCreateNestedOneWithoutUserInput
    Admin?: AdminUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCompanyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type AvailablePositionCreateWithoutCompanyInput = {
    position_name: string
    capacity: number
    description: string
    submission_start_date: Date | string
    submission_end_date: Date | string
    applicants?: PositionAppliedCreateNestedManyWithoutPositionInput
    embedding?: JobEmbeddingCreateNestedOneWithoutJobInput
  }

  export type AvailablePositionUncheckedCreateWithoutCompanyInput = {
    id?: number
    position_name: string
    capacity: number
    description: string
    submission_start_date: Date | string
    submission_end_date: Date | string
    applicants?: PositionAppliedUncheckedCreateNestedManyWithoutPositionInput
    embedding?: JobEmbeddingUncheckedCreateNestedOneWithoutJobInput
  }

  export type AvailablePositionCreateOrConnectWithoutCompanyInput = {
    where: AvailablePositionWhereUniqueInput
    create: XOR<AvailablePositionCreateWithoutCompanyInput, AvailablePositionUncheckedCreateWithoutCompanyInput>
  }

  export type AvailablePositionCreateManyCompanyInputEnvelope = {
    data: AvailablePositionCreateManyCompanyInput | AvailablePositionCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCompanyInput = {
    update: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCompanyInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
  }

  export type UserUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    society?: SocietyUpdateOneWithoutUserNestedInput
    Admin?: AdminUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    society?: SocietyUncheckedUpdateOneWithoutUserNestedInput
    Admin?: AdminUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AvailablePositionUpsertWithWhereUniqueWithoutCompanyInput = {
    where: AvailablePositionWhereUniqueInput
    update: XOR<AvailablePositionUpdateWithoutCompanyInput, AvailablePositionUncheckedUpdateWithoutCompanyInput>
    create: XOR<AvailablePositionCreateWithoutCompanyInput, AvailablePositionUncheckedCreateWithoutCompanyInput>
  }

  export type AvailablePositionUpdateWithWhereUniqueWithoutCompanyInput = {
    where: AvailablePositionWhereUniqueInput
    data: XOR<AvailablePositionUpdateWithoutCompanyInput, AvailablePositionUncheckedUpdateWithoutCompanyInput>
  }

  export type AvailablePositionUpdateManyWithWhereWithoutCompanyInput = {
    where: AvailablePositionScalarWhereInput
    data: XOR<AvailablePositionUpdateManyMutationInput, AvailablePositionUncheckedUpdateManyWithoutCompanyInput>
  }

  export type AvailablePositionScalarWhereInput = {
    AND?: AvailablePositionScalarWhereInput | AvailablePositionScalarWhereInput[]
    OR?: AvailablePositionScalarWhereInput[]
    NOT?: AvailablePositionScalarWhereInput | AvailablePositionScalarWhereInput[]
    id?: IntFilter<"AvailablePosition"> | number
    position_name?: StringFilter<"AvailablePosition"> | string
    capacity?: IntFilter<"AvailablePosition"> | number
    description?: StringFilter<"AvailablePosition"> | string
    submission_start_date?: DateTimeFilter<"AvailablePosition"> | Date | string
    submission_end_date?: DateTimeFilter<"AvailablePosition"> | Date | string
    company_id?: IntFilter<"AvailablePosition"> | number
  }

  export type CompanyCreateWithoutJobsInput = {
    name: string
    address: string
    phone: string
    description: string
    user: UserCreateNestedOneWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutJobsInput = {
    id?: number
    name: string
    address: string
    phone: string
    description: string
    user_id: string
  }

  export type CompanyCreateOrConnectWithoutJobsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
  }

  export type PositionAppliedCreateWithoutPositionInput = {
    apply_date?: Date | string
    status?: $Enums.PositionStatus
    society: SocietyCreateNestedOneWithoutApplied_jobsInput
  }

  export type PositionAppliedUncheckedCreateWithoutPositionInput = {
    id?: number
    society_id: number
    apply_date?: Date | string
    status?: $Enums.PositionStatus
  }

  export type PositionAppliedCreateOrConnectWithoutPositionInput = {
    where: PositionAppliedWhereUniqueInput
    create: XOR<PositionAppliedCreateWithoutPositionInput, PositionAppliedUncheckedCreateWithoutPositionInput>
  }

  export type PositionAppliedCreateManyPositionInputEnvelope = {
    data: PositionAppliedCreateManyPositionInput | PositionAppliedCreateManyPositionInput[]
    skipDuplicates?: boolean
  }

  export type JobEmbeddingCreateWithoutJobInput = {
    id?: string
    embedding: JsonNullValueInput | InputJsonValue
    skills?: JobEmbeddingCreateskillsInput | string[]
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobEmbeddingUncheckedCreateWithoutJobInput = {
    id?: string
    embedding: JsonNullValueInput | InputJsonValue
    skills?: JobEmbeddingCreateskillsInput | string[]
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobEmbeddingCreateOrConnectWithoutJobInput = {
    where: JobEmbeddingWhereUniqueInput
    create: XOR<JobEmbeddingCreateWithoutJobInput, JobEmbeddingUncheckedCreateWithoutJobInput>
  }

  export type CompanyUpsertWithoutJobsInput = {
    update: XOR<CompanyUpdateWithoutJobsInput, CompanyUncheckedUpdateWithoutJobsInput>
    create: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutJobsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutJobsInput, CompanyUncheckedUpdateWithoutJobsInput>
  }

  export type CompanyUpdateWithoutJobsInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutJobsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type PositionAppliedUpsertWithWhereUniqueWithoutPositionInput = {
    where: PositionAppliedWhereUniqueInput
    update: XOR<PositionAppliedUpdateWithoutPositionInput, PositionAppliedUncheckedUpdateWithoutPositionInput>
    create: XOR<PositionAppliedCreateWithoutPositionInput, PositionAppliedUncheckedCreateWithoutPositionInput>
  }

  export type PositionAppliedUpdateWithWhereUniqueWithoutPositionInput = {
    where: PositionAppliedWhereUniqueInput
    data: XOR<PositionAppliedUpdateWithoutPositionInput, PositionAppliedUncheckedUpdateWithoutPositionInput>
  }

  export type PositionAppliedUpdateManyWithWhereWithoutPositionInput = {
    where: PositionAppliedScalarWhereInput
    data: XOR<PositionAppliedUpdateManyMutationInput, PositionAppliedUncheckedUpdateManyWithoutPositionInput>
  }

  export type JobEmbeddingUpsertWithoutJobInput = {
    update: XOR<JobEmbeddingUpdateWithoutJobInput, JobEmbeddingUncheckedUpdateWithoutJobInput>
    create: XOR<JobEmbeddingCreateWithoutJobInput, JobEmbeddingUncheckedCreateWithoutJobInput>
    where?: JobEmbeddingWhereInput
  }

  export type JobEmbeddingUpdateToOneWithWhereWithoutJobInput = {
    where?: JobEmbeddingWhereInput
    data: XOR<JobEmbeddingUpdateWithoutJobInput, JobEmbeddingUncheckedUpdateWithoutJobInput>
  }

  export type JobEmbeddingUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    embedding?: JsonNullValueInput | InputJsonValue
    skills?: JobEmbeddingUpdateskillsInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobEmbeddingUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    embedding?: JsonNullValueInput | InputJsonValue
    skills?: JobEmbeddingUpdateskillsInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocietyCreateWithoutPortofolioInput = {
    name: string
    address: string
    phone: string
    date_of_birth: Date | string
    gender: string
    user: UserCreateNestedOneWithoutSocietyInput
    applied_jobs?: PositionAppliedCreateNestedManyWithoutSocietyInput
  }

  export type SocietyUncheckedCreateWithoutPortofolioInput = {
    id?: number
    name: string
    address: string
    phone: string
    date_of_birth: Date | string
    gender: string
    user_id: string
    applied_jobs?: PositionAppliedUncheckedCreateNestedManyWithoutSocietyInput
  }

  export type SocietyCreateOrConnectWithoutPortofolioInput = {
    where: SocietyWhereUniqueInput
    create: XOR<SocietyCreateWithoutPortofolioInput, SocietyUncheckedCreateWithoutPortofolioInput>
  }

  export type PortfolioEmbeddingCreateWithoutPortfolioInput = {
    id?: string
    embedding: JsonNullValueInput | InputJsonValue
    skills?: PortfolioEmbeddingCreateskillsInput | string[]
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioEmbeddingUncheckedCreateWithoutPortfolioInput = {
    id?: string
    embedding: JsonNullValueInput | InputJsonValue
    skills?: PortfolioEmbeddingCreateskillsInput | string[]
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioEmbeddingCreateOrConnectWithoutPortfolioInput = {
    where: PortfolioEmbeddingWhereUniqueInput
    create: XOR<PortfolioEmbeddingCreateWithoutPortfolioInput, PortfolioEmbeddingUncheckedCreateWithoutPortfolioInput>
  }

  export type PortfolioEmbeddingCreateManyPortfolioInputEnvelope = {
    data: PortfolioEmbeddingCreateManyPortfolioInput | PortfolioEmbeddingCreateManyPortfolioInput[]
    skipDuplicates?: boolean
  }

  export type SocietyUpsertWithoutPortofolioInput = {
    update: XOR<SocietyUpdateWithoutPortofolioInput, SocietyUncheckedUpdateWithoutPortofolioInput>
    create: XOR<SocietyCreateWithoutPortofolioInput, SocietyUncheckedCreateWithoutPortofolioInput>
    where?: SocietyWhereInput
  }

  export type SocietyUpdateToOneWithWhereWithoutPortofolioInput = {
    where?: SocietyWhereInput
    data: XOR<SocietyUpdateWithoutPortofolioInput, SocietyUncheckedUpdateWithoutPortofolioInput>
  }

  export type SocietyUpdateWithoutPortofolioInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutSocietyNestedInput
    applied_jobs?: PositionAppliedUpdateManyWithoutSocietyNestedInput
  }

  export type SocietyUncheckedUpdateWithoutPortofolioInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    applied_jobs?: PositionAppliedUncheckedUpdateManyWithoutSocietyNestedInput
  }

  export type PortfolioEmbeddingUpsertWithWhereUniqueWithoutPortfolioInput = {
    where: PortfolioEmbeddingWhereUniqueInput
    update: XOR<PortfolioEmbeddingUpdateWithoutPortfolioInput, PortfolioEmbeddingUncheckedUpdateWithoutPortfolioInput>
    create: XOR<PortfolioEmbeddingCreateWithoutPortfolioInput, PortfolioEmbeddingUncheckedCreateWithoutPortfolioInput>
  }

  export type PortfolioEmbeddingUpdateWithWhereUniqueWithoutPortfolioInput = {
    where: PortfolioEmbeddingWhereUniqueInput
    data: XOR<PortfolioEmbeddingUpdateWithoutPortfolioInput, PortfolioEmbeddingUncheckedUpdateWithoutPortfolioInput>
  }

  export type PortfolioEmbeddingUpdateManyWithWhereWithoutPortfolioInput = {
    where: PortfolioEmbeddingScalarWhereInput
    data: XOR<PortfolioEmbeddingUpdateManyMutationInput, PortfolioEmbeddingUncheckedUpdateManyWithoutPortfolioInput>
  }

  export type PortfolioEmbeddingScalarWhereInput = {
    AND?: PortfolioEmbeddingScalarWhereInput | PortfolioEmbeddingScalarWhereInput[]
    OR?: PortfolioEmbeddingScalarWhereInput[]
    NOT?: PortfolioEmbeddingScalarWhereInput | PortfolioEmbeddingScalarWhereInput[]
    id?: StringFilter<"PortfolioEmbedding"> | string
    portfolioId?: IntFilter<"PortfolioEmbedding"> | number
    embedding?: JsonFilter<"PortfolioEmbedding">
    skills?: StringNullableListFilter<"PortfolioEmbedding">
    description?: StringFilter<"PortfolioEmbedding"> | string
    createdAt?: DateTimeFilter<"PortfolioEmbedding"> | Date | string
    updatedAt?: DateTimeFilter<"PortfolioEmbedding"> | Date | string
  }

  export type AvailablePositionCreateWithoutApplicantsInput = {
    position_name: string
    capacity: number
    description: string
    submission_start_date: Date | string
    submission_end_date: Date | string
    company: CompanyCreateNestedOneWithoutJobsInput
    embedding?: JobEmbeddingCreateNestedOneWithoutJobInput
  }

  export type AvailablePositionUncheckedCreateWithoutApplicantsInput = {
    id?: number
    position_name: string
    capacity: number
    description: string
    submission_start_date: Date | string
    submission_end_date: Date | string
    company_id: number
    embedding?: JobEmbeddingUncheckedCreateNestedOneWithoutJobInput
  }

  export type AvailablePositionCreateOrConnectWithoutApplicantsInput = {
    where: AvailablePositionWhereUniqueInput
    create: XOR<AvailablePositionCreateWithoutApplicantsInput, AvailablePositionUncheckedCreateWithoutApplicantsInput>
  }

  export type SocietyCreateWithoutApplied_jobsInput = {
    name: string
    address: string
    phone: string
    date_of_birth: Date | string
    gender: string
    user: UserCreateNestedOneWithoutSocietyInput
    portofolio?: PortofolioCreateNestedManyWithoutSocietyInput
  }

  export type SocietyUncheckedCreateWithoutApplied_jobsInput = {
    id?: number
    name: string
    address: string
    phone: string
    date_of_birth: Date | string
    gender: string
    user_id: string
    portofolio?: PortofolioUncheckedCreateNestedManyWithoutSocietyInput
  }

  export type SocietyCreateOrConnectWithoutApplied_jobsInput = {
    where: SocietyWhereUniqueInput
    create: XOR<SocietyCreateWithoutApplied_jobsInput, SocietyUncheckedCreateWithoutApplied_jobsInput>
  }

  export type AvailablePositionUpsertWithoutApplicantsInput = {
    update: XOR<AvailablePositionUpdateWithoutApplicantsInput, AvailablePositionUncheckedUpdateWithoutApplicantsInput>
    create: XOR<AvailablePositionCreateWithoutApplicantsInput, AvailablePositionUncheckedCreateWithoutApplicantsInput>
    where?: AvailablePositionWhereInput
  }

  export type AvailablePositionUpdateToOneWithWhereWithoutApplicantsInput = {
    where?: AvailablePositionWhereInput
    data: XOR<AvailablePositionUpdateWithoutApplicantsInput, AvailablePositionUncheckedUpdateWithoutApplicantsInput>
  }

  export type AvailablePositionUpdateWithoutApplicantsInput = {
    position_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    submission_start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    submission_end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobsNestedInput
    embedding?: JobEmbeddingUpdateOneWithoutJobNestedInput
  }

  export type AvailablePositionUncheckedUpdateWithoutApplicantsInput = {
    id?: IntFieldUpdateOperationsInput | number
    position_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    submission_start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    submission_end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    company_id?: IntFieldUpdateOperationsInput | number
    embedding?: JobEmbeddingUncheckedUpdateOneWithoutJobNestedInput
  }

  export type SocietyUpsertWithoutApplied_jobsInput = {
    update: XOR<SocietyUpdateWithoutApplied_jobsInput, SocietyUncheckedUpdateWithoutApplied_jobsInput>
    create: XOR<SocietyCreateWithoutApplied_jobsInput, SocietyUncheckedCreateWithoutApplied_jobsInput>
    where?: SocietyWhereInput
  }

  export type SocietyUpdateToOneWithWhereWithoutApplied_jobsInput = {
    where?: SocietyWhereInput
    data: XOR<SocietyUpdateWithoutApplied_jobsInput, SocietyUncheckedUpdateWithoutApplied_jobsInput>
  }

  export type SocietyUpdateWithoutApplied_jobsInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutSocietyNestedInput
    portofolio?: PortofolioUpdateManyWithoutSocietyNestedInput
  }

  export type SocietyUncheckedUpdateWithoutApplied_jobsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    date_of_birth?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    portofolio?: PortofolioUncheckedUpdateManyWithoutSocietyNestedInput
  }

  export type AvailablePositionCreateWithoutEmbeddingInput = {
    position_name: string
    capacity: number
    description: string
    submission_start_date: Date | string
    submission_end_date: Date | string
    company: CompanyCreateNestedOneWithoutJobsInput
    applicants?: PositionAppliedCreateNestedManyWithoutPositionInput
  }

  export type AvailablePositionUncheckedCreateWithoutEmbeddingInput = {
    id?: number
    position_name: string
    capacity: number
    description: string
    submission_start_date: Date | string
    submission_end_date: Date | string
    company_id: number
    applicants?: PositionAppliedUncheckedCreateNestedManyWithoutPositionInput
  }

  export type AvailablePositionCreateOrConnectWithoutEmbeddingInput = {
    where: AvailablePositionWhereUniqueInput
    create: XOR<AvailablePositionCreateWithoutEmbeddingInput, AvailablePositionUncheckedCreateWithoutEmbeddingInput>
  }

  export type AvailablePositionUpsertWithoutEmbeddingInput = {
    update: XOR<AvailablePositionUpdateWithoutEmbeddingInput, AvailablePositionUncheckedUpdateWithoutEmbeddingInput>
    create: XOR<AvailablePositionCreateWithoutEmbeddingInput, AvailablePositionUncheckedCreateWithoutEmbeddingInput>
    where?: AvailablePositionWhereInput
  }

  export type AvailablePositionUpdateToOneWithWhereWithoutEmbeddingInput = {
    where?: AvailablePositionWhereInput
    data: XOR<AvailablePositionUpdateWithoutEmbeddingInput, AvailablePositionUncheckedUpdateWithoutEmbeddingInput>
  }

  export type AvailablePositionUpdateWithoutEmbeddingInput = {
    position_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    submission_start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    submission_end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobsNestedInput
    applicants?: PositionAppliedUpdateManyWithoutPositionNestedInput
  }

  export type AvailablePositionUncheckedUpdateWithoutEmbeddingInput = {
    id?: IntFieldUpdateOperationsInput | number
    position_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    submission_start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    submission_end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    company_id?: IntFieldUpdateOperationsInput | number
    applicants?: PositionAppliedUncheckedUpdateManyWithoutPositionNestedInput
  }

  export type PortofolioCreateWithoutPortfolioEmbeddingInput = {
    skill: string
    description: string
    file: string
    society: SocietyCreateNestedOneWithoutPortofolioInput
  }

  export type PortofolioUncheckedCreateWithoutPortfolioEmbeddingInput = {
    id?: number
    skill: string
    description: string
    file: string
    society_id: number
  }

  export type PortofolioCreateOrConnectWithoutPortfolioEmbeddingInput = {
    where: PortofolioWhereUniqueInput
    create: XOR<PortofolioCreateWithoutPortfolioEmbeddingInput, PortofolioUncheckedCreateWithoutPortfolioEmbeddingInput>
  }

  export type PortofolioUpsertWithoutPortfolioEmbeddingInput = {
    update: XOR<PortofolioUpdateWithoutPortfolioEmbeddingInput, PortofolioUncheckedUpdateWithoutPortfolioEmbeddingInput>
    create: XOR<PortofolioCreateWithoutPortfolioEmbeddingInput, PortofolioUncheckedCreateWithoutPortfolioEmbeddingInput>
    where?: PortofolioWhereInput
  }

  export type PortofolioUpdateToOneWithWhereWithoutPortfolioEmbeddingInput = {
    where?: PortofolioWhereInput
    data: XOR<PortofolioUpdateWithoutPortfolioEmbeddingInput, PortofolioUncheckedUpdateWithoutPortfolioEmbeddingInput>
  }

  export type PortofolioUpdateWithoutPortfolioEmbeddingInput = {
    skill?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
    society?: SocietyUpdateOneRequiredWithoutPortofolioNestedInput
  }

  export type PortofolioUncheckedUpdateWithoutPortfolioEmbeddingInput = {
    id?: IntFieldUpdateOperationsInput | number
    skill?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
    society_id?: IntFieldUpdateOperationsInput | number
  }

  export type AdminCreateManyUserInput = {
    id?: number
    name: string
    email: string
    password: string
    phone?: string | null
    address?: string | null
    date_of_birth?: Date | string | null
  }

  export type AdminUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdminUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdminUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PortofolioCreateManySocietyInput = {
    id?: number
    skill: string
    description: string
    file: string
  }

  export type PositionAppliedCreateManySocietyInput = {
    id?: number
    available_position_id: number
    apply_date?: Date | string
    status?: $Enums.PositionStatus
  }

  export type PortofolioUpdateWithoutSocietyInput = {
    skill?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
    PortfolioEmbedding?: PortfolioEmbeddingUpdateManyWithoutPortfolioNestedInput
  }

  export type PortofolioUncheckedUpdateWithoutSocietyInput = {
    id?: IntFieldUpdateOperationsInput | number
    skill?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
    PortfolioEmbedding?: PortfolioEmbeddingUncheckedUpdateManyWithoutPortfolioNestedInput
  }

  export type PortofolioUncheckedUpdateManyWithoutSocietyInput = {
    id?: IntFieldUpdateOperationsInput | number
    skill?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    file?: StringFieldUpdateOperationsInput | string
  }

  export type PositionAppliedUpdateWithoutSocietyInput = {
    apply_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPositionStatusFieldUpdateOperationsInput | $Enums.PositionStatus
    position?: AvailablePositionUpdateOneRequiredWithoutApplicantsNestedInput
  }

  export type PositionAppliedUncheckedUpdateWithoutSocietyInput = {
    id?: IntFieldUpdateOperationsInput | number
    available_position_id?: IntFieldUpdateOperationsInput | number
    apply_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPositionStatusFieldUpdateOperationsInput | $Enums.PositionStatus
  }

  export type PositionAppliedUncheckedUpdateManyWithoutSocietyInput = {
    id?: IntFieldUpdateOperationsInput | number
    available_position_id?: IntFieldUpdateOperationsInput | number
    apply_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPositionStatusFieldUpdateOperationsInput | $Enums.PositionStatus
  }

  export type AvailablePositionCreateManyCompanyInput = {
    id?: number
    position_name: string
    capacity: number
    description: string
    submission_start_date: Date | string
    submission_end_date: Date | string
  }

  export type AvailablePositionUpdateWithoutCompanyInput = {
    position_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    submission_start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    submission_end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    applicants?: PositionAppliedUpdateManyWithoutPositionNestedInput
    embedding?: JobEmbeddingUpdateOneWithoutJobNestedInput
  }

  export type AvailablePositionUncheckedUpdateWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    position_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    submission_start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    submission_end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    applicants?: PositionAppliedUncheckedUpdateManyWithoutPositionNestedInput
    embedding?: JobEmbeddingUncheckedUpdateOneWithoutJobNestedInput
  }

  export type AvailablePositionUncheckedUpdateManyWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    position_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    submission_start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    submission_end_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PositionAppliedCreateManyPositionInput = {
    id?: number
    society_id: number
    apply_date?: Date | string
    status?: $Enums.PositionStatus
  }

  export type PositionAppliedUpdateWithoutPositionInput = {
    apply_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPositionStatusFieldUpdateOperationsInput | $Enums.PositionStatus
    society?: SocietyUpdateOneRequiredWithoutApplied_jobsNestedInput
  }

  export type PositionAppliedUncheckedUpdateWithoutPositionInput = {
    id?: IntFieldUpdateOperationsInput | number
    society_id?: IntFieldUpdateOperationsInput | number
    apply_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPositionStatusFieldUpdateOperationsInput | $Enums.PositionStatus
  }

  export type PositionAppliedUncheckedUpdateManyWithoutPositionInput = {
    id?: IntFieldUpdateOperationsInput | number
    society_id?: IntFieldUpdateOperationsInput | number
    apply_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPositionStatusFieldUpdateOperationsInput | $Enums.PositionStatus
  }

  export type PortfolioEmbeddingCreateManyPortfolioInput = {
    id?: string
    embedding: JsonNullValueInput | InputJsonValue
    skills?: PortfolioEmbeddingCreateskillsInput | string[]
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioEmbeddingUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    embedding?: JsonNullValueInput | InputJsonValue
    skills?: PortfolioEmbeddingUpdateskillsInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioEmbeddingUncheckedUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    embedding?: JsonNullValueInput | InputJsonValue
    skills?: PortfolioEmbeddingUpdateskillsInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioEmbeddingUncheckedUpdateManyWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    embedding?: JsonNullValueInput | InputJsonValue
    skills?: PortfolioEmbeddingUpdateskillsInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



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