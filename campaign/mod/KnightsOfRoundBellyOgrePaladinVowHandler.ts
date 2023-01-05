namespace AdmiralNelsonKnightsOfTheRoundBelly {
    
    const  VOW_MAX_POINTS: ConstString2Number = {
        ["wh_dlc07_trait_brt_questing_vow_campaign_pledge"] : 2, //should 
	    ["wh_dlc07_trait_brt_questing_vow_heroism_pledge"] : 2,  //be
	    ["wh_dlc07_trait_brt_questing_vow_protect_pledge"] : 2,  //1
	    ["wh_dlc07_trait_brt_grail_vow_untaint_pledge"] : 2      //instead of 2?
    }

    const VOW_LEGENDARY_LORD_CULTURES: ConstString2String = {
        ["wh_main_chs_chaos"] : "wh_dlc07_trait_brt_grail_vow_untaint_pledge",
        ["wh3_main_dae_daemons"] : "wh_dlc07_trait_brt_grail_vow_untaint_pledge",
        ["wh3_main_kho_khorne"] : "wh_dlc07_trait_brt_grail_vow_untaint_pledge",
        ["wh3_main_nur_nurgle"] : "wh_dlc07_trait_brt_grail_vow_untaint_pledge",
        ["wh3_main_sla_slaanesh"] : "wh_dlc07_trait_brt_grail_vow_untaint_pledge",
        ["wh3_main_tze_tzeentch"] : "wh_dlc07_trait_brt_grail_vow_untaint_pledge",
        ["wh2_main_skv_skaven"] : "wh_dlc07_trait_brt_grail_vow_untaint_pledge",
        ["wh_main_vmp_vampire_counts"] : "wh_dlc07_trait_brt_grail_vow_untaint_pledge",
        ["wh2_dlc11_cst_vampire_coast"] : "wh_dlc07_trait_brt_grail_vow_untaint_pledge",
        ["wh_dlc03_bst_beastmen"] : "wh_dlc07_trait_brt_questing_vow_protect_pledge",
        ["wh_main_grn_greenskins"] : "wh_dlc07_trait_brt_questing_vow_protect_pledge",
        ["wh2_main_def_dark_elves"] : "wh_dlc07_trait_brt_questing_vow_protect_pledge",
        ["wh3_main_ogr_ogre_kingdoms"] : "wh_dlc07_trait_brt_questing_vow_protect_pledge"
    }

    const MAX_POINTS = 6

    const logger = new Logger("OgrePaladinVowHandler")
    const print = (x: string) => logger.Log(x)

    export class OgrePaladinVowHandler {

        static AllowedOgreAgentKeys : LuaSet<string> = new LuaSet<string>()
        private static bInited = false

        private static CheckIfTraitEnoughToTriggerEvent(character: Character, traitKey: string) {
            print(`AddVowProgress - ${character.LocalisedFullName}  trait ${traitKey} `)
            const faction = character.Faction
            const traitLevel = character.GetTraitLevel(traitKey)
            const maxTraitLevel = VOW_MAX_POINTS[traitKey] || MAX_POINTS
            print(`Max Points - " .. ${maxTraitLevel}`)

            const incidentKey = "wh_dlc07_incident_brt_vow_gained"
            if(traitLevel <= maxTraitLevel) {
                print(`adding trait ${traitKey}`)
                character.AddTrait(traitKey, false)
                const newTraitLevel = character.GetTraitLevel(traitKey)
                print(`new trait level is ${traitKey}`)

                if(newTraitLevel >= MAX_POINTS) {
                    print(`Triggering event for this character ${character.LocalisedFullName}`)
                    character.TriggerIncident(incidentKey)

                    if(traitKey.startsWith("wh_dlc07_trait_brt_knights_vow")) {
                        core.trigger_event("ScriptEventBretonniaKnightsVowCompleted", character.GetInternalInterface())
                    } else if (traitKey.startsWith("wh_dlc07_trait_brt_questing_vow")) {
                        core.trigger_event("ScriptEventBretonniaQuestingVowCompleted", character.GetInternalInterface())
                    }  else if (traitKey.startsWith("wh_dlc07_trait_brt_grail_vow")) {
                        core.trigger_event("ScriptEventBretonniaGrailVowCompleted", character.GetInternalInterface())
                    }
                }
            }
        }

        private static AddTraitsToAllAgentsInArmy(whichForce: IMilitaryForceScript, traitKey: string) {
            const charaters = WrapICharacterObjectListToCharacterArray(whichForce.character_list())
            for (const character of charaters) {
                if(OgrePaladinVowHandler.AllowedOgreAgentKeys.has(character.SubtypeKey)) {
                    character.AddTrait(traitKey, false)
                    OgrePaladinVowHandler.CheckIfTraitEnoughToTriggerEvent(character, traitKey)
                }
            }
        }

        //doesn't need to be in army
        private static AddPledgeToKnowledgeTrait(context: IContext) {            
            if(context.character == null) return
            if( (context.mission_result_critial_success != null && context.mission_result_critial_success()) ||
                (context.mission_result_success != null && context.mission_result_success())
            )
            {
                const character = WrapICharacterObjectToCharacter(context.character())  
                //ogre only          
                if(!OgrePaladinVowHandler.AllowedOgreAgentKeys.has(character.SubtypeKey)) return

                const trait = "wh_dlc07_trait_brt_knights_vow_knowledge_pledge_agent"
                if(character.GetTraitLevel(trait) > 0) {
                    character.AddTrait(trait, false)
                }

                OgrePaladinVowHandler.CheckIfTraitEnoughToTriggerEvent(character, trait)
            }
        }

        //MUST be in army
        private static AddPledgeToKnowledgeResearchTrait(context: IContext) {            
            if(context.faction == null) return
            const faction = WrapIFactionScriptToFaction(context.faction())
            if(!faction?.IsHuman) return
            if(faction.Culture != "wh_main_brt_bretonnia") return

            const characters = faction.Characters
            for (const character of characters) {
                const trait = "wh_dlc07_trait_brt_knights_vow_knowledge_pledge_agent"
                if(character.IsGeneralAndHasArmy) {
                    OgrePaladinVowHandler.AddTraitsToAllAgentsInArmy(character.GetInternalInterface().military_force(), trait)
                }
            }
        }

        //doesn't need to be in army
        private static AddPledgeToChivalryTrait(context: IContext) {            
            if(context.character == null) return
            if(context.ranks_gained == null) return

            const character = WrapICharacterObjectToCharacter(context.character())      
            //ogre only        
            if(!OgrePaladinVowHandler.AllowedOgreAgentKeys.has(character.SubtypeKey)) return

            const ranksGained = context.ranks_gained()
            const trait = "wh_dlc07_trait_brt_knights_vow_chivalry_pledge_agent"

            if(character.GetTraitLevel(trait) > 0) {
                for (let i = 0; i < ranksGained; i++) {
                    character.AddTrait(trait, false)                    
                }
            }
            
            OgrePaladinVowHandler.CheckIfTraitEnoughToTriggerEvent(character, trait)
        }

        //doesn't need to be in army
        private static AddPledgeToOrder(context: IContext) {            
            if(context.building == null) return

            const building = context.building()
            const buildingRegionKey = building.region().name()
            const charactersInThatRegion = WrapICharacterObjectListToCharacterArray(building.faction().character_list())
            const trait = "wh_dlc07_trait_brt_knights_vow_order_pledge_agent"

            for (const char of charactersInThatRegion) {
                //ogre only
                if((OgrePaladinVowHandler.AllowedOgreAgentKeys.has(char.SubtypeKey)) && 
                    char.IsInRegion && 
                    char.CurrentRegionKey == buildingRegionKey) {
                    char.AddTrait(trait)
                    OgrePaladinVowHandler.CheckIfTraitEnoughToTriggerEvent(char, trait)
                }
            }
        }

        //MUST be in army
        private static AddPledgeToDestroy(context: IContext) {
            if(context.character == null) return
            if(context.faction == null) return
            if(context.garrison_residence == null) return

            const character = WrapICharacterObjectToCharacter(context.character())
            const faction = WrapIFactionScriptToFaction(context.faction())
            const garrisonResidence = context.garrison_residence()
            //ogre only
            if(!OgrePaladinVowHandler.AllowedOgreAgentKeys.has(character.SubtypeKey)) return


            if(faction == null) return

            if(!faction.IsHuman) return
            if(faction.Culture != "wh_main_brt_bretonnia") return
            if(!garrisonResidence.region().is_province_capital()) return
            if(!character.IsInMilitaryForce) return
            const trait = "wh_dlc07_trait_brt_grail_vow_destroy_pledge"
            OgrePaladinVowHandler.AddTraitsToAllAgentsInArmy(character.GetInternalInterface().military_force(), trait)
        }

        //MUST be in army
        private static AddPledgeToCampaign(context: IContext) {
            if(context.pending_battle == null) return
            if(context.character == null) return
            const pendingBattle = context.pending_battle()
            if(pendingBattle.battle_type() != "settlement_standard") return

            const character = WrapICharacterObjectToCharacter(context.character())
            if(!character.IsRecentlyWonBattle) return

            const faction = character.Faction
            if(!faction.IsHuman) return
            if(faction.Culture != "wh_main_brt_bretonnia") return
            if(!pendingBattle.has_attacker()) return
            if(!character.HasSameInternalReferenceTo(pendingBattle.attacker())) return
            if(!character.IsInRegion) return

            const climate = character.GetInternalInterface().region().settlement().get_climate()
            if(climate == "climate_desert" || climate == "climate_jungle") {
                const trait = "wh_dlc07_trait_brt_questing_vow_campaign_pledge"
                OgrePaladinVowHandler.AddTraitsToAllAgentsInArmy(character.GetInternalInterface().military_force(), trait)
            }


        }

        //MUST be in army
        private static AddPledgeToManaan(context: IContext) {
            if(context.character == null) return
            const character = WrapICharacterObjectToCharacter(context.character())
            if(!character.IsAtSea) return
            if(!character.Faction.IsHuman) return
            if(character.Faction.Culture != "wh_main_brt_bretonnia") return
            
            const trait = "wh_dlc07_trait_brt_questing_vow_heroism_pledge"
            if(!character.IsInMilitaryForce) return
            OgrePaladinVowHandler.AddTraitsToAllAgentsInArmy(character.GetInternalInterface().military_force(), trait)

        }

        //Pledge to Valour
        //Pledge to Protect
        //Pledge to Untaint
        //MUST be in army
        private static AddKillLordsOrLegendaryLordPledgeDefender(context: IContext) {
            if(!cm.pending_battle_cache_defender_victory()) return

            const LoopBodyI = (i: number) => {
                const familyMember = cm.get_family_member_by_cqi(cm.pending_battle_cache_get_defender_fm_cqi(i))
                if(familyMember == null) return
                const defenderCharacter = WrapICharacterObjectToCharacter(familyMember.character())

                if(!defenderCharacter.IsValid()) return
                if(defenderCharacter.Faction.Culture != "wh_main_brt_bretonnia") return

                const trait = "wh_dlc07_trait_brt_grail_vow_valour_pledge"
                OgrePaladinVowHandler.AddTraitsToAllAgentsInArmy(defenderCharacter.GetInternalInterface().military_force(), trait)
            }

            const LoopBodyJ = (i: number, j: number) => {
                const enemyLordCharacterDetails = cm.get_family_member_by_cqi(cm.pending_battle_cache_get_attacker_fm_cqi(j)).character_details()
                if(enemyLordCharacterDetails.is_null_interface()) return
                if(!enemyLordCharacterDetails.is_unique()) return

                const defeatedCharacterVow = VOW_LEGENDARY_LORD_CULTURES[enemyLordCharacterDetails.faction().culture()]
                if(defeatedCharacterVow == null) return

                const familyMemberCqi = cm.get_family_member_by_cqi(cm.pending_battle_cache_get_attacker_fm_cqi(i))
                const attackerCharacther = WrapICharacterObjectToCharacter(familyMemberCqi.character())

                OgrePaladinVowHandler.AddTraitsToAllAgentsInArmy(attackerCharacther.GetInternalInterface().military_force(), defeatedCharacterVow)
            }

            const numDefenders = cm.pending_battle_cache_num_defenders()
            for (let i = 1; i <= numDefenders; i++) {
                LoopBodyI(i)
                const numberOfDefenders = cm.pending_battle_cache_num_attackers()
                for (let j = 1; j <= numberOfDefenders; j++) {
                    LoopBodyJ(i, j)                    
                }
            }
        }

        //Pledge to Valour
        //Pledge to Protect
        //Pledge to Untaint
        //MUST be in army
        private static AddKillLordsOrLegendaryLordPledgeAttacker(context: IContext) {
            if(!cm.pending_battle_cache_attacker_victory()) return

            const LoopBodyI = (i: number) => {
                const familyMember = cm.get_family_member_by_cqi(cm.pending_battle_cache_get_attacker_fm_cqi(i))
                if(familyMember == null) return
                const attackerCharacther = WrapICharacterObjectToCharacter(familyMember.character())

                // Check the family member has a character interface, as a non-legendary reinforcing character can both win and die
                if(!attackerCharacther.IsValid()) return
                if(attackerCharacther.Faction.Culture != "wh_main_brt_bretonnia") return

                const trait = "wh_dlc07_trait_brt_grail_vow_valour_pledge"
                OgrePaladinVowHandler.AddTraitsToAllAgentsInArmy(attackerCharacther.GetInternalInterface().military_force(), trait)
            }

            const LoopBodyJ = (i: number, j: number) => {
                const enemyLordCharacterDetails = cm.get_family_member_by_cqi(cm.pending_battle_cache_get_defender_fm_cqi(j)).character_details()
                if(enemyLordCharacterDetails.is_null_interface()) return
                if(!enemyLordCharacterDetails.is_unique()) return

                const defeatedCharacterVow = VOW_LEGENDARY_LORD_CULTURES[enemyLordCharacterDetails.faction().culture()]
                if(defeatedCharacterVow == null) return

                const familyMemberCqi = cm.get_family_member_by_cqi(cm.pending_battle_cache_get_attacker_fm_cqi(i))
                const attackerCharacther = WrapICharacterObjectToCharacter(familyMemberCqi.character())

                const trait = "wh_dlc07_trait_brt_grail_vow_valour_pledge"
                OgrePaladinVowHandler.AddTraitsToAllAgentsInArmy(attackerCharacther.GetInternalInterface().military_force(), trait)
            }

            const numberOfAttackers = cm.pending_battle_cache_num_attackers()
            for (let i = 1; i <= numberOfAttackers; i++) {
                LoopBodyI(i)
                //check for vow to kill legendary lords
                //defender in this case is our enemey from bretonnia POV
                const numberOfDefenders = cm.pending_battle_cache_num_defenders()
                for (let j = 1; j <= numberOfDefenders; j++) {
                    LoopBodyJ(i, j)                    
                }
            }

            return
        }

        static Init() {
            if(OgrePaladinVowHandler.bInited) return

            OgrePaladinVowHandler.bInited = true
            print("ready")


            //knights vow
            core.add_listener(
                "admiralnelson_research_completed_pledge_to_knowledge",
                "ResearchCompleted",
                true,
                (context: IContext) => OgrePaladinVowHandler.AddPledgeToKnowledgeResearchTrait(context), 
                true
            )
            
            core.add_listener(
                "admiralnelson_character_character_target_action_pledge_to_knowledge",
                "CharacterCharacterTargetAction",
                true,
                (context: IContext) => OgrePaladinVowHandler.AddPledgeToKnowledgeTrait(context), 
                true
            )

            core.add_listener(
                "admiralnelson_building_completed_pledge_to_order",
                "BuildingCompleted",
                true,
                (context: IContext) => OgrePaladinVowHandler.AddPledgeToOrder(context), 
                true
            )

            core.add_listener(
                "admiralnelson_character_rank_up_pledge_to_chivalry",
                "CharacterRankUp",
                true,
                (context: IContext) => OgrePaladinVowHandler.AddPledgeToChivalryTrait(context), 
                true
            )


            //questing vows
            core.add_listener(
                "admiralnelson_character_completed_battle_pledge_to_campaign",
                "CharacterCompletedBattle",
                true,
                (context: IContext) => OgrePaladinVowHandler.AddPledgeToCampaign(context), 
                true
            )

            core.add_listener(
                "admiralnelson_character_completed_battle_pledge_to_heroism",
                "CharacterCompletedBattle",
                true,
                (context: IContext) => OgrePaladinVowHandler.AddPledgeToManaan(context), 
                true
            )

            //grail vows
            core.add_listener(
                "admiralnelson_character_completed_battle_grail_vow",
                "BattleCompleted",
                true,
                (context: IContext) => {
                    OgrePaladinVowHandler.AddKillLordsOrLegendaryLordPledgeAttacker(context)
                    OgrePaladinVowHandler.AddKillLordsOrLegendaryLordPledgeDefender(context)
                }, 
                true
            )

            core.add_listener(
                "admiralnelson_character_razed_setlement_pledge_to_destroy",
                "CharacterRazedSettlement",
                true,
                (context: IContext) => OgrePaladinVowHandler.AddPledgeToDestroy(context), 
                true
            )

        }

       
    }

}