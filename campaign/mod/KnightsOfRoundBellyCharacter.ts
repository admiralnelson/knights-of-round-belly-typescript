namespace AdmiralNelsonKnightsOfTheRoundBelly {

    const CharacterLogger = new Logger("AdmiralNelsonKnightsOfTheRoundBelly CharacterLogger")

    type CharacterCreationOptions = {
        characterObject?: ICharacterScript
        factionKey?: string
        agentSubtypeKey?: string,
        forename?: string
        familyName?: string
        agentType?: string
        spawnAsAgent?: boolean
        setAsFactionLeader?: boolean
        regionKey?: string
    }
    type CallbackLordCreated = { 
        (theLordHimself: Lord, reason: "CreateFromKey" | "WrappingExistingObject"): void
    }

    class Character {
        protected characterObj: ICharacterScript | null = null

        constructor(options: CharacterCreationOptions) {
            if(options.characterObject) {
                this.characterObj = options.characterObject
                return
            }
            if(options.agentSubtypeKey) {
                if(options.factionKey) {
                    const checkFaction = cm.model().world().faction_by_key(options.factionKey)
                    if(checkFaction.is_null_interface()) {
                        CharacterLogger.LogError(`invalid faction key "${options.factionKey}"`)
                        throw(`invalid faction key "${options.factionKey}"`)
                    }
                }
                if(options.regionKey) {
                    const checkRegtion = cm.model().world().region_manager().region_by_key(options.regionKey)
                    if(checkRegtion.is_null_interface()) {
                        CharacterLogger.LogError(`invalid region key "${options.regionKey}"`)
                        throw(`invalid region key "${options.regionKey}"`)
                    }
                }

                if(options.regionKey == null) {
                    CharacterLogger.LogError(`can't spawn lord/agent, options.factionKey was null`)
                    throw(`can't spawn lord/agent, options.factionKey was null`)
                }
                if(options.factionKey == null) {
                    CharacterLogger.LogError(`can't spawn lord/agent, options.factionKey was null`)
                    throw(`can't spawn lord/agent, options.factionKey was null`)
                }

                const factionKey = options.factionKey

                //check if lord successfully spawned, otherwise tell an error
                const traceback = debug.traceback("", 1)
                const throwErrorLatent = setTimeout(()=> {
                    CharacterLogger.LogError(`failed to spawn lord ${options.agentSubtypeKey}`)
                    CharacterLogger.LogWarn(`previous tracebacks: \n${traceback}`)
                }, 500)
                //if the character did spawn make sure to store it into internal variable this.characterObj
                core.add_listener(
                    `create agent ${options.agentSubtypeKey} ${RandomString()}`,
                    "CharacterRecruited",
                    (context) => {
                        const theChar = context.character ? context.character() : null
                        if(theChar == null) return false
    
                        return theChar.character_subtype_key() == options.agentSubtypeKey
                    },
                    (context) => {
                        const theChar = context.character ? context.character() : null
                        if(theChar == null) return
                        this.characterObj = theChar
                        clearInterval(throwErrorLatent)
                    }, 
                    false
                )
                if(options.spawnAsAgent) {
                    if(options.agentType == null || options.agentType == "") {
                        CharacterLogger.Log(`can't spawn agent, options.agentType was null`)
                        throw(`can't spawn agent, options.agentType was null`)
                    }
                    const theFaction = cm.model().world().faction_by_key(factionKey)
                    const agentType = options.agentType
                    const [x, y] = cm.find_valid_spawn_location_for_character_from_settlement(factionKey, options.regionKey, false, true)
                    cm.spawn_agent_at_position(theFaction, x, y, agentType, options.agentSubtypeKey)
                    return
                }

                if(options.forename == null || options.forename == "") CharacterLogger.LogWarn(`options.forename was empty for ${options.agentSubtypeKey}`)
                
                const [x, y] = cm.find_valid_spawn_location_for_character_from_settlement(options.factionKey, options.regionKey, false, true)
                cm.create_force_with_general(
                    options.factionKey, 
                    "", 
                    options.regionKey,
                    x, y, 
                    "general", 
                    options.agentSubtypeKey, 
                    options.forename ?? "", 
                    "", 
                    options.familyName ?? "", 
                    "", 
                    options.setAsFactionLeader ?? false, 
                    (cqi) => { CharacterLogger.Log(`spawned lord ${cqi}`) }, 
                    false
                )
                return
            }

        }
    }

    type LordCreationOptions = {
        characterObject?: ICharacterScript,
        cqi?: number,
        agentKey?: string,
        factionKey?: string,
        regionKey?: string,
        lordCreatedCallback?: CallbackLordCreated
    }

    export class Lord extends Character {
        private lordCreatedCallback: CallbackLordCreated | undefined = undefined

        /**
         * 
         * @param options to create Lord from scratch, following attribute `agentKey`, `factionKey`, `regionKey` must be supplied to `options`. `lordCreatedCallback` is a callback when character spawned successfully   
         * if you want to wrap existing ICharacter object, fill either `characterObject` or `cqi` into `options`
         */
        constructor(options?: LordCreationOptions) {
            if(options == null) return
            if(options.agentKey && options.characterObject == null) {
                core.add_listener(
                    `create lord ${options.agentKey} ${RandomString()}`,
                    "CharacterRecruited",
                    (context) => {
                        const theChar = context.character ? context.character() : null
                        if(theChar == null) return false
    
                        return theChar.character_subtype_key() == options.agentKey
                    },
                    (context) => {
                        const theChar = context.character ? context.character() : null
                        if(theChar == null) return
                        if(this.lordCreatedCallback) this.lordCreatedCallback(this, "CreateFromKey")
                    }, 
                    false
                )
            }
            if(options.cqi) {
                super({})
                const theChar = cm.get_character_by_cqi(options.cqi)
                if(theChar) this.characterObj = theChar; else {
                    CharacterLogger.LogError(`this cqi ${options.cqi} is invalid cqi`)
                    throw(`this cqi ${options.cqi} is invalid cqi`)
                }

            } else {
                super({
                    characterObject: options.characterObject, 
                    factionKey: options.factionKey,
                    regionKey: options.regionKey,
                    agentSubtypeKey: options.agentKey })
            }
            this.lordCreatedCallback = options.lordCreatedCallback
            if(this.characterObj) {
                if(this.lordCreatedCallback) this.lordCreatedCallback(this, "WrappingExistingObject")
            }
            
        }

        public AddTrait(traitKey: string, level: number = 1, showNotification: boolean = true) {
            cm.force_add_trait(cm.char_lookup_str(this.GetInternalInterface()), traitKey, showNotification, level)
        }

        public ChangeModelAppearance(campaignArtSetKey: string) {
            cm.add_character_model_override(this.GetInternalInterface(), campaignArtSetKey)
        }

        public SetInternalInterface(newLord: ICharacterScript) {
            this.characterObj = newLord
        }

        public GetInternalInterface(): ICharacterScript {
            if(this.characterObj == null) {
                CharacterLogger.LogError(`this.characterObj is null, maybe it was not created? check console logs`)
                throw(`this.characterObj is null, maybe it was not created? check console logs`)
            }
            return this.characterObj           
        }

        public RenameLocalised(forename: string, surname: string = "", clanname: string = "", othername: string = "") {
            cm.change_character_localised_name(this.GetInternalInterface(), forename, surname, clanname, othername)
        }

        public GetFactionInterface() : IFactionScript {
            return this.GetInternalInterface().faction()
        }

        public get RawForename(): string {
            return this.GetInternalInterface().get_forename()
        }

        public get RawSurename(): string {
            return this.GetInternalInterface().get_surname()
        }
        
        public get LocalisedFullName(): string {
            return `${this.LocalisedForename} ${this.LocalisedSurename}`
        }

        public get LocalisedForename(): string {
            return common.get_localised_string(this.RawForename)
        }

        public get LocalisedSurename(): string {
            return common.get_localised_string(this.RawSurename)
        }

        public get SubtypeKey() : string {
            return this.GetInternalInterface().character_subtype_key()
        }

        public get FactionKey(): string {
            return this.GetFactionInterface().name()
        }
        
    }

}