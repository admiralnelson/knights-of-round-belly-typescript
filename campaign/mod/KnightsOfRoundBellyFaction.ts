namespace AdmiralNelsonKnightsOfTheRoundBelly {
    const CachedFactions: Faction[] = []

    export function GetFactions(): Faction[] {
        if(CachedFactions.length == 0) {
            const theWorld = cm.model().world()
            const factions = theWorld.faction_list()
            for (let i = 0; i < factions.num_items(); i++) {
                const theFaction = factions.item_at(i)
                CachedFactions.push(new Faction(theFaction))
            }
        }
        return CachedFactions
    }

    export function GetFactionByKey(factionKey: string): Faction | undefined {
        const faction = GetFactions()
        return faction.find( faction => faction.FactionKey == factionKey)
    }

    export function CastToFaction(castFrom: IFactionScript): Faction | undefined {
        return GetFactionByKey(castFrom.name())
    }

    export class Faction {
        private factionInterface: IFactionScript

        constructor(faction: IFactionScript) {
            this.factionInterface = faction
        }

        public RemoveEffectBundle(effectBundleKey: string): void {
            cm.remove_effect_bundle(effectBundleKey, this.FactionKey)
        }

        public IsHuman(): boolean {
            return this.factionInterface.is_human()
        }

        public IsDead(): boolean {
            return this.factionInterface.is_dead()
        }

        public GetFactionInterface(): IFactionScript {
            return this.factionInterface
        }

        public IsValid(): boolean {
            return !this.factionInterface.is_null_interface()
        }

        public ShowMessageEvent(titleLocKey: string, primaryLocKey: string, secondaryLocKey: string, isPersistent: boolean,  index: number, endCallback?: () => void, callbackDelay?: number, dontWhitelist?: boolean): void {
            cm.show_message_event(this.FactionKey, titleLocKey, primaryLocKey, secondaryLocKey, isPersistent, index, endCallback, callbackDelay, dontWhitelist)
        }

        public ApplyEffectBundle(effectBundleKey: string, howManyTurnZeroForPermanent: number = 0): void {
            cm.apply_effect_bundle(effectBundleKey, this.FactionKey, howManyTurnZeroForPermanent)
        }

        public AddTurnCountdownEvent(turns: number, event: string, contextString: string): void {
            cm.add_turn_countdown_event(this.FactionKey, turns, event, contextString)
        }

        public TriggerMission(missionKey: string, fireImmediately: boolean = true) {
            cm.trigger_mission(this.FactionKey, missionKey, fireImmediately)
        }

        public get Lords(): Lord[] {
            const result = []
            const armies = this.factionInterface.military_force_list()
            for (let i = 0; i < armies.num_items() ; i++) {
                const theArmy = armies.item_at(i)
                if(!theArmy.is_armed_citizenry() && theArmy.has_general()) {
                    const theGeneral = theArmy.general_character()
                    //this.l.Log(`iterating ${theGeneral.character_subtype_key()}`)
                    result.push(new Lord({characterObject: theGeneral}))
                }
            }    
            return result
        }

        public get Champions(): Champion[] {
            return []
        }

        public get EffectBundles(): string[] {
            const res = []
            const effectBundles = this.factionInterface.effect_bundles()
            for (let i = 0; i < effectBundles.num_items(); i++) {
                const effectBundle = effectBundles.item_at(i)
                res.push(effectBundle.key())
            }
            return res
        }
        
        public get FactionKey() : string {
            return this.factionInterface.name()
        }

        public toString(): string {
            return this.FactionKey
        }

        public IsEqual(otherFaction: Faction) {
            return this.FactionKey == otherFaction.FactionKey
        }
    }
}