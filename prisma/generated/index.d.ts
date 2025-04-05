
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
 * Model Users
 * 
 */
export type Users = $Result.DefaultSelection<Prisma.$UsersPayload>
/**
 * Model Airports
 * 
 */
export type Airports = $Result.DefaultSelection<Prisma.$AirportsPayload>
/**
 * Model Locals
 * 
 */
export type Locals = $Result.DefaultSelection<Prisma.$LocalsPayload>
/**
 * Model Route
 * 
 */
export type Route = $Result.DefaultSelection<Prisma.$RoutePayload>
/**
 * Model CabinsRoute
 * 
 */
export type CabinsRoute = $Result.DefaultSelection<Prisma.$CabinsRoutePayload>
/**
 * Model AirportsRoute
 * 
 */
export type AirportsRoute = $Result.DefaultSelection<Prisma.$AirportsRoutePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * const users = await prisma.users.findMany()
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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **Users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.UsersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.airports`: Exposes CRUD operations for the **Airports** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Airports
    * const airports = await prisma.airports.findMany()
    * ```
    */
  get airports(): Prisma.AirportsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.locals`: Exposes CRUD operations for the **Locals** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locals
    * const locals = await prisma.locals.findMany()
    * ```
    */
  get locals(): Prisma.LocalsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.route`: Exposes CRUD operations for the **Route** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Routes
    * const routes = await prisma.route.findMany()
    * ```
    */
  get route(): Prisma.RouteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cabinsRoute`: Exposes CRUD operations for the **CabinsRoute** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CabinsRoutes
    * const cabinsRoutes = await prisma.cabinsRoute.findMany()
    * ```
    */
  get cabinsRoute(): Prisma.CabinsRouteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.airportsRoute`: Exposes CRUD operations for the **AirportsRoute** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AirportsRoutes
    * const airportsRoutes = await prisma.airportsRoute.findMany()
    * ```
    */
  get airportsRoute(): Prisma.AirportsRouteDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.5.0
   * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
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
    Users: 'Users',
    Airports: 'Airports',
    Locals: 'Locals',
    Route: 'Route',
    CabinsRoute: 'CabinsRoute',
    AirportsRoute: 'AirportsRoute'
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
      modelProps: "users" | "airports" | "locals" | "route" | "cabinsRoute" | "airportsRoute"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Users: {
        payload: Prisma.$UsersPayload<ExtArgs>
        fields: Prisma.UsersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findFirst: {
            args: Prisma.UsersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findMany: {
            args: Prisma.UsersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          create: {
            args: Prisma.UsersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          createMany: {
            args: Prisma.UsersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          delete: {
            args: Prisma.UsersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          update: {
            args: Prisma.UsersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          deleteMany: {
            args: Prisma.UsersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          upsert: {
            args: Prisma.UsersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.UsersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      Airports: {
        payload: Prisma.$AirportsPayload<ExtArgs>
        fields: Prisma.AirportsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AirportsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AirportsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsPayload>
          }
          findFirst: {
            args: Prisma.AirportsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AirportsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsPayload>
          }
          findMany: {
            args: Prisma.AirportsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsPayload>[]
          }
          create: {
            args: Prisma.AirportsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsPayload>
          }
          createMany: {
            args: Prisma.AirportsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AirportsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsPayload>[]
          }
          delete: {
            args: Prisma.AirportsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsPayload>
          }
          update: {
            args: Prisma.AirportsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsPayload>
          }
          deleteMany: {
            args: Prisma.AirportsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AirportsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AirportsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsPayload>[]
          }
          upsert: {
            args: Prisma.AirportsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsPayload>
          }
          aggregate: {
            args: Prisma.AirportsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAirports>
          }
          groupBy: {
            args: Prisma.AirportsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AirportsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AirportsCountArgs<ExtArgs>
            result: $Utils.Optional<AirportsCountAggregateOutputType> | number
          }
        }
      }
      Locals: {
        payload: Prisma.$LocalsPayload<ExtArgs>
        fields: Prisma.LocalsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocalsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocalsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalsPayload>
          }
          findFirst: {
            args: Prisma.LocalsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocalsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalsPayload>
          }
          findMany: {
            args: Prisma.LocalsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalsPayload>[]
          }
          create: {
            args: Prisma.LocalsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalsPayload>
          }
          createMany: {
            args: Prisma.LocalsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocalsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalsPayload>[]
          }
          delete: {
            args: Prisma.LocalsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalsPayload>
          }
          update: {
            args: Prisma.LocalsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalsPayload>
          }
          deleteMany: {
            args: Prisma.LocalsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocalsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocalsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalsPayload>[]
          }
          upsert: {
            args: Prisma.LocalsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalsPayload>
          }
          aggregate: {
            args: Prisma.LocalsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocals>
          }
          groupBy: {
            args: Prisma.LocalsGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocalsGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocalsCountArgs<ExtArgs>
            result: $Utils.Optional<LocalsCountAggregateOutputType> | number
          }
        }
      }
      Route: {
        payload: Prisma.$RoutePayload<ExtArgs>
        fields: Prisma.RouteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RouteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RouteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          findFirst: {
            args: Prisma.RouteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RouteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          findMany: {
            args: Prisma.RouteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>[]
          }
          create: {
            args: Prisma.RouteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          createMany: {
            args: Prisma.RouteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RouteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>[]
          }
          delete: {
            args: Prisma.RouteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          update: {
            args: Prisma.RouteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          deleteMany: {
            args: Prisma.RouteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RouteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RouteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>[]
          }
          upsert: {
            args: Prisma.RouteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          aggregate: {
            args: Prisma.RouteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoute>
          }
          groupBy: {
            args: Prisma.RouteGroupByArgs<ExtArgs>
            result: $Utils.Optional<RouteGroupByOutputType>[]
          }
          count: {
            args: Prisma.RouteCountArgs<ExtArgs>
            result: $Utils.Optional<RouteCountAggregateOutputType> | number
          }
        }
      }
      CabinsRoute: {
        payload: Prisma.$CabinsRoutePayload<ExtArgs>
        fields: Prisma.CabinsRouteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CabinsRouteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinsRoutePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CabinsRouteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinsRoutePayload>
          }
          findFirst: {
            args: Prisma.CabinsRouteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinsRoutePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CabinsRouteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinsRoutePayload>
          }
          findMany: {
            args: Prisma.CabinsRouteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinsRoutePayload>[]
          }
          create: {
            args: Prisma.CabinsRouteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinsRoutePayload>
          }
          createMany: {
            args: Prisma.CabinsRouteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CabinsRouteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinsRoutePayload>[]
          }
          delete: {
            args: Prisma.CabinsRouteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinsRoutePayload>
          }
          update: {
            args: Prisma.CabinsRouteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinsRoutePayload>
          }
          deleteMany: {
            args: Prisma.CabinsRouteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CabinsRouteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CabinsRouteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinsRoutePayload>[]
          }
          upsert: {
            args: Prisma.CabinsRouteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinsRoutePayload>
          }
          aggregate: {
            args: Prisma.CabinsRouteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCabinsRoute>
          }
          groupBy: {
            args: Prisma.CabinsRouteGroupByArgs<ExtArgs>
            result: $Utils.Optional<CabinsRouteGroupByOutputType>[]
          }
          count: {
            args: Prisma.CabinsRouteCountArgs<ExtArgs>
            result: $Utils.Optional<CabinsRouteCountAggregateOutputType> | number
          }
        }
      }
      AirportsRoute: {
        payload: Prisma.$AirportsRoutePayload<ExtArgs>
        fields: Prisma.AirportsRouteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AirportsRouteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsRoutePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AirportsRouteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsRoutePayload>
          }
          findFirst: {
            args: Prisma.AirportsRouteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsRoutePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AirportsRouteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsRoutePayload>
          }
          findMany: {
            args: Prisma.AirportsRouteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsRoutePayload>[]
          }
          create: {
            args: Prisma.AirportsRouteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsRoutePayload>
          }
          createMany: {
            args: Prisma.AirportsRouteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AirportsRouteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsRoutePayload>[]
          }
          delete: {
            args: Prisma.AirportsRouteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsRoutePayload>
          }
          update: {
            args: Prisma.AirportsRouteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsRoutePayload>
          }
          deleteMany: {
            args: Prisma.AirportsRouteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AirportsRouteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AirportsRouteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsRoutePayload>[]
          }
          upsert: {
            args: Prisma.AirportsRouteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportsRoutePayload>
          }
          aggregate: {
            args: Prisma.AirportsRouteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAirportsRoute>
          }
          groupBy: {
            args: Prisma.AirportsRouteGroupByArgs<ExtArgs>
            result: $Utils.Optional<AirportsRouteGroupByOutputType>[]
          }
          count: {
            args: Prisma.AirportsRouteCountArgs<ExtArgs>
            result: $Utils.Optional<AirportsRouteCountAggregateOutputType> | number
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
    users?: UsersOmit
    airports?: AirportsOmit
    locals?: LocalsOmit
    route?: RouteOmit
    cabinsRoute?: CabinsRouteOmit
    airportsRoute?: AirportsRouteOmit
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
   * Count Type AirportsCountOutputType
   */

  export type AirportsCountOutputType = {
    routes: number
  }

  export type AirportsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routes?: boolean | AirportsCountOutputTypeCountRoutesArgs
  }

  // Custom InputTypes
  /**
   * AirportsCountOutputType without action
   */
  export type AirportsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirportsCountOutputType
     */
    select?: AirportsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AirportsCountOutputType without action
   */
  export type AirportsCountOutputTypeCountRoutesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AirportsRouteWhereInput
  }


  /**
   * Count Type RouteCountOutputType
   */

  export type RouteCountOutputType = {
    airports: number
    cabins: number
  }

  export type RouteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airports?: boolean | RouteCountOutputTypeCountAirportsArgs
    cabins?: boolean | RouteCountOutputTypeCountCabinsArgs
  }

  // Custom InputTypes
  /**
   * RouteCountOutputType without action
   */
  export type RouteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteCountOutputType
     */
    select?: RouteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RouteCountOutputType without action
   */
  export type RouteCountOutputTypeCountAirportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AirportsRouteWhereInput
  }

  /**
   * RouteCountOutputType without action
   */
  export type RouteCountOutputTypeCountCabinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CabinsRouteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    user: string | null
    password: string | null
    name: string | null
    active: boolean | null
    dateJoined: Date | null
    lastLogin: Date | null
    updatedAt: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    user: string | null
    password: string | null
    name: string | null
    active: boolean | null
    dateJoined: Date | null
    lastLogin: Date | null
    updatedAt: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    user: number
    password: number
    name: number
    active: number
    dateJoined: number
    lastLogin: number
    updatedAt: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    user?: true
    password?: true
    name?: true
    active?: true
    dateJoined?: true
    lastLogin?: true
    updatedAt?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    user?: true
    password?: true
    name?: true
    active?: true
    dateJoined?: true
    lastLogin?: true
    updatedAt?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    user?: true
    password?: true
    name?: true
    active?: true
    dateJoined?: true
    lastLogin?: true
    updatedAt?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to aggregate.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsersWhereUniqueInput
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
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type UsersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsersWhereInput
    orderBy?: UsersOrderByWithAggregationInput | UsersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: UsersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    user: string
    password: string
    name: string
    active: boolean
    dateJoined: Date
    lastLogin: Date | null
    updatedAt: Date
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends UsersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type UsersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user?: boolean
    password?: boolean
    name?: boolean
    active?: boolean
    dateJoined?: boolean
    lastLogin?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["users"]>

  export type UsersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user?: boolean
    password?: boolean
    name?: boolean
    active?: boolean
    dateJoined?: boolean
    lastLogin?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["users"]>

  export type UsersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user?: boolean
    password?: boolean
    name?: boolean
    active?: boolean
    dateJoined?: boolean
    lastLogin?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["users"]>

  export type UsersSelectScalar = {
    id?: boolean
    user?: boolean
    password?: boolean
    name?: boolean
    active?: boolean
    dateJoined?: boolean
    lastLogin?: boolean
    updatedAt?: boolean
  }

  export type UsersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user" | "password" | "name" | "active" | "dateJoined" | "lastLogin" | "updatedAt", ExtArgs["result"]["users"]>

  export type $UsersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Users"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user: string
      password: string
      name: string
      active: boolean
      dateJoined: Date
      lastLogin: Date | null
      updatedAt: Date
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type UsersGetPayload<S extends boolean | null | undefined | UsersDefaultArgs> = $Result.GetResult<Prisma.$UsersPayload, S>

  type UsersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface UsersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Users'], meta: { name: 'Users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {UsersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsersFindUniqueArgs>(args: SelectSubset<T, UsersFindUniqueArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsersFindUniqueOrThrowArgs>(args: SelectSubset<T, UsersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsersFindFirstArgs>(args?: SelectSubset<T, UsersFindFirstArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsersFindFirstOrThrowArgs>(args?: SelectSubset<T, UsersFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsersFindManyArgs>(args?: SelectSubset<T, UsersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {UsersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends UsersCreateArgs>(args: SelectSubset<T, UsersCreateArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UsersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsersCreateManyArgs>(args?: SelectSubset<T, UsersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UsersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsersCreateManyAndReturnArgs>(args?: SelectSubset<T, UsersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {UsersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends UsersDeleteArgs>(args: SelectSubset<T, UsersDeleteArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {UsersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsersUpdateArgs>(args: SelectSubset<T, UsersUpdateArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UsersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsersDeleteManyArgs>(args?: SelectSubset<T, UsersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsersUpdateManyArgs>(args: SelectSubset<T, UsersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UsersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
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
    updateManyAndReturn<T extends UsersUpdateManyAndReturnArgs>(args: SelectSubset<T, UsersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {UsersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends UsersUpsertArgs>(args: SelectSubset<T, UsersUpsertArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UsersCountArgs>(
      args?: Subset<T, UsersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersGroupByArgs} args - Group by arguments.
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
      T extends UsersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsersGroupByArgs['orderBy'] }
        : { orderBy?: UsersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UsersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Users model
   */
  readonly fields: UsersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Users model
   */ 
  interface UsersFieldRefs {
    readonly id: FieldRef<"Users", 'Int'>
    readonly user: FieldRef<"Users", 'String'>
    readonly password: FieldRef<"Users", 'String'>
    readonly name: FieldRef<"Users", 'String'>
    readonly active: FieldRef<"Users", 'Boolean'>
    readonly dateJoined: FieldRef<"Users", 'DateTime'>
    readonly lastLogin: FieldRef<"Users", 'DateTime'>
    readonly updatedAt: FieldRef<"Users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Users findUnique
   */
  export type UsersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users findUniqueOrThrow
   */
  export type UsersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users findFirst
   */
  export type UsersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
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
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users findFirstOrThrow
   */
  export type UsersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
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
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users findMany
   */
  export type UsersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UsersWhereUniqueInput
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
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users create
   */
  export type UsersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * The data needed to create a Users.
     */
    data: XOR<UsersCreateInput, UsersUncheckedCreateInput>
  }

  /**
   * Users createMany
   */
  export type UsersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UsersCreateManyInput | UsersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Users createManyAndReturn
   */
  export type UsersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UsersCreateManyInput | UsersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Users update
   */
  export type UsersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * The data needed to update a Users.
     */
    data: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
    /**
     * Choose, which Users to update.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users updateMany
   */
  export type UsersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UsersUpdateManyMutationInput, UsersUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * Users updateManyAndReturn
   */
  export type UsersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UsersUpdateManyMutationInput, UsersUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * Users upsert
   */
  export type UsersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * The filter to search for the Users to update in case it exists.
     */
    where: UsersWhereUniqueInput
    /**
     * In case the Users found by the `where` argument doesn't exist, create a new Users with this data.
     */
    create: XOR<UsersCreateInput, UsersUncheckedCreateInput>
    /**
     * In case the Users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
  }

  /**
   * Users delete
   */
  export type UsersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Filter which Users to delete.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users deleteMany
   */
  export type UsersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * Users without action
   */
  export type UsersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
  }


  /**
   * Model Airports
   */

  export type AggregateAirports = {
    _count: AirportsCountAggregateOutputType | null
    _avg: AirportsAvgAggregateOutputType | null
    _sum: AirportsSumAggregateOutputType | null
    _min: AirportsMinAggregateOutputType | null
    _max: AirportsMaxAggregateOutputType | null
  }

  export type AirportsAvgAggregateOutputType = {
    id: number | null
  }

  export type AirportsSumAggregateOutputType = {
    id: number | null
  }

  export type AirportsMinAggregateOutputType = {
    id: number | null
    city: string | null
    airportCode: string | null
  }

  export type AirportsMaxAggregateOutputType = {
    id: number | null
    city: string | null
    airportCode: string | null
  }

  export type AirportsCountAggregateOutputType = {
    id: number
    city: number
    airportCode: number
    _all: number
  }


  export type AirportsAvgAggregateInputType = {
    id?: true
  }

  export type AirportsSumAggregateInputType = {
    id?: true
  }

  export type AirportsMinAggregateInputType = {
    id?: true
    city?: true
    airportCode?: true
  }

  export type AirportsMaxAggregateInputType = {
    id?: true
    city?: true
    airportCode?: true
  }

  export type AirportsCountAggregateInputType = {
    id?: true
    city?: true
    airportCode?: true
    _all?: true
  }

  export type AirportsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Airports to aggregate.
     */
    where?: AirportsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airports to fetch.
     */
    orderBy?: AirportsOrderByWithRelationInput | AirportsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AirportsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Airports
    **/
    _count?: true | AirportsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AirportsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AirportsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AirportsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AirportsMaxAggregateInputType
  }

  export type GetAirportsAggregateType<T extends AirportsAggregateArgs> = {
        [P in keyof T & keyof AggregateAirports]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAirports[P]>
      : GetScalarType<T[P], AggregateAirports[P]>
  }




  export type AirportsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AirportsWhereInput
    orderBy?: AirportsOrderByWithAggregationInput | AirportsOrderByWithAggregationInput[]
    by: AirportsScalarFieldEnum[] | AirportsScalarFieldEnum
    having?: AirportsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AirportsCountAggregateInputType | true
    _avg?: AirportsAvgAggregateInputType
    _sum?: AirportsSumAggregateInputType
    _min?: AirportsMinAggregateInputType
    _max?: AirportsMaxAggregateInputType
  }

  export type AirportsGroupByOutputType = {
    id: number
    city: string
    airportCode: string
    _count: AirportsCountAggregateOutputType | null
    _avg: AirportsAvgAggregateOutputType | null
    _sum: AirportsSumAggregateOutputType | null
    _min: AirportsMinAggregateOutputType | null
    _max: AirportsMaxAggregateOutputType | null
  }

  type GetAirportsGroupByPayload<T extends AirportsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AirportsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AirportsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AirportsGroupByOutputType[P]>
            : GetScalarType<T[P], AirportsGroupByOutputType[P]>
        }
      >
    >


  export type AirportsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    city?: boolean
    airportCode?: boolean
    local?: boolean | Airports$localArgs<ExtArgs>
    routes?: boolean | Airports$routesArgs<ExtArgs>
    _count?: boolean | AirportsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["airports"]>

  export type AirportsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    city?: boolean
    airportCode?: boolean
  }, ExtArgs["result"]["airports"]>

  export type AirportsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    city?: boolean
    airportCode?: boolean
  }, ExtArgs["result"]["airports"]>

  export type AirportsSelectScalar = {
    id?: boolean
    city?: boolean
    airportCode?: boolean
  }

  export type AirportsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "city" | "airportCode", ExtArgs["result"]["airports"]>
  export type AirportsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    local?: boolean | Airports$localArgs<ExtArgs>
    routes?: boolean | Airports$routesArgs<ExtArgs>
    _count?: boolean | AirportsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AirportsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AirportsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AirportsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Airports"
    objects: {
      local: Prisma.$LocalsPayload<ExtArgs> | null
      routes: Prisma.$AirportsRoutePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      city: string
      airportCode: string
    }, ExtArgs["result"]["airports"]>
    composites: {}
  }

  type AirportsGetPayload<S extends boolean | null | undefined | AirportsDefaultArgs> = $Result.GetResult<Prisma.$AirportsPayload, S>

  type AirportsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AirportsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AirportsCountAggregateInputType | true
    }

  export interface AirportsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Airports'], meta: { name: 'Airports' } }
    /**
     * Find zero or one Airports that matches the filter.
     * @param {AirportsFindUniqueArgs} args - Arguments to find a Airports
     * @example
     * // Get one Airports
     * const airports = await prisma.airports.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AirportsFindUniqueArgs>(args: SelectSubset<T, AirportsFindUniqueArgs<ExtArgs>>): Prisma__AirportsClient<$Result.GetResult<Prisma.$AirportsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Airports that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AirportsFindUniqueOrThrowArgs} args - Arguments to find a Airports
     * @example
     * // Get one Airports
     * const airports = await prisma.airports.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AirportsFindUniqueOrThrowArgs>(args: SelectSubset<T, AirportsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AirportsClient<$Result.GetResult<Prisma.$AirportsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Airports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportsFindFirstArgs} args - Arguments to find a Airports
     * @example
     * // Get one Airports
     * const airports = await prisma.airports.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AirportsFindFirstArgs>(args?: SelectSubset<T, AirportsFindFirstArgs<ExtArgs>>): Prisma__AirportsClient<$Result.GetResult<Prisma.$AirportsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Airports that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportsFindFirstOrThrowArgs} args - Arguments to find a Airports
     * @example
     * // Get one Airports
     * const airports = await prisma.airports.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AirportsFindFirstOrThrowArgs>(args?: SelectSubset<T, AirportsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AirportsClient<$Result.GetResult<Prisma.$AirportsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Airports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Airports
     * const airports = await prisma.airports.findMany()
     * 
     * // Get first 10 Airports
     * const airports = await prisma.airports.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const airportsWithIdOnly = await prisma.airports.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AirportsFindManyArgs>(args?: SelectSubset<T, AirportsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirportsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Airports.
     * @param {AirportsCreateArgs} args - Arguments to create a Airports.
     * @example
     * // Create one Airports
     * const Airports = await prisma.airports.create({
     *   data: {
     *     // ... data to create a Airports
     *   }
     * })
     * 
     */
    create<T extends AirportsCreateArgs>(args: SelectSubset<T, AirportsCreateArgs<ExtArgs>>): Prisma__AirportsClient<$Result.GetResult<Prisma.$AirportsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Airports.
     * @param {AirportsCreateManyArgs} args - Arguments to create many Airports.
     * @example
     * // Create many Airports
     * const airports = await prisma.airports.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AirportsCreateManyArgs>(args?: SelectSubset<T, AirportsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Airports and returns the data saved in the database.
     * @param {AirportsCreateManyAndReturnArgs} args - Arguments to create many Airports.
     * @example
     * // Create many Airports
     * const airports = await prisma.airports.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Airports and only return the `id`
     * const airportsWithIdOnly = await prisma.airports.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AirportsCreateManyAndReturnArgs>(args?: SelectSubset<T, AirportsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirportsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Airports.
     * @param {AirportsDeleteArgs} args - Arguments to delete one Airports.
     * @example
     * // Delete one Airports
     * const Airports = await prisma.airports.delete({
     *   where: {
     *     // ... filter to delete one Airports
     *   }
     * })
     * 
     */
    delete<T extends AirportsDeleteArgs>(args: SelectSubset<T, AirportsDeleteArgs<ExtArgs>>): Prisma__AirportsClient<$Result.GetResult<Prisma.$AirportsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Airports.
     * @param {AirportsUpdateArgs} args - Arguments to update one Airports.
     * @example
     * // Update one Airports
     * const airports = await prisma.airports.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AirportsUpdateArgs>(args: SelectSubset<T, AirportsUpdateArgs<ExtArgs>>): Prisma__AirportsClient<$Result.GetResult<Prisma.$AirportsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Airports.
     * @param {AirportsDeleteManyArgs} args - Arguments to filter Airports to delete.
     * @example
     * // Delete a few Airports
     * const { count } = await prisma.airports.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AirportsDeleteManyArgs>(args?: SelectSubset<T, AirportsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Airports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Airports
     * const airports = await prisma.airports.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AirportsUpdateManyArgs>(args: SelectSubset<T, AirportsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Airports and returns the data updated in the database.
     * @param {AirportsUpdateManyAndReturnArgs} args - Arguments to update many Airports.
     * @example
     * // Update many Airports
     * const airports = await prisma.airports.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Airports and only return the `id`
     * const airportsWithIdOnly = await prisma.airports.updateManyAndReturn({
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
    updateManyAndReturn<T extends AirportsUpdateManyAndReturnArgs>(args: SelectSubset<T, AirportsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirportsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Airports.
     * @param {AirportsUpsertArgs} args - Arguments to update or create a Airports.
     * @example
     * // Update or create a Airports
     * const airports = await prisma.airports.upsert({
     *   create: {
     *     // ... data to create a Airports
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Airports we want to update
     *   }
     * })
     */
    upsert<T extends AirportsUpsertArgs>(args: SelectSubset<T, AirportsUpsertArgs<ExtArgs>>): Prisma__AirportsClient<$Result.GetResult<Prisma.$AirportsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Airports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportsCountArgs} args - Arguments to filter Airports to count.
     * @example
     * // Count the number of Airports
     * const count = await prisma.airports.count({
     *   where: {
     *     // ... the filter for the Airports we want to count
     *   }
     * })
    **/
    count<T extends AirportsCountArgs>(
      args?: Subset<T, AirportsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AirportsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Airports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AirportsAggregateArgs>(args: Subset<T, AirportsAggregateArgs>): Prisma.PrismaPromise<GetAirportsAggregateType<T>>

    /**
     * Group by Airports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportsGroupByArgs} args - Group by arguments.
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
      T extends AirportsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AirportsGroupByArgs['orderBy'] }
        : { orderBy?: AirportsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AirportsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAirportsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Airports model
   */
  readonly fields: AirportsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Airports.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AirportsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    local<T extends Airports$localArgs<ExtArgs> = {}>(args?: Subset<T, Airports$localArgs<ExtArgs>>): Prisma__LocalsClient<$Result.GetResult<Prisma.$LocalsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    routes<T extends Airports$routesArgs<ExtArgs> = {}>(args?: Subset<T, Airports$routesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirportsRoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Airports model
   */ 
  interface AirportsFieldRefs {
    readonly id: FieldRef<"Airports", 'Int'>
    readonly city: FieldRef<"Airports", 'String'>
    readonly airportCode: FieldRef<"Airports", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Airports findUnique
   */
  export type AirportsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airports
     */
    select?: AirportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airports
     */
    omit?: AirportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsInclude<ExtArgs> | null
    /**
     * Filter, which Airports to fetch.
     */
    where: AirportsWhereUniqueInput
  }

  /**
   * Airports findUniqueOrThrow
   */
  export type AirportsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airports
     */
    select?: AirportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airports
     */
    omit?: AirportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsInclude<ExtArgs> | null
    /**
     * Filter, which Airports to fetch.
     */
    where: AirportsWhereUniqueInput
  }

  /**
   * Airports findFirst
   */
  export type AirportsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airports
     */
    select?: AirportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airports
     */
    omit?: AirportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsInclude<ExtArgs> | null
    /**
     * Filter, which Airports to fetch.
     */
    where?: AirportsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airports to fetch.
     */
    orderBy?: AirportsOrderByWithRelationInput | AirportsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Airports.
     */
    cursor?: AirportsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Airports.
     */
    distinct?: AirportsScalarFieldEnum | AirportsScalarFieldEnum[]
  }

  /**
   * Airports findFirstOrThrow
   */
  export type AirportsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airports
     */
    select?: AirportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airports
     */
    omit?: AirportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsInclude<ExtArgs> | null
    /**
     * Filter, which Airports to fetch.
     */
    where?: AirportsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airports to fetch.
     */
    orderBy?: AirportsOrderByWithRelationInput | AirportsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Airports.
     */
    cursor?: AirportsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Airports.
     */
    distinct?: AirportsScalarFieldEnum | AirportsScalarFieldEnum[]
  }

  /**
   * Airports findMany
   */
  export type AirportsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airports
     */
    select?: AirportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airports
     */
    omit?: AirportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsInclude<ExtArgs> | null
    /**
     * Filter, which Airports to fetch.
     */
    where?: AirportsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airports to fetch.
     */
    orderBy?: AirportsOrderByWithRelationInput | AirportsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Airports.
     */
    cursor?: AirportsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airports.
     */
    skip?: number
    distinct?: AirportsScalarFieldEnum | AirportsScalarFieldEnum[]
  }

  /**
   * Airports create
   */
  export type AirportsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airports
     */
    select?: AirportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airports
     */
    omit?: AirportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsInclude<ExtArgs> | null
    /**
     * The data needed to create a Airports.
     */
    data: XOR<AirportsCreateInput, AirportsUncheckedCreateInput>
  }

  /**
   * Airports createMany
   */
  export type AirportsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Airports.
     */
    data: AirportsCreateManyInput | AirportsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Airports createManyAndReturn
   */
  export type AirportsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airports
     */
    select?: AirportsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Airports
     */
    omit?: AirportsOmit<ExtArgs> | null
    /**
     * The data used to create many Airports.
     */
    data: AirportsCreateManyInput | AirportsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Airports update
   */
  export type AirportsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airports
     */
    select?: AirportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airports
     */
    omit?: AirportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsInclude<ExtArgs> | null
    /**
     * The data needed to update a Airports.
     */
    data: XOR<AirportsUpdateInput, AirportsUncheckedUpdateInput>
    /**
     * Choose, which Airports to update.
     */
    where: AirportsWhereUniqueInput
  }

  /**
   * Airports updateMany
   */
  export type AirportsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Airports.
     */
    data: XOR<AirportsUpdateManyMutationInput, AirportsUncheckedUpdateManyInput>
    /**
     * Filter which Airports to update
     */
    where?: AirportsWhereInput
    /**
     * Limit how many Airports to update.
     */
    limit?: number
  }

  /**
   * Airports updateManyAndReturn
   */
  export type AirportsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airports
     */
    select?: AirportsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Airports
     */
    omit?: AirportsOmit<ExtArgs> | null
    /**
     * The data used to update Airports.
     */
    data: XOR<AirportsUpdateManyMutationInput, AirportsUncheckedUpdateManyInput>
    /**
     * Filter which Airports to update
     */
    where?: AirportsWhereInput
    /**
     * Limit how many Airports to update.
     */
    limit?: number
  }

  /**
   * Airports upsert
   */
  export type AirportsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airports
     */
    select?: AirportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airports
     */
    omit?: AirportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsInclude<ExtArgs> | null
    /**
     * The filter to search for the Airports to update in case it exists.
     */
    where: AirportsWhereUniqueInput
    /**
     * In case the Airports found by the `where` argument doesn't exist, create a new Airports with this data.
     */
    create: XOR<AirportsCreateInput, AirportsUncheckedCreateInput>
    /**
     * In case the Airports was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AirportsUpdateInput, AirportsUncheckedUpdateInput>
  }

  /**
   * Airports delete
   */
  export type AirportsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airports
     */
    select?: AirportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airports
     */
    omit?: AirportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsInclude<ExtArgs> | null
    /**
     * Filter which Airports to delete.
     */
    where: AirportsWhereUniqueInput
  }

  /**
   * Airports deleteMany
   */
  export type AirportsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Airports to delete
     */
    where?: AirportsWhereInput
    /**
     * Limit how many Airports to delete.
     */
    limit?: number
  }

  /**
   * Airports.local
   */
  export type Airports$localArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locals
     */
    select?: LocalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locals
     */
    omit?: LocalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalsInclude<ExtArgs> | null
    where?: LocalsWhereInput
  }

  /**
   * Airports.routes
   */
  export type Airports$routesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirportsRoute
     */
    select?: AirportsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirportsRoute
     */
    omit?: AirportsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsRouteInclude<ExtArgs> | null
    where?: AirportsRouteWhereInput
    orderBy?: AirportsRouteOrderByWithRelationInput | AirportsRouteOrderByWithRelationInput[]
    cursor?: AirportsRouteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AirportsRouteScalarFieldEnum | AirportsRouteScalarFieldEnum[]
  }

  /**
   * Airports without action
   */
  export type AirportsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airports
     */
    select?: AirportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airports
     */
    omit?: AirportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsInclude<ExtArgs> | null
  }


  /**
   * Model Locals
   */

  export type AggregateLocals = {
    _count: LocalsCountAggregateOutputType | null
    _avg: LocalsAvgAggregateOutputType | null
    _sum: LocalsSumAggregateOutputType | null
    _min: LocalsMinAggregateOutputType | null
    _max: LocalsMaxAggregateOutputType | null
  }

  export type LocalsAvgAggregateOutputType = {
    id: number | null
    airportId: number | null
    passagePrice: Decimal | null
  }

  export type LocalsSumAggregateOutputType = {
    id: number | null
    airportId: number | null
    passagePrice: Decimal | null
  }

  export type LocalsMinAggregateOutputType = {
    id: number | null
    airportId: number | null
    city: string | null
    country: string | null
    passagePrice: Decimal | null
    image: string | null
    active: boolean | null
  }

  export type LocalsMaxAggregateOutputType = {
    id: number | null
    airportId: number | null
    city: string | null
    country: string | null
    passagePrice: Decimal | null
    image: string | null
    active: boolean | null
  }

  export type LocalsCountAggregateOutputType = {
    id: number
    airportId: number
    city: number
    country: number
    passagePrice: number
    image: number
    active: number
    _all: number
  }


  export type LocalsAvgAggregateInputType = {
    id?: true
    airportId?: true
    passagePrice?: true
  }

  export type LocalsSumAggregateInputType = {
    id?: true
    airportId?: true
    passagePrice?: true
  }

  export type LocalsMinAggregateInputType = {
    id?: true
    airportId?: true
    city?: true
    country?: true
    passagePrice?: true
    image?: true
    active?: true
  }

  export type LocalsMaxAggregateInputType = {
    id?: true
    airportId?: true
    city?: true
    country?: true
    passagePrice?: true
    image?: true
    active?: true
  }

  export type LocalsCountAggregateInputType = {
    id?: true
    airportId?: true
    city?: true
    country?: true
    passagePrice?: true
    image?: true
    active?: true
    _all?: true
  }

  export type LocalsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locals to aggregate.
     */
    where?: LocalsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locals to fetch.
     */
    orderBy?: LocalsOrderByWithRelationInput | LocalsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocalsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locals
    **/
    _count?: true | LocalsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocalsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocalsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocalsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocalsMaxAggregateInputType
  }

  export type GetLocalsAggregateType<T extends LocalsAggregateArgs> = {
        [P in keyof T & keyof AggregateLocals]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocals[P]>
      : GetScalarType<T[P], AggregateLocals[P]>
  }




  export type LocalsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocalsWhereInput
    orderBy?: LocalsOrderByWithAggregationInput | LocalsOrderByWithAggregationInput[]
    by: LocalsScalarFieldEnum[] | LocalsScalarFieldEnum
    having?: LocalsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocalsCountAggregateInputType | true
    _avg?: LocalsAvgAggregateInputType
    _sum?: LocalsSumAggregateInputType
    _min?: LocalsMinAggregateInputType
    _max?: LocalsMaxAggregateInputType
  }

  export type LocalsGroupByOutputType = {
    id: number
    airportId: number
    city: string
    country: string
    passagePrice: Decimal
    image: string
    active: boolean
    _count: LocalsCountAggregateOutputType | null
    _avg: LocalsAvgAggregateOutputType | null
    _sum: LocalsSumAggregateOutputType | null
    _min: LocalsMinAggregateOutputType | null
    _max: LocalsMaxAggregateOutputType | null
  }

  type GetLocalsGroupByPayload<T extends LocalsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocalsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocalsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocalsGroupByOutputType[P]>
            : GetScalarType<T[P], LocalsGroupByOutputType[P]>
        }
      >
    >


  export type LocalsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    airportId?: boolean
    city?: boolean
    country?: boolean
    passagePrice?: boolean
    image?: boolean
    active?: boolean
    airport?: boolean | AirportsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["locals"]>

  export type LocalsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    airportId?: boolean
    city?: boolean
    country?: boolean
    passagePrice?: boolean
    image?: boolean
    active?: boolean
    airport?: boolean | AirportsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["locals"]>

  export type LocalsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    airportId?: boolean
    city?: boolean
    country?: boolean
    passagePrice?: boolean
    image?: boolean
    active?: boolean
    airport?: boolean | AirportsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["locals"]>

  export type LocalsSelectScalar = {
    id?: boolean
    airportId?: boolean
    city?: boolean
    country?: boolean
    passagePrice?: boolean
    image?: boolean
    active?: boolean
  }

  export type LocalsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "airportId" | "city" | "country" | "passagePrice" | "image" | "active", ExtArgs["result"]["locals"]>
  export type LocalsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airport?: boolean | AirportsDefaultArgs<ExtArgs>
  }
  export type LocalsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airport?: boolean | AirportsDefaultArgs<ExtArgs>
  }
  export type LocalsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airport?: boolean | AirportsDefaultArgs<ExtArgs>
  }

  export type $LocalsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Locals"
    objects: {
      airport: Prisma.$AirportsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      airportId: number
      city: string
      country: string
      passagePrice: Prisma.Decimal
      image: string
      active: boolean
    }, ExtArgs["result"]["locals"]>
    composites: {}
  }

  type LocalsGetPayload<S extends boolean | null | undefined | LocalsDefaultArgs> = $Result.GetResult<Prisma.$LocalsPayload, S>

  type LocalsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocalsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocalsCountAggregateInputType | true
    }

  export interface LocalsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Locals'], meta: { name: 'Locals' } }
    /**
     * Find zero or one Locals that matches the filter.
     * @param {LocalsFindUniqueArgs} args - Arguments to find a Locals
     * @example
     * // Get one Locals
     * const locals = await prisma.locals.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocalsFindUniqueArgs>(args: SelectSubset<T, LocalsFindUniqueArgs<ExtArgs>>): Prisma__LocalsClient<$Result.GetResult<Prisma.$LocalsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Locals that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocalsFindUniqueOrThrowArgs} args - Arguments to find a Locals
     * @example
     * // Get one Locals
     * const locals = await prisma.locals.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocalsFindUniqueOrThrowArgs>(args: SelectSubset<T, LocalsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocalsClient<$Result.GetResult<Prisma.$LocalsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Locals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalsFindFirstArgs} args - Arguments to find a Locals
     * @example
     * // Get one Locals
     * const locals = await prisma.locals.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocalsFindFirstArgs>(args?: SelectSubset<T, LocalsFindFirstArgs<ExtArgs>>): Prisma__LocalsClient<$Result.GetResult<Prisma.$LocalsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Locals that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalsFindFirstOrThrowArgs} args - Arguments to find a Locals
     * @example
     * // Get one Locals
     * const locals = await prisma.locals.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocalsFindFirstOrThrowArgs>(args?: SelectSubset<T, LocalsFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocalsClient<$Result.GetResult<Prisma.$LocalsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Locals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locals
     * const locals = await prisma.locals.findMany()
     * 
     * // Get first 10 Locals
     * const locals = await prisma.locals.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const localsWithIdOnly = await prisma.locals.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocalsFindManyArgs>(args?: SelectSubset<T, LocalsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocalsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Locals.
     * @param {LocalsCreateArgs} args - Arguments to create a Locals.
     * @example
     * // Create one Locals
     * const Locals = await prisma.locals.create({
     *   data: {
     *     // ... data to create a Locals
     *   }
     * })
     * 
     */
    create<T extends LocalsCreateArgs>(args: SelectSubset<T, LocalsCreateArgs<ExtArgs>>): Prisma__LocalsClient<$Result.GetResult<Prisma.$LocalsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Locals.
     * @param {LocalsCreateManyArgs} args - Arguments to create many Locals.
     * @example
     * // Create many Locals
     * const locals = await prisma.locals.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocalsCreateManyArgs>(args?: SelectSubset<T, LocalsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Locals and returns the data saved in the database.
     * @param {LocalsCreateManyAndReturnArgs} args - Arguments to create many Locals.
     * @example
     * // Create many Locals
     * const locals = await prisma.locals.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Locals and only return the `id`
     * const localsWithIdOnly = await prisma.locals.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocalsCreateManyAndReturnArgs>(args?: SelectSubset<T, LocalsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocalsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Locals.
     * @param {LocalsDeleteArgs} args - Arguments to delete one Locals.
     * @example
     * // Delete one Locals
     * const Locals = await prisma.locals.delete({
     *   where: {
     *     // ... filter to delete one Locals
     *   }
     * })
     * 
     */
    delete<T extends LocalsDeleteArgs>(args: SelectSubset<T, LocalsDeleteArgs<ExtArgs>>): Prisma__LocalsClient<$Result.GetResult<Prisma.$LocalsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Locals.
     * @param {LocalsUpdateArgs} args - Arguments to update one Locals.
     * @example
     * // Update one Locals
     * const locals = await prisma.locals.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocalsUpdateArgs>(args: SelectSubset<T, LocalsUpdateArgs<ExtArgs>>): Prisma__LocalsClient<$Result.GetResult<Prisma.$LocalsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Locals.
     * @param {LocalsDeleteManyArgs} args - Arguments to filter Locals to delete.
     * @example
     * // Delete a few Locals
     * const { count } = await prisma.locals.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocalsDeleteManyArgs>(args?: SelectSubset<T, LocalsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locals
     * const locals = await prisma.locals.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocalsUpdateManyArgs>(args: SelectSubset<T, LocalsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locals and returns the data updated in the database.
     * @param {LocalsUpdateManyAndReturnArgs} args - Arguments to update many Locals.
     * @example
     * // Update many Locals
     * const locals = await prisma.locals.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Locals and only return the `id`
     * const localsWithIdOnly = await prisma.locals.updateManyAndReturn({
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
    updateManyAndReturn<T extends LocalsUpdateManyAndReturnArgs>(args: SelectSubset<T, LocalsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocalsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Locals.
     * @param {LocalsUpsertArgs} args - Arguments to update or create a Locals.
     * @example
     * // Update or create a Locals
     * const locals = await prisma.locals.upsert({
     *   create: {
     *     // ... data to create a Locals
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Locals we want to update
     *   }
     * })
     */
    upsert<T extends LocalsUpsertArgs>(args: SelectSubset<T, LocalsUpsertArgs<ExtArgs>>): Prisma__LocalsClient<$Result.GetResult<Prisma.$LocalsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Locals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalsCountArgs} args - Arguments to filter Locals to count.
     * @example
     * // Count the number of Locals
     * const count = await prisma.locals.count({
     *   where: {
     *     // ... the filter for the Locals we want to count
     *   }
     * })
    **/
    count<T extends LocalsCountArgs>(
      args?: Subset<T, LocalsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocalsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Locals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LocalsAggregateArgs>(args: Subset<T, LocalsAggregateArgs>): Prisma.PrismaPromise<GetLocalsAggregateType<T>>

    /**
     * Group by Locals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalsGroupByArgs} args - Group by arguments.
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
      T extends LocalsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocalsGroupByArgs['orderBy'] }
        : { orderBy?: LocalsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LocalsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocalsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Locals model
   */
  readonly fields: LocalsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Locals.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocalsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    airport<T extends AirportsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AirportsDefaultArgs<ExtArgs>>): Prisma__AirportsClient<$Result.GetResult<Prisma.$AirportsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Locals model
   */ 
  interface LocalsFieldRefs {
    readonly id: FieldRef<"Locals", 'Int'>
    readonly airportId: FieldRef<"Locals", 'Int'>
    readonly city: FieldRef<"Locals", 'String'>
    readonly country: FieldRef<"Locals", 'String'>
    readonly passagePrice: FieldRef<"Locals", 'Decimal'>
    readonly image: FieldRef<"Locals", 'String'>
    readonly active: FieldRef<"Locals", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Locals findUnique
   */
  export type LocalsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locals
     */
    select?: LocalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locals
     */
    omit?: LocalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalsInclude<ExtArgs> | null
    /**
     * Filter, which Locals to fetch.
     */
    where: LocalsWhereUniqueInput
  }

  /**
   * Locals findUniqueOrThrow
   */
  export type LocalsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locals
     */
    select?: LocalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locals
     */
    omit?: LocalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalsInclude<ExtArgs> | null
    /**
     * Filter, which Locals to fetch.
     */
    where: LocalsWhereUniqueInput
  }

  /**
   * Locals findFirst
   */
  export type LocalsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locals
     */
    select?: LocalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locals
     */
    omit?: LocalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalsInclude<ExtArgs> | null
    /**
     * Filter, which Locals to fetch.
     */
    where?: LocalsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locals to fetch.
     */
    orderBy?: LocalsOrderByWithRelationInput | LocalsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locals.
     */
    cursor?: LocalsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locals.
     */
    distinct?: LocalsScalarFieldEnum | LocalsScalarFieldEnum[]
  }

  /**
   * Locals findFirstOrThrow
   */
  export type LocalsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locals
     */
    select?: LocalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locals
     */
    omit?: LocalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalsInclude<ExtArgs> | null
    /**
     * Filter, which Locals to fetch.
     */
    where?: LocalsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locals to fetch.
     */
    orderBy?: LocalsOrderByWithRelationInput | LocalsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locals.
     */
    cursor?: LocalsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locals.
     */
    distinct?: LocalsScalarFieldEnum | LocalsScalarFieldEnum[]
  }

  /**
   * Locals findMany
   */
  export type LocalsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locals
     */
    select?: LocalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locals
     */
    omit?: LocalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalsInclude<ExtArgs> | null
    /**
     * Filter, which Locals to fetch.
     */
    where?: LocalsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locals to fetch.
     */
    orderBy?: LocalsOrderByWithRelationInput | LocalsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locals.
     */
    cursor?: LocalsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locals.
     */
    skip?: number
    distinct?: LocalsScalarFieldEnum | LocalsScalarFieldEnum[]
  }

  /**
   * Locals create
   */
  export type LocalsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locals
     */
    select?: LocalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locals
     */
    omit?: LocalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalsInclude<ExtArgs> | null
    /**
     * The data needed to create a Locals.
     */
    data: XOR<LocalsCreateInput, LocalsUncheckedCreateInput>
  }

  /**
   * Locals createMany
   */
  export type LocalsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Locals.
     */
    data: LocalsCreateManyInput | LocalsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Locals createManyAndReturn
   */
  export type LocalsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locals
     */
    select?: LocalsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Locals
     */
    omit?: LocalsOmit<ExtArgs> | null
    /**
     * The data used to create many Locals.
     */
    data: LocalsCreateManyInput | LocalsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Locals update
   */
  export type LocalsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locals
     */
    select?: LocalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locals
     */
    omit?: LocalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalsInclude<ExtArgs> | null
    /**
     * The data needed to update a Locals.
     */
    data: XOR<LocalsUpdateInput, LocalsUncheckedUpdateInput>
    /**
     * Choose, which Locals to update.
     */
    where: LocalsWhereUniqueInput
  }

  /**
   * Locals updateMany
   */
  export type LocalsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locals.
     */
    data: XOR<LocalsUpdateManyMutationInput, LocalsUncheckedUpdateManyInput>
    /**
     * Filter which Locals to update
     */
    where?: LocalsWhereInput
    /**
     * Limit how many Locals to update.
     */
    limit?: number
  }

  /**
   * Locals updateManyAndReturn
   */
  export type LocalsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locals
     */
    select?: LocalsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Locals
     */
    omit?: LocalsOmit<ExtArgs> | null
    /**
     * The data used to update Locals.
     */
    data: XOR<LocalsUpdateManyMutationInput, LocalsUncheckedUpdateManyInput>
    /**
     * Filter which Locals to update
     */
    where?: LocalsWhereInput
    /**
     * Limit how many Locals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Locals upsert
   */
  export type LocalsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locals
     */
    select?: LocalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locals
     */
    omit?: LocalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalsInclude<ExtArgs> | null
    /**
     * The filter to search for the Locals to update in case it exists.
     */
    where: LocalsWhereUniqueInput
    /**
     * In case the Locals found by the `where` argument doesn't exist, create a new Locals with this data.
     */
    create: XOR<LocalsCreateInput, LocalsUncheckedCreateInput>
    /**
     * In case the Locals was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocalsUpdateInput, LocalsUncheckedUpdateInput>
  }

  /**
   * Locals delete
   */
  export type LocalsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locals
     */
    select?: LocalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locals
     */
    omit?: LocalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalsInclude<ExtArgs> | null
    /**
     * Filter which Locals to delete.
     */
    where: LocalsWhereUniqueInput
  }

  /**
   * Locals deleteMany
   */
  export type LocalsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locals to delete
     */
    where?: LocalsWhereInput
    /**
     * Limit how many Locals to delete.
     */
    limit?: number
  }

  /**
   * Locals without action
   */
  export type LocalsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Locals
     */
    select?: LocalsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Locals
     */
    omit?: LocalsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalsInclude<ExtArgs> | null
  }


  /**
   * Model Route
   */

  export type AggregateRoute = {
    _count: RouteCountAggregateOutputType | null
    _avg: RouteAvgAggregateOutputType | null
    _sum: RouteSumAggregateOutputType | null
    _min: RouteMinAggregateOutputType | null
    _max: RouteMaxAggregateOutputType | null
  }

  export type RouteAvgAggregateOutputType = {
    id: number | null
  }

  export type RouteSumAggregateOutputType = {
    id: number | null
  }

  export type RouteMinAggregateOutputType = {
    id: number | null
    mileageProgram: string | null
    enableLayovers: boolean | null
    active: boolean | null
  }

  export type RouteMaxAggregateOutputType = {
    id: number | null
    mileageProgram: string | null
    enableLayovers: boolean | null
    active: boolean | null
  }

  export type RouteCountAggregateOutputType = {
    id: number
    mileageProgram: number
    enableLayovers: number
    active: number
    _all: number
  }


  export type RouteAvgAggregateInputType = {
    id?: true
  }

  export type RouteSumAggregateInputType = {
    id?: true
  }

  export type RouteMinAggregateInputType = {
    id?: true
    mileageProgram?: true
    enableLayovers?: true
    active?: true
  }

  export type RouteMaxAggregateInputType = {
    id?: true
    mileageProgram?: true
    enableLayovers?: true
    active?: true
  }

  export type RouteCountAggregateInputType = {
    id?: true
    mileageProgram?: true
    enableLayovers?: true
    active?: true
    _all?: true
  }

  export type RouteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Route to aggregate.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Routes
    **/
    _count?: true | RouteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RouteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RouteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RouteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RouteMaxAggregateInputType
  }

  export type GetRouteAggregateType<T extends RouteAggregateArgs> = {
        [P in keyof T & keyof AggregateRoute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoute[P]>
      : GetScalarType<T[P], AggregateRoute[P]>
  }




  export type RouteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RouteWhereInput
    orderBy?: RouteOrderByWithAggregationInput | RouteOrderByWithAggregationInput[]
    by: RouteScalarFieldEnum[] | RouteScalarFieldEnum
    having?: RouteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RouteCountAggregateInputType | true
    _avg?: RouteAvgAggregateInputType
    _sum?: RouteSumAggregateInputType
    _min?: RouteMinAggregateInputType
    _max?: RouteMaxAggregateInputType
  }

  export type RouteGroupByOutputType = {
    id: number
    mileageProgram: string
    enableLayovers: boolean
    active: boolean
    _count: RouteCountAggregateOutputType | null
    _avg: RouteAvgAggregateOutputType | null
    _sum: RouteSumAggregateOutputType | null
    _min: RouteMinAggregateOutputType | null
    _max: RouteMaxAggregateOutputType | null
  }

  type GetRouteGroupByPayload<T extends RouteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RouteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RouteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RouteGroupByOutputType[P]>
            : GetScalarType<T[P], RouteGroupByOutputType[P]>
        }
      >
    >


  export type RouteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mileageProgram?: boolean
    enableLayovers?: boolean
    active?: boolean
    airports?: boolean | Route$airportsArgs<ExtArgs>
    cabins?: boolean | Route$cabinsArgs<ExtArgs>
    _count?: boolean | RouteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["route"]>

  export type RouteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mileageProgram?: boolean
    enableLayovers?: boolean
    active?: boolean
  }, ExtArgs["result"]["route"]>

  export type RouteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mileageProgram?: boolean
    enableLayovers?: boolean
    active?: boolean
  }, ExtArgs["result"]["route"]>

  export type RouteSelectScalar = {
    id?: boolean
    mileageProgram?: boolean
    enableLayovers?: boolean
    active?: boolean
  }

  export type RouteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mileageProgram" | "enableLayovers" | "active", ExtArgs["result"]["route"]>
  export type RouteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airports?: boolean | Route$airportsArgs<ExtArgs>
    cabins?: boolean | Route$cabinsArgs<ExtArgs>
    _count?: boolean | RouteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RouteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RouteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RoutePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Route"
    objects: {
      airports: Prisma.$AirportsRoutePayload<ExtArgs>[]
      cabins: Prisma.$CabinsRoutePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      mileageProgram: string
      enableLayovers: boolean
      active: boolean
    }, ExtArgs["result"]["route"]>
    composites: {}
  }

  type RouteGetPayload<S extends boolean | null | undefined | RouteDefaultArgs> = $Result.GetResult<Prisma.$RoutePayload, S>

  type RouteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RouteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RouteCountAggregateInputType | true
    }

  export interface RouteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Route'], meta: { name: 'Route' } }
    /**
     * Find zero or one Route that matches the filter.
     * @param {RouteFindUniqueArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RouteFindUniqueArgs>(args: SelectSubset<T, RouteFindUniqueArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Route that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RouteFindUniqueOrThrowArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RouteFindUniqueOrThrowArgs>(args: SelectSubset<T, RouteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Route that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteFindFirstArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RouteFindFirstArgs>(args?: SelectSubset<T, RouteFindFirstArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Route that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteFindFirstOrThrowArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RouteFindFirstOrThrowArgs>(args?: SelectSubset<T, RouteFindFirstOrThrowArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Routes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Routes
     * const routes = await prisma.route.findMany()
     * 
     * // Get first 10 Routes
     * const routes = await prisma.route.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const routeWithIdOnly = await prisma.route.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RouteFindManyArgs>(args?: SelectSubset<T, RouteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Route.
     * @param {RouteCreateArgs} args - Arguments to create a Route.
     * @example
     * // Create one Route
     * const Route = await prisma.route.create({
     *   data: {
     *     // ... data to create a Route
     *   }
     * })
     * 
     */
    create<T extends RouteCreateArgs>(args: SelectSubset<T, RouteCreateArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Routes.
     * @param {RouteCreateManyArgs} args - Arguments to create many Routes.
     * @example
     * // Create many Routes
     * const route = await prisma.route.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RouteCreateManyArgs>(args?: SelectSubset<T, RouteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Routes and returns the data saved in the database.
     * @param {RouteCreateManyAndReturnArgs} args - Arguments to create many Routes.
     * @example
     * // Create many Routes
     * const route = await prisma.route.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Routes and only return the `id`
     * const routeWithIdOnly = await prisma.route.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RouteCreateManyAndReturnArgs>(args?: SelectSubset<T, RouteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Route.
     * @param {RouteDeleteArgs} args - Arguments to delete one Route.
     * @example
     * // Delete one Route
     * const Route = await prisma.route.delete({
     *   where: {
     *     // ... filter to delete one Route
     *   }
     * })
     * 
     */
    delete<T extends RouteDeleteArgs>(args: SelectSubset<T, RouteDeleteArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Route.
     * @param {RouteUpdateArgs} args - Arguments to update one Route.
     * @example
     * // Update one Route
     * const route = await prisma.route.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RouteUpdateArgs>(args: SelectSubset<T, RouteUpdateArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Routes.
     * @param {RouteDeleteManyArgs} args - Arguments to filter Routes to delete.
     * @example
     * // Delete a few Routes
     * const { count } = await prisma.route.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RouteDeleteManyArgs>(args?: SelectSubset<T, RouteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Routes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Routes
     * const route = await prisma.route.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RouteUpdateManyArgs>(args: SelectSubset<T, RouteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Routes and returns the data updated in the database.
     * @param {RouteUpdateManyAndReturnArgs} args - Arguments to update many Routes.
     * @example
     * // Update many Routes
     * const route = await prisma.route.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Routes and only return the `id`
     * const routeWithIdOnly = await prisma.route.updateManyAndReturn({
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
    updateManyAndReturn<T extends RouteUpdateManyAndReturnArgs>(args: SelectSubset<T, RouteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Route.
     * @param {RouteUpsertArgs} args - Arguments to update or create a Route.
     * @example
     * // Update or create a Route
     * const route = await prisma.route.upsert({
     *   create: {
     *     // ... data to create a Route
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Route we want to update
     *   }
     * })
     */
    upsert<T extends RouteUpsertArgs>(args: SelectSubset<T, RouteUpsertArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Routes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteCountArgs} args - Arguments to filter Routes to count.
     * @example
     * // Count the number of Routes
     * const count = await prisma.route.count({
     *   where: {
     *     // ... the filter for the Routes we want to count
     *   }
     * })
    **/
    count<T extends RouteCountArgs>(
      args?: Subset<T, RouteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RouteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Route.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RouteAggregateArgs>(args: Subset<T, RouteAggregateArgs>): Prisma.PrismaPromise<GetRouteAggregateType<T>>

    /**
     * Group by Route.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteGroupByArgs} args - Group by arguments.
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
      T extends RouteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RouteGroupByArgs['orderBy'] }
        : { orderBy?: RouteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RouteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRouteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Route model
   */
  readonly fields: RouteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Route.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RouteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    airports<T extends Route$airportsArgs<ExtArgs> = {}>(args?: Subset<T, Route$airportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirportsRoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cabins<T extends Route$cabinsArgs<ExtArgs> = {}>(args?: Subset<T, Route$cabinsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CabinsRoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Route model
   */ 
  interface RouteFieldRefs {
    readonly id: FieldRef<"Route", 'Int'>
    readonly mileageProgram: FieldRef<"Route", 'String'>
    readonly enableLayovers: FieldRef<"Route", 'Boolean'>
    readonly active: FieldRef<"Route", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Route findUnique
   */
  export type RouteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route findUniqueOrThrow
   */
  export type RouteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route findFirst
   */
  export type RouteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Routes.
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Routes.
     */
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Route findFirstOrThrow
   */
  export type RouteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Routes.
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Routes.
     */
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Route findMany
   */
  export type RouteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Routes to fetch.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Routes.
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Route create
   */
  export type RouteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * The data needed to create a Route.
     */
    data: XOR<RouteCreateInput, RouteUncheckedCreateInput>
  }

  /**
   * Route createMany
   */
  export type RouteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Routes.
     */
    data: RouteCreateManyInput | RouteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Route createManyAndReturn
   */
  export type RouteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * The data used to create many Routes.
     */
    data: RouteCreateManyInput | RouteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Route update
   */
  export type RouteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * The data needed to update a Route.
     */
    data: XOR<RouteUpdateInput, RouteUncheckedUpdateInput>
    /**
     * Choose, which Route to update.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route updateMany
   */
  export type RouteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Routes.
     */
    data: XOR<RouteUpdateManyMutationInput, RouteUncheckedUpdateManyInput>
    /**
     * Filter which Routes to update
     */
    where?: RouteWhereInput
    /**
     * Limit how many Routes to update.
     */
    limit?: number
  }

  /**
   * Route updateManyAndReturn
   */
  export type RouteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * The data used to update Routes.
     */
    data: XOR<RouteUpdateManyMutationInput, RouteUncheckedUpdateManyInput>
    /**
     * Filter which Routes to update
     */
    where?: RouteWhereInput
    /**
     * Limit how many Routes to update.
     */
    limit?: number
  }

  /**
   * Route upsert
   */
  export type RouteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * The filter to search for the Route to update in case it exists.
     */
    where: RouteWhereUniqueInput
    /**
     * In case the Route found by the `where` argument doesn't exist, create a new Route with this data.
     */
    create: XOR<RouteCreateInput, RouteUncheckedCreateInput>
    /**
     * In case the Route was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RouteUpdateInput, RouteUncheckedUpdateInput>
  }

  /**
   * Route delete
   */
  export type RouteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter which Route to delete.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route deleteMany
   */
  export type RouteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Routes to delete
     */
    where?: RouteWhereInput
    /**
     * Limit how many Routes to delete.
     */
    limit?: number
  }

  /**
   * Route.airports
   */
  export type Route$airportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirportsRoute
     */
    select?: AirportsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirportsRoute
     */
    omit?: AirportsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsRouteInclude<ExtArgs> | null
    where?: AirportsRouteWhereInput
    orderBy?: AirportsRouteOrderByWithRelationInput | AirportsRouteOrderByWithRelationInput[]
    cursor?: AirportsRouteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AirportsRouteScalarFieldEnum | AirportsRouteScalarFieldEnum[]
  }

  /**
   * Route.cabins
   */
  export type Route$cabinsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinsRoute
     */
    select?: CabinsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinsRoute
     */
    omit?: CabinsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinsRouteInclude<ExtArgs> | null
    where?: CabinsRouteWhereInput
    orderBy?: CabinsRouteOrderByWithRelationInput | CabinsRouteOrderByWithRelationInput[]
    cursor?: CabinsRouteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CabinsRouteScalarFieldEnum | CabinsRouteScalarFieldEnum[]
  }

  /**
   * Route without action
   */
  export type RouteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
  }


  /**
   * Model CabinsRoute
   */

  export type AggregateCabinsRoute = {
    _count: CabinsRouteCountAggregateOutputType | null
    _avg: CabinsRouteAvgAggregateOutputType | null
    _sum: CabinsRouteSumAggregateOutputType | null
    _min: CabinsRouteMinAggregateOutputType | null
    _max: CabinsRouteMaxAggregateOutputType | null
  }

  export type CabinsRouteAvgAggregateOutputType = {
    id: number | null
    routeId: number | null
    maximumPoints: number | null
    bagsAmount: number | null
    passagePrice: Decimal | null
    cancellationPrice: Decimal | null
  }

  export type CabinsRouteSumAggregateOutputType = {
    id: number | null
    routeId: number | null
    maximumPoints: number | null
    bagsAmount: number | null
    passagePrice: Decimal | null
    cancellationPrice: Decimal | null
  }

  export type CabinsRouteMinAggregateOutputType = {
    id: number | null
    routeId: number | null
    key: string | null
    maximumPoints: number | null
    bagsAmount: number | null
    passagePrice: Decimal | null
    cancellationPrice: Decimal | null
  }

  export type CabinsRouteMaxAggregateOutputType = {
    id: number | null
    routeId: number | null
    key: string | null
    maximumPoints: number | null
    bagsAmount: number | null
    passagePrice: Decimal | null
    cancellationPrice: Decimal | null
  }

  export type CabinsRouteCountAggregateOutputType = {
    id: number
    routeId: number
    key: number
    maximumPoints: number
    bagsAmount: number
    passagePrice: number
    cancellationPrice: number
    _all: number
  }


  export type CabinsRouteAvgAggregateInputType = {
    id?: true
    routeId?: true
    maximumPoints?: true
    bagsAmount?: true
    passagePrice?: true
    cancellationPrice?: true
  }

  export type CabinsRouteSumAggregateInputType = {
    id?: true
    routeId?: true
    maximumPoints?: true
    bagsAmount?: true
    passagePrice?: true
    cancellationPrice?: true
  }

  export type CabinsRouteMinAggregateInputType = {
    id?: true
    routeId?: true
    key?: true
    maximumPoints?: true
    bagsAmount?: true
    passagePrice?: true
    cancellationPrice?: true
  }

  export type CabinsRouteMaxAggregateInputType = {
    id?: true
    routeId?: true
    key?: true
    maximumPoints?: true
    bagsAmount?: true
    passagePrice?: true
    cancellationPrice?: true
  }

  export type CabinsRouteCountAggregateInputType = {
    id?: true
    routeId?: true
    key?: true
    maximumPoints?: true
    bagsAmount?: true
    passagePrice?: true
    cancellationPrice?: true
    _all?: true
  }

  export type CabinsRouteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CabinsRoute to aggregate.
     */
    where?: CabinsRouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CabinsRoutes to fetch.
     */
    orderBy?: CabinsRouteOrderByWithRelationInput | CabinsRouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CabinsRouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CabinsRoutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CabinsRoutes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CabinsRoutes
    **/
    _count?: true | CabinsRouteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CabinsRouteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CabinsRouteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CabinsRouteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CabinsRouteMaxAggregateInputType
  }

  export type GetCabinsRouteAggregateType<T extends CabinsRouteAggregateArgs> = {
        [P in keyof T & keyof AggregateCabinsRoute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCabinsRoute[P]>
      : GetScalarType<T[P], AggregateCabinsRoute[P]>
  }




  export type CabinsRouteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CabinsRouteWhereInput
    orderBy?: CabinsRouteOrderByWithAggregationInput | CabinsRouteOrderByWithAggregationInput[]
    by: CabinsRouteScalarFieldEnum[] | CabinsRouteScalarFieldEnum
    having?: CabinsRouteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CabinsRouteCountAggregateInputType | true
    _avg?: CabinsRouteAvgAggregateInputType
    _sum?: CabinsRouteSumAggregateInputType
    _min?: CabinsRouteMinAggregateInputType
    _max?: CabinsRouteMaxAggregateInputType
  }

  export type CabinsRouteGroupByOutputType = {
    id: number
    routeId: number
    key: string
    maximumPoints: number
    bagsAmount: number
    passagePrice: Decimal
    cancellationPrice: Decimal
    _count: CabinsRouteCountAggregateOutputType | null
    _avg: CabinsRouteAvgAggregateOutputType | null
    _sum: CabinsRouteSumAggregateOutputType | null
    _min: CabinsRouteMinAggregateOutputType | null
    _max: CabinsRouteMaxAggregateOutputType | null
  }

  type GetCabinsRouteGroupByPayload<T extends CabinsRouteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CabinsRouteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CabinsRouteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CabinsRouteGroupByOutputType[P]>
            : GetScalarType<T[P], CabinsRouteGroupByOutputType[P]>
        }
      >
    >


  export type CabinsRouteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    routeId?: boolean
    key?: boolean
    maximumPoints?: boolean
    bagsAmount?: boolean
    passagePrice?: boolean
    cancellationPrice?: boolean
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cabinsRoute"]>

  export type CabinsRouteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    routeId?: boolean
    key?: boolean
    maximumPoints?: boolean
    bagsAmount?: boolean
    passagePrice?: boolean
    cancellationPrice?: boolean
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cabinsRoute"]>

  export type CabinsRouteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    routeId?: boolean
    key?: boolean
    maximumPoints?: boolean
    bagsAmount?: boolean
    passagePrice?: boolean
    cancellationPrice?: boolean
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cabinsRoute"]>

  export type CabinsRouteSelectScalar = {
    id?: boolean
    routeId?: boolean
    key?: boolean
    maximumPoints?: boolean
    bagsAmount?: boolean
    passagePrice?: boolean
    cancellationPrice?: boolean
  }

  export type CabinsRouteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "routeId" | "key" | "maximumPoints" | "bagsAmount" | "passagePrice" | "cancellationPrice", ExtArgs["result"]["cabinsRoute"]>
  export type CabinsRouteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }
  export type CabinsRouteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }
  export type CabinsRouteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }

  export type $CabinsRoutePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CabinsRoute"
    objects: {
      route: Prisma.$RoutePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      routeId: number
      key: string
      maximumPoints: number
      bagsAmount: number
      passagePrice: Prisma.Decimal
      cancellationPrice: Prisma.Decimal
    }, ExtArgs["result"]["cabinsRoute"]>
    composites: {}
  }

  type CabinsRouteGetPayload<S extends boolean | null | undefined | CabinsRouteDefaultArgs> = $Result.GetResult<Prisma.$CabinsRoutePayload, S>

  type CabinsRouteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CabinsRouteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CabinsRouteCountAggregateInputType | true
    }

  export interface CabinsRouteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CabinsRoute'], meta: { name: 'CabinsRoute' } }
    /**
     * Find zero or one CabinsRoute that matches the filter.
     * @param {CabinsRouteFindUniqueArgs} args - Arguments to find a CabinsRoute
     * @example
     * // Get one CabinsRoute
     * const cabinsRoute = await prisma.cabinsRoute.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CabinsRouteFindUniqueArgs>(args: SelectSubset<T, CabinsRouteFindUniqueArgs<ExtArgs>>): Prisma__CabinsRouteClient<$Result.GetResult<Prisma.$CabinsRoutePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CabinsRoute that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CabinsRouteFindUniqueOrThrowArgs} args - Arguments to find a CabinsRoute
     * @example
     * // Get one CabinsRoute
     * const cabinsRoute = await prisma.cabinsRoute.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CabinsRouteFindUniqueOrThrowArgs>(args: SelectSubset<T, CabinsRouteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CabinsRouteClient<$Result.GetResult<Prisma.$CabinsRoutePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CabinsRoute that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CabinsRouteFindFirstArgs} args - Arguments to find a CabinsRoute
     * @example
     * // Get one CabinsRoute
     * const cabinsRoute = await prisma.cabinsRoute.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CabinsRouteFindFirstArgs>(args?: SelectSubset<T, CabinsRouteFindFirstArgs<ExtArgs>>): Prisma__CabinsRouteClient<$Result.GetResult<Prisma.$CabinsRoutePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CabinsRoute that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CabinsRouteFindFirstOrThrowArgs} args - Arguments to find a CabinsRoute
     * @example
     * // Get one CabinsRoute
     * const cabinsRoute = await prisma.cabinsRoute.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CabinsRouteFindFirstOrThrowArgs>(args?: SelectSubset<T, CabinsRouteFindFirstOrThrowArgs<ExtArgs>>): Prisma__CabinsRouteClient<$Result.GetResult<Prisma.$CabinsRoutePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CabinsRoutes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CabinsRouteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CabinsRoutes
     * const cabinsRoutes = await prisma.cabinsRoute.findMany()
     * 
     * // Get first 10 CabinsRoutes
     * const cabinsRoutes = await prisma.cabinsRoute.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cabinsRouteWithIdOnly = await prisma.cabinsRoute.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CabinsRouteFindManyArgs>(args?: SelectSubset<T, CabinsRouteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CabinsRoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CabinsRoute.
     * @param {CabinsRouteCreateArgs} args - Arguments to create a CabinsRoute.
     * @example
     * // Create one CabinsRoute
     * const CabinsRoute = await prisma.cabinsRoute.create({
     *   data: {
     *     // ... data to create a CabinsRoute
     *   }
     * })
     * 
     */
    create<T extends CabinsRouteCreateArgs>(args: SelectSubset<T, CabinsRouteCreateArgs<ExtArgs>>): Prisma__CabinsRouteClient<$Result.GetResult<Prisma.$CabinsRoutePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CabinsRoutes.
     * @param {CabinsRouteCreateManyArgs} args - Arguments to create many CabinsRoutes.
     * @example
     * // Create many CabinsRoutes
     * const cabinsRoute = await prisma.cabinsRoute.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CabinsRouteCreateManyArgs>(args?: SelectSubset<T, CabinsRouteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CabinsRoutes and returns the data saved in the database.
     * @param {CabinsRouteCreateManyAndReturnArgs} args - Arguments to create many CabinsRoutes.
     * @example
     * // Create many CabinsRoutes
     * const cabinsRoute = await prisma.cabinsRoute.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CabinsRoutes and only return the `id`
     * const cabinsRouteWithIdOnly = await prisma.cabinsRoute.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CabinsRouteCreateManyAndReturnArgs>(args?: SelectSubset<T, CabinsRouteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CabinsRoutePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CabinsRoute.
     * @param {CabinsRouteDeleteArgs} args - Arguments to delete one CabinsRoute.
     * @example
     * // Delete one CabinsRoute
     * const CabinsRoute = await prisma.cabinsRoute.delete({
     *   where: {
     *     // ... filter to delete one CabinsRoute
     *   }
     * })
     * 
     */
    delete<T extends CabinsRouteDeleteArgs>(args: SelectSubset<T, CabinsRouteDeleteArgs<ExtArgs>>): Prisma__CabinsRouteClient<$Result.GetResult<Prisma.$CabinsRoutePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CabinsRoute.
     * @param {CabinsRouteUpdateArgs} args - Arguments to update one CabinsRoute.
     * @example
     * // Update one CabinsRoute
     * const cabinsRoute = await prisma.cabinsRoute.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CabinsRouteUpdateArgs>(args: SelectSubset<T, CabinsRouteUpdateArgs<ExtArgs>>): Prisma__CabinsRouteClient<$Result.GetResult<Prisma.$CabinsRoutePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CabinsRoutes.
     * @param {CabinsRouteDeleteManyArgs} args - Arguments to filter CabinsRoutes to delete.
     * @example
     * // Delete a few CabinsRoutes
     * const { count } = await prisma.cabinsRoute.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CabinsRouteDeleteManyArgs>(args?: SelectSubset<T, CabinsRouteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CabinsRoutes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CabinsRouteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CabinsRoutes
     * const cabinsRoute = await prisma.cabinsRoute.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CabinsRouteUpdateManyArgs>(args: SelectSubset<T, CabinsRouteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CabinsRoutes and returns the data updated in the database.
     * @param {CabinsRouteUpdateManyAndReturnArgs} args - Arguments to update many CabinsRoutes.
     * @example
     * // Update many CabinsRoutes
     * const cabinsRoute = await prisma.cabinsRoute.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CabinsRoutes and only return the `id`
     * const cabinsRouteWithIdOnly = await prisma.cabinsRoute.updateManyAndReturn({
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
    updateManyAndReturn<T extends CabinsRouteUpdateManyAndReturnArgs>(args: SelectSubset<T, CabinsRouteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CabinsRoutePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CabinsRoute.
     * @param {CabinsRouteUpsertArgs} args - Arguments to update or create a CabinsRoute.
     * @example
     * // Update or create a CabinsRoute
     * const cabinsRoute = await prisma.cabinsRoute.upsert({
     *   create: {
     *     // ... data to create a CabinsRoute
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CabinsRoute we want to update
     *   }
     * })
     */
    upsert<T extends CabinsRouteUpsertArgs>(args: SelectSubset<T, CabinsRouteUpsertArgs<ExtArgs>>): Prisma__CabinsRouteClient<$Result.GetResult<Prisma.$CabinsRoutePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CabinsRoutes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CabinsRouteCountArgs} args - Arguments to filter CabinsRoutes to count.
     * @example
     * // Count the number of CabinsRoutes
     * const count = await prisma.cabinsRoute.count({
     *   where: {
     *     // ... the filter for the CabinsRoutes we want to count
     *   }
     * })
    **/
    count<T extends CabinsRouteCountArgs>(
      args?: Subset<T, CabinsRouteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CabinsRouteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CabinsRoute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CabinsRouteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CabinsRouteAggregateArgs>(args: Subset<T, CabinsRouteAggregateArgs>): Prisma.PrismaPromise<GetCabinsRouteAggregateType<T>>

    /**
     * Group by CabinsRoute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CabinsRouteGroupByArgs} args - Group by arguments.
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
      T extends CabinsRouteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CabinsRouteGroupByArgs['orderBy'] }
        : { orderBy?: CabinsRouteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CabinsRouteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCabinsRouteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CabinsRoute model
   */
  readonly fields: CabinsRouteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CabinsRoute.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CabinsRouteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    route<T extends RouteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RouteDefaultArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CabinsRoute model
   */ 
  interface CabinsRouteFieldRefs {
    readonly id: FieldRef<"CabinsRoute", 'Int'>
    readonly routeId: FieldRef<"CabinsRoute", 'Int'>
    readonly key: FieldRef<"CabinsRoute", 'String'>
    readonly maximumPoints: FieldRef<"CabinsRoute", 'Int'>
    readonly bagsAmount: FieldRef<"CabinsRoute", 'Int'>
    readonly passagePrice: FieldRef<"CabinsRoute", 'Decimal'>
    readonly cancellationPrice: FieldRef<"CabinsRoute", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * CabinsRoute findUnique
   */
  export type CabinsRouteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinsRoute
     */
    select?: CabinsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinsRoute
     */
    omit?: CabinsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinsRouteInclude<ExtArgs> | null
    /**
     * Filter, which CabinsRoute to fetch.
     */
    where: CabinsRouteWhereUniqueInput
  }

  /**
   * CabinsRoute findUniqueOrThrow
   */
  export type CabinsRouteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinsRoute
     */
    select?: CabinsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinsRoute
     */
    omit?: CabinsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinsRouteInclude<ExtArgs> | null
    /**
     * Filter, which CabinsRoute to fetch.
     */
    where: CabinsRouteWhereUniqueInput
  }

  /**
   * CabinsRoute findFirst
   */
  export type CabinsRouteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinsRoute
     */
    select?: CabinsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinsRoute
     */
    omit?: CabinsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinsRouteInclude<ExtArgs> | null
    /**
     * Filter, which CabinsRoute to fetch.
     */
    where?: CabinsRouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CabinsRoutes to fetch.
     */
    orderBy?: CabinsRouteOrderByWithRelationInput | CabinsRouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CabinsRoutes.
     */
    cursor?: CabinsRouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CabinsRoutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CabinsRoutes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CabinsRoutes.
     */
    distinct?: CabinsRouteScalarFieldEnum | CabinsRouteScalarFieldEnum[]
  }

  /**
   * CabinsRoute findFirstOrThrow
   */
  export type CabinsRouteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinsRoute
     */
    select?: CabinsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinsRoute
     */
    omit?: CabinsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinsRouteInclude<ExtArgs> | null
    /**
     * Filter, which CabinsRoute to fetch.
     */
    where?: CabinsRouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CabinsRoutes to fetch.
     */
    orderBy?: CabinsRouteOrderByWithRelationInput | CabinsRouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CabinsRoutes.
     */
    cursor?: CabinsRouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CabinsRoutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CabinsRoutes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CabinsRoutes.
     */
    distinct?: CabinsRouteScalarFieldEnum | CabinsRouteScalarFieldEnum[]
  }

  /**
   * CabinsRoute findMany
   */
  export type CabinsRouteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinsRoute
     */
    select?: CabinsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinsRoute
     */
    omit?: CabinsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinsRouteInclude<ExtArgs> | null
    /**
     * Filter, which CabinsRoutes to fetch.
     */
    where?: CabinsRouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CabinsRoutes to fetch.
     */
    orderBy?: CabinsRouteOrderByWithRelationInput | CabinsRouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CabinsRoutes.
     */
    cursor?: CabinsRouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CabinsRoutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CabinsRoutes.
     */
    skip?: number
    distinct?: CabinsRouteScalarFieldEnum | CabinsRouteScalarFieldEnum[]
  }

  /**
   * CabinsRoute create
   */
  export type CabinsRouteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinsRoute
     */
    select?: CabinsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinsRoute
     */
    omit?: CabinsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinsRouteInclude<ExtArgs> | null
    /**
     * The data needed to create a CabinsRoute.
     */
    data: XOR<CabinsRouteCreateInput, CabinsRouteUncheckedCreateInput>
  }

  /**
   * CabinsRoute createMany
   */
  export type CabinsRouteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CabinsRoutes.
     */
    data: CabinsRouteCreateManyInput | CabinsRouteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CabinsRoute createManyAndReturn
   */
  export type CabinsRouteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinsRoute
     */
    select?: CabinsRouteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CabinsRoute
     */
    omit?: CabinsRouteOmit<ExtArgs> | null
    /**
     * The data used to create many CabinsRoutes.
     */
    data: CabinsRouteCreateManyInput | CabinsRouteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinsRouteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CabinsRoute update
   */
  export type CabinsRouteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinsRoute
     */
    select?: CabinsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinsRoute
     */
    omit?: CabinsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinsRouteInclude<ExtArgs> | null
    /**
     * The data needed to update a CabinsRoute.
     */
    data: XOR<CabinsRouteUpdateInput, CabinsRouteUncheckedUpdateInput>
    /**
     * Choose, which CabinsRoute to update.
     */
    where: CabinsRouteWhereUniqueInput
  }

  /**
   * CabinsRoute updateMany
   */
  export type CabinsRouteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CabinsRoutes.
     */
    data: XOR<CabinsRouteUpdateManyMutationInput, CabinsRouteUncheckedUpdateManyInput>
    /**
     * Filter which CabinsRoutes to update
     */
    where?: CabinsRouteWhereInput
    /**
     * Limit how many CabinsRoutes to update.
     */
    limit?: number
  }

  /**
   * CabinsRoute updateManyAndReturn
   */
  export type CabinsRouteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinsRoute
     */
    select?: CabinsRouteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CabinsRoute
     */
    omit?: CabinsRouteOmit<ExtArgs> | null
    /**
     * The data used to update CabinsRoutes.
     */
    data: XOR<CabinsRouteUpdateManyMutationInput, CabinsRouteUncheckedUpdateManyInput>
    /**
     * Filter which CabinsRoutes to update
     */
    where?: CabinsRouteWhereInput
    /**
     * Limit how many CabinsRoutes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinsRouteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CabinsRoute upsert
   */
  export type CabinsRouteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinsRoute
     */
    select?: CabinsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinsRoute
     */
    omit?: CabinsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinsRouteInclude<ExtArgs> | null
    /**
     * The filter to search for the CabinsRoute to update in case it exists.
     */
    where: CabinsRouteWhereUniqueInput
    /**
     * In case the CabinsRoute found by the `where` argument doesn't exist, create a new CabinsRoute with this data.
     */
    create: XOR<CabinsRouteCreateInput, CabinsRouteUncheckedCreateInput>
    /**
     * In case the CabinsRoute was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CabinsRouteUpdateInput, CabinsRouteUncheckedUpdateInput>
  }

  /**
   * CabinsRoute delete
   */
  export type CabinsRouteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinsRoute
     */
    select?: CabinsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinsRoute
     */
    omit?: CabinsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinsRouteInclude<ExtArgs> | null
    /**
     * Filter which CabinsRoute to delete.
     */
    where: CabinsRouteWhereUniqueInput
  }

  /**
   * CabinsRoute deleteMany
   */
  export type CabinsRouteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CabinsRoutes to delete
     */
    where?: CabinsRouteWhereInput
    /**
     * Limit how many CabinsRoutes to delete.
     */
    limit?: number
  }

  /**
   * CabinsRoute without action
   */
  export type CabinsRouteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinsRoute
     */
    select?: CabinsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinsRoute
     */
    omit?: CabinsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinsRouteInclude<ExtArgs> | null
  }


  /**
   * Model AirportsRoute
   */

  export type AggregateAirportsRoute = {
    _count: AirportsRouteCountAggregateOutputType | null
    _avg: AirportsRouteAvgAggregateOutputType | null
    _sum: AirportsRouteSumAggregateOutputType | null
    _min: AirportsRouteMinAggregateOutputType | null
    _max: AirportsRouteMaxAggregateOutputType | null
  }

  export type AirportsRouteAvgAggregateOutputType = {
    id: number | null
    airportId: number | null
    routeId: number | null
  }

  export type AirportsRouteSumAggregateOutputType = {
    id: number | null
    airportId: number | null
    routeId: number | null
  }

  export type AirportsRouteMinAggregateOutputType = {
    id: number | null
    airportId: number | null
    routeId: number | null
  }

  export type AirportsRouteMaxAggregateOutputType = {
    id: number | null
    airportId: number | null
    routeId: number | null
  }

  export type AirportsRouteCountAggregateOutputType = {
    id: number
    airportId: number
    routeId: number
    _all: number
  }


  export type AirportsRouteAvgAggregateInputType = {
    id?: true
    airportId?: true
    routeId?: true
  }

  export type AirportsRouteSumAggregateInputType = {
    id?: true
    airportId?: true
    routeId?: true
  }

  export type AirportsRouteMinAggregateInputType = {
    id?: true
    airportId?: true
    routeId?: true
  }

  export type AirportsRouteMaxAggregateInputType = {
    id?: true
    airportId?: true
    routeId?: true
  }

  export type AirportsRouteCountAggregateInputType = {
    id?: true
    airportId?: true
    routeId?: true
    _all?: true
  }

  export type AirportsRouteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AirportsRoute to aggregate.
     */
    where?: AirportsRouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AirportsRoutes to fetch.
     */
    orderBy?: AirportsRouteOrderByWithRelationInput | AirportsRouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AirportsRouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AirportsRoutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AirportsRoutes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AirportsRoutes
    **/
    _count?: true | AirportsRouteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AirportsRouteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AirportsRouteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AirportsRouteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AirportsRouteMaxAggregateInputType
  }

  export type GetAirportsRouteAggregateType<T extends AirportsRouteAggregateArgs> = {
        [P in keyof T & keyof AggregateAirportsRoute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAirportsRoute[P]>
      : GetScalarType<T[P], AggregateAirportsRoute[P]>
  }




  export type AirportsRouteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AirportsRouteWhereInput
    orderBy?: AirportsRouteOrderByWithAggregationInput | AirportsRouteOrderByWithAggregationInput[]
    by: AirportsRouteScalarFieldEnum[] | AirportsRouteScalarFieldEnum
    having?: AirportsRouteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AirportsRouteCountAggregateInputType | true
    _avg?: AirportsRouteAvgAggregateInputType
    _sum?: AirportsRouteSumAggregateInputType
    _min?: AirportsRouteMinAggregateInputType
    _max?: AirportsRouteMaxAggregateInputType
  }

  export type AirportsRouteGroupByOutputType = {
    id: number
    airportId: number
    routeId: number
    _count: AirportsRouteCountAggregateOutputType | null
    _avg: AirportsRouteAvgAggregateOutputType | null
    _sum: AirportsRouteSumAggregateOutputType | null
    _min: AirportsRouteMinAggregateOutputType | null
    _max: AirportsRouteMaxAggregateOutputType | null
  }

  type GetAirportsRouteGroupByPayload<T extends AirportsRouteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AirportsRouteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AirportsRouteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AirportsRouteGroupByOutputType[P]>
            : GetScalarType<T[P], AirportsRouteGroupByOutputType[P]>
        }
      >
    >


  export type AirportsRouteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    airportId?: boolean
    routeId?: boolean
    airport?: boolean | AirportsDefaultArgs<ExtArgs>
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["airportsRoute"]>

  export type AirportsRouteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    airportId?: boolean
    routeId?: boolean
    airport?: boolean | AirportsDefaultArgs<ExtArgs>
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["airportsRoute"]>

  export type AirportsRouteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    airportId?: boolean
    routeId?: boolean
    airport?: boolean | AirportsDefaultArgs<ExtArgs>
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["airportsRoute"]>

  export type AirportsRouteSelectScalar = {
    id?: boolean
    airportId?: boolean
    routeId?: boolean
  }

  export type AirportsRouteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "airportId" | "routeId", ExtArgs["result"]["airportsRoute"]>
  export type AirportsRouteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airport?: boolean | AirportsDefaultArgs<ExtArgs>
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }
  export type AirportsRouteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airport?: boolean | AirportsDefaultArgs<ExtArgs>
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }
  export type AirportsRouteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    airport?: boolean | AirportsDefaultArgs<ExtArgs>
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }

  export type $AirportsRoutePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AirportsRoute"
    objects: {
      airport: Prisma.$AirportsPayload<ExtArgs>
      route: Prisma.$RoutePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      airportId: number
      routeId: number
    }, ExtArgs["result"]["airportsRoute"]>
    composites: {}
  }

  type AirportsRouteGetPayload<S extends boolean | null | undefined | AirportsRouteDefaultArgs> = $Result.GetResult<Prisma.$AirportsRoutePayload, S>

  type AirportsRouteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AirportsRouteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AirportsRouteCountAggregateInputType | true
    }

  export interface AirportsRouteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AirportsRoute'], meta: { name: 'AirportsRoute' } }
    /**
     * Find zero or one AirportsRoute that matches the filter.
     * @param {AirportsRouteFindUniqueArgs} args - Arguments to find a AirportsRoute
     * @example
     * // Get one AirportsRoute
     * const airportsRoute = await prisma.airportsRoute.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AirportsRouteFindUniqueArgs>(args: SelectSubset<T, AirportsRouteFindUniqueArgs<ExtArgs>>): Prisma__AirportsRouteClient<$Result.GetResult<Prisma.$AirportsRoutePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AirportsRoute that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AirportsRouteFindUniqueOrThrowArgs} args - Arguments to find a AirportsRoute
     * @example
     * // Get one AirportsRoute
     * const airportsRoute = await prisma.airportsRoute.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AirportsRouteFindUniqueOrThrowArgs>(args: SelectSubset<T, AirportsRouteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AirportsRouteClient<$Result.GetResult<Prisma.$AirportsRoutePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AirportsRoute that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportsRouteFindFirstArgs} args - Arguments to find a AirportsRoute
     * @example
     * // Get one AirportsRoute
     * const airportsRoute = await prisma.airportsRoute.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AirportsRouteFindFirstArgs>(args?: SelectSubset<T, AirportsRouteFindFirstArgs<ExtArgs>>): Prisma__AirportsRouteClient<$Result.GetResult<Prisma.$AirportsRoutePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AirportsRoute that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportsRouteFindFirstOrThrowArgs} args - Arguments to find a AirportsRoute
     * @example
     * // Get one AirportsRoute
     * const airportsRoute = await prisma.airportsRoute.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AirportsRouteFindFirstOrThrowArgs>(args?: SelectSubset<T, AirportsRouteFindFirstOrThrowArgs<ExtArgs>>): Prisma__AirportsRouteClient<$Result.GetResult<Prisma.$AirportsRoutePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AirportsRoutes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportsRouteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AirportsRoutes
     * const airportsRoutes = await prisma.airportsRoute.findMany()
     * 
     * // Get first 10 AirportsRoutes
     * const airportsRoutes = await prisma.airportsRoute.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const airportsRouteWithIdOnly = await prisma.airportsRoute.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AirportsRouteFindManyArgs>(args?: SelectSubset<T, AirportsRouteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirportsRoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AirportsRoute.
     * @param {AirportsRouteCreateArgs} args - Arguments to create a AirportsRoute.
     * @example
     * // Create one AirportsRoute
     * const AirportsRoute = await prisma.airportsRoute.create({
     *   data: {
     *     // ... data to create a AirportsRoute
     *   }
     * })
     * 
     */
    create<T extends AirportsRouteCreateArgs>(args: SelectSubset<T, AirportsRouteCreateArgs<ExtArgs>>): Prisma__AirportsRouteClient<$Result.GetResult<Prisma.$AirportsRoutePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AirportsRoutes.
     * @param {AirportsRouteCreateManyArgs} args - Arguments to create many AirportsRoutes.
     * @example
     * // Create many AirportsRoutes
     * const airportsRoute = await prisma.airportsRoute.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AirportsRouteCreateManyArgs>(args?: SelectSubset<T, AirportsRouteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AirportsRoutes and returns the data saved in the database.
     * @param {AirportsRouteCreateManyAndReturnArgs} args - Arguments to create many AirportsRoutes.
     * @example
     * // Create many AirportsRoutes
     * const airportsRoute = await prisma.airportsRoute.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AirportsRoutes and only return the `id`
     * const airportsRouteWithIdOnly = await prisma.airportsRoute.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AirportsRouteCreateManyAndReturnArgs>(args?: SelectSubset<T, AirportsRouteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirportsRoutePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AirportsRoute.
     * @param {AirportsRouteDeleteArgs} args - Arguments to delete one AirportsRoute.
     * @example
     * // Delete one AirportsRoute
     * const AirportsRoute = await prisma.airportsRoute.delete({
     *   where: {
     *     // ... filter to delete one AirportsRoute
     *   }
     * })
     * 
     */
    delete<T extends AirportsRouteDeleteArgs>(args: SelectSubset<T, AirportsRouteDeleteArgs<ExtArgs>>): Prisma__AirportsRouteClient<$Result.GetResult<Prisma.$AirportsRoutePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AirportsRoute.
     * @param {AirportsRouteUpdateArgs} args - Arguments to update one AirportsRoute.
     * @example
     * // Update one AirportsRoute
     * const airportsRoute = await prisma.airportsRoute.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AirportsRouteUpdateArgs>(args: SelectSubset<T, AirportsRouteUpdateArgs<ExtArgs>>): Prisma__AirportsRouteClient<$Result.GetResult<Prisma.$AirportsRoutePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AirportsRoutes.
     * @param {AirportsRouteDeleteManyArgs} args - Arguments to filter AirportsRoutes to delete.
     * @example
     * // Delete a few AirportsRoutes
     * const { count } = await prisma.airportsRoute.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AirportsRouteDeleteManyArgs>(args?: SelectSubset<T, AirportsRouteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AirportsRoutes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportsRouteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AirportsRoutes
     * const airportsRoute = await prisma.airportsRoute.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AirportsRouteUpdateManyArgs>(args: SelectSubset<T, AirportsRouteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AirportsRoutes and returns the data updated in the database.
     * @param {AirportsRouteUpdateManyAndReturnArgs} args - Arguments to update many AirportsRoutes.
     * @example
     * // Update many AirportsRoutes
     * const airportsRoute = await prisma.airportsRoute.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AirportsRoutes and only return the `id`
     * const airportsRouteWithIdOnly = await prisma.airportsRoute.updateManyAndReturn({
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
    updateManyAndReturn<T extends AirportsRouteUpdateManyAndReturnArgs>(args: SelectSubset<T, AirportsRouteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirportsRoutePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AirportsRoute.
     * @param {AirportsRouteUpsertArgs} args - Arguments to update or create a AirportsRoute.
     * @example
     * // Update or create a AirportsRoute
     * const airportsRoute = await prisma.airportsRoute.upsert({
     *   create: {
     *     // ... data to create a AirportsRoute
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AirportsRoute we want to update
     *   }
     * })
     */
    upsert<T extends AirportsRouteUpsertArgs>(args: SelectSubset<T, AirportsRouteUpsertArgs<ExtArgs>>): Prisma__AirportsRouteClient<$Result.GetResult<Prisma.$AirportsRoutePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AirportsRoutes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportsRouteCountArgs} args - Arguments to filter AirportsRoutes to count.
     * @example
     * // Count the number of AirportsRoutes
     * const count = await prisma.airportsRoute.count({
     *   where: {
     *     // ... the filter for the AirportsRoutes we want to count
     *   }
     * })
    **/
    count<T extends AirportsRouteCountArgs>(
      args?: Subset<T, AirportsRouteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AirportsRouteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AirportsRoute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportsRouteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AirportsRouteAggregateArgs>(args: Subset<T, AirportsRouteAggregateArgs>): Prisma.PrismaPromise<GetAirportsRouteAggregateType<T>>

    /**
     * Group by AirportsRoute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportsRouteGroupByArgs} args - Group by arguments.
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
      T extends AirportsRouteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AirportsRouteGroupByArgs['orderBy'] }
        : { orderBy?: AirportsRouteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AirportsRouteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAirportsRouteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AirportsRoute model
   */
  readonly fields: AirportsRouteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AirportsRoute.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AirportsRouteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    airport<T extends AirportsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AirportsDefaultArgs<ExtArgs>>): Prisma__AirportsClient<$Result.GetResult<Prisma.$AirportsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    route<T extends RouteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RouteDefaultArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AirportsRoute model
   */ 
  interface AirportsRouteFieldRefs {
    readonly id: FieldRef<"AirportsRoute", 'Int'>
    readonly airportId: FieldRef<"AirportsRoute", 'Int'>
    readonly routeId: FieldRef<"AirportsRoute", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AirportsRoute findUnique
   */
  export type AirportsRouteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirportsRoute
     */
    select?: AirportsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirportsRoute
     */
    omit?: AirportsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsRouteInclude<ExtArgs> | null
    /**
     * Filter, which AirportsRoute to fetch.
     */
    where: AirportsRouteWhereUniqueInput
  }

  /**
   * AirportsRoute findUniqueOrThrow
   */
  export type AirportsRouteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirportsRoute
     */
    select?: AirportsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirportsRoute
     */
    omit?: AirportsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsRouteInclude<ExtArgs> | null
    /**
     * Filter, which AirportsRoute to fetch.
     */
    where: AirportsRouteWhereUniqueInput
  }

  /**
   * AirportsRoute findFirst
   */
  export type AirportsRouteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirportsRoute
     */
    select?: AirportsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirportsRoute
     */
    omit?: AirportsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsRouteInclude<ExtArgs> | null
    /**
     * Filter, which AirportsRoute to fetch.
     */
    where?: AirportsRouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AirportsRoutes to fetch.
     */
    orderBy?: AirportsRouteOrderByWithRelationInput | AirportsRouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AirportsRoutes.
     */
    cursor?: AirportsRouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AirportsRoutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AirportsRoutes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AirportsRoutes.
     */
    distinct?: AirportsRouteScalarFieldEnum | AirportsRouteScalarFieldEnum[]
  }

  /**
   * AirportsRoute findFirstOrThrow
   */
  export type AirportsRouteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirportsRoute
     */
    select?: AirportsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirportsRoute
     */
    omit?: AirportsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsRouteInclude<ExtArgs> | null
    /**
     * Filter, which AirportsRoute to fetch.
     */
    where?: AirportsRouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AirportsRoutes to fetch.
     */
    orderBy?: AirportsRouteOrderByWithRelationInput | AirportsRouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AirportsRoutes.
     */
    cursor?: AirportsRouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AirportsRoutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AirportsRoutes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AirportsRoutes.
     */
    distinct?: AirportsRouteScalarFieldEnum | AirportsRouteScalarFieldEnum[]
  }

  /**
   * AirportsRoute findMany
   */
  export type AirportsRouteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirportsRoute
     */
    select?: AirportsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirportsRoute
     */
    omit?: AirportsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsRouteInclude<ExtArgs> | null
    /**
     * Filter, which AirportsRoutes to fetch.
     */
    where?: AirportsRouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AirportsRoutes to fetch.
     */
    orderBy?: AirportsRouteOrderByWithRelationInput | AirportsRouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AirportsRoutes.
     */
    cursor?: AirportsRouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AirportsRoutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AirportsRoutes.
     */
    skip?: number
    distinct?: AirportsRouteScalarFieldEnum | AirportsRouteScalarFieldEnum[]
  }

  /**
   * AirportsRoute create
   */
  export type AirportsRouteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirportsRoute
     */
    select?: AirportsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirportsRoute
     */
    omit?: AirportsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsRouteInclude<ExtArgs> | null
    /**
     * The data needed to create a AirportsRoute.
     */
    data: XOR<AirportsRouteCreateInput, AirportsRouteUncheckedCreateInput>
  }

  /**
   * AirportsRoute createMany
   */
  export type AirportsRouteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AirportsRoutes.
     */
    data: AirportsRouteCreateManyInput | AirportsRouteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AirportsRoute createManyAndReturn
   */
  export type AirportsRouteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirportsRoute
     */
    select?: AirportsRouteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AirportsRoute
     */
    omit?: AirportsRouteOmit<ExtArgs> | null
    /**
     * The data used to create many AirportsRoutes.
     */
    data: AirportsRouteCreateManyInput | AirportsRouteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsRouteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AirportsRoute update
   */
  export type AirportsRouteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirportsRoute
     */
    select?: AirportsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirportsRoute
     */
    omit?: AirportsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsRouteInclude<ExtArgs> | null
    /**
     * The data needed to update a AirportsRoute.
     */
    data: XOR<AirportsRouteUpdateInput, AirportsRouteUncheckedUpdateInput>
    /**
     * Choose, which AirportsRoute to update.
     */
    where: AirportsRouteWhereUniqueInput
  }

  /**
   * AirportsRoute updateMany
   */
  export type AirportsRouteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AirportsRoutes.
     */
    data: XOR<AirportsRouteUpdateManyMutationInput, AirportsRouteUncheckedUpdateManyInput>
    /**
     * Filter which AirportsRoutes to update
     */
    where?: AirportsRouteWhereInput
    /**
     * Limit how many AirportsRoutes to update.
     */
    limit?: number
  }

  /**
   * AirportsRoute updateManyAndReturn
   */
  export type AirportsRouteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirportsRoute
     */
    select?: AirportsRouteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AirportsRoute
     */
    omit?: AirportsRouteOmit<ExtArgs> | null
    /**
     * The data used to update AirportsRoutes.
     */
    data: XOR<AirportsRouteUpdateManyMutationInput, AirportsRouteUncheckedUpdateManyInput>
    /**
     * Filter which AirportsRoutes to update
     */
    where?: AirportsRouteWhereInput
    /**
     * Limit how many AirportsRoutes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsRouteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AirportsRoute upsert
   */
  export type AirportsRouteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirportsRoute
     */
    select?: AirportsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirportsRoute
     */
    omit?: AirportsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsRouteInclude<ExtArgs> | null
    /**
     * The filter to search for the AirportsRoute to update in case it exists.
     */
    where: AirportsRouteWhereUniqueInput
    /**
     * In case the AirportsRoute found by the `where` argument doesn't exist, create a new AirportsRoute with this data.
     */
    create: XOR<AirportsRouteCreateInput, AirportsRouteUncheckedCreateInput>
    /**
     * In case the AirportsRoute was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AirportsRouteUpdateInput, AirportsRouteUncheckedUpdateInput>
  }

  /**
   * AirportsRoute delete
   */
  export type AirportsRouteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirportsRoute
     */
    select?: AirportsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirportsRoute
     */
    omit?: AirportsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsRouteInclude<ExtArgs> | null
    /**
     * Filter which AirportsRoute to delete.
     */
    where: AirportsRouteWhereUniqueInput
  }

  /**
   * AirportsRoute deleteMany
   */
  export type AirportsRouteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AirportsRoutes to delete
     */
    where?: AirportsRouteWhereInput
    /**
     * Limit how many AirportsRoutes to delete.
     */
    limit?: number
  }

  /**
   * AirportsRoute without action
   */
  export type AirportsRouteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirportsRoute
     */
    select?: AirportsRouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AirportsRoute
     */
    omit?: AirportsRouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportsRouteInclude<ExtArgs> | null
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


  export const UsersScalarFieldEnum: {
    id: 'id',
    user: 'user',
    password: 'password',
    name: 'name',
    active: 'active',
    dateJoined: 'dateJoined',
    lastLogin: 'lastLogin',
    updatedAt: 'updatedAt'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const AirportsScalarFieldEnum: {
    id: 'id',
    city: 'city',
    airportCode: 'airportCode'
  };

  export type AirportsScalarFieldEnum = (typeof AirportsScalarFieldEnum)[keyof typeof AirportsScalarFieldEnum]


  export const LocalsScalarFieldEnum: {
    id: 'id',
    airportId: 'airportId',
    city: 'city',
    country: 'country',
    passagePrice: 'passagePrice',
    image: 'image',
    active: 'active'
  };

  export type LocalsScalarFieldEnum = (typeof LocalsScalarFieldEnum)[keyof typeof LocalsScalarFieldEnum]


  export const RouteScalarFieldEnum: {
    id: 'id',
    mileageProgram: 'mileageProgram',
    enableLayovers: 'enableLayovers',
    active: 'active'
  };

  export type RouteScalarFieldEnum = (typeof RouteScalarFieldEnum)[keyof typeof RouteScalarFieldEnum]


  export const CabinsRouteScalarFieldEnum: {
    id: 'id',
    routeId: 'routeId',
    key: 'key',
    maximumPoints: 'maximumPoints',
    bagsAmount: 'bagsAmount',
    passagePrice: 'passagePrice',
    cancellationPrice: 'cancellationPrice'
  };

  export type CabinsRouteScalarFieldEnum = (typeof CabinsRouteScalarFieldEnum)[keyof typeof CabinsRouteScalarFieldEnum]


  export const AirportsRouteScalarFieldEnum: {
    id: 'id',
    airportId: 'airportId',
    routeId: 'routeId'
  };

  export type AirportsRouteScalarFieldEnum = (typeof AirportsRouteScalarFieldEnum)[keyof typeof AirportsRouteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


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


  export type UsersWhereInput = {
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    id?: IntFilter<"Users"> | number
    user?: StringFilter<"Users"> | string
    password?: StringFilter<"Users"> | string
    name?: StringFilter<"Users"> | string
    active?: BoolFilter<"Users"> | boolean
    dateJoined?: DateTimeFilter<"Users"> | Date | string
    lastLogin?: DateTimeNullableFilter<"Users"> | Date | string | null
    updatedAt?: DateTimeFilter<"Users"> | Date | string
  }

  export type UsersOrderByWithRelationInput = {
    id?: SortOrder
    user?: SortOrder
    password?: SortOrder
    name?: SortOrder
    active?: SortOrder
    dateJoined?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type UsersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    user?: string
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    password?: StringFilter<"Users"> | string
    name?: StringFilter<"Users"> | string
    active?: BoolFilter<"Users"> | boolean
    dateJoined?: DateTimeFilter<"Users"> | Date | string
    lastLogin?: DateTimeNullableFilter<"Users"> | Date | string | null
    updatedAt?: DateTimeFilter<"Users"> | Date | string
  }, "id" | "user">

  export type UsersOrderByWithAggregationInput = {
    id?: SortOrder
    user?: SortOrder
    password?: SortOrder
    name?: SortOrder
    active?: SortOrder
    dateJoined?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: UsersCountOrderByAggregateInput
    _avg?: UsersAvgOrderByAggregateInput
    _max?: UsersMaxOrderByAggregateInput
    _min?: UsersMinOrderByAggregateInput
    _sum?: UsersSumOrderByAggregateInput
  }

  export type UsersScalarWhereWithAggregatesInput = {
    AND?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    OR?: UsersScalarWhereWithAggregatesInput[]
    NOT?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Users"> | number
    user?: StringWithAggregatesFilter<"Users"> | string
    password?: StringWithAggregatesFilter<"Users"> | string
    name?: StringWithAggregatesFilter<"Users"> | string
    active?: BoolWithAggregatesFilter<"Users"> | boolean
    dateJoined?: DateTimeWithAggregatesFilter<"Users"> | Date | string
    lastLogin?: DateTimeNullableWithAggregatesFilter<"Users"> | Date | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"Users"> | Date | string
  }

  export type AirportsWhereInput = {
    AND?: AirportsWhereInput | AirportsWhereInput[]
    OR?: AirportsWhereInput[]
    NOT?: AirportsWhereInput | AirportsWhereInput[]
    id?: IntFilter<"Airports"> | number
    city?: StringFilter<"Airports"> | string
    airportCode?: StringFilter<"Airports"> | string
    local?: XOR<LocalsNullableScalarRelationFilter, LocalsWhereInput> | null
    routes?: AirportsRouteListRelationFilter
  }

  export type AirportsOrderByWithRelationInput = {
    id?: SortOrder
    city?: SortOrder
    airportCode?: SortOrder
    local?: LocalsOrderByWithRelationInput
    routes?: AirportsRouteOrderByRelationAggregateInput
  }

  export type AirportsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    airportCode?: string
    AND?: AirportsWhereInput | AirportsWhereInput[]
    OR?: AirportsWhereInput[]
    NOT?: AirportsWhereInput | AirportsWhereInput[]
    city?: StringFilter<"Airports"> | string
    local?: XOR<LocalsNullableScalarRelationFilter, LocalsWhereInput> | null
    routes?: AirportsRouteListRelationFilter
  }, "id" | "airportCode">

  export type AirportsOrderByWithAggregationInput = {
    id?: SortOrder
    city?: SortOrder
    airportCode?: SortOrder
    _count?: AirportsCountOrderByAggregateInput
    _avg?: AirportsAvgOrderByAggregateInput
    _max?: AirportsMaxOrderByAggregateInput
    _min?: AirportsMinOrderByAggregateInput
    _sum?: AirportsSumOrderByAggregateInput
  }

  export type AirportsScalarWhereWithAggregatesInput = {
    AND?: AirportsScalarWhereWithAggregatesInput | AirportsScalarWhereWithAggregatesInput[]
    OR?: AirportsScalarWhereWithAggregatesInput[]
    NOT?: AirportsScalarWhereWithAggregatesInput | AirportsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Airports"> | number
    city?: StringWithAggregatesFilter<"Airports"> | string
    airportCode?: StringWithAggregatesFilter<"Airports"> | string
  }

  export type LocalsWhereInput = {
    AND?: LocalsWhereInput | LocalsWhereInput[]
    OR?: LocalsWhereInput[]
    NOT?: LocalsWhereInput | LocalsWhereInput[]
    id?: IntFilter<"Locals"> | number
    airportId?: IntFilter<"Locals"> | number
    city?: StringFilter<"Locals"> | string
    country?: StringFilter<"Locals"> | string
    passagePrice?: DecimalFilter<"Locals"> | Decimal | DecimalJsLike | number | string
    image?: StringFilter<"Locals"> | string
    active?: BoolFilter<"Locals"> | boolean
    airport?: XOR<AirportsScalarRelationFilter, AirportsWhereInput>
  }

  export type LocalsOrderByWithRelationInput = {
    id?: SortOrder
    airportId?: SortOrder
    city?: SortOrder
    country?: SortOrder
    passagePrice?: SortOrder
    image?: SortOrder
    active?: SortOrder
    airport?: AirportsOrderByWithRelationInput
  }

  export type LocalsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    airportId?: number
    AND?: LocalsWhereInput | LocalsWhereInput[]
    OR?: LocalsWhereInput[]
    NOT?: LocalsWhereInput | LocalsWhereInput[]
    city?: StringFilter<"Locals"> | string
    country?: StringFilter<"Locals"> | string
    passagePrice?: DecimalFilter<"Locals"> | Decimal | DecimalJsLike | number | string
    image?: StringFilter<"Locals"> | string
    active?: BoolFilter<"Locals"> | boolean
    airport?: XOR<AirportsScalarRelationFilter, AirportsWhereInput>
  }, "id" | "airportId">

  export type LocalsOrderByWithAggregationInput = {
    id?: SortOrder
    airportId?: SortOrder
    city?: SortOrder
    country?: SortOrder
    passagePrice?: SortOrder
    image?: SortOrder
    active?: SortOrder
    _count?: LocalsCountOrderByAggregateInput
    _avg?: LocalsAvgOrderByAggregateInput
    _max?: LocalsMaxOrderByAggregateInput
    _min?: LocalsMinOrderByAggregateInput
    _sum?: LocalsSumOrderByAggregateInput
  }

  export type LocalsScalarWhereWithAggregatesInput = {
    AND?: LocalsScalarWhereWithAggregatesInput | LocalsScalarWhereWithAggregatesInput[]
    OR?: LocalsScalarWhereWithAggregatesInput[]
    NOT?: LocalsScalarWhereWithAggregatesInput | LocalsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Locals"> | number
    airportId?: IntWithAggregatesFilter<"Locals"> | number
    city?: StringWithAggregatesFilter<"Locals"> | string
    country?: StringWithAggregatesFilter<"Locals"> | string
    passagePrice?: DecimalWithAggregatesFilter<"Locals"> | Decimal | DecimalJsLike | number | string
    image?: StringWithAggregatesFilter<"Locals"> | string
    active?: BoolWithAggregatesFilter<"Locals"> | boolean
  }

  export type RouteWhereInput = {
    AND?: RouteWhereInput | RouteWhereInput[]
    OR?: RouteWhereInput[]
    NOT?: RouteWhereInput | RouteWhereInput[]
    id?: IntFilter<"Route"> | number
    mileageProgram?: StringFilter<"Route"> | string
    enableLayovers?: BoolFilter<"Route"> | boolean
    active?: BoolFilter<"Route"> | boolean
    airports?: AirportsRouteListRelationFilter
    cabins?: CabinsRouteListRelationFilter
  }

  export type RouteOrderByWithRelationInput = {
    id?: SortOrder
    mileageProgram?: SortOrder
    enableLayovers?: SortOrder
    active?: SortOrder
    airports?: AirportsRouteOrderByRelationAggregateInput
    cabins?: CabinsRouteOrderByRelationAggregateInput
  }

  export type RouteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RouteWhereInput | RouteWhereInput[]
    OR?: RouteWhereInput[]
    NOT?: RouteWhereInput | RouteWhereInput[]
    mileageProgram?: StringFilter<"Route"> | string
    enableLayovers?: BoolFilter<"Route"> | boolean
    active?: BoolFilter<"Route"> | boolean
    airports?: AirportsRouteListRelationFilter
    cabins?: CabinsRouteListRelationFilter
  }, "id">

  export type RouteOrderByWithAggregationInput = {
    id?: SortOrder
    mileageProgram?: SortOrder
    enableLayovers?: SortOrder
    active?: SortOrder
    _count?: RouteCountOrderByAggregateInput
    _avg?: RouteAvgOrderByAggregateInput
    _max?: RouteMaxOrderByAggregateInput
    _min?: RouteMinOrderByAggregateInput
    _sum?: RouteSumOrderByAggregateInput
  }

  export type RouteScalarWhereWithAggregatesInput = {
    AND?: RouteScalarWhereWithAggregatesInput | RouteScalarWhereWithAggregatesInput[]
    OR?: RouteScalarWhereWithAggregatesInput[]
    NOT?: RouteScalarWhereWithAggregatesInput | RouteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Route"> | number
    mileageProgram?: StringWithAggregatesFilter<"Route"> | string
    enableLayovers?: BoolWithAggregatesFilter<"Route"> | boolean
    active?: BoolWithAggregatesFilter<"Route"> | boolean
  }

  export type CabinsRouteWhereInput = {
    AND?: CabinsRouteWhereInput | CabinsRouteWhereInput[]
    OR?: CabinsRouteWhereInput[]
    NOT?: CabinsRouteWhereInput | CabinsRouteWhereInput[]
    id?: IntFilter<"CabinsRoute"> | number
    routeId?: IntFilter<"CabinsRoute"> | number
    key?: StringFilter<"CabinsRoute"> | string
    maximumPoints?: IntFilter<"CabinsRoute"> | number
    bagsAmount?: IntFilter<"CabinsRoute"> | number
    passagePrice?: DecimalFilter<"CabinsRoute"> | Decimal | DecimalJsLike | number | string
    cancellationPrice?: DecimalFilter<"CabinsRoute"> | Decimal | DecimalJsLike | number | string
    route?: XOR<RouteScalarRelationFilter, RouteWhereInput>
  }

  export type CabinsRouteOrderByWithRelationInput = {
    id?: SortOrder
    routeId?: SortOrder
    key?: SortOrder
    maximumPoints?: SortOrder
    bagsAmount?: SortOrder
    passagePrice?: SortOrder
    cancellationPrice?: SortOrder
    route?: RouteOrderByWithRelationInput
  }

  export type CabinsRouteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    UniqueCabinPerRoute?: CabinsRouteUniqueCabinPerRouteCompoundUniqueInput
    AND?: CabinsRouteWhereInput | CabinsRouteWhereInput[]
    OR?: CabinsRouteWhereInput[]
    NOT?: CabinsRouteWhereInput | CabinsRouteWhereInput[]
    routeId?: IntFilter<"CabinsRoute"> | number
    key?: StringFilter<"CabinsRoute"> | string
    maximumPoints?: IntFilter<"CabinsRoute"> | number
    bagsAmount?: IntFilter<"CabinsRoute"> | number
    passagePrice?: DecimalFilter<"CabinsRoute"> | Decimal | DecimalJsLike | number | string
    cancellationPrice?: DecimalFilter<"CabinsRoute"> | Decimal | DecimalJsLike | number | string
    route?: XOR<RouteScalarRelationFilter, RouteWhereInput>
  }, "id" | "UniqueCabinPerRoute">

  export type CabinsRouteOrderByWithAggregationInput = {
    id?: SortOrder
    routeId?: SortOrder
    key?: SortOrder
    maximumPoints?: SortOrder
    bagsAmount?: SortOrder
    passagePrice?: SortOrder
    cancellationPrice?: SortOrder
    _count?: CabinsRouteCountOrderByAggregateInput
    _avg?: CabinsRouteAvgOrderByAggregateInput
    _max?: CabinsRouteMaxOrderByAggregateInput
    _min?: CabinsRouteMinOrderByAggregateInput
    _sum?: CabinsRouteSumOrderByAggregateInput
  }

  export type CabinsRouteScalarWhereWithAggregatesInput = {
    AND?: CabinsRouteScalarWhereWithAggregatesInput | CabinsRouteScalarWhereWithAggregatesInput[]
    OR?: CabinsRouteScalarWhereWithAggregatesInput[]
    NOT?: CabinsRouteScalarWhereWithAggregatesInput | CabinsRouteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CabinsRoute"> | number
    routeId?: IntWithAggregatesFilter<"CabinsRoute"> | number
    key?: StringWithAggregatesFilter<"CabinsRoute"> | string
    maximumPoints?: IntWithAggregatesFilter<"CabinsRoute"> | number
    bagsAmount?: IntWithAggregatesFilter<"CabinsRoute"> | number
    passagePrice?: DecimalWithAggregatesFilter<"CabinsRoute"> | Decimal | DecimalJsLike | number | string
    cancellationPrice?: DecimalWithAggregatesFilter<"CabinsRoute"> | Decimal | DecimalJsLike | number | string
  }

  export type AirportsRouteWhereInput = {
    AND?: AirportsRouteWhereInput | AirportsRouteWhereInput[]
    OR?: AirportsRouteWhereInput[]
    NOT?: AirportsRouteWhereInput | AirportsRouteWhereInput[]
    id?: IntFilter<"AirportsRoute"> | number
    airportId?: IntFilter<"AirportsRoute"> | number
    routeId?: IntFilter<"AirportsRoute"> | number
    airport?: XOR<AirportsScalarRelationFilter, AirportsWhereInput>
    route?: XOR<RouteScalarRelationFilter, RouteWhereInput>
  }

  export type AirportsRouteOrderByWithRelationInput = {
    id?: SortOrder
    airportId?: SortOrder
    routeId?: SortOrder
    airport?: AirportsOrderByWithRelationInput
    route?: RouteOrderByWithRelationInput
  }

  export type AirportsRouteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AirportsRouteWhereInput | AirportsRouteWhereInput[]
    OR?: AirportsRouteWhereInput[]
    NOT?: AirportsRouteWhereInput | AirportsRouteWhereInput[]
    airportId?: IntFilter<"AirportsRoute"> | number
    routeId?: IntFilter<"AirportsRoute"> | number
    airport?: XOR<AirportsScalarRelationFilter, AirportsWhereInput>
    route?: XOR<RouteScalarRelationFilter, RouteWhereInput>
  }, "id">

  export type AirportsRouteOrderByWithAggregationInput = {
    id?: SortOrder
    airportId?: SortOrder
    routeId?: SortOrder
    _count?: AirportsRouteCountOrderByAggregateInput
    _avg?: AirportsRouteAvgOrderByAggregateInput
    _max?: AirportsRouteMaxOrderByAggregateInput
    _min?: AirportsRouteMinOrderByAggregateInput
    _sum?: AirportsRouteSumOrderByAggregateInput
  }

  export type AirportsRouteScalarWhereWithAggregatesInput = {
    AND?: AirportsRouteScalarWhereWithAggregatesInput | AirportsRouteScalarWhereWithAggregatesInput[]
    OR?: AirportsRouteScalarWhereWithAggregatesInput[]
    NOT?: AirportsRouteScalarWhereWithAggregatesInput | AirportsRouteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AirportsRoute"> | number
    airportId?: IntWithAggregatesFilter<"AirportsRoute"> | number
    routeId?: IntWithAggregatesFilter<"AirportsRoute"> | number
  }

  export type UsersCreateInput = {
    user: string
    password: string
    name: string
    active?: boolean
    dateJoined?: Date | string
    lastLogin?: Date | string | null
    updatedAt?: Date | string
  }

  export type UsersUncheckedCreateInput = {
    id?: number
    user: string
    password: string
    name: string
    active?: boolean
    dateJoined?: Date | string
    lastLogin?: Date | string | null
    updatedAt?: Date | string
  }

  export type UsersUpdateInput = {
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    dateJoined?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    dateJoined?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersCreateManyInput = {
    id?: number
    user: string
    password: string
    name: string
    active?: boolean
    dateJoined?: Date | string
    lastLogin?: Date | string | null
    updatedAt?: Date | string
  }

  export type UsersUpdateManyMutationInput = {
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    dateJoined?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    dateJoined?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AirportsCreateInput = {
    city: string
    airportCode: string
    local?: LocalsCreateNestedOneWithoutAirportInput
    routes?: AirportsRouteCreateNestedManyWithoutAirportInput
  }

  export type AirportsUncheckedCreateInput = {
    id?: number
    city: string
    airportCode: string
    local?: LocalsUncheckedCreateNestedOneWithoutAirportInput
    routes?: AirportsRouteUncheckedCreateNestedManyWithoutAirportInput
  }

  export type AirportsUpdateInput = {
    city?: StringFieldUpdateOperationsInput | string
    airportCode?: StringFieldUpdateOperationsInput | string
    local?: LocalsUpdateOneWithoutAirportNestedInput
    routes?: AirportsRouteUpdateManyWithoutAirportNestedInput
  }

  export type AirportsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    city?: StringFieldUpdateOperationsInput | string
    airportCode?: StringFieldUpdateOperationsInput | string
    local?: LocalsUncheckedUpdateOneWithoutAirportNestedInput
    routes?: AirportsRouteUncheckedUpdateManyWithoutAirportNestedInput
  }

  export type AirportsCreateManyInput = {
    id?: number
    city: string
    airportCode: string
  }

  export type AirportsUpdateManyMutationInput = {
    city?: StringFieldUpdateOperationsInput | string
    airportCode?: StringFieldUpdateOperationsInput | string
  }

  export type AirportsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    city?: StringFieldUpdateOperationsInput | string
    airportCode?: StringFieldUpdateOperationsInput | string
  }

  export type LocalsCreateInput = {
    city: string
    country: string
    passagePrice: Decimal | DecimalJsLike | number | string
    image: string
    active?: boolean
    airport: AirportsCreateNestedOneWithoutLocalInput
  }

  export type LocalsUncheckedCreateInput = {
    id?: number
    airportId: number
    city: string
    country: string
    passagePrice: Decimal | DecimalJsLike | number | string
    image: string
    active?: boolean
  }

  export type LocalsUpdateInput = {
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    passagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    airport?: AirportsUpdateOneRequiredWithoutLocalNestedInput
  }

  export type LocalsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    airportId?: IntFieldUpdateOperationsInput | number
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    passagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LocalsCreateManyInput = {
    id?: number
    airportId: number
    city: string
    country: string
    passagePrice: Decimal | DecimalJsLike | number | string
    image: string
    active?: boolean
  }

  export type LocalsUpdateManyMutationInput = {
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    passagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LocalsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    airportId?: IntFieldUpdateOperationsInput | number
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    passagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RouteCreateInput = {
    mileageProgram: string
    enableLayovers: boolean
    active?: boolean
    airports?: AirportsRouteCreateNestedManyWithoutRouteInput
    cabins?: CabinsRouteCreateNestedManyWithoutRouteInput
  }

  export type RouteUncheckedCreateInput = {
    id?: number
    mileageProgram: string
    enableLayovers: boolean
    active?: boolean
    airports?: AirportsRouteUncheckedCreateNestedManyWithoutRouteInput
    cabins?: CabinsRouteUncheckedCreateNestedManyWithoutRouteInput
  }

  export type RouteUpdateInput = {
    mileageProgram?: StringFieldUpdateOperationsInput | string
    enableLayovers?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
    airports?: AirportsRouteUpdateManyWithoutRouteNestedInput
    cabins?: CabinsRouteUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    mileageProgram?: StringFieldUpdateOperationsInput | string
    enableLayovers?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
    airports?: AirportsRouteUncheckedUpdateManyWithoutRouteNestedInput
    cabins?: CabinsRouteUncheckedUpdateManyWithoutRouteNestedInput
  }

  export type RouteCreateManyInput = {
    id?: number
    mileageProgram: string
    enableLayovers: boolean
    active?: boolean
  }

  export type RouteUpdateManyMutationInput = {
    mileageProgram?: StringFieldUpdateOperationsInput | string
    enableLayovers?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RouteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    mileageProgram?: StringFieldUpdateOperationsInput | string
    enableLayovers?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CabinsRouteCreateInput = {
    key: string
    maximumPoints: number
    bagsAmount: number
    passagePrice: Decimal | DecimalJsLike | number | string
    cancellationPrice: Decimal | DecimalJsLike | number | string
    route: RouteCreateNestedOneWithoutCabinsInput
  }

  export type CabinsRouteUncheckedCreateInput = {
    id?: number
    routeId: number
    key: string
    maximumPoints: number
    bagsAmount: number
    passagePrice: Decimal | DecimalJsLike | number | string
    cancellationPrice: Decimal | DecimalJsLike | number | string
  }

  export type CabinsRouteUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    maximumPoints?: IntFieldUpdateOperationsInput | number
    bagsAmount?: IntFieldUpdateOperationsInput | number
    passagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cancellationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    route?: RouteUpdateOneRequiredWithoutCabinsNestedInput
  }

  export type CabinsRouteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    routeId?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    maximumPoints?: IntFieldUpdateOperationsInput | number
    bagsAmount?: IntFieldUpdateOperationsInput | number
    passagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cancellationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type CabinsRouteCreateManyInput = {
    id?: number
    routeId: number
    key: string
    maximumPoints: number
    bagsAmount: number
    passagePrice: Decimal | DecimalJsLike | number | string
    cancellationPrice: Decimal | DecimalJsLike | number | string
  }

  export type CabinsRouteUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    maximumPoints?: IntFieldUpdateOperationsInput | number
    bagsAmount?: IntFieldUpdateOperationsInput | number
    passagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cancellationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type CabinsRouteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    routeId?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    maximumPoints?: IntFieldUpdateOperationsInput | number
    bagsAmount?: IntFieldUpdateOperationsInput | number
    passagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cancellationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type AirportsRouteCreateInput = {
    airport: AirportsCreateNestedOneWithoutRoutesInput
    route: RouteCreateNestedOneWithoutAirportsInput
  }

  export type AirportsRouteUncheckedCreateInput = {
    id?: number
    airportId: number
    routeId: number
  }

  export type AirportsRouteUpdateInput = {
    airport?: AirportsUpdateOneRequiredWithoutRoutesNestedInput
    route?: RouteUpdateOneRequiredWithoutAirportsNestedInput
  }

  export type AirportsRouteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    airportId?: IntFieldUpdateOperationsInput | number
    routeId?: IntFieldUpdateOperationsInput | number
  }

  export type AirportsRouteCreateManyInput = {
    id?: number
    airportId: number
    routeId: number
  }

  export type AirportsRouteUpdateManyMutationInput = {

  }

  export type AirportsRouteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    airportId?: IntFieldUpdateOperationsInput | number
    routeId?: IntFieldUpdateOperationsInput | number
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UsersCountOrderByAggregateInput = {
    id?: SortOrder
    user?: SortOrder
    password?: SortOrder
    name?: SortOrder
    active?: SortOrder
    dateJoined?: SortOrder
    lastLogin?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UsersMaxOrderByAggregateInput = {
    id?: SortOrder
    user?: SortOrder
    password?: SortOrder
    name?: SortOrder
    active?: SortOrder
    dateJoined?: SortOrder
    lastLogin?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsersMinOrderByAggregateInput = {
    id?: SortOrder
    user?: SortOrder
    password?: SortOrder
    name?: SortOrder
    active?: SortOrder
    dateJoined?: SortOrder
    lastLogin?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsersSumOrderByAggregateInput = {
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type LocalsNullableScalarRelationFilter = {
    is?: LocalsWhereInput | null
    isNot?: LocalsWhereInput | null
  }

  export type AirportsRouteListRelationFilter = {
    every?: AirportsRouteWhereInput
    some?: AirportsRouteWhereInput
    none?: AirportsRouteWhereInput
  }

  export type AirportsRouteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AirportsCountOrderByAggregateInput = {
    id?: SortOrder
    city?: SortOrder
    airportCode?: SortOrder
  }

  export type AirportsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AirportsMaxOrderByAggregateInput = {
    id?: SortOrder
    city?: SortOrder
    airportCode?: SortOrder
  }

  export type AirportsMinOrderByAggregateInput = {
    id?: SortOrder
    city?: SortOrder
    airportCode?: SortOrder
  }

  export type AirportsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type AirportsScalarRelationFilter = {
    is?: AirportsWhereInput
    isNot?: AirportsWhereInput
  }

  export type LocalsCountOrderByAggregateInput = {
    id?: SortOrder
    airportId?: SortOrder
    city?: SortOrder
    country?: SortOrder
    passagePrice?: SortOrder
    image?: SortOrder
    active?: SortOrder
  }

  export type LocalsAvgOrderByAggregateInput = {
    id?: SortOrder
    airportId?: SortOrder
    passagePrice?: SortOrder
  }

  export type LocalsMaxOrderByAggregateInput = {
    id?: SortOrder
    airportId?: SortOrder
    city?: SortOrder
    country?: SortOrder
    passagePrice?: SortOrder
    image?: SortOrder
    active?: SortOrder
  }

  export type LocalsMinOrderByAggregateInput = {
    id?: SortOrder
    airportId?: SortOrder
    city?: SortOrder
    country?: SortOrder
    passagePrice?: SortOrder
    image?: SortOrder
    active?: SortOrder
  }

  export type LocalsSumOrderByAggregateInput = {
    id?: SortOrder
    airportId?: SortOrder
    passagePrice?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type CabinsRouteListRelationFilter = {
    every?: CabinsRouteWhereInput
    some?: CabinsRouteWhereInput
    none?: CabinsRouteWhereInput
  }

  export type CabinsRouteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RouteCountOrderByAggregateInput = {
    id?: SortOrder
    mileageProgram?: SortOrder
    enableLayovers?: SortOrder
    active?: SortOrder
  }

  export type RouteAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RouteMaxOrderByAggregateInput = {
    id?: SortOrder
    mileageProgram?: SortOrder
    enableLayovers?: SortOrder
    active?: SortOrder
  }

  export type RouteMinOrderByAggregateInput = {
    id?: SortOrder
    mileageProgram?: SortOrder
    enableLayovers?: SortOrder
    active?: SortOrder
  }

  export type RouteSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RouteScalarRelationFilter = {
    is?: RouteWhereInput
    isNot?: RouteWhereInput
  }

  export type CabinsRouteUniqueCabinPerRouteCompoundUniqueInput = {
    routeId: number
    key: string
  }

  export type CabinsRouteCountOrderByAggregateInput = {
    id?: SortOrder
    routeId?: SortOrder
    key?: SortOrder
    maximumPoints?: SortOrder
    bagsAmount?: SortOrder
    passagePrice?: SortOrder
    cancellationPrice?: SortOrder
  }

  export type CabinsRouteAvgOrderByAggregateInput = {
    id?: SortOrder
    routeId?: SortOrder
    maximumPoints?: SortOrder
    bagsAmount?: SortOrder
    passagePrice?: SortOrder
    cancellationPrice?: SortOrder
  }

  export type CabinsRouteMaxOrderByAggregateInput = {
    id?: SortOrder
    routeId?: SortOrder
    key?: SortOrder
    maximumPoints?: SortOrder
    bagsAmount?: SortOrder
    passagePrice?: SortOrder
    cancellationPrice?: SortOrder
  }

  export type CabinsRouteMinOrderByAggregateInput = {
    id?: SortOrder
    routeId?: SortOrder
    key?: SortOrder
    maximumPoints?: SortOrder
    bagsAmount?: SortOrder
    passagePrice?: SortOrder
    cancellationPrice?: SortOrder
  }

  export type CabinsRouteSumOrderByAggregateInput = {
    id?: SortOrder
    routeId?: SortOrder
    maximumPoints?: SortOrder
    bagsAmount?: SortOrder
    passagePrice?: SortOrder
    cancellationPrice?: SortOrder
  }

  export type AirportsRouteCountOrderByAggregateInput = {
    id?: SortOrder
    airportId?: SortOrder
    routeId?: SortOrder
  }

  export type AirportsRouteAvgOrderByAggregateInput = {
    id?: SortOrder
    airportId?: SortOrder
    routeId?: SortOrder
  }

  export type AirportsRouteMaxOrderByAggregateInput = {
    id?: SortOrder
    airportId?: SortOrder
    routeId?: SortOrder
  }

  export type AirportsRouteMinOrderByAggregateInput = {
    id?: SortOrder
    airportId?: SortOrder
    routeId?: SortOrder
  }

  export type AirportsRouteSumOrderByAggregateInput = {
    id?: SortOrder
    airportId?: SortOrder
    routeId?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LocalsCreateNestedOneWithoutAirportInput = {
    create?: XOR<LocalsCreateWithoutAirportInput, LocalsUncheckedCreateWithoutAirportInput>
    connectOrCreate?: LocalsCreateOrConnectWithoutAirportInput
    connect?: LocalsWhereUniqueInput
  }

  export type AirportsRouteCreateNestedManyWithoutAirportInput = {
    create?: XOR<AirportsRouteCreateWithoutAirportInput, AirportsRouteUncheckedCreateWithoutAirportInput> | AirportsRouteCreateWithoutAirportInput[] | AirportsRouteUncheckedCreateWithoutAirportInput[]
    connectOrCreate?: AirportsRouteCreateOrConnectWithoutAirportInput | AirportsRouteCreateOrConnectWithoutAirportInput[]
    createMany?: AirportsRouteCreateManyAirportInputEnvelope
    connect?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
  }

  export type LocalsUncheckedCreateNestedOneWithoutAirportInput = {
    create?: XOR<LocalsCreateWithoutAirportInput, LocalsUncheckedCreateWithoutAirportInput>
    connectOrCreate?: LocalsCreateOrConnectWithoutAirportInput
    connect?: LocalsWhereUniqueInput
  }

  export type AirportsRouteUncheckedCreateNestedManyWithoutAirportInput = {
    create?: XOR<AirportsRouteCreateWithoutAirportInput, AirportsRouteUncheckedCreateWithoutAirportInput> | AirportsRouteCreateWithoutAirportInput[] | AirportsRouteUncheckedCreateWithoutAirportInput[]
    connectOrCreate?: AirportsRouteCreateOrConnectWithoutAirportInput | AirportsRouteCreateOrConnectWithoutAirportInput[]
    createMany?: AirportsRouteCreateManyAirportInputEnvelope
    connect?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
  }

  export type LocalsUpdateOneWithoutAirportNestedInput = {
    create?: XOR<LocalsCreateWithoutAirportInput, LocalsUncheckedCreateWithoutAirportInput>
    connectOrCreate?: LocalsCreateOrConnectWithoutAirportInput
    upsert?: LocalsUpsertWithoutAirportInput
    disconnect?: LocalsWhereInput | boolean
    delete?: LocalsWhereInput | boolean
    connect?: LocalsWhereUniqueInput
    update?: XOR<XOR<LocalsUpdateToOneWithWhereWithoutAirportInput, LocalsUpdateWithoutAirportInput>, LocalsUncheckedUpdateWithoutAirportInput>
  }

  export type AirportsRouteUpdateManyWithoutAirportNestedInput = {
    create?: XOR<AirportsRouteCreateWithoutAirportInput, AirportsRouteUncheckedCreateWithoutAirportInput> | AirportsRouteCreateWithoutAirportInput[] | AirportsRouteUncheckedCreateWithoutAirportInput[]
    connectOrCreate?: AirportsRouteCreateOrConnectWithoutAirportInput | AirportsRouteCreateOrConnectWithoutAirportInput[]
    upsert?: AirportsRouteUpsertWithWhereUniqueWithoutAirportInput | AirportsRouteUpsertWithWhereUniqueWithoutAirportInput[]
    createMany?: AirportsRouteCreateManyAirportInputEnvelope
    set?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
    disconnect?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
    delete?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
    connect?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
    update?: AirportsRouteUpdateWithWhereUniqueWithoutAirportInput | AirportsRouteUpdateWithWhereUniqueWithoutAirportInput[]
    updateMany?: AirportsRouteUpdateManyWithWhereWithoutAirportInput | AirportsRouteUpdateManyWithWhereWithoutAirportInput[]
    deleteMany?: AirportsRouteScalarWhereInput | AirportsRouteScalarWhereInput[]
  }

  export type LocalsUncheckedUpdateOneWithoutAirportNestedInput = {
    create?: XOR<LocalsCreateWithoutAirportInput, LocalsUncheckedCreateWithoutAirportInput>
    connectOrCreate?: LocalsCreateOrConnectWithoutAirportInput
    upsert?: LocalsUpsertWithoutAirportInput
    disconnect?: LocalsWhereInput | boolean
    delete?: LocalsWhereInput | boolean
    connect?: LocalsWhereUniqueInput
    update?: XOR<XOR<LocalsUpdateToOneWithWhereWithoutAirportInput, LocalsUpdateWithoutAirportInput>, LocalsUncheckedUpdateWithoutAirportInput>
  }

  export type AirportsRouteUncheckedUpdateManyWithoutAirportNestedInput = {
    create?: XOR<AirportsRouteCreateWithoutAirportInput, AirportsRouteUncheckedCreateWithoutAirportInput> | AirportsRouteCreateWithoutAirportInput[] | AirportsRouteUncheckedCreateWithoutAirportInput[]
    connectOrCreate?: AirportsRouteCreateOrConnectWithoutAirportInput | AirportsRouteCreateOrConnectWithoutAirportInput[]
    upsert?: AirportsRouteUpsertWithWhereUniqueWithoutAirportInput | AirportsRouteUpsertWithWhereUniqueWithoutAirportInput[]
    createMany?: AirportsRouteCreateManyAirportInputEnvelope
    set?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
    disconnect?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
    delete?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
    connect?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
    update?: AirportsRouteUpdateWithWhereUniqueWithoutAirportInput | AirportsRouteUpdateWithWhereUniqueWithoutAirportInput[]
    updateMany?: AirportsRouteUpdateManyWithWhereWithoutAirportInput | AirportsRouteUpdateManyWithWhereWithoutAirportInput[]
    deleteMany?: AirportsRouteScalarWhereInput | AirportsRouteScalarWhereInput[]
  }

  export type AirportsCreateNestedOneWithoutLocalInput = {
    create?: XOR<AirportsCreateWithoutLocalInput, AirportsUncheckedCreateWithoutLocalInput>
    connectOrCreate?: AirportsCreateOrConnectWithoutLocalInput
    connect?: AirportsWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type AirportsUpdateOneRequiredWithoutLocalNestedInput = {
    create?: XOR<AirportsCreateWithoutLocalInput, AirportsUncheckedCreateWithoutLocalInput>
    connectOrCreate?: AirportsCreateOrConnectWithoutLocalInput
    upsert?: AirportsUpsertWithoutLocalInput
    connect?: AirportsWhereUniqueInput
    update?: XOR<XOR<AirportsUpdateToOneWithWhereWithoutLocalInput, AirportsUpdateWithoutLocalInput>, AirportsUncheckedUpdateWithoutLocalInput>
  }

  export type AirportsRouteCreateNestedManyWithoutRouteInput = {
    create?: XOR<AirportsRouteCreateWithoutRouteInput, AirportsRouteUncheckedCreateWithoutRouteInput> | AirportsRouteCreateWithoutRouteInput[] | AirportsRouteUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: AirportsRouteCreateOrConnectWithoutRouteInput | AirportsRouteCreateOrConnectWithoutRouteInput[]
    createMany?: AirportsRouteCreateManyRouteInputEnvelope
    connect?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
  }

  export type CabinsRouteCreateNestedManyWithoutRouteInput = {
    create?: XOR<CabinsRouteCreateWithoutRouteInput, CabinsRouteUncheckedCreateWithoutRouteInput> | CabinsRouteCreateWithoutRouteInput[] | CabinsRouteUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: CabinsRouteCreateOrConnectWithoutRouteInput | CabinsRouteCreateOrConnectWithoutRouteInput[]
    createMany?: CabinsRouteCreateManyRouteInputEnvelope
    connect?: CabinsRouteWhereUniqueInput | CabinsRouteWhereUniqueInput[]
  }

  export type AirportsRouteUncheckedCreateNestedManyWithoutRouteInput = {
    create?: XOR<AirportsRouteCreateWithoutRouteInput, AirportsRouteUncheckedCreateWithoutRouteInput> | AirportsRouteCreateWithoutRouteInput[] | AirportsRouteUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: AirportsRouteCreateOrConnectWithoutRouteInput | AirportsRouteCreateOrConnectWithoutRouteInput[]
    createMany?: AirportsRouteCreateManyRouteInputEnvelope
    connect?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
  }

  export type CabinsRouteUncheckedCreateNestedManyWithoutRouteInput = {
    create?: XOR<CabinsRouteCreateWithoutRouteInput, CabinsRouteUncheckedCreateWithoutRouteInput> | CabinsRouteCreateWithoutRouteInput[] | CabinsRouteUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: CabinsRouteCreateOrConnectWithoutRouteInput | CabinsRouteCreateOrConnectWithoutRouteInput[]
    createMany?: CabinsRouteCreateManyRouteInputEnvelope
    connect?: CabinsRouteWhereUniqueInput | CabinsRouteWhereUniqueInput[]
  }

  export type AirportsRouteUpdateManyWithoutRouteNestedInput = {
    create?: XOR<AirportsRouteCreateWithoutRouteInput, AirportsRouteUncheckedCreateWithoutRouteInput> | AirportsRouteCreateWithoutRouteInput[] | AirportsRouteUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: AirportsRouteCreateOrConnectWithoutRouteInput | AirportsRouteCreateOrConnectWithoutRouteInput[]
    upsert?: AirportsRouteUpsertWithWhereUniqueWithoutRouteInput | AirportsRouteUpsertWithWhereUniqueWithoutRouteInput[]
    createMany?: AirportsRouteCreateManyRouteInputEnvelope
    set?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
    disconnect?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
    delete?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
    connect?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
    update?: AirportsRouteUpdateWithWhereUniqueWithoutRouteInput | AirportsRouteUpdateWithWhereUniqueWithoutRouteInput[]
    updateMany?: AirportsRouteUpdateManyWithWhereWithoutRouteInput | AirportsRouteUpdateManyWithWhereWithoutRouteInput[]
    deleteMany?: AirportsRouteScalarWhereInput | AirportsRouteScalarWhereInput[]
  }

  export type CabinsRouteUpdateManyWithoutRouteNestedInput = {
    create?: XOR<CabinsRouteCreateWithoutRouteInput, CabinsRouteUncheckedCreateWithoutRouteInput> | CabinsRouteCreateWithoutRouteInput[] | CabinsRouteUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: CabinsRouteCreateOrConnectWithoutRouteInput | CabinsRouteCreateOrConnectWithoutRouteInput[]
    upsert?: CabinsRouteUpsertWithWhereUniqueWithoutRouteInput | CabinsRouteUpsertWithWhereUniqueWithoutRouteInput[]
    createMany?: CabinsRouteCreateManyRouteInputEnvelope
    set?: CabinsRouteWhereUniqueInput | CabinsRouteWhereUniqueInput[]
    disconnect?: CabinsRouteWhereUniqueInput | CabinsRouteWhereUniqueInput[]
    delete?: CabinsRouteWhereUniqueInput | CabinsRouteWhereUniqueInput[]
    connect?: CabinsRouteWhereUniqueInput | CabinsRouteWhereUniqueInput[]
    update?: CabinsRouteUpdateWithWhereUniqueWithoutRouteInput | CabinsRouteUpdateWithWhereUniqueWithoutRouteInput[]
    updateMany?: CabinsRouteUpdateManyWithWhereWithoutRouteInput | CabinsRouteUpdateManyWithWhereWithoutRouteInput[]
    deleteMany?: CabinsRouteScalarWhereInput | CabinsRouteScalarWhereInput[]
  }

  export type AirportsRouteUncheckedUpdateManyWithoutRouteNestedInput = {
    create?: XOR<AirportsRouteCreateWithoutRouteInput, AirportsRouteUncheckedCreateWithoutRouteInput> | AirportsRouteCreateWithoutRouteInput[] | AirportsRouteUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: AirportsRouteCreateOrConnectWithoutRouteInput | AirportsRouteCreateOrConnectWithoutRouteInput[]
    upsert?: AirportsRouteUpsertWithWhereUniqueWithoutRouteInput | AirportsRouteUpsertWithWhereUniqueWithoutRouteInput[]
    createMany?: AirportsRouteCreateManyRouteInputEnvelope
    set?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
    disconnect?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
    delete?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
    connect?: AirportsRouteWhereUniqueInput | AirportsRouteWhereUniqueInput[]
    update?: AirportsRouteUpdateWithWhereUniqueWithoutRouteInput | AirportsRouteUpdateWithWhereUniqueWithoutRouteInput[]
    updateMany?: AirportsRouteUpdateManyWithWhereWithoutRouteInput | AirportsRouteUpdateManyWithWhereWithoutRouteInput[]
    deleteMany?: AirportsRouteScalarWhereInput | AirportsRouteScalarWhereInput[]
  }

  export type CabinsRouteUncheckedUpdateManyWithoutRouteNestedInput = {
    create?: XOR<CabinsRouteCreateWithoutRouteInput, CabinsRouteUncheckedCreateWithoutRouteInput> | CabinsRouteCreateWithoutRouteInput[] | CabinsRouteUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: CabinsRouteCreateOrConnectWithoutRouteInput | CabinsRouteCreateOrConnectWithoutRouteInput[]
    upsert?: CabinsRouteUpsertWithWhereUniqueWithoutRouteInput | CabinsRouteUpsertWithWhereUniqueWithoutRouteInput[]
    createMany?: CabinsRouteCreateManyRouteInputEnvelope
    set?: CabinsRouteWhereUniqueInput | CabinsRouteWhereUniqueInput[]
    disconnect?: CabinsRouteWhereUniqueInput | CabinsRouteWhereUniqueInput[]
    delete?: CabinsRouteWhereUniqueInput | CabinsRouteWhereUniqueInput[]
    connect?: CabinsRouteWhereUniqueInput | CabinsRouteWhereUniqueInput[]
    update?: CabinsRouteUpdateWithWhereUniqueWithoutRouteInput | CabinsRouteUpdateWithWhereUniqueWithoutRouteInput[]
    updateMany?: CabinsRouteUpdateManyWithWhereWithoutRouteInput | CabinsRouteUpdateManyWithWhereWithoutRouteInput[]
    deleteMany?: CabinsRouteScalarWhereInput | CabinsRouteScalarWhereInput[]
  }

  export type RouteCreateNestedOneWithoutCabinsInput = {
    create?: XOR<RouteCreateWithoutCabinsInput, RouteUncheckedCreateWithoutCabinsInput>
    connectOrCreate?: RouteCreateOrConnectWithoutCabinsInput
    connect?: RouteWhereUniqueInput
  }

  export type RouteUpdateOneRequiredWithoutCabinsNestedInput = {
    create?: XOR<RouteCreateWithoutCabinsInput, RouteUncheckedCreateWithoutCabinsInput>
    connectOrCreate?: RouteCreateOrConnectWithoutCabinsInput
    upsert?: RouteUpsertWithoutCabinsInput
    connect?: RouteWhereUniqueInput
    update?: XOR<XOR<RouteUpdateToOneWithWhereWithoutCabinsInput, RouteUpdateWithoutCabinsInput>, RouteUncheckedUpdateWithoutCabinsInput>
  }

  export type AirportsCreateNestedOneWithoutRoutesInput = {
    create?: XOR<AirportsCreateWithoutRoutesInput, AirportsUncheckedCreateWithoutRoutesInput>
    connectOrCreate?: AirportsCreateOrConnectWithoutRoutesInput
    connect?: AirportsWhereUniqueInput
  }

  export type RouteCreateNestedOneWithoutAirportsInput = {
    create?: XOR<RouteCreateWithoutAirportsInput, RouteUncheckedCreateWithoutAirportsInput>
    connectOrCreate?: RouteCreateOrConnectWithoutAirportsInput
    connect?: RouteWhereUniqueInput
  }

  export type AirportsUpdateOneRequiredWithoutRoutesNestedInput = {
    create?: XOR<AirportsCreateWithoutRoutesInput, AirportsUncheckedCreateWithoutRoutesInput>
    connectOrCreate?: AirportsCreateOrConnectWithoutRoutesInput
    upsert?: AirportsUpsertWithoutRoutesInput
    connect?: AirportsWhereUniqueInput
    update?: XOR<XOR<AirportsUpdateToOneWithWhereWithoutRoutesInput, AirportsUpdateWithoutRoutesInput>, AirportsUncheckedUpdateWithoutRoutesInput>
  }

  export type RouteUpdateOneRequiredWithoutAirportsNestedInput = {
    create?: XOR<RouteCreateWithoutAirportsInput, RouteUncheckedCreateWithoutAirportsInput>
    connectOrCreate?: RouteCreateOrConnectWithoutAirportsInput
    upsert?: RouteUpsertWithoutAirportsInput
    connect?: RouteWhereUniqueInput
    update?: XOR<XOR<RouteUpdateToOneWithWhereWithoutAirportsInput, RouteUpdateWithoutAirportsInput>, RouteUncheckedUpdateWithoutAirportsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type LocalsCreateWithoutAirportInput = {
    city: string
    country: string
    passagePrice: Decimal | DecimalJsLike | number | string
    image: string
    active?: boolean
  }

  export type LocalsUncheckedCreateWithoutAirportInput = {
    id?: number
    city: string
    country: string
    passagePrice: Decimal | DecimalJsLike | number | string
    image: string
    active?: boolean
  }

  export type LocalsCreateOrConnectWithoutAirportInput = {
    where: LocalsWhereUniqueInput
    create: XOR<LocalsCreateWithoutAirportInput, LocalsUncheckedCreateWithoutAirportInput>
  }

  export type AirportsRouteCreateWithoutAirportInput = {
    route: RouteCreateNestedOneWithoutAirportsInput
  }

  export type AirportsRouteUncheckedCreateWithoutAirportInput = {
    id?: number
    routeId: number
  }

  export type AirportsRouteCreateOrConnectWithoutAirportInput = {
    where: AirportsRouteWhereUniqueInput
    create: XOR<AirportsRouteCreateWithoutAirportInput, AirportsRouteUncheckedCreateWithoutAirportInput>
  }

  export type AirportsRouteCreateManyAirportInputEnvelope = {
    data: AirportsRouteCreateManyAirportInput | AirportsRouteCreateManyAirportInput[]
    skipDuplicates?: boolean
  }

  export type LocalsUpsertWithoutAirportInput = {
    update: XOR<LocalsUpdateWithoutAirportInput, LocalsUncheckedUpdateWithoutAirportInput>
    create: XOR<LocalsCreateWithoutAirportInput, LocalsUncheckedCreateWithoutAirportInput>
    where?: LocalsWhereInput
  }

  export type LocalsUpdateToOneWithWhereWithoutAirportInput = {
    where?: LocalsWhereInput
    data: XOR<LocalsUpdateWithoutAirportInput, LocalsUncheckedUpdateWithoutAirportInput>
  }

  export type LocalsUpdateWithoutAirportInput = {
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    passagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LocalsUncheckedUpdateWithoutAirportInput = {
    id?: IntFieldUpdateOperationsInput | number
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    passagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AirportsRouteUpsertWithWhereUniqueWithoutAirportInput = {
    where: AirportsRouteWhereUniqueInput
    update: XOR<AirportsRouteUpdateWithoutAirportInput, AirportsRouteUncheckedUpdateWithoutAirportInput>
    create: XOR<AirportsRouteCreateWithoutAirportInput, AirportsRouteUncheckedCreateWithoutAirportInput>
  }

  export type AirportsRouteUpdateWithWhereUniqueWithoutAirportInput = {
    where: AirportsRouteWhereUniqueInput
    data: XOR<AirportsRouteUpdateWithoutAirportInput, AirportsRouteUncheckedUpdateWithoutAirportInput>
  }

  export type AirportsRouteUpdateManyWithWhereWithoutAirportInput = {
    where: AirportsRouteScalarWhereInput
    data: XOR<AirportsRouteUpdateManyMutationInput, AirportsRouteUncheckedUpdateManyWithoutAirportInput>
  }

  export type AirportsRouteScalarWhereInput = {
    AND?: AirportsRouteScalarWhereInput | AirportsRouteScalarWhereInput[]
    OR?: AirportsRouteScalarWhereInput[]
    NOT?: AirportsRouteScalarWhereInput | AirportsRouteScalarWhereInput[]
    id?: IntFilter<"AirportsRoute"> | number
    airportId?: IntFilter<"AirportsRoute"> | number
    routeId?: IntFilter<"AirportsRoute"> | number
  }

  export type AirportsCreateWithoutLocalInput = {
    city: string
    airportCode: string
    routes?: AirportsRouteCreateNestedManyWithoutAirportInput
  }

  export type AirportsUncheckedCreateWithoutLocalInput = {
    id?: number
    city: string
    airportCode: string
    routes?: AirportsRouteUncheckedCreateNestedManyWithoutAirportInput
  }

  export type AirportsCreateOrConnectWithoutLocalInput = {
    where: AirportsWhereUniqueInput
    create: XOR<AirportsCreateWithoutLocalInput, AirportsUncheckedCreateWithoutLocalInput>
  }

  export type AirportsUpsertWithoutLocalInput = {
    update: XOR<AirportsUpdateWithoutLocalInput, AirportsUncheckedUpdateWithoutLocalInput>
    create: XOR<AirportsCreateWithoutLocalInput, AirportsUncheckedCreateWithoutLocalInput>
    where?: AirportsWhereInput
  }

  export type AirportsUpdateToOneWithWhereWithoutLocalInput = {
    where?: AirportsWhereInput
    data: XOR<AirportsUpdateWithoutLocalInput, AirportsUncheckedUpdateWithoutLocalInput>
  }

  export type AirportsUpdateWithoutLocalInput = {
    city?: StringFieldUpdateOperationsInput | string
    airportCode?: StringFieldUpdateOperationsInput | string
    routes?: AirportsRouteUpdateManyWithoutAirportNestedInput
  }

  export type AirportsUncheckedUpdateWithoutLocalInput = {
    id?: IntFieldUpdateOperationsInput | number
    city?: StringFieldUpdateOperationsInput | string
    airportCode?: StringFieldUpdateOperationsInput | string
    routes?: AirportsRouteUncheckedUpdateManyWithoutAirportNestedInput
  }

  export type AirportsRouteCreateWithoutRouteInput = {
    airport: AirportsCreateNestedOneWithoutRoutesInput
  }

  export type AirportsRouteUncheckedCreateWithoutRouteInput = {
    id?: number
    airportId: number
  }

  export type AirportsRouteCreateOrConnectWithoutRouteInput = {
    where: AirportsRouteWhereUniqueInput
    create: XOR<AirportsRouteCreateWithoutRouteInput, AirportsRouteUncheckedCreateWithoutRouteInput>
  }

  export type AirportsRouteCreateManyRouteInputEnvelope = {
    data: AirportsRouteCreateManyRouteInput | AirportsRouteCreateManyRouteInput[]
    skipDuplicates?: boolean
  }

  export type CabinsRouteCreateWithoutRouteInput = {
    key: string
    maximumPoints: number
    bagsAmount: number
    passagePrice: Decimal | DecimalJsLike | number | string
    cancellationPrice: Decimal | DecimalJsLike | number | string
  }

  export type CabinsRouteUncheckedCreateWithoutRouteInput = {
    id?: number
    key: string
    maximumPoints: number
    bagsAmount: number
    passagePrice: Decimal | DecimalJsLike | number | string
    cancellationPrice: Decimal | DecimalJsLike | number | string
  }

  export type CabinsRouteCreateOrConnectWithoutRouteInput = {
    where: CabinsRouteWhereUniqueInput
    create: XOR<CabinsRouteCreateWithoutRouteInput, CabinsRouteUncheckedCreateWithoutRouteInput>
  }

  export type CabinsRouteCreateManyRouteInputEnvelope = {
    data: CabinsRouteCreateManyRouteInput | CabinsRouteCreateManyRouteInput[]
    skipDuplicates?: boolean
  }

  export type AirportsRouteUpsertWithWhereUniqueWithoutRouteInput = {
    where: AirportsRouteWhereUniqueInput
    update: XOR<AirportsRouteUpdateWithoutRouteInput, AirportsRouteUncheckedUpdateWithoutRouteInput>
    create: XOR<AirportsRouteCreateWithoutRouteInput, AirportsRouteUncheckedCreateWithoutRouteInput>
  }

  export type AirportsRouteUpdateWithWhereUniqueWithoutRouteInput = {
    where: AirportsRouteWhereUniqueInput
    data: XOR<AirportsRouteUpdateWithoutRouteInput, AirportsRouteUncheckedUpdateWithoutRouteInput>
  }

  export type AirportsRouteUpdateManyWithWhereWithoutRouteInput = {
    where: AirportsRouteScalarWhereInput
    data: XOR<AirportsRouteUpdateManyMutationInput, AirportsRouteUncheckedUpdateManyWithoutRouteInput>
  }

  export type CabinsRouteUpsertWithWhereUniqueWithoutRouteInput = {
    where: CabinsRouteWhereUniqueInput
    update: XOR<CabinsRouteUpdateWithoutRouteInput, CabinsRouteUncheckedUpdateWithoutRouteInput>
    create: XOR<CabinsRouteCreateWithoutRouteInput, CabinsRouteUncheckedCreateWithoutRouteInput>
  }

  export type CabinsRouteUpdateWithWhereUniqueWithoutRouteInput = {
    where: CabinsRouteWhereUniqueInput
    data: XOR<CabinsRouteUpdateWithoutRouteInput, CabinsRouteUncheckedUpdateWithoutRouteInput>
  }

  export type CabinsRouteUpdateManyWithWhereWithoutRouteInput = {
    where: CabinsRouteScalarWhereInput
    data: XOR<CabinsRouteUpdateManyMutationInput, CabinsRouteUncheckedUpdateManyWithoutRouteInput>
  }

  export type CabinsRouteScalarWhereInput = {
    AND?: CabinsRouteScalarWhereInput | CabinsRouteScalarWhereInput[]
    OR?: CabinsRouteScalarWhereInput[]
    NOT?: CabinsRouteScalarWhereInput | CabinsRouteScalarWhereInput[]
    id?: IntFilter<"CabinsRoute"> | number
    routeId?: IntFilter<"CabinsRoute"> | number
    key?: StringFilter<"CabinsRoute"> | string
    maximumPoints?: IntFilter<"CabinsRoute"> | number
    bagsAmount?: IntFilter<"CabinsRoute"> | number
    passagePrice?: DecimalFilter<"CabinsRoute"> | Decimal | DecimalJsLike | number | string
    cancellationPrice?: DecimalFilter<"CabinsRoute"> | Decimal | DecimalJsLike | number | string
  }

  export type RouteCreateWithoutCabinsInput = {
    mileageProgram: string
    enableLayovers: boolean
    active?: boolean
    airports?: AirportsRouteCreateNestedManyWithoutRouteInput
  }

  export type RouteUncheckedCreateWithoutCabinsInput = {
    id?: number
    mileageProgram: string
    enableLayovers: boolean
    active?: boolean
    airports?: AirportsRouteUncheckedCreateNestedManyWithoutRouteInput
  }

  export type RouteCreateOrConnectWithoutCabinsInput = {
    where: RouteWhereUniqueInput
    create: XOR<RouteCreateWithoutCabinsInput, RouteUncheckedCreateWithoutCabinsInput>
  }

  export type RouteUpsertWithoutCabinsInput = {
    update: XOR<RouteUpdateWithoutCabinsInput, RouteUncheckedUpdateWithoutCabinsInput>
    create: XOR<RouteCreateWithoutCabinsInput, RouteUncheckedCreateWithoutCabinsInput>
    where?: RouteWhereInput
  }

  export type RouteUpdateToOneWithWhereWithoutCabinsInput = {
    where?: RouteWhereInput
    data: XOR<RouteUpdateWithoutCabinsInput, RouteUncheckedUpdateWithoutCabinsInput>
  }

  export type RouteUpdateWithoutCabinsInput = {
    mileageProgram?: StringFieldUpdateOperationsInput | string
    enableLayovers?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
    airports?: AirportsRouteUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateWithoutCabinsInput = {
    id?: IntFieldUpdateOperationsInput | number
    mileageProgram?: StringFieldUpdateOperationsInput | string
    enableLayovers?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
    airports?: AirportsRouteUncheckedUpdateManyWithoutRouteNestedInput
  }

  export type AirportsCreateWithoutRoutesInput = {
    city: string
    airportCode: string
    local?: LocalsCreateNestedOneWithoutAirportInput
  }

  export type AirportsUncheckedCreateWithoutRoutesInput = {
    id?: number
    city: string
    airportCode: string
    local?: LocalsUncheckedCreateNestedOneWithoutAirportInput
  }

  export type AirportsCreateOrConnectWithoutRoutesInput = {
    where: AirportsWhereUniqueInput
    create: XOR<AirportsCreateWithoutRoutesInput, AirportsUncheckedCreateWithoutRoutesInput>
  }

  export type RouteCreateWithoutAirportsInput = {
    mileageProgram: string
    enableLayovers: boolean
    active?: boolean
    cabins?: CabinsRouteCreateNestedManyWithoutRouteInput
  }

  export type RouteUncheckedCreateWithoutAirportsInput = {
    id?: number
    mileageProgram: string
    enableLayovers: boolean
    active?: boolean
    cabins?: CabinsRouteUncheckedCreateNestedManyWithoutRouteInput
  }

  export type RouteCreateOrConnectWithoutAirportsInput = {
    where: RouteWhereUniqueInput
    create: XOR<RouteCreateWithoutAirportsInput, RouteUncheckedCreateWithoutAirportsInput>
  }

  export type AirportsUpsertWithoutRoutesInput = {
    update: XOR<AirportsUpdateWithoutRoutesInput, AirportsUncheckedUpdateWithoutRoutesInput>
    create: XOR<AirportsCreateWithoutRoutesInput, AirportsUncheckedCreateWithoutRoutesInput>
    where?: AirportsWhereInput
  }

  export type AirportsUpdateToOneWithWhereWithoutRoutesInput = {
    where?: AirportsWhereInput
    data: XOR<AirportsUpdateWithoutRoutesInput, AirportsUncheckedUpdateWithoutRoutesInput>
  }

  export type AirportsUpdateWithoutRoutesInput = {
    city?: StringFieldUpdateOperationsInput | string
    airportCode?: StringFieldUpdateOperationsInput | string
    local?: LocalsUpdateOneWithoutAirportNestedInput
  }

  export type AirportsUncheckedUpdateWithoutRoutesInput = {
    id?: IntFieldUpdateOperationsInput | number
    city?: StringFieldUpdateOperationsInput | string
    airportCode?: StringFieldUpdateOperationsInput | string
    local?: LocalsUncheckedUpdateOneWithoutAirportNestedInput
  }

  export type RouteUpsertWithoutAirportsInput = {
    update: XOR<RouteUpdateWithoutAirportsInput, RouteUncheckedUpdateWithoutAirportsInput>
    create: XOR<RouteCreateWithoutAirportsInput, RouteUncheckedCreateWithoutAirportsInput>
    where?: RouteWhereInput
  }

  export type RouteUpdateToOneWithWhereWithoutAirportsInput = {
    where?: RouteWhereInput
    data: XOR<RouteUpdateWithoutAirportsInput, RouteUncheckedUpdateWithoutAirportsInput>
  }

  export type RouteUpdateWithoutAirportsInput = {
    mileageProgram?: StringFieldUpdateOperationsInput | string
    enableLayovers?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
    cabins?: CabinsRouteUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateWithoutAirportsInput = {
    id?: IntFieldUpdateOperationsInput | number
    mileageProgram?: StringFieldUpdateOperationsInput | string
    enableLayovers?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
    cabins?: CabinsRouteUncheckedUpdateManyWithoutRouteNestedInput
  }

  export type AirportsRouteCreateManyAirportInput = {
    id?: number
    routeId: number
  }

  export type AirportsRouteUpdateWithoutAirportInput = {
    route?: RouteUpdateOneRequiredWithoutAirportsNestedInput
  }

  export type AirportsRouteUncheckedUpdateWithoutAirportInput = {
    id?: IntFieldUpdateOperationsInput | number
    routeId?: IntFieldUpdateOperationsInput | number
  }

  export type AirportsRouteUncheckedUpdateManyWithoutAirportInput = {
    id?: IntFieldUpdateOperationsInput | number
    routeId?: IntFieldUpdateOperationsInput | number
  }

  export type AirportsRouteCreateManyRouteInput = {
    id?: number
    airportId: number
  }

  export type CabinsRouteCreateManyRouteInput = {
    id?: number
    key: string
    maximumPoints: number
    bagsAmount: number
    passagePrice: Decimal | DecimalJsLike | number | string
    cancellationPrice: Decimal | DecimalJsLike | number | string
  }

  export type AirportsRouteUpdateWithoutRouteInput = {
    airport?: AirportsUpdateOneRequiredWithoutRoutesNestedInput
  }

  export type AirportsRouteUncheckedUpdateWithoutRouteInput = {
    id?: IntFieldUpdateOperationsInput | number
    airportId?: IntFieldUpdateOperationsInput | number
  }

  export type AirportsRouteUncheckedUpdateManyWithoutRouteInput = {
    id?: IntFieldUpdateOperationsInput | number
    airportId?: IntFieldUpdateOperationsInput | number
  }

  export type CabinsRouteUpdateWithoutRouteInput = {
    key?: StringFieldUpdateOperationsInput | string
    maximumPoints?: IntFieldUpdateOperationsInput | number
    bagsAmount?: IntFieldUpdateOperationsInput | number
    passagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cancellationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type CabinsRouteUncheckedUpdateWithoutRouteInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    maximumPoints?: IntFieldUpdateOperationsInput | number
    bagsAmount?: IntFieldUpdateOperationsInput | number
    passagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cancellationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type CabinsRouteUncheckedUpdateManyWithoutRouteInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    maximumPoints?: IntFieldUpdateOperationsInput | number
    bagsAmount?: IntFieldUpdateOperationsInput | number
    passagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    cancellationPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
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