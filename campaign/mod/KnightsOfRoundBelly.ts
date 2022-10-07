namespace AdmiralNelsonKnightsOfTheRoundBelly {

    export const VERSION = 1
    export const ADMKNIGHTSOFTHEROUNDBELLY = "ADMKNIGHTSOFTHEROUNDBELLY:v"+VERSION

    const PEASANTS_EFFECT_PREFIX = "wh_dlc07_bundle_peasant_penalty_"

    const LOUIS_MISSION_KEY    = "admiralnelson_louis_grand_mace_mission_key"

    const DUKE_LOUIS_AGENT_KEY = "admnelson_bret_ogre_louis_le_gros_agent_key"
    const HECTOR_AGENT_KEY = "admnelson_bret_ogre_hector_de_maris_agent_key"

    const DUKE_LOUIS_FORENAME = "names_name_11382017"; const DUKE_LOUIS_TITLE = "names_name_11382018"
    
    const CIVILISED_SKILL_KEY     = "admiralnelson_ogre_civilised_characther_skills_1_skill_key"
    const OGRE_SKILL_KEY          = "admiralnelson_ogre_being_is_generally_unchivalrous_and_savage_skills_key_background_skill_scripted"
    const GREATER_GIRTH_SKILL_KEY = "admiralnelson_wh3_main_skill_ogr_tyrant_unique_greater_girth"
    const LOUIS_MOUNT_SKILL_KEY   = "admiralnelson_louis_mount_unlock_item_skill_key"

    class KnightsOfTheRoundBelly {

        private readonly l: Logger = new Logger("AdmiralNelsonKnightsOfTheRoundBelly")

        private OgreChampions = [
            DUKE_LOUIS_AGENT_KEY,
            "admnelson_bret_ogre_claudin_agent_key",
            "admnelson_bret_ogre_garravain_d_estrangot_agent_key",
            HECTOR_AGENT_KEY,
            "admnelson_bret_ogre_yvain_le_batard_agent_key",
            "admnelson_bret_ogre_gornemant_de_goort_agent_key",
            "admnelson_bret_ogre_lucant_le_boutellier_agent_key"
        ]

        private readonly BretonnianFactionsKeys = [
            {faction: "wh_main_brt_bretonnia", priority: 1},
            {faction: "wh_main_brt_carcassonne", priority: 2},
            {faction: "wh_main_brt_bordeleaux", priority: 3},
            {faction: "wh2_dlc14_brt_chevaliers_de_lyonesse", priority: 4},
            {faction: "wh2_main_brt_knights_of_origo", priority: 5},
            {faction: "wh2_main_brt_knights_of_the_flame", priority: 6},
            {faction: "wh2_main_brt_thegans_crusaders", priority: 7},
            {faction: "wh3_dlc20_brt_march_of_couronne", priority: 8},
            {faction: "wh3_main_brt_aquitaine", priority: 9},
            {faction: "wh_main_brt_artois", priority: 10},
            {faction: "wh_main_brt_bastonne", priority: 11},
        ]

        private readonly PeasantSlotPenaltySkills = [
            {skill: CIVILISED_SKILL_KEY, penalty: -1 },
            {skill: OGRE_SKILL_KEY, penalty: 6},
            {skill: GREATER_GIRTH_SKILL_KEY, penalty: 2},
            {skill: LOUIS_MOUNT_SKILL_KEY, penalty: 2}
            //the rest of grail skill put it here
        ]

        private designatedFaction: IFactionScript | null = null

        private LouisLeGrosHimself: ICharacterScript | null = null

        SpawnDukeLouisTest(): void {
            if(this.designatedFaction == null) {
                this.l.LogError(`SpawnDukeLouisTest - this.designatedFaction is null`)
                return
            }
            const factionKey = this.designatedFaction.name()
            const [x, y] = cm.find_valid_spawn_location_for_character_from_settlement(factionKey, "wh3_main_combi_region_couronne", false, true)
            cm.create_force_with_general(factionKey, undefined, "wh3_main_combi_region_couronne", x, y, "general", DUKE_LOUIS_AGENT_KEY, DUKE_LOUIS_FORENAME, DUKE_LOUIS_TITLE, "", "", false, 
            (cqi) => {
                this.l.LogWarn(`our lord ${DUKE_LOUIS_AGENT_KEY} has spawn with cqi no ${cqi}`)
                let theLordHimself = cm.get_character_by_cqi(cqi)
                if(theLordHimself != false) {
                    theLordHimself = theLordHimself as ICharacterScript
                    this.LouisLeGrosHimself = theLordHimself
                    cm.trigger_mission(factionKey, LOUIS_MISSION_KEY, true)
                    // common.set_context_value(`peasant_count_${factionKey}`, 8)
                    // const peasantCounts = common.get_context_value(`ScriptObjectContext("peasant_count_${factionKey}").NumericValue`) as number
                    // this.l.LogWarn(`current peasant count is ${peasantCounts}`)
                    setTimeout(() => this.CalculatePeasantSlotsUsageAndApplyPenalties(), 2000)
                }
            })
            this.l.LogWarn("SpawnDukeLouisTest ok")
        }

        KillAllOgres(): void {
            if(this.designatedFaction == null) {
                this.l.LogError(`KillAllOgres: cant execute this.designatedFaction is null`)
                return
            }
            const faction = this.designatedFaction
            const armies = faction.military_force_list()
            for (let i = 0; i < armies.num_items() ; i++) {
                const theArmy = armies.item_at(i)
                if(!theArmy.is_armed_citizenry() && theArmy.has_general()) {
                    const theGeneral = theArmy.general_character()
                    //this.l.Log(`iterating ${theGeneral.character_subtype_key()}`)
                    if(theGeneral.character_subtype_key() == DUKE_LOUIS_AGENT_KEY) {
                        this.l.Log(`killing character_cqi:${theGeneral.command_queue_index()}`)
                        cm.kill_character_and_commanded_unit(`character_cqi:${theGeneral.command_queue_index()}`, true)
                    }
                }
            }         
        }

        FindAllOgres(): ICharacterScript[] {
            if(this.designatedFaction == null) return []

            const faction = this.designatedFaction
            const res = []
            const armies = faction.military_force_list()
            for (let i = 0; i < armies.num_items() ; i++) {
                const theArmy = armies.item_at(i)
                if(!theArmy.is_armed_citizenry() && theArmy.has_general()) {
                    const theGeneral = theArmy.general_character()
                    //this.l.Log(`iterating ${theGeneral.character_subtype_key()}`)
                    if(this.OgreChampions.indexOf(theGeneral.character_subtype_key()) >= 0) res.push(theGeneral)
                }
            }   
            return res
        }

        GetPeasantSlotsUsedByOgres(): number {
            const ogres = this.FindAllOgres()
            let totalPeasantsUsedByOgres = 0
            for (const iterator of ogres) {
                const theOgre = iterator
                this.l.Log(`GetPeasantSlotsUsedByOgres - iterating ${theOgre.character_subtype_key()}`)
                for (const skill of this.PeasantSlotPenaltySkills) {
                    this.l.Log(`    skill: ${skill.skill}? ${theOgre.has_skill(skill.skill) ? skill.penalty : "nope"}`)
                    totalPeasantsUsedByOgres += theOgre.has_skill(skill.skill) ? skill.penalty : 0
                }
            }
            return totalPeasantsUsedByOgres
        }

        GetAndUpdateCurrentPeasantSlotsUsage(): [peasantCount: number, peasantCap: number] {
            if(this.designatedFaction == null) {
                this.l.LogError(`GetAndUpdateCurrentPeasantSlotsUsage - no designated bretonnian faction, perhaps dead?`)
                return [0, 0]
            }
            if(!this.designatedFaction.is_human()) return [0, 0]

            const factionKey = this.designatedFaction.name()
            Calculate_Economy_Penalty(this.designatedFaction)
            return [common.get_context_value(`ScriptObjectContext("peasant_count_${factionKey}").NumericValue`) as number, 
                    common.get_context_value(`ScriptObjectContext("peasant_cap_${factionKey}").NumericValue`) as number]
        }

        CalculatePeasantSlotsUsageAndApplyPenalties(): void {
            if(this.designatedFaction == null) {
                this.l.LogError(`CalculatePeasantSlotsUsage - no designated bretonnian faction, perhaps dead?`)
                return
            }
            if(!this.designatedFaction.is_human()) return

            const factionKey = this.designatedFaction.name()
            const [currentPeasantUsageCount, freePeasantCount] = this.GetAndUpdateCurrentPeasantSlotsUsage()
            const peasantsAllocatedByOgre = this.GetPeasantSlotsUsedByOgres()
            const totalAllocatedPeasants = currentPeasantUsageCount + peasantsAllocatedByOgre
            common.set_context_value(`peasant_count_${factionKey}`, totalAllocatedPeasants)
            this.l.Log(`CalculatePeasantSlotsUsage currentPeasantUsageCount=${currentPeasantUsageCount} peasantsAllocatedByOgre=${peasantsAllocatedByOgre} totalAllocatedPeasants=${totalAllocatedPeasants}`)

            //clear all penalties first
            const effectBundles = this.designatedFaction.effect_bundles()
            for (let i = 0; i < effectBundles.num_items(); i++) {
                const effectBundle = effectBundles.item_at(i)
                if(effectBundle.key().startsWith(PEASANTS_EFFECT_PREFIX)) cm.remove_effect_bundle(effectBundle.key(), factionKey)
            }

            //apply the penalties
            let peasantPercent = (totalAllocatedPeasants / freePeasantCount) * 100
            this.l.Log(`Peasant Percent: ${peasantPercent}%`)
            peasantPercent = Math.floor(peasantPercent)
            this.l.Log(`Peasant Percent Rounded: ${peasantPercent}%`)
            peasantPercent = Math.min(peasantPercent, 200)
            this.l.Log(`Peasant Percent Clamped: ${peasantPercent}%`)

            if(peasantPercent > 100) {
                peasantPercent -= 100
                this.l.Log(`Peasant Percent Final: ${peasantPercent}%`)
                cm.apply_effect_bundle(`${PEASANTS_EFFECT_PREFIX}${peasantPercent}`, factionKey, 0)
                
                if (!localStorage.getItem("ScriptEventNegativePeasantEconomy") &&
                    this.designatedFaction.is_human()) {
                    core.trigger_event("ScriptEventNegativePeasantEconomy")
                    localStorage.setItem("ScriptEventNegativePeasantEconomy", true)
                }
                
                const peasantRatioPositive = localStorage.getItem(`peasants_ratio_positive_${factionKey}`)
                
                if ((peasantRatioPositive || peasantRatioPositive == null) &&
                     !localStorage.getItem(`peasant_warning_event_shown_${factionKey}`)) {
                    cm.show_message_event(
                        factionKey,
                        "event_feed_strings_text_wh_dlc07_event_feed_string_scripted_event_peasant_negative_title",
                        "event_feed_strings_text_wh_dlc07_event_feed_string_scripted_event_peasant_negative_primary_detail",
                        "event_feed_strings_text_wh_dlc07_event_feed_string_scripted_event_peasant_negative_secondary_detail",
                        true,
                        703
                    )
                    localStorage.setItem(`peasant_warning_event_shown_${factionKey}`, true)
                    cm.add_turn_countdown_event(factionKey, 25, "ScriptEventPeasantWarningEventCooldownExpired", factionKey)
                }                    
                
                localStorage.setItem(`peasants_ratio_positive_${factionKey}`, false)
            } else {
                this.l.Log("Peasant Percent Final: 0")
                cm.apply_effect_bundle(`${PEASANTS_EFFECT_PREFIX}0`, factionKey, 0)
            
                if (localStorage.getItem("ScriptEventNegativePeasantEconomy") && 
                    !localStorage.getItem("ScriptEventPositivePeasantEconomy") &&
                    this.designatedFaction.is_human()) {
                    core.trigger_event("ScriptEventPositivePeasantEconomy")
                    localStorage.setItem("ScriptEventPositivePeasantEconomy", true)
                }                
                localStorage.setItem(`peasants_ratio_positive_${factionKey}`, true)
            }
            
        }

        GiveOgreLessPenaltiesForCompletingGrailQuests(whichOgre: ICharacterScript, whatQuest: "KnightsVow" | "QuestingVow" | "GrailVow"): void {
            if(this.OgreChampions.indexOf(whichOgre.character_subtype_key()) < 0) {
                this.l.LogError(`whichOgre param (${whichOgre.character_subtype_key()}) is not defined in this.OgreChampions ${JSON.stringify(this.OgreChampions)} array`)
                return
            }
            this.l.LogWarn(`GiveOgreLessPenaltiesForCompletingGrailQuests triggered. whichOgre ${whichOgre.character_subtype_key()} whatQuest ${whatQuest}`)
        }

        Init(): void {
            this.FirstTimeSetup()
            this.SetupDesignatedFaction()
            this.SpawnDukeLouisTest()
            //this.KillAllOgres()
            this.SetupOnSkillAllocated()
            this.SetupOnCharacterRankUp()
            this.SetupGiveOgreLessPenaltiesForCompletingGrailQuests()
            this.SetupOnFactionTurnStart()
            this.SetupOnFactionTurnEnd()
            this.SetupTestTimer()
        }

        FirstTimeSetup(): void {
            this.l.LogWarn(`Running Knights of The Round Belly (Typescript Edition) version ${VERSION}`)
            this.l.Log("FirstTimeSetup ok")
        }

        SetupDesignatedFaction(): void {
            this.designatedFaction = null
            this.BretonnianFactionsKeys.sort((a, b) => a.priority - b.priority)
            for (const iterator of this.BretonnianFactionsKeys) {
                const theFaction = cm.model().world().faction_by_key(iterator.faction)
                if(!theFaction.is_dead() && theFaction.is_human()) {
                    this.designatedFaction = theFaction
                    break
                }
            }
            if(this.designatedFaction == null) {
                this.l.LogWarn(`SetupDesignatedFaction - no human bretonnian faction was found. Running search again for bot player`) 
                for (const iterator of this.BretonnianFactionsKeys) {
                    const theFaction = cm.model().world().faction_by_key(iterator.faction)
                    if(!theFaction.is_dead()) {
                        this.designatedFaction = theFaction
                        break
                    }
                }
            }

            if(this.designatedFaction == null) {
                this.l.LogWarn(`SetupDesignatedFaction - no bretonnian faction was left in this world...`) 
                return
            }
            this.l.Log(`SetupDesignatedFaction ok - current faction is ${this.designatedFaction.name()}`)
            const peasantCounts = common.get_context_value(`ScriptObjectContext("peasant_count_${this.designatedFaction.name()}").NumericValue`) as number
            this.l.LogWarn(`current peasant count is ${peasantCounts}`)
        }

        SetupOnSkillAllocated() {
            core.add_listener(
                "Admiralnelson setup on CharacterSkillPointAllocated for LouisLeGros",
                "CharacterSkillPointAllocated",
                (context) => {
                    const character = context.character ? context.character().character_subtype_key() : "unknown"
                    return character == DUKE_LOUIS_AGENT_KEY
                },
                (context) => {
                    const skillKey = context.skill_point_spent_on ? context.skill_point_spent_on() : "UNKNOWN"
                    const character = context.character ? context.character().character_subtype_key() : "unknown"
                    this.l.Log(`${character} spent on ${skillKey}`)
                    this.CalculatePeasantSlotsUsageAndApplyPenalties()
                },
                true
            )
            this.l.Log(`CharacterSkillPointAllocated for LouisLeGros`)
            this.l.Log("SetupOnSkillAllocated ok")
        }

        SetupOnCharacterRankUp() {
            core.add_listener(
                "Admiralnelson setup on CharacterRankUp for LouisLeGros",
                "CharacterRankUp",
                (context) => {
                    const character = context.character ? context.character().character_subtype_key() : "unknown"
                    return character == DUKE_LOUIS_AGENT_KEY
                },
                (context) => {
                    this.CalculatePeasantSlotsUsageAndApplyPenalties()
                },
                true
            )
            this.l.Log("SetupOnCharacterRankUp ok")
        }

        SetupGiveOgreLessPenaltiesForCompletingGrailQuests() {
            core.add_listener(
                "Admiralnelson SetupGiveOgreLessPenaltiesForCompletingGrailQuests0",
                "ScriptEventBretonniaKnightsVowCompleted",
                (context) => {
                    const theOgreKey = context.character? context.character().character_subtype_key() : ""
                    return this.OgreChampions.indexOf(theOgreKey) >= 0
                },
                (context) => {
                    const theOgre = context.character? context.character() : null
                    if(theOgre == null) return

                    this.GiveOgreLessPenaltiesForCompletingGrailQuests(theOgre, "KnightsVow")
                }, 
                true
            )
            core.add_listener(
                "Admiralnelson SetupGiveOgreLessPenaltiesForCompletingGrailQuests0",
                "ScriptEventBretonniaQuestingVowCompleted",
                (context) => {
                    const theOgreKey = context.character? context.character().character_subtype_key() : ""
                    return this.OgreChampions.indexOf(theOgreKey) >= 0
                },
                (context) => {
                    const theOgre = context.character? context.character() : null
                    if(theOgre == null) return

                    this.GiveOgreLessPenaltiesForCompletingGrailQuests(theOgre, "QuestingVow")
                }, 
                true
            )
            core.add_listener(
                "Admiralnelson SetupGiveOgreLessPenaltiesForCompletingGrailQuests2",
                "ScriptEventBretonniaKnightsVowCompleted",
                (context) => {
                    const theOgreKey = context.character? context.character().character_subtype_key() : ""
                    return this.OgreChampions.indexOf(theOgreKey) >= 0
                },
                (context) => {
                    const theOgre = context.character? context.character() : null
                    if(theOgre == null) return

                    this.GiveOgreLessPenaltiesForCompletingGrailQuests(theOgre, "GrailVow")
                }, 
                true
            )
            this.l.Log("SetupGiveOgreLessPenaltiesForCompletingGrailQuests ok")
        }

        SetupOnFactionTurnStart(): void {
            core.add_listener(
                "admiralnelson SetupOnFactionTurnStart",
                "FactionTurnStart",
                (context) => {
                    const faction = context.faction ? context.faction() : null
                    if(faction == null) return false

                    return this.designatedFaction == faction
                },
                (context) => this.CalculatePeasantSlotsUsageAndApplyPenalties(),
                true
            )

            this.l.Log("SetupOnFactionTurnStart ok")
        }

        SetupOnFactionTurnEnd(): void {
            core.add_listener(
                "admiralnelson SetupOnFactionTurnEnd",
                "FactionTurnEnd",
                (context) => {
                    const faction = context.faction ? context.faction() : null
                    if(faction == null) return false

                    return this.designatedFaction == faction
                },
                (context) => this.CalculatePeasantSlotsUsageAndApplyPenalties(),
                true
            )

            this.l.Log("SetupOnFactionTurnEnd ok")
        }
        

        SetupTestTimer(): void {
            // let i = 0
            // const test = setInterval(() => {
            //     this.l.Log("hello world")
            //     i++
            // }, 1000)
            setTimeout(() => this.l.Log(debug.traceback("test", 1)), 4000)
        }

        constructor() {
            cm.add_first_tick_callback( () => this.Init() )
        }
    }
    
    new KnightsOfTheRoundBelly()
}