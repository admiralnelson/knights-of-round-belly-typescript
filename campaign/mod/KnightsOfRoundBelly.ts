namespace AdmiralNelsonKnightsOfTheRoundBelly {

    const DEBUG = true

    export const VERSION = 1
    export const ADMKNIGHTSOFTHEROUNDBELLY = "ADMKNIGHTSOFTHEROUNDBELLY:v"+VERSION

    const PEASANTS_EFFECT_PREFIX = "wh_dlc07_bundle_peasant_penalty_"

    export const LOUIS_MISSION_KEY    = "admiralnelson_louis_grand_mace_mission_key"

    export const DUKE_LOUIS_AGENT_KEY = "admnelson_bret_ogre_louis_le_gros_agent_key"
    export const HECTOR_AGENT_KEY = "admnelson_bret_ogre_hector_de_maris_agent_key"
    export const CLAUDIN_AGENT_KEY = "admnelson_bret_ogre_claudin_agent_key"
    export const GARRAVAIN_AGENT_KEY = "admnelson_bret_ogre_garravain_d_estrangot_agent_key"
    export const YVAIN_LE_BATARD_AGENT_KEY = "admnelson_bret_ogre_yvain_le_batard_agent_key"
    export const LUCANT_AGENT_KEY = "admnelson_bret_ogre_lucant_le_boutellier_agent_key"
    export const GORNEMANT_AGENT_KEY = "admnelson_bret_ogre_gornemant_de_goort_agent_key"

    export const DUKE_LOUIS_FORENAME = "names_name_11382017"; export const DUKE_LOUIS_TITLE = "names_name_11382018"
    export const HECTOR_FORENAME = "names_name_11382022"; export const HECTOR_HOUSE_OF = "names_name_11382023"
    export const CLAUDIN_FORENAME = "names_name_11382019"; export const CLAUDIN_HOUSE_OF = ""
    export const GARRAVAIN_FORENAME = "names_name_11382020"; export const GARRAVAIN_HOUSE_OF = "names_name_11382021"
    export const YVAIN_FORENAME = "names_name_11382024"; export const YVAIN_HOUSE_OF = "names_name_11382025"
    export const LUCANT_FORENAME = "names_name_11382028"; export const LUCANT_HOUSE_OF = "names_name_11382029"
    export const GORENMANT_FORENAME = "names_name_11382026"; export const GORNEMENT_HOUSE_OF = "names_name_11382027"
    
    const CIVILISED_SKILL_KEY     = "admiralnelson_ogre_civilised_characther_skills_1_skill_key"
    const OGRE_SKILL_KEY          = "admiralnelson_ogre_being_is_generally_unchivalrous_and_savage_skills_key_background_skill_scripted"
    const GREATER_GIRTH_SKILL_KEY = "admiralnelson_wh3_main_skill_ogr_tyrant_unique_greater_girth"
    const LOUIS_MOUNT_SKILL_KEY   = "admiralnelson_louis_mount_unlock_item_skill_key"
    
    export const PEASANT_REDUCTION_TRAIT_NOT_COMMITTED_YET_KEY = "admiralnelson_ogre_knight_vow_peasant_reduction_not_commited_yet_scripted_trait_key"
    export const PEASANT_REDUCTION_TRAIT_KEY = "admiralnelson_ogre_knight_vow_peasant_reduction_scripted_trait_key"

    const LOW_UPKEEP_FOR_AI_KEY = "admiralnelson_ogre_low_upkeep_for_ogre_heroes_for_AI_bundle_key"

    const BRETONNIA_OGRE_RECRUITMENT_DILEMMA = "admiralnelson_ogre_recruitment_because_army_has_ogre_merc_dilemma_key"


    type ConstOgreKeyToOgreData = {
        [key: string]: OgreSpawnData
    }

    export class KnightsOfTheRoundBelly {
        
        private readonly l: Logger = new Logger("AdmiralNelsonKnightsOfTheRoundBelly")

        private OgreLordsAndChampions : ConstOgreKeyToOgreData = {
            [DUKE_LOUIS_AGENT_KEY]: {
                regionKeys: [
                    "wh3_main_combi_region_massif_orcal"
                ],
                defaultDilemmaKey: "admiralnelson_archduke_recruitment_at_massif_orcal_dilemma_key",
                canSpawnFromRegion: true,
                diceRollTreshold: 1,
                specificDillemaKeys: [
                    { 
                        dilemmaKey: "admiralnelson_archduke_recruitment_at_araby_dilemma_key",
                        regionKeys: [ 
                            "wh3_main_combi_region_pools_of_despair" 
                        ]
                     }
                ],
                foreName: DUKE_LOUIS_FORENAME,
                familyName: DUKE_LOUIS_TITLE
            },
            [HECTOR_AGENT_KEY]: {
                regionKeys: [
                    "wh3_main_combi_region_skavenblight"
                ],
                defaultDilemmaKey: "admiralnelson_hector_recruitment_at_skavenblight_dilemma_key",
                canSpawnFromRegion: true,
                diceRollTreshold: 1,
                foreName: HECTOR_FORENAME,
                familyName: HECTOR_HOUSE_OF
            },
            [CLAUDIN_AGENT_KEY]: {
                regionKeys: [
                    "wh3_main_combi_region_the_estalia_coastline", 
                    "wh3_main_combi_region_luccini", 
                    "wh3_main_combi_region_bilbali", 
                    "wh3_main_combi_region_magritta", 
                    "wh3_main_combi_region_miragliano",
                    "wh3_main_combi_region_sartosa"
                ],
                defaultDilemmaKey: "admiralnelson_ogre_recruitment_at_woodelves_region_dilemma_key",
                canSpawnFromRegion: true,
                diceRollTreshold: 23,
                foreName: CLAUDIN_FORENAME,
                familyName: CLAUDIN_HOUSE_OF
            },
            [GARRAVAIN_AGENT_KEY]: {
                regionKeys: [
                    "wh3_main_combi_region_bitterstone_mine",
                    "wh3_main_combi_region_dragonhorn_mines",
                    "wh3_main_combi_region_ekrund",
                    "wh3_main_combi_region_stonemine_tower",
                    "wh3_main_combi_region_barag_dawazbag",
                    "wh3_main_combi_region_zandri"
                ],
                defaultDilemmaKey: "admiralnelson_ogre_recruitment_at_badlands_dilemma_key",
                canSpawnFromRegion: true,
                diceRollTreshold: 25,
                foreName: GARRAVAIN_FORENAME,
                familyName: GARRAVAIN_HOUSE_OF
            },
            [YVAIN_LE_BATARD_AGENT_KEY]: {
                regionKeys: [
                    "wh3_main_combi_region_isle_of_wights",
                    "wh3_main_combi_region_pack_ice_bay",
                    "wh3_main_combi_region_citadel_of_lead",
                    "wh3_main_combi_region_longship_graveyard",
                    "wh3_main_chaos_region_icedrake_fjord",
                    "wh3_main_combi_region_troll_fjord"
                ],
                defaultDilemmaKey: "admiralnelson_ogre_recruitment_at_norscan_region_dilemma_key",
                canSpawnFromRegion: true,
                diceRollTreshold: 25,
                foreName: YVAIN_FORENAME,
                familyName: YVAIN_HOUSE_OF
            },
            [LUCANT_AGENT_KEY]: {
                regionKeys: [
                    "wh3_main_combi_region_eschen",
                    "wh3_main_combi_region_mordheim",
                    "wh3_main_combi_region_castle_drakenhof",
                    "wh3_main_combi_region_castle_templehof"
                ],
                defaultDilemmaKey: "admiralnelson_ogre_recruitment_at_border_princes_and_slyvania_dilemma_key",
                canSpawnFromRegion: true,
                diceRollTreshold: 22,
                foreName: LUCANT_FORENAME,
                familyName: LUCANT_HOUSE_OF
            },
            [GORNEMANT_AGENT_KEY]: {
                regionKeys: [
                    "wh3_main_combi_region_the_black_pit",
                    "wh3_main_combi_region_weismund",
                    "wh3_main_combi_region_middenstag",
                    "wh3_main_combi_region_wreckers_point",
                    "wh3_main_combi_region_brass_keep"
                ],
                defaultDilemmaKey: "admiralnelson_ogre_recruitment_at_empire_marienberg_region_dilemma_key",
                canSpawnFromRegion: true,
                diceRollTreshold: 23,
                foreName: GORENMANT_FORENAME,
                familyName: GORNEMENT_HOUSE_OF
            }
        }

        private readonly BretonnianFactionsKeys = [
            {factionKey: "wh_main_brt_bretonnia", priority: 1},
            {factionKey: "wh_main_brt_carcassonne", priority: 2},
            {factionKey: "wh_main_brt_bordeleaux", priority: 3},
            {factionKey: "wh2_dlc14_brt_chevaliers_de_lyonesse", priority: 4},
            {factionKey: "wh2_main_brt_knights_of_origo", priority: 5},
            {factionKey: "wh2_main_brt_knights_of_the_flame", priority: 6},
            {factionKey: "wh2_main_brt_thegans_crusaders", priority: 7},
            {factionKey: "wh3_dlc20_brt_march_of_couronne", priority: 8},
            {factionKey: "wh3_main_brt_aquitaine", priority: 9},
            {factionKey: "wh_main_brt_artois", priority: 10},
            {factionKey: "wh_main_brt_bastonne", priority: 11},
        ]

        private readonly OgreMercs = [
            "wh3_main_ogr_cav_crushers_0",
            "wh3_main_ogr_cav_crushers_1",
            "wh3_main_ogr_cav_mournfang_cavalry_0",
            "wh3_main_ogr_cav_mournfang_cavalry_1",
            "wh3_main_ogr_cav_mournfang_cavalry_2",
            "wh3_main_ogr_cha_butcher_beasts_0",
            "wh3_main_ogr_cha_butcher_great_maw_0",
            "wh3_main_ogr_cha_firebelly_0",
            "wh3_main_ogr_cha_greasus_goldtooth_0",
            "wh3_main_ogr_cha_hunter_0",
            "wh3_main_ogr_cha_hunter_1",
            "wh3_main_ogr_cha_skrag_the_slaughterer_0",
            "wh3_main_ogr_cha_slaughtermaster_beasts_0",
            "wh3_main_ogr_cha_slaughtermaster_great_maw_0",
            "wh3_main_ogr_cha_tyrant_0",
            "wh3_main_ogr_feral_manticore_summoned",
            "wh3_main_ogr_inf_gnoblars_0",
            "wh3_main_ogr_inf_gnoblars_1",
            "wh3_main_ogr_inf_ironguts_0",
            "wh3_main_ogr_inf_leadbelchers_0",
            "wh3_main_ogr_inf_maneaters_0",
            "wh3_main_ogr_inf_maneaters_1",
            "wh3_main_ogr_inf_maneaters_2",
            "wh3_main_ogr_inf_maneaters_3",
            "wh3_main_ogr_inf_maneaters_summoned_0",
            "wh3_main_ogr_inf_ogres_0",
            "wh3_main_ogr_inf_ogres_1",
            "wh3_main_ogr_inf_ogres_2",
            "wh3_main_ogr_mon_giant_0",
            "wh3_main_ogr_mon_gorgers_0",
            "wh3_main_ogr_mon_gorgers_summoned_0",
            "wh3_main_ogr_mon_sabretusk_pack_0",
            "wh3_main_ogr_mon_stonehorn_0",
            "wh3_main_ogr_mon_stonehorn_1",
            "wh3_main_ogr_veh_gnoblar_scraplauncher_0",
            "wh3_main_ogr_veh_ironblaster_0",
            "wh3_twa06_ogr_inf_maneaters_ror_0",
            "wh3_twa07_ogr_cav_crushers_ror_0",
            "wh3_twa08_ogr_mon_stonehorn_0_ror",
        ]

        private readonly LouisLeGrosStartingArmy = [
            "wh_dlc07_brt_inf_battle_pilgrims_0",
            "wh_dlc07_brt_inf_battle_pilgrims_0",
            "wh_dlc07_brt_inf_battle_pilgrims_0",
            "wh_main_brt_inf_peasant_bowmen",
            "wh_main_brt_inf_peasant_bowmen",
        ]

        private readonly LouisLeGrossStartingArmyBot = [
            "wh3_main_ogr_cav_mournfang_cavalry_0",
            "wh3_main_ogr_cav_mournfang_cavalry_1",
            "wh_dlc07_brt_cav_grail_guardians_0",
            "wh_dlc07_brt_cav_grail_guardians_0",
            "wh_dlc07_brt_cav_grail_guardians_0",
        ]

        private readonly PeasantSlotPenaltySkills = [
            {skill: CIVILISED_SKILL_KEY, penalty: -1 },
            {skill: OGRE_SKILL_KEY, penalty: 5},
            {skill: GREATER_GIRTH_SKILL_KEY, penalty: 2},
            {skill: LOUIS_MOUNT_SKILL_KEY, penalty: 2},
            //the rest of grail skill put it here
        ]

        private readonly ChivalryPointModifierSkills = [
            {skill: OGRE_SKILL_KEY, chivalry: -40}
        ]

        private readonly MapTraitLevelToSlotPenaltyReduction = new Map<number, number>([
            [1 , -1],
            [2 , -1],
            [3 , -2],
        ])

        private cachedPeasantQuota = {
            used: 0, free: 0
        }

        GetPeasantSlotsUsedByOgres(): number {
            const ogres = OgreSpawner.FindAllOgres()
            let totalPeasantsUsedByOgres = 0
            for (const theOgre of ogres) {
                this.l.Log(`GetPeasantSlotsUsedByOgres - iterating ${theOgre.SubtypeKey} ${theOgre.LocalisedFullName}`)
                for (const skill of this.PeasantSlotPenaltySkills) {
                    this.l.Log(`    skill: ${skill.skill}? ${theOgre.HasSkill(skill.skill) ? skill.penalty : "nope"}`)
                    totalPeasantsUsedByOgres += theOgre.HasSkill(skill.skill) ? skill.penalty : 0
                }                
                const traitLevel = theOgre.GetTraitLevel(PEASANT_REDUCTION_TRAIT_KEY)
                let traitLevel2PeasantUsageReduction = this.MapTraitLevelToSlotPenaltyReduction.get(traitLevel) ?? 0
                if(theOgre.HasTrait(PEASANT_REDUCTION_TRAIT_NOT_COMMITTED_YET_KEY)) traitLevel2PeasantUsageReduction++
                this.l.Log(`GetPeasantSlotsUsedByOgres - trait level ${PEASANT_REDUCTION_TRAIT_KEY} = ${traitLevel} traitLevel2PeasantUsageReduction=${traitLevel2PeasantUsageReduction} PEASANT_REDUCTION_TRAIT_NOT_COMMITTED_YET_KEY=${theOgre.HasTrait(PEASANT_REDUCTION_TRAIT_NOT_COMMITTED_YET_KEY)}`)

                totalPeasantsUsedByOgres += traitLevel2PeasantUsageReduction
            }
            return totalPeasantsUsedByOgres
        }

        ClearAllPenalties(): void {
            if(OgreSpawner.DesignatedFaction == null) {
                this.l.LogError(`ClearAllPenalties - OgreSpawner.DesignatedFaction == null, perhaps no bretonnia faction left?`)
                return
            }
            const effectBundles = OgreSpawner.DesignatedFaction.EffectBundles
            for (const key of effectBundles) {
                if(key.startsWith(PEASANTS_EFFECT_PREFIX)) OgreSpawner.DesignatedFaction.RemoveEffectBundle(key)
            }
        }

        GetAndUpdateCurrentPeasantSlotsUsage(): [peasantCount: number, peasantCap: number] {
            if(OgreSpawner.DesignatedFaction == null) {
                this.l.LogError(`GetAndUpdateCurrentPeasantSlotsUsage - no designated bretonnian faction, perhaps dead?`)
                return [0, 0]
            }
            if(!OgreSpawner.DesignatedFaction.IsHuman) return [0, 0]

            const factionKey = OgreSpawner.DesignatedFaction.FactionKey
            Calculate_Economy_Penalty(OgreSpawner.DesignatedFaction.GetFactionInterface())
            return [common.get_context_value(`ScriptObjectContext("peasant_count_${factionKey}").NumericValue`) as number, 
                    common.get_context_value(`ScriptObjectContext("peasant_cap_${factionKey}").NumericValue`) as number]
        }

        CalculatePeasantSlotsUsageAndApplyPenalties(): void {
            if(OgreSpawner.DesignatedFaction == null) {
                this.l.LogError(`CalculatePeasantSlotsUsage - no designated bretonnian faction, perhaps dead?`)
                return
            }
            if(!OgreSpawner.DesignatedFaction.IsHuman) return

            const factionKey = OgreSpawner.DesignatedFaction.FactionKey
            const [currentPeasantUsageCount, freePeasantCount] = this.GetAndUpdateCurrentPeasantSlotsUsage()
            this.cachedPeasantQuota = {used: currentPeasantUsageCount, free: freePeasantCount }
            const peasantsAllocatedByOgre = this.GetPeasantSlotsUsedByOgres()
            const totalAllocatedPeasants = currentPeasantUsageCount + peasantsAllocatedByOgre
            common.set_context_value(`peasant_count_${factionKey}`, totalAllocatedPeasants)
            this.l.Log(`CalculatePeasantSlotsUsage currentPeasantUsageCount=${currentPeasantUsageCount} peasantsAllocatedByOgre=${peasantsAllocatedByOgre} totalAllocatedPeasants=${totalAllocatedPeasants}`)

            //clear all penalties first
            this.ClearAllPenalties()

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
                OgreSpawner.DesignatedFaction.ApplyEffectBundle(`${PEASANTS_EFFECT_PREFIX}${peasantPercent}`, 0)
                
                if (!localStorage.getItem("ScriptEventNegativePeasantEconomy") &&
                    OgreSpawner.DesignatedFaction.IsHuman) {
                    core.trigger_event("ScriptEventNegativePeasantEconomy")
                    localStorage.setItem("ScriptEventNegativePeasantEconomy", true)
                }
                
                const peasantRatioPositive = localStorage.getItem(`peasants_ratio_positive_${factionKey}`)
                
                if ((peasantRatioPositive || peasantRatioPositive == null) &&
                     !localStorage.getItem(`peasant_warning_event_shown_${factionKey}`)) {
                    OgreSpawner.DesignatedFaction.ShowMessageEvent(
                        "event_feed_strings_text_wh_dlc07_event_feed_string_scripted_event_peasant_negative_title",
                        "event_feed_strings_text_wh_dlc07_event_feed_string_scripted_event_peasant_negative_primary_detail",
                        "event_feed_strings_text_wh_dlc07_event_feed_string_scripted_event_peasant_negative_secondary_detail",
                        true,
                        703
                    )
                    localStorage.setItem(`peasant_warning_event_shown_${factionKey}`, true)
                    OgreSpawner.DesignatedFaction.AddTurnCountdownEvent(25, "ScriptEventPeasantWarningEventCooldownExpired", factionKey)
                }                    
                
                localStorage.setItem(`peasants_ratio_positive_${factionKey}`, false)
            } else {
                this.l.Log("Peasant Percent Final: 0")
                this.ClearAllPenalties()
                OgreSpawner.DesignatedFaction.ApplyEffectBundle(`${PEASANTS_EFFECT_PREFIX}0`, 0)
            
                if (localStorage.getItem("ScriptEventNegativePeasantEconomy") && 
                    !localStorage.getItem("ScriptEventPositivePeasantEconomy") &&
                    OgreSpawner.DesignatedFaction.IsHuman) {
                    core.trigger_event("ScriptEventPositivePeasantEconomy")
                    localStorage.setItem("ScriptEventPositivePeasantEconomy", true)
                }                
                localStorage.setItem(`peasants_ratio_positive_${factionKey}`, true)
            }
            
        }

        GiveOgreLessPenaltiesForCompletingGrailQuests(whichOgre: Character, whatQuest: "KnightsVow" | "QuestingVow" | "GrailVow"): void {
            if(this.OgreLordsAndChampions[whichOgre.SubtypeKey] == null) {
                this.l.LogError(`whichOgre param (${whichOgre.SubtypeKey}) is not defined in this.OgreChampions ${JSON.stringify(this.OgreLordsAndChampions)} array`)
                return
            }
            this.l.LogWarn(`GiveOgreLessPenaltiesForCompletingGrailQuests triggered. whichOgre ${whichOgre.SubtypeKey} whatQuest ${whatQuest}`)
            if(whichOgre.HasTrait(PEASANT_REDUCTION_TRAIT_NOT_COMMITTED_YET_KEY)) whichOgre.RemoveTrait(PEASANT_REDUCTION_TRAIT_NOT_COMMITTED_YET_KEY)
            whichOgre.AddTrait(PEASANT_REDUCTION_TRAIT_KEY, true, 1)            
            this.CalculatePeasantSlotsUsageAndApplyPenalties()
        }

        DisableLouisMountSkillNode() {
            //check if this Louis or not?
            const theObject = find_uicomponent(core.get_ui_root(), 
                "character_details_panel", 
                "character_context_parent")

            //disable AI skill auto manage on Louis only.
            const autoManagementButton = find_uicomponent(core.get_ui_root(),  
                "character_details_panel", 
                "character_context_parent", 
                "tab_panels", 
                "skills_subpanel",
                "auto_management_holder")

            if(theObject) {
                const context = theObject.GetContextObject("CcoCampaignCharacter")
                const agentKey = context?.Call("AgentSubtypeRecordContext().Key") as string
                if(agentKey != DUKE_LOUIS_AGENT_KEY) {
                    if(autoManagementButton) autoManagementButton.PropagateVisibility(true)
                    return
                }

                //if louis

                //hide automanage button
                if(autoManagementButton) autoManagementButton.PropagateVisibility(false)
                
                const cqi = context?.Call(`CQI()`) as number
                const theCharacter = FindCharacter(cqi)
                if(theCharacter) {
                    if(OgrePaladinVowHandler.IsQuestingVowOK(theCharacter) || 
                       OgrePaladinVowHandler.IsGrailVowOK(theCharacter)) return
                }
            }

            //disable his mount skill
            const theSkillButton = find_uicomponent(core.get_ui_root(), 
                "character_details_panel", 
                "character_context_parent", 
                "tab_panels", 
                "skills_subpanel", 
                "listview", 
                "list_clip", 
                "list_box", 
                "chain0", 
                "chain", 
                "admiralnelson_louis_mount_unlock_item_skill_key", 
                "card")
            if(theSkillButton) {
                this.l.LogWarn(theSkillButton.CurrentState())
                theSkillButton.SetState("locked_rank")
            }

        }

        GetOgresChivalryPointsFromModTraits(): number {
            const ogres = OgreSpawner.FindAllOgres()
            let totalChivalryPoints = 0
            for (const iterator of ogres) {
                this.l.Log(`GetOgresChivalryPointsFromModTraits - iterating ${iterator.SubtypeKey}`)
                for (const skillmod of this.ChivalryPointModifierSkills) {
                    if(iterator.HasSkill(skillmod.skill)) {
                        totalChivalryPoints += skillmod.chivalry
                        this.l.Log(`                              iterator.has_skill ${skillmod.skill} ${iterator.HasSkill(skillmod.skill)} => ${skillmod.chivalry}`)
                    }
                }
                const traitLevel = iterator.GetTraitLevel(PEASANT_REDUCTION_TRAIT_KEY)
                const traitLevel2ChivalryPoints = this.MapTraitLevelToSlotPenaltyReduction.get(traitLevel) ?? 0
                this.l.Log(`                                      trait level ${PEASANT_REDUCTION_TRAIT_KEY} = ${traitLevel} traitLevel2ChivalryPoints=${traitLevel2ChivalryPoints}`)
                totalChivalryPoints += traitLevel2ChivalryPoints
            }
            return totalChivalryPoints
        }

        UnlockGrailVowsForBot(ogre: Character) {
            if(OgreSpawner.DesignatedFaction == null) return
            if(OgreSpawner.DesignatedFaction.IsHuman) return

            OgrePaladinVowHandler.UnlockAllVows(ogre)
        }

        OnOgreSpawned(character: Character) {
            //duke louis
            if(character.SubtypeKey == DUKE_LOUIS_AGENT_KEY) {
                const lord = TryCastCharacterToLord(character)
                if(lord) {
                    if(lord.Faction.IsHuman) lord.AddTroops(this.LouisLeGrosStartingArmy)
                    else lord.AddTroops(this.LouisLeGrossStartingArmyBot)
                }
            }

            //if hector dont'r recover action points
            if(character.Faction.IsHuman && character.SubtypeKey == HECTOR_AGENT_KEY) return
            
            character.ResetActionPoints()

            if(!character.Faction.IsHuman) {
                //unlock all the vows
                this.UnlockGrailVowsForBot(character)
                //turn off their  wages

                //a bit cheaty? unlock his combat skill tree?

                return
            }

            //only human can run this function
            setTimeout(() => this.CalculatePeasantSlotsUsageAndApplyPenalties(), 500)
        }

        Init(): void {
            this.FirstTimeSetup()
           
            this.SetupOnOgreChampionSpawned()
            this.SetupOnSkillAllocated()
            this.SetupOnCharacterRankUp()
            this.SetupGiveOgreLessPenaltiesForCompletingGrailQuests()
            this.SetupOnFactionTurnStart()
            this.SetupOnFactionTurnEnd()
            this.SetupOnCharacterLevelPaneDisableLouisMount()        
            this.SetupOgreVowHandler()    
            this.SetupOgreSpawner()
            /** START TEST SUITE */
            // if(OgreSpawner.FindAllOgres().length == 0 && DEBUG) {
            //     OgreSpawner.DesignatedFaction?.ApplyEffectBundle("admiralnelson_ogre_low_upkeep_for_ogre_heroes_for_AI_bundle_key")
            //     StartTestSuite(this)
            // }
            
            //StartTestSuite2()
            
            
        }

        FirstTimeSetup(): void {
            this.l.LogWarn(`Running Knights of The Round Belly (Typescript Edition) version ${VERSION}`)
            this.l.Log("FirstTimeSetup ok")
        }

        SetupOnOgreChampionSpawned() {
            core.add_listener(
                "Admiralnelson OnOgreChampionSpawned",
                "CharacterRecruited",
                (context) => {
                    const character = context.character ? context.character().character_subtype_key() : "none"
                    return this.OgreLordsAndChampions[character] != null
                },
                (_) => {
                    this.l.LogWarn(`GetOgresChivalryPointsFromModTraits ${this.GetOgresChivalryPointsFromModTraits()}`)
                },
                true
            )
            this.l.Log("SetupOnOgreChampionSpawned ok")
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
                () => {
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
                    return this.OgreLordsAndChampions[theOgreKey] != null
                },
                (context) => {
                    const theOgre = context.character? context.character() : null
                    if(theOgre == null) return

                    this.GiveOgreLessPenaltiesForCompletingGrailQuests(new Character({characterObject: theOgre}), "KnightsVow")
                }, 
                true
            )
            core.add_listener(
                "Admiralnelson SetupGiveOgreLessPenaltiesForCompletingGrailQuests0",
                "ScriptEventBretonniaQuestingVowCompleted",
                (context) => {
                    const theOgreKey = context.character? context.character().character_subtype_key() : ""
                    return this.OgreLordsAndChampions[theOgreKey] != null
                },
                (context) => {
                    const theOgre = context.character? context.character() : null
                    if(theOgre == null) return

                    this.GiveOgreLessPenaltiesForCompletingGrailQuests(new Character({characterObject: theOgre}), "QuestingVow")
                }, 
                true
            )
            core.add_listener(
                "Admiralnelson SetupGiveOgreLessPenaltiesForCompletingGrailQuests2",
                "ScriptEventBretonniaGrailVowCompleted",
                (context) => {
                    const theOgreKey = context.character? context.character().character_subtype_key() : ""
                    return this.OgreLordsAndChampions[theOgreKey] != null
                },
                (context) => {
                    const theOgre = context.character? context.character() : null
                    if(theOgre == null) return

                    this.GiveOgreLessPenaltiesForCompletingGrailQuests(new Character({characterObject: theOgre}), "GrailVow")
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

                    return OgreSpawner.DesignatedFaction?.FactionKey == faction.name()
                },
                () => this.CalculatePeasantSlotsUsageAndApplyPenalties(),
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

                    return OgreSpawner.DesignatedFaction?.FactionKey == faction.name()
                },
                () => this.CalculatePeasantSlotsUsageAndApplyPenalties(),
                true
            )

            this.l.Log("SetupOnFactionTurnEnd ok")
        }

        SetupOnCharacterLevelPaneDisableLouisMount() {
            core.add_listener(
                "admiralnelson SetupOnCharacterLevelPaneDisableLouisMount",
                "PanelOpenedCampaign",
                (context) => context.string ? (context.string == "character_details_panel") : false,
                () => {
                    this.l.LogWarn(`character_details_panel was opened`)
                    this.DisableLouisMountSkillNode()
                },
                true
            )
            core.add_listener(
                "admiralnelson SetupOnCharacterLevelPaneDisableLouisMount 2",
                "ComponentLClickUp",
                (context) => {
                    if(context.string == null) return false
                    return context.string == "button_cycle_right" || context.string == "button_cycle_left"
                },                    
                () => {
                    this.l.LogWarn(`ComponentLClickUp was clicked`)
                    this.DisableLouisMountSkillNode()
                },
                true
            )
            
            this.l.Log(`SetupOnCharacterLevelPaneDisableLouisMount ok`)
        }

        SetupOgreVowHandler(): void {
            for (const key of Object.keys(this.OgreLordsAndChampions)) {                
                OgrePaladinVowHandler.AllowedOgreAgentKeys.add(key)
            }
            OgrePaladinVowHandler.Init()
            this.l.Log(`SetupOgreVowHandler ok`)
        }

        SetupOgreSpawner(): void {
            OgreSpawner.OgreMercenariesUnitKeys = this.OgreMercs
            OgreSpawner.OgreRecruitmentDilemmaOnArmy = BRETONNIA_OGRE_RECRUITMENT_DILEMMA
            
            OgreSpawner.AddOgreLord(DUKE_LOUIS_AGENT_KEY, this.OgreLordsAndChampions[DUKE_LOUIS_AGENT_KEY])

            OgreSpawner.AddOgreChampion(HECTOR_AGENT_KEY, this.OgreLordsAndChampions[HECTOR_AGENT_KEY])
            OgreSpawner.AddOgreChampion(LUCANT_AGENT_KEY, this.OgreLordsAndChampions[LUCANT_AGENT_KEY])
            OgreSpawner.AddOgreChampion(CLAUDIN_AGENT_KEY, this.OgreLordsAndChampions[CLAUDIN_AGENT_KEY])
            OgreSpawner.AddOgreChampion(GARRAVAIN_AGENT_KEY, this.OgreLordsAndChampions[GARRAVAIN_AGENT_KEY])
            OgreSpawner.AddOgreChampion(YVAIN_LE_BATARD_AGENT_KEY, this.OgreLordsAndChampions[YVAIN_LE_BATARD_AGENT_KEY])
            OgreSpawner.AddOgreChampion(GORNEMANT_AGENT_KEY, this.OgreLordsAndChampions[GORNEMANT_AGENT_KEY])
            
            OgreSpawner.OnOgreSpawnEvent = (character) => {
                this.l.Log(`character has spawned ${character.LocalisedFullName} ${character.SubtypeKey}`)
                this.OnOgreSpawned(character)
            }
            OgreSpawner.OnDesignatedFactionChangeSuccessEvent = (faction) => {
                this.l.Log(`designated faction is ${faction.FactionKey}`)
                if(!faction.IsHuman) faction.ApplyEffectBundle(LOW_UPKEEP_FOR_AI_KEY)
            }

            OgreSpawner.InitialiseForTheFirstTime(this.BretonnianFactionsKeys)
            OgreSpawner.Init()
            
            //setInterval(() => this.CalculatePeasantSlotsUsageAndApplyPenalties(), 500) dont
            if(OgreSpawner.DesignatedFaction?.IsHuman) {
                setInterval(() => this.CalculatePeasantSlotsUsageAndApplyPenalties(), 500)
            }

            this.l.Log(`SetupOgreSpawner ok`)
        }

        constructor() {
            OnCampaignStart( () => this.Init() )
        }
    }
    
    new KnightsOfTheRoundBelly()
}