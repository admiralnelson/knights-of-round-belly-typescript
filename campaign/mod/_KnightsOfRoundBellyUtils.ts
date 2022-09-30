namespace AdmiralNelsonKnightsOfTheRoundBelly {
    export class localStorage {
        public static setItem(key: string, value: any) : void {
            cm.set_saved_value(key, value)
        }
        /**
         * @warning  use 'as' to cast it to luatable, string, number, null, etc. (yes, null is a type in TS)
         */
        public static getItem(key: string): unknown  {
            return cm.get_saved_value(key)
        }
        public static removeItem(key: string): any {
            return cm.set_saved_value(key, null)
        }
    }
    export function clamp(v: number, min: number, max:number) : number {
        if(v >= max) return max
        if(v <= min) return min
        return v
    }
}