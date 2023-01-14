namespace AdmiralNelsonKnightsOfTheRoundBelly {
    
    const logger = new Logger("OgreSpawner")
    const print = (x: string) => logger.Log(x)
    const wPrint = (x: string) => logger.LogWarn(x)
    
    export type DilemmaKeyToRegion = {
        dilemmaKey: string
        regionKeys: string[]
    }

    export type OgreSpawnData = {
        regionKeys: string[]
        defaultDilemmaKey: string
        canSpawnFromRegion: boolean
        diceRollTreshold: number
        specificDillemaKeys?: DilemmaKeyToRegion[]
        foreName?: string
        familyName?: string
    }

    export type AllowedFaction = {
        factionKey: string,
        priority: number
    }

    type OgreSaveData = {
        spawnedOgreKeys: string[],
        allowedFactions: AllowedFaction[],
        currentFactionKey: string,
        version: string
    }

    const DEBUG_ALWAYS_SPAWN = true
    const DEBUG_DUMP_TO_UNSPAWNABLE = true
    const VERSION = "1"
    const OGRE_SPAWNER_DATA = "ADMIRALNELSON_OGRE_SPAWNER_DATA"
    const DICES = (DEBUG_ALWAYS_SPAWN) ? 1 : 6
    const DICE_SIDES = (DEBUG_ALWAYS_SPAWN) ? 1000 : 6

    export class OgreSpawner {

        /** must be initalised before Init() */
        public static OgreMercenariesUnitKeys: string[] = []
        public static DiceRollTresholdForRandomSpawnOnArmy = {
            Human: 28,
            Bot: 20
        }
        public static OgreRecruitmentDilemmaOnArmy = ""

        private static Data : OgreSaveData | null = null
        /** end */

        private static OgreLordKey2Regions: LuaMap<string, OgreSpawnData> = new LuaMap<string, OgreSpawnData>()
        private static OgreChampionKey2Regions : LuaMap<string, OgreSpawnData> = new LuaMap<string, OgreSpawnData>()

        private static OgreChampionsCannotSpawnedFromRegions: string[] = []
        private static OgreLordCannotSpawnedFromRegions: string[] = []

        private static bInited = false
        
        private static bAllowToResetSpawnedOgreKeys = true

        private static designatedFaction : Faction | null = null

        public static OnOgreSpawnEvent : (character: Character, reason: string) => void
        public static OnDesignatedFactionChangeSuccessEvent: (newFaction: Faction) => void
        public static OnDesignatedFactionChangeFailedEvent: () => void

        private static LoadData(): boolean {
            const data = localStorage.getItem(OGRE_SPAWNER_DATA) as string
            if(data == null) {
                return false
            }

            try{
                OgreSpawner.Data = JSON.parse(data) as OgreSaveData
            } catch(exception) {
                logger.LogError(`error occurued when trying to parse, data was ${data}`)
                return false
            }

            wPrint(`Data loaded: ${data}`)
            return true
        }

        private static SaveData(): void {
            const jsonData = JSON.stringify(OgreSpawner.Data)
            localStorage.setItem(OGRE_SPAWNER_DATA, jsonData)
            wPrint(`Data saved: ${jsonData}`)
        }

        private static GetOgreAssociatedWithRegionKey(regionKey: string): [ogreKey: string, ogre: OgreSpawnData, isALord: boolean] | null {
            for (const [key, ogre] of OgreSpawner.OgreLordKey2Regions) {
                const found = ogre.regionKeys.indexOf(regionKey) >= 0
                if(found) return [key, ogre, true]
            }

            for (const [key, ogre] of OgreSpawner.OgreChampionKey2Regions) {
                const found = ogre.regionKeys.indexOf(regionKey) >= 0
                if(found) return [key, ogre, false]
            }

            return null
        }

        private static GetRandomOgreWhichCantSpawnFromRegion(): [ogrekey: string, isALord: boolean] | null {
            if(OgreSpawner.OgreLordCannotSpawnedFromRegions.length > 0) {
                return [ChooseRandom(OgreSpawner.OgreLordCannotSpawnedFromRegions) as string, true]
            }

            if(OgreSpawner.OgreChampionsCannotSpawnedFromRegions.length > 0) {
                return [ChooseRandom(OgreSpawner.OgreChampionsCannotSpawnedFromRegions) as string, false]
            }

            return null
        }

        private static GetRandomOgre(): [ogreKey: string, isALord: boolean] {
            const ogreLordKeys = []
            for (const [key, _] of OgreSpawner.OgreLordKey2Regions) {
                ogreLordKeys.push(key)
            }

            const OgreChampionKeys = []
            for (const [key, _] of OgreSpawner.OgreChampionKey2Regions) {
                OgreChampionKeys.push(key)
            }

            if(IsTrueOrFalse() && ogreLordKeys.length > 0) {
                return [ChooseRandom(ogreLordKeys) as string, true]
            }

            return [ChooseRandom(OgreChampionKeys) as string, false]
        }
        
        private static IsThereAnyOgreThatCantSpawnFromRegion(): boolean {
            return OgreSpawner.OgreLordCannotSpawnedFromRegions.length > 0 || OgreSpawner.OgreChampionsCannotSpawnedFromRegions.length > 0  
        }

        private static UpdateWhichOgreChampionsCannotBeSpawnedFromSettlement(): void {
            if(OgreSpawner.designatedFaction == null) {
                wPrint("OgreSpawner.designatedFaction was null")
                return
            }

            if(OgreSpawner.Data == null) {
                logger.LogError(`OgreSpawner.Data was null`)
                throw(`OgreSpawner.Data was null`)
            }

            const regionList = OgreSpawner.designatedFaction.GetFactionInterface().region_list()
            const regions = []
            for (let i = 0; i < regionList.num_items(); i++) {
                regions.push(regionList.item_at(i).name())
            }
            
            const result = []
            for (const [key, ogre] of OgreSpawner.OgreChampionKey2Regions) {
                const intersection = regions.filter(key => 
                    ogre.regionKeys.includes(key) && 
                    OgreSpawner.Data &&
                    !OgreSpawner.Data.spawnedOgreKeys.includes(key))
                    
                ogre.canSpawnFromRegion = ogre.regionKeys.length > intersection.length
                if(!ogre.canSpawnFromRegion) result.push(key)
            }            

            OgreSpawner.OgreChampionsCannotSpawnedFromRegions = result
        }

        private static UpdateWhichOgreLordsCannotBeSpawnedFromSettlement(): void {
            if(OgreSpawner.designatedFaction == null) {
                wPrint("OgreSpawner.designatedFaction was null")
                return
            }

            if(OgreSpawner.Data == null) {
                logger.LogError("OgreSpawner.Data was null")
                throw("OgreSpawner.Data was null")
            }

            const regionList = OgreSpawner.designatedFaction.GetFactionInterface().region_list()
            const regions = []
            for (let i = 0; i < regionList.num_items(); i++) {
                regions.push(regionList.item_at(i).name())
            }
            
            const result = []
            for (const [key, ogre] of OgreSpawner.OgreLordKey2Regions) {
                const intersection = regions.filter(key => 
                    ogre.regionKeys.includes(key) && 
                    OgreSpawner.Data && 
                    !OgreSpawner.Data.spawnedOgreKeys.includes(key))

                ogre.canSpawnFromRegion = ogre.regionKeys.length > intersection.length
                if(!ogre.canSpawnFromRegion) result.push(key)
            }            

            OgreSpawner.OgreLordCannotSpawnedFromRegions = result
        }

        private static GetOgreMercenariesCountOnLord(lord: Lord): number {
            const troops = lord.Troops
            const intersection = troops.filter(troop => OgreSpawner.OgreMercenariesUnitKeys.includes(troop.unitKey))            
            return intersection.length
        }

        private static OnOgreSpawned(character: Character, reason: string) {
            logger.LogWarn(`The ogre has spawned, milord ${character.SubtypeKey}`)
            OgreSpawner.Data?.spawnedOgreKeys.push(character.SubtypeKey)
            OgreSpawner.SaveData()
            /* update ogre availbility */
            OgreSpawner.UpdateWhichOgreLordsCannotBeSpawnedFromSettlement()
            OgreSpawner.UpdateWhichOgreChampionsCannotBeSpawnedFromSettlement()
            if(character.IsGeneralAndHasArmy) {
                const data = OgreSpawner.OgreLordKey2Regions.get(character.SubtypeKey)
                if(data) character.RenameLocalised(data.foreName ? data.foreName : "", data.familyName)
            } else {
                const data = OgreSpawner.OgreChampionKey2Regions.get(character.SubtypeKey)
                if(data) character.RenameLocalised(data.foreName ? data.foreName : "", data.familyName)
            }


            if(OgreSpawner.OnOgreSpawnEvent == null) return
            OgreSpawner.OnOgreSpawnEvent(character, reason as string)

        }

        /** human only and must be bretonnian faction */
        private static OnConquerSettlement(context: IContext) {
            if(context.character == null) return
            if(context.occupation_decision_type == null) return
            if(OgreSpawner.designatedFaction == null) return

            const occupationType = context.occupation_decision_type()
            switch (occupationType) {
                case "occupation_decision_occupy":
                case "occupation_decision_occupy_and_vassal":
                case "occupation_decision_liberate":
                case "occupation_decision_raze":
                case "occupation_decision_raze_without_occupy":
                case "occupation_decision_resettle":
                case "occupation_decision_resettle_and_vassal":
                case "occupation_decision_vassal":
                    break
            
                default:
                    return
            }

            const character = WrapICharacterObjectToCharacter(context.character())
            const lord = TryCastCharacterToLord(character)

            if(lord == null) {
                logger.LogError(`failed to cast ${character.LocalisedFullName} (${character.SubtypeKey}) into a lord`)
                throw(`failed to cast ${character.LocalisedFullName} (${character.SubtypeKey}) into a lord`)
            }

            if(!lord.Faction.IsHuman) return
            if(!lord.Faction.IsEqual(OgreSpawner.designatedFaction)) return

            setTimeout(() => OgreSpawner.SpawnOgreOnOccupiedSettlementIfPossible(lord), 950)
        }

        /** updates status of settlements attached to these ogres on diplomatic events */
        private static OnReceivedSettlement(context: IContext) {
            if(OgreSpawner.designatedFaction == null) return
            if(context.proposer == null) return

            const proposerFaction = GetFactionByKey(context.proposer().name())
            if(!proposerFaction?.IsEqual(OgreSpawner.designatedFaction)) return
            /* update ogre availbility */
            OgreSpawner.UpdateWhichOgreLordsCannotBeSpawnedFromSettlement()
            OgreSpawner.UpdateWhichOgreChampionsCannotBeSpawnedFromSettlement()
        }

        /** human only and must be bretonnian faction and only if there's an ogre that can't be spawned from region */
        private static OnVictory(context: IContext) {
            if(context.character == null) return
            if(OgreSpawner.designatedFaction == null) return

            const character = WrapICharacterObjectToCharacter(context.character())
            const lord = TryCastCharacterToLord(character)

            if(lord == null) {
                logger.LogError(`failed to cast ${character.LocalisedFullName} (${character.SubtypeKey}) into a lord`)
                throw(`failed to cast ${character.LocalisedFullName} (${character.SubtypeKey}) into a lord`)
            }

            if(!lord.Faction.IsHuman) return
            if(!lord.Faction.IsEqual(OgreSpawner.designatedFaction)) return
            if(!OgreSpawner.IsThereAnyOgreThatCantSpawnFromRegion()) return

            setTimeout(() => OgreSpawner.SpawnOgreOnArmyIfPossible(lord), 950)
        }

        private static OnTurnsForAI(context: IContext) {
            if(context.faction == null) return
            if(OgreSpawner.designatedFaction == null) return

            const faction = GetFactionByKey(context.faction().name())
            if(faction == null) return
            if(!faction.IsEqual(OgreSpawner.designatedFaction)) return
            if(faction.IsHuman) return

            const lords = faction.Lords
            OgreSpawner.SpawnOgreOnArmyIfPossibleForBot(ChooseRandom(lords) as Lord)
        }

        private static IsOgreSpawnedBefore(ogreKey: string): boolean {
            const ogreData = OgreSpawner.Data
            if(ogreData == null) {
                logger.LogError(`Save game data has not been loaded`)
                throw(`Save game data has not been loaded`)
            }

            return ogreData.spawnedOgreKeys.indexOf(ogreKey) >= 0
        }

        private static SpawnOgre(positionToSpawnAtWhichLord: Lord, ogreKey: string, isOgreLord: boolean) {
            if(isOgreLord) {
                new Lord({
                    factionKey: positionToSpawnAtWhichLord.FactionKey,
                    regionKey: positionToSpawnAtWhichLord.CurrentRegionKey,
                    agentKey: ogreKey,
                    lordCreatedCallback: (theLord, reason) => OgreSpawner.OnOgreSpawned(theLord, reason as string)   
                })
            } else {
                new Champion({
                    agentType: "champion",
                    agentKey: ogreKey,
                    regionKey: positionToSpawnAtWhichLord.CurrentRegionKey,
                    factionKey: positionToSpawnAtWhichLord.FactionKey,
                    championCreatedCallback: (theLord, reason) => OgreSpawner.OnOgreSpawned(theLord, reason as string)   
                })
            }
        }

        private static QueueDillema(lord: Lord, ogreKey: string, dillemaKey: string, isOgreLord: boolean) {
            if(OgreSpawner.designatedFaction == null) {
                wPrint("OgreSpawner.designatedFaction was null")
                return false
            }

            core.add_listener(
                `admirealnelson_check_for_dillema_multiple_choices`,
                "DilemmaChoiceMadeEvent",
                true,
                (context) => {
                    if(context.dilemma == null) return
                    if(context.choice == null) return

                    const currentDilemma = context.dilemma()
                    const choice = context.choice()

                    if(dillemaKey != currentDilemma) return
                    if(choice != 0) return

                    OgreSpawner.SpawnOgre(lord, ogreKey, isOgreLord)

                    print(`if it all went well a champion or a lord should spawned`)                    
                },
                false)

            OgreSpawner.designatedFaction.TriggerDilemma(dillemaKey)
            
        }

        private static SpawnOgreOnArmyIfPossibleForBot(lord: Lord): boolean {
            if(OgreSpawner.designatedFaction == null) {
                wPrint("OgreSpawner.designatedFaction was null")
                return false
            }

            if(lord.Faction.IsHuman) return false
            if(!lord.Faction.IsEqual(OgreSpawner.designatedFaction)) return false

            const threshold = OgreSpawner.DiceRollTresholdForRandomSpawnOnArmy.Bot
            if(!IsDiceRollSucess(threshold, DICES, DICE_SIDES)) return false

            let ogreToSpawn = OgreSpawner.GetRandomOgre()
            if(ogreToSpawn == null) {
                return false
            }

            const maxRetry = 10
            let count = 0
            while(ogreToSpawn == null || OgreSpawner.IsOgreSpawnedBefore(ogreToSpawn[0])) {
                if(count >= maxRetry) return false
                
                ogreToSpawn = OgreSpawner.GetRandomOgre()
                count++
            }

            const isAlord = ogreToSpawn[1]
            const ogreKey = ogreToSpawn[0]
            OgreSpawner.SpawnOgre(lord, ogreKey, isAlord)

            print(`SpawnOgreOnArmyIfPossibleForBot executed`)
            return true
        }

        private static SpawnOgreOnArmyIfPossible(lord: Lord): boolean {
            if(OgreSpawner.designatedFaction == null) {
                wPrint("OgreSpawner.designatedFaction was null")
                return false
            }

            if(OgreSpawner.Data == null) {
                logger.LogError("OgreSpawner.Data was null")
                throw("OgreSpawner.Data was null")
            }

            if(!lord.Faction.IsEqual(OgreSpawner.designatedFaction)) return false
            if(!lord.Faction.IsHuman) return false

            const threshold = OgreSpawner.DiceRollTresholdForRandomSpawnOnArmy.Human
        
            const ogreMercsCount = OgreSpawner.GetOgreMercenariesCountOnLord(lord)

            if(ogreMercsCount == 0) return false
            if(!IsDiceRollSucess(threshold - ogreMercsCount, DICES, DICE_SIDES)) return false

            let ogreToSpawn = OgreSpawner.GetRandomOgreWhichCantSpawnFromRegion()
            if(ogreToSpawn == null) {
                logger.LogWarn(`all ogre should be possible to spawn from region`)
                return false
            }

            const maxRetry = 10
            let count = 0
            while(ogreToSpawn == null || OgreSpawner.IsOgreSpawnedBefore(ogreToSpawn[0])) {
                if(count >= maxRetry) return false
                ogreToSpawn = OgreSpawner.GetRandomOgreWhichCantSpawnFromRegion()
                count++
            }

            OgreSpawner.QueueDillema(lord, ogreToSpawn[0], OgreSpawner.OgreRecruitmentDilemmaOnArmy, ogreToSpawn[1])

            return true
        }        

        private static SpawnOgreOnOccupiedSettlementIfPossible(lord: Lord): boolean {
            if(OgreSpawner.designatedFaction == null) {
                wPrint("OgreSpawner.designatedFaction was null")
                return false
            }

            if(!lord.Faction.IsEqual(OgreSpawner.designatedFaction)) return false
            if(!lord.Faction.IsHuman) return false

            const regionKey = lord.CurrentRegionKey 
            const ogreSpawnData = OgreSpawner.GetOgreAssociatedWithRegionKey(regionKey)
            if(ogreSpawnData == null) {
                logger.LogWarn(`no ogre found in region ${regionKey}`)                
                return false
            }

            const ogreKey = ogreSpawnData[0]
            if(OgreSpawner.IsOgreSpawnedBefore(ogreKey)) {
                logger.LogWarn(`ogre ${ogreKey} has already spawned before`)
                return false
            }

            const treshold = ogreSpawnData[1].diceRollTreshold
            if(!IsDiceRollSucess(treshold, DICES, DICE_SIDES)) {
                logger.LogWarn(`dice roll failed`)
                return false
            }

            let dilemmaKey = ogreSpawnData[1].defaultDilemmaKey
            const isOgreLord = ogreSpawnData[2]
            if(ogreSpawnData[1].specificDillemaKeys != null) {
                print(`specific dillemakeys was detected ${JSON.stringify(ogreSpawnData[1].specificDillemaKeys)}`)
                const findTheKey = ogreSpawnData[1].specificDillemaKeys.find( (dilemmaKey2Region) => dilemmaKey2Region.regionKeys.includes(regionKey) )
                dilemmaKey = (findTheKey) ? findTheKey.dilemmaKey : dilemmaKey
            }

            OgreSpawner.QueueDillema(lord, ogreKey, dilemmaKey, isOgreLord)

            return true
        }

        private static SetupDesignatedFaction(): void {
            OgreSpawner.designatedFaction = null
            if(OgreSpawner.Data == null) {
                logger.LogError(`save data is not loaded yet`)
                throw(`save data is not loaded yet!`)
            }

            OgreSpawner.Data.allowedFactions.sort((a, b) => a.priority - b.priority)
            for (const iterator of OgreSpawner.Data.allowedFactions) {
                const theFaction = GetFactionByKey(iterator.factionKey)
                if(theFaction && !theFaction.IsDead && theFaction.IsHuman) {
                    OgreSpawner.designatedFaction = theFaction
                    break
                }
            }
            if(OgreSpawner.designatedFaction == null) {
                if(OgreSpawner.bAllowToResetSpawnedOgreKeys) OgreSpawner.Data.spawnedOgreKeys = []

                logger.LogWarn(`SetupDesignatedFaction - no human bretonnian faction was found. Running search again for bot player`) 
                for (const iterator of OgreSpawner.Data.allowedFactions) {
                    const theFaction = GetFactionByKey(iterator.factionKey)
                    if(theFaction && !theFaction.IsDead) {
                        OgreSpawner.designatedFaction = theFaction
                        break
                    }
                }
            }

            OgreSpawner.Data.currentFactionKey = (OgreSpawner.designatedFaction == null) ? "" : OgreSpawner.designatedFaction.FactionKey
            OgreSpawner.SaveData()

            if(OgreSpawner.designatedFaction == null) {
                logger.LogWarn(`SetupDesignatedFaction - no bretonnian faction was left in this world...`) 
                if(OgreSpawner.OnDesignatedFactionChangeFailedEvent != null) OgreSpawner.OnDesignatedFactionChangeFailedEvent()
                return
            }
            print(`SetupDesignatedFaction ok - current faction is ${OgreSpawner.designatedFaction.FactionKey}`)
            if(OgreSpawner.OnDesignatedFactionChangeSuccessEvent != null) OgreSpawner.OnDesignatedFactionChangeSuccessEvent(OgreSpawner.designatedFaction) 
        }

        private static SetupOnConfederation() {
            core.add_listener(
                "update ogre2settlement status on getting new settlement from confederated faction",
                "FactionJoinsConfederation",
                true,
                (context) => {
                    if(OgreSpawner.designatedFaction == null) return
                    if(context.faction == null) return
                    const faction = GetFactionByKey(context.faction().name())

                    if(faction == null) return
                    if(!faction.IsEqual(OgreSpawner.designatedFaction)) return

                    setTimeout(() => {
                       OgreSpawner.UpdateWhichOgreChampionsCannotBeSpawnedFromSettlement()
                       OgreSpawner.UpdateWhichOgreLordsCannotBeSpawnedFromSettlement() 
                    }, 500);
                },
            true)

            print(`SetupOnConfederation ok`)
        }

        private static SetupOnDiplomaticEvent() {
            core.add_listener(
                "update ogre2settlement status on settlement trading",
                "PositiveDiplomaticEvent",
                true,
                (context) => OgreSpawner.OnReceivedSettlement(context),
            true)

            print(`SetupOnDiplomaticEvent ok`)
        }

        private static SetupSpawnerOnArmy() {
            core.add_listener(
                "spawn an ogre after victorious battle for player",
                "CharacterCompletedBattle",
                (_) => cm.model().pending_battle().has_been_fought(),
                (context) => OgreSpawner.OnVictory(context), 
            true)

            print(`SetupSpawnerOnArmy ok`)
        }

        private static SetupSettlementSpawner() {
            core.add_listener(
                "spawning system for player",
                "CharacterPerformsSettlementOccupationDecision",
                true,
                (context) => OgreSpawner.OnConquerSettlement(context),
            true)

            print(`SetupSettlementSpawner ok`)
        }
        
        private static SetupBotSpawner() {
            core.add_listener(
                "spawning system for bot",
                "FactionTurnStart",
                true,
                (context) => OgreSpawner.OnTurnsForAI(context),
            true)

            print(`SetupBotSpawner ok`)
        }

        private static SetupMonitorFactionHealth() {
            core.add_listener(
                "monitor the health of designated faction",
                "FactionTurnEnd", 
                /** runs every 5 turns */
                (_) =>  GetTurnNumber() % 5 == 0,
                (_) => {
                    if(OgreSpawner.designatedFaction == null)  {
                        OgreSpawner.SetupDesignatedFaction()
                        return
                    }
                    if(OgreSpawner.designatedFaction.IsDead) {
                        OgreSpawner.SetupDesignatedFaction()
                        return
                    }
                },
                true)

            print(`SetupMonitorFactionHealth ok`)
        }

        static DumpAllOgresToUnspawnable() {
            if(!DEBUG_DUMP_TO_UNSPAWNABLE) return

            OgreSpawner.OgreLordCannotSpawnedFromRegions = []
            OgreSpawner.OgreChampionsCannotSpawnedFromRegions = []
            for (const [key, ogre] of OgreSpawner.OgreLordKey2Regions) {
                OgreSpawner.OgreLordCannotSpawnedFromRegions.push(key)
            }

            for (const [key, ogre] of OgreSpawner.OgreChampionKey2Regions) {
                OgreSpawner.OgreChampionsCannotSpawnedFromRegions.push(key)
            }
        }

        static get DesignatedFaction(): Faction | null {
            return OgreSpawner.designatedFaction
        }

        static AddOgreLord(key: string, data: OgreSpawnData) {
            if(OgreSpawner.bInited) {
                logger.LogError(`already inited, cannot modify the data`)
                return
            }

            OgreSpawner.OgreLordKey2Regions.set(key, data)
        }

        static AddOgreChampion(key: string, data: OgreSpawnData) {
            if(OgreSpawner.bInited) {
                logger.LogError(`already inited, cannot modify the data`)
                return
            }

            OgreSpawner.OgreChampionKey2Regions.set(key, data)
        }

        static FindAllOgres(): Character[] {
            if(OgreSpawner.designatedFaction == null) return []
            
            const faction = OgreSpawner.designatedFaction
            const characters = OgreSpawner.designatedFaction.Characters
            const res = characters.filter((character) => OgreSpawner.IsOgreSpawnedBefore(character.SubtypeKey))         
            return res
        }

        /** returns false if there's save data stored in the player save game */
        static InitialiseForTheFirstTime(allowedFactionsKeys: AllowedFaction[]): boolean {
            if(OgreSpawner.LoadData()) return false

            OgreSpawner.Data = {
                spawnedOgreKeys: [],
                allowedFactions: allowedFactionsKeys,
                currentFactionKey: "",
                version: VERSION
            }
            OgreSpawner.SetupDesignatedFaction()

            return true
        }        
    
        static Init() {
            if(OgreSpawner.bInited) return


            if(OgreSpawner.DiceRollTresholdForRandomSpawnOnArmy.Bot == 0) {
                logger.LogError((`OgreSpawner.DiceRollTresholdForRandomSpawnOnArmy.Bot cannot be 0 otherwise SpawnOgreOnArmyIfPossible will not work`))
                throw(`OgreSpawner.DiceRollTresholdForRandomSpawnOnArmy.Bot cannot be 0`)
            }

            if(OgreSpawner.DiceRollTresholdForRandomSpawnOnArmy.Human == 0) {
                logger.LogError((`OgreSpawner.DiceRollTresholdForRandomSpawnOnArmy.Human cannot be 0 otherwise SpawnOgreOnArmyIfPossible will not work`))
                throw(`OgreSpawner.DiceRollTresholdForRandomSpawnOnArmy.Human cannot be 0`)
            }

            if(OgreSpawner.OgreMercenariesUnitKeys.length == 0) {
                logger.LogError((`OgreSpawner.OgreMercenariesUnitKeys.length cannot be 0 otherwise SpawnOgreOnArmyIfPossible will not work`))
                throw(`OgreSpawner.OgreMercenariesUnitKeys.length cannot be 0`)
            }

            if(OgreSpawner.OgreRecruitmentDilemmaOnArmy == "") {
                logger.LogError((`OgreSpawner.OgreRecruitmentDilemmaOnArmy cannot be empty string otherwise SpawnOgreOnArmyIfPossible will not work`))
                throw(`OgreSpawner.OgreRecruitmentDilemmaOnArmy cannot be empty string`)
            }

            if(OgreSpawner.Data == null) {
                logger.LogError((`OgreSpawner.Data must be initalised. InitialiseForTheFirstTime wasnt called before this`))
                throw(`OgreSpawner.Data must be initalised. InitialiseForTheFirstTime wasnt called before this`)
            }

            if(OgreSpawner.OnOgreSpawnEvent == null) {
                logger.LogWarn(`OnOgreSpawn event is not hooked.`)
            }

            if(OgreSpawner.OnDesignatedFactionChangeFailedEvent == null) {
                logger.LogWarn(`OnDesignatedFactionChangeFailed event is not hooked.`)
            }

            if(OgreSpawner.OnDesignatedFactionChangeSuccessEvent == null) {
                logger.LogWarn(`OnDesignatedFactionChangeSuccess event is not hooked.`)
            }

            OgreSpawner.bInited = true
            print("ready")

            const designatedFaction = GetFactionByKey(OgreSpawner.Data.currentFactionKey)
            if(designatedFaction == null) {
                throw(`impossible!`)
            }
            OgreSpawner.designatedFaction = designatedFaction

            OgreSpawner.SetupMonitorFactionHealth()
            OgreSpawner.SetupOnDiplomaticEvent()
            OgreSpawner.SetupOnConfederation()
            
            OgreSpawner.SetupBotSpawner()

            OgreSpawner.SetupSpawnerOnArmy()
            OgreSpawner.SetupSettlementSpawner()


        }    
    }
}