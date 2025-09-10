type AddNull<T> = T | null;


type AddNullTest1 = AddNull<2>;
type AddNullTest2 = AddNull<{a: string} | object[]>;

type AddNullMap<T> = {
    [Key in keyof T]: T[Key] | null;
};

type AddNullMapTest1 = AddNullMap<{a: number, b: string, c: number[] | string[]}>;

type AddOptionalMap<T> = {
    [Key in keyof T]?: T[Key];
}

type AddOptionalMapTest1 = AddOptionalMap<{a: number; b: string; c: number[] | string[]}>;

type MakeRequired<T> = {
    [Key in keyof T]-?: T[Key];
}

type MakeRequiredTest1 = MakeRequired<AddOptionalMapTest1>;

type MakeReadonly<T> = {
    readonly [Key in keyof T]: T[Key];
}

type MakeReadonlyTest1 = MakeReadonly<AddOptionalMapTest1>;
type MakeReadonlyTest2 = MakeReadonly<MakeRequired<AddOptionalMapTest1>>;


type GetEntiers<T> = {
    [Key in keyof T]: [Key, T[Key]];
}[keyof T]

type GetEntiersTest = GetEntiers<{a: 1; b: 2, c: 'str'}>;


type GetUnion<T> = [T] extends [string] ? { value: T } : never;

type UnionTest1 = "abc" | "some string";

type GetUnionTest1 = GetUnion<UnionTest1>;



// Infer

type GetArrayValueType<T extends any> = T extends (infer Item)[] ? Item : never;

type GetArrayValueTypeTest1 = GetArrayValueType<[1, 2, 3]>;
type GetArrayValueTypeTest2 = GetArrayValueType<number[]>;
type GetArrayValueTypeTest3 = GetArrayValueType<string[][]>;
type GetArrayValueTypeTest4 = GetArrayValueType<Array<number | 2 | string | true | boolean>>;



type FirstIfStringOld<T extends any> = T extends [infer S, ...unknown[]]
    ? S extends string
        ? S
        : never
    : never;
type FirstIfStringNew<T extends any> = T extends [infer S extends string, ...unknown[]] ? S : never;

type FirstIfStringOldTest1 = FirstIfStringOld<[string, "str", 1, 2, 3]>;
type FirstIfStringOldTest2 = FirstIfStringOld<[1, "str", 2, 3]>;
type FirstIfStringNewTest1 = FirstIfStringNew<[string, "str", 1, 2, 3]>;
type FirstIfStringNewTest2 = FirstIfStringNew<[1, "str", 2, 3]>;


type GetReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer Return ? Return : never;

const getReturnTypeFunc1 = (): string[] => [''];
type GetReturnTypeTest1 = GetReturnType<typeof getReturnTypeFunc1>;


type GetParametersType<T extends (...args: any) => any> = T extends (args: infer Args) => any ? Args : never;

const getParametersTypeFunc1 = (args: {name: string; age: number}): string[] => [''];
type GetParametersTypeTest1 = GetParametersType<typeof getParametersTypeFunc1>;


type GetHead<T extends readonly any[]> = T extends readonly [infer First, ...unknown[]] ? First : T[number];

function head<T extends readonly any[]>(arr: T): GetHead<T> {
    return arr[0];
}

const arr1 = [1, 2, 3, 4, 5];
type GetHeadTest1 = GetHead<typeof arr1>;
const arr2 = [10, 2, 3, 4, 5] as const;
type GetHeadTest2 = GetHead<typeof arr2>

const headtest = head(arr2);




type MakeDeepReadonly<T> = {
    readonly [Key in keyof T]: T[Key] extends (any[] | Record<string, unknown>) ? MakeDeepReadonly<T[Key]> : T[Key];
}

type DeepReadonlyTypeTest1 = {
    a: {
        b: {
            c: number,
        },
        d: {
            f: [string, number],
        }
    }
}

type DeepReadonlyTest1 = MakeDeepReadonly<DeepReadonlyTypeTest1>;

type IsTuple<T> = T extends [any, any] ? true : false;

type IsTupleTest1 = IsTuple<[1]>;
type IsTupleTest2 = IsTuple<[1, 2]>;
type IsTupleTest3 = IsTuple<[1, 2, 3]>;



type ReplceString<
    S extends string,
    From extends string,
    To extends string
> = S extends `${infer Start}${From}${infer End}` ? `${Start}${To}${End}`;

type ReplceStringTest1 = ReplceString<'foobar', 'bar', 'foo'>;

type ReplceStringTest2 = ReplceString<'lolkek4eburek', 'kek', 'puk'>;



class Animal {
    private name: string;
    private type: string;

    constructor() {
        this.name = '';
        this.type = '';
    }

    
    public get getName() : string {
        return this.name
    }
    
    
    public get getType() : string {
        return this.type
    }
    
}
