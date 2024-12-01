namespace AdmiralNelsonKnightsOfTheRoundBelly {

    export const VERSION = 1

    const VERBOSE = false

    const RPC_TRIGGER_KEYWORD = "admRPC_RefreshOgres"

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

    const LOUIS_MOUNT_KEY_FOR_BOT = "admiralnelson_louis_steed_anciliary_key"
    const LOUIS_MACE_KEY_FOR_BOT = "admiralnelson_louis_grand_mace_doombringer"
    
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
                    //"wh3_main_combi_region_languille",
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
            {factionKey: "mixer_brt_montfort", priority: 12},
            {factionKey: "mixer_brt_gisoreux", priority: 13},
            {factionKey: "mixer_brt_quenelles", priority: 14},
            {factionKey: "mixer_brt_languille", priority: 15},
            {factionKey: "mixer_brt_brionne", priority: 16},
            {factionKey: "mixer_brt_uprising", priority: 17},
            {factionKey: "mixer_brt_peasantry", priority: 18},
            {factionKey: "mixer_brt_bertrand", priority: 19},
            {factionKey: "mixer_brt_brionne", priority: 20},
            {factionKey: "mixer_brt_languille", priority: 21},
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

        VerbosePrint(str: string): void {
            if(VERBOSE) this.l.Log(str)
        }

        RPCSyncVariables(): void {
            this.l.LogWarn(`request to trigger Remote Procedure call was triggered`)
            const factionCQI = OgreSpawner.DesignatedFaction?.CQI ?? -1
            CampaignUI.TriggerCampaignScriptEvent(factionCQI, RPC_TRIGGER_KEYWORD)
        }

        GetPeasantSlotsUsedByOgres(): number {
            const ogres = OgreSpawner.FindAllOgres()
            let totalPeasantsUsedByOgres = 0
            for (const theOgre of ogres) {
                this.VerbosePrint(`GetPeasantSlotsUsedByOgres - iterating ${theOgre.SubtypeKey} ${theOgre.LocalisedFullName}`)
                for (const skill of this.PeasantSlotPenaltySkills) {
                    this.VerbosePrint(`    skill: ${skill.skill}? ${theOgre.HasSkill(skill.skill) ? skill.penalty : "nope"}`)
                    totalPeasantsUsedByOgres += theOgre.HasSkill(skill.skill) ? skill.penalty : 0
                }                
                const traitLevel = theOgre.GetTraitLevel(PEASANT_REDUCTION_TRAIT_KEY)
                let traitLevel2PeasantUsageReduction = this.MapTraitLevelToSlotPenaltyReduction.get(traitLevel) ?? 0
                if(theOgre.HasTrait(PEASANT_REDUCTION_TRAIT_NOT_COMMITTED_YET_KEY)) traitLevel2PeasantUsageReduction++
                this.VerbosePrint(`GetPeasantSlotsUsedByOgres - trait level ${PEASANT_REDUCTION_TRAIT_KEY} = ${traitLevel} traitLevel2PeasantUsageReduction=${traitLevel2PeasantUsageReduction} PEASANT_REDUCTION_TRAIT_NOT_COMMITTED_YET_KEY=${theOgre.HasTrait(PEASANT_REDUCTION_TRAIT_NOT_COMMITTED_YET_KEY)}`)

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
            this.VerbosePrint(`CalculatePeasantSlotsUsage currentPeasantUsageCount=${currentPeasantUsageCount} peasantsAllocatedByOgre=${peasantsAllocatedByOgre} totalAllocatedPeasants=${totalAllocatedPeasants}`)

            //clear all penalties first
            this.ClearAllPenalties()

            //apply the penalties
            let peasantPercent = (totalAllocatedPeasants / freePeasantCount) * 100
            this.VerbosePrint(`Peasant Percent: ${peasantPercent}%`)
            peasantPercent = Math.floor(peasantPercent)
            this.VerbosePrint(`Peasant Percent Rounded: ${peasantPercent}%`)
            peasantPercent = Math.min(peasantPercent, 200)
            this.VerbosePrint(`Peasant Percent Clamped: ${peasantPercent}%`)

            if(peasantPercent > 100) {
                peasantPercent -= 100
                this.VerbosePrint(`Peasant Percent Final: ${peasantPercent}%`)
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
                this.l.Log(`CalculatePeasantSlotsUsageAndApplyPenalties was triggered peasantPercent ${peasantPercent}%`)
            } else {
                this.VerbosePrint("Peasant Percent Final: 0")
                this.ClearAllPenalties()
                OgreSpawner.DesignatedFaction.ApplyEffectBundle(`${PEASANTS_EFFECT_PREFIX}0`, 0)
        
                if (localStorage.getItem("ScriptEventNegativePeasantEconomy") && 
                    !localStorage.getItem("ScriptEventPositivePeasantEconomy") &&
                    OgreSpawner.DesignatedFaction.IsHuman) {
                    core.trigger_event("ScriptEventPositivePeasantEconomy")
                    localStorage.setItem("ScriptEventPositivePeasantEconomy", true)
                }                
                localStorage.setItem(`peasants_ratio_positive_${factionKey}`, true)
                this.l.Log(`CalculatePeasantSlotsUsageAndApplyPenalties was triggered peasantPercent ${0}%`)
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

            //resync the variables
            this.RPCSyncVariables()
        }

        DisableLouisMountSkillNodeAndDukeOfGirthSkillNode() {
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

            if(theObject == false) return

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

            if(!theCharacter) {
                return
            }
        

            //disable his mount skill
            const mountSkillButton = find_uicomponent(core.get_ui_root(), 
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
            if(mountSkillButton && theCharacter.GetTraitLevel(PEASANT_REDUCTION_TRAIT_KEY) < 2) {
                mountSkillButton.SetState("locked_rank")
            }

             //disable his duke of girth skill
             const dukeOfGirthSkillButton = find_uicomponent(core.get_ui_root(), 
             "character_details_panel", 
             "character_context_parent", 
             "tab_panels", 
             "skills_subpanel", 
             "listview", 
             "list_clip", 
             "list_box", 
             "chain0", 
             "chain", 
             "admiralnelson_ogre_louis_role_model_skill_key", 
             "card")
            if(dukeOfGirthSkillButton && theCharacter.GetTraitLevel(PEASANT_REDUCTION_TRAIT_KEY) < 3) {
                dukeOfGirthSkillButton.SetState("locked_rank")
            }

        }

        GetOgresChivalryPointsFromModTraits(): number {
            const ogres = OgreSpawner.FindAllOgres()
            let totalChivalryPoints = 0
            for (const iterator of ogres) {
                this.VerbosePrint(`GetOgresChivalryPointsFromModTraits - iterating ${iterator.SubtypeKey}`)
                for (const skillmod of this.ChivalryPointModifierSkills) {
                    if(iterator.HasSkill(skillmod.skill)) {
                        totalChivalryPoints += skillmod.chivalry
                        this.VerbosePrint(`                              iterator.has_skill ${skillmod.skill} ${iterator.HasSkill(skillmod.skill)} => ${skillmod.chivalry}`)
                    }
                }
                const traitLevel = iterator.GetTraitLevel(PEASANT_REDUCTION_TRAIT_KEY)
                const traitLevel2ChivalryPoints = this.MapTraitLevelToSlotPenaltyReduction.get(traitLevel) ?? 0
                this.VerbosePrint(`                                      trait level ${PEASANT_REDUCTION_TRAIT_KEY} = ${traitLevel} traitLevel2ChivalryPoints=${traitLevel2ChivalryPoints}`)
                totalChivalryPoints += traitLevel2ChivalryPoints
            }
            return totalChivalryPoints
        }

        UnlockLouisVowsForBot(louis: Character) {
            if(louis.Faction.IsHuman) return
            if(louis.SubtypeKey != DUKE_LOUIS_AGENT_KEY) return

            const trait1 = "wh_dlc07_trait_brt_knights_vow_chivalry_pledge"
            for (let i = 0; i < 7; i++) {
                louis.AddTrait(trait1, false) 
            }

            const trait2 = "wh_dlc07_trait_brt_questing_vow_campaign_pledge"
            for (let i = 0; i < 3; i++) {
                louis.AddTrait(trait2, false)
            }

            const trait3 = "wh_dlc07_trait_brt_grail_vow_valour_pledge"
            for (let i = 0; i < 7; i++) {
                louis.AddTrait(trait3, false)
            }

            this.l.Log(`UnlockLouisVowsForBot louis unlocked!`)
            this.l.Log(`${JSON.stringify(louis.Traits)}`)
        }

        UnlockGrailVowsForBot(ogre: Character) {
            if(OgreSpawner.DesignatedFaction == null) return
            if(OgreSpawner.DesignatedFaction.IsHuman) return

            if(ogre.SubtypeKey != DUKE_LOUIS_AGENT_KEY) OgrePaladinVowHandler.UnlockAllVows(ogre)
            else this.UnlockLouisVowsForBot(ogre)
        }

        OnOgreSpawned(character: Character) {
            //if hector dont'r recover action points
            if(!character.Faction.IsHuman || character.SubtypeKey != HECTOR_AGENT_KEY) character.ResetActionPoints()

            if(character.Faction.IsHuman) character.AddTrait(PEASANT_REDUCTION_TRAIT_NOT_COMMITTED_YET_KEY)

            if(!character.Faction.IsHuman) this.UnlockGrailVowsForBot(character)
            
            //duke louis
            if(character.SubtypeKey == DUKE_LOUIS_AGENT_KEY) {
                const lord = TryCastCharacterToLord(character)
                if(lord) {
                    if(lord.Faction.IsHuman) lord.AddTroops(this.LouisLeGrosStartingArmy)
                    else lord.AddTroops(this.LouisLeGrossStartingArmyBot)

                    if(lord.Faction.IsHuman) lord.Faction.TriggerMission(LOUIS_MISSION_KEY, true)
                    else {
                        lord.AddSkill(LOUIS_MOUNT_SKILL_KEY)
                        lord.GiveItem(LOUIS_MACE_KEY_FOR_BOT)
                    }
                }

            }

            //only human can run this function
            if(character.Faction.IsHuman) setTimeout(() => {
                this.CalculatePeasantSlotsUsageAndApplyPenalties()

                //and finally resync the variables
                this.RPCSyncVariables()
            }, 500)
        }

        Init(): void {
            this.FirstTimeSetup()
           
            this.SetupOnOgreChampionSpawned()
            this.SetupGiveOgreLessPenaltiesForCompletingGrailQuests()
            this.SetupOnFactionTurnStart()
            this.SetupOnFactionTurnEnd()
            this.SetupOnCharacterLevelPaneDisableLouisSkill()        
            this.SetupOgreVowHandler()    
            this.SetupOgreSpawner()
            this.SetupUpdatePeasantSlotUsage()
            this.SetupRemoteProcedureCalls()
            this.SetupDebugConsole()
            /** START TEST SUITE */
            // if(OgreSpawner.FindAllOgres().length == 0) {
            //     OgreSpawner.DesignatedFaction?.ApplyEffectBundle("admiralnelson_ogre_low_upkeep_for_ogre_heroes_for_AI_bundle_key")
            //     StartTestSuite(this)
            // }
            
            //StartTestSuite2()
            
            
        }

        FirstTimeSetup(): void {
            this.l.LogWarn(`Running Knights of The Round Belly (Typescript Edition) version ${VERSION}`)
            this.l.Log("FirstTimeSetup ok")
            this.l.Log(`Log date is ${Date.now().toISOString()}`)
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

        SetupOnCharacterLevelPaneDisableLouisSkill() {
            core.add_listener(
                "admiralnelson SetupOnCharacterLevelPaneDisableLouisSkill",
                "PanelOpenedCampaign",
                (context) => context.string ? (context.string == "character_details_panel") : false,
                () => setTimeout(() => this.DisableLouisMountSkillNodeAndDukeOfGirthSkillNode(), 200),
                true
            )
            core.add_listener(
                "admiralnelson SetupOnCharacterLevelPaneDisableLouisSkill 2",
                "ComponentLClickUp",
                true,                    
                () => setTimeout(() => this.DisableLouisMountSkillNodeAndDukeOfGirthSkillNode(), 200),
                true
            )
            
            this.l.Log(`SetupOnCharacterLevelPaneDisableLouisSkill ok`)
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
                this.l.Log(`designated faction is ${faction.FactionKey} is human? ${faction.IsHuman}`)
                if(!faction.IsHuman) faction.ApplyEffectBundle(LOW_UPKEEP_FOR_AI_KEY)
            }

            OgreSpawner.InitialiseForTheFirstTime(this.BretonnianFactionsKeys)
            OgreSpawner.Init()

            this.l.Log(`SetupOgreSpawner ok`)
        }

        SetupUpdatePeasantSlotUsage(): void {
            // during startup
            setTimeout(() => this.CalculatePeasantSlotsUsageAndApplyPenalties(), 300)
            // just do this on every on click lmao
            core.add_listener(
                "update peasant slot usage on click",
                "ComponentLClickUp",
                true,
                () => setTimeout(() => {
                    this.CalculatePeasantSlotsUsageAndApplyPenalties()
                    //sync variables
                    this.RPCSyncVariables()                    
                }, 100),
                true
            )

            this.l.Log(`SetupUpdatePeasantSlotUsage ok`)
        }

        SetupRemoteProcedureCalls(): void {
            core.add_listener(
                "remote procedure call on update peasant slot usage",
                "UITrigger",
                context => {
                    if(context.trigger == null) return false
                    return context.trigger() == RPC_TRIGGER_KEYWORD
                },
                () => {
                    this.l.LogWarn(`Remote Procedure call was triggered!`)
                    this.CalculatePeasantSlotsUsageAndApplyPenalties()
                },
                true
            )

            this.l.Log(`SetupRemoteProcedureCalls ok`);
        }

        SetupDebugConsole(): void {
            ConsoleHandler.Register(`kotr%-reset%-vow "(.*)" (.*)`, (param) => {
                if(param.length != 2) return

                const characterName = param[0].replaceAll(`"`, ``).trim()
                const vowType = param[1]
                switch (vowType) {
                    case "knightvow":
                    case "questingvow":
                    case "grailvow":
                    case "complete":
                        break
                    default:
                        alert(`invalid 2nd parameter. expected: knightvow|questingvow|grailvow|complete`)
                        return
                }

                const ogres = OgreSpawner.FindAllOgres()
                const targetOgre = ogres.find( ogre => ogre.LocalisedFullName == characterName )
                if(targetOgre == null) {
                    alert(`unable to find "${characterName}" in the system`)
                    return
                }
                if(targetOgre.SubtypeKey == DUKE_LOUIS_AGENT_KEY) {
                    alert(`does not work for His Enormity, Louis le Gros`)
                    return
                }

                targetOgre.AddTrait(PEASANT_REDUCTION_TRAIT_NOT_COMMITTED_YET_KEY, false)
                OgrePaladinVowHandler.ResetVow(targetOgre, vowType)
                switch (vowType) {
                    case "questingvow":
                        targetOgre.RemoveTrait(PEASANT_REDUCTION_TRAIT_NOT_COMMITTED_YET_KEY)
                        targetOgre.RemoveTrait(PEASANT_REDUCTION_TRAIT_KEY)
                        targetOgre.AddTrait(PEASANT_REDUCTION_TRAIT_KEY, true, 1)     
                    case "grailvow":
                        targetOgre.RemoveTrait(PEASANT_REDUCTION_TRAIT_NOT_COMMITTED_YET_KEY)
                        targetOgre.RemoveTrait(PEASANT_REDUCTION_TRAIT_KEY)
                        targetOgre.AddTrait(PEASANT_REDUCTION_TRAIT_KEY, true, 2)
                    case "complete":
                        targetOgre.RemoveTrait(PEASANT_REDUCTION_TRAIT_NOT_COMMITTED_YET_KEY)
                        targetOgre.RemoveTrait(PEASANT_REDUCTION_TRAIT_KEY)
                        targetOgre.AddTrait(PEASANT_REDUCTION_TRAIT_KEY, true, 3)
                        break
                    default:
                }
                alert(`This ogre champion ${targetOgre.LocalisedFullName} vow has been reset to ${vowType}.\n See console log for details`)
                
            })

            ConsoleHandler.Register(`kotr%-spawn%-louis`, () => {
                if(OgreSpawner.DesignatedFaction == null) {
                    alert(`unable to spawn Louis le Gros as his faction doesn't exist anymore`)
                    return
                }
                const findLouis = OgreSpawner.FindAllOgres().find( ogre => ogre.SubtypeKey == DUKE_LOUIS_AGENT_KEY )
                if(findLouis) {
                    alert(`can't spawn Louis le Gros because He is already here`)
                    return
                }
                const factionLeader = OgreSpawner.DesignatedFaction.FactionLeader
                if(factionLeader == null) {
                    alert(`can't spawn Louis le Gros because can't locate the faction leader`)
                    return
                }
                const lord = TryCastCharacterToLord(factionLeader)
                if(lord == null) {
                    alert(`an error occured when casting faction leader to Lord object`)
                    return
                }

                OgreSpawner.SpawnOgre(lord, DUKE_LOUIS_AGENT_KEY, true)
            })

            ConsoleHandler.Register(`kotr%-spawn%-champion (.*)`, (param) => {
                if(OgreSpawner.DesignatedFaction == null) {
                    alert(`unable to spawn ogre champion as his faction doesn't exist anymore`)
                    return
                }

                if(param.length != 1) return
                const agentKey = param[0]

                if(agentKey == DUKE_LOUIS_AGENT_KEY) {
                    alert(`cannot spawn His Enormity, Louis le Gros. Use 'kotr-spawn-louis' instead`)
                    return
                }

                const findOgre = OgreSpawner.FindAllOgres().find( ogre => ogre.SubtypeKey == agentKey )
                if(findOgre) {
                    alert(`can't spawn ${agentKey} because he is already here: ${findOgre.LocalisedFullName}`)
                    return
                }
                const factionLeader = OgreSpawner.DesignatedFaction.FactionLeader
                if(factionLeader == null) {
                    alert(`can't spawn ogre champion because can't locate the faction leader`)
                    return
                }
                const lord = TryCastCharacterToLord(factionLeader)
                if(lord == null) {
                    alert(`an error occured when casting faction leader to Lord object`)
                    return
                }
                if(this.OgreLordsAndChampions[agentKey] == null) {
                    alert(`invalid champion agent key. possible values: ${HECTOR_AGENT_KEY},${LUCANT_AGENT_KEY},${CLAUDIN_AGENT_KEY},${GARRAVAIN_AGENT_KEY},${GORNEMANT_AGENT_KEY}`)
                    this.l.Log(`invalid champion agent key. possible values: ${HECTOR_AGENT_KEY},${LUCANT_AGENT_KEY},${CLAUDIN_AGENT_KEY},${GARRAVAIN_AGENT_KEY},${GORNEMANT_AGENT_KEY}`)
                    return
                }

                OgreSpawner.SpawnOgre(lord, agentKey, false)
            })

            this.l.Log(`SetupDebugConsole ok`)
        }


        constructor() {
            OnCampaignStart( () => this.Init() )
        }
    }
    
    new KnightsOfTheRoundBelly()
}