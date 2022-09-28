namespace AdmiralNelsonKnightsOfTheRoundBelly {

    export const VERSION = 1
    export const ADMKNIGHTSOFTHEROUNDBELLY = "ADMKNIGHTSOFTHEROUNDBELLY:v"+VERSION

    class KnightsOfTheRoundBelly {

        private readonly l = new Logger("AdmiralNelsonKnightsOfTheRoundBelly")

        Init(): void {
            this.FirstTimeSetup()
        }

        FirstTimeSetup(): void {
            this.l.Log("FirstTimeSetup ok")
        }

        constructor() {
            cm.add_first_tick_callback( () => { this.Init() })
        }
    }
    
    new KnightsOfTheRoundBelly()
}