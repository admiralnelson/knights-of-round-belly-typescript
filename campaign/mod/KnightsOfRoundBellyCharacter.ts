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
    type CallbackChampionCreated = { 
        (theChampionHimself: Champion, reason: "CreateFromKey" | "WrappingExistingObject"): void
    }

    /**
     * Convert a CQI into Character
     * @param cqiNo characther command queue index number
     * @returns Character, null if cqiNo is invalid
     */
    export function FindCharacter(cqiNo: number): Character | null {
        const characterObject = cm.get_character_by_cqi(cqiNo)
        if(characterObject == false) return null
        return new Character({characterObject: characterObject})
    }

    /**
     * Converts ICharacterScript into Character
     * @param characterObject 
     * @returns Character
     */
    export function WrapICharacterObjectToCharacter(characterObject: ICharacterScript): Character {
        return new Character({characterObject: characterObject})
    }

    /**
     * ICharacterScript wrapper. It allows you to query and manipulate your lords and heroes in OOP style rather than relying cm APIs
     */
    export class Character {
        protected characterObj: ICharacterScript | null = null

        /**
         * Not recommended to instantiate this directly. Use `FindCharacter` or `WrapICharacterObjectToCharacter` function instead. 
         * Or use `Lord` or `Champion` class instead.
         * @param options To wrap existing `ICharacterScript` object fill `option.characterObject`. 
         * To create new Character for general/lord from scratch, fill these fields: `option.agentSubtypeKey`, `options.factionKey`, `options.regionKey`
         * To spawn agent, fill the same fields as above and fill these too `options.spawnAsAgent`, `options.agentType`
         * @returns Wrapped ICharacterScript inside Character
         */
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
                const traceback = debug.traceback("", 2)
                const throwErrorLatent = setTimeout(()=> {
                    CharacterLogger.LogError(`failed to spawn character ${options.agentSubtypeKey}`)
                    CharacterLogger.LogWarn(`previous tracebacks: \n${traceback}`)
                }, 200)
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

        /**
         * Add new trait for this character
         * @param traitKey Trait key from db
         * @param showNotification Show notification "trait gained" in event panel
         * @param level set trait level
         */
        public AddTrait(traitKey: string, showNotification: boolean = true, level: number = 1,) {
            cm.force_add_trait(cm.char_lookup_str(this.GetInternalInterface()), traitKey, showNotification, level)
        }

        /**
         * Remove trait from this character
         * @param traitKey Trait key from db
         */
        public RemoveTrait(traitKey: string) {
            cm.force_remove_trait(cm.char_lookup_str(this.GetInternalInterface()), traitKey)
        }

        /**
         * Change the model appearance of this character
         * @param campaignArtSetKey art sed id from campaign_character_art_sets_tables table
         */
        public ChangeModelAppearance(campaignArtSetKey: string) {
            cm.add_character_model_override(this.GetInternalInterface(), campaignArtSetKey)
        }

        /**
         * Replaces the underlying Character interface
         * @param newLord 
         */
        public SetInternalInterface(newLord: ICharacterScript) {
            this.characterObj = newLord
        }

        /**
         * Gets the underlying Character interface
         * @throws an exception if internal characterObj is null or if it's not valid
         * @returns ICharacterScript
         */
        public GetInternalInterface(): ICharacterScript {
            if(this.characterObj == null) {
                CharacterLogger.LogError(`this.characterObj is null, maybe it was not created? check console logs`)
                throw(`this.characterObj is null, maybe it was not created? check console logs`)
            }
            if(!this.IsValid()) {
                CharacterLogger.LogError(`this.characterObj is INullScript, maybe it was killed? check console logs`)
                throw(`this.characterObj is INullScript, maybe it was killed? check console logs`)
            }
            return this.characterObj           
        }

        /**
         * Renames this character (localised)
         * @param forename Localised forename key, in the `[table]_[key]_[field]` format. example: `"names_name_1053468021"`
         * @param surname  Localised surname key, in the `[table]_[key]_[field]` format.
         * @param clanname Localised clan name key, in the `[table]_[key]_[field]` format.
         * @param othername Localised other name key, in the `[table]_[key]_[field]` format.
         */
        public RenameLocalised(forename: string, surname: string = "", clanname: string = "", othername: string = "") {
            cm.change_character_localised_name(this.GetInternalInterface(), forename, surname, clanname, othername)
        }

        /**
         * Gets faction interface from the internally referenced ICharacterScript
         * @returns IFactionScript
         */
        public GetFactionInterface() : IFactionScript {
            return this.GetInternalInterface().faction()
        }

        /** (Getter) Forename key */
        public get RawForename(): string {
            return this.GetInternalInterface().get_forename()
        }

        /** (Getter) Surename key */
        public get RawSurename(): string {
            return this.GetInternalInterface().get_surname()
        }
        
        /** (Getter) Localised Fullname */
        public get LocalisedFullName(): string {
            return `${this.LocalisedForename} ${this.LocalisedSurename}`
        }

        /** (Getter) Localised Forename */
        public get LocalisedForename(): string {
            return common.get_localised_string(this.RawForename)
        }

        /** (Getter) Localised Surename */
        public get LocalisedSurename(): string {
            return common.get_localised_string(this.RawSurename)
        }

        /** (Getter) AgentSubtype key */
        public get SubtypeKey() : string {
            return this.GetInternalInterface().character_subtype_key()
        }

        /** (Getter) Faction key */
        public get FactionKey(): string {
            return this.GetFactionInterface().name()
        }

        /** (Getter) Command queue index number */
        public get CqiNo() : number {
            return this.GetInternalInterface().command_queue_index()
        }

        /**
         * Check if internally referenced character is not null and it is not INullScript
         * @returns 
         */
        public IsValid(): boolean {
            return (this.characterObj != null) && !this.characterObj.is_null_interface()
        }

        /**
         * Check if this character has a skill
         * @param skillKey skill key from skill tables
         * @returns 
         */
        public HasSkill(skillKey: string): boolean {
            return this.GetInternalInterface().has_skill(skillKey)
        }
        
        /**
         * Check if this character has a trait
         * @param traitKey trait key from trait tables
         * @returns 
         */
        public HasTrait(traitKey: string): boolean {
            return this.GetInternalInterface().has_trait(traitKey)
        }

        /**
         * Check if this character has an ancillary
         * @param anciliaryKey ancillary key from ancillary tables
         * @returns 
         */
        public HasAncillary(anciliaryKey: string): boolean {
            return this.GetInternalInterface().has_ancillary(anciliaryKey)
        }

        /**
         * Gets character trait level, if it's not found it will return -1
         * @param traitKey trait key from trait tables
         * @returns 
         */
        public GetTraitLevel(traitKey: string): number {
            return this.GetInternalInterface().trait_level(traitKey)
        }

        /**
         * Kills this character. WARNING: this can render methods of this object to be invalid!
         * @param destroyTroop destroy the troop too? (for general/lord only)
         */
        public Kill(destroyTroop: boolean = false) {
            cm.kill_character_and_commanded_unit(cm.char_lookup_str(this.GetInternalInterface()), destroyTroop)
        }

        /**
         * Rather than doing this lordA == lordB (although both instances have the same reference, the objects wrapper are still different), use this method to check if both object is equal
         * @param otherCharacter 
         * @returns 
         */
        public IsEqual(otherCharacter: Character): boolean {
            return this.CqiNo == otherCharacter.CqiNo
        }

        /** returns the agentsubtype key of this object */
        public toString(): string {
            return this.SubtypeKey
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

    /** Inherits from Character, you can extend this class if you want to have additional methods or maybe to differentiate between Lord type */
    export class Lord extends Character {
        private lordCreatedCallback: CallbackLordCreated | undefined = undefined

        /**
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
                    agentSubtypeKey: options.agentKey 
                })
            }
            this.lordCreatedCallback = options.lordCreatedCallback
            if(this.characterObj) {
                if(this.lordCreatedCallback) this.lordCreatedCallback(this, "WrappingExistingObject")
            }
            
        }

        /**
         * Add troops for this Lord
         * @param mainUnitKey main unit keys from main unit table
         */
        public AddTroops(mainUnitKey: string[]) {
            for (const iterator of mainUnitKey) {
                cm.grant_unit_to_character(cm.char_lookup_str(this.GetInternalInterface()), iterator)
            }
        }

        /**
         * Kills this lord and his armies.  
         * WARNING: Methods of this object will be invalid!
         */
        public Destroy() {
            this.Kill(true)
        }
        
    }

    type ChampionCreationOptions = {
        characterObject?: ICharacterScript,
        cqi?: number,
        agentKey?: string,
        factionKey?: string,
        regionKey?: string,
        agentType?: string
        championCreatedCallback?: CallbackChampionCreated
    }
    /** Inherits from Character, you can extend this class if you want to have additional methods or maybe to differentiate between agent type */
    export class Champion extends Character {
        private championCreatedCallback: CallbackChampionCreated | undefined = undefined

        /**
         * @param options to create Champion from scratch, following attribute `agentKey`, `factionKey`, `regionKey`, `agentType` must be supplied to `options`. `championCreatedCallback` is a callback when character spawned successfully   
         * if you want to wrap existing ICharacter object, fill either `characterObject` or `cqi` into `options`
         */
        constructor(options?: ChampionCreationOptions) {
            if(options == null) return
            if(options.agentKey && options.characterObject == null) {
                core.add_listener(
                    `create champion ${options.agentKey} ${RandomString()}`,
                    "CharacterRecruited",
                    (context) => {
                        const theChar = context.character ? context.character() : null
                        if(theChar == null) return false
    
                        return theChar.character_subtype_key() == options.agentKey
                    },
                    (context) => {
                        const theChar = context.character ? context.character() : null
                        if(theChar == null) return
                        if(this.championCreatedCallback) this.championCreatedCallback(this, "CreateFromKey")
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
                if(options.agentType == null || options.agentType == "") {
                    CharacterLogger.Log(`cannot create new champion because you didn't pass options.agentType. options.agentKey ${options.agentKey}`)
                    throw(`cannot create new champion because you didn't pass options.agentType. options.agentKey ${options.agentKey}`)
                }
                super({
                    characterObject: options.characterObject, 
                    factionKey: options.factionKey,
                    regionKey: options.regionKey,
                    agentSubtypeKey: options.agentKey,
                    agentType: options.agentType,
                    spawnAsAgent: true 
                })
            }
            this.championCreatedCallback = options.championCreatedCallback
            if(this.characterObj) {
                if(this.championCreatedCallback) this.championCreatedCallback(this, "WrappingExistingObject")
            }
            
        }
        
    }

}