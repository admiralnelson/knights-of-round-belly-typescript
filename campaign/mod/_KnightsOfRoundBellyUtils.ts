namespace AdmiralNelsonKnightsOfTheRoundBelly {
    export type TimerCallback = () => void
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
        public static removeItem(key: string): void {
            cm.set_saved_value(key, null)
        }
    }
    export function clamp(v: number, min: number, max:number) : number {
        if(v >= max) return max
        if(v <= min) return min
        return v
    }

    
    class TimedCallback {
        private id = 0
        private interval = 0
        private identifier = ""
        private callback : TimerCallback

        constructor(id: number, identifier: string, interval: number, callback: TimerCallback) { 
            this.id = id
            this.identifier = identifier
            this.interval = interval
            this.callback = callback
        }

        
        public get Interval() : number {
            return this.interval
        }

        
        public get Identifier() : string {
            return this.identifier
        }
        
        
        public get Id() : number {
            return this.id
        }

        public Execute() : void {
            this.callback()
        }
        
    }
        
    class TimerManager {
        private readonly instanceNr = Math.floor(Math.random() * Math.random() * 9999999)
        private readonly identifier = `TimerManager Typescript instance nr ${this.instanceNr}`
        private static instance : TimerManager
        private callbacks: LuaMap<string, TimedCallback> = new LuaMap
        private readonly l = new Logger(`TimerManager instance nr: ${this.instanceNr}`)

        private constructor(){
            core.add_listener(
                this.identifier,
                "RealTimeTrigger",
                (context) => this.callbacks.has(context.string ?? ""),
                (context) => {
                    try {
                        const contextStr = context.string ? context.string : ""

                        const callbackObject = this.callbacks.get(contextStr)
                        if(callbackObject == null) return

                        callbackObject.Execute()
                        if(contextStr.indexOf("_ONCE") >= 0) this.Kill(callbackObject.Id)
                    } catch (error) {
                        this.l.LogError(error as string)
                    }
                }, 
                true
            )
            this.l.Log(`TimerManager with instance name "${this.identifier}" has started`)
            this.l.Log(`called from \n ${debug.traceback("", 1)}`)
        }

        public Kill(id: number): boolean {
            const target = `${this.identifier}_${id}`
            if(this.callbacks.has(target))
            {
                this.callbacks.delete(target)
                real_timer.unregister(target)
                return true
            }

            const targetOnce = `${target}_ONCE`
            if(this.callbacks.has(targetOnce))
            {
                this.callbacks.delete(targetOnce)
                real_timer.unregister(targetOnce)
                return true
            }

            return false
        }

        public RegisterSingleShot(callback: TimerCallback, intervalInMs: number): number {
            const id = Math.floor(Math.random() * Math.random() * 9999999)
            const identifier = `${this.identifier}_${id}_ONCE`
            this.callbacks.set(identifier, new TimedCallback(id, identifier, intervalInMs, callback))
            real_timer.register_singleshot(identifier, intervalInMs)
            return id
        }

        public RegisterRepeating(callback: TimerCallback, intervalInMs: number): number {
            const id = Math.floor(Math.random() * Math.random() * 9999999)
            const identifier = `${this.identifier}_${id}`
            this.callbacks.set(identifier, new TimedCallback(id, identifier, intervalInMs, callback))
            real_timer.register_repeating(identifier, intervalInMs)
            return id
        }

        public static get Instance(): TimerManager
        {
            return this.instance || (this.instance = new this())
        }
    }

    export function setTimeout(callback: TimerCallback, inMilliSecond: number): number {
        return TimerManager.Instance.RegisterSingleShot(callback, inMilliSecond)
    }
    export function setInterval(callback: TimerCallback, inMilliSecond: number): number {
        return TimerManager.Instance.RegisterRepeating(callback, inMilliSecond)
    }
    export function clearInterval(id: number): boolean {
        return TimerManager.Instance.Kill(id)
    }
}