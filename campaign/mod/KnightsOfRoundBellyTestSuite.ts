namespace AdmiralNelsonKnightsOfTheRoundBelly {

    const logger = new Logger(`KnightsOfTheRoundBelly::TestSuite`)
    const print = (s: string, showName: boolean = false) => logger.Log(s, showName)
    const pError = (s: string) => logger.LogError(s, false)
    const pWarn = (s: string) => logger.LogWarn(s)
    

    function SpawnDukeLouisTest(objectToTest: KnightsOfTheRoundBelly): boolean {
        if(objectToTest.DesignatedFaction == null) {
            pError(`SpawnDukeLouisTest - this.designatedFaction is null`)
            return false
        }
        new Lord({ 
            factionKey: objectToTest.DesignatedFaction.FactionKey,
            agentKey: DUKE_LOUIS_AGENT_KEY,
            regionKey: "wh3_main_combi_region_couronne",
            lordCreatedCallback: (lord) => {
                if(objectToTest.DesignatedFaction == null) return
                objectToTest.DesignatedFaction.TriggerMission(LOUIS_MISSION_KEY, true)
                lord.AddTrait(PEASANT_REDUCTION_TRAIT_NOT_COMMITTED_YET_KEY)
                lord.RenameLocalised(DUKE_LOUIS_FORENAME, DUKE_LOUIS_TITLE)
                setTimeout(() => objectToTest.CalculatePeasantSlotsUsageAndApplyPenalties(), 500)
                const testArmy = []
                for(let i = 1; i <= 10; i++) {
                    testArmy.push("wh_dlc07_brt_cav_royal_hippogryph_knights_0")
                }
                lord.AddTroops(testArmy)
            }
        })

        pWarn("SpawnDukeLouisTest ok")
        return true
    }

    function SpawnHectorTest(objectToTest: KnightsOfTheRoundBelly): boolean {
        if(objectToTest.DesignatedFaction == null) {
            pError(`SpawnHectorTest - this.designatedFaction is null`)
            return false
        }
        const factionKey = objectToTest.DesignatedFaction.FactionKey
        new Champion({
            agentKey: HECTOR_AGENT_KEY,
            factionKey: factionKey,
            regionKey: "wh3_main_combi_region_couronne",
            agentType: "champion",
            championCreatedCallback: (champion, reason) => {
                champion.RenameLocalised(HECTOR_FORENAME, HECTOR_HOUSE_OF)
                champion.AddTrait(PEASANT_REDUCTION_TRAIT_NOT_COMMITTED_YET_KEY)
                setTimeout(() => objectToTest.CalculatePeasantSlotsUsageAndApplyPenalties(), 500);
            }
        })
        pWarn(`SpawnHectorTest ok`)
        return true
    }

    function SpawnClaudin(objectToTest: KnightsOfTheRoundBelly): boolean {
        if(objectToTest.DesignatedFaction == null) {
            pError(`SpawnHectorTest - this.designatedFaction is null`)
            return false
        }
        const factionKey = objectToTest.DesignatedFaction.FactionKey
        new Champion({
            agentKey: CLAUDIN_AGENT_KEY,
            factionKey: factionKey,
            regionKey: "wh3_main_combi_region_couronne",
            agentType: "champion",
            championCreatedCallback: (champion, reason) => {
                champion.RenameLocalised(CLAUDIN_FORENAME, CLAUDIN_HOUSE_OF)
                champion.AddTrait(PEASANT_REDUCTION_TRAIT_NOT_COMMITTED_YET_KEY)
                setTimeout(() => objectToTest.CalculatePeasantSlotsUsageAndApplyPenalties(), 500);
            }
        })

        pWarn(`SpawnClaudin Ok`)
        return true
    }

    function SpawnEnemyTest(objectToTest: KnightsOfTheRoundBelly): boolean {
        for (let i = 0; i < 5; i++) {
            new Lord({ 
                factionKey: "wh_main_emp_marienburg",
                regionKey:  "wh3_main_combi_region_couronne",
                agentKey: "wh_main_emp_lord",
                lordCreatedCallback: (lord) => {
                    pWarn(`dummy lord has spawned ${lord.LocalisedFullName}`)
                }
            })                
        }
        pWarn(`SpawnEnemyTest ok`)
        return true
    }
    
    function KillAllOgres(objectToTest: KnightsOfTheRoundBelly): boolean {
        if(objectToTest.DesignatedFaction == null) {
            pError(`KillAllOgres: cant execute this.designatedFaction is null`)
            return false
        }
        const faction = objectToTest.DesignatedFaction
        const lords = faction.Lords

        for (const lord of lords) {
            lord.Destroy()
        }
        pWarn(`KillAllOgres ok`)
        return true
    }

    function PrintAllChampions(objectToTest: KnightsOfTheRoundBelly): boolean {
        const x = GetFactionByKey("wh_main_brt_bretonnia")?.Champions || []
        for (const y of x) {
            print(y.toString())
        }
        pWarn(`PrintAllChampions ok`)
        return true
    }

    function PrintAllTraits(objectToTest: KnightsOfTheRoundBelly): boolean {
        setTimeout(() => { 
            if(objectToTest.DesignatedFaction == null) return

            const lords = objectToTest.DesignatedFaction.Characters
            for (const lord of lords) {
                pWarn(`${lord.LocalisedFullName} traits ---- `)
                const traits = lord.Traits
                for (const trait of traits) {
                    print(`${trait.traitKey} level ${trait.traitLevel} points ${trait.traitPoints}`)
                }
            }
            const champions = objectToTest.DesignatedFaction.Champions
            for (const champion of champions) {
                pWarn(`${champion.LocalisedFullName} traits ---- `)
                const traits = champion.Traits
                for (const trait of traits) {
                    print(`${trait.traitKey} level ${trait.traitLevel} points ${trait.traitPoints}`)
                }
            }
        }, 200);
        pWarn(`PrintAllTraits ok`)
        return true
    }

    export function StartTestSuite(objectToTest: KnightsOfTheRoundBelly): boolean {
        pError(`======================Running test suites========================`)
        const ret = 
            SpawnDukeLouisTest(objectToTest) && 
            SpawnHectorTest(objectToTest) &&
            SpawnEnemyTest(objectToTest) &&
            SpawnClaudin(objectToTest) &&
            PrintAllTraits(objectToTest) 

        print(`result: `)
        ret ? pWarn(`SUCCESS`) : pError(`FAILED`)
        return ret
    }

}