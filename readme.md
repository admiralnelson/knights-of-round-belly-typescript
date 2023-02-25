# About this repo
This repo stores the typescript source code for Knights of The Round Belly.  
To get started, run `first_time.bat` script to install npm and typescript dependencies. 
To compile, run `build_campaign.bat`, a new folder called script will contained typescripts that have been compiled to lua. You will manually add this folder into the pack files.   

The assets is not stored in here, you have to download it via steam workshop or google drive link here: 
[https://drive.google.com/file/d/10kQ2m39RIPuCHAc8Awa3VmyccPEwJwb_/view?usp=sharing]

All the API is not fully declared or documented in `warhammer-header.d.ts` and `user-interface-header.d.ts`. 

# Background
In the year IC 2480, endless waves of Greenskins pouring from the Grey Mountains.
Bretonnia forces barely hold out against the Greenskins. Not enough manpower to defend against such an invasion on their own, and the Greenskins took over the region in The Wasteland. Feramand, the leader of the Bretonnia, has decided to hire seven Ogre mercenaries and send them to the Wasteland to help Bretonnian forces against the Greenskins.
The war waged on for months and months, many knights and peasants had died in the battle, but the seven mercenaries finally made a breakthrough and defeated the Greenskins.
Because of the valiant effort of the seven mercenaries, Feramand rewarded them with the title of the 'Knights of The Round Belly'.
Formerly mercenaries, these brute knights were given task to quest around the world to smite evils lurking on Bretonnia frontiers and her colonies. Although some dissenters say this was just a plan to get rid of them...

*Feramand = Louen Leounceur's predecessor.

# About this mod
Knights of The Round Belly is now back as a Warhammer 3 port. In this version, I have revamped how the ogres look with new high resolution textures, every Bretonnian factions can utilise this mod (old version used to work only with Louen, Morgiana, Alberic, and Repanse), and even there is a unique Mournfang mount for Louis himself. Old bugs like broken Grail Quest for the Ogre Champions were also squashed. If there’s no human player is playing a Bretonnian faction, the AI can use the mod as well.
Under the hood, I also redo the game programming using Typescript. I will release the SDK soon, but for now, you can use this mod source code to write your own Warhammer mod using Typescript if you’re interested (source code) https://github.com/admiralnelson/knights-of-round-belly-typescript

# Mod guide
There are 6 ogre paladins and 1 ogre lord scattered on the old world, keep in mind they're mortal and can permanently die if they never sipped from the Grail. Grail ogres are terrifyingly strong.
Each ogre will take 6 peasant slots and may severe your economy, play your campaign slowly, build farms, and make sure to complete their vows.
Some ogres can only spawn once and only at specific locations on the map.
If you dismiss an ogre, they will be gone for good. So, it's a good idea to strengthen your economy before facing this dilemma.
Keep in mind far factions like Alberic will probably take a while to find discover these guys.


# Installation guide
1. Subscribe to the mod

# Mod compatibility
Because of how strong these ogres in late game, I don't really need to balance it for SFO or CTT.
Multiplayer is untested. But I programmed in such a way that it should not trigger a desync.
**IMPORTANT: It is recommended to use the mod with fresh, new campaign**

# LoreAccurate® Certification
LoreAccurate® Certified

# Credits
Thanks to:
- twiggers, /v/
- Typescript-to-Lua project 
- Ole (Kitbasher)
- E.C Hekman
[TW Debugger https://steamcommunity.com/sharedfiles/filedetails/?id=2864762290) , such a lifesaver. It helped me debug my Typescript SDK.]
- Phazer tools

# Additional mods used in the screenshot
https://steamcommunity.com/sharedfiles/filedetails/?id=2854324384
https://steamcommunity.com/sharedfiles/filedetails/?id=2867514081

# Future plans
- Proper Bretonnian voice over for the lads (if you want to volunteer contact this steam)