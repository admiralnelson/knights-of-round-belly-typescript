namespace AdmiralNelsonKnightsOfTheRoundBelly {
    export class Logger {

        private _name: string = ""
    
        constructor(name: string) { this._name = name }
    
        public Log(s: string): void { out(`${this._name}: ${s}`) }
    
        public LogWarn(s: string): void
        {
            if(PrintWarning != null) PrintWarning(`${this._name}: ${s}\n`); else out(`${this._name} WARNING ${s}`)
        }
    
        public LogError(s: string): void
        {
            const traceback = debug.traceback("", 2)
            PrintError != null ? PrintError(`${this._name}: ${s} \n`) : out(`${this._name} ERROR ${s}`)
            this.LogWarn("================\n")
            this.LogWarn(`${traceback} \n`)
            this.LogWarn("================\n")
        }    
    }
}